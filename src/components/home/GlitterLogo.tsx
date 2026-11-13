"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import s from "./home.module.css";

const colors = ["#ee55a4", "#ff9453", "#ffcc38", "#53ca9c", "#57b9f7", "#a276ef"];
type Spark = {
  x: number;
  y: number;
  burstX: number;
  burstY: number;
  color: string;
  size: number;
  twinkle: number;
};

export default function GlitterLogo() {
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const wordmark = useRef<HTMLHeadingElement>(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const scene = stage.current;
    const surface = canvas.current;
    const logo = wordmark.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!scene || !surface || !logo || motion.matches || (run === 0 && window.location.hash)) return;

    let cancelled = false;
    let frame = 0;
    const finish = () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      scene.removeAttribute("data-gathering");
      surface.getContext("2d")?.clearRect(0, 0, surface.width, surface.height);
    };
    motion.addEventListener("change", finish);
    window.addEventListener("resize", finish);

    void document.fonts.ready.then(() => {
      if (cancelled) return;
      const bounds = scene.getBoundingClientRect();
      const width = Math.round(bounds.width);
      const height = Math.round(bounds.height);
      if (width < 1 || height < 1) return;
      surface.width = width;
      surface.height = height;
      const paint = surface.getContext("2d");
      const mask = document.createElement("canvas");
      mask.width = width;
      mask.height = height;
      const ink = mask.getContext("2d");
      if (!paint || !ink) return;

      for (const line of logo.querySelectorAll("span")) {
        const box = line.getBoundingClientRect();
        const font = getComputedStyle(line);
        ink.font = `${font.fontWeight} ${font.fontSize} ${font.fontFamily}`;
        ink.textAlign = "center";
        const word = line.textContent ?? "";
        const metrics = ink.measureText(word);
        const baseline = box.top - bounds.top + (box.height + metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2;
        ink.fillText(word, width / 2, baseline, box.width);
      }

      const pixels = ink.getImageData(0, 0, width, height).data;
      const step = Math.max(4, Math.round(width / 240));
      const sparks: Spark[] = [];
      for (let y = step; y < height; y += step) {
        for (let x = step; x < width; x += step) {
          if (pixels[(y * width + x) * 4 + 3] < 140) continue;
          const angle = Math.random() * Math.PI * 2;
          const distance = (0.18 + Math.random() * 0.7) * Math.min(width, height * 1.65);
          sparks.push({
            x, y,
            burstX: width / 2 + Math.cos(angle) * distance,
            burstY: height * 0.49 + Math.sin(angle) * distance * 0.65,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 2 + Math.random() * 6,
            twinkle: Math.random() * 10,
          });
        }
      }
      if (!sparks.length) return;

      const confetti = Array.from({ length: 220 }, (_, i) => ({
        angle: Math.random() * Math.PI * 2,
        speed: 0.25 + Math.random() * 0.75,
        spin: 2 + Math.random() * 7,
        size: 4 + Math.random() * 9,
        color: colors[i % colors.length],
      }));
      const centerX = width / 2;
      const centerY = height * 0.49;
      scene.setAttribute("data-gathering", "");
      scene.removeAttribute("data-landed");
      let start: number | undefined;
      const draw = (now: number) => {
        start ??= now;
        const elapsed = now - start;
        const burst = 1 - (1 - Math.min(1, elapsed / 580)) ** 3;
        const gather = Math.min(1, Math.max(0, (elapsed - 720) / 1450));
        const settle = gather * gather * (3 - 2 * gather);
        paint.clearRect(0, 0, width, height);
        if (elapsed >= 2090 && scene.hasAttribute("data-gathering")) {
          scene.removeAttribute("data-gathering");
          scene.setAttribute("data-landed", "");
        }

        // Six curved trails sweep outward from the mascot's parcel.
        const ribbon = Math.min(1, elapsed / 700);
        paint.lineCap = "round";
        for (const [i, color] of colors.entries()) {
          const radius = Math.min(width * 0.55, height * 0.95) + i * 10;
          paint.globalAlpha = 0.7 * Math.sin(Math.PI * Math.min(1, elapsed / 1750));
          paint.strokeStyle = color;
          paint.lineWidth = Math.max(3, width / 170);
          paint.beginPath();
          paint.ellipse(centerX, centerY + 15, radius * ribbon, radius * ribbon * 0.38, -0.19, Math.PI, Math.PI + Math.PI * 1.7 * ribbon);
          paint.stroke();
        }

        const confettiTime = elapsed / 1000;
        const spread = Math.min(width * 0.9, height * 1.28) * (1 - Math.exp(-confettiTime * 2));
        paint.globalAlpha = Math.max(0, Math.min(1, (3200 - elapsed) / 850));
        for (const piece of confetti) {
          const x = centerX + Math.cos(piece.angle) * spread * piece.speed;
          const y = centerY + Math.sin(piece.angle) * spread * piece.speed * 0.72 + confettiTime ** 2 * 24;
          paint.save();
          paint.translate(x, y);
          paint.rotate(piece.spin * confettiTime);
          paint.fillStyle = piece.color;
          paint.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
          paint.restore();
        }

        paint.globalAlpha = Math.max(0, Math.min(1, (2700 - elapsed) / 500));
        for (const spark of sparks) {
          const dx = spark.burstX - centerX;
          const dy = spark.burstY - centerY;
          const turn = gather * Math.PI * 1.3;
          const x = centerX + (dx * Math.cos(turn) - dy * Math.sin(turn)) * burst * (1 - settle) + (spark.x - centerX) * settle;
          const y = centerY + (dx * Math.sin(turn) * 0.65 + dy * Math.cos(turn)) * burst * (1 - settle) + (spark.y - centerY) * settle;
          const size = spark.size * (0.66 + 0.34 * Math.sin(elapsed / 100 + spark.twinkle)) * (1 - settle * 0.55);
          paint.fillStyle = spark.color;
          paint.fillRect(x - size / 2, y - size / 2, size, size);
          if (spark.size > 6.8 && gather < 0.85) {
            paint.fillStyle = "#fff8ff";
            paint.fillRect(x - size * 1.6, y - 1, size * 3.2, 2);
            paint.fillRect(x - 1, y - size * 1.6, 2, size * 3.2);
          }
        }
        if (elapsed < 3200) frame = requestAnimationFrame(draw);
        else finish();
      };
      frame = requestAnimationFrame(draw);
    });

    return () => {
      finish();
      motion.removeEventListener("change", finish);
      window.removeEventListener("resize", finish);
    };
  }, [run]);

  return (
    <div className={s.brandLockup}>
      <div className={s.logoStage} ref={stage}>
        <Image
          className={s.mascot}
          src="/unicorn-mascot.webp"
          width={760}
          height={760}
          sizes="(max-width: 700px) 64vw, 340px"
          alt="A tiny pastel unicorn peeking out from behind the logo"
          preload
        />
        <h1 className={s.logoWordmark} ref={wordmark}><span>Unicorn</span><span>Warehouse</span></h1>
        <canvas className={s.glitter} ref={canvas} aria-hidden="true" />
      </div>
      <p className={s.tagline}>We own what comes next.</p>
      <button type="button" className={s.replayGlitter} onClick={() => setRun((value) => value + 1)}>
        Replay glitter ✦
      </button>
    </div>
  );
}
