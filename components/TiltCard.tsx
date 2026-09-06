"use client";

import React, { useRef, useCallback } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const MAX_TILT = 8; // Max tilt angle in degrees (±8deg)

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Disable tilt tracking on touch input to preserve native touch scrolling
    if (e.pointerType === "touch") return;

    if (outerRef.current) {
      outerRef.current.classList.add("is-hover");
    }
    if (cardRef.current) {
      cardRef.current.classList.add("is-tilting");
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    if (!outerRef.current || !cardRef.current) return;

    const rect = outerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Pointer coordinates relative to outer wrapper
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalized coordinates (0 to 1)
    const px = Math.min(Math.max(x / rect.width, 0), 1);
    const py = Math.min(Math.max(y / rect.height, 0), 1);

    // Centered normalized range (-0.5 to 0.5)
    const nx = px - 0.5;
    const ny = py - 0.5;

    // Tilt angles (clamped between -8deg and +8deg)
    // ny < 0 (pointer top) -> rx positive (top tilts toward user)
    // nx > 0 (pointer right) -> ry positive (right tilts toward user)
    const rx = Math.min(Math.max(-ny * (MAX_TILT * 2), -MAX_TILT), MAX_TILT);
    const ry = Math.min(Math.max(nx * (MAX_TILT * 2), -MAX_TILT), MAX_TILT);

    // Glare coordinates as percentages (0% to 100%)
    const gx = px * 100;
    const gy = py * 100;

    // Update CSS variables directly on DOM node to avoid React state re-renders
    const cardEl = cardRef.current;
    cardEl.style.setProperty("--tilt-rx", `${rx.toFixed(2)}deg`);
    cardEl.style.setProperty("--tilt-ry", `${ry.toFixed(2)}deg`);
    cardEl.style.setProperty("--tilt-gx", `${gx.toFixed(2)}%`);
    cardEl.style.setProperty("--tilt-gy", `${gy.toFixed(2)}%`);

    if (!cardEl.classList.contains("is-tilting")) {
      cardEl.classList.add("is-tilting");
    }
    if (outerRef.current && !outerRef.current.classList.contains("is-hover")) {
      outerRef.current.classList.add("is-hover");
    }
  }, []);

  const handlePointerLeave = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!outerRef.current || !cardRef.current) return;

    outerRef.current.classList.remove("is-hover");
    const cardEl = cardRef.current;
    cardEl.classList.remove("is-tilting");

    // Reset tilt variables back to 0deg (smooth 1000ms return transition handled in CSS)
    cardEl.style.setProperty("--tilt-rx", "0deg");
    cardEl.style.setProperty("--tilt-ry", "0deg");
  }, []);

  return (
    <div
      ref={outerRef}
      className={`t-tilt ${className}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div ref={cardRef} className="t-tilt-card rounded-2xl">
        {children}
        <div className="t-tilt-glare" />
      </div>
    </div>
  );
}
