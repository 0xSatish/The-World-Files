"use client";

/**
 * Bloub Interactive Avatar Component
 * Based on the open-source Bloub avatar by Jeremy Paris (jeremy-prt/bloub)
 * Source: https://github.com/jeremy-prt/bloub
 * License: MIT License
 *
 * Copyright (c) Jeremy Paris (jeremy-prt)
 * Expressions & Interaction concepts adapted from bible-strong-avatar-lab (smontlouis).
 *
 * Body Silhouette: Original Bloub circular body (circle r = 100 at center 190, 190).
 * Locked outer geometry & layout positioning.
 */

import * as React from "react";

// --- Math & Geometry Helpers (from jeremy-prt/bloub) ---
const DEMI_VIEWBOX = 190;
const RAYON = 100;
const EYE_SPLIT = 15.46;
const EYE_W = 0.186;
const EYE_H = 0.412;
const YAW_MAX = 22;
const PITCH_MAX = 18;

const clamp = (v: number, lo = 0, hi = 1) => (v < lo ? lo : v > hi ? hi : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Vec3 = [number, number, number];

function spin(u: Vec3, v: Vec3, angle: number): [Vec3, Vec3] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [
    [u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s],
    [v[0] * c - u[0] * s, v[1] * c - u[1] * s, v[2] * c - u[2] * s],
  ];
}

const deg = (d: number) => (d * Math.PI) / 180;

interface EyePose {
  x: number;
  y: number;
  a: number;
  b: number;
  c: number;
  d: number;
  depth: number;
}

function computeEyePoses(
  gaze: { yaw: number; pitch: number; roll: number },
  scale: number,
  split = EYE_SPLIT
): [EyePose, EyePose] {
  let f: Vec3 = [0, 0, 1];
  let right: Vec3 = [1, 0, 0];
  let down: Vec3 = [0, 1, 0];

  [f, right] = spin(f, right, deg(gaze.yaw));
  [down, f] = spin(down, f, deg(-gaze.pitch));
  [right, down] = spin(right, down, deg(gaze.roll));

  const splitRad = deg(split);
  const cosS = Math.cos(splitRad);
  const sinS = Math.sin(splitRad);

  const calcEye = (sign: number): EyePose => {
    const dir: Vec3 = [
      f[0] * cosS + right[0] * sinS * sign,
      f[1] * cosS + right[1] * sinS * sign,
      f[2] * cosS + right[2] * sinS * sign,
    ];
    const mag = Math.hypot(dir[0], dir[1], dir[2]);
    const normDir: Vec3 = [dir[0] / mag, dir[1] / mag, dir[2] / mag];

    const ex: Vec3 = [
      right[0] * cosS - f[0] * sinS * sign,
      right[1] * cosS - f[1] * sinS * sign,
      right[2] * cosS - f[2] * sinS * sign,
    ];
    const ey = down;

    return {
      x: normDir[0] * scale,
      y: normDir[1] * scale,
      a: ex[0],
      b: ex[1],
      c: ey[0],
      d: ey[1],
      depth: normDir[2],
    };
  };

  return [calcEye(-1), calcEye(1)];
}

function buildCapsulePath(w: number, h: number, open: number): string {
  const effectiveOpen = Math.max(open, 0.04);
  const r = Math.min(w, h * effectiveOpen) / 2;
  const halfH = (h * effectiveOpen) / 2 - r;

  if (halfH <= 0.001) {
    return `M ${-r} 0 A ${r} ${r} 0 1 0 ${r} 0 A ${r} ${r} 0 1 0 ${-r} 0 Z`;
  }

  return `M ${-r} ${-halfH} A ${r} ${r} 0 0 1 ${r} ${-halfH} L ${r} ${halfH} A ${r} ${r} 0 0 1 ${-r} ${halfH} Z`;
}

