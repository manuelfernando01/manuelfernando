import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const baseDir = "E:\\my portfolio\\Josue_Luviano\\outputs\\019fb62d-d140-7151-8ec1-a339018ba721";
const outputPath = path.join(baseDir, "usa_startups_under_10_employees.xlsx");
const previewListPath = path.join(baseDir, "startup_list_preview.png");
const previewSourcesPath = path.join(baseDir, "sources_preview.png");

await fs.mkdir(baseDir, { recursive: true });

const workbook = Workbook.create();
const listSheet = workbook.worksheets.add("Startup List");
const sourceSheet = workbook.worksheets.add("Sources & Notes");

listSheet.showGridLines = false;
sourceSheet.showGridLines = false;

// Main sheet: title and scope.
listSheet.mergeCells("A1:I1");
listSheet.getRange("A1").values = [["USA Startups with Fewer Than 10 Employees"]];
listSheet.getRange("A1:I1").format = {
  fill: "#173F5F",
  font: { bold: true, color: "#FFFFFF", size: 20 },
  verticalAlignment: "center",
};
listSheet.getRange("A1:I1").format.rowHeight = 36;

listSheet.mergeCells("A2:I2");
listSheet.getRange("A2").values = [[
  "Five active U.S. startups, grouped by primary category. Employee count uses the reported Y Combinator team size."
]];
listSheet.getRange("A2:I2").format = {
  fill: "#EAF2F8",
  font: { color: "#304B5F", italic: true, size: 10 },
  verticalAlignment: "center",
  wrapText: true,
};
listSheet.getRange("A2:I2").format.rowHeight = 30;

// Summary cards.
listSheet.getRange("A4:B4").values = [["COMPANIES", null]];
listSheet.getRange("D4:E4").values = [["AVERAGE TEAM SIZE", null]];
listSheet.getRange("G4:H4").values = [["ALL UNDER 10", null]];
listSheet.getRange("A5:B5").merge();
listSheet.getRange("D5:E5").merge();
listSheet.getRange("G5:H5").merge();
listSheet.getRange("A5").formulas = [["=COUNTA(B9:B13)"]];
listSheet.getRange("D5").formulas = [["=AVERAGE(D9:D13)"]];
listSheet.getRange("G5").formulas = [["=IF(COUNTIF(E9:E13,\"Yes\")=COUNTA(B9:B13),\"Yes\",\"Check\")"]];

for (const rangeAddress of ["A4:B5", "D4:E5", "G4:H5"]) {
  const range = listSheet.getRange(rangeAddress);
  range.format = {
    fill: "#F7FAFC",
    font: { color: "#173F5F" },
    borders: { preset: "outside", style: "thin", color: "#B8C9D6" },
  };
}
listSheet.getRange("A4:B4").format.font = { bold: true, color: "#5D7485", size: 9 };
listSheet.getRange("D4:E4").format.font = { bold: true, color: "#5D7485", size: 9 };
listSheet.getRange("G4:H4").format.font = { bold: true, color: "#5D7485", size: 9 };
listSheet.getRange("A5:H5").format.verticalAlignment = "center";
listSheet.getRange("A5").format.font = { bold: true, color: "#173F5F", size: 18 };
listSheet.getRange("D5").format.font = { bold: true, color: "#173F5F", size: 18 };
listSheet.getRange("G5").format.font = { bold: true, color: "#17824B", size: 18 };
listSheet.getRange("D5").format.numberFormat = "0.0";
listSheet.getRange("A5:H5").format.rowHeight = 28;

const startupRows = [
  ["Web", "BrowserOS", 2024, 4, null, "San Francisco, CA", "Open-source, privacy-first browser that runs AI agents locally.", "https://browseros.com/", "Active"],
  ["Web", "Streamable", 2024, 4, null, "San Francisco, CA", "Cloud-hosted streaming servers that keep IRL livestreams online through poor connections.", "https://streamable.run", "Active"],
  ["Software", "Complete", 2021, 5, null, "San Francisco, CA", "B2B compensation software with interactive offer letters.", "https://complete.so", "Active"],
  ["Software", "Paradigm", 2024, 8, null, "San Francisco, CA", "AI-native spreadsheet workspace for structured-data workflows and agent orchestration.", "https://www.paradigmai.com/", "Active"],
  ["AI", "Fenrock AI", 2026, 2, null, "San Francisco, CA", "Specialized AI agents that automate back-office work for banks.", "https://fenrock.ai/", "Active"],
];

const headers = [["Category", "Company", "Founded", "Team Size", "Under 10?", "USA Location", "What It Does", "Website", "Status"]];
listSheet.getRange("A8:I8").values = headers;
listSheet.getRange("A9:I13").values = startupRows;
listSheet.getRange("E9").formulas = [["=IF(D9<10,\"Yes\",\"No\")"]];
listSheet.getRange("E9:E13").fillDown();

