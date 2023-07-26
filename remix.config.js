import { flatRoutes } from 'remix-flat-routes';

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
  ignoredRouteFiles: ['**/.*'],
  routes(defineRoutes) {
    return flatRoutes('routes', defineRoutes, {
      ignoredRouteFiles: [
        '**/*.css',
        '**/components/**/*',
        '**/hooks/**/*',
        '**/helpers/**/*',
        '**/tests/**/*',
      ],
    });
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  serverModuleFormat: 'esm',
  tailwind: true,
};