// Expression configurations (adapted from bible-strong-avatar-lab concepts)
interface ExpressionConfig {
  name: string;
  duration: number;
  openLeft: number;
  openRight: number;
  scaleLeft: number;
  scaleRight: number;
  yawOffset: number;
  pitchOffset: number;
  rollOffset: number;
  isAngryBrows?: boolean;
  color?: string; // e.g. "#ef4444" for angry-brows
  shakeAmount?: number;
}

const EXPRESSIONS: ExpressionConfig[] = [
  {
    name: "happy",
    duration: 1.5,
    openLeft: 1.15,
    openRight: 1.15,
    scaleLeft: 1.18,
    scaleRight: 1.18,
    yawOffset: 0,
    pitchOffset: 4,
    rollOffset: 6,
  },
  {
    name: "surprised",
    duration: 1.6,
    openLeft: 1.4,
    openRight: 1.4,
    scaleLeft: 1.25,
    scaleRight: 1.25,
    yawOffset: 0,
    pitchOffset: 8,
    rollOffset: 0,
  },
  {
    name: "curious",
    duration: 1.6,
    openLeft: 1.1,
    openRight: 1.1,
    scaleLeft: 1.1,
    scaleRight: 1.1,
    yawOffset: -8,
    pitchOffset: 4,
    rollOffset: 12,
  },
  {
    name: "sad",
    duration: 1.8,
    openLeft: 0.6,
    openRight: 0.6,
    scaleLeft: 0.9,
    scaleRight: 0.9,
    yawOffset: 0,
    pitchOffset: -8,
    rollOffset: -6,
  },
  {
    name: "eyes-closed",
    duration: 1.2,
    openLeft: 0.04,
    openRight: 0.04,
    scaleLeft: 0.9,
    scaleRight: 0.9,
    yawOffset: 0,
    pitchOffset: -2,
    rollOffset: 0,
  },
  {
    name: "angry",
    duration: 1.8,
    openLeft: 0.85,
    openRight: 0.85,
    scaleLeft: 1.05,
    scaleRight: 1.05,
    yawOffset: 0,
    pitchOffset: -6,
    rollOffset: -12,
    isAngryBrows: true,
    color: "#ef4444",
    shakeAmount: 3.5,
  },
  {
    name: "angry-brows",
    duration: 2.0,
    openLeft: 0.8,
    openRight: 0.8,
    scaleLeft: 1.1,
    scaleRight: 1.1,
    yawOffset: 0,
    pitchOffset: -8,
    rollOffset: -14,
    isAngryBrows: true,
    color: "#ef4444",
    shakeAmount: 3.5,
  },
  {
    name: "wink",
    duration: 1.4,
    openLeft: 0.06,
    openRight: 1.25,
    scaleLeft: 0.85,
    scaleRight: 1.2,
    yawOffset: 4,
    pitchOffset: -2,
    rollOffset: -10,
  },
  {
    name: "excited",
    duration: 1.6,
    openLeft: 1.25,
    openRight: 1.25,
    scaleLeft: 1.3,
    scaleRight: 1.3,
    yawOffset: 0,
    pitchOffset: 6,
    rollOffset: -8,
  },
  {
    name: "confused",
    duration: 1.8,
    openLeft: 0.65,
    openRight: 1.2,
    scaleLeft: 0.95,
    scaleRight: 1.18,
    yawOffset: -10,
    pitchOffset: -4,
    rollOffset: 16,
  },
  {
    name: "relaxed",
    duration: 1.6,
    openLeft: 0.45,
    openRight: 0.45,
    scaleLeft: 0.9,
    scaleRight: 0.9,
    yawOffset: 0,
    pitchOffset: -6,
    rollOffset: -4,
  },
  {
    name: "proud",
    duration: 1.5,
    openLeft: 0.85,
    openRight: 0.85,
    scaleLeft: 1.1,
    scaleRight: 1.1,
    yawOffset: 6,
    pitchOffset: 10,
    rollOffset: -6,
  },
  {
    name: "skeptical-left",
    duration: 2.0,
    openLeft: 0.45,
    openRight: 1.15,
    scaleLeft: 0.9,
    scaleRight: 1.1,
    yawOffset: -14,
    pitchOffset: 2,
    rollOffset: 10,
  },
  {
    name: "drowsy-closed",
    duration: 2.8,
    openLeft: 0.04,
    openRight: 0.04,
    scaleLeft: 0.85,
    scaleRight: 0.85,
    yawOffset: 0,
    pitchOffset: -10,
    rollOffset: -4,
  },
];

