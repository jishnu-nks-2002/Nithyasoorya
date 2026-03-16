import { useEffect, useRef, useState, FC } from "react";

const EmpavaiAbout: FC = () => {
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@200;300;400;500;600&display=swap');

        .ea-root *, .ea-root *::before, .ea-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }

        /* ── Animation keyframes ── */
        @keyframes ea-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ea-fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ea-scaleX  { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes ea-slideRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ea-floatY {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }

        /* ── Section root ── */
        .ea-root {
          width: 100%;
          min-height: 100vh;
          background: #ffff;
          position: relative;
          overflow: hidden;
          font-family: 'Jost', sans-serif;
          display: flex;
          align-items: stretch;
        }

        /* Subtle warm noise texture */
        .ea-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.018'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Decorative arcs top-left ── */
        .ea-arc {
          position: absolute;
          top: -90px; left: -90px;
          width: 300px; height: 300px;
          border-radius: 50%;
          border: 1px solid rgba(150,130,90,0.15);
          pointer-events: none; z-index: 0;
        }
        .ea-arc-2 {
          position: absolute;
          top: -130px; left: -130px;
          width: 400px; height: 400px;
          border-radius: 50%;
          border: 1px solid rgba(150,130,90,0.08);
          pointer-events: none; z-index: 0;
        }

        /* ── Main grid ── */
        .ea-grid {
          position: relative;
          z-index: 1;
          width: 100%;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          min-height: 100vh;
        }

        /* ═══════════════════════════
           LEFT COLUMN
        ═══════════════════════════ */
        .ea-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 96px 72px 80px 80px;
          border-right: 1px solid rgba(180,160,120,0.15);
        }

        /* Eyebrow */
        .ea-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #8b5cf6;
          margin-bottom: 28px;

          opacity: 0;
          animation: ${visible ? "ea-fadeIn 0.8s ease 0.1s forwards" : "none"};
        }

        /* Giant headline */
        .ea-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 5.8vw, 86px);
          font-weight: 400;
          line-height: 1.03;
          letter-spacing: -0.02em;
          color: #1e1810;
          margin-bottom: 48px;

          opacity: 0;
          animation: ${visible ? "ea-fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.22s forwards" : "none"};
        }
        .ea-headline em {
          font-style: italic;
          color: #3b1a6e;
        }

        /* Two-column body text */
        .ea-body-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 60px;

          opacity: 0;
          animation: ${visible ? "ea-fadeUp 1s ease 0.44s forwards" : "none"};
        }

        .ea-body-col p {
          font-family: 'Jost', sans-serif;
          font-size: clamp(12.5px, 1.1vw, 14.5px);
          font-weight: 300;
          line-height: 1.88;
          color: black;
          letter-spacing: 0.01em;
        }

        /* Thin rule between headline and body */
        .ea-rule {
          width: 44px; height: 1px;
          background: linear-gradient(90deg, #8a7a5a, transparent);
          margin-bottom: 44px;
          transform-origin: left;

          opacity: 0;
          transform: scaleX(0);
          animation: ${visible ? "ea-scaleX 0.7s ease 0.38s forwards" : "none"};
        }

        /* ── Stats row ── */
        .ea-stats {
          display: flex;
          align-items: flex-start;
          gap: 0;

          opacity: 0;
          animation: ${visible ? "ea-fadeIn 1s ease 0.72s forwards" : "none"};
        }

        .ea-stat {
          padding-right: 44px;
          margin-right: 44px;
          border-right: 1px solid rgba(140,120,80,0.2);
        }
        .ea-stat:last-child {
          border-right: none;
          padding-right: 0; margin-right: 0;
        }

        .ea-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 2.8vw, 38px);
          font-weight: 500;
          color: #1e1810;
          line-height: 1;
          margin-bottom: 7px;
          transition: color 0.3s ease;
        }
        .ea-stat:hover .ea-stat-val { color: #7c5c1e; }
        .ea-stat-val.ea-inf { font-size: clamp(34px, 3.2vw, 44px); }

        .ea-stat-label {
          font-family: 'Jost', sans-serif;
          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #a08860;
        }

        /* ═══════════════════════════
           RIGHT COLUMN — imagery
        ═══════════════════════════ */
        .ea-right {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 64px 80px 72px;
          background: #f3e7ff;

          opacity: 0;
          animation: ${visible ? "ea-slideRight 1.1s cubic-bezier(0.22,1,0.36,1) 0.3s forwards" : "none"};
        }

        /* Faint vertical lines background */
        .ea-right::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 48px,
            rgba(180,160,120,0.06) 48px,
            rgba(180,160,120,0.06) 49px
          );
          pointer-events: none;
        }

        /* Image stack wrapper */
        .ea-img-stack {
          position: relative;
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          animation: ea-floatY 9s ease-in-out 1.4s infinite;
        }

        /* Top: round plate/bowl image */
        .ea-img-top {
          position: relative;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow:
            0 20px 60px rgba(90,70,30,0.18),
            0 4px 16px rgba(90,70,30,0.1),
            inset 0 1px 0 rgba(255,255,255,0.4);
          z-index: 2;
          /* Slight negative margin so it overlaps the fabric */
          margin-bottom: -28px;
          border: 6px solid #f3ede2;
          flex-shrink: 0;
        }
        .ea-img-top img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }

        /* Bottom: linen/fabric stacked image — portrait */
        .ea-img-bottom {
          position: relative;
          width: 100%;
          max-width: 540px;
          aspect-ratio: 3 / 4;
          border-radius: 18px;
          overflow: hidden;
          box-shadow:
            0 32px 80px rgba(90,70,30,0.16),
            0 8px 24px rgba(90,70,30,0.09);
          z-index: 1;
        }
        .ea-img-bottom img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* Warm overlay on bottom image */
        .ea-img-bottom::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(220,200,160,0.12) 0%,
            transparent 40%,
            rgba(180,150,100,0.18) 100%
          );
          pointer-events: none;
        }

        /* Small accent label on the image */
        .ea-img-tag {
          position: absolute;
          bottom: 24px;
          left: 24px;
          z-index: 4;
          background: rgba(250,248,244,0.88);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(180,160,120,0.2);
          border-radius: 8px;
          padding: 10px 16px;
        }
        .ea-img-tag-label {
          font-family: 'Jost', sans-serif;
          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #8a7a5a;
          margin-bottom: 2px;
        }
        .ea-img-tag-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 500;
          color: #1e1810;
          line-height: 1;
        }

        /* Decorative dot cluster */
        .ea-dots {
          position: absolute;
          top: 24px; right: 24px;
          display: grid;
          grid-template-columns: repeat(4, 4px);
          gap: 6px;
          z-index: 5;
        }
        .ea-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(140,120,80,0.3);
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .ea-grid { grid-template-columns: 1fr; min-height: auto; }
          .ea-left {
            padding: 72px 36px 56px;
            border-right: none;
            border-bottom: 1px solid rgba(180,160,120,0.15);
          }
          .ea-headline { font-size: clamp(44px, 9vw, 72px); }
          .ea-right { padding: 64px 36px 72px; }
          .ea-body-grid { grid-template-columns: 1fr; gap: 20px; }
        }
        @media (max-width: 560px) {
          .ea-left { padding: 60px 24px 48px; }
          .ea-right { padding: 48px 24px 60px; }
          .ea-stats { gap: 0; }
          .ea-stat { padding-right: 28px; margin-right: 28px; }
          .ea-img-top { width: 160px; height: 160px; }
        }
      `}</style>

      <section
        ref={rootRef}
        className="ea-root"
        aria-label="About Empavai — Where Artistry Meets the Soul"
      >
        <div className="ea-arc"   aria-hidden="true" />
        <div className="ea-arc-2" aria-hidden="true" />

        <div className="ea-grid">

          {/* ══════════ LEFT ══════════ */}
          <div className="ea-left">

            <p className="ea-eyebrow">The Original Source</p>

            <h2 className="ea-headline">
              Where Artistry<br />Meets <em>the Soul</em>
            </h2>

            <div className="ea-rule" />

            <div className="ea-body-grid">
              <div className="ea-body-col">
                <p>
                  Every piece at Empavai is more than an ornament — it is a labour of
                  silence and contemplation. Our works speak without words, performing
                  small ceremonies for the beholder, showing every shape and colour
                  at rest.
                </p>
              </div>
              <div className="ea-body-col">
                <p>
                  We blend traditional material and modern materials, making durable yet
                  delicate art for a contemporary collection. Our focus on fixed, pure, and
                  organic textures reveals the inner depth of the individual and enriches
                  the spaces we inhabit together.
                </p>
              </div>
            </div>

            {/* Stats */}
            {/* <div className="ea-stats">
              <div className="ea-stat">
                <div className="ea-stat-val">100%</div>
                <div className="ea-stat-label">Handmade</div>
              </div>
              <div className="ea-stat">
                <div className="ea-stat-val">24k</div>
                <div className="ea-stat-label">Gold Detailing</div>
              </div>
              <div className="ea-stat">
                <div className="ea-stat-val ea-inf">∞</div>
                <div className="ea-stat-label">Unique Designs</div>
              </div>
            </div> */}

          </div>

          {/* ══════════ RIGHT ══════════ */}
          <div className="ea-right">

            {/* Dot grid decoration */}
            <div className="ea-dots" aria-hidden="true">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="ea-dot" />
              ))}
            </div>

            <div className="ea-img-stack">
              {/* Circular top image — ceramic/bowl */}
              <div className="ea-img-top">
                <img
                  src="/images/p-6.jpeg"
                  alt="Handcrafted ceramic piece"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (!img.dataset.fb) { img.dataset.fb = "1"; img.src = "/images/p-6.jpeg"; }
                  }}
                />
              </div>

              {/* Portrait bottom image — fabric / linen stacked */}
              <div className="ea-img-bottom">
                <img
                  src="/images/p-4.jpeg"
                  alt="Natural linen textures and materials"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (!img.dataset.fb) { img.dataset.fb = "1"; img.src = "/images/p-7.jpeg"; }
                  }}
                />
                {/* Floating glass tag */}
                {/* <div className="ea-img-tag">
                  <div className="ea-img-tag-label">Est.</div>
                  <div className="ea-img-tag-val">2019</div>
                </div> */}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default EmpavaiAbout;