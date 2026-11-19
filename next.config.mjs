/** Keep production builds from overwriting the running development server's chunks. */
const nextConfig = {
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
};
export default nextConfig;