// Autonomous expression candidate pool with selection weights
const AUTO_EXPRESSION_POOL = [
  "curious",
  "curious",
  "eyes-closed",
  "eyes-closed",
  "drowsy-closed",
  "sad",
  "skeptical-left",
  "angry",
  "angry-brows", // rare event
  "happy",
  "relaxed",
];

export default function BloubAvatar({
  size = 480,
  color = "#10b981", // Original recognizable Bloub green
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const bodyGroupRef = React.useRef<SVGGElement | null>(null);
  const bodyCircleRef = React.useRef<SVGCircleElement | null>(null);
  const glowCircleRef = React.useRef<SVGCircleElement | null>(null);
  const eyeLeftRef = React.useRef<SVGPathElement | null>(null);
  const eyeRightRef = React.useRef<SVGPathElement | null>(null);
  const browLeftRef = React.useRef<SVGPathElement | null>(null);
  const browRightRef = React.useRef<SVGPathElement | null>(null);

  React.useEffect(() => {
    let animFrameId: number;
    let clock = 0;

    // Target gaze states
    let targetYaw = 0;
    let targetPitch = 5;
    let currentYaw = 0;
    let currentPitch = 5;
    let currentRoll = -8;

    // Blinking state
    let nextBlinkTime = 2 + Math.random() * 4;
    let blinkDuration = 0.16;
    let blinkTimer = -1;
    let blinkOpen = 1;

    // Expression & Autonomous Loop & Selection State
    let expressionIndex = -1;
    let expressionStartTime = -1;
    let isAutoExpression = false;
    let nextAutoTime = 3 + Math.random() * 4; // First autonomous expression in 3-7s
    let lastUserInteractionTime = -1;

    let isTextSelected = false;
    let selectionStartTime = -1;
    let lastLoggedExpr = "";
    let lastLoggedText = "";

    const skepticalIdx = EXPRESSIONS.findIndex((e) => e.name === "skeptical-left");
    const angryIdx = EXPRESSIONS.findIndex((e) => e.name === "angry");

    // Live selection check function (called per frame and on DOM events)
    const checkSelection = () => {
      if (typeof window === "undefined") return;
      const sel = window.getSelection();
      const text = sel ? sel.toString().trim() : "";
      const hasSel = !!(sel && !sel.isCollapsed && text.length > 0);

      if (hasSel) {
        if (!isTextSelected) {
          isTextSelected = true;
          selectionStartTime = clock;
          lastLoggedText = text;
          console.log(`[Bloub DEBUG] selection detected`);
          console.log(`[Bloub DEBUG] selected text: "${text}"`);
          console.log(`[Bloub DEBUG] requested expression: skeptical-left`);
          // Cancel any running autonomous expression so text-selection reaction takes priority
          if (isAutoExpression) {
            expressionIndex = -1;
            expressionStartTime = -1;
            isAutoExpression = false;
          }
        } else if (text !== lastLoggedText) {
          lastLoggedText = text;
          console.log(`[Bloub DEBUG] selection updated: "${text}"`);
        }
      } else {
        if (isTextSelected) {
          isTextSelected = false;
          selectionStartTime = -1;
          lastLoggedText = "";
          console.log(`[Bloub DEBUG] selection cleared -> returning to normal/autonomous`);
          // Resume autonomous scheduler 3.5-7.5s after selection is cleared
          nextAutoTime = clock + 3.5 + Math.random() * 4.0;
        }
      }
    };

    const handleCopy = () => {
      checkSelection();
      if (isTextSelected && angryIdx >= 0) {
        console.log(`[Bloub DEBUG] Copy event detected while text selected -> switching to angry`);
        expressionIndex = angryIdx;
        expressionStartTime = clock;
        isAutoExpression = false;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "c" || e.key === "C" || e.code === "KeyC")
      ) {
        checkSelection();
        if (isTextSelected && angryIdx >= 0) {
          console.log(`[Bloub DEBUG] Ctrl+C keydown detected while text selected -> switching to angry`);
          expressionIndex = angryIdx;
          expressionStartTime = clock;
          isAutoExpression = false;
        }
      }
    };

    // Pointer listener for interactive eye gaze tracking
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width * (DEMI_VIEWBOX / 380);
      const eyeCenterY = rect.top + rect.height * (DEMI_VIEWBOX / 380);

      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;

      // Normalize relative to screen half-dimensions
      const normX = clamp(deltaX / (window.innerWidth * 0.45), -1, 1);
      const normY = clamp(deltaY / (window.innerHeight * 0.45), -1, 1);

      targetYaw = normX * YAW_MAX;
      targetPitch = normY * PITCH_MAX;
    };

    const handlePointerLeave = () => {
      targetYaw = 0;
      targetPitch = 0;
    };

    let clickTimeout: ReturnType<typeof setTimeout> | null = null;
    let clickCount = 0;

    // Prevent default browser text selection trigger when interaction starts directly on Bloub avatar
    const handlePointerDown = (e: PointerEvent) => {
      if (!svgRef.current) return;
      const isAvatar = e.target === svgRef.current || svgRef.current.contains(e.target as Node);
      if (isAvatar) {
        console.log(`[Bloub DEBUG] pointerdown target:`, e.target);
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!svgRef.current) return;
      const isAvatar = e.target === svgRef.current || svgRef.current.contains(e.target as Node);
      if (isAvatar) {
        console.log(`[Bloub DEBUG] mousedown target:`, e.target);
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };

    // Click listener with 220ms distinction between single-click and double-click
    const handleClick = (e: MouseEvent) => {
      if (!svgRef.current) return;
      const isAvatar = e.target === svgRef.current || svgRef.current.contains(e.target as Node);
      if (!isAvatar) return;

      console.log(`[Bloub DEBUG] click target:`, e.target);
      clickCount++;

      if (clickCount === 1) {
        if (clickTimeout) clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => {
          clickCount = 0;
          clickTimeout = null;
          console.log(`[Bloub DEBUG] Single-click confirmed -> cycling click expression`);
          lastUserInteractionTime = clock;
          expressionIndex = (expressionIndex + 1) % EXPRESSIONS.length;
          expressionStartTime = clock;
          isAutoExpression = false;
        }, 220);
      } else if (clickCount >= 2) {
        if (clickTimeout) {
          clearTimeout(clickTimeout);
          clickTimeout = null;
        }
        clickCount = 0;
        console.log(`[Bloub DEBUG] Double-click confirmed -> switching to angry`);
        if (angryIdx >= 0) {
          lastUserInteractionTime = clock;
          expressionIndex = angryIdx;
          expressionStartTime = clock;
          isAutoExpression = false;
        }
      }
    };

    // Double-click listener for triggering ANGRY expression directly on Bloub avatar
    const handleDblClick = (e: MouseEvent) => {
      if (!svgRef.current) return;
      const isAvatar = e.target === svgRef.current || svgRef.current.contains(e.target as Node);
      if (!isAvatar) return;

      console.log(`[Bloub DEBUG] dblclick target:`, e.target);
      if (clickTimeout) {
        clearTimeout(clickTimeout);
        clickTimeout = null;
      }
      clickCount = 0;
      if (angryIdx >= 0 && expressionIndex !== angryIdx) {
        lastUserInteractionTime = clock;
        expressionIndex = angryIdx;
        expressionStartTime = clock;
        isAutoExpression = false;
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("click", handleClick);
    window.addEventListener("dblclick", handleDblClick);
    document.addEventListener("selectionchange", checkSelection, { passive: true });
    document.addEventListener("copy", handleCopy, { passive: true });
    window.addEventListener("keydown", handleKeyDown, { passive: true });
    window.addEventListener("mouseup", checkSelection, { passive: true });
    window.addEventListener("keyup", checkSelection, { passive: true });

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderLoop = () => {
      clock += 0.016;

      // Always check selection state on every frame for instant 16ms responsiveness
      checkSelection();

      if (prefersReducedMotion) {
        // Static clean render when reduced motion is preferred
        const [eye1, eye2] = computeEyePoses(
          { yaw: 0, pitch: 5, roll: -8 },
          RAYON
        );
        const eyeW = RAYON * EYE_W;
        const eyeH = RAYON * EYE_H;
        const eyePathD = buildCapsulePath(eyeW, eyeH, 1);

        if (eyeLeftRef.current) {
          eyeLeftRef.current.setAttribute("d", eyePathD);
          eyeLeftRef.current.setAttribute(
            "transform",
            `translate(${DEMI_VIEWBOX + eye1.x}, ${
              DEMI_VIEWBOX + eye1.y
            }) matrix(${eye1.a.toFixed(4)}, ${eye1.b.toFixed(
              4
            )}, ${eye1.c.toFixed(4)}, ${eye1.d.toFixed(4)}, 0, 0)`
          );
        }
        if (eyeRightRef.current) {
          eyeRightRef.current.setAttribute("d", eyePathD);
          eyeRightRef.current.setAttribute(
            "transform",
            `translate(${DEMI_VIEWBOX + eye2.x}, ${
              DEMI_VIEWBOX + eye2.y
            }) matrix(${eye2.a.toFixed(4)}, ${eye2.b.toFixed(
              4
            )}, ${eye2.c.toFixed(4)}, ${eye2.d.toFixed(4)}, 0, 0)`
          );
        }
        return;
      }

      // Autonomous Expression Scheduler (triggers when user is idle and no text is selected)
      const userIsIdle = (lastUserInteractionTime < 0 || clock - lastUserInteractionTime > 4.5) && !isTextSelected;
      if (userIsIdle && clock > nextAutoTime && expressionStartTime < 0) {
        const randName = AUTO_EXPRESSION_POOL[Math.floor(Math.random() * AUTO_EXPRESSION_POOL.length)];
        const foundIdx = EXPRESSIONS.findIndex((e) => e.name === randName);
        if (foundIdx >= 0) {
          expressionIndex = foundIdx;
          expressionStartTime = clock;
          isAutoExpression = true;
          nextAutoTime = clock + EXPRESSIONS[foundIdx].duration + 3.5 + Math.random() * 4.0;
        }
      }

      // Smooth gaze tracking interpolation (exponential ease-out)
      currentYaw = lerp(currentYaw, targetYaw, 0.09);
      currentPitch = lerp(currentPitch, targetPitch, 0.09);

      // Subtle idle gaze micro-sway
      const idleSwayX = Math.sin(clock * 1.2) * 1.8;
      const idleSwayY = Math.cos(clock * 0.9) * 1.2;

      // Handle natural blinking
      if (clock > nextBlinkTime && blinkTimer < 0) {
        blinkTimer = clock;
      }
      if (blinkTimer > 0) {
        const progress = (clock - blinkTimer) / blinkDuration;
        if (progress >= 1) {
          blinkTimer = -1;
          nextBlinkTime = clock + 2.5 + Math.random() * 4;
          blinkOpen = 1;
        } else {
          blinkOpen = Math.abs(Math.sin(progress * Math.PI - Math.PI / 2));
        }
      } else {
        blinkOpen = 1;
      }

      // Handle active expression interpolation
      let exprOpenLeft = 1;
      let exprOpenRight = 1;
      let exprScaleLeft = 1;
      let exprScaleRight = 1;
      let exprYawOffset = 0;
      let exprPitchOffset = 0;
      let exprRollOffset = 0;
      let angryIntensity = 0;
      let shakeAmount = 0;

      let activeExprIndex = -1;
      let activeExprIntensity = 0;

      if (expressionIndex >= 0 && expressionStartTime > 0) {
        const expr = EXPRESSIONS[expressionIndex];
        const elapsed = clock - expressionStartTime;
        if (elapsed < expr.duration) {
          activeExprIndex = expressionIndex;
          const t = elapsed / expr.duration;
          activeExprIntensity = Math.sin(t * Math.PI);
        } else {
          expressionIndex = -1;
          expressionStartTime = -1;
          isAutoExpression = false;
        }
      }

      if (activeExprIndex >= 0) {
        // Priority 1: Temporary override (Click, Double-Click Angry, Ctrl+C Angry, or Autonomous)
        const expr = EXPRESSIONS[activeExprIndex];
        const intensity = activeExprIntensity;

        exprOpenLeft = lerp(1, expr.openLeft, intensity);
        exprOpenRight = lerp(1, expr.openRight, intensity);
        exprScaleLeft = lerp(1, expr.scaleLeft, intensity);
        exprScaleRight = lerp(1, expr.scaleRight, intensity);
        exprYawOffset = expr.yawOffset * intensity;
        exprPitchOffset = expr.pitchOffset * intensity;
        exprRollOffset = expr.rollOffset * intensity;

        if (expr.isAngryBrows) {
          angryIntensity = intensity;
          shakeAmount = (expr.shakeAmount || 3.5) * intensity;
        }
      } else if (isTextSelected && skepticalIdx >= 0) {
        // Priority 2: Text Selection Persistent Base State (Skeptical-Left)
        const expr = EXPRESSIONS[skepticalIdx];
        const selElapsed = clock - selectionStartTime;
        const intensity = Math.min(selElapsed / 0.35, 1.0);

        exprOpenLeft = lerp(1, expr.openLeft, intensity);
        exprOpenRight = lerp(1, expr.openRight, intensity);
        exprScaleLeft = lerp(1, expr.scaleLeft, intensity);
        exprScaleRight = lerp(1, expr.scaleRight, intensity);
        exprYawOffset = expr.yawOffset * intensity;
        exprPitchOffset = expr.pitchOffset * intensity;
        exprRollOffset = expr.rollOffset * intensity;
      }

      // Log active expression changes for runtime debugging
      let currentExprName = "normal";
      if (activeExprIndex >= 0) {
        currentExprName = EXPRESSIONS[activeExprIndex].name;
      } else if (isTextSelected && skepticalIdx >= 0) {
        currentExprName = "skeptical-left";
      }

      if (currentExprName !== lastLoggedExpr) {
        lastLoggedExpr = currentExprName;
        console.log(`[Bloub DEBUG] actual active expression: ${currentExprName}`);
      }

      // Authoritative Red Color State during Angry Expression (Zero Green Flash)
      const isAngryActive =
        activeExprIndex >= 0 &&
        (EXPRESSIONS[activeExprIndex].name === "angry" ||
          EXPRESSIONS[activeExprIndex].name === "angry-brows" ||
          !!EXPRESSIONS[activeExprIndex].isAngryBrows);

      if (bodyCircleRef.current && glowCircleRef.current) {
        if (isAngryActive) {
          bodyCircleRef.current.setAttribute("fill", "#ef4444");
          glowCircleRef.current.setAttribute("fill", "#ef4444");
        } else {
          bodyCircleRef.current.setAttribute("fill", "url(#bloubIridescentGrad)");
          glowCircleRef.current.setAttribute("fill", "url(#bloubGlowGrad)");
        }
      }

      // Handle Subtle Inner Body Shake during angry-brows (inside SVG only)
      if (bodyGroupRef.current) {
        if (shakeAmount > 0.05) {
          const sx = (Math.random() - 0.5) * shakeAmount;
          const sy = (Math.random() - 0.5) * shakeAmount;
          bodyGroupRef.current.setAttribute("transform", `translate(${sx.toFixed(2)}, ${sy.toFixed(2)})`);
        } else {
          bodyGroupRef.current.setAttribute("transform", "translate(0, 0)");
        }
      }

      // Compute 3D eye poses on sphere combining gaze tracking and expression offsets
      const [eye1, eye2] = computeEyePoses(
        {
          yaw: currentYaw + idleSwayX + exprYawOffset,
          pitch: currentPitch + idleSwayY + exprPitchOffset,
          roll: currentRoll + exprRollOffset,
        },
        RAYON
      );

      const baseEyeW = RAYON * EYE_W;
      const baseEyeH = RAYON * EYE_H;

      // Final opening includes blinking except during specific winks/expressions
      const finalOpenLeft = blinkOpen * exprOpenLeft;
      const finalOpenRight = blinkOpen * exprOpenRight;

      const pathLeftD = buildCapsulePath(
        baseEyeW * exprScaleLeft,
        baseEyeH * exprScaleLeft,
        finalOpenLeft
      );
      const pathRightD = buildCapsulePath(
        baseEyeW * exprScaleRight,
        baseEyeH * exprScaleRight,
        finalOpenRight
      );

      // Update Left Eye
      if (eyeLeftRef.current && eye1.depth > 0) {
        eyeLeftRef.current.setAttribute("d", pathLeftD);
        eyeLeftRef.current.setAttribute(
          "transform",
          `translate(${(DEMI_VIEWBOX + eye1.x).toFixed(2)}, ${(
            DEMI_VIEWBOX + eye1.y
          ).toFixed(2)}) matrix(${eye1.a.toFixed(4)}, ${eye1.b.toFixed(
            4
          )}, ${eye1.c.toFixed(4)}, ${eye1.d.toFixed(4)}, 0, 0)`
        );
        eyeLeftRef.current.setAttribute("opacity", "1");
      }

      // Update Right Eye
      if (eyeRightRef.current && eye2.depth > 0) {
        eyeRightRef.current.setAttribute("d", pathRightD);
        eyeRightRef.current.setAttribute(
          "transform",
          `translate(${(DEMI_VIEWBOX + eye2.x).toFixed(2)}, ${(
            DEMI_VIEWBOX + eye2.y
          ).toFixed(2)}) matrix(${eye2.a.toFixed(4)}, ${eye2.b.toFixed(
            4
          )}, ${eye2.c.toFixed(4)}, ${eye2.d.toFixed(4)}, 0, 0)`
        );
        eyeRightRef.current.setAttribute("opacity", "1");
      }

      // Update Angry Eyebrows
      if (browLeftRef.current && browRightRef.current) {
        if (angryIntensity > 0.05 && eye1.depth > 0 && eye2.depth > 0) {
          const browOp = angryIntensity.toFixed(2);

          // Left eyebrow slanted down towards center (\)
          browLeftRef.current.setAttribute("opacity", browOp);
          browLeftRef.current.setAttribute(
            "transform",
            `translate(${(DEMI_VIEWBOX + eye1.x).toFixed(2)}, ${(
              DEMI_VIEWBOX + eye1.y - 18
            ).toFixed(2)}) rotate(22)`
          );

          // Right eyebrow slanted down towards center (/)
          browRightRef.current.setAttribute("opacity", browOp);
          browRightRef.current.setAttribute(
            "transform",
            `translate(${(DEMI_VIEWBOX + eye2.x).toFixed(2)}, ${(
              DEMI_VIEWBOX + eye2.y - 18
            ).toFixed(2)}) rotate(-22)`
          );
        } else {
          browLeftRef.current.setAttribute("opacity", "0");
          browRightRef.current.setAttribute("opacity", "0");
        }
      }

      animFrameId = requestAnimationFrame(renderLoop);
    };

    animFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animFrameId);
      if (clickTimeout) clearTimeout(clickTimeout);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("dblclick", handleDblClick);
      document.removeEventListener("selectionchange", checkSelection);
      document.removeEventListener("copy", handleCopy);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mouseup", checkSelection);
      window.removeEventListener("keyup", checkSelection);
    };
  }, [color]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 380 380"
      fill="none"
      className={`pointer-events-auto select-none ${className}`}
      style={{ pointerEvents: "auto", userSelect: "none", WebkitUserSelect: "none" }}
      aria-label="Interactive Bloub Avatar"
      role="img"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Soft ambient under-glow filter */}
        <filter id="bloubGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="28" />
        </filter>

        {/* Primary Luminous Iridescent Multistop Body Gradient */}
        <linearGradient id="bloubIridescentGrad" x1="12%" y1="8%" x2="88%" y2="92%">
          <stop offset="0%" stopColor="#63D8F2" />   {/* Bright Cyan */}
          <stop offset="18%" stopColor="#4F8FD9" />  {/* Sky Blue */}
          <stop offset="38%" stopColor="#687FDF" />  {/* Blue-Violet */}
          <stop offset="55%" stopColor="#8668D9" />  {/* Violet */}
          <stop offset="70%" stopColor="#9A63C7" />  {/* Purple */}
          <stop offset="82%" stopColor="#E76B9B" />  {/* Pink */}
          <stop offset="93%" stopColor="#E17A6C" />  {/* Warm Coral */}
          <stop offset="100%" stopColor="#F2D58A" /> {/* Warm Yellow Highlight */}
        </linearGradient>

        {/* Soft 3D Upper-Left Warm Luminous Highlight Layer */}
        <radialGradient id="bloubLightHighlight" cx="30%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#F3E0B0" stopOpacity="0.4" />  {/* Soft Cream */}
          <stop offset="35%" stopColor="#63D8F2" stopOpacity="0.22" /> {/* Bright Cyan */}
          <stop offset="70%" stopColor="#8668D9" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Soft Holographic Glow Gradient */}
        <linearGradient id="bloubGlowGrad" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#4ECFE8" />
          <stop offset="45%" stopColor="#8668D9" />
          <stop offset="80%" stopColor="#E76B9B" />
          <stop offset="100%" stopColor="#F2D58A" />
        </linearGradient>
      </defs>

      {/* Group wrapper for subtle inner shake during angry-brows without moving hero layout */}
      <g ref={bodyGroupRef}>
        {/* Soft ambient under-glow */}
        <circle
          ref={glowCircleRef}
          cx={DEMI_VIEWBOX}
          cy={DEMI_VIEWBOX}
          r={RAYON + 14}
          fill="url(#bloubGlowGrad)"
          opacity="0.32"
          filter="url(#bloubGlow)"
        />

        {/* Main Bloub Body — Iridescent Circular Silhouette */}
        <circle
          ref={bodyCircleRef}
          cx={DEMI_VIEWBOX}
          cy={DEMI_VIEWBOX}
          r={RAYON}
          fill="url(#bloubIridescentGrad)"
        />

        {/* Soft Luminous Highlight Overlay for 3D Iridescent Depth */}
        <circle
          cx={DEMI_VIEWBOX}
          cy={DEMI_VIEWBOX}
          r={RAYON}
          fill="url(#bloubLightHighlight)"
          style={{ pointerEvents: "none" }}
        />

        {/* Left Eye */}
        <path
          ref={eyeLeftRef}
          fill="#ffffff"
          d={buildCapsulePath(RAYON * EYE_W, RAYON * EYE_H, 1)}
        />

        {/* Right Eye */}
        <path
          ref={eyeRightRef}
          fill="#ffffff"
          d={buildCapsulePath(RAYON * EYE_W, RAYON * EYE_H, 1)}
        />

        {/* Angry Eyebrow Left (\) */}
        <path
          ref={browLeftRef}
          d="M -14 -3 L 14 3"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0"
        />

        {/* Angry Eyebrow Right (/) */}
        <path
          ref={browRightRef}
          d="M -14 3 L 14 -3"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0"
        />
      </g>
    </svg>
  );
}

