/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // gera site 100% estático na pasta ./out (sem Node no servidor)
  images: { unoptimized: true }, // necessário para export estático
  trailingSlash: true, // gera /pagina/index.html — servido direto pelo Nginx
};
export default nextConfig;
