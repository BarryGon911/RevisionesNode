function normalizePath(p) {
  let out = p || "/";
  out = out.replace(/\/{2,}/g, "/");
  if (out.length > 1 && out.endsWith("/")) out = out.slice(0, -1);
  return out || "/";
}

function joinPrefix(prefix, routePath) {
  // Si la ruta del sub-router es "/" queremos devolver el prefijo tal cual
  const joined = routePath === "/" ? (prefix || "/") : `${prefix}${routePath}`;
  return normalizePath(joined);
}

function decodeMountFromRegexp(layer) {
  const rx = layer?.regexp;
  if (!rx) return "";
  // Usa .source si existe; si no, toString() y limpia delimitadores
  let src = (typeof rx.source === "string" && rx.source) ? rx.source : String(rx);
  src = src.replace(/^\/\^?/, "^").replace(/\$\/[a-z]*$/i, "$");

  // Extrae todos los segmentos \/(segmento) -> "/a/b/..."
  const segs = [];
  const re = /\\\/([A-Za-z0-9._~:-]+)/g;
  let m;
  while ((m = re.exec(src)) !== null) if (m[1]) segs.push(m[1]);

  if (!segs.length) return ""; // probablemente raíz "^\/(?=\/|$)"
  return "/" + segs.join("/");
}

function getMount(layer) {
  // 1) Preferir metadata anotada
  const annotated = layer?.handle?._mountpath;
  if (typeof annotated === "string" && annotated.length) return annotated;
  // 2) Fallback: regexp
  return decodeMountFromRegexp(layer) || "";
}

function addRow(table, methodsObj, fullPath, base = "") {
  const methods = Object.keys(methodsObj || {})
    .filter((m) => methodsObj[m])
    .map((m) => m.toUpperCase());
  const method = methods.length ? methods.join(",") : "MIDDLEWARE";
  const full = normalizePath((base || "") + fullPath);
  table.push({ METHOD: method, PATH: full });
}

function walk(stack, table, prefix = "", base = "") {
  if (!Array.isArray(stack)) return;

  for (const layer of stack) {
    if (!layer) continue;

    // 1) Rutas definidas en este nivel
    if (layer.route && layer.route.path != null) {
      const paths = Array.isArray(layer.route.path) ? layer.route.path : [layer.route.path];
      for (const p of paths) addRow(table, layer.route.methods, joinPrefix(prefix, p), base);
      continue;
    }

    // 2) Sub-router montado
    const isSub = layer.name === "router" && layer.handle && Array.isArray(layer.handle.stack);
    if (isSub) {
      const mount = getMount(layer); // "/libros", "/autores", ...
      const nextPrefix = normalizePath(`${prefix}${mount}`);
      walk(layer.handle.stack, table, nextPrefix === "/" ? "" : nextPrefix, base);
    }
  }
}

export function printRoutes({ app, router, basePath = "" } = {}) {
  try {
    // basePath viene de server.js ya normalizado (ej. "/", "/api", "/....")
    const base = basePath === "/" ? "" : basePath;
    const table = [];

    // 1) Preferir app._router.stack
    let used = "app";
    if (app) {
      if (typeof app.lazyrouter === "function" && !app._router) app.lazyrouter();
      const stack = app?._router?.stack;
      if (Array.isArray(stack)) {
        walk(stack, table, "", base);
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
        walk(stack, table, "", base);
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