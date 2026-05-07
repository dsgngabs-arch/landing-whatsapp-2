/*
 * PARAÍSO LOTERIAS — Landing Page
 * Design: "Luxo Tropical da Sorte" — Art Deco Digital Premium
 * 
 * Sections:
 *   1. Header (Logo + Nav CTA)
 *   2. Hero (Headline + Imagem + Botões)
 *   3. Benefícios (Cards com ícones)
 *   4. Confiança (40 anos + Selo Premium)
 *   5. CTA Final
 *   6. Footer
 * 
 * Colors: #2F6B3E (bg), #49A84E (accent), #E4C44B (gold), #234F31 (alt bg)
 * Fonts: Montserrat (headlines), Inter (body)
 */

import { useEffect, useRef, useState } from "react";

const WHATSAPP_GROUP = "https://chat.whatsapp.com/FJT7j37Nn1IBPibjqzTURN?mode=gi_t";
const WHATSAPP_DIRECT = "https://wa.me/55999678181";
const HERO_IMAGE = "https://raw.githubusercontent.com/dsgngabs-arch/landing-whatsapp-2/main/client/public/_manus_/paraiso-hero_a8660976.png";

const LOGO_IMAGE = "https://raw.githubusercontent.com/dsgngabs-arch/landing-whatsapp-2/main/client/public/_manus_/paraiso-logo_270c88fa.jpg";

// WhatsApp SVG Icon
function WhatsAppIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// Clover Icon
function CloverIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C10.34 2 9 3.34 9 5c0 .74.27 1.41.71 1.93C8.79 6.35 7.94 6 7 6c-1.66 0-3 1.34-3 3 0 1.45.98 2.67 2.31 3.05C5.49 12.67 4.5 13.76 4.5 15c0 1.66 1.34 3 3 3 .94 0 1.79-.45 2.35-1.14C9.73 17.73 10.84 18.5 12 18.5s2.27-.77 3.15-1.64C15.71 17.55 16.56 18 17.5 18c1.66 0 3-1.34 3-3 0-1.24-.99-2.33-1.81-2.95C19.02 11.67 20 10.45 20 9c0-1.66-1.34-3-3-3-.94 0-1.79.35-2.71.93C14.73 6.41 15 5.74 15 5c0-1.66-1.34-3-3-3zm0 16.5c-.28 0-.5.22-.5.5v1.5c0 .28.22.5.5.5s.5-.22.5-.5V19c0-.28-.22-.5-.5-.5z" />
    </svg>
  );
}

// Checkmark component
function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E4C44B] flex items-center justify-center">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="#1a3d22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="text-white/90 text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{text}</span>
    </div>
  );
}

// Benefit Card
function BenefitCard({ icon, title, delay }: { icon: string; title: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="gold-border-card p-6 flex flex-col items-center text-center gap-3"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(228, 196, 75, 0.2), rgba(228, 196, 75, 0.05))',
          border: '1px solid rgba(228, 196, 75, 0.4)',
          boxShadow: '0 0 15px rgba(228, 196, 75, 0.15)',
        }}
      >
        {icon}
      </div>
      <p
        className="text-white font-semibold text-sm leading-snug"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {title}
      </p>
    </div>
  );
}

