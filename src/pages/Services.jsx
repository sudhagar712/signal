import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageBanner from '../components/sections/PageBanner';
import useSEO from '../hooks/useSEO';

// ── Images ─────────────────────────────────────────────────────────────
const IMG = {
  led:   'https://5.imimg.com/data5/SELLER/Default/2025/10/551372391/KB/RW/FX/21588759/led-display-screen-500x500.jpg',
  acp:   'https://images.unsplash.com/photo-1693661391267-ad955aeeb564?q=80&w=1046&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  sign:  'https://images.unsplash.com/photo-1694544067836-f6b2230a750e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  name:  'https://files.printo.in/site/20230711_232728083600_d3e6d4_Steel-Name-Plates-with-Engraving.jpg',
  flex:  'https://image.made-in-china.com/2f0j00clzRdiEsCpkK/New-Roland-Large-Format-Printer-Textile-Printing-Machines-Flex-Printing-Machine-Price.webp',
  print: 'https://images.unsplash.com/photo-1503694978374-8a2fa686963a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJpbnQlMjBtYXRlcmlhbHxlbnwwfHwwfHx8MA%3D%3D',
};

// ── Tag Pill ────────────────────────────────────────────────────────────
function Tag({ label, light }) {
  return (
    <span className={`text-[11px] px-3 py-[5px] rounded-full border font-medium whitespace-nowrap
      ${light
        ? 'border-white/30 text-white/90 bg-white/10 backdrop-blur-sm'
        : 'border-white/12 text-white/60 bg-white/5'}`}>
      {label}
    </span>
  );
}

// ── CTA ─────────────────────────────────────────────────────────────────
function CTA({ href, label }) {
  return (
    <Link to={href} className="inline-flex items-center gap-2 text-sm font-bold text-white group/cta">
      {label}
      <ArrowRight size={15} className="group-hover/cta:translate-x-1 transition-transform duration-200" />
    </Link>
  );
}

