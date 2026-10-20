import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Dancing_Script, Playfair_Display } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const dancingScript = Dancing_Script({
  weight: ["400", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-dancing",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "600", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chúc Mừng 20/10 🌸 - Thương Gửi Bạn Chang",
  description: "Món quà thiệp hoa và những lời chúc yêu thương nhất gửi tặng bạn Chang nhân ngày 20/10.",
  keywords: ["20/10", "chúc mừng 20/10", "bạn Chang", "Chang", "thiệp 20/10 tặng bạn"],
  openGraph: {
    title: "Chúc Mừng 20/10 - Thương Gửi Bạn Chang 💐",
    description: "Chạm vào đóa hoa để mở bức thư yêu thương và cơn mưa hoa rực rỡ dành riêng cho bạn Chang!",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2b0c20",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${dancingScript.variable} ${playfair.variable}`}
    >
      <body className={beVietnam.className}>{children}</body>
    </html>
  );
}
