"use client";

import React, { useEffect, useMemo, useState } from "react";

type Zodiac =
  | "牡羊座"
  | "牡牛座"
  | "双子座"
  | "蟹座"
  | "獅子座"
  | "乙女座"
  | "天秤座"
  | "蠍座"
  | "射手座"
  | "山羊座"
  | "水瓶座"
  | "魚座";

const ZODIACS: Zodiac[] = [
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

function formatYmd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// 例：適当にメッセージを返す（あなたのロジックがあるならここを差し替え）
function getFortuneMessage(zodiac: Zodiac) {
  const pool = [
    "決めるなら、あとで納得できる選択を。急がなくてOK。",
    "今日は小さな整頓が運を呼ぶ。5分だけ片付けると良い。",
    "遠慮せず一言だけ伝えると、流れがよくなる日。",
    "期待値を下げると、むしろ気持ちが軽くなる。",
    "寄り道がヒントになる。いつもと違う道を選ぶのもあり。",
  ];
  // zodiacで少し変化させたいならここ
  const idx = (zodiac.charCodeAt(0) + zodiac.length) % pool.length;
  return pool[idx];
}

const STORAGE_KEY = "kyou-uranatte:daily";

export default function Page() {
  const today = useMemo(() => formatYmd(new Date()), []);
  const [zodiac, setZodiac] = useState<Zodiac>("水瓶座");
  const [result, setResult] = useState<string>("");
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);

  // 初期復元：今日の結果があれば復元
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        date: string;
        zodiac: Zodiac;
        result: string;
      };
      if (parsed?.date === today && parsed?.result) {
        setZodiac(parsed.zodiac);
        setResult(parsed.result);
        setHasDrawn(true);
      }
    } catch {
      // noop
    }
  }, [today]);

  const draw = () => {
    if (hasDrawn) return;
    const msg = getFortuneMessage(zodiac);
    setResult(msg);
    setHasDrawn(true);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ date: today, zodiac, result: msg })
      );
    } catch {
      // noop
    }
  };

  const copy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      // 必要ならトースト等
    } catch {
      // clipboardが使えない環境向けフォールバック
      const ta = document.createElement("textarea");
      ta.value = result;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  };

  const changeZodiac = () => {
    // 例：次の星座に回す（UIは好きに差し替えてOK）
    const idx = ZODIACS.indexOf(zodiac);
    const next = ZODIACS[(idx + 1) % ZODIACS.length];
    // 今日すでに引いている場合、星座変更をロックしたいならここでreturn
    // if (hasDrawn) return;
    setZodiac(next);
  };

  return (
    <main style={styles.page}>
      {/* ===== HERO ===== */}
      <section style={styles.hero}>
        {/* 背景動画 */}
        <video
          src="/videos/header.mp4"
          poster="/bg.png"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          style={styles.heroVideo}
        />

        {/* 暗すぎ問題：ここを薄くしてある */}
        <div style={styles.heroGradient} />

        {/* 中央タイトル */}
        <div style={styles.heroTitleWrap}>
          <h1 style={styles.heroTitle}>今日、占っていいですか？</h1>
        </div>

        {/* 星座行：中央固定（左右にズレない） */}
        <div style={styles.heroRowWrap}>
          <div style={styles.heroRow}>
            {/* 左：中央固定のためのダミー */}
            <div style={{ width: 120 }} />

            {/* 中央：星座/日付 */}
            <div style={styles.centerLine}>
              <span style={styles.centerLineText}>
                {zodiac} / {today}
              </span>
            </div>

            {/* 右：星座変更 */}
            <button type="button" onClick={changeZodiac} style={styles.changeBtn}>
              星座を変更
            </button>
          </div>
        </div>
      </section>

      {/* ===== RESULT CARD（ヘッダーの外に出す） ===== */}
      <section style={styles.resultSection}>
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.cardLabel}>疲れた心をふんわり癒す一言おみくじ占い</div>
            <div style={styles.cardText}>{result || "まずは「引く」を押してください。"}</div>
          </div>
        </div>
      </section>

      {/* ===== ACTIONS ===== */}
      <section style={styles.actionsSection}>
        <div style={styles.container}>
          <div style={styles.actionsRow}>
            <button
              type="button"
              onClick={draw}
              disabled={hasDrawn}
              style={{
                ...styles.drawBtn,
                ...(hasDrawn ? styles.drawBtnDisabled : null),
              }}
            >
              {hasDrawn ? "今日はもう引きました" : "今日の一言を引く"}
            </button>

            <button
              type="button"
              onClick={copy}
              disabled={!result}
              style={{
                ...styles.copyBtn,
                ...(!result ? styles.copyBtnDisabled : null),
              }}
            >
              コピー
            </button>
          </div>

          <p style={styles.note}>※ 本アプリは娯楽目的です。気楽にどうぞ。</p>
        </div>
      </section>
    </main>
  );
}

