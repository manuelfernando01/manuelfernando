import fs from "node:fs/promises";

const inputPath = "E:\\my portfolio\\Josue_Luviano\\outputs\\019fb62d-d140-7151-8ec1-a339018ba721\\yc_companies_all.json";
const outputPath = "E:\\my portfolio\\Josue_Luviano\\outputs\\019fb62d-d140-7151-8ec1-a339018ba721\\startup_research_50.json";
const allCompanies = JSON.parse(await fs.readFile(inputPath, "utf8"));

const webPattern = /web development|seo|advertising|content|social media|consumer|video|marketing|browser|website|e-commerce|ecommerce|creator/i;
const aiPattern = /(^|\|)(ai|artificial intelligence|generative ai|ai assistant|aiops)(\||$)/i;
const directRolePattern = /\b(product manager|product lead|head of product|product operations|growth|marketing|seo|content|brand|community)\b/i;
const adjacentRolePattern = /\b(product engineer|design|customer success|solutions|chief of staff|business operations|sales|go-to-market|gtm)\b/i;

function categoryFor(company) {
  const text = [
    ...(company.tags || []),
    company.industry,
    company.subindustry,
    company.one_liner,
  ].filter(Boolean).join("|");
  if (webPattern.test(text)) return "Web";
  if (aiPattern.test((company.tags || []).join("|"))) return "AI";
  return "Software";
}

function candidateScore(company) {
  const text = [
    company.one_liner,
    company.long_description,
    ...(company.tags || []),
    company.industry,
    company.subindustry,
  ].filter(Boolean).join(" ");
  let score = Number(String(company.batch || "").match(/20\d{2}/)?.[0] || 0) * 10;
  if (/seo|marketing|content|growth|brand|website|web|browser|product|design|consumer|video|creator/i.test(text)) score += 250;
  if (/saas|b2b|productivity|developer tools|workflow|analytics|platform/i.test(text)) score += 120;
  if (/san francisco|new york|austin|seattle|boston|los angeles/i.test(company.all_locations || "")) score += 40;
  score += Math.max(0, 10 - Number(company.team_size || 10));
  return score;
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&quot;/g, "\"")
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&amp;/g, "&");
}

async function fetchText(url, timeoutMs = 16000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; StartupResearchWorkbook/1.0)",
        "accept": "text/html,application/xhtml+xml",
      },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

function extractPageData(html) {
  const match = html.match(/data-page="([^"]+)"/);
  if (!match) throw new Error("data-page JSON not found");
  return JSON.parse(decodeHtmlEntities(match[1]));
}

function publicEmailFrom(...texts) {
  const joined = texts.filter(Boolean).join(" ");
  const matches = joined.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi) || [];
  const cleaned = matches.filter((email) => !/example\.com|sentry|amazonaws|cloudfront/i.test(email));
  return cleaned[0] || "";
}

const eligible = allCompanies
  .filter((company) =>
    company.status === "Active" &&
    company.isHiring === true &&
    Number(company.team_size) >= 1 &&
    Number(company.team_size) < 10 &&
    (company.regions || []).includes("United States of America") &&
    /202[4-6]/.test(company.batch || "")
  )
  .map((company) => ({
    ...company,
    selectedCategory: categoryFor(company),
    selectionScore: candidateScore(company),
  }));

const candidatePools = {};
for (const category of ["Web", "Software", "AI"]) {
  candidatePools[category] = eligible
    .filter((company) => company.selectedCategory === category)
    .sort((a, b) => b.selectionScore - a.selectionScore || b.launched_at - a.launched_at)
    .slice(0, 45);
}

const scrapeTargets = Object.values(candidatePools).flat();
const scraped = [];
let cursor = 0;
const workerCount = 8;

