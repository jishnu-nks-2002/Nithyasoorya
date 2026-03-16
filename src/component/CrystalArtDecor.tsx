import { useState } from "react";

const ALL = "All";

const FILTERS = {
  material: ["All", "Crystal", "Resin", "Amethyst", "Obsidian", "Copper"],
  series: ["All", "Violet Series", "Lunar Vol", "Origin Series", "Flow Series", "Sacred"],
  availability: ["All", "Available", "Inquire", "Sold Out"],
};

const products = [
  {
    id: 1,
    name: "Aetherial Flux I",
    series: "Violet Series",
    material: "Resin",
    availability: "Available",
    price: "$1,250",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    tall: true,
    new: false,
  },
  {
    id: 2,
    name: "Nocturnal Core",
    series: "Obsidian Dream",
    material: "Obsidian",
    availability: "Inquire",
    price: "$3,400",
    img: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=800&q=80",
    tall: false,
    new: true,
  },
  {
    id: 3,
    name: "Selenic Fragment",
    series: "Lunar Vol",
    material: "Crystal",
    availability: "Available",
    price: "$1,890",
    img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
    tall: true,
    new: false,
  },
  {
    id: 4,
    name: "Prismatic Flow",
    series: "Flow Series",
    material: "Resin",
    availability: "Available",
    price: "$980",
    img: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80",
    tall: false,
    new: false,
  },
  {
    id: 5,
    name: "Geode Resonance",
    series: "Origin Series",
    material: "Amethyst",
    availability: "Inquire",
    price: "$2,100",
    img: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80",
    tall: false,
    new: true,
  },
  {
    id: 6,
    name: "Teal Epoch",
    series: "Sacred",
    material: "Crystal",
    availability: "Available",
    price: "$1,640",
    img: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80",
    tall: true,
    new: false,
  },
  {
    id: 7,
    name: "Copper Veil",
    series: "Origin Series",
    material: "Copper",
    availability: "Sold Out",
    price: "$2,800",
    img: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80",
    tall: false,
    new: false,
  },
  {
    id: 8,
    name: "Amethyst Cathedral",
    series: "Violet Series",
    material: "Amethyst",
    availability: "Available",
    price: "$4,200",
    img: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80",
    tall: false,
    new: true,
  },
  {
    id: 9,
    name: "Obsidian Drift",
    series: "Lunar Vol",
    material: "Obsidian",
    availability: "Inquire",
    price: "$3,100",
    img: "https://images.unsplash.com/photo-1596548438137-d51ea5c83ca5?w=800&q=80",
    tall: true,
    new: false,
  },
];

type FilterState = { material: string; series: string; availability: string };

