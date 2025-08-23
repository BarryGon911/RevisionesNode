function extractMountPath(layer) {
  // Devuelve el mount path del layer (best-effort), ej: "/libros"
  try {
    if (layer?.regexp?.fast_slash) return "";
    const s = layer?.regexp?.toString?.() || "";
    // Patrón típico de Express: /^\/libros\/?(?=\/|$)/i
    const m = s.match(/^\/\^\\\/(.+?)\\\/\?\(\?\=\\\/\|\$\)\/i$/);
    if (m && m[1]) {
      return (
        "/" +
        m[1]
          .replace(/\\\//g, "/")
          .replace(/\\\./g, ".")
          .replace(/\(\?:\)/g, "")
      );
    }
  } catch {}
  return "";
}

export function printRoutes(app, { basePath = "" } = {}) {
  try {
    if (!app) {
      console.warn("printRoutes: app no definido.");
      return;
    }
    // Asegura que Express tenga router
    if (typeof app.lazyrouter === "function" && !app._router) app.lazyrouter();

    const stack = app?._router?.stack;
    if (!Array.isArray(stack)) {
      console.warn(
        "printRoutes: app._router.stack no disponible (¿montaste rutas ya?)."
      );
      return;
    }

    const table = [];
    const base = basePath && basePath !== "/" ? basePath : "";

    const addRoute = (methodsObj, fullPath) => {
      const methods = Object.keys(methodsObj || {})
        .filter((m) => methodsObj[m])
        .map((m) => m.toUpperCase());
      const method = methods.length ? methods.join(",") : "MIDDLEWARE";
      const clean =
        (base + (fullPath?.startsWith("/") ? fullPath : `/${fullPath || ""}`))
          .replace(/\/{2,}/g, "/") || "/";
      table.push({ METHOD: method, PATH: clean });
    };

    const walk = (layers, prefix = "") => {
      if (!Array.isArray(layers)) return;
      for (const layer of layers) {
        if (!layer) continue;

        // Rutas concretas en este nivel
        if (layer.route && layer.route.path != null) {
          const paths = Array.isArray(layer.route.path)
            ? layer.route.path
            : [layer.route.path];
          for (const p of paths) addRoute(layer.route.methods, prefix + p);
          continue;
        }

        // Sub-router montado
        const isSub =
          layer.name === "router" &&
          layer.handle &&
          Array.isArray(layer.handle.stack);

        if (isSub) {
          const mount = extractMountPath(layer);
          walk(layer.handle.stack, prefix + mount);
        }
      }
    };

    walk(stack, "");

    if (table.length === 0) {
      console.warn(
        "printRoutes: no se detectaron rutas (¿solo middlewares?)."
      );
    } else {
      console.table(table);
    }
  } catch (err) {
    console.error("printRoutes error:", err?.stack || err);
  }
}