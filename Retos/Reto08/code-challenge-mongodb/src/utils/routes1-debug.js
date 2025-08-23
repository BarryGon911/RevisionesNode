export function printRoutes(app, { basePath = '' } = {}) {
  try {
    const stack = app?._router?.stack;
    if (!Array.isArray(stack)) {
      console.warn('printRoutes: app._router.stack no disponible (¿montaste rutas ya?).');
      return;
    }

    const table = [];

    const pushRoute = (methodsObj, pathStr, prefix = '') => {
      const methods = Object.keys(methodsObj || {}).map(m => m.toUpperCase()).join(',') || 'MIDDLEWARE';
      const full = `${basePath}${prefix}${pathStr}`.replace(/\/{2,}/g, '/');
      table.push({ method: methods, path: full === '' ? '/' : full });
    };

    const scanRouterStack = (routerStack, prefix = '') => {
      if (!Array.isArray(routerStack)) return;
      for (const layer of routerStack) {
        if (!layer) continue;

        // Rutas directas
        if (layer.route && layer.route.path != null) {
          const paths = Array.isArray(layer.route.path) ? layer.route.path : [layer.route.path];
          for (const p of paths) pushRoute(layer.route.methods, p, prefix);
          continue;
        }

        // Subrouters anidados
        const isSubRouter = layer.name === 'router' && layer.handle && Array.isArray(layer.handle.stack);
        if (isSubRouter) {
          // Mejor esfuerzo para prefijo: si layer.regexp tiene fast_slash, no añade nada
          let subPrefix = prefix;
          if (layer.regexp && !layer.regexp.fast_slash) {
            // Intento simple de extraer el literal (no perfecto, pero evita crashear)
            const m = layer.regexp.toString().match(/^\s*\/\^\(\\\/\)\?\(\?:\\\/\)\?\(\[\^\\\/]\+\)\/i?$/i);
            // Si no es fácilmente decodificable, mejor no arriesgar y dejamos el prefix tal cual
            // (La mayoría de casos simples funcionan bien sin esto)
          }
          scanRouterStack(layer.handle.stack, subPrefix);
        }
      }
    };

    // Escanea el stack principal
    scanRouterStack(stack, '');

    if (table.length === 0) {
      console.warn('printRoutes: no se detectaron rutas (puede que todo sean middlewares).');
    } else {
      console.table(table);
    }
  } catch (err) {
    console.error('printRoutes error:', err?.stack || err);
  }
}





// export function printRoutes(app) {
//     const routes = [];
//     app._router.stack.forEach((m) => {
//         if (m.route && m.route.path) {
//             const methods = Object.keys(m.route.methods).join(',').toUpperCase();
//             routes.push({ method: methods, path: m.route.path });
//         }
//         else if (m.name === 'router' && m.handle.stack) {
//             m.handle.stack.forEach((h) => {
//                 const route = h.route;
//                 if (route) {
//                     const methods = Object.keys(route.methods).join(',').toUpperCase();
//                     routes.push({ method: methods, path: (m.regexp?.source || '') + route.path });
//                 }
//             });
//         }
//     });
//     console.table(routes);
// }

// export function printRoutes(app) {
    
//     const routes = [];
//     app._router.stack.forEach((m) => {
//         if (m.route && m.route.path) {
//             const methods = Object.keys(m.route.methods).join(',').toUpperCase();
//             routes.push({ method: methods, path: m.route.path });
//         } else if (m.name === 'router' && m.handle.stack) {
//             m.handle.stack.forEach((h) => {
//                 const route = h.route;
//                 if (route) {
//                     const methods = Object.keys(route.methods).join(',').toUpperCase();
//                     routes.push({ method: methods, path: (m.regexp?.source || '') + route.path });
//                 }
//             });
//         }
//     });
//     console.table(routes);
// }