function decodeMountFromLayer(layer) {
  // 1) Express 5 a veces trae .path
  if (typeof layer?.path === "string" && layer.path.length) {
    return layer.path.startsWith("/") ? layer.path : `/${layer.path}`;
  }

  // 2) Deducción a partir de RegExp (toString / source)
  const rx = layer?.regexp;
  if (!rx) return "";

  // Obtén string base
  const src = (typeof rx.source === "string" && rx.source) || rx.toString?.() || "";
  if (!src) return "";

  // Normaliza
  let s = src;

  // Quita delimitadores "/^   $/i"
  s = s.replace(/^\/\^/, "^").replace(/\$\/[a-z]*$/i, "$");
  // Quita anclas y lookaheads finales típicos: ^\/libros\/?(?=\/|$)
  s = s.replace(/^\^\\\//, "/");
  s = s.replace(/\(\?:\\\/\)\?/g, "/");           // (?:\/)?
  s = s.replace(/\\\/\?\(\?\=\\\/\|\$\)/g, "");    // \/?(?=\/|$)
  s = s.replace(/\(\?:\\\/\(\?\=\\\/\|\$\)\)\?/g, "");
  s = s.replace(/\(\?\=\\\/\|\$\)/g, "");
  s = s.replace(/^\^/, "/");                       // ^ -> /
  s = s.replace(/\$$/, "");                        // $ -> (nada)

  // Limpia escapes comunes
  s = s.replace(/\\\//g, "/").replace(/\\\./g, ".");

  // Quita grupos no capturantes (?:...)
  s = s.replace(/\(\?:/g, "(");

  // Si quedó algo como "(libros)" o "(api\\/v1)", quita paréntesis
  s = s.replace(/[()]/g, "");

  // Si aún contiene clases o tokens raros, nos quedamos con el primer segmento alfabético
  // típico: "/libros" o "/api/v1"
  const mMulti = s.match(/\/[A-Za-z0-9._~-]+(?:\/[A-Za-z0-9._~-]+)*/);
  if (mMulti) return mMulti[0];

  // Fallback: si lo más claro es "libros"
  const mWord = s.match(/[A-Za-z0-9._~-]+/);
  if (mWord) return `/${mWord[0]}`;

  return "";
}

function addRouteRow(table, methodsObj, fullPath, base = "") {
  const methods = Object.keys(methodsObj || {})
    .filter((m) => methodsObj[m])
    .map((m) => m.toUpperCase());
  const method = methods.length ? methods.join(",") : "MIDDLEWARE";

  const clean = (base + (fullPath?.startsWith("/") ? fullPath : `/${fullPath || ""}`))
    .replace(/\/{2,}/g, "/") || "/";

  table.push({ METHOD: method, PATH: clean });
}

function walkRouterStack(routerStack, table, prefix = "", base = "") {
  if (!Array.isArray(routerStack)) return;

  for (const layer of routerStack) {
    if (!layer) continue;

    // 1) Rutas concretas en este nivel (route)
    if (layer.route && layer.route.path != null) {
      const paths = Array.isArray(layer.route.path) ? layer.route.path : [layer.route.path];
      for (const p of paths) addRouteRow(table, layer.route.methods, `${prefix}${p}`, base);
      continue;
    }

    // 2) Sub-router montado (router.use('/xxx', subRouter))
    const isSub =
      layer.name === "router" &&
      layer.handle &&
      Array.isArray(layer.handle.stack);

    if (isSub) {
      // Decodifica el mountpath y baja recursivamente
      const mount = decodeMountFromLayer(layer);
      walkRouterStack(layer.handle.stack, table, `${prefix}${mount}`, base);
    }
  }
}

export function printRoutes({ app, router, basePath = "" } = {}) {
  try {
    const base = basePath && basePath !== "/" ? basePath : "";
    const table = [];

    // 1) Preferimos app._router.stack si existe
    let used = "app";
    if (app) {
      if (typeof app.lazyrouter === "function" && !app._router) app.lazyrouter();
      const stack = app?._router?.stack;
      if (Array.isArray(stack)) {
        walkRouterStack(stack, table, "", base);
      } else {
        used = "router";
      }
    } else {
      used = "router";
    }

    // 2) Fallback: usar el router montado explícitamente
    if (used === "router" && router) {
      const stack = router?.stack;
      if (Array.isArray(stack)) {
        walkRouterStack(stack, table, "", base);
      } else {
        console.warn("printRoutes: router.stack no disponible.");
      }
    }

    if (!table.length) {
      console.warn("printRoutes: no se detectaron rutas (¿solo middlewares?).");
    } else {
      console.table(table);
    }
  } catch (err) {
    console.error("printRoutes error:", err?.stack || err);
  }
}






// function extractMountPath(layer) {
//   // Intenta deducir el mount path del layer (best-effort).
//   // 1) Express 5 a veces tiene .path
//   if (typeof layer?.path === "string") return layer.path;
//   // 2) Express 4/5: layer.regexp puede delatar el literal, p. ej. /^\/libros\/?(?=\/|$)/i
//   try {
//     if (layer?.regexp?.fast_slash) return "";
//     const src = layer?.regexp?.toString?.() || "";
//     // Coincide un solo segmento simple: "/libros"
//     let m = src.match(/^\/\^\\\/([^\\]+?)\\\/\?\(\?\=\\\/\|\$\)\/i$/);
//     if (m && m[1]) return "/" + m[1].replace(/\\\//g, "/");
//     // Coincide prefijos con barras: "/api/v1"
//     m = src.match(/^\/\^\(\?:\\\/\)\?\(\?:([^)]+)\)\?\/i$/);
//     if (m && m[1]) return "/" + m[1].replace(/\\\//g, "/").replace(/\(\?:\^?\|\$\)\?/g, "");
//   } catch {}
//   return "";
// }

// function addRouteRow(table, methodsObj, fullPath, base = "") {
//   const methods = Object.keys(methodsObj || {})
//     .filter((m) => methodsObj[m])
//     .map((m) => m.toUpperCase());
//   const method = methods.length ? methods.join(",") : "MIDDLEWARE";
//   const clean =
//     (base + (fullPath?.startsWith("/") ? fullPath : `/${fullPath || ""}`))
//       .replace(/\/{2,}/g, "/") || "/";
//   table.push({ METHOD: method, PATH: clean });
// }

// function walkRouterStack(routerStack, table, prefix = "", base = "") {
//   if (!Array.isArray(routerStack)) return;
//   for (const layer of routerStack) {
//     if (!layer) continue;

//     // Rutas concretas en este nivel
//     if (layer.route && layer.route.path != null) {
//       const paths = Array.isArray(layer.route.path) ? layer.route.path : [layer.route.path];
//       for (const p of paths) addRouteRow(table, layer.route.methods, prefix + p, base);
//       continue;
//     }

//     // Sub-router montado
//     const isSub =
//       layer.name === "router" &&
//       layer.handle &&
//       Array.isArray(layer.handle.stack);

//     if (isSub) {
//       const mount = extractMountPath(layer);
//       walkRouterStack(layer.handle.stack, table, prefix + mount, base);
//     }
//   }
// }

// export function printRoutes({ app, router, basePath = "" } = {}) {
//   try {
//     const base = basePath && basePath !== "/" ? basePath : "";
//     const table = [];

//     // 1) Preferimos app._router.stack si existe
//     let used = "app";
//     if (app) {
//       if (typeof app.lazyrouter === "function" && !app._router) {
//         app.lazyrouter(); // crea app._router si aún no existe
//       }
//       const stack = app?._router?.stack;
//       if (Array.isArray(stack)) {
//         walkRouterStack(stack, table, "", base);
//       } else {
//         used = "router";
//       }
//     } else {
//       used = "router";
//     }

//     // 2) Fallback: usar el router que montaste en app.use(BASE_PATH, rutas)
//     if (used === "router" && router) {
//       const stack = router?.stack;
//       if (Array.isArray(stack)) {
//         walkRouterStack(stack, table, "", base);
//       } else {
//         console.warn("printRoutes: router.stack no disponible.");
//       }
//     }

//     if (!table.length) {
//       console.warn("printRoutes: no se detectaron rutas (¿solo middlewares?).");
//     } else {
//       console.table(table);
//     }
//   } catch (err) {
//     console.error("printRoutes error:", err?.stack || err);
//   }
// }







// function extractMountPath(layer) {
//   // Devuelve el mount path del layer (best-effort), ej: "/libros"
//   try {
//     if (layer?.regexp?.fast_slash) return "";
//     const s = layer?.regexp?.toString?.() || "";
//     // Patrón típico de Express: /^\/libros\/?(?=\/|$)/i
//     const m = s.match(/^\/\^\\\/(.+?)\\\/\?\(\?\=\\\/\|\$\)\/i$/);
//     if (m && m[1]) {
//       return (
//         "/" +
//         m[1]
//           .replace(/\\\//g, "/")
//           .replace(/\\\./g, ".")
//           .replace(/\(\?:\)/g, "")
//       );
//     }
//   } catch {}
//   return "";
// }

// export function printRoutes(app, { basePath = "" } = {}) {
//   try {
//     if (!app) {
//       console.warn("printRoutes: app no definido.");
//       return;
//     }
//     // Asegura que Express tenga router
//     if (typeof app.lazyrouter === "function" && !app._router) app.lazyrouter();

//     const stack = app?._router?.stack;
//     if (!Array.isArray(stack)) {
//       console.warn(
//         "printRoutes: app._router.stack no disponible (¿montaste rutas ya?)."
//       );
//       return;
//     }

//     const table = [];
//     const base = basePath && basePath !== "/" ? basePath : "";

//     const addRoute = (methodsObj, fullPath) => {
//       const methods = Object.keys(methodsObj || {})
//         .filter((m) => methodsObj[m])
//         .map((m) => m.toUpperCase());
//       const method = methods.length ? methods.join(",") : "MIDDLEWARE";
//       const clean =
//         (base + (fullPath?.startsWith("/") ? fullPath : `/${fullPath || ""}`))
//           .replace(/\/{2,}/g, "/") || "/";
//       table.push({ METHOD: method, PATH: clean });
//     };

//     const walk = (layers, prefix = "") => {
//       if (!Array.isArray(layers)) return;
//       for (const layer of layers) {
//         if (!layer) continue;

//         // Rutas concretas en este nivel
//         if (layer.route && layer.route.path != null) {
//           const paths = Array.isArray(layer.route.path)
//             ? layer.route.path
//             : [layer.route.path];
//           for (const p of paths) addRoute(layer.route.methods, prefix + p);
//           continue;
//         }

//         // Sub-router montado
//         const isSub =
//           layer.name === "router" &&
//           layer.handle &&
//           Array.isArray(layer.handle.stack);

//         if (isSub) {
//           const mount = extractMountPath(layer);
//           walk(layer.handle.stack, prefix + mount);
//         }
//       }
//     };

//     walk(stack, "");

//     if (table.length === 0) {
//       console.warn(
//         "printRoutes: no se detectaron rutas (¿solo middlewares?)."
//       );
//     } else {
//       console.table(table);
//     }
//   } catch (err) {
//     console.error("printRoutes error:", err?.stack || err);
//   }
// }