// ───────────────────────────────────────────────────────────────────────
// LARGE CARD — Mobile: image top, text bottom  |  Desktop: text left, image right
// ───────────────────────────────────────────────────────────────────────
function LargeCard({ title, desc, tags, cta, href, img, blue }) {
  const bg   = blue ? '#1D6FE8' : '#12131A';
  const from = blue ? 'from-[#1D6FE8]' : 'from-[#12131A]';
  const fromB = blue ? 'from-[#1D6FE8]' : 'from-[#12131A]'; // for mobile top gradient

  return (
    <Link
      to={href}
      className="group relative overflow-hidden rounded-[20px] md:col-span-3 flex flex-col md:flex-row"
      style={{ backgroundColor: bg, minHeight: 280 }}
    >
      {/* ── Mobile: image on top ── */}
      <div className="relative w-full h-52 md:hidden overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {/* bottom fade into card bg */}
        <div className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${fromB} to-transparent`} />
      </div>

      {/* ── Text panel ── */}
      <div className="relative z-10 flex flex-col justify-between p-6 md:p-8 w-full md:w-[42%] md:shrink-0">
        <div>
          <h2 className="text-xl md:text-[22px] font-extrabold text-white leading-snug mb-2 md:mb-3">{title}</h2>
          <p className={`text-[13px] leading-relaxed ${blue ? 'text-blue-100/90' : 'text-gray-400'}`}>{desc}</p>
        </div>
        <div className="space-y-3 md:space-y-4 mt-4 md:mt-0">
          <div className="flex flex-wrap gap-2">
            {tags.map(t => <Tag key={t} label={t} light={blue} />)}
          </div>
          <CTA href={href} label={cta} />
        </div>
      </div>

      {/* ── Desktop: image right (absolute, full height) ── */}
      <div className="hidden md:block absolute inset-y-0 right-0 left-[38%] overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className={`absolute inset-0 bg-gradient-to-r ${from} via-transparent to-transparent w-[55%]`} />
      </div>
    </Link>
  );
}

// ───────────────────────────────────────────────────────────────────────
// SMALL CARD — Mobile: image top, text bottom  |  Desktop: text left, image right bg
// ───────────────────────────────────────────────────────────────────────
function SmallCard({ title, desc, tags, href, img }) {
  return (
    <Link
      to={href}
      className="group relative overflow-hidden rounded-[20px] bg-[#12131A] md:col-span-2 flex flex-col md:flex-row"
      style={{ minHeight: 260 }}
    >
      {/* Mobile image top */}
      <div className="relative w-full h-44 md:hidden overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#12131A] to-transparent" />
      </div>

      {/* Desktop image right (absolute) */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-[55%] overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12131A] via-[#12131A]/60 to-transparent" />
      </div>

      {/* Text */}
      <div className="relative z-10 flex flex-col justify-between p-6 md:p-7 w-full md:w-[56%] md:shrink-0">
        <div>
          <h2 className="text-xl font-extrabold text-white mb-2 leading-snug">{title}</h2>
          <p className="text-[13px] text-gray-400 leading-relaxed">{desc}</p>
        </div>
        <div className="space-y-3 md:space-y-4 mt-4 md:mt-0">
          <div className="flex flex-wrap gap-2">
            {tags.map(t => <Tag key={t} label={t} />)}
          </div>
          <CTA href={href} label="Request Quote" />
        </div>
      </div>
    </Link>
  );
}

// ───────────────────────────────────────────────────────────────────────
// HALF CARD — Mobile: image top, text bottom  |  Desktop: text left, image right
// ───────────────────────────────────────────────────────────────────────
function HalfCard({ title, desc, tags, href, img }) {
  return (
    <Link
      to={href}
      className="group relative overflow-hidden rounded-[20px] bg-[#12131A] flex flex-col md:flex-row"
      style={{ minHeight: 220 }}
    >
      {/* Mobile image top */}
      <div className="relative w-full h-44 md:hidden overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#12131A] to-transparent" />
      </div>

      {/* Desktop image right (absolute) */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-[52%] overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12131A] via-[#12131A]/50 to-transparent" />
      </div>

      {/* Text */}
      <div className="relative z-10 flex flex-col justify-between p-6 md:p-7 w-full md:w-[58%] md:shrink-0">
        <div>
          <h2 className="text-[20px] font-extrabold text-white mb-2 leading-snug">{title}</h2>
          <p className="text-[13px] text-gray-400 leading-relaxed">{desc}</p>
        </div>
        <div className="space-y-3 md:space-y-4 mt-4 md:mt-0">
          <div className="flex flex-wrap gap-2">
            {tags.map(t => <Tag key={t} label={t} />)}
          </div>
          <CTA href={href} label="Request Quote" />
        </div>
      </div>
    </Link>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────
export default function Services() {
  useSEO({
    title: 'Our Services | Signal Visibility',
    description: 'Explore our complete suite of branding solutions including LED Displays, ACP Elevations, Signages, and Premium Print Media.',
    keywords: 'Services, LED Display Systems, Print Media, Signages, Flex Printing'
  });

  return (
    <div className="relative bg-[#0a0b0f] min-h-screen pb-24 overflow-hidden">
      {/* Checked Grid Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] [background-size:60px_60px]"></div>
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-600/5 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blue-500/4 blur-[120px] rounded-full"></div>
      </div>
      <PageBanner
        badge="Our Expertise"
        title="Services"
        subtitle="From digital displays to physical branding, we deliver end-to-end solutions that make your business stand out."
      />

      <div className="container mx-auto px-4 lg:px-10 pt-16 md:pt-20 space-y-4 relative z-10">

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <LargeCard
            title="Next-Gen LED Display Systems"
            desc="High-performance indoor and outdoor LED displays designed for clarity, brightness, and durability."
            tags={['Indoor', 'Outdoor', 'Custom Sizes', 'Installation', 'Maintenance']}
            cta="Explore Solution"
            href="/led-display"
            img={IMG.led}
            blue={false}
          />
          <SmallCard
            title="ACP Elevation"
            desc="Modern exterior solutions that elevate your building's visual identity with clean finishes and durable materials."
            tags={['Clean Finishes', 'Durable Materials', 'Custom Designs']}
            href="/contact"
            img={IMG.acp}
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <LargeCard
            title="Sign Boards & Signages"
            desc="Clear, bold, and built for visibility. Both outdoor and indoor directional systems."
            tags={['Outdoor Signs', 'Indoor Signs', 'Directional', 'Custom Branding']}
            cta="Request Quote"
            href="/contact"
            img={IMG.sign}
            blue={true}
          />
          <SmallCard
            title="Name Boards"
            desc="Professional identity markers designed to reflect your brand with precision."
            tags={['Corporate', 'Retail', 'Premium Materials']}
            href="/contact"
            img={IMG.name}
          />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HalfCard
            title="Flex Printing"
            desc="High-quality prints for large-scale outdoor visibility and event promotions."
            tags={['Outdoor Flex', 'Event Banners', 'Promotional Displays']}
            href="/contact"
            img={IMG.flex}
          />
          <HalfCard
            title="Print Materials"
            desc="Designed to communicate. Printed to impress. High-quality marketing collateral."
            tags={['Pamphlets', 'Flyers', 'Brochures']}
            href="/contact"
            img={IMG.print}
          />
        </div>

      </div>
    </div>
  );
}
