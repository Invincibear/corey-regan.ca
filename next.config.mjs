import { build } from "velite"


class VeliteWebpackPlugin {
  static started = false;
  constructor(/** @type {import('velite').Options} */ options = {}) {
    this.options = options;
  }
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    // executed three times by Next.js !!!
    // twice for the server (Node.js / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;

      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      this.options.watch = this.options.watch ?? dev;
      this.options.clean = this.options.clean ?? !dev;
      await build(this.options);  // Start Velite
    });
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  logging: {
    incomingRequests: true,
    fetches: {
      fullUrl: true,
    },
  },
  transpilePackages: [
    'lucide-react'
  ],
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin())

    return config
  },
}

export default nextConfig
