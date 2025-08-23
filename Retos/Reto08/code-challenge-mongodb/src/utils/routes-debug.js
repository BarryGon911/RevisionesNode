// src/utils/routes-debug.js
// Lista rutas Express respetando prefijos de sub-routers ("/libros", "/autores", "/resenas", "/usuarios").
// Funciona en Express 4/5. Reconstruye mountpaths a partir de layer.regexp y concatena correctamente.

function decodeMountFromLayer(layer) {
  // 1) Express 5 a veces expone .path
  if (typeof layer?.path === "string" && layer.path.length) {
    return layer.path.startsWith("/") ? layer.path : `/${layer.path}`;
  }

  // 2) Express 4/5: derivar a partir del RegExp
  const rx = layer?.regexp;
  if (!rx) return "";

  // Preferir .source si existe; si no, toString()
  let src = (typeof rx.source === "string" && rx.source) || rx.toString?.() || "";
  if (!src) return "";

  // Normaliza comunes: quita delimitadores, anchors y lookaheads típicos
  // Ej: ^\/libros\/?(?=\/|$)  ->  /libros
  src = src
    .replace(/^\/\^/, "^")
    .replace(/\$\/[a-z]*$/i, "$")
    .replace(/^\^\\\//, "/")
    .replace(/\\\//g, "/")
    .replace(/\/\?\(\?\=\/\|\$\)/g, "")   // '/?(?=\/|$)'
    .replace(/\(\?\=\/\|\$\)/g, "")       // '(?=\/|$)'
    .replace(/^\^/, "/")
    .replace(/\$$/, "")
    .replace(/\\\./g, ".")
    .replace(/\(\?:/g, "(")
    .replace(/[()]/g, "");

  // Intenta extraer '/segmento(/segmento2)'
  const multi = src.match(/\/[A-Za-z0-9._~-]+(?:\/[A-Za-z0-9._~-]+)*/);
  if (multi) return multi[0];

  const word = src.match(/[A-Za-z0-9._~-]+/);
  if (word) return `/${word[0]}`;

  return "";
}

function normalizePath(p) {
  let out = p || "/";
  out = out.replace(/\/{2,}/g, "/");
  if (out.length > 1 && out.endsWith("/")) out = out.slice(0, -1);
  return out || "/";
}

function addRouteRow(table, methodsObj, fullPath, base = "") {
  const methods = Object.keys(methodsObj || {})
    .filter((m) => methodsObj[m])
    .map((m) => m.toUpperCase());
  const method = methods.length ? methods.join(",") : "MIDDLEWARE";

  const full = normalizePath((base || "") + fullPath);
  table.push({ METHOD: method, PATH: full });
}

function joinPrefix(prefix, routePath) {
  // Si la ruta es "/" queremos el prefijo tal cual (sin barra extra al final)
  const joined = routePath === "/" ? (prefix || "/") : `${prefix}${routePath}`;
  return normalizePath(joined);
}

function walkRouterStack(routerStack, table, prefix = "", base = "") {
  if (!Array.isArray(routerStack)) return;

  for (const layer of routerStack) {
    if (!layer) continue;

    // 1) Rutas concretas
    if (layer.route && layer.route.path != null) {
      const paths = Array.isArray(layer.route.path) ? layer.route.path : [layer.route.path];
      for (const p of paths) {
        const fullPath = joinPrefix(prefix, p);
        addRouteRow(table, layer.route.methods, fullPath, base);
      }
      continue;
    }

    // 2) Sub-router montado
    const isSub =
      layer.name === "router" &&
      layer.handle &&
      Array.isArray(layer.handle.stack);

    if (isSub) {
      // Obtén el prefijo montado de ESTE nivel, y baja
      const mount = decodeMountFromLayer(layer); // ej: "/libros"
      const nextPrefix = normalizePath(`${prefix}${mount}`);
      walkRouterStack(layer.handle.stack, table, nextPrefix === "/" ? "" : nextPrefix, base);
    }
  }
}

export function printRoutes({ app, router, basePath = "" } = {}) {
  try {
    const base = basePath && basePath !== "/" ? basePath : "";
    const table = [];

    // 1) Preferir app._router.stack si existe
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

    // 2) Fallback: router montado explícitamente (el que pasas a app.use)
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
