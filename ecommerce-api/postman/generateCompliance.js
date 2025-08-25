import fs from 'fs';
import path from 'path';

const inputPath = process.argv[2] || 'reports/Ecommerce-api-report.json';
const outDir = 'reports';
const outPath = path.join(outDir, 'Compliance-Postman.md');

if (!fs.existsSync(inputPath)) {
  console.error(`❌ No se encontró el JSON de Newman: ${inputPath}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

let totalRequests = 0, totalAssertions = 0, failedAssertions = 0;
const failures = [];
const perFolder = {};
const rubric = {
  categories10: { name: 'Categorías >= 10', passed: false },
  products10:   { name: 'Productos >= 10', passed: false },
  users10:      { name: 'Usuarios >= 10', passed: false }
};
function folderStat(f){ return (perFolder[f] ||= {requests:0, assertions:0, failed:0}); }

(data.run.executions || []).forEach(exec => {
  const folder = (exec.item && exec.item.name) ? exec.item.name : 'root';
  const st = folderStat(folder); st.requests++; totalRequests++;
  const assertions = (exec.assertions || []); st.assertions += assertions.length; totalAssertions += assertions.length;
  assertions.forEach(a => {
    const ok = a.error === undefined;
    if (!ok) { st.failed++; failedAssertions++; failures.push({ itemName: exec.item.name, assertion: a.assertion, error: a.error && (a.error.message || a.error.test || JSON.stringify(a.error)), folder }); }
    else {
      if (a.assertion.includes('>= 10 categorías')) rubric.categories10.passed = true;
      if (a.assertion.includes('>= 10 productos'))  rubric.products10.passed   = true;
      if (a.assertion.includes('>= 10 usuarios'))   rubric.users10.passed      = true;
    }
  });
});

const passCount = totalAssertions - failedAssertions;
let md = '';
md += `# Compliance-Postman\n\n`;
md += `## Resumen\n- Requests totales: **${totalRequests}**\n- Aserciones: **${totalAssertions}**\n- Pasadas: **${passCount}**\n- Falladas: **${failedAssertions}**\n\n`;
md += `## Por carpeta\n`;
Object.entries(perFolder).forEach(([folder, st]) => { md += `- **${folder}** — requests: ${st.requests}, aserciones: ${st.assertions}, fallidas: ${st.failed}\n`; });
md += `\n## Rúbrica (mínimos 10)\n- Categorías ≥ 10: **${rubric.categories10.passed ? 'OK' : 'FALTA'}**\n- Productos ≥ 10: **${rubric.products10.passed ? 'OK' : 'FALTA'}**\n- Usuarios ≥ 10: **${rubric.users10.passed ? 'OK' : 'FALTA'}**\n\n`;
if (failures.length) {
  md += `## Fallos detallados (${failures.length})\n`;
  failures.forEach((f, i) => { md += `### ${i+1}. ${f.itemName}\n- Carpeta: ${f.folder}\n- Aserción: \`${f.assertion}\`\n- Error: ${f.error}\n\n`; });
} else {
  md += `## Fallos detallados\nNo hubo aserciones fallidas. ✅\n\n`;
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, md, 'utf8');
console.log('✅ Compliance generado:', outPath);