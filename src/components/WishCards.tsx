"use client";

import React, { useState } from "react";
import styles from "./WishCards.module.css";
import { Sparkles, Sun, Smile, Compass, HeartHandshake, Heart } from "lucide-react";
import { triggerBlossomExplosion } from "@/utils/flowerConfetti";

interface WishCardItem {
  id: string;
  tag: string;
  title: string;
  message: string;
  icon: React.ReactNode;
  glowColor: string;
}

const WISHES_DATA: WishCardItem[] = [
  {
    id: "radiance",
    tag: "Nhan Sắc & Nụ Cười",
    title: "Rạng Rỡ & Xinh Tươi",
    message:
      "Chúc Chang luôn giữ trọn nét hồn nhiên, đôi mắt sáng và nụ cười rạng ngời như ánh nắng sớm ban mai. Mong bạn lúc nào cũng tươi tắn, yêu đời và tự tin tỏa sáng với vẻ duyên dáng rất riêng!",
    icon: <Smile size={24} color="#ff7597" />,
    glowColor: "rgba(255, 67, 113, 0.4)",
  },
  {
    id: "peace",
    tag: "Bình Yên & Niềm Vui",
    title: "Mỗi Ngày Đều An Nhiên",
    message:
      "Mong cuộc sống luôn đối đãi với Chang thật dịu dàng. Chúc bạn có những sớm mai thảnh thơi, ăn những món ngon bạn thích, ghé những nơi bạn mơ và tối về luôn có những giấc ngủ thật say nồng, trút bỏ mọi âu lo.",
    icon: <Sun size={24} color="#f6c86a" />,
    glowColor: "rgba(246, 200, 106, 0.4)",
  },
  {
    id: "confidence",
    tag: "Tương Lai & Ước Mơ",
    title: "Bản Lĩnh Chạm Tới Ước Mơ",
    message:
      "Hãy kiên định bước trên con đường bạn đã chọn nhé. Chúc Chang luôn thông minh, bản lĩnh theo đuổi đam mê, gặt hái thật nhiều thành tích và sớm chạm tới mọi ước mơ mà bạn hằng ấp ủ!",
    icon: <Compass size={24} color="#ff9ebb" />,
    glowColor: "rgba(255, 158, 187, 0.4)",
  },
  {
    id: "love",
    tag: "Tình Bạn & Điểm Tựa",
    title: "Bạn Bè Luôn Bên Cạnh",
    message:
      "Dù ngoài kia có áp lực hay thử thách thế nào, hãy nhớ rằng bạn bè và mọi người luôn là điểm tựa ấm áp. Với tất cả mọi người, Chang luôn là một người bạn tuyệt vời và đáng trân trọng.",
    icon: <HeartHandshake size={24} color="#ffd166" />,
    glowColor: "rgba(255, 209, 102, 0.4)",
  },
];

export default function WishCards() {
  const [flowerCounts, setFlowerCounts] = useState<Record<string, number>>({});

  const handleSendFlowerToCard = (cardId: string, e: React.MouseEvent) => {
    setFlowerCounts((prev) => ({
      ...prev,
      [cardId]: (prev[cardId] || 0) + 1,
    }));

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerBlossomExplosion(x, y);
  };

  return (
    <section className={styles.wishesSection}>
      <div className={styles.sectionHeader}>
        <div className={styles.badge}>
          <Sparkles size={14} color="#ff9ebb" />
          <span>Vườn Hoa Yêu Thương</span>
        </div>
        <h2 className={styles.sectionTitle}>Những Lời Chúc Ngọt Ngào Dành Cho Em</h2>
        <p className={styles.sectionDesc}>
          Mỗi đóa hoa là một lời chúc chân thành nhất mà anh muốn gửi tặng cô em gái nhỏ.
        </p>
      </div>

      <div className={styles.cardsGrid}>
        {WISHES_DATA.map((item) => (
          <div key={item.id} className={styles.wishCard}>
            <div
              className={styles.cardGlowCorner}
              style={{ background: item.glowColor }}
            />

            <div>
              <div className={styles.cardTop}>
                <div className={styles.iconBox}>{item.icon}</div>
                <span className={styles.cardTag}>{item.tag}</span>
              </div>

              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardMessage}>{item.message}</p>
            </div>

            <div className={styles.cardFooter}>
              <button
                type="button"
                className={styles.sendFlowerBtn}
                onClick={(e) => handleSendFlowerToCard(item.id, e)}
              >
                <span>💐 Tặng hoa cho em</span>
              </button>

              <span className={styles.countText}>
                <Heart size={13} fill="#f6c86a" color="#f6c86a" />
                <span>
                  {flowerCounts[item.id] ? `+${flowerCounts[item.id]} đóa hoa` : "Gửi yêu thương"}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