function FilterDropdown({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const active = value !== ALL;

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "8px 16px",
          fontFamily: "'Jost', sans-serif", fontSize: 11, fontWeight: 500,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: active ? "#6b3fa0" : "#6b5f85",
          background: active ? "rgba(107,63,160,0.07)" : "#fff",
          border: `1px solid ${active ? "rgba(107,63,160,0.35)" : "rgba(107,63,160,0.15)"}`,
          borderRadius: 3, cursor: "pointer", whiteSpace: "nowrap",
          transition: "all 0.25s ease",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        {label}{active ? `: ${value}` : ""}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
          style={{ transition: "transform 0.22s ease", transform: open ? "rotate(180deg)" : "none", opacity: 0.5 }}>
          <polyline points="2,3.5 5,6.5 8,3.5" />
        </svg>
      </button>

      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setOpen(false)} />
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 20,
            background: "#fff",
            border: "1px solid rgba(107,63,160,0.12)",
            borderRadius: 8, padding: "6px",
            minWidth: 160,
            boxShadow: "0 12px 40px rgba(80,40,140,0.12), 0 2px 8px rgba(0,0,0,0.05)",
          }}>
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                style={{
                  display: "block", width: "100%",
                  padding: "8px 12px",
                  background: opt === value ? "rgba(107,63,160,0.07)" : "transparent",
                  border: "none", borderRadius: 5,
                  fontFamily: "'Jost', sans-serif", fontSize: 12,
                  fontWeight: opt === value ? 500 : 300,
                  letterSpacing: "0.06em",
                  color: opt === value ? "#6b3fa0" : "#4a3966",
                  cursor: "pointer", textAlign: "left",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={e => { if (opt !== value) { e.currentTarget.style.background = "rgba(107,63,160,0.04)"; } }}
                onMouseLeave={e => { if (opt !== value) { e.currentTarget.style.background = "transparent"; } }}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [hov, setHov] = useState(false);

  const availColor =
    product.availability === "Available" ? "#6b3fa0" :
    product.availability === "Inquire"   ? "#9b4dca" : "#bbb";

  const availBg =
    product.availability === "Available" ? "rgba(107,63,160,0.08)" :
    product.availability === "Inquire"   ? "rgba(155,77,202,0.08)" : "rgba(0,0,0,0.04)";

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", borderRadius: 8, overflow: "hidden",
        cursor: "pointer",
        gridRow: product.tall ? "span 2" : "span 1",
        background: "#f7f4ef",
        border: `1px solid ${hov ? "rgba(107,63,160,0.2)" : "rgba(107,63,160,0.08)"}`,
        boxShadow: hov ? "0 12px 40px rgba(80,40,140,0.1)" : "0 2px 12px rgba(0,0,0,0.04)",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
        animation: `cardReveal 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s both`,
      }}
    >
      {/* Image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src={product.img}
          alt={product.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            filter: `saturate(0.85) brightness(${hov ? 0.88 : 0.78})`,
            transform: hov ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease",
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(245,240,255,0.05) 0%, rgba(245,240,255,0.0) 30%, rgba(230,220,255,0.7) 100%)",
      }} />

      {/* Top badges */}
      <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 8, zIndex: 3 }}>
        {product.new && (
          <span style={{
            padding: "4px 10px",
            background: "rgba(107,63,160,0.85)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(192,132,252,0.3)",
            borderRadius: 2,
            fontFamily: "'Jost', sans-serif", fontSize: 8, fontWeight: 600,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#fff",
          }}>New</span>
        )}
      </div>

      {/* Availability badge */}
      <div style={{
        position: "absolute", top: 12, right: 12, zIndex: 3,
        padding: "4px 10px",
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(8px)",
        border: `1px solid ${availColor}33`,
        borderRadius: 2,
        fontFamily: "'Jost', sans-serif", fontSize: 8, fontWeight: 500,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: availColor,
      }}>
        {product.availability}
      </div>

      {/* Bottom content */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "20px 18px 18px", zIndex: 3,
      }}>
        <div style={{
          fontFamily: "'Jost', sans-serif", fontSize: 9, fontWeight: 500,
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "#6b3fa0", marginBottom: 5, opacity: 0.85,
        }}>
          {product.series}
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(17px,2vw,22px)", fontWeight: 400, lineHeight: 1.15,
          color: "#1a1020", letterSpacing: "0.02em", marginBottom: 12,
        }}>
          {product.name}
        </div>

        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          opacity: hov ? 1 : 0.75,
          transform: hov ? "translateY(0)" : "translateY(4px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}>
          <button style={{
            fontFamily: "'Jost', sans-serif", fontSize: 9, fontWeight: 500,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#6b3fa0", background: "none", border: "none",
            cursor: "pointer", padding: 0,
            display: "flex", alignItems: "center", gap: 5,
          }}>
            View Details
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 15, fontWeight: 600,
              color: "#2e1f4a", letterSpacing: "0.04em",
            }}>
              {product.price}
            </span>
            {product.availability !== "Sold Out" && (
              <button style={{
                fontFamily: "'Jost', sans-serif", fontSize: 8, fontWeight: 500,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#fff", padding: "7px 13px",
                background: "linear-gradient(to right, #6b3fa0 50%, rgba(107,63,160,0.15) 50%)",
                backgroundSize: "200% 100%",
                backgroundPosition: hov ? "left center" : "right center",
                border: "1px solid rgba(107,63,160,0.4)",
                borderRadius: 2, cursor: "pointer",
                transition: "background-position 0.45s cubic-bezier(0.4,0,0.2,1), color 0.4s ease",
              }}>
                {product.availability === "Inquire" ? "Inquire" : "Buy Now"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CrystalArtDecorPage() {
  const [filters, setFilters] = useState<FilterState>({ material: ALL, series: ALL, availability: ALL });
  const setFilter = (key: keyof FilterState) => (val: string) => setFilters(f => ({ ...f, [key]: val }));

  const filtered = products.filter(p =>
    (filters.material === ALL || p.material === filters.material) &&
    (filters.series === ALL || p.series === filters.series) &&
    (filters.availability === ALL || p.availability === filters.availability)
  );

  const activeCount = Object.values(filters).filter(v => v !== ALL).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cad-root {
          background: #faf8f5;
          min-height: 100vh;
          color: #1a1020;
          font-family: 'Jost', sans-serif;
        }

        /* BREADCRUMB */
        .cad-breadcrumb {
          padding: 20px 48px 0;
          display: flex; align-items: center; gap: 8px;
          max-width: 1300px; margin: 0 auto;
        }
        .cad-breadcrumb a {
          font-family: 'Jost', sans-serif;
          font-size: 10px; font-weight: 400;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #a090bb; text-decoration: none;
          transition: color 0.2s ease;
        }
        .cad-breadcrumb a:hover { color: #6b3fa0; }
        .cad-breadcrumb span {
          font-size: 10px; color: #d0c8e0;
        }
        .cad-breadcrumb-active {
          font-family: 'Jost', sans-serif;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #6b3fa0;
        }

        /* HERO */
        .cad-hero {
          padding: 36px 48px 40px;
          max-width: 1300px; margin: 0 auto;
          border-bottom: 1px solid rgba(107,63,160,0.08);
        }
        .cad-hero-inner {
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 32px;
        }
        .cad-eyebrow {
          font-size: 9px; letter-spacing: 0.36em;
          text-transform: uppercase; color: #9b6fe0;
          margin-bottom: 10px; font-weight: 400;
        }
        .cad-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 4.5vw, 54px);
          font-weight: 400; line-height: 1.05;
          color: #1a1020; letter-spacing: 0.02em;
        }
        .cad-title em { font-style: italic; font-weight: 300; color: #6b3fa0; }
        .cad-hero-right { text-align: right; }
        .cad-hero-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px; font-style: italic; font-weight: 300;
          line-height: 1.75; color: #9b82c4; max-width: 280px;
          letter-spacing: 0.02em;
        }
        .cad-hero-count {
          display: inline-block; margin-top: 10px;
          font-family: 'Jost', sans-serif;
          font-size: 9px; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #c084fc;
          padding: 5px 12px;
          background: rgba(107,63,160,0.06);
          border: 1px solid rgba(107,63,160,0.12);
          border-radius: 20px;
        }

        /* FILTER BAR */
        .cad-filterbar {
          padding: 16px 48px;
          border-bottom: 1px solid rgba(107,63,160,0.07);
          display: flex; align-items: center;
          justify-content: space-between; gap: 16px;
          flex-wrap: wrap;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(8px);
          position: sticky; top: 0; z-index: 50;
          box-shadow: 0 1px 0 rgba(107,63,160,0.06);
        }
        .cad-filterbar-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .cad-clear {
          font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 400;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(107,63,160,0.5); background: none; border: none;
          cursor: pointer; padding: 4px 8px; transition: color 0.2s ease;
          text-decoration: underline; text-underline-offset: 3px;
        }
        .cad-clear:hover { color: #6b3fa0; }
        .cad-showing {
          font-family: 'Jost', sans-serif; font-size: 10.5px;
          font-weight: 300; font-style: italic;
          color: rgba(107,63,160,0.4); letter-spacing: 0.04em; white-space: nowrap;
        }

        /* GRID */
        .cad-grid-wrap {
          padding: 32px 48px 88px;
          max-width: 1300px; margin: 0 auto;
        }
        .cad-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 280px;
          gap: 14px;
        }

        /* EMPTY */
        .cad-empty {
          grid-column: 1/-1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 80px 0; gap: 14px;
          color: rgba(107,63,160,0.3);
        }
        .cad-empty p {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-style: italic; font-weight: 300; color: #9b82c4;
        }
        .cad-empty span {
          font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: #c0b0d8;
        }

        /* FOOTER CTA */
        .cad-footer {
          border-top: 1px solid rgba(107,63,160,0.08);
          padding: 40px 48px 56px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 24px;
          max-width: 1300px; margin: 0 auto;
        }
        .cad-footer-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px; font-style: italic; font-weight: 300;
          color: #b0a0c8; letter-spacing: 0.04em;
        }
        .cad-footer-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 28px;
          font-family: 'Jost', sans-serif; font-size: 9px; font-weight: 500;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: #6b3fa0;
          border: 1.5px solid rgba(107,63,160,0.35);
          border-radius: 2px; cursor: pointer; text-decoration: none;
          background: linear-gradient(to right, #6b3fa0 50%, transparent 50%);
          background-size: 200% 100%; background-position: right center;
          transition: background-position 0.45s cubic-bezier(0.4,0,0.2,1),
                      color 0.4s ease, border-color 0.4s ease;
        }
        .cad-footer-btn:hover {
          background-position: left center; color: #fff; border-color: #6b3fa0;
        }

        @media (max-width: 900px) {
          .cad-breadcrumb, .cad-hero, .cad-filterbar, .cad-grid-wrap, .cad-footer { padding-left: 24px; padding-right: 24px; }
          .cad-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 260px; }
          .cad-hero-inner { flex-direction: column; align-items: flex-start; }
          .cad-hero-right { text-align: left; }
        }
        @media (max-width: 560px) {
          .cad-grid { grid-template-columns: 1fr; grid-auto-rows: 320px; }
        }
      `}</style>

      <div className="cad-root">

        {/* Breadcrumb */}
        <div className="cad-breadcrumb">
          <a href="/">Home</a>
          <span>›</span>
          <a href="/collections">Collections</a>
          <span>›</span>
          <a href="/collections/nithyasoori">Nithyasoori</a>
          <span>›</span>
          <span className="cad-breadcrumb-active">Crystal Art Decor</span>
        </div>

        {/* Hero header */}
        <div className="cad-hero">
          <div className="cad-hero-inner">
            <div>
              <p className="cad-eyebrow">Nithyasoori · Wall &amp; Shelf Pieces</p>
              <h1 className="cad-title">
                Crystal <em>Art Decor</em>
              </h1>
            </div>
            <div className="cad-hero-right">
              <p className="cad-hero-desc">
                Handcrafted wall and shelf pieces that bring the energy of raw crystal into your living space.
              </p>
              <span className="cad-hero-count">
                {filtered.length} Pieces Available
              </span>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="cad-filterbar">
          <div className="cad-filterbar-left">
            <FilterDropdown label="Material"     options={FILTERS.material}     value={filters.material}     onChange={setFilter("material")} />
            <FilterDropdown label="Series"       options={FILTERS.series}       value={filters.series}       onChange={setFilter("series")} />
            <FilterDropdown label="Availability" options={FILTERS.availability} value={filters.availability} onChange={setFilter("availability")} />
            {activeCount > 0 && (
              <button className="cad-clear" onClick={() => setFilters({ material: ALL, series: ALL, availability: ALL })}>
                Clear {activeCount > 1 ? `(${activeCount})` : ""}
              </button>
            )}
          </div>
          <span className="cad-showing">
            Showing {filtered.length} of {products.length} works
          </span>
        </div>

        {/* Grid */}
        <div className="cad-grid-wrap">
          <div className="cad-grid">
            {filtered.length === 0 ? (
              <div className="cad-empty">
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                  <polygon points="20,2 38,20 20,38 2,20" stroke="rgba(107,63,160,0.25)" strokeWidth="1.5" fill="none"/>
                </svg>
                <p>No works found</p>
                <span>Try adjusting your filters</span>
              </div>
            ) : (
              filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="cad-footer">
          <span className="cad-footer-text">
            Can't find what you're looking for? We take custom commissions.
          </span>
          <a href="/contact" className="cad-footer-btn">
            Request a Commission
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

      </div>
    </>
  );
}