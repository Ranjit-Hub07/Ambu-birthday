"use client";
import { useEffect, useRef, useState } from "react";

// ── Confetti launcher ──────────────────────────────────────────────────────
export function launchConfetti() {
  const container = document.getElementById("confetti-container");
  if (!container) return;
  const colors = ["#ffb6d9", "#c8a2ff", "#ffd8e8", "#eddcff", "#864c6a"];
  for (let i = 0; i < 45; i++) {
    const piece = document.createElement("div");
    piece.style.cssText = `
      position:absolute;width:10px;height:10px;border-radius:50%;
      background-color:${colors[i % colors.length]};
      left:${Math.random() * 100}vw;top:-10px;pointer-events:none;
    `;
    container.appendChild(piece);
    const anim = piece.animate(
      [
        { transform: "translateY(0) rotate(0deg)", opacity: "1" },
        { transform: `translateY(105vh) rotate(${Math.random() * 540}deg)`, opacity: "0" },
      ],
      { duration: 2200 + Math.random() * 1500, easing: "cubic-bezier(0.25,0.46,0.45,0.94)" }
    );
    anim.onfinish = () => piece.remove();
  }
}

// ── Music button ───────────────────────────────────────────────────────────
function MusicButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    const handleStartMusic = () => {
      audio.play().catch(() => {});
    };
    window.addEventListener("start-music", handleStartMusic);

    return () => {
      window.removeEventListener("start-music", handleStartMusic);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "max(12px, env(safe-area-inset-top, 12px))",
        right: "max(12px, env(safe-area-inset-right, 12px))",
        zIndex: 50,
      }}
    >
      <button
        onClick={toggle}
        aria-label="Toggle background music"
        style={{
          minHeight: 38,
          padding: "0.35rem 0.85rem",
          borderRadius: 9999,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 8px 24px -4px rgba(200,162,255,0.35)",
          display: "flex", alignItems: "center", gap: "0.3rem",
          color: "#864c6a",
          border: "1px solid rgba(255,255,255,0.7)",
          cursor: "pointer",
          touchAction: "manipulation",
          transition: "transform 0.2s",
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
          {playing ? "pause" : "music_note"}
        </span>
        <span className="font-label-sm" style={{ fontWeight: 600 }}>{playing ? "Pause" : "Play"}</span>
      </button>
    </div>
  );
}

// ── Ambient floating particles ─────────────────────────────────────────────
function AmbientParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const symbols = ["✨", "💗", "🦋", "🌸", "⭐"];
    for (let i = 0; i < 16; i++) {
      const span = document.createElement("span");
      span.textContent = symbols[i % symbols.length];
      span.style.cssText = `
        position:absolute;font-size:16px;line-height:24px;
        opacity:0.6;user-select:none;pointer-events:none;
        left:${Math.random() * 90 + 5}%;
        top:${Math.random() * 85 + 5}%;
      `;
      c.appendChild(span);
      span.animate(
        [
          { transform: "translateY(0px) rotate(0deg)", opacity: "0.4" },
          { transform: "translateY(-18px) rotate(8deg)", opacity: "0.85" },
          { transform: "translateY(0px) rotate(0deg)", opacity: "0.4" },
        ],
        { duration: 3000 + Math.random() * 2500, iterations: Infinity, easing: "ease-in-out", delay: Math.random() * 1500 }
      );
    }
  }, []);
  return <div ref={containerRef} id="ambient-particles" />;
}