/* =======================
   Styles
======================= */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100svh",
    background: "#f5eaf1",
  },

  hero: {
    position: "relative",
    height: 320,
    overflow: "hidden",
  },
  heroVideo: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "contain", // containだと余白が出てズレやすいのでcover推奨
    display: "block",
    zIndex: 0,
    pointerEvents: "none",
  },
  heroGradient: {
    position: "absolute",
    inset: 0,
    // 暗すぎ対策：薄め
    background: "linear-gradient(to bottom, rgba(0,0,0,0.12), rgba(0,0,0,0.00))",
    zIndex: 1,
    pointerEvents: "none",
  },

  heroTitleWrap: {
    position: "absolute",
    inset: 0,
    zIndex: 2,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 44,
    pointerEvents: "none",
  },
  heroTitle: {
    margin: 0,
    fontSize: 44,
    fontWeight: 800,
    letterSpacing: "0.04em",
    color: "#ffd7e8",
    textShadow: "0 2px 12px rgba(0,0,0,0.25)",
    WebkitTextStroke: "1px rgba(190, 80, 150, 0.55)",
  },

  heroRowWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 18,
    zIndex: 2,
    pointerEvents: "auto",
  },
  heroRow: {
    maxWidth: 960,
    margin: "0 auto",
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  centerLine: {
    flex: 1,
    textAlign: "center",
  },
  centerLineText: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.45)",
    backdropFilter: "blur(6px)",
    color: "#1a1a1a",
    fontWeight: 700,
  },

  changeBtn: {
    width: 120,
    whiteSpace: "nowrap",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.14)",
    background: "rgba(255,255,255,0.55)",
    padding: "10px 12px",
    fontWeight: 700,
    cursor: "pointer",
  },

  resultSection: {
    // ヘッダーのすぐ下に置きつつ、少しだけ被せる（前の位置感を再現）
    marginTop: -42,
    paddingBottom: 18,
  },

  container: {
    maxWidth: 960,
    margin: "0 auto",
    padding: "0 16px",
  },

  card: {
    background: "rgba(255,255,255,0.92)",
    borderRadius: 18,
    boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
    padding: "18px 18px",
  },
  cardLabel: {
    fontSize: 13,
    color: "rgba(0,0,0,0.55)",
    marginBottom: 10,
    fontWeight: 700,
  },
  cardText: {
    fontSize: 22,
    fontWeight: 800,
    lineHeight: 1.45,
    color: "#111",
    wordBreak: "break-word",
  },

  actionsSection: {
    padding: "10px 0 40px",
  },
  actionsRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },

  drawBtn: {
    flex: 1,
    borderRadius: 999,
    padding: "16px 16px",
    border: "1px solid rgba(0,0,0,0.12)",
    background: "rgba(255,255,255,0.75)",
    fontWeight: 900,
    cursor: "pointer",
  },
  drawBtnDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  copyBtn: {
    width: 120,
    borderRadius: 999,
    padding: "16px 14px",
    border: "1px solid rgba(0,0,0,0.12)",
    background: "rgba(255,255,255,0.75)",
    fontWeight: 900,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  copyBtnDisabled: {
    opacity: 0.55,
    cursor: "not-allowed",
  },

  note: {
    marginTop: 14,
    fontSize: 12,
    color: "rgba(0,0,0,0.55)",
  },
};
