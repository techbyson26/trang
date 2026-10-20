"use client";

import React, { useState } from "react";
import styles from "./PersonalizeModal.module.css";
import { X, Copy, Check, Sparkles } from "lucide-react";
import { triggerBlossomExplosion } from "@/utils/flowerConfetti";

interface PersonalizeModalProps {
  currentName: string;
  onUpdateName: (newName: string) => void;
  onClose: () => void;
}

const QUICK_NAMES = ["Chang", "Bạn Chang", "Bé Chang", "Chang Chang", "Trang"];

export default function PersonalizeModal({
  currentName,
  onUpdateName,
  onClose,
}: PersonalizeModalProps) {
  const [nameInput, setNameInput] = useState(currentName || "");
  const [copied, setCopied] = useState(false);

  const handleSelectQuickChip = (chip: string) => {
    setNameInput(chip);
    onUpdateName(chip);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNameInput(val);
    onUpdateName(val);
  };

  const handleCopyLink = () => {
    const trimmed = nameInput.trim();
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = trimmed ? `${baseUrl}?to=${encodeURIComponent(trimmed)}` : baseUrl;

    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      triggerBlossomExplosion(0.5, 0.5);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Đóng cửa sổ">
          <X size={18} />
        </button>

        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Cá Nhân Hóa Lời Chúc</h3>
          <p className={styles.modalDesc}>
            Nhập tên để tạo đường dẫn thiệp chúc mừng riêng biệt gửi tặng bạn bè
          </p>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Tên người nhận thiệp:</label>
          <input
            type="text"
            className={styles.textInput}
            placeholder="Ví dụ: Chang, Bạn Chang, Bé Chang..."
            value={nameInput}
            onChange={handleInputChange}
            maxLength={35}
            autoFocus
          />
        </div>

        {/* Quick select chips */}
        <div className={styles.quickChips}>
          {QUICK_NAMES.map((chip) => (
            <button
              key={chip}
              type="button"
              className={`${styles.chip} ${nameInput === chip ? styles.chipActive : ""}`}
              onClick={() => handleSelectQuickChip(chip)}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Live Preview */}
        <div className={styles.previewBox}>
          <div>🌸 Tiêu đề bức thư sẽ hiển thị:</div>
          <div className={styles.previewText}>
            &ldquo;Gửi {nameInput.trim() || "Chang"} – người bạn tuyệt vời của tớ...&rdquo;
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button
            type="button"
            className={`${styles.copyBtn} ${copied ? styles.copied : ""}`}
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
                <Check size={18} />
                <span>Đã sao chép liên kết!</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                <span>Sao chép link gửi tặng</span>
                <Sparkles size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
