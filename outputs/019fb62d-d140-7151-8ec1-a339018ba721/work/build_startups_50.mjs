import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const baseDir = "E:\\my portfolio\\Josue_Luviano\\outputs\\019fb62d-d140-7151-8ec1-a339018ba721";
const dataPath = path.join(baseDir, "startup_research_50.json");
const outputPath = path.join(baseDir, "usa_startups_50_seo_product_jobs.xlsx");
const rows = JSON.parse(await fs.readFile(dataPath, "utf8"));

if (rows.length !== 50) {
  throw new Error(`Expected 50 researched companies, received ${rows.length}`);
}

const workbook = Workbook.create();
const dashboard = workbook.worksheets.add("Dashboard");
const opportunities = workbook.worksheets.add("Opportunities");
const sources = workbook.worksheets.add("Sources");

for (const sheet of [dashboard, opportunities, sources]) {
  sheet.showGridLines = false;
}

const navy = "#173F5F";
const blue = "#20639B";
const paleBlue = "#EAF2F8";
const text = "#304B5F";
const line = "#B8C9D6";
const green = "#177245";
const amber = "#A66500";
const red = "#A12B2B";

function titleBand(sheet, address, title, subtitleAddress, subtitle) {
  sheet.mergeCells(address);
  const titleCell = address.split(":")[0];
  sheet.getRange(titleCell).values = [[title]];
  sheet.getRange(address).format = {
    fill: navy,
    font: { bold: true, color: "#FFFFFF", size: 20 },
    verticalAlignment: "center",
  };
  sheet.getRange(address).format.rowHeight = 36;

  sheet.mergeCells(subtitleAddress);
  const subtitleCell = subtitleAddress.split(":")[0];
  sheet.getRange(subtitleCell).values = [[subtitle]];
  sheet.getRange(subtitleAddress).format = {
    fill: paleBlue,
    font: { color: text, italic: true, size: 10 },
    wrapText: true,
    verticalAlignment: "center",
  };
  sheet.getRange(subtitleAddress).format.rowHeight = 30;
}

function applyCard(sheet, labelRange, valueRange, label, formula, valueColor = navy) {
  sheet.getRange(labelRange).merge();
  sheet.getRange(valueRange).merge();
  sheet.getRange(labelRange.split(":")[0]).values = [[label]];
  sheet.getRange(valueRange.split(":")[0]).formulas = [[formula]];
  sheet.getRange(`${labelRange.split(":")[0]}:${valueRange.split(":")[1]}`).format = {
    fill: "#F7FAFC",
    borders: { preset: "outside", style: "thin", color: line },
  };
  sheet.getRange(labelRange).format = {
    fill: "#F7FAFC",
    font: { bold: true, color: "#5D7485", size: 9 },
    verticalAlignment: "center",
  };
  sheet.getRange(valueRange).format = {
    fill: "#F7FAFC",
    font: { bold: true, color: valueColor, size: 18 },
    verticalAlignment: "center",
  };
}

// Dashboard.
titleBand(
  dashboard,
  "A1:H1",
  "50 Small U.S. Startup Job Opportunities",
  "A2:H2",
  "SEO, growth, marketing, and product-management outreach list. All companies report fewer than 10 team members and current job openings."
);

applyCard(dashboard, "A4:B4", "A5:B5", "COMPANIES", "=COUNTA('Opportunities'!B9:B58)");
applyCard(dashboard, "D4:E4", "D5:E5", "DIRECT MATCHES", "=COUNTIF('Opportunities'!H9:H58,\"Direct match\")", green);
applyCard(dashboard, "G4:H4", "G5:H5", "TOTAL OPEN JOBS", "=SUM('Opportunities'!G9:G58)");
applyCard(dashboard, "A7:B7", "A8:B8", "ADJACENT MATCHES", "=COUNTIF('Opportunities'!H9:H58,\"Adjacent match\")", amber);
applyCard(dashboard, "D7:E7", "D8:E8", "AVG. TEAM SIZE", "=AVERAGE('Opportunities'!C9:C58)");
applyCard(dashboard, "G7:H7", "G8:H8", "HIRING NOW", "=COUNTIF('Opportunities'!F9:F58,\"Yes\")", green);
dashboard.getRange("D8").format.numberFormat = "0.0";

