/**
 * Faixa de demonstracao.
 *
 * Renderizada apenas quando NEXT_PUBLIC_DEMO_BANNER esta definido no build.
 * Deixa explicito ao visitante que o hotel e ficticio e que nenhuma reserva
 * e efetivada — obrigatorio em qualquer publicacao como demo comercial.
 *
 * NEXT_PUBLIC_DEMO_BANNER_HREF define o link de retorno ao site comercial.
 */
export function DemoBanner() {
  const enabled = process.env.NEXT_PUBLIC_DEMO_BANNER;
  if (!enabled) return null;

  const backHref = process.env.NEXT_PUBLIC_DEMO_BANNER_HREF ?? '/';

  return (
    <div className="w-full bg-hotel-navy-950 text-white text-center px-4 py-2 text-[11px] sm:text-xs tracking-wide">
      <span className="uppercase">Site de demonstração · hotel fictício</span>
      <span className="hidden sm:inline text-hotel-gold-400">
        {' '}· nenhuma reserva é efetivada aqui
      </span>
      <a
        href={backHref}
        className="ml-3 underline underline-offset-4 hover:text-hotel-gold-400"
      >
        Ver a oferta real ↗
      </a>
    </div>
  );
}