async function worker() {
  while (cursor < scrapeTargets.length) {
    const company = scrapeTargets[cursor++];
    const jobsUrl = `${company.url}/jobs`;
    try {
      const html = await fetchText(jobsUrl);
      const page = extractPageData(html);
      const props = page?.props || {};
      const details = props.company || {};
      const jobs = Array.isArray(props.jobPostings) ? props.jobPostings : [];
      const founders = Array.isArray(details.founders) ? details.founders : [];
      const activeFounders = founders.filter((founder) => founder.is_active !== false);
      const contact = activeFounders.find((founder) => founder.linkedin_url) || activeFounders[0] || founders[0] || null;
      const directJobs = jobs.filter((job) => directRolePattern.test(job.title || ""));
      const adjacentJobs = jobs.filter((job) => !directRolePattern.test(job.title || "") && adjacentRolePattern.test(job.title || ""));
      const fit = directJobs.length > 0 ? "Direct match" : adjacentJobs.length > 0 ? "Adjacent match" : "No direct SEO/PM match";
      const displayJobs = directJobs.length > 0
        ? directJobs.slice(0, 3)
        : adjacentJobs.length > 0
          ? adjacentJobs.slice(0, 3)
          : jobs.slice(0, 3);
      const publicEmail = publicEmailFrom(details.hiring_description, details.long_description, company.long_description);
      scraped.push({
        category: company.selectedCategory,
        company: company.name,
        founded: details.year_founded || "",
        batch: company.batch,
        teamSize: Number(company.team_size),
        location: company.all_locations,
        oneLiner: company.one_liner,
        website: company.website,
        ycProfile: company.url,
        jobsUrl,
        hiringNow: jobs.length > 0 ? "Yes" : "No listed jobs",
        openJobsCount: jobs.length,
        candidateFit: fit,
        relevantOpenRoles: displayJobs.map((job) => job.title).join(" | ") || "No current role title listed",
        primaryRoleUrl: displayJobs[0]?.url
          ? `https://www.ycombinator.com${displayJobs[0].url}`
          : jobsUrl,
        contactTarget: company.selectedCategory === "Web"
          ? "Founder / Growth & SEO decision-maker"
          : "Founder / Product decision-maker",
        publicContactName: contact?.full_name || "Company recruiting team",
        publicContactTitle: contact?.title || "Founder",
        publicContactLink: contact?.linkedin_url || details.linkedin_url || jobsUrl,
        publicEmail: publicEmail || "Not publicly listed",
        companyLinkedIn: details.linkedin_url || "",
        sourceApi: company.api || "https://yc-oss.github.io/api/companies/all.json",
        checkedOn: "2026-07-30",
        _selectionScore: company.selectionScore,
        _fitRank: fit === "Direct match" ? 3 : fit === "Adjacent match" ? 2 : 1,
      });
    } catch (error) {
      scraped.push({
        category: company.selectedCategory,
        company: company.name,
        scrapeError: String(error?.message || error),
        _selectionScore: company.selectionScore,
        _fitRank: 0,
      });
    }
  }
}

await Promise.all(Array.from({ length: workerCount }, () => worker()));

const quotas = { Web: 16, Software: 17, AI: 17 };
const selected = [];
for (const category of ["Web", "Software", "AI"]) {
  const categoryRows = scraped
    .filter((row) => row.category === category && !row.scrapeError && row.openJobsCount > 0)
    .sort((a, b) =>
      b._fitRank - a._fitRank ||
      b._selectionScore - a._selectionScore ||
      a.company.localeCompare(b.company)
    )
    .slice(0, quotas[category]);
  if (categoryRows.length < quotas[category]) {
    throw new Error(`Only ${categoryRows.length} usable ${category} companies; need ${quotas[category]}`);
  }
  selected.push(...categoryRows);
}

selected.sort((a, b) =>
  ["Web", "Software", "AI"].indexOf(a.category) - ["Web", "Software", "AI"].indexOf(b.category) ||
  b._fitRank - a._fitRank ||
  a.company.localeCompare(b.company)
);

for (const row of selected) {
  delete row._selectionScore;
  delete row._fitRank;
}

await fs.writeFile(outputPath, JSON.stringify(selected, null, 2), "utf8");

const summary = {
  total: selected.length,
  categories: Object.fromEntries(["Web", "Software", "AI"].map((category) => [
    category,
    selected.filter((row) => row.category === category).length,
  ])),
  candidateFit: Object.fromEntries(["Direct match", "Adjacent match", "No direct SEO/PM match"].map((fit) => [
    fit,
    selected.filter((row) => row.candidateFit === fit).length,
  ])),
  contactsWithPublicEmail: selected.filter((row) => row.publicEmail !== "Not publicly listed").length,
  maxTeamSize: Math.max(...selected.map((row) => row.teamSize)),
};

console.log(JSON.stringify(summary, null, 2));
console.log(`OUTPUT=${outputPath}`);
