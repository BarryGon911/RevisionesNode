import fs from "fs";
import path from "path";

const inputPath = process.argv[2] || "reports/Ecommerce-api-report.json";
const outDir = "reports";
const outPath = path.join(outDir, "Compliance-Postman.md");

if (!fs.existsSync(inputPath)) {
  console.error(`No se encontró el archivo JSON de Newman: ${inputPath}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputPath, "utf8"));

// Helpers
const pad = (n) => String(n).padStart(3, " ");
const now = () => new Date().toISOString().replace("T"," ").replace("Z"," UTC");

let totalRequests = 0;
let totalAssertions = 0;
let failedAssertions = 0;

const failures = [];     // [{name, assertion, error, itemName, folder}]
const perFolder = {};    // folder -> { requests, assertions, failed }

let rubric = {
  categories10: { name: "Categorías >= 10", passed: false },
  products10:   { name: "Productos >= 10", passed: false },
  users10:      { name: "Usuarios >= 10", passed: false }
};

function ensureFolderStat(folder) {
  perFolder[folder] = perFolder[folder] || { requests: 0, assertions: 0, failed: 0 };
  return perFolder[folder];
}

(data.run.executions || []).forEach(exec => {
  const folder = (exec.item && exec.item.name) ? (exec.item.name) : "root";
  const st = ensureFolderStat(folder);
  st.requests++;
  totalRequests++;

  const assertions = (exec.assertions || []);
  st.assertions += assertions.length;
  totalAssertions += assertions.length;

  assertions.forEach(a => {
    const ok = a.error === undefined;
    if (!ok) {
      st.failed++;
      failedAssertions++;
      failures.push({
        itemName: exec.item.name,
        assertion: a.assertion,
        error: a.error && (a.error.message || a.error.test || JSON.stringify(a.error)),
        folder
      });
    }
    else {
      if (a.assertion.includes(">= 10 categorías")) rubric.categories10.passed = true;
      if (a.assertion.includes(">= 10 productos"))  rubric.products10.passed   = true;
      if (a.assertion.includes(">= 10 usuarios"))   rubric.users10.passed      = true;
    }
  });
});

const passCount = totalAssertions - failedAssertions;

// Se crea el documento Markdown
let md = "";
md += `# Compliance-Postman\\n\\n`;
md += `Fecha: ${now()}\\n\\n`;
md += `## Resumen\\n`;
md += `- Requests totales: **${totalRequests}**\\n`;
md += `- Aserciones: **${totalAssertions}**\\n`;
md += `- Pasadas: **${passCount}**\\n`;
md += `- Falladas: **${failedAssertions}**\\n\\n`;

md += `## Por carpeta\\n`;
Object.entries(perFolder).forEach(([folder, st]) => {
  md += `- **${folder}** — requests: ${st.requests}, aserciones: ${st.assertions}, fallidas: ${st.failed}\\n`;
});
md += `\\n`;

md += `## Rúbrica (mínimos 10)\\n`;
md += `- Categorías ≥ 10: **${rubric.categories10.passed ? "OK" : "FALTA"}**\\n`;
md += `- Productos ≥ 10: **${rubric.products10.passed ? "OK" : "FALTA"}**\\n`;
md += `- Usuarios ≥ 10: **${rubric.users10.passed ? "OK" : "FALTA"}**\\n\\n`;

if (failures.length) {
  md += `## Fallos detallados (${failures.length})\\n`;
  failures.forEach((f, i) => {
    md += `### ${i+1}. ${f.itemName}\\n`;
    md += `- Carpeta: ${f.folder}\\n`;
    md += `- Aserción: \`${f.assertion}\`\\n`;
    md += `- Error: ${f.error}\\n\\n`;
  });
} else {
  md += `## Fallos detallados\\n`;
  md += `No hubo aserciones fallidas.\\n\\n`;
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, md, "utf8");

console.log("Documento Compliance generado:", outPath);