async function fetchJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url} -> ${r.status}`);
  return r.json();
}
async function fetchText(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url} -> ${r.status}`);
  return r.text();
}
function setBadge(el, ok) {
  el.textContent = ok ? 'OK' : 'FALTA';
  el.className = 'badge ' + (ok ? 'ok' : 'fail');
}

async function load() {
  const status = document.getElementById('status');
  status.textContent = 'Cargando…';
  try {
    const report = await fetchJSON('/api/test-reports/report');
    const run = report.run || {};
    const execs = run.executions || [];
    const assertionsTotal = execs.reduce((acc, e) => acc + (e.assertions?.length || 0), 0);
    const failed = execs.reduce((acc, e) => acc + (e.assertions || []).filter(a => a.error !== undefined).length, 0);
    const passed = assertionsTotal - failed;
    const requests = execs.length;

    // Resumen
    document.getElementById('requests').textContent = requests;
    document.getElementById('assertions').textContent = assertionsTotal;
    document.getElementById('passed').textContent = passed;
    document.getElementById('failed').textContent = failed;

    // Rúbrica (busca nombres de aserción del runner)
    let rubCat = false, rubProd = false, rubUser = false;
    execs.forEach(e => (e.assertions || []).forEach(a => {
      if (a.error === undefined) {
        if (a.assertion.includes('>= 10 categorías')) rubCat = true;
        if (a.assertion.includes('>= 10 productos'))  rubProd = true;
        if (a.assertion.includes('>= 10 usuarios'))   rubUser = true;
      }
    }));
    setBadge(document.getElementById('rubCat'), rubCat);
    setBadge(document.getElementById('rubProd'), rubProd);
    setBadge(document.getElementById('rubUser'), rubUser);

    // Fallos detallados
    const fails = [];
    execs.forEach(e => (e.assertions || []).forEach(a => {
      if (a.error) {
        fails.push({
          item: e.item?.name || '(sin nombre)',
          assertion: a.assertion,
          error: a.error.message || a.error.test || JSON.stringify(a.error)
        });
      }
    }));
    document.getElementById('failures').innerHTML = fails.length
      ? `<ol>${fails.map(f => `<li><strong>${f.item}</strong><br><code>${f.assertion}</code><br>${f.error}</li>`).join('')}</ol>`
      : 'No hubo aserciones fallidas. ✅';

    // Compliance MD (si existe)
    try {
      const md = await fetchText('/api/test-reports/reports/Compliance-Postman.md');
      document.getElementById('compliance').innerHTML = marked.parse(md);
    } catch {
      document.getElementById('compliance').textContent = 'Aún no existe Compliance-Postman.md (corre los tests).';
    }

    const completed = run.timings?.completed ? new Date(run.timings.completed) : new Date();
    document.getElementById('updated').textContent = completed.toLocaleString();
    status.textContent = 'OK';
  } catch {
    document.getElementById('status').textContent = 'Sin reportes. Ejecuta los tests.';
  }
}

async function runTests() {
  const btn = document.getElementById('runBtn');
  const status = document.getElementById('status');
  btn.disabled = true;
  status.textContent = 'Ejecutando tests…';
  try {
    const r = await fetch('/api/test-reports/run', { method: 'POST' });
    const json = await r.json();
    status.textContent = json.ok ? 'Tests OK. Recargando…' : 'Tests con errores. Igual recargo…';
    setTimeout(load, 1200);
  } catch {
    status.textContent = 'No se pudo ejecutar tests (revisa servidor).';
  } finally {
    btn.disabled = false;
  }
}

document.getElementById('runBtn').addEventListener('click', runTests);
document.getElementById('refreshBtn').addEventListener('click', load);
load();