dashboard.getRange("A11:C11").merge();
dashboard.getRange("A11").values = [["Category Breakdown"]];
dashboard.getRange("A11:C11").format = {
  fill: navy,
  font: { bold: true, color: "#FFFFFF" },
};
dashboard.getRange("A12:B15").values = [
  ["Category", "Companies"],
  ["Web", null],
  ["Software", null],
  ["AI", null],
];
dashboard.getRange("B13").formulas = [["=COUNTIF('Opportunities'!A9:A58,A13)"]];
dashboard.getRange("B13:B15").fillDown();
dashboard.getRange("A12:B12").format = {
  fill: "#DCE8F1",
  font: { bold: true, color: navy },
  borders: { preset: "inside", style: "thin", color: line },
};
dashboard.getRange("A13:B15").format.borders = {
  insideHorizontal: { style: "thin", color: "#D7E1E8" },
  bottom: { style: "thin", color: line },
};
dashboard.getRange("B12:B15").format.horizontalAlignment = "center";

dashboard.getRange("E11:H11").merge();
dashboard.getRange("E11").values = [["Candidate-Fit Key"]];
dashboard.getRange("E11:H11").format = {
  fill: navy,
  font: { bold: true, color: "#FFFFFF" },
};
dashboard.getRange("F12:H12").merge();
dashboard.getRange("F13:H13").merge();
dashboard.getRange("F14:H14").merge();
dashboard.getRange("E12:E14").values = [
  ["Direct match"],
  ["Adjacent match"],
  ["No direct match"],
];
dashboard.getRange("F12").values = [["A current SEO, marketing, growth, content, or product-management role is listed."]];
dashboard.getRange("F13").values = [["A related product, design, GTM, customer success, sales, or operations role is listed."]];
dashboard.getRange("F14").values = [["The startup is hiring, but no direct SEO/product role was found."]];
dashboard.getRange("E12:E14").format.font = { bold: true, color: navy };
dashboard.getRange("E12:H14").format = {
  wrapText: true,
  verticalAlignment: "center",
  borders: { preset: "outside", style: "thin", color: line },
};
dashboard.getRange("E12:H14").format.rowHeight = 44;
dashboard.getRange("E12:E12").format.fill = "#DDF3E7";
dashboard.getRange("E13:E13").format.fill = "#FFF0D8";
dashboard.getRange("E14:E14").format.fill = "#F9DDDD";

dashboard.getRange("A18:H18").merge();
dashboard.getRange("A18").values = [["How to Use This List"]];
dashboard.getRange("A18:H18").format = {
  fill: navy,
  font: { bold: true, color: "#FFFFFF" },
};
dashboard.getRange("A19:H22").merge();
dashboard.getRange("A19").values = [[
  "Filter the Opportunities sheet by Candidate Fit and Category. For direct matches, open the role link first and apply through the official listing. The public contact is a founder or company LinkedIn route because teams under 10 often do not publish dedicated SEO or product leaders. Personal emails are not inferred. Hiring changes quickly, so verify the dated job page before applying."
]];
dashboard.getRange("A19:H22").format = {
  fill: "#F7FAFC",
  font: { color: text, size: 10 },
  wrapText: true,
  verticalAlignment: "center",
  borders: { preset: "outside", style: "thin", color: line },
};

for (const [col, width] of Object.entries({ A: 18, B: 14, C: 3, D: 18, E: 18, F: 4, G: 18, H: 26 })) {
  dashboard.getRange(`${col}:${col}`).format.columnWidth = width;
}
dashboard.freezePanes.freezeRows(2);

// Opportunities sheet.
titleBand(
  opportunities,
  "A1:R1",
  "Startup Opportunities — SEO & Product Candidates",
  "A2:R2",
  "Public business-contact routes and current YC job listings, verified July 30, 2026. Candidate fit is based on listed role titles, not a hiring guarantee."
);

opportunities.getRange("A4:R6").merge();
opportunities.getRange("A4").values = [[
  "Selection criteria: Active startup; U.S. location; reported team size 1–9; public YC job listing available; primary category assigned as Web, Software, or AI. “Public Contact” is a founder/product decision-maker or company recruiting route shown publicly on YC."
]];
opportunities.getRange("A4:R6").format = {
  fill: "#F7FAFC",
  font: { color: text, size: 10 },
  wrapText: true,
  verticalAlignment: "center",
  borders: { preset: "outside", style: "thin", color: line },
};

