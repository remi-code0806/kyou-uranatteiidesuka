"use client";

import { useState } from "react";

const ZODIACS = [
  "牡羊座",
  "牡牛座",
  "双子座",
  "蟹座",
  "獅子座",
  "乙女座",
  "天秤座",
  "蠍座",
  "射手座",
  "山羊座",
  "水瓶座",
  "魚座",
];

export default function Home() {
  const today = new Date().toISOString().slice(0, 10);
  const [zodiac, setZodiac] = useState("水瓶座");
  const [result, setResult] = useState<string | null>(null);

  const drawFortune = () => {
    setResult("今日は無理をしないことが、いちばんの開運行動です。");
  };

  return (
    <main style={{ background: "#f5eaf1", minHeight: "100vh" }}>
      {/* ===== ヘッダー ===== */}
      <header style={{ position: "relative", height: 320 }}>
        <video
          src="/videos/header.mp4"
          poster="/bg.png"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />

        {/* 暗さ控えめ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.12), rgba(0,0,0,0))",
          }}
        />

        {/* タイトル */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
          }}
        >

          {/* 星座選択（一覧） */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <select
              value={zodiac}
              onChange={(e) => setZodiac(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                fontSize: 14,
              }}
            >
              {ZODIACS.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
            <span style={{ color: "#fff" }}>{today}</span>
          </div>
        </div>
      </header>

      {/* ===== リザルトカード（ヘッダーの下） ===== */}
      <section style={{ padding: "24px 16px" }}>
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            background: "#fff",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <p
            style={{
              fontSize: 20,
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {result ?? "まだ結果は出ていません"}
          </p>
        </div>
      </section>

      {/* ===== ボタン ===== */}
      <section style={{ padding: "0 16px 40px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <button
            onClick={drawFortune}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: 999,
              border: "none",
              fontSize: 16,
              fontWeight: 700,
              background: "#fff",
              cursor: "pointer",
            }}
          >
            今日の一言を引く
          </button>
        </div>
      </section>
    </main>
  );
}
