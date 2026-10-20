"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./EnvelopeLetter.module.css";
import { Heart, Mail, Sparkles, X, BookOpen } from "lucide-react";
import { triggerBlossomExplosion } from "@/utils/flowerConfetti";

interface EnvelopeLetterProps {
  recipientName?: string;
}

export default function EnvelopeLetter({ recipientName }: EnvelopeLetterProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayName = recipientName?.trim() || "Chang";
  const isPrefixPresent = /^(bạn|em|bé|cô)/i.test(displayName);
  const letterTag = isPrefixPresent ? displayName : `bạn ${displayName}`;

  const handleOpenModal = () => {
    triggerBlossomExplosion(0.5, 0.4);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen]);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => prev + 1);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerBlossomExplosion(x, y);
  };

  const modalElement = isModalOpen ? (
    <div
      className={styles.modalOverlay}
      onClick={handleCloseModal}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={styles.modalPaper}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          className={styles.closeModalBtn}
          onClick={handleCloseModal}
          aria-label="Đóng bức thư"
        >
          <X size={20} />
        </button>

        <div className={styles.paperHeader}>
          <h2 className={styles.paperGreeting}>
            Gửi {displayName} – người bạn tuyệt vời của tớ!
          </h2>
          <span className={styles.paperBadge}>20/10/2026</span>
        </div>

        <div className={styles.letterBody}>
          <p>
            Nhân ngày 20/10, tớ viết mấy dòng này gửi tặng Chang – người bạn lúc nào cũng mang lại tiếng cười, sự ấm áp và nguồn năng lượng tích cực cho mọi người xung quanh.
          </p>

          <p>
            Thời gian trôi thật nhanh, cảm ơn Chang vì đã luôn là một người bạn đáng yêu, thấu hiểu và chân thành. Được quen biết và đồng hành cùng Chang là một điều rất tuyệt vời và đáng quý đối với tớ.
          </p>

          <div className={styles.letterPoem}>
            &ldquo;Mong bạn một đời bình an, nhiều may mắn,<br />
            Nụ cười luôn trong trẻo tựa ánh ban mai.<br />
            Dù đường đời dẫu có lắm chông gai,<br />
            Hãy luôn nhớ: Bên cạnh bạn luôn có những người bạn đồng hành!&rdquo;
          </div>

          <p>
            20/10 năm nay, chúc Chang luôn giữ trọn nụ cười rạng rỡ trên môi, mỗi ngày mới đều có thật nhiều niềm vui. Chúc bạn học tập và công việc thật suôn sẻ, tự tin đạt được những mục tiêu mà bạn hằng ấp ủ. Nhớ là đừng bao giờ tạo quá nhiều áp lực cho bản thân nhé; hãy luôn ăn ngon miệng, ngủ đủ giấc, thích chiếc váy nào thì cứ tự tin diện, và yêu thương bản thân mình thật nhiều!
          </p>

          <p>
            Dù mai này cuộc sống có bận rộn đến đâu, chúc tình bạn của chúng mình vẫn mãi bền đẹp và luôn có thật nhiều kỷ niệm đáng nhớ cùng nhau.
          </p>

          <p style={{ marginTop: "14px", fontWeight: 600, color: "#930d37" }}>
            Chúc mừng ngày 20/10 bạn Chang nhé! Chúc bạn luôn tự tin, xinh đẹp và ngập tràn hạnh phúc! 🌸✨
          </p>
        </div>

        <div className={styles.letterSignature}>
          <div className={styles.signRole}>Người bạn luôn đồng hành và ủng hộ,</div>
          <div className={styles.signName}>Bạn của Chang 💕</div>
        </div>

        <div className={styles.letterActions}>
          <button className={styles.heartBtn} onClick={handleHeartClick}>
            <Heart size={16} fill="#fff" />
            <span>Thả tim cho bạn Chang {likes > 0 && `(${likes})`}</span>
          </button>

          <button
            className={styles.closeLetterBtn}
            onClick={handleCloseModal}
            title="Đóng bức thư"
          >
            <span>Đóng thư</span>
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <section className={styles.letterSection}>
      {/* Sealed Envelope Card on the main page */}
      <div className={styles.envelopeWrapper}>
        <div
          className={styles.envelope}
          onClick={handleOpenModal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleOpenModal();
          }}
          aria-label="Nhấn để mở popup bức thư chúc mừng 20/10"
        >
          {/* 3D Envelope Flap & Folds */}
          <div className={styles.envelopeFlap} />
          <div className={styles.foldLineLeft} />
          <div className={styles.foldLineRight} />

          {/* Ornate Wax Seal */}
          <div className={styles.waxSeal}>
            <div className={styles.sealInnerRing}>
              <span className={styles.sealDate}>20/10</span>
              <span className={styles.sealText}>Gửi Chang</span>
            </div>
          </div>

          <div className={styles.envelopeHint}>
            <Mail size={18} color="#f6c86a" />
            <span>Bức thư riêng gửi tặng <strong>{letterTag}</strong> 💌</span>
            <Sparkles size={16} color="#ff7597" />
          </div>

          <div className={styles.envelopeSub}>
            <BookOpen size={14} className={styles.subIcon} />
            <span>Chạm vào phong thư để mở bức tâm thư (Popup) ✨</span>
          </div>
        </div>
      </div>

      {/* Portal to document.body: Guarantees Topmost Stacking and True Centering */}
      {mounted && modalElement && createPortal(modalElement, document.body)}
    </section>
  );
}