const opportunityHeaders = [[
  "Category",
  "Company",
  "Team Size",
  "USA Location",
  "What It Does",
  "Hiring Now?",
  "Open Jobs",
  "Candidate Fit",
  "Candidate Opportunity",
  "Relevant Open Role(s)",
  "Contact Target",
  "Public Contact",
  "Contact Title",
  "Public Contact Link",
  "Apply / Role Link",
  "Website",
  "YC Jobs Page",
  "Checked On",
]];
opportunities.getRange("A8:R8").values = opportunityHeaders;

const opportunityValues = rows.map((row) => [
  row.category,
  row.company,
  row.teamSize,
  row.location,
  row.oneLiner,
  row.hiringNow,
  row.openJobsCount,
  row.candidateFit,
  null,
  row.relevantOpenRoles,
  row.contactTarget,
  row.publicContactName,
  row.publicContactTitle,
  row.publicContactLink,
  row.primaryRoleUrl,
  row.website,
  row.jobsUrl,
  new Date(`${row.checkedOn}T00:00:00`),
]);
opportunities.getRange("A9:R58").values = opportunityValues;
opportunities.getRange("I9").formulas = [[
  "=IF(H9=\"Direct match\",\"YES — aligned role\",IF(H9=\"Adjacent match\",\"MAYBE — adjacent role\",\"LIMITED — no direct SEO/PM role\"))"
]];
opportunities.getRange("I9:I58").fillDown();

const opportunityTable = opportunities.tables.add("A8:R58", true, "StartupOpportunitiesTable");
opportunityTable.style = "TableStyleMedium2";
opportunityTable.showBandedRows = true;
opportunityTable.showFilterButton = true;