// ── Opening section ────────────────────────────────────────────────────────
function OpeningSection() {
  const scrollToReveal = () => {
    launchConfetti();
    window.dispatchEvent(new CustomEvent("start-music"));
    document.getElementById("birthday-reveal")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section
      id="opening"
      style={{
        position: "relative", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "2rem 1rem", minHeight: "92dvh", width: "100%",
      }}
    >
      <AmbientParticles />
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 360, margin: "0 auto" }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.25rem",
          padding: "0.25rem 0.85rem", borderRadius: 9999,
          background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 8px 24px -4px rgba(200,162,255,0.25)",
          marginBottom: "1.25rem",
        }}>
          <span className="material-symbols-outlined text-primary" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <span className="font-label-sm text-primary">A Little World Made Just For You</span>
        </div>

        {/* Title */}
        <h1 className="font-display-lg-mobile text-on-surface animate-pulse" style={{ marginBottom: "0.85rem" }}>
          Hey, Beautiful! 🎀
        </h1>

        {/* Subtitle */}
        <p className="font-body-lg text-on-surface-variant" style={{ marginBottom: "2rem" }}>
          Someone made something special just for you...
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToReveal}
          style={{
            padding: "0.9rem 1.6rem", borderRadius: 9999,
            background: "linear-gradient(to right, #ffb6d9, #c8a2ff)",
            color: "#370925", border: "none", cursor: "pointer",
            fontFamily: "Quicksand, sans-serif", fontSize: 14, fontWeight: 600,
            letterSpacing: "0.02em",
            boxShadow: "0 10px 28px -6px rgba(200,162,255,0.45)",
            display: "flex", alignItems: "center", gap: "0.5rem",
            touchAction: "manipulation",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          onMouseDown={e => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={e => (e.currentTarget.style.transform = "scale(1.03)")}
        >
          <span>Open Your Surprise 💌</span>
        </button>
      </div>
    </section>
  );
}

// ── Birthday Reveal section ────────────────────────────────────────────────
function BirthdayRevealSection() {
  const typingRef = useRef<HTMLParagraphElement>(null);
  const wishText = "Wishing you the happiest, brightest, and most magical birthday ever. You deserve every smile today and always!";

  useEffect(() => {
    const el = typingRef.current;
    if (!el) return;
    let idx = 0;
    el.textContent = "";
    const type = () => {
      if (idx < wishText.length) {
        el.textContent += wishText[idx++];
        setTimeout(type, 45);
      }
    };
    setTimeout(type, 600);
  }, []);

  return (
    <section id="birthday-reveal" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "2rem 0.25rem", width: "100%" }}>
      <div style={{
        position: "relative", width: "100%", maxWidth: 440,
        borderRadius: "1rem",
        background: "rgba(255,255,255,0.82)", backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: "1.25rem 1rem",
        boxShadow: "0 12px 32px -8px rgba(200,162,255,0.28)",
        overflow: "hidden",
      }}>
        {/* Bouncing candles */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", marginBottom: "1rem" }}>
          {[
            { bg: "#ffb6d9", delay: "0s" },
            { bg: "#c8a2ff", delay: "0.3s" },
            { bg: "#e8c0d2", delay: "0.6s" },
          ].map((c, i) => (
            <div key={i} className="animate-bounce" style={{ width: 28, height: 36, borderRadius: 9999, backgroundColor: c.bg, boxShadow: "0 4px 6px rgba(0,0,0,0.1)", animationDelay: c.delay }} />
          ))}
        </div>

        {/* Title */}
        <h2 className="font-headline-lg text-primary" style={{ marginBottom: "1.25rem" }}>
          HAPPY BIRTHDAY, MY FAVOURITE GIRL! 💗
        </h2>

        {/* Cake illustration */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "1.25rem 0" }}>
          <div style={{ display: "flex", gap: "0.85rem", marginBottom: "0.25rem" }}>
            {[{ c: "#ffb6d9", d: "0s" }, { c: "#c8a2ff", d: "0.2s" }, { c: "#ffb6d9", d: "0.4s" }].map((f, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="animate-ping" style={{ width: 10, height: 14, borderRadius: 9999, backgroundColor: f.c, opacity: 0.75, animationDelay: f.d }} />
                <div style={{ width: 7, height: i === 1 ? 26 : 22, borderRadius: 2, backgroundColor: i === 1 ? "#fab1d4" : "#d7baff" }} />
              </div>
            ))}
          </div>
          <div style={{ width: 136, height: 38, borderRadius: "0.75rem 0.75rem 0 0", backgroundColor: "#ffd8e8", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 0.5rem" }}>
            {["#864c6a", "#6f4ca2", "#864c6a"].map((c, i) => <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: c }} />)}
          </div>
          <div style={{ width: 168, height: 44, borderRadius: "0 0 0.75rem 0.75rem", backgroundColor: "#eddcff", boxShadow: "0 4px 6px rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="font-label-sm" style={{ color: "#280056" }}>Make a Wish ✨</span>
          </div>
        </div>

        {/* Typing message */}
        <div style={{ marginTop: "0.85rem", minHeight: 68, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 0.5rem" }}>
          <p ref={typingRef} className="font-body-md text-on-surface-variant" style={{ fontStyle: "italic" }} />
        </div>
      </div>
    </section>
  );
}

// ── Memories section ───────────────────────────────────────────────────────
const memories = [
  {
    img: "/images/memory1.jpg",
    caption: "Looking absolutely gorgeous ✨",
    rotate: "-1deg", tape: "#ffb6d9", tapeRot: "2deg",
  },
  {
    img: "/images/memory2.jpg",
    caption: "That cute playful mood & sweet flowers 💐💗",
    rotate: "1deg", tape: "#c8a2ff", tapeRot: "-2deg",
  },
  {
    img: "/images/memory3.jpg",
    caption: "Our heart-to-heart laughs and smiles 👫✨",
    rotate: "-1deg", tape: "#e8c0d2", tapeRot: "1deg",
  },
  {
    img: "/images/memory4.jpg",
    caption: "All the silly moments & sweet mischief 😜❤️",
    rotate: "1deg", tape: "#ffb6d9", tapeRot: "-1deg",
  },
];

function MemoriesSection() {
  return (
    <section id="our-memories" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem 0.25rem", width: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
        <span style={{
          display: "inline-block", padding: "0.25rem 1rem", borderRadius: 9999,
          backgroundColor: "#ffd8e8", color: "#370925",
          fontFamily: "Quicksand,sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em",
          marginBottom: "0.5rem",
        }}>Scrapbook</span>
        <h2 className="font-headline-lg text-on-surface">Our Memories 📸</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem", width: "100%", maxWidth: 440 }}>
        {memories.map((m, i) => (
          <div key={i} style={{
            position: "relative",
            background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            padding: "0.85rem 0.85rem 1.25rem",
            borderRadius: "0.85rem",
            boxShadow: "0 10px 28px -6px rgba(200,162,255,0.28)",
            transform: `rotate(${m.rotate})`,
            transition: "transform 0.3s",
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = "rotate(0deg)")}
            onMouseLeave={e => (e.currentTarget.style.transform = `rotate(${m.rotate})`)}
          >
            {/* Tape strip */}
            <div style={{
              position: "absolute", top: -10, left: "50%", transform: `translateX(-50%) rotate(${m.tapeRot})`,
              width: 56, height: 18, backgroundColor: m.tape + "99", borderRadius: 2,
            }} />
            <div style={{ width: "100%", height: "clamp(260px, 75vw, 360px)", borderRadius: "0.5rem", overflow: "hidden", backgroundColor: "#ffe7f6", marginBottom: "0.85rem" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.img} alt={m.caption} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
            </div>
            <p className="font-headline-sm text-on-surface" style={{ textAlign: "center", padding: "0 0.25rem" }}>{m.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Heart Letter section ───────────────────────────────────────────────────
function HeartLetterSection() {
  const [open, setOpen] = useState(false);
  return (
    <section id="heart-letter" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem 0.25rem", width: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
        <h2 className="font-headline-lg text-on-surface">A Letter From My Heart 💌</h2>
        <p className="font-body-sm text-on-surface-variant" style={{ marginTop: "0.25rem" }}>Tap the envelope to open</p>
      </div>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "100%", borderRadius: "0.85rem",
            backgroundColor: "#ffdff5", padding: "1.25rem 1rem",
            boxShadow: "0 12px 32px -8px rgba(200,162,255,0.35)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.75rem",
            border: "none", cursor: "pointer",
            touchAction: "manipulation",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.01)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div style={{ width: 56, height: 56, borderRadius: 9999, backgroundColor: "#ffb6d9", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 6px rgba(0,0,0,0.07)" }}>
            <span className="material-symbols-outlined text-on-primary-fixed" style={{ fontSize: 28, fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
          <span className="font-label-lg text-on-surface">{open ? "Close Letter 💌" : "Tap to Break the Wax Seal"}</span>
        </button>

        {open && (
          <div style={{
            marginTop: "1rem", borderRadius: "0.85rem",
            background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            padding: "1.25rem 1rem",
            boxShadow: "0 12px 32px -8px rgba(200,162,255,0.28)",
            animation: "fade-up 0.4s ease-out",
          }}>
            <p className="font-headline-md text-primary" style={{ marginBottom: "0.75rem" }}>Dearest Birthday Girl,</p>
            <p className="font-body-md text-on-surface" style={{ marginBottom: "0.75rem" }}>
              Today is all about celebrating the incredible, radiant soul you are. From our late-night talks to the smallest inside jokes that make us laugh until we cry, every single memory with you is a treasure I hold so close.
            </p>
            <p className="font-body-md text-on-surface" style={{ marginBottom: "0.75rem" }}>
              Thank you for being my safe space, my biggest cheerleader, and the brightest part of so many days. I am endlessly grateful that life brought us together.
            </p>
            <p className="font-headline-sm text-primary" style={{ textAlign: "right" }}>With all my love, always 💕</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ── 10 Things section ─────────────────────────────────────────────────────
const reasons = [
  "Your contagious laugh that lights up every room",
  "How you always know how to make me feel better",
  "Your kindness and gentle heart",
  "Our hilarious inside jokes",
  "The way you listen without ever judging",
  "Your unstoppable strength and grace",
  "How you turn ordinary days into adventures",
  "The way your smile brightens my darkest days ✨",
  "Your dreamy creativity and passion",
  "Simply being my favourite person in the world",
];

function TenThingsSection() {
  const [revealed, setRevealed] = useState<boolean[]>(Array(10).fill(false));
  const toggle = (i: number) => setRevealed(prev => prev.map((v, idx) => idx === i ? !v : v));
  return (
    <section id="ten-things" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem 0.25rem", width: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
        <h2 className="font-headline-lg text-on-surface">10 Things I Love About You 🌸</h2>
        <p className="font-body-sm text-on-surface-variant" style={{ marginTop: "0.25rem" }}>Tap each card to reveal a reason</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem", width: "100%", maxWidth: 440 }}>
        {reasons.map((r, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            style={{
              width: "100%", minHeight: 104, padding: "0.75rem 0.45rem",
              borderRadius: "0.75rem",
              background: revealed[i] ? "#ffd8e8" : "rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 10px 24px -6px rgba(200,162,255,0.25)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center",
              border: "none", cursor: "pointer",
              touchAction: "manipulation",
              transition: "transform 0.2s, background 0.3s",
            }}
          >
            {revealed[i] ? (
              <span className="font-body-sm text-on-primary-fixed" style={{ wordBreak: "break-word", lineHeight: 1.35 }}>{r}</span>
            ) : (
              <>
                <span className="font-headline-md text-primary" style={{ marginBottom: "0.2rem" }}>#{i + 1}</span>
                <span className="font-label-sm text-on-surface-variant">Tap to reveal</span>
              </>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

// ── Secret Surprise section ────────────────────────────────────────────────
function SecretSurpriseSection() {
  const [opened, setOpened] = useState(false);
  const open = () => { setOpened(true); launchConfetti(); };
  return (
    <section id="secret-surprise" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem 0.25rem", width: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
        <h2 className="font-headline-lg text-on-surface">A Secret Surprise 🎁</h2>
        <p className="font-body-sm text-on-surface-variant" style={{ marginTop: "0.25rem" }}>Tap the glowing gift box</p>
      </div>
      {!opened ? (
        <button
          onClick={open}
          className="animate-bounce"
          style={{
            width: 140, height: 140, borderRadius: "0.85rem",
            background: "linear-gradient(to bottom right, #ffb6d9, #c8a2ff)",
            boxShadow: "0 12px 32px -8px rgba(200,162,255,0.45)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.35rem",
            border: "none", cursor: "pointer",
            touchAction: "manipulation",
            transition: "transform 0.2s",
          }}
        >
          <span className="material-symbols-outlined text-on-primary-fixed" style={{ fontSize: 42, fontVariationSettings: "'FILL' 1" }}>featured_seasonal_and_gifts</span>
          <span className="font-label-sm text-on-primary-fixed">Open Me!</span>
        </button>
      ) : (
        <div style={{
          marginTop: "1.25rem", width: "100%", maxWidth: 440,
          borderRadius: "0.85rem",
          background: "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: "1.25rem 1rem", textAlign: "center",
          boxShadow: "0 12px 32px -8px rgba(200,162,255,0.35)",
          animation: "scale-in 0.5s ease-out",
        }}>
          <span className="material-symbols-outlined text-primary" style={{ fontSize: 32, marginBottom: "0.4rem", display: "block", fontVariationSettings: "'FILL' 1" }}>favorite</span>
          <h3 className="font-headline-md text-primary" style={{ marginBottom: "0.4rem" }}>Your Surprise Wish ✨</h3>
          <p className="font-body-md text-on-surface">
            May this year bring you endless adventures, soft mornings, dreams come true, and all the happiness your heart can hold. You deserve the entire universe! 💖
          </p>
        </div>
      )}
    </section>
  );
}

// ── Final Message section ──────────────────────────────────────────────────
function FinalMessageSection() {
  return (
    <section id="final-message" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "2rem 0.25rem", marginBottom: "1.5rem", width: "100%" }}>
      <div style={{
        width: "100%", maxWidth: 440,
        borderRadius: "0.85rem",
        background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        padding: "1.5rem 1.15rem",
        boxShadow: "0 12px 32px -8px rgba(200,162,255,0.28)",
      }}>
        <span className="material-symbols-outlined text-primary" style={{ fontSize: 30, marginBottom: "0.75rem", display: "block", fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        <p className="font-body-lg text-on-surface" style={{ marginBottom: "1.25rem" }}>
          Life gave me many beautiful things, but having you as my best friend is one of my favourites. No matter where life takes us, you&apos;ll always have a special place in my heart. ❤️
        </p>
        <p className="font-headline-md text-primary">
          Happy Birthday Once Again, Ambuu! 🎂💗
        </p>
      </div>
    </section>
  );
}

// ── Root Page ──────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #fff7f9, #ffe7f6, #eddcff)",
        minHeight: "100dvh",
        display: "flex", flexDirection: "column",
        color: "#300e2d",
        fontFamily: "Quicksand, sans-serif",
        width: "100%",
      }}
    >
      {/* Confetti layer */}
      <div id="confetti-container" style={{ pointerEvents: "none" }} />

      {/* Music button */}
      <MusicButton />

      {/* Main content */}
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: "100dvh",
          padding: "0 0.85rem",
          boxSizing: "border-box",
        }}
        className="pt-safe pb-safe"
      >
        <OpeningSection />
        <BirthdayRevealSection />
        <MemoriesSection />
        <HeartLetterSection />
        <TenThingsSection />
        <SecretSurpriseSection />
        <FinalMessageSection />
      </main>
    </div>
  );
}