const startupTable = listSheet.tables.add("A8:I13", true, "USAStartupsTable");
startupTable.style = "TableStyleMedium2";
startupTable.showBandedRows = true;
startupTable.showFilterButton = true;

listSheet.getRange("A8:I8").format = {
  fill: "#20639B",
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
  borders: { preset: "inside", style: "thin", color: "#6FA3C8" },
};
listSheet.getRange("A8:I8").format.rowHeight = 28;
listSheet.getRange("A9:I13").format.verticalAlignment = "center";
listSheet.getRange("A9:B13").format.font = { color: "#173F5F" };
listSheet.getRange("B9:B13").format.font = { bold: true, color: "#173F5F" };
listSheet.getRange("C9:E13").format.horizontalAlignment = "center";
listSheet.getRange("I9:I13").format.horizontalAlignment = "center";
listSheet.getRange("G9:G13").format.wrapText = true;
listSheet.getRange("H9:H13").format.wrapText = true;
listSheet.getRange("A9:I13").format.rowHeight = 44;
listSheet.getRange("C9:D13").format.numberFormat = "0";

listSheet.getRange("A9:A13").conditionalFormats.add("containsText", {
  text: "Web",
  format: { fill: "#DCEEFF", font: { bold: true, color: "#155E91" } },
});
listSheet.getRange("A9:A13").conditionalFormats.add("containsText", {
  text: "Software",
  format: { fill: "#ECE4FA", font: { bold: true, color: "#6542A6" } },
});
listSheet.getRange("A9:A13").conditionalFormats.add("containsText", {
  text: "AI",
  format: { fill: "#FFF0D8", font: { bold: true, color: "#A75B00" } },
});
listSheet.getRange("E9:E13").conditionalFormats.add("containsText", {
  text: "Yes",
  format: { fill: "#DDF3E7", font: { bold: true, color: "#177245" } },
});

// Category summary, formula-driven from the editable table.
listSheet.getRange("A16:C16").values = [["Category Summary", null, null]];
listSheet.mergeCells("A16:C16");
listSheet.getRange("A16:C16").format = {
  fill: "#173F5F",
  font: { bold: true, color: "#FFFFFF" },
  verticalAlignment: "center",
};
listSheet.getRange("A17:B20").values = [
  ["Category", "Count"],
  ["Web", null],
  ["Software", null],
  ["AI", null],
];
listSheet.getRange("B18").formulas = [["=COUNTIF($A$9:$A$13,A18)"]];
listSheet.getRange("B18:B20").fillDown();
listSheet.getRange("A17:B17").format = {
  fill: "#DCE8F1",
  font: { bold: true, color: "#173F5F" },
  borders: { preset: "inside", style: "thin", color: "#B8C9D6" },
};
listSheet.getRange("A18:B20").format.borders = {
  insideHorizontal: { style: "thin", color: "#D7E1E8" },
  bottom: { style: "thin", color: "#B8C9D6" },
};
listSheet.getRange("B17:B20").format.horizontalAlignment = "center";
listSheet.getRange("B18:B20").format.numberFormat = "0";

listSheet.mergeCells("D16:I16");
listSheet.getRange("D16").values = [["Selection Note"]];
listSheet.getRange("D16:I16").format = {
  fill: "#173F5F",
  font: { bold: true, color: "#FFFFFF" },
  verticalAlignment: "center",
};
listSheet.mergeCells("D17:I20");
listSheet.getRange("D17").values = [[
  "Categories are organizational labels based on each company’s primary product. Some startups overlap categories. Team sizes can change quickly; use the dated source sheet before outreach or analysis."
]];
listSheet.getRange("D17:I20").format = {
  fill: "#F7FAFC",
  font: { color: "#415A6B", size: 10 },
  wrapText: true,
  verticalAlignment: "center",
  borders: { preset: "outside", style: "thin", color: "#B8C9D6" },
};

// Column widths sized for readability.
const widths = {
  A: 13, B: 18, C: 10, D: 11, E: 12, F: 21, G: 49, H: 30, I: 11,
};
for (const [column, width] of Object.entries(widths)) {
  listSheet.getRange(`${column}:${column}`).format.columnWidth = width;
}
listSheet.freezePanes.freezeRows(8);

// Sources sheet.
sourceSheet.mergeCells("A1:F1");
sourceSheet.getRange("A1").values = [["Sources & Verification Notes"]];
sourceSheet.getRange("A1:F1").format = {
  fill: "#173F5F",
  font: { bold: true, color: "#FFFFFF", size: 18 },
  verticalAlignment: "center",
};
sourceSheet.getRange("A1:F1").format.rowHeight = 34;

