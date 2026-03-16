import { useState, useEffect, useRef } from "react";

const products = [
  {
    id: 1,
    name: "Celestial Lotus Garden",
    material: "Golden Resin & Amethyst",
    price: "$1,250",
    badge: null,
    image: "/images/p-1.jpeg",
  },
  {
    id: 2,
    name: "Amethyst Wisdom Tree",
    material: "Raw Crystal & Copper Wire",
    price: "$890",
    badge: null,
    image: "/images/p-2.jpeg",
  },
  {
    id: 3,
    name: "Eternal Koi Reflection",
    material: "Hand-painted Resin & Slate",
    price: "$1,580",
    badge: "New Arrival",
    image: "/images/p-3.jpeg",
  },
  {
    id: 4,
    name: "Moonstone River",
    material: "Moonstone & Silver Leaf",
    price: "$2,100",
    badge: null,
    image: "/images/p-4.jpeg",
  },
  {
    id: 5,
    name: "Sacred Geometry Shrine",
    material: "Obsidian & Gold Plating",
    price: "$3,400",
    badge: "Limited",
    image: "/images/p-5.jpeg",
  },
  {
    id: 6,
    name: "Terracotta Spirit Bloom",
    material: "Fired Clay & Copper Oxide",
    price: "$740",
    badge: null,
    image: "/images/p-6.jpeg",
  },
];

const VISIBLE = 3;
const INTERVAL = 3000;
const GAP = 16;

