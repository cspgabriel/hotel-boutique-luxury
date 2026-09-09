/**
 * Suporte a dois modos de publicacao:
 *  1. Standalone  -> deploy proprio no dominio do hotel (padrao, sem basePath)
 *  2. Sub-pasta   -> embutido em outro site (ex.: /demo/boutique no meuhotelonline)
 *
 * Modo 2 e ativado por NEXT_PUBLIC_BASE_PATH, ex.:
 *   NEXT_PUBLIC_BASE_PATH=/demo/boutique npm run build
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