sourceSheet.mergeCells("A2:F2");
sourceSheet.getRange("A2").values = [[
  "Verified July 30, 2026. Each source profile reports the company as Active, its exact team size, and San Francisco location."
]];
sourceSheet.getRange("A2:F2").format = {
  fill: "#EAF2F8",
  font: { color: "#304B5F", italic: true, size: 10 },
  wrapText: true,
  verticalAlignment: "center",
};
sourceSheet.getRange("A2:F2").format.rowHeight = 28;

sourceSheet.getRange("A5:F5").values = [[
  "Company", "Primary Category", "Reported Team Size", "Source URL", "Verified On", "Verification / Category Note"
]];
sourceSheet.getRange("A6:F10").values = [
  ["BrowserOS", "Web", 4, "https://www.ycombinator.com/companies/browseros", new Date("2026-07-30T00:00:00"), "YC: Active; Team Size 4; San Francisco. Categorized Web because the core product is a browser."],
  ["Streamable", "Web", 4, "https://www.ycombinator.com/companies/streamable", new Date("2026-07-30T00:00:00"), "YC: Active; Team Size 4; San Francisco. Categorized Web because it powers web livestreaming infrastructure."],
  ["Complete", "Software", 5, "https://www.ycombinator.com/companies/complete", new Date("2026-07-30T00:00:00"), "YC: Active; Team Size 5; San Francisco. Categorized Software as B2B HR/compensation SaaS."],
  ["Paradigm", "Software", 8, "https://www.ycombinator.com/companies/paradigm", new Date("2026-07-30T00:00:00"), "YC: Active; Team Size 8; San Francisco. Categorized Software as an AI-native spreadsheet workspace."],
  ["Fenrock AI", "AI", 2, "https://www.ycombinator.com/companies/fenrock-ai", new Date("2026-07-30T00:00:00"), "YC: Active; Team Size 2; San Francisco. Categorized AI because it builds specialized AI agents for banks."],
];
const sourceTable = sourceSheet.tables.add("A5:F10", true, "StartupSourcesTable");
sourceTable.style = "TableStyleMedium2";
sourceTable.showBandedRows = true;
sourceTable.showFilterButton = true;

sourceSheet.getRange("A5:F5").format = {
  fill: "#20639B",
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
};
sourceSheet.getRange("A5:F5").format.rowHeight = 30;
sourceSheet.getRange("A6:F10").format.verticalAlignment = "center";
sourceSheet.getRange("A6:B10").format.font = { color: "#173F5F" };
sourceSheet.getRange("A6:A10").format.font = { bold: true, color: "#173F5F" };
sourceSheet.getRange("C6:C10").format.horizontalAlignment = "center";
sourceSheet.getRange("C6:C10").format.numberFormat = "0";
sourceSheet.getRange("D6:D10").format.wrapText = true;
sourceSheet.getRange("E6:E10").format.numberFormat = "yyyy-mm-dd";
sourceSheet.getRange("E6:E10").format.horizontalAlignment = "center";
sourceSheet.getRange("F6:F10").format.wrapText = true;
sourceSheet.getRange("A6:F10").format.rowHeight = 48;

const sourceWidths = { A: 18, B: 18, C: 18, D: 52, E: 15, F: 60 };
for (const [column, width] of Object.entries(sourceWidths)) {
  sourceSheet.getRange(`${column}:${column}`).format.columnWidth = width;
}
sourceSheet.freezePanes.freezeRows(5);

// Compact verification.
const mainCheck = await workbook.inspect({
  kind: "table",
  range: "Startup List!A4:I20",
  include: "values,formulas",
  tableMaxRows: 20,
  tableMaxCols: 10,
  maxChars: 7000,
});
console.log("MAIN_CHECK");
console.log(mainCheck.ndjson);

const sourceCheck = await workbook.inspect({
  kind: "table",
  range: "Sources & Notes!A5:F10",
  include: "values,formulas",
  tableMaxRows: 10,
  tableMaxCols: 7,
  maxChars: 5000,
});
console.log("SOURCE_CHECK");
console.log(sourceCheck.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log("ERROR_SCAN");
console.log(errors.ndjson);

// Visual pass on every sheet before final export.
const mainPreview = await workbook.render({
  sheetName: "Startup List",
  range: "A1:I20",
  scale: 1.2,
  format: "png",
});
await fs.writeFile(previewListPath, new Uint8Array(await mainPreview.arrayBuffer()));

const sourcesPreview = await workbook.render({
  sheetName: "Sources & Notes",
  range: "A1:F10",
  scale: 1.2,
  format: "png",
});
await fs.writeFile(previewSourcesPath, new Uint8Array(await sourcesPreview.arrayBuffer()));

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

console.log(`OUTPUT=${outputPath}`);
console.log(`PREVIEW_LIST=${previewListPath}`);
console.log(`PREVIEW_SOURCES=${previewSourcesPath}`);
