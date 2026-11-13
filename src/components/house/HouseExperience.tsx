"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import Curtain from "@/components/Curtain";
import { TransitionLink } from "@/components/Veil";
import { houseContent } from "@/content/houseContent";
import { stage } from "./stage";
import s from "./house.module.css";

gsap.registerPlugin(ScrollTrigger);

const Scene = dynamic(() => import("./Scene"), { ssr: false });
const motionQuery = "(prefers-reduced-motion: reduce)";
const prefersReducedMotion = () => window.matchMedia(motionQuery).matches;
const staticOnServer = () => true;

function subscribeToMotionPreference(onChange: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/** One house, start to finish. Every house shares this choreography and
 *  differs only in its content and its object. */
export default function HouseExperience({ slug }: { slug: string }) {
  const c = houseContent[slug];
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const reduce = useSyncExternalStore(subscribeToMotionPreference, prefersReducedMotion, staticOnServer);

  useEffect(() => {
    if (reduce) return;
    const P = c.pose;

    Object.assign(stage, {
      x: 0,
      y: 0,
      s: P.heroScale,
      ry: 0,
      rz: 0,
      explode: 0,
      intro: 0,
      tilt: P.tilt,
      fitWidth: P.fitWidth,
      baseYaw: P.baseYaw,
      sway: P.sway,
    });

    const onMove = (e: PointerEvent) => {
      stage.mx = (e.clientX / window.innerWidth) * 2 - 1;
      stage.my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add({ wide: "(min-width: 861px)", narrow: "(max-width: 860px)" }, (context) => {
        const i = context.conditions?.wide ? 0 : 1;
        const side = P.side[i];
        const sideScale = P.sideScale[i];
        const objScale = P.objectScale[i];
        const apartScale = P.apartScale[i];
        const sideY = i ? -0.1 : 0;
        const objY = i ? 0.18 : 0;

        // Entrance, once the curtain lifts.
        gsap.to(stage, { intro: 1, duration: 1.4, ease: "power3.out", delay: 0.3 });

        // Four scroll phases feed one pose function, so the object's
        // position is always a pure function of where the page is.
        const phase = { hero: 0, enter: 0, object: 0, exit: 0 };
        const mix = gsap.utils.interpolate;
        const clamp = gsap.utils.clamp;
        const ease = gsap.parseEase("power2.inOut");
        // During the dissection the object must fit between the two callouts.
        // Returns the largest stage scale that keeps it inside that gap.
        const VIEW_H = 2 * 9 * Math.tan((15 * Math.PI) / 180); // scene units visible top to bottom
        const callout = root.current?.querySelector<HTMLElement>("[data-callout]");
        const roomFor = () => {
          if (i || !callout) return Infinity; // narrow layout stacks callouts underneath
          const taken = callout.offsetLeft + callout.offsetWidth + 48;
          const freePx = Math.max(120, window.innerWidth - taken * 2);
          const freeUnits = (freePx / window.innerHeight) * VIEW_H;
          const fit = Math.min(1, ((window.innerWidth / window.innerHeight) * VIEW_H) / P.fitWidth);
          return freeUnits / (P.span ?? P.fitWidth * 0.8) / fit;
        };
        const pose = () => {
          const room = roomFor();
          const objS = Math.min(objScale, room);
          const apartS = Math.min(apartScale, room);
          const h = ease(phase.hero);
          const e = ease(phase.enter);
          const o = phase.object;
          // Hero: centre stage, then aside for the manifesto. Enter: back to centre.
          stage.x = mix(mix(0, side, h), 0, e);
          stage.y = mix(mix(0, sideY, h), objY, e) + Math.pow(phase.exit, 2) * 2.7;
          stage.rz = mix(mix(0, P.roll, h), 0, e);
          stage.ry = phase.hero * P.yaw[0] + phase.enter * P.yaw[1] + o * P.yaw[2] + phase.exit * P.yaw[3];
          // Dissection: apart over the first fifth, together again at the end.
          const apart = ease(clamp(0, 1, o / 0.2)) * (1 - ease(clamp(0, 1, (o - 0.9) / 0.1)));
          stage.explode = apart;
          stage.s = mix(mix(mix(P.heroScale, sideScale, h), objS, e), apartS, apart);
        };
        const track = (key: keyof typeof phase, trigger: string, start: string, end: string) => {
          const set = (self: ScrollTrigger) => {
            phase[key] = self.progress;
            pose();
          };
          ScrollTrigger.create({ trigger, start, end, onUpdate: set, onRefresh: set });
        };
        track("hero", "[data-hero]", "top top", "bottom top");
        track("enter", "[data-object]", "top bottom", "top top");
        track("object", "[data-object]", "top top", "bottom bottom");
        track("exit", "[data-still]", "top bottom", "top 25%");

        // Callouts and the progress rule ride the pinned section.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: "[data-object]", start: "top top", end: "bottom bottom", scrub: true },
        });
        gsap.utils.toArray<HTMLElement>("[data-callout]").forEach((el, n) => {
          const at = 1.4 + n * 2;
          tl.fromTo(el, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, at);
          tl.to(el, { autoAlpha: 0, y: -28, duration: 0.5, ease: "power2.in" }, at + 1.5);
        });
        tl.fromTo("[data-progress]", { scaleX: 0 }, { scaleX: 1, duration: 10 }, 0);
      });

      // Campaign still: the frame opens and the image drifts inside it.
      gsap.fromTo(
        "[data-still-frame]",
        { clipPath: "inset(14% 32% 14% 32%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: "[data-still]", start: "top 85%", end: "top 5%", scrub: true },
        },
      );
      gsap.fromTo(
        "[data-still-img]",
        { yPercent: -9, scale: 1.18 },
        {
          yPercent: 9,
          scale: 1.04,
          ease: "none",
          scrollTrigger: { trigger: "[data-still]", start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      // The feature image drifts and settles behind its headline.
      if (c.feature.image) {
        gsap.fromTo(
          "[data-feature-img]",
          { yPercent: -8, scale: 1.16 },
          {
            yPercent: 8,
            scale: 1.02,
            ease: "none",
            scrollTrigger: { trigger: "[data-feature]", start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }

      // Rows draw their rule as they arrive.
      gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%" } },
        );
      });

      // Soft rise for blocks of supporting copy.
      gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 36 },
          { autoAlpha: 1, y: 0, duration: 1.3, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } },
        );
      });
    }, root);

    return () => {
      window.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, [c, reduce]);

  return (
    <div ref={root} className={s.root} style={{ "--accent": c.accent } as CSSProperties}>
      <Curtain label={c.name} />

      <div className={s.canvas} aria-hidden>
        {!reduce && <Scene kind={c.object} accent={c.accent} />}
      </div>

      {/* ---------- Hero ---------- */}
      <section className={s.hero} data-hero>
        <p className={`label ${s.heroLabel}`}>
          <span>Company No. {c.no}</span>
          <span>{c.category}</span>
        </p>
        <h1 className={s.heroTitle} aria-label={`${c.hero.lineA} ${c.hero.lineB}`}>
          <Reveal as="span" className={s.heroLine} text={c.hero.lineA} delay={0.35} stagger={0.08} />
          <Reveal as="span" className={`${s.heroLine} ${s.heroLineB}`} text={c.hero.lineB} delay={0.5} stagger={0.08} />
        </h1>
        <div className={s.heroFoot}>
          <p className={s.heroLede}>{c.hero.lede}</p>
          <p className={`label ${s.heroScroll}`}>
            <span>{c.hero.tag}</span>
            <span className={s.scrollCue}>Scroll</span>
          </p>
        </div>
      </section>

      {/* ---------- Manifesto ---------- */}
      <section className={s.manifesto}>
        <p className="label">The premise</p>
        <div className={s.manifestoLines}>
          <Reveal as="p" text={c.manifesto.lines[0]} />
          <Reveal as="p" text={c.manifesto.lines[1]} />
          <Reveal as="p" className={s.accent} text={c.manifesto.lines[2]} />
        </div>
        <p className={s.manifestoBody} data-rise>
          {c.manifesto.body}
        </p>
      </section>

      {/* ---------- The object ---------- */}
      <section className={s.object} data-object>
        <div className={s.objectSticky}>
          <div className={s.objectHead}>
            <span className="label">{c.dissection.title}</span>
            <span className="label">Four considerations</span>
          </div>
          {c.dissection.callouts.map((item, i) => (
            <article key={item.title} className={`${s.callout} ${i % 2 ? s.calloutRight : s.calloutLeft}`} data-callout>
              <span className={s.calloutN}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
          <div className={s.progress}>
            <i data-progress />
          </div>
        </div>
      </section>

      {/* ---------- Campaign still ---------- */}
      <section className={s.still} data-still>
        <div className={s.stillFrame} data-still-frame>
          <div className={s.stillImg} data-still-img>
            <Image
              src={c.still.image}
              alt={c.still.alt}
              fill
              sizes="100vw"
              placeholder="blur"
              style={{ objectPosition: c.still.position }}
            />
          </div>
          <div className={s.stillCopy}>
            <Reveal as="p" className={s.stillLine} text={c.still.line} />
            <span className="label">{c.still.meta}</span>
          </div>
        </div>
      </section>

      {/* ---------- Figures ---------- */}
      <section className={s.figures}>
        <p className="label">In measured terms</p>
        <ul className={s.figureGrid}>
          {c.figures.map((f) => (
            <li key={f.text}>
              <span className={s.figureN}>
                <Counter value={f.value} />
                <small>{f.unit}</small>
              </span>
              <span className={s.figureT}>{f.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Capabilities ---------- */}
      <section className={s.caps}>
        <div className={s.capsHead}>
          <p className="label">Also included</p>
          <Reveal as="h2" text={c.capabilities.title} />
        </div>
        <ul className={s.capList}>
          {c.capabilities.items.map(([name, body], i) => (
            <li key={name} className={s.cap}>
              <i className={s.rule} data-rule />
              <span className={s.capN}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{name}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Feature ---------- */}
      <section className={`${s.sovereign} ${c.feature.image ? "" : s.sovPlain}`} data-feature>
        {c.feature.image && (
          <>
            <div className={s.sovImg} data-feature-img>
              <Image
                src={c.feature.image}
                alt={c.feature.alt ?? ""}
                fill
                sizes="100vw"
                placeholder="blur"
                style={{ objectPosition: c.feature.position }}
              />
            </div>
            <div className={s.sovShade} aria-hidden />
          </>
        )}
        <p className={`label ${s.sovTop}`}>
          <span>{c.feature.label}</span>
          <span>{c.feature.aside}</span>
        </p>
        <Reveal as="h2" text={c.feature.title} stagger={0.1} />
        <div className={s.sovFoot}>
          <div>
            <p data-rise>{c.feature.body}</p>
            {c.feature.link && (
              <TransitionLink href={c.feature.link.href} className={s.featureLink}>
                {c.feature.link.label} →
              </TransitionLink>
            )}
          </div>
          <dl className={s.sovFacts} data-rise>
            {c.feature.facts.map(([k, v]) => (
              <div key={k}>
                <dt className="label">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Plans ---------- */}
      {c.plans.length > 0 && (
        <section className={s.plans}>
          <p className="label">Membership</p>
          <ul className={s.planGrid}>
            {c.plans.map((p) => (
              <li key={p.name} className={s.plan} data-rise>
                <span className="label">{p.price}</span>
                <h3>{p.name}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------- Notices ---------- */}
      <section className={s.notices}>
        <p className="label">From our board</p>
        <ul>
          {c.notices.map((quote) => (
            <li key={quote}>
              <Reveal as="p" className={s.notice} text={`“${quote}”`} />
              <span className="label">Finance, Board of Directors</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Close ---------- */}
      <section className={s.close}>
        <Reveal as="h2" text={c.close.title} stagger={0.14} />
        <button
          type="button"
          className={`${s.cta} ${done ? s.ctaDone : ""}`}
          onClick={() => setDone(true)}
          aria-live="polite"
        >
          {done ? c.close.done : c.close.cta}
        </button>
      </section>
    </div>
  );
}
