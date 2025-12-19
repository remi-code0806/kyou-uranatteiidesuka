"use client";

import { useEffect, useMemo, useState } from "react";

type Sign =
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

const SIGNS: Sign[] = [
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

const LS_KEY_SIGN = "kyo-uranatte:sign";
const LS_KEY_LAST_DATE = "kyo-uranatte:lastDate";
const LS_KEY_LAST_MESSAGE = "kyo-uranatte:lastMessage";

function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function Home() {
  const [sign, setSign] = useState<Sign | null>(null);
  const [view, setView] = useState<"pick" | "result">("pick");
  const [message, setMessage] = useState("");
  const [alreadyDrawn, setAlreadyDrawn] = useState(false);

  const templates = useMemo(
    () => [
      "今日は調子がいい日。周りの人の助けをひとつだけ。",
      "忙しい日ほど一息が大事。少し立ち止まって整えよう。",
      "落ち着いて進みたい一日。順番を大切にしてみて。",
      "決めるなら、あとで納得できる選択を。急がなくてOK。",
      "うれしいことがあったら感謝をひとつ。気分が整うよ。",
      "頑張りすぎなくて大丈夫。いつも通りで十分。",
      "人の話を丁寧に聞くと◎。誤解を減らせそう。",
      "小さな達成で合格。ひとつ終えられたらOK。",
    ],
    []
  );

  useEffect(() => {
    const savedSign = (localStorage.getItem(LS_KEY_SIGN) as Sign | null) ?? null;
    const last = localStorage.getItem(LS_KEY_LAST_DATE);
    const lastMsg = localStorage.getItem(LS_KEY_LAST_MESSAGE) || "";

    if (savedSign) {
      setSign(savedSign);
      setView("result");
    }
    if (last === todayKey() && lastMsg) {
      setAlreadyDrawn(true);
      setMessage(lastMsg);
    }
  }, []);

  function handleSelectSign(s: Sign) {
    setSign(s);
    localStorage.setItem(LS_KEY_SIGN, s);
    setView("result");
  }

  function drawOmikuji() {
    if (!sign) return;

    const today = todayKey();
    if (localStorage.getItem(LS_KEY_LAST_DATE) === today) {
      setAlreadyDrawn(true);
      return;
    }

    const msg = templates[Math.floor(Math.random() * templates.length)];
    localStorage.setItem(LS_KEY_LAST_DATE, today);
    localStorage.setItem(LS_KEY_LAST_MESSAGE, msg);

    setMessage(msg);
    setAlreadyDrawn(true);
  }

  async function copyText() {
    const txt = `今日占っていいですか？\n${sign ?? ""}\n${message}`;
    await navigator.clipboard.writeText(txt);
    alert("コピーしました");
  }

  function resetSign() {
    localStorage.removeItem(LS_KEY_SIGN);
    localStorage.removeItem(LS_KEY_LAST_DATE);
    localStorage.removeItem(LS_KEY_LAST_MESSAGE);
    setSign(null);
    setMessage("");
    setAlreadyDrawn(false);
    setView("pick");
  }

  return (
     <div style={{ minHeight: "100vh", backgroundColor: "#f6e9f2" }}>
    {/* ヘッダー動画ゾーン */}
<div
  style={{
    position: "relative",
    height: 260,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
    zIndex: 0,
  }}
>
  <video
    src="/videos/header.mp4"
    poster="/bg.png"
    autoPlay
    muted
    playsInline
    preload="auto"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "contain",
      display: "block",
      zIndex: 0,
      pointerEvents: "none",
    }}
  />

  {/* 文字の読みやすさ用：薄い暗幕 */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.10))",
      zIndex: 1,
      pointerEvents: "none",
    }}
  />

  {/* テキストオーバーレイ */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      zIndex: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      padding: "18px 16px",
      textAlign: "center",
      pointerEvents: "none",
      gap: 6,
    }}
  >
    <div
      style={{
        color: "white",
        fontSize: 16,
        fontWeight: 800,
        letterSpacing: "0.02em",
        fontFamily:
          '"M PLUS Rounded 1c","Hiragino Maru Gothic ProN","Hiragino Sans","Noto Sans JP","Meiryo",sans-serif',
        textShadow: "0 2px 10px rgba(0,0,0,0.35)",
      }}
    >
      疲れた心をふんわり癒す一言おみくじ占い
    </div>

    <div
      style={{
        color: "white",
        fontSize: 14,
        fontWeight: 800,
        letterSpacing: "0.04em",
        fontFamily:
          '"M PLUS Rounded 1c","Hiragino Maru Gothic ProN","Hiragino Sans","Noto Sans JP","Meiryo",sans-serif',
        textShadow: "0 2px 10px rgba(0,0,0,0.35)",
      }}
    >
      {sign ?? ""} / {todayKey()}
    </div>
  </div>
</div>


      {/* 中身UI */}
      <main
        style={{
          position: "relative", 
          zIndex: 1,  
          maxWidth: 520,
          margin: "-120px auto 0",
          padding: 20,
          lineHeight: 1.6,
        }}
      >
        

        {view === "pick" && (
          <section>
            <h2 style={{ fontSize: 16, marginBottom: 10 }}>星座を選んでね</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {SIGNS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSelectSign(s)}
                  style={{
                    padding: "10px 8px",
                    borderRadius: 12,
                    border: "1px solid #ddd",
                    background: "white",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </section>
        )}

        {view === "result" && (
          <section>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
                gap: 12,
              }}
            >
              <div style={{ opacity: 0.85 }}>
                {sign} / {todayKey()}
              </div>
              <button
                onClick={resetSign}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
              >
                星座を変更
              </button>
            </div>

            <div
              style={{
                marginTop: 12,
                padding: 16,
                borderRadius: 16,
                border: "1px solid #e5e5e5",
                background: "rgba(255,255,255,0.92)",
                boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
                minHeight: 90,
                display: "flex",
                alignItems: "center",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {message || "今日の一言を引いてみよう。"}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button
                onClick={drawOmikuji}
                disabled={alreadyDrawn}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: 20,
                  border: "1px solid #ddd",
                  background: alreadyDrawn ? "#f5f5f5" : "white",
                  cursor: alreadyDrawn ? "not-allowed" : "pointer",
                  fontWeight: 800,
                }}
              >
                {alreadyDrawn ? "今日はもう引きました" : "引く"}
              </button>

              <button
                onClick={copyText}
                disabled={!message}
                style={{
                  padding: "12px 14px",
                  borderRadius: 20,
                  border: "1px solid #ddd",
                  background: !message ? "#f5f5f5" : "white",
                  cursor: !message ? "not-allowed" : "pointer",
                  fontWeight: 800,
                }}
              >
                コピー
              </button>
            </div>

            <p style={{ marginTop: 14, fontSize: 12, opacity: 0.7 }}>
              ※ 本アプリは娯楽目的です。気楽にどうぞ。
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