export default function CuratedSection() {
  const [offset, setOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);

  // Drag state
  const dragStartX = useRef(null);
  const dragDelta = useRef(0);
  const isDragging = useRef(false);

  const cloned = [...products, ...products.slice(0, VISIBLE)];

  const advance = () => {
    setIsTransitioning(true);
    setOffset((prev) => prev + 1);
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      advance();
    }, INTERVAL);
  };

  useEffect(() => {
    if (!paused) startTimer();
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  useEffect(() => {
    if (offset >= products.length) {
      const t = setTimeout(() => {
        setIsTransitioning(false);
        setOffset(0);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [offset]);

  const goTo = (i) => {
    setIsTransitioning(true);
    setOffset(i);
    startTimer();
  };

  // Drag handlers
  const onDragStart = (clientX) => {
    isDragging.current = true;
    dragStartX.current = clientX;
    dragDelta.current = 0;
    setPaused(true);
  };

  const onDragMove = (clientX) => {
    if (!isDragging.current) return;
    dragDelta.current = clientX - dragStartX.current;
  };

  const onDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const threshold = 60;
    if (dragDelta.current < -threshold) {
      setIsTransitioning(true);
      setOffset((prev) => Math.min(prev + 1, cloned.length - VISIBLE));
    } else if (dragDelta.current > threshold) {
      setIsTransitioning(true);
      setOffset((prev) => Math.max(prev - 1, 0));
    }
    dragDelta.current = 0;
    setPaused(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink: #1a1a1a;
          --parchment: #f2efea;
          --purple-accent: #6b3fa0;
          --muted: #999;
          --border: rgba(0,0,0,0.07);
        }

        .cs-root {
          background: var(--parchment);
          font-family: 'Jost', sans-serif;
          padding: 52px 36px 56px;
          color: var(--ink);
          overflow: hidden;
          user-select: none;
        }

        /* ── HERO HEADING ── */
        .cs-hero {
          text-align: center;
          margin-bottom: 44px;
        }

        .cs-eyebrow {
          font-size: 9px;
          letter-spacing: 0.36em;
          text-transform: uppercase;
          color: var(--purple-accent);
          margin-bottom: 14px;
          font-weight: 400;
        }

        .cs-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(42px, 7vw, 80px);
          font-weight: 400;
          line-height: 1.0;
          color: var(--ink);
          letter-spacing: -0.01em;
          margin-bottom: 18px;
        }

        .cs-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(13px, 1.5vw, 16px);
          font-weight: 300;
          font-style: normal;
          color: var(--muted);
          line-height: 1.75;
          max-width: 420px;
          margin: 0 auto;
          letter-spacing: 0.01em;
        }

        /* ── DIVIDER ── */
        .cs-divider {
          width: 100%; height: 1px;
          background: var(--border);
          margin-bottom: 28px;
        }

        /* ── CAROUSEL VIEWPORT ── */
        .cs-viewport {
          overflow: hidden;
          width: 100%;
          cursor: grab;
        }
        .cs-viewport:active { cursor: grabbing; }

        .cs-track {
          display: flex;
          gap: ${GAP}px;
          will-change: transform;
        }

        /* ── CARD ── */
        .cs-card {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
        }

        .cs-card-img-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 5px;
          aspect-ratio: 3 / 4;
          background: #1c1c1c;
        }

        .cs-card-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease;
          filter: brightness(0.94);
          pointer-events: none;
        }
        .cs-card:hover .cs-card-img-wrap img {
          transform: scale(1.05);
          filter: brightness(1.0);
        }

        .cs-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 52%);
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex; flex-direction: column;
          align-items: stretch; justify-content: flex-end;
          padding: 12px; gap: 7px;
          border-radius: 5px;
        }
        .cs-card:hover .cs-card-overlay { opacity: 1; }

        .cs-btn-buy {
          width: 100%; padding: 8px 0;
          background: var(--purple-accent);
          border: none; border-radius: 3px;
          font-family: 'Jost', sans-serif;
          font-size: 8px; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #fff; cursor: pointer;
          transition: background 0.2s;
        }
        .cs-btn-buy:hover { background: #5a2f8e; }

        .cs-btn-contact {
          width: 100%; padding: 8px 0;
          background: rgba(255,255,255,0.88);
          border: none; border-radius: 3px;
          font-family: 'Jost', sans-serif;
          font-size: 8px; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--ink); cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .cs-btn-contact:hover { background: #fff; color: var(--purple-accent); }

        .cs-badge {
          position: absolute; top: 10px; left: 10px; z-index: 3;
          background: var(--purple-accent); color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 7px; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 4px 8px; border-radius: 2px;
        }

        /* ── CARD INFO ── */
        .cs-card-info { padding: 10px 2px 0; }

        .cs-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13.5px; font-weight: 600;
          letter-spacing: 0.03em; color: var(--ink);
          line-height: 1.3; margin-bottom: 2px;
        }
        .cs-card-material {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 11px;
          font-weight: 300; color: var(--muted);
          margin-bottom: 6px;
        }
        .cs-card-price {
          font-size: 12px; font-weight: 400;
          color: var(--purple-accent); letter-spacing: 0.04em;
        }

        /* ── DOTS ── */
        .cs-dots {
          display: flex; justify-content: center;
          gap: 7px; margin-top: 24px;
        }
        .cs-dot {
          width: 5px; height: 5px; border-radius: 50%;
          border: none; padding: 0; cursor: pointer;
          background: rgba(107,63,160,0.2);
          transition: background 0.3s, transform 0.3s;
        }
        .cs-dot.active { background: var(--purple-accent); transform: scale(1.4); }

        @media (max-width: 640px) {
          .cs-root { padding: 36px 16px 44px; }
        }
      `}</style>

      <section
        className="cs-root"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); onDragEnd(); }}
      >
        {/* ── Hero Heading ── */}
        <div className="cs-hero">
          <p className="cs-eyebrow">Current Collection</p>
          <h2 className="cs-title">Works on View</h2>
          <p className="cs-subtitle">
            A curated selection of contemporary works across mediums,<br />
            exploring the boundaries of form, light, and material.
          </p>
        </div>

        <div className="cs-divider" />

        {/* ── Carousel ── */}
        <div
          className="cs-viewport"
          ref={viewportRef}
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseMove={(e) => onDragMove(e.clientX)}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
          onTouchEnd={onDragEnd}
        >
          <div
            className="cs-track"
            ref={trackRef}
            style={{
              transform: `translateX(calc(-${offset} * (calc((100vw - 72px - ${(VISIBLE - 1) * GAP}px) / ${VISIBLE}) + ${GAP}px)))`,
              transition: isTransitioning ? "transform 0.6s cubic-bezier(0.4,0,0.2,1)" : "none",
            }}
          >
            {cloned.map((p, i) => (
              <div
                key={`${p.id}-${i}`}
                className="cs-card"
                style={{ width: `calc((100vw - 72px - ${(VISIBLE - 1) * GAP}px) / ${VISIBLE})` }}
              >
                <div className="cs-card-img-wrap">
                  {p.badge && <span className="cs-badge">{p.badge}</span>}
                  <img src={p.image} alt={p.name} draggable="false" />
                  <div className="cs-card-overlay">
                    {/* <button className="cs-btn-buy">Buy Now</button> */}
                    <button className="cs-btn-contact">Contact</button>
                  </div>
                </div>
                <div className="cs-card-info">
                  <div className="cs-card-name">{p.name}</div>
                  <div className="cs-card-material">{p.material}</div>
                  <div className="cs-card-price">{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dots ── */}
        <div className="cs-dots">
          {products.map((_, i) => (
            <button
              key={i}
              className={`cs-dot${offset % products.length === i ? " active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}