"use client";

import React, { useState } from "react";
import styles from "./RosePortal.module.css";
import { Sparkles, Heart } from "lucide-react";
import { triggerBlossomExplosion, triggerContinuousFlowerRain } from "@/utils/flowerConfetti";
import { romanticAudio } from "@/utils/audioPlayer";

interface RosePortalProps {
  onBloomComplete: () => void;
}

export default function RosePortal({ onBloomComplete }: RosePortalProps) {
  const [isBlooming, setIsBlooming] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleClickFlower = (e: React.MouseEvent) => {
    if (isBlooming) return;
    setIsBlooming(true);

    // Get click position for confetti origin
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // Trigger flower confetti bursts
    triggerBlossomExplosion(x, y);
    triggerContinuousFlowerRain(3500);

    // Start romantic background music
    if (romanticAudio) {
      romanticAudio.play();
    }

    // Smooth transition
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onBloomComplete();
      }, 700);
    }, 600);
  };

  return (
    <div className={`${styles.portalContainer} ${isExiting ? styles.exiting : ""}`}>
      {/* Ambient background glows */}
      <div className={styles.glowBackdrop} />
      <div className={styles.pulseRing1} />
      <div className={styles.pulseRing2} />
      <div className={styles.pulseRing3} />

      {/* Flower Interaction Trigger */}
      <button
        className={`${styles.flowerButton} ${isBlooming ? styles.blooming : ""}`}
        onClick={handleClickFlower}
        aria-label="Chạm vào đóa hoa để mở thiệp chúc mừng"
      >
        <svg
          className={styles.flowerSvg}
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients for realistic velvety petals */}
            <radialGradient id="outerPetalGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff4d79" />
              <stop offset="60%" stopColor="#c71545" />
              <stop offset="100%" stopColor="#6e0520" />
            </radialGradient>

            <radialGradient id="midPetalGlow" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#ff7597" />
              <stop offset="50%" stopColor="#e01a4f" />
              <stop offset="100%" stopColor="#8a0729" />
            </radialGradient>

            <radialGradient id="innerPetalGlow" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ffb3c6" />
              <stop offset="40%" stopColor="#ff4371" />
              <stop offset="100%" stopColor="#aa0d36" />
            </radialGradient>

            <radialGradient id="goldHeartGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff5cc" />
              <stop offset="35%" stopColor="#f6c86a" />
              <stop offset="100%" stopColor="#b37d14" />
            </radialGradient>

            <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#408339" />
              <stop offset="100%" stopColor="#1f4c1a" />
            </linearGradient>

            <filter id="bloomSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#ff1744" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Stem & Romantic Leaves */}
          <path
            d="M 150 210 Q 152 260 148 290"
            stroke="url(#stemGrad)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            className={styles.leafRight}
            d="M 150 240 Q 185 230 195 245 Q 170 260 150 252"
            fill="#32732a"
            opacity="0.9"
          />
          <path
            className={styles.leafLeft}
            d="M 148 250 Q 115 242 105 258 Q 130 270 148 260"
            fill="#295d23"
            opacity="0.9"
          />

          {/* Outer Layer Petals (Layer 1 - Broad velvet petals) */}
          <g filter="url(#bloomSoftShadow)">
            {/* Top Petal */}
            <path
              d="M 150 150 C 120 70 180 70 150 150"
              transform="rotate(0 150 150) scale(1.6) translate(-56 -56)"
              fill="url(#outerPetalGlow)"
            />
            {/* 6 Outer Petals in Radial symmetry */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <path
                key={`outer-${i}`}
                d="M 150 150 C 105 60 195 60 150 150"
                transform={`rotate(${angle} 150 150) scale(1.35) translate(-39 -39)`}
                fill="url(#outerPetalGlow)"
                stroke="#ff7597"
                strokeWidth="0.8"
                strokeOpacity="0.5"
              />
            ))}
          </g>

          {/* Middle Layer Petals (Layer 2 - Interlocking curving petals) */}
          <g>
            {[30, 90, 150, 210, 270, 330].map((angle, i) => (
              <path
                key={`mid-${i}`}
                d="M 150 150 C 115 80 185 80 150 150"
                transform={`rotate(${angle} 150 150) scale(1.1) translate(-14 -14)`}
                fill="url(#midPetalGlow)"
                stroke="#ffd2dc"
                strokeWidth="0.6"
                strokeOpacity="0.6"
              />
            ))}
          </g>

          {/* Inner Layer Petals (Layer 3 - Dense blooming rose bud) */}
          <g>
            {[15, 75, 135, 195, 255, 315].map((angle, i) => (
              <path
                key={`inner-${i}`}
                d="M 150 150 C 125 100 175 100 150 150"
                transform={`rotate(${angle} 150 150) scale(0.85) translate(26 26)`}
                fill="url(#innerPetalGlow)"
              />
            ))}
          </g>

          {/* Center Swirl & Golden Core */}
          <circle cx="150" cy="150" r="28" fill="url(#innerPetalGlow)" />
          <path
            d="M 142 145 C 145 138 155 138 158 145 C 160 153 140 156 142 162 C 144 165 154 165 156 160"
            fill="none"
            stroke="#ffebef"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Golden Pollen Sparkles */}
          <g className={styles.pollenSparkles}>
            <circle cx="145" cy="148" r="3" fill="url(#goldHeartGlow)" />
            <circle cx="155" cy="146" r="2.5" fill="url(#goldHeartGlow)" />
            <circle cx="152" cy="156" r="3.2" fill="url(#goldHeartGlow)" />
            <circle cx="143" cy="155" r="2" fill="url(#goldHeartGlow)" />
          </g>
        </svg>
      </button>

      {/* Interactive Guidance Prompt */}
      <div className={styles.promptBadge} onClick={handleClickFlower}>
        <Heart className={styles.heartIcon} size={18} fill="#ff4371" />
        <span className={styles.promptText}>Chạm nhẹ vào đóa hoa để mở món quà bí mật cho bạn Chang ✨</span>
        <Sparkles className={styles.sparkleIcon} size={18} />
      </div>

      <div className={styles.dateSub}>20 Tháng 10 • Yêu Thương Gửi Tặng Bạn Chang</div>
    </div>
  );
}