// Animated particles background
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${4 + Math.random() * 6}px`,
            height: `${4 + Math.random() * 6}px`,
            background: i % 2 === 0 ? '#E4C44B' : '#49A84E',
            animationDuration: `${8 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 8}s`,
            bottom: '-20px',
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

// Section wrapper with scroll animation
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2F6B3E', color: '#FFFFFF' }}>
      
      {/* ===== FLOATING WHATSAPP BUTTON ===== */}
      <a
        href={WHATSAPP_DIRECT}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Falar pelo WhatsApp"
        title="Falar com a Paraíso Loterias"
      >
        <WhatsAppIcon size={30} className="text-white" />
      </a>

      {/* ===== HEADER ===== */}
      <header
        className="relative z-10 py-4 px-4"
        style={{
          background: 'linear-gradient(180deg, rgba(26, 61, 34, 0.95) 0%, transparent 100%)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <img
              src={LOGO_IMAGE}
              alt="Paraíso Loterias Logo"
              className="h-12 w-auto"
              style={{ filter: 'drop-shadow(0 0 10px rgba(228, 196, 75, 0.3))' }}
            />
          </div>

          {/* Header CTA */}
          <a
            href={WHATSAPP_GROUP}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              background: 'linear-gradient(135deg, #E4C44B, #C9A830)',
              color: '#1a3d22',
              boxShadow: '0 0 15px rgba(228, 196, 75, 0.3)',
            }}
          >
            🍀 Grupo VIP
          </a>
        </div>
      </header>

      {/* ===== SECTION 1 — HERO ===== */}
      <section
        className="hero-bg relative overflow-hidden"
        style={{ paddingTop: '2rem', paddingBottom: '4rem' }}
      >
        <Particles />

        {/* Background glow effects */}
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(73, 168, 78, 0.25) 0%, transparent 70%)',
            transform: 'translate(-30%, -30%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(228, 196, 75, 0.12) 0%, transparent 70%)',
            transform: 'translate(30%, 30%)',
          }}
        />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            
            {/* Left: Text Content */}
            <div className="flex-1 text-center lg:text-left">
              
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold animate-fade-in"
                style={{
                  background: 'rgba(228, 196, 75, 0.12)',
                  border: '1px solid rgba(228, 196, 75, 0.4)',
                  color: '#E4C44B',
                  fontFamily: 'Montserrat, sans-serif',
                  boxShadow: '0 0 15px rgba(228, 196, 75, 0.1)',
                }}
              >
                <span>⭐</span>
                <span>Grupo Oficial — Paraíso Loterias</span>
              </div>

              {/* Headline */}
              <h1
                className="font-black leading-tight mb-4 animate-fade-in-up"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  color: '#FFFFFF',
                  textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                  animationDelay: '0.1s',
                  opacity: 0,
                  animationFillMode: 'forwards',
                }}
              >
                🍀 Entre para o{' '}
                <span
                  className="glow-text-gold"
                  style={{ color: '#E4C44B' }}
                >
                  Grupo VIP
                </span>{' '}
                da Paraíso Loterias
              </h1>

              {/* Subheadline */}
              <p
                className="text-lg mb-8 leading-relaxed animate-fade-in-up"
                style={{
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '520px',
                animationDelay: '0.25s',
                opacity: 0,
                animationFillMode: 'forwards',
                }}
              >
                Receba oportunidades, bolões, novidades e informações importantes direto no seu WhatsApp.
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-col gap-4 justify-center lg:justify-start mb-8 animate-fade-in-up"
                style={{
                  animationDelay: '0.4s',
                  opacity: 0,
                  animationFillMode: 'forwards',
                }}
              >
                <a
                  href={WHATSAPP_GROUP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold animate-pulse-gold"
                  style={{ fontSize: '1.1rem', padding: '1.1rem 2rem', width: '100%', maxWidth: '460px' }}
                >
                  🍀 Entrar no nosso Grupo VIP
                </a>

                <a
                  href={WHATSAPP_DIRECT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ fontSize: '1.1rem', padding: '1.1rem 2rem', width: '100%', maxWidth: '460px' }}
                >
                  <WhatsAppIcon size={22} />
                  📲 Falar com nosso WhatsApp
                </a>
              </div>

              {/* Trust indicators */}
              <div
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-in-up"
                style={{
                  animationDelay: '0.55s',
                  opacity: 0,
                  animationFillMode: 'forwards',
                }}
              >
                <CheckItem text="Entrada gratuita" />
                <CheckItem text="Grupo oficial da Paraíso Loterias" />
                <CheckItem text="Atendimento direto pelo WhatsApp" />
              </div>
            </div>

            {/* Right: Hero Image */}
            <div
              className="flex-shrink-0 w-full lg:w-auto animate-fade-in"
              style={{
                animationDelay: '0.2s',
                opacity: 0,
                animationFillMode: 'forwards',
              }}
            >
              <div
                className="relative mx-auto animate-float"
                style={{ maxWidth: '420px', width: '100%' }}
              >
                {/* Glow behind image */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(228, 196, 75, 0.2) 0%, rgba(73, 168, 78, 0.15) 50%, transparent 70%)',
                    filter: 'blur(20px)',
                    transform: 'scale(1.1)',
                  }}
                />
                <img
                  src={HERO_IMAGE}
                  alt="Paraíso Loterias — Mascote e jogos de loteria"
                  className="relative z-10 w-full h-auto rounded-2xl"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5)) drop-shadow(0 0 30px rgba(228, 196, 75, 0.2))',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2 — BENEFÍCIOS ===== */}
      <section
        className="py-16 px-4 relative overflow-hidden"
        style={{ backgroundColor: '#234F31' }}
      >
        {/* Decorative top border */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(228, 196, 75, 0.5), transparent)' }}
        />

        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <div className="section-divider" />
            <h2
              className="font-black text-3xl md:text-4xl mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#FFFFFF' }}
            >
              O que você encontra{' '}
              <span style={{ color: '#E4C44B' }}>no grupo?</span>
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.7)' }}
            >
              Tudo que você precisa saber sobre loterias, direto no seu WhatsApp.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <BenefitCard
              icon="🎯"
              title="Avisos dos principais bolões"
              delay={0}
            />
            <BenefitCard
              icon="💡"
              title="Oportunidades e novidades"
              delay={100}
            />
            <BenefitCard
              icon="🏆"
              title="Resultados e informações importantes"
              delay={200}
            />
            <BenefitCard
              icon="🎁"
              title="Promoções e campanhas especiais"
              delay={300}
            />
            <BenefitCard
              icon="📲"
              title="Comunicação rápida pelo WhatsApp"
              delay={400}
            />
            <BenefitCard
              icon="🍀"
              title="Grupo oficial e confiável"
              delay={500}
            />
          </div>

          {/* CTA inside benefits */}
          <AnimatedSection className="text-center mt-10">
            <a
              href={WHATSAPP_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex text-lg px-8 py-4"
            >
              🍀 Quero entrar no Grupo VIP
            </a>
          </AnimatedSection>
        </div>

        {/* Decorative bottom border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(228, 196, 75, 0.5), transparent)' }}
        />
      </section>

      {/* ===== SECTION 3 — CONFIANÇA ===== */}
      <section
        className="py-16 px-4 relative overflow-hidden"
        style={{ backgroundColor: '#2F6B3E' }}
      >
        {/* Background decorative */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(228, 196, 75, 0.06) 0%, transparent 60%)',
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <AnimatedSection>
            <div
              className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(35, 79, 49, 0.8), rgba(26, 61, 34, 0.9))',
                border: '1px solid rgba(228, 196, 75, 0.3)',
                boxShadow: '0 0 60px rgba(228, 196, 75, 0.08), inset 0 1px 0 rgba(228, 196, 75, 0.15)',
              }}
            >
              {/* Corner decorations */}
              <div
                className="absolute top-0 left-0 w-20 h-20 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at top left, rgba(228, 196, 75, 0.15), transparent 70%)',
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at bottom right, rgba(228, 196, 75, 0.15), transparent 70%)',
                }}
              />

              {/* Premium Seal */}
              <div className="flex justify-center mb-8">
                <img
                  src={LOGO_IMAGE}
                  alt="Paraíso Loterias Logo Oficial"
                  className="h-24 w-auto"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(228, 196, 75, 0.4))' }}
                />
              </div>

              {/* Title */}
              <h2
                className="font-black text-3xl md:text-4xl mb-4 glow-text-gold"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#E4C44B' }}
              >
                Paraíso Loterias
              </h2>

              {/* Divider */}
              <div className="section-divider" />

              {/* Main text */}
              <p
                className="text-xl md:text-2xl font-bold mb-6"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#FFFFFF' }}
              >
                Há{' '}
                <span
                  className="glow-text-gold"
                  style={{ color: '#E4C44B', fontSize: '1.4em' }}
                >
                  40 anos
                </span>{' '}
                trazendo a sorte até você.
              </p>

              <p
                className="text-base max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.75)' }}
              >
                Uma das lotéricas mais tradicionais e confiáveis da região, com décadas de história
                ajudando pessoas a realizarem seus sonhos. Agora, ainda mais perto de você —
                com atendimento direto e grupo exclusivo pelo WhatsApp.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 max-w-lg mx-auto">
                <div
                  className="rounded-2xl p-4 text-center"
                  style={{
                    background: 'rgba(228, 196, 75, 0.08)',
                    border: '1px solid rgba(228, 196, 75, 0.25)',
                  }}
                >
                  <div
                    className="text-2xl font-black"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: '#E4C44B' }}
                  >
                    40+
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.6)' }}
                  >
                    Anos de história
                  </div>
                </div>
                <div
                  className="rounded-2xl p-4 text-center"
                  style={{
                    background: 'rgba(228, 196, 75, 0.08)',
                    border: '1px solid rgba(228, 196, 75, 0.25)',
                  }}
                >
                  <div
                    className="text-2xl font-black"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: '#E4C44B' }}
                  >
                    100%
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.6)' }}
                  >
                    Oficial
                  </div>
                </div>
                <div
                  className="rounded-2xl p-4 text-center"
                  style={{
                    background: 'rgba(228, 196, 75, 0.08)',
                    border: '1px solid rgba(228, 196, 75, 0.25)',
                  }}
                >
                  <div
                    className="text-2xl font-black"
                    style={{ fontFamily: 'Montserrat, sans-serif', color: '#E4C44B' }}
                  >
                    📲
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.6)' }}
                  >
                    Direto no WhatsApp
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 justify-center mt-8">
                <div className="trust-badge">
                  <span>✅</span> Lotérica Oficial
                </div>
                <div className="trust-badge">
                  <span>🏅</span> 40 Anos de Tradição
                </div>
                <div className="trust-badge">
                  <span>🔒</span> Grupo Verificado
                </div>
                <div className="trust-badge">
                  <span>📲</span> Atendimento Direto
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== SECTION 4 — CTA FINAL ===== */}
      <section
        className="py-16 px-4 relative overflow-hidden"
        style={{ backgroundColor: '#234F31' }}
      >
        {/* Decorative top border */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(228, 196, 75, 0.5), transparent)' }}
        />

        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(73, 168, 78, 0.2) 0%, transparent 60%)',
          }}
        />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimatedSection>
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <img
                src={LOGO_IMAGE}
                alt="Paraíso Loterias Logo"
                className="h-16 w-auto"
                style={{ filter: 'drop-shadow(0 0 15px rgba(228, 196, 75, 0.4))' }}
              />
            </div>

            {/* Headline */}
            <h2
              className="font-black text-3xl md:text-4xl mb-4 leading-tight"
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#FFFFFF' }}
            >
              Sua próxima oportunidade{' '}
              <span style={{ color: '#E4C44B' }}>pode começar agora.</span>
            </h2>

            {/* Subheadline */}
            <p
              className="text-lg mb-10 leading-relaxed"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '500px',
                margin: '0 auto 2.5rem',
              }}
            >
              Escolha uma das opções abaixo e fale com a Paraíso Loterias pelo WhatsApp.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_GROUP}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold animate-pulse-gold text-lg px-8 py-4"
                style={{ minWidth: '260px' }}
              >
                🍀 Entrar no nosso Grupo VIP
              </a>

              <a
                href={WHATSAPP_DIRECT}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-lg px-8 py-4"
                style={{ minWidth: '260px' }}
              >
                <WhatsAppIcon size={22} />
                📲 Falar com nosso WhatsApp
              </a>
            </div>

            {/* Final trust line */}
            <p
              className="mt-8 text-sm"
              style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.5)' }}
            >
              ✅ Gratuito · ✅ Grupo Oficial · ✅ Sem spam
            </p>
          </AnimatedSection>
        </div>

        {/* Decorative bottom border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(228, 196, 75, 0.5), transparent)' }}
        />
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        className="py-8 px-4 text-center"
        style={{
          backgroundColor: '#1a3d22',
          borderTop: '1px solid rgba(228, 196, 75, 0.15)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img
              src={LOGO_IMAGE}
              alt="Paraíso Loterias Logo"
              className="h-10 w-auto"
              style={{ filter: 'drop-shadow(0 0 8px rgba(228, 196, 75, 0.3))' }}
            />
          </div>
          <p
            className="text-sm"
            style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.5)' }}
          >
            Paraíso Loterias — Há 40 anos trazendo a sorte até você.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href={WHATSAPP_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-yellow-300"
              style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.4)' }}
            >
              Grupo VIP
            </a>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
            <a
              href={WHATSAPP_DIRECT}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-yellow-300"
              style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.4)' }}
            >
              Atendimento
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
