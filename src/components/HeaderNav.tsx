"use client";

import React, { useState, useEffect } from "react";
import styles from "./HeaderNav.module.css";
import { Flower2, Sparkles, Volume2, VolumeX, Share2, RotateCcw } from "lucide-react";
import { triggerBlossomExplosion } from "@/utils/flowerConfetti";
import { romanticAudio } from "@/utils/audioPlayer";

interface HeaderNavProps {
  onReset: () => void;
  onOpenPersonalize: () => void;
}

export default function HeaderNav({ onReset, onOpenPersonalize }: HeaderNavProps) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    // Check initial music status
    if (romanticAudio) {
      setIsPlayingMusic(romanticAudio.getStatus());
    }
  }, []);

  const handleToggleMusic = () => {
    if (romanticAudio) {
      const playing = romanticAudio.toggle();
      setIsPlayingMusic(playing);
    }
  };

  const handleBurstMoreFlowers = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerBlossomExplosion(x, y);
  };

  return (
    <nav className={styles.headerNav}>
      <div className={styles.brand} onClick={onReset} title="Về lại đóa hoa ban đầu">
        <Flower2 className={styles.brandFlower} size={20} />
        <span className={styles.brandText}>20/10 Gửi Tặng Bạn Chang 🌸</span>
      </div>

      <div className={styles.actions}>
        {/* Burst more flowers button */}
        <button
          className={styles.navButton}
          onClick={handleBurstMoreFlowers}
          title="Tung thêm bão hoa trên màn hình"
        >
          <Sparkles size={16} color="#f6c86a" />
          <span className={styles.btnText}>Thả Hoa</span>
        </button>

        {/* Music button */}
        <button
          className={styles.navButton}
          onClick={handleToggleMusic}
          title={isPlayingMusic ? "Tắt nhạc" : "Bật nhạc piano lãng mạn"}
        >
          {isPlayingMusic ? (
            <Volume2 size={16} color="#ff7597" />
          ) : (
            <VolumeX size={16} color="#b08194" />
          )}
          <div className={styles.soundwave}>
            <span className={`${styles.bar} ${isPlayingMusic ? styles.barPlaying : ""}`} />
            <span className={`${styles.bar} ${isPlayingMusic ? styles.barPlaying : ""}`} />
            <span className={`${styles.bar} ${isPlayingMusic ? styles.barPlaying : ""}`} />
          </div>
          <span className={styles.btnText}>{isPlayingMusic ? "Nhạc: Bật" : "Nhạc: Tắt"}</span>
        </button>

        {/* Personalize Button */}
        <button
          className={styles.navButton}
          onClick={onOpenPersonalize}
          title="Tạo link chúc kèm tên người nhận"
        >
          <Share2 size={16} color="#ffeef2" />
          <span className={styles.btnText}>Gửi Tặng</span>
        </button>

        {/* Replay Flower Button */}
        <button
          className={styles.navButton}
          onClick={onReset}
          title="Ngắm lại đóa hoa đầu tiên"
        >
          <RotateCcw size={16} color="#e6b8c8" />
        </button>
      </div>
    </nav>
  );
}