opportunities.getRange("A8:R8").format = {
  fill: blue,
  font: { bold: true, color: "#FFFFFF", size: 9 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
};
opportunities.getRange("A8:R8").format.rowHeight = 34;
opportunities.getRange("A9:R58").format.verticalAlignment = "center";
opportunities.getRange("A9:R58").format.rowHeight = 46;
opportunities.getRange("D9:E58").format.wrapText = true;
opportunities.getRange("I9:Q58").format.wrapText = true;
opportunities.getRange("C9:C58").format.numberFormat = "0";
opportunities.getRange("G9:G58").format.numberFormat = "0";
opportunities.getRange("R9:R58").format.numberFormat = "yyyy-mm-dd";
opportunities.getRange("C9:C58").format.horizontalAlignment = "center";
opportunities.getRange("F9:I58").format.horizontalAlignment = "center";
opportunities.getRange("R9:R58").format.horizontalAlignment = "center";
opportunities.getRange("B9:B58").format.font = { bold: true, color: navy };

opportunities.getRange("A9:A58").conditionalFormats.add("containsText", {
  text: "Web",
  format: { fill: "#DCEEFF", font: { bold: true, color: "#155E91" } },
});
opportunities.getRange("A9:A58").conditionalFormats.add("containsText", {
  text: "Software",
  format: { fill: "#ECE4FA", font: { bold: true, color: "#6542A6" } },
});
opportunities.getRange("A9:A58").conditionalFormats.add("containsText", {
  text: "AI",
  format: { fill: "#FFF0D8", font: { bold: true, color: "#A75B00" } },
});
opportunities.getRange("F9:F58").conditionalFormats.add("containsText", {
  text: "Yes",
  format: { fill: "#DDF3E7", font: { bold: true, color: green } },
});
opportunities.getRange("H9:H58").conditionalFormats.add("containsText", {
  text: "Direct match",
  format: { fill: "#DDF3E7", font: { bold: true, color: green } },
});
opportunities.getRange("H9:H58").conditionalFormats.add("containsText", {
  text: "Adjacent match",
  format: { fill: "#FFF0D8", font: { bold: true, color: amber } },
});
opportunities.getRange("H9:H58").conditionalFormats.add("containsText", {
  text: "No direct SEO/PM match",
  format: { fill: "#F9DDDD", font: { bold: true, color: red } },
});

opportunities.getRange("H9:H58").dataValidation = {
  rule: {
    type: "list",
    values: ["Direct match", "Adjacent match", "No direct SEO/PM match"],
  },
};

const opportunityWidths = {
  A: 12, B: 20, C: 10, D: 24, E: 42, F: 12, G: 10, H: 20, I: 25,
  J: 46, K: 33, L: 22, M: 20, N: 42, O: 52, P: 34, Q: 50, R: 14,
};
for (const [col, width] of Object.entries(opportunityWidths)) {
  opportunities.getRange(`${col}:${col}`).format.columnWidth = width;
}
opportunities.freezePanes.freezeRows(8);
opportunities.freezePanes.freezeColumns(2);

// Sources sheet.
titleBand(
  sources,
  "A1:H1",
  "Sources & Verification",
  "A2:H2",
  "Each company row includes the daily company-data endpoint, official YC company profile, current jobs page, and public company LinkedIn where available."
);

const sourceHeaders = [[
  "Company",
  "Category",
  "Company Data API",
  "YC Company Profile",
  "YC Jobs Page",
  "Company LinkedIn",
  "Verified On",
  "Source Note",
]];
sources.getRange("A5:H5").values = sourceHeaders;
sources.getRange("A6:H55").values = rows.map((row) => [
  row.company,
  row.category,
  row.sourceApi,
  row.ycProfile,
  row.jobsUrl,
  row.companyLinkedIn || "Not publicly listed",
  new Date(`${row.checkedOn}T00:00:00`),
  `YC company data: Active, U.S.-based, Team Size ${row.teamSize}, hiring. YC jobs page: ${row.openJobsCount} current listing(s).`,
]);

const sourceTable = sources.tables.add("A5:H55", true, "StartupSourcesTable");
sourceTable.style = "TableStyleMedium2";
sourceTable.showBandedRows = true;
sourceTable.showFilterButton = true;
sources.getRange("A5:H5").format = {
  fill: blue,
  font: { bold: true, color: "#FFFFFF", size: 9 },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
};
sources.getRange("A5:H5").format.rowHeight = 32;
sources.getRange("A6:H55").format.verticalAlignment = "center";
sources.getRange("A6:H55").format.rowHeight = 42;
sources.getRange("A6:A55").format.font = { bold: true, color: navy };
sources.getRange("C6:F55").format.wrapText = true;
sources.getRange("H6:H55").format.wrapText = true;
sources.getRange("G6:G55").format.numberFormat = "yyyy-mm-dd";
sources.getRange("G6:G55").format.horizontalAlignment = "center";
for (const [col, width] of Object.entries({ A: 22, B: 14, C: 54, D: 48, E: 52, F: 44, G: 14, H: 54 })) {
  sources.getRange(`${col}:${col}`).format.columnWidth = width;
}
sources.freezePanes.freezeRows(5);

// Compact data and formula verification.
const dashboardCheck = await workbook.inspect({
  kind: "table",
  range: "Dashboard!A1:H22",
  include: "values,formulas",
  tableMaxRows: 24,
  tableMaxCols: 9,
  maxChars: 7000,
});
console.log("DASHBOARD_CHECK");
console.log(dashboardCheck.ndjson);

const topRowsCheck = await workbook.inspect({
  kind: "table",
  range: "Opportunities!A8:R15",
  include: "values,formulas",
  tableMaxRows: 10,
  tableMaxCols: 19,
  maxChars: 9000,
});
console.log("TOP_ROWS_CHECK");
console.log(topRowsCheck.ndjson);

const bottomRowsCheck = await workbook.inspect({
  kind: "table",
  range: "Opportunities!A51:R58",
  include: "values,formulas",
  tableMaxRows: 10,
  tableMaxCols: 19,
  maxChars: 9000,
});
console.log("BOTTOM_ROWS_CHECK");
console.log(bottomRowsCheck.ndjson);

const errorScan = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 200 },
  summary: "final formula error scan",
});
console.log("ERROR_SCAN");
console.log(errorScan.ndjson);

// Render every sheet. Wide sheets are rendered in readable sections.
const renderSpecs = [
  ["Dashboard", "A1:H22", "dashboard_preview.png"],
  ["Opportunities", "A1:I32", "opportunities_left_top.png"],
  ["Opportunities", "J1:R32", "opportunities_right_top.png"],
  ["Opportunities", "A33:I58", "opportunities_left_bottom.png"],
  ["Opportunities", "J33:R58", "opportunities_right_bottom.png"],
  ["Sources", "A1:D30", "sources_left_top.png"],
  ["Sources", "E1:H30", "sources_right_top.png"],
  ["Sources", "A31:D55", "sources_left_bottom.png"],
  ["Sources", "E31:H55", "sources_right_bottom.png"],
];

for (const [sheetName, range, filename] of renderSpecs) {
  const preview = await workbook.render({
    sheetName,
    range,
    scale: 1.1,
    format: "png",
  });
  await fs.writeFile(path.join(baseDir, filename), new Uint8Array(await preview.arrayBuffer()));
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

console.log(`OUTPUT=${outputPath}`);
