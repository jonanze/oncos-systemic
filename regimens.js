/*
 * Chemotherapy Regimen Reference — data file
 * ==========================================================================
 * HOW TO ADD OR EDIT A REGIMEN
 * --------------------------------------------------------------------------
 * 1. Copy the TEMPLATE block below (between the dashed lines).
 * 2. Paste it inside the window.REGIMENS = [ ... ] array, near similar
 *    tumour types. Separate entries with a comma.
 * 3. Fill in the fields. Only `id`, `name`, `tumour`, and `drugs` are
 *    strictly required — everything else is optional and simply hidden if
 *    left out.
 * 4. Save and refresh index.html in the browser. New tumour types create
 *    their own filter chip automatically.
 *
 * FIELD REFERENCE
 *   id            unique slug, lowercase-with-hyphens (must be unique)
 *   name          display name + common shorthand
 *   aliases       [..] alternate names/abbreviations (searchable, not shown)
 *   tumour        [..] tumour type(s) — drives the filter chips
 *   setting       [..] e.g. ["Adjuvant"], ["Metastatic","1st line"]
 *   cycle         cycle length, e.g. "Every 14 days"
 *   cycles        typical number, e.g. "12 cycles", "Until progression"
 *   drugs         [{ drug, dose, route, days, notes? }]
 *   support       { emetogenicity, gcsf, premeds:[..] }
 *   modifications [{ trigger, action }]   dose reductions / holds
 *   doseLevels    [{ level, detail }]      optional stepwise reductions
 *   refs          [{ label, detail?, url? }]
 *   verified      "YYYY-MM-DD" date this entry was last reviewed
 *   notes         string or [..] free text
 *
 * --------------------------------------------------------------------------
 * TEMPLATE (copy me):
 *
 *   {
 *     id: "",
 *     name: "",
 *     aliases: [],
 *     tumour: [""],
 *     setting: [""],
 *     cycle: "",
 *     cycles: "",
 *     drugs: [
 *       { drug: "", dose: "", route: "IV", days: "Day 1", notes: "" }
 *     ],
 *     support: { emetogenicity: "", gcsf: "", premeds: [] },
 *     modifications: [
 *       { trigger: "", action: "" }
 *     ],
 *     doseLevels: [],
 *     refs: [
 *       { label: "", detail: "", url: "" }
 *     ],
 *     verified: "",
 *     notes: ""
 *   },
 *
 * --------------------------------------------------------------------------
 * SAFETY: doses reflect commonly used standard-of-care references and the
 * cited pivotal trials, reviewed on the "verified" date shown. Always confirm
 * against your institutional protocol and current prescribing information
 * before use. Do not rely on this tool as a sole dosing source.
 */

window.REGIMENS = [

/* ===================== THORACIC / LUNG ===================== */
{
  id: "carbo-pem-pembro",
  name: "Carboplatin + Pemetrexed + Pembrolizumab",
  aliases: ["KEYNOTE-189", "pembro pem carbo", "platinum pemetrexed pembrolizumab"],
  tumour: ["Lung — NSCLC (non-squamous)"],
  setting: ["Metastatic", "1st line"],
  cycle: "Every 21 days",
  cycles: "4 cycles induction, then pemetrexed + pembrolizumab maintenance",
  drugs: [
    { drug: "Pembrolizumab", dose: "200 mg flat", route: "IV", days: "Day 1", notes: "Give first; q3w (or 400 mg q6w in maintenance)" },
    { drug: "Pemetrexed", dose: "500 mg/m²", route: "IV", days: "Day 1", notes: "Continue as maintenance" },
    { drug: "Carboplatin", dose: "AUC 5", route: "IV", days: "Day 1", notes: "Induction only (4 cycles). Cisplatin 75 mg/m² an alternative." }
  ],
  support: {
    emetogenicity: "Moderate–high (carboplatin-based)",
    gcsf: "Not routine (primary prophylaxis if high risk)",
    premeds: [
      "Folic acid 400–1000 mcg PO daily (start ≥5–7d before, continue through + 21d after)",
      "Vitamin B12 1000 mcg IM q9wk (start before C1)",
      "Dexamethasone 4 mg PO BID day −1 to +1 (pemetrexed rash prophylaxis)",
      "Antiemetics per moderate–high emetogenic protocol"
    ]
  },
  modifications: [
    { trigger: "Pemetrexed — renal", action: "Do NOT give if CrCl < 45 mL/min." },
    { trigger: "Hematologic (nadir)", action: "Reduce chemo to 75% of prior dose for ANC nadir < 0.5 or platelets < 50." },
    { trigger: "Immune-related AE", action: "Hold/discontinue pembrolizumab + corticosteroids per irAE grade (CTCAE)." }
  ],
  refs: [
    { label: "KEYNOTE-189", detail: "Gandhi L et al. NEJM 2018;378:2078. mOS 22.0 vs 10.7 mo (HR 0.56).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1801005" }
  ],
  verified: "2026-06-24",
  notes: "For metastatic non-squamous NSCLC without EGFR/ALK alterations."
},
{
  id: "carbo-pac-pembro",
  name: "Carboplatin + Paclitaxel (or nab-paclitaxel) + Pembrolizumab",
  aliases: ["KEYNOTE-407", "squamous pembro"],
  tumour: ["Lung — NSCLC (squamous)"],
  setting: ["Metastatic", "1st line"],
  cycle: "Every 21 days",
  cycles: "4 cycles induction, then pembrolizumab maintenance",
  drugs: [
    { drug: "Pembrolizumab", dose: "200 mg flat", route: "IV", days: "Day 1", notes: "q3w (or 400 mg q6w)" },
    { drug: "Carboplatin", dose: "AUC 6", route: "IV", days: "Day 1" },
    { drug: "Paclitaxel", dose: "200 mg/m²", route: "IV", days: "Day 1", notes: "OR nab-paclitaxel 100 mg/m² days 1, 8, 15" }
  ],
  support: {
    emetogenicity: "Moderate",
    gcsf: "Per risk",
    premeds: ["Paclitaxel premed: dexamethasone + H1/H2 blocker", "Antiemetics per moderate emetogenic protocol"]
  },
  modifications: [
    { trigger: "Peripheral neuropathy", action: "Hold paclitaxel for grade ≥2; reduce/discontinue on recovery." },
    { trigger: "Hematologic", action: "Standard taxane/carboplatin reductions for grade 3–4 neutropenia/thrombocytopenia." }
  ],
  refs: [
    { label: "KEYNOTE-407", detail: "Paz-Ares L et al. NEJM 2018;379:2040. mOS 17.1 vs 11.6 mo (HR 0.71).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1810865" }
  ],
  verified: "2026-06-24"
},
{
  id: "cis-pem",
  name: "Cisplatin + Pemetrexed",
  aliases: ["pem cis"],
  tumour: ["Lung — NSCLC (non-squamous)", "Mesothelioma"],
  setting: ["Metastatic", "1st line"],
  cycle: "Every 21 days",
  cycles: "4–6 cycles (± pemetrexed maintenance)",
  drugs: [
    { drug: "Pemetrexed", dose: "500 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Cisplatin", dose: "75 mg/m²", route: "IV", days: "Day 1", notes: "Requires pre/post hydration" }
  ],
  support: {
    emetogenicity: "High (cisplatin)",
    gcsf: "Per risk",
    premeds: ["Folic acid + B12 (as per pemetrexed)", "Dexamethasone for pemetrexed rash", "NK1 + 5-HT3 + dexamethasone (high emetogenic)"]
  },
  modifications: [
    { trigger: "Pemetrexed — renal", action: "Contraindicated if CrCl < 45 mL/min." },
    { trigger: "Cisplatin — renal", action: "Reduce/switch to carboplatin if CrCl declines; ensure hydration + Mg/K repletion." }
  ],
  refs: [
    { label: "Scagliotti GV et al.", detail: "J Clin Oncol 2008;26:3543 (non-squamous benefit).", url: "https://ascopubs.org/doi/10.1200/JCO.2007.15.0375" }
  ],
  verified: "2026-06-24"
},
{
  id: "carbo-etop-atezo",
  name: "Carboplatin + Etoposide + Atezolizumab",
  aliases: ["IMpower133", "EP atezo", "ES-SCLC"],
  tumour: ["Lung — SCLC"],
  setting: ["Extensive-stage", "1st line"],
  cycle: "Every 21 days",
  cycles: "4 cycles induction, then atezolizumab maintenance",
  drugs: [
    { drug: "Atezolizumab", dose: "1200 mg flat", route: "IV", days: "Day 1" },
    { drug: "Carboplatin", dose: "AUC 5", route: "IV", days: "Day 1" },
    { drug: "Etoposide", dose: "100 mg/m²", route: "IV", days: "Days 1–3" }
  ],
  support: {
    emetogenicity: "Moderate–high",
    gcsf: "Per risk (consider primary prophylaxis)",
    premeds: ["Antiemetics per moderate–high protocol"]
  },
  modifications: [
    { trigger: "Hematologic", action: "Dose-reduce carboplatin/etoposide for grade 4 or febrile neutropenia." },
    { trigger: "irAE", action: "Manage atezolizumab per immune-toxicity grade." }
  ],
  refs: [
    { label: "IMpower133", detail: "Horn L et al. NEJM 2018;379:2220. mOS 12.3 vs 10.3 mo (HR 0.70).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1809064" }
  ],
  verified: "2026-06-24"
},
{
  id: "cis-etop",
  name: "Cisplatin + Etoposide (EP)",
  aliases: ["EP", "PE"],
  tumour: ["Lung — SCLC", "Lung — NSCLC"],
  setting: ["Limited-stage (with RT)", "Adjuvant"],
  cycle: "Every 21 days",
  cycles: "4 cycles",
  drugs: [
    { drug: "Cisplatin", dose: "75–80 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Etoposide", dose: "100 mg/m²", route: "IV", days: "Days 1–3" }
  ],
  support: {
    emetogenicity: "High",
    gcsf: "Per risk",
    premeds: ["NK1 + 5-HT3 + dexamethasone", "Cisplatin hydration"]
  },
  modifications: [
    { trigger: "Cisplatin — renal/ototox", action: "Hold or switch to carboplatin for declining CrCl or significant ototoxicity/neuropathy." }
  ],
  refs: [
    { label: "Turrisi AT et al.", detail: "NEJM 1999;340:265 (concurrent EP + twice-daily RT, LS-SCLC).", url: "https://www.nejm.org/doi/full/10.1056/NEJM199901283400403" }
  ],
  verified: "2026-06-24"
},
{
  id: "pembrolizumab-mono",
  name: "Pembrolizumab (monotherapy)",
  aliases: ["KEYNOTE-024", "keytruda single agent", "pembro mono"],
  tumour: ["Lung — NSCLC", "Head & Neck", "Melanoma", "Bladder / Urothelial"],
  setting: ["Metastatic", "1st line (high PD-L1)"],
  cycle: "Every 21 or 42 days",
  cycles: "Up to 2 years / until progression",
  drugs: [
    { drug: "Pembrolizumab", dose: "200 mg flat q3w, or 400 mg flat q6w", route: "IV", days: "Day 1" }
  ],
  support: {
    emetogenicity: "Minimal",
    gcsf: "Not applicable",
    premeds: ["None routine"]
  },
  modifications: [
    { trigger: "Immune-related AE", action: "Hold for most grade 2; hold + corticosteroids for grade 3; permanently discontinue most grade 4 (and grade 3 for some organs). Manage per irAE guidelines." },
    { trigger: "No standard dose reduction", action: "Toxicity is managed by holding/discontinuing, not dose-reducing." }
  ],
  refs: [
    { label: "KEYNOTE-024", detail: "Reck M et al. NEJM 2016;375:1823 (NSCLC PD-L1 ≥50%).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1606774" }
  ],
  verified: "2026-06-24",
  notes: "Flat dosing applies across approved indications; eligibility/PD-L1 thresholds differ by tumour type."
},
{
  id: "docetaxel-ramucirumab",
  name: "Docetaxel ± Ramucirumab",
  aliases: ["REVEL", "second-line lung docetaxel"],
  tumour: ["Lung — NSCLC"],
  setting: ["Metastatic", "2nd line"],
  cycle: "Every 21 days",
  cycles: "Until progression",
  drugs: [
    { drug: "Docetaxel", dose: "75 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Ramucirumab", dose: "10 mg/kg", route: "IV", days: "Day 1", notes: "Optional addition (REVEL)" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Per risk",
    premeds: ["Docetaxel: dexamethasone premed"]
  },
  modifications: [
    { trigger: "Neutropenia", action: "Reduce docetaxel to 60 mg/m²; add G-CSF for febrile neutropenia." },
    { trigger: "Ramucirumab — BP/proteinuria", action: "Hold for severe hypertension or proteinuria; monitor for bleeding." }
  ],
  refs: [
    { label: "REVEL", detail: "Garon EB et al. Lancet 2014;384:665 (docetaxel ± ramucirumab).", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(14)60845-X/fulltext" }
  ],
  verified: "2026-06-24"
},

/* ===================== GI ===================== */
{
  id: "mfolfox6",
  name: "mFOLFOX6",
  aliases: ["FOLFOX", "oxaliplatin 5FU leucovorin"],
  tumour: ["Colorectal", "Gastroesophageal"],
  setting: ["Adjuvant", "Metastatic", "Neoadjuvant"],
  cycle: "Every 14 days",
  cycles: "12 cycles (adjuvant) or until progression",
  drugs: [
    { drug: "Oxaliplatin", dose: "85 mg/m²", route: "IV over 2h", days: "Day 1" },
    { drug: "Leucovorin", dose: "400 mg/m²", route: "IV over 2h", days: "Day 1" },
    { drug: "5-Fluorouracil (bolus)", dose: "400 mg/m²", route: "IV bolus", days: "Day 1" },
    { drug: "5-Fluorouracil (infusion)", dose: "2400 mg/m²", route: "IV continuous over 46h", days: "Days 1–2" }
  ],
  support: {
    emetogenicity: "Moderate",
    gcsf: "Not routine",
    premeds: ["5-HT3 + dexamethasone ± NK1", "Avoid cold exposure (oxaliplatin neuropathy)"]
  },
  modifications: [
    { trigger: "Peripheral neuropathy", action: "Persistent grade 2: reduce oxaliplatin to 65 mg/m² or use stop-and-go; grade 3: discontinue oxaliplatin (continue 5-FU/LV)." },
    { trigger: "Hematologic", action: "ANC < 1.5 or platelets < 75 on day 1: delay until recovery; reduce after febrile neutropenia or grade 4." },
    { trigger: "DPD deficiency", action: "Test if suspected; markedly reduce or avoid 5-FU in DPYD variant carriers." },
    { trigger: "Hand-foot / mucositis", action: "Reduce 5-FU infusion dose for grade ≥2." }
  ],
  doseLevels: [
    { level: "−1", detail: "Oxaliplatin 65 mg/m²; 5-FU infusion ~20% reduction" },
    { level: "−2", detail: "Discontinue oxaliplatin; further 5-FU reduction" }
  ],
  refs: [
    { label: "MOSAIC", detail: "André T et al. NEJM 2004;350:2343 (adjuvant FOLFOX, stage III colon).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa032709" }
  ],
  verified: "2026-06-24"
},
{
  id: "folfox-bev",
  name: "FOLFOX + Bevacizumab",
  aliases: ["FOLFOX bevacizumab", "mFOLFOX6 bev"],
  tumour: ["Colorectal"],
  setting: ["Metastatic", "1st line"],
  cycle: "Every 14 days",
  cycles: "Until progression",
  drugs: [
    { drug: "Bevacizumab", dose: "5 mg/kg", route: "IV", days: "Day 1" },
    { drug: "Oxaliplatin", dose: "85 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Leucovorin", dose: "400 mg/m²", route: "IV", days: "Day 1" },
    { drug: "5-FU (bolus)", dose: "400 mg/m²", route: "IV bolus", days: "Day 1" },
    { drug: "5-FU (infusion)", dose: "2400 mg/m²", route: "IV continuous over 46h", days: "Days 1–2" }
  ],
  support: {
    emetogenicity: "Moderate",
    gcsf: "Not routine",
    premeds: ["5-HT3 + dexamethasone"]
  },
  modifications: [
    { trigger: "Bevacizumab — BP/proteinuria", action: "Hold for uncontrolled HTN or proteinuria >2 g/24h; hold ≥4 weeks around surgery (wound/perforation risk)." },
    { trigger: "Neuropathy / heme / DPYD", action: "Modify FOLFOX components as in mFOLFOX6." }
  ],
  refs: [
    { label: "Saltz LB et al. (NO16966)", detail: "J Clin Oncol 2008;26:2013 (bevacizumab + oxaliplatin chemo).", url: "https://ascopubs.org/doi/10.1200/JCO.2007.14.9930" }
  ],
  verified: "2026-06-24"
},
{
  id: "folfiri",
  name: "FOLFIRI",
  aliases: ["irinotecan 5FU leucovorin"],
  tumour: ["Colorectal"],
  setting: ["Metastatic"],
  cycle: "Every 14 days",
  cycles: "Until progression",
  drugs: [
    { drug: "Irinotecan", dose: "180 mg/m²", route: "IV over 90 min", days: "Day 1" },
    { drug: "Leucovorin", dose: "400 mg/m²", route: "IV", days: "Day 1" },
    { drug: "5-FU (bolus)", dose: "400 mg/m²", route: "IV bolus", days: "Day 1" },
    { drug: "5-FU (infusion)", dose: "2400 mg/m²", route: "IV continuous over 46h", days: "Days 1–2" }
  ],
  support: {
    emetogenicity: "Moderate",
    gcsf: "Per risk",
    premeds: ["Atropine available for acute cholinergic syndrome (irinotecan)", "Loperamide for delayed diarrhea", "5-HT3 + dexamethasone"]
  },
  modifications: [
    { trigger: "UGT1A1*28 homozygous", action: "Increased neutropenia risk; consider reduced starting irinotecan dose." },
    { trigger: "Diarrhea (grade 3–4)", action: "Hold until resolved; reduce irinotecan dose level on resumption." },
    { trigger: "Bilirubin elevation", action: "Reduce/hold irinotecan with hyperbilirubinemia." }
  ],
  refs: [
    { label: "Tournigand C et al.", detail: "J Clin Oncol 2004;22:229 (FOLFIRI vs FOLFOX sequencing).", url: "https://ascopubs.org/doi/10.1200/JCO.2004.05.113" }
  ],
  verified: "2026-06-24",
  notes: "Commonly combined with bevacizumab (5 mg/kg q2w) or — if RAS/BRAF wild-type, left-sided — with cetuximab or panitumumab."
},
{
  id: "folfiri-cetuximab",
  name: "FOLFIRI + Cetuximab",
  aliases: ["CRYSTAL", "cetuximab folfiri RAS wild-type"],
  tumour: ["Colorectal"],
  setting: ["Metastatic", "1st line (RAS/BRAF wild-type, left-sided)"],
  cycle: "FOLFIRI q14d; cetuximab weekly or q2w",
  cycles: "Until progression",
  drugs: [
    { drug: "Cetuximab", dose: "400 mg/m² load → 250 mg/m² weekly (or 500 mg/m² q2w)", route: "IV", days: "Weekly / Day 1" },
    { drug: "Irinotecan", dose: "180 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Leucovorin", dose: "400 mg/m²", route: "IV", days: "Day 1" },
    { drug: "5-FU (bolus + 46h infusion)", dose: "400 mg/m² bolus + 2400 mg/m²", route: "IV", days: "Days 1–2" }
  ],
  support: {
    emetogenicity: "Moderate",
    gcsf: "Per risk",
    premeds: ["Cetuximab: antihistamine premed (infusion reaction risk)", "Loperamide, atropine (irinotecan)"]
  },
  modifications: [
    { trigger: "Cetuximab — acneiform rash", action: "Topical/oral antibiotics; dose-reduce or hold for grade ≥3 skin toxicity." },
    { trigger: "RAS/BRAF status", action: "Use only if RAS and BRAF wild-type; greatest benefit in left-sided primaries." },
    { trigger: "Hypomagnesemia", action: "Monitor and replace Mg (EGFR-antibody effect)." }
  ],
  refs: [
    { label: "CRYSTAL", detail: "Van Cutsem E et al. NEJM 2009;360:1408; J Clin Oncol 2011 (KRAS wt).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa0805019" }
  ],
  verified: "2026-06-24",
  notes: "Panitumumab 6 mg/kg q2w is an alternative EGFR antibody."
},
{
  id: "capox",
  name: "CAPOX (XELOX)",
  aliases: ["XELOX", "capecitabine oxaliplatin"],
  tumour: ["Colorectal", "Gastroesophageal"],
  setting: ["Adjuvant", "Metastatic"],
  cycle: "Every 21 days",
  cycles: "8 cycles (adjuvant, ~6 mo) or until progression",
  drugs: [
    { drug: "Oxaliplatin", dose: "130 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Capecitabine", dose: "1000 mg/m² BID", route: "PO", days: "Days 1–14", notes: "2 weeks on, 1 week off" }
  ],
  support: {
    emetogenicity: "Moderate",
    gcsf: "Not routine",
    premeds: ["5-HT3 + dexamethasone", "Counsel on hand-foot syndrome + diarrhea"]
  },
  modifications: [
    { trigger: "Renal (capecitabine)", action: "CrCl 30–50: reduce capecitabine to 75%; CrCl < 30: contraindicated." },
    { trigger: "Hand-foot syndrome", action: "Hold capecitabine for grade ≥2; resume at reduced dose." },
    { trigger: "Neuropathy", action: "Reduce/discontinue oxaliplatin per grade." },
    { trigger: "DPYD variant", action: "Reduce/avoid capecitabine." }
  ],
  refs: [
    { label: "NO16968 (XELOXA)", detail: "Haller DG et al. J Clin Oncol 2011;29:1465 (adjuvant stage III).", url: "https://ascopubs.org/doi/10.1200/JCO.2010.33.6297" },
    { label: "IDEA collaboration", detail: "Grothey A et al. NEJM 2018 — 3 vs 6 mo adjuvant.", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1713709" }
  ],
  verified: "2026-06-24"
},
{
  id: "lv5fu2",
  name: "5-FU + Leucovorin (LV5FU2 / de Gramont)",
  aliases: ["de Gramont", "infusional 5FU", "sLV5FU2"],
  tumour: ["Colorectal"],
  setting: ["Adjuvant", "Metastatic", "Maintenance"],
  cycle: "Every 14 days",
  cycles: "Until progression / per setting",
  drugs: [
    { drug: "Leucovorin", dose: "400 mg/m²", route: "IV over 2h", days: "Day 1" },
    { drug: "5-FU (bolus)", dose: "400 mg/m²", route: "IV bolus", days: "Day 1" },
    { drug: "5-FU (infusion)", dose: "2400 mg/m²", route: "IV continuous over 46h", days: "Days 1–2" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Not routine",
    premeds: ["Antiemetic per low emetogenic protocol"]
  },
  modifications: [
    { trigger: "DPYD variant / DPD deficiency", action: "Markedly reduce or avoid 5-FU; uridine triacetate is the antidote for overdose/severe toxicity." },
    { trigger: "Mucositis / diarrhea / hand-foot", action: "Reduce 5-FU dose for grade ≥2; hold until recovery." }
  ],
  refs: [
    { label: "de Gramont A et al.", detail: "J Clin Oncol 1997;15:808 (LV5FU2 schedule).", url: "https://ascopubs.org/doi/10.1200/JCO.1997.15.2.808" }
  ],
  verified: "2026-06-24",
  notes: "Backbone of FOLFOX/FOLFIRI; used alone for maintenance or in frail patients. ± bevacizumab."
},
{
  id: "folfirinox",
  name: "FOLFIRINOX (and mFOLFIRINOX)",
  aliases: ["folfoxiri pancreas", "oxaliplatin irinotecan 5FU"],
  tumour: ["Pancreatic"],
  setting: ["Metastatic", "Adjuvant (modified)", "Neoadjuvant"],
  cycle: "Every 14 days",
  cycles: "Until progression / 12 cycles (adjuvant)",
  drugs: [
    { drug: "Oxaliplatin", dose: "85 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Irinotecan", dose: "180 mg/m²", route: "IV", days: "Day 1", notes: "mFOLFIRINOX: 150 mg/m²" },
    { drug: "Leucovorin", dose: "400 mg/m²", route: "IV", days: "Day 1" },
    { drug: "5-FU (bolus)", dose: "400 mg/m²", route: "IV bolus", days: "Day 1", notes: "Often OMITTED in mFOLFIRINOX" },
    { drug: "5-FU (infusion)", dose: "2400 mg/m²", route: "IV continuous over 46h", days: "Days 1–2" }
  ],
  support: {
    emetogenicity: "Moderate–high",
    gcsf: "Primary prophylaxis recommended (high febrile neutropenia risk)",
    premeds: ["NK1 + 5-HT3 + dexamethasone", "Atropine available (irinotecan)", "Loperamide for diarrhea"]
  },
  modifications: [
    { trigger: "General tolerability", action: "mFOLFIRINOX (no bolus 5-FU, irinotecan 150) preferred for better tolerability; reserve full dose for fit ECOG 0–1." },
    { trigger: "Neuropathy", action: "Reduce/discontinue oxaliplatin per grade (as in FOLFOX)." },
    { trigger: "Neutropenia/diarrhea", action: "Reduce irinotecan ± 5-FU; add/optimize G-CSF." }
  ],
  refs: [
    { label: "PRODIGE 4/ACCORD 11", detail: "Conroy T et al. NEJM 2011;364:1817 (metastatic). mOS 11.1 vs 6.8 mo.", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1011923" },
    { label: "PRODIGE 24 (adjuvant)", detail: "Conroy T et al. NEJM 2018;379:2395 (mFOLFIRINOX adjuvant).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1809775" }
  ],
  verified: "2026-06-24"
},
{
  id: "nalirifox",
  name: "NALIRIFOX",
  aliases: ["NAPOLI-3", "liposomal irinotecan oxaliplatin 5FU"],
  tumour: ["Pancreatic"],
  setting: ["Metastatic", "1st line"],
  cycle: "Every 14 days",
  cycles: "Until progression",
  drugs: [
    { drug: "Liposomal irinotecan", dose: "50 mg/m²", route: "IV over 90 min", days: "Day 1" },
    { drug: "Oxaliplatin", dose: "60 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Leucovorin", dose: "400 mg/m²", route: "IV", days: "Day 1" },
    { drug: "5-FU (infusion)", dose: "2400 mg/m²", route: "IV continuous over 46h", days: "Days 1–2" }
  ],
  support: {
    emetogenicity: "Moderate",
    gcsf: "Per risk (high diarrhea/neutropenia rates)",
    premeds: ["NK1 + 5-HT3 + dexamethasone", "Loperamide for diarrhea"]
  },
  modifications: [
    { trigger: "Diarrhea / neutropenia", action: "Hold and dose-reduce liposomal irinotecan; aggressive antidiarrheal support." },
    { trigger: "Neuropathy", action: "Reduce/discontinue oxaliplatin per grade." }
  ],
  refs: [
    { label: "NAPOLI-3", detail: "Wainberg ZA et al. Lancet 2023;402:1272. mOS 11.1 vs 9.2 mo vs gem/nab-pac.", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(23)01366-1/fulltext" }
  ],
  verified: "2026-06-24",
  notes: "Liposomal irinotecan (50 mg/m²) is NOT interchangeable with conventional irinotecan dosing."
},
{
  id: "gem-nabpac",
  name: "Gemcitabine + nab-Paclitaxel",
  aliases: ["MPACT", "gem abraxane"],
  tumour: ["Pancreatic"],
  setting: ["Metastatic", "1st line"],
  cycle: "28-day cycle (days 1, 8, 15)",
  cycles: "Until progression",
  drugs: [
    { drug: "nab-Paclitaxel", dose: "125 mg/m²", route: "IV", days: "Days 1, 8, 15" },
    { drug: "Gemcitabine", dose: "1000 mg/m²", route: "IV", days: "Days 1, 8, 15", notes: "Give after nab-paclitaxel" }
  ],
  support: {
    emetogenicity: "Low–moderate",
    gcsf: "Per risk",
    premeds: ["5-HT3 ± dexamethasone"]
  },
  modifications: [
    { trigger: "Neutropenia/thrombocytopenia", action: "Hold day 8/15 doses or step down dose levels (e.g., nab-pac 100 → 75; gem 800 → 600)." },
    { trigger: "Peripheral neuropathy", action: "Hold nab-paclitaxel for grade ≥3 until ≤1; resume reduced." }
  ],
  refs: [
    { label: "MPACT", detail: "Von Hoff DD et al. NEJM 2013;369:1691. mOS 8.5 vs 6.7 mo (gem).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1304369" }
  ],
  verified: "2026-06-24"
},
{
  id: "gem-mono",
  name: "Gemcitabine (single agent)",
  aliases: ["gem"],
  tumour: ["Pancreatic", "Biliary tract"],
  setting: ["Adjuvant", "Metastatic"],
  cycle: "28-day cycle (days 1, 8, 15)",
  cycles: "6 cycles (adjuvant) or until progression",
  drugs: [
    { drug: "Gemcitabine", dose: "1000 mg/m²", route: "IV over 30 min", days: "Days 1, 8, 15" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Per risk",
    premeds: ["Antiemetic per low emetogenic protocol"]
  },
  modifications: [
    { trigger: "Hematologic", action: "Hold day 8/15 doses for ANC < 1.0 or platelets < 75; reduce to 75% per nadir." }
  ],
  refs: [
    { label: "CONKO-001", detail: "Oettle H et al. JAMA 2007/2013 (adjuvant pancreatic).", url: "https://jamanetwork.com/journals/jama/fullarticle/1734332" }
  ],
  verified: "2026-06-24"
},
{
  id: "gemcis-biliary",
  name: "Gemcitabine + Cisplatin (± Durvalumab)",
  aliases: ["ABC-02", "TOPAZ-1", "GemCis biliary"],
  tumour: ["Biliary tract"],
  setting: ["Metastatic", "1st line"],
  cycle: "Every 21 days (days 1, 8)",
  cycles: "Up to 8 cycles, then durvalumab maintenance (if used)",
  drugs: [
    { drug: "Durvalumab", dose: "1500 mg flat", route: "IV", days: "Day 1", notes: "Optional (TOPAZ-1); maintenance 1500 mg q4w after chemo" },
    { drug: "Gemcitabine", dose: "1000 mg/m²", route: "IV", days: "Days 1, 8" },
    { drug: "Cisplatin", dose: "25 mg/m²", route: "IV", days: "Days 1, 8", notes: "Requires hydration" }
  ],
  support: {
    emetogenicity: "Moderate",
    gcsf: "Per risk",
    premeds: ["5-HT3 + dexamethasone", "Cisplatin hydration + Mg/K"]
  },
  modifications: [
    { trigger: "Hematologic", action: "Hold day 8 for ANC < 1.0 / platelets < 75; reduce gemcitabine/cisplatin per nadir." },
    { trigger: "Cisplatin — renal", action: "Reduce/switch to carboplatin if CrCl declines." },
    { trigger: "irAE (durvalumab)", action: "Manage per immune-toxicity grade." }
  ],
  refs: [
    { label: "ABC-02", detail: "Valle J et al. NEJM 2010;362:1273 (GemCis backbone).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa0908721" },
    { label: "TOPAZ-1", detail: "Oh DY et al. NEJM Evid 2022 (add durvalumab).", url: "https://evidence.nejm.org/doi/full/10.1056/EVIDoa2200015" }
  ],
  verified: "2026-06-24"
},

/* ----- Hepatocellular carcinoma (HCC) ----- */
{
  id: "atezo-bev-hcc",
  name: "Atezolizumab + Bevacizumab",
  aliases: ["IMbrave150", "atezo bev", "Tecentriq Avastin"],
  tumour: ["Hepatocellular"],
  setting: ["Unresectable / Advanced", "1st line"],
  cycle: "Every 21 days",
  cycles: "Until progression or unacceptable toxicity",
  drugs: [
    { drug: "Atezolizumab", dose: "1200 mg flat", route: "IV", days: "Day 1" },
    { drug: "Bevacizumab", dose: "15 mg/kg", route: "IV", days: "Day 1", notes: "Give after atezolizumab" }
  ],
  support: {
    emetogenicity: "Minimal",
    gcsf: "Not applicable",
    premeds: ["Upper GI endoscopy to evaluate/treat varices within 6 months before starting bevacizumab", "None routine otherwise"]
  },
  modifications: [
    { trigger: "Variceal/GI bleeding (bevacizumab)", action: "Screen and treat varices before starting; hold/discontinue for bleeding. Exclude recent variceal bleed or untreated high-risk varices." },
    { trigger: "Bevacizumab — BP/proteinuria", action: "Hold for uncontrolled hypertension or significant proteinuria; monitor for perforation/thrombosis." },
    { trigger: "irAE (atezolizumab)", action: "Hold/discontinue + corticosteroids per immune-toxicity grade." },
    { trigger: "Hepatic reserve", action: "Evidence is in Child-Pugh A; use caution and limited data in Child-Pugh B." }
  ],
  refs: [
    { label: "IMbrave150", detail: "Finn RS et al. NEJM 2020;382:1894. mOS not reached vs 13.2 mo sorafenib (HR 0.58).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1915745" }
  ],
  verified: "2026-06-24",
  notes: "Preferred 1st-line for advanced HCC when no contraindication to bevacizumab (bleeding risk, untreated varices)."
},
{
  id: "treme-durva-hcc",
  name: "Tremelimumab + Durvalumab (STRIDE)",
  aliases: ["HIMALAYA", "STRIDE", "treme durva", "Imjudo Imfinzi"],
  tumour: ["Hepatocellular"],
  setting: ["Unresectable / Advanced", "1st line"],
  cycle: "Single tremelimumab priming dose, then durvalumab every 4 weeks",
  cycles: "Durvalumab until progression",
  drugs: [
    { drug: "Tremelimumab", dose: "300 mg flat", route: "IV", days: "Day 1 (single priming dose only)", notes: "<30 kg: 4 mg/kg. Infuse over 60 min; observe 60 min before durvalumab" },
    { drug: "Durvalumab", dose: "1500 mg flat", route: "IV", days: "Day 1, then every 4 weeks", notes: "<30 kg: 20 mg/kg" }
  ],
  support: {
    emetogenicity: "Minimal",
    gcsf: "Not applicable",
    premeds: ["None routine"]
  },
  modifications: [
    { trigger: "Immune-related AE", action: "irAE risk increased by the single tremelimumab priming dose (esp. hepatitis, colitis, dermatitis, endocrinopathy); hold/discontinue + corticosteroids per organ/grade." },
    { trigger: "Bleeding/varices", action: "No bevacizumab — preferred option when varices, recent bleeding, or bevacizumab contraindications make atezo/bev unsuitable." },
    { trigger: "Hepatic reserve", action: "Studied in Child-Pugh A." }
  ],
  refs: [
    { label: "HIMALAYA", detail: "Abou-Alfa GK et al. NEJM Evid 2022;1(8). 4-yr OS update Ann Oncol 2024.", url: "https://evidence.nejm.org/doi/full/10.1056/EVIDoa2100070" }
  ],
  verified: "2026-06-24",
  notes: "STRIDE = Single Tremelimumab Regular Interval Durvalumab."
},
{
  id: "lenvatinib-hcc",
  name: "Lenvatinib",
  aliases: ["REFLECT", "Lenvima"],
  tumour: ["Hepatocellular"],
  setting: ["Unresectable / Advanced", "1st line"],
  cycle: "Continuous daily oral",
  cycles: "Until progression or unacceptable toxicity",
  drugs: [
    { drug: "Lenvatinib", dose: "12 mg daily (≥60 kg) or 8 mg daily (<60 kg)", route: "PO", days: "Continuous", notes: "Weight-based starting dose" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Not applicable",
    premeds: ["Baseline + ongoing BP monitoring; counsel on diarrhea, fatigue, anorexia"]
  },
  modifications: [
    { trigger: "Dose reductions", action: "≥60 kg: 8 → 4 → 4 mg every other day. <60 kg: 4 → 4 mg every other day." },
    { trigger: "Hypertension (very common)", action: "Optimize antihypertensives; hold for severe/persistent HTN." },
    { trigger: "Proteinuria / hand-foot / diarrhea", action: "Interrupt and dose-reduce per grade." },
    { trigger: "Hepatic encephalopathy / hepatic reserve", action: "Hold for encephalopathy or hepatic failure; studied in Child-Pugh A." }
  ],
  refs: [
    { label: "REFLECT", detail: "Kudo M et al. Lancet 2018;391:1163 (non-inferior OS vs sorafenib).", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(18)30207-1/fulltext" }
  ],
  verified: "2026-06-24"
},
{
  id: "sorafenib-hcc",
  name: "Sorafenib",
  aliases: ["SHARP", "Nexavar"],
  tumour: ["Hepatocellular"],
  setting: ["Unresectable / Advanced", "1st line"],
  cycle: "Continuous daily oral",
  cycles: "Until progression or unacceptable toxicity",
  drugs: [
    { drug: "Sorafenib", dose: "400 mg BID", route: "PO", days: "Continuous", notes: "Take without food (or low-fat meal)" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Not applicable",
    premeds: ["Counsel on hand-foot skin reaction, diarrhea; BP monitoring"]
  },
  modifications: [
    { trigger: "Hand-foot skin reaction (dose-limiting)", action: "Reduce to 400 mg daily, then 400 mg every other day; supportive skin care." },
    { trigger: "Diarrhea", action: "Antidiarrheals; dose-reduce for grade ≥2 persistent." },
    { trigger: "Hepatic reserve", action: "Most data in Child-Pugh A; limited benefit and more toxicity in Child-Pugh B." }
  ],
  refs: [
    { label: "SHARP", detail: "Llovet JM et al. NEJM 2008;359:378.", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa0708857" },
    { label: "Asia-Pacific", detail: "Cheng AL et al. Lancet Oncol 2009;10:25.", url: "https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(08)70285-7/fulltext" }
  ],
  verified: "2026-06-24"
},
{
  id: "flot",
  name: "FLOT",
  aliases: ["docetaxel oxaliplatin 5FU leucovorin", "perioperative gastric"],
  tumour: ["Gastroesophageal"],
  setting: ["Perioperative", "Neoadjuvant"],
  cycle: "Every 14 days",
  cycles: "4 cycles pre-op + 4 cycles post-op",
  drugs: [
    { drug: "Docetaxel", dose: "50 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Oxaliplatin", dose: "85 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Leucovorin", dose: "200 mg/m²", route: "IV", days: "Day 1" },
    { drug: "5-FU (infusion)", dose: "2600 mg/m²", route: "IV continuous over 24h", days: "Day 1" }
  ],
  support: {
    emetogenicity: "Moderate–high",
    gcsf: "Primary prophylaxis recommended",
    premeds: ["Docetaxel: dexamethasone premed", "NK1 + 5-HT3 + dexamethasone"]
  },
  modifications: [
    { trigger: "Neutropenia", action: "G-CSF support; reduce docetaxel ± oxaliplatin for febrile neutropenia/grade 4." },
    { trigger: "Neuropathy", action: "Reduce/discontinue oxaliplatin per grade." },
    { trigger: "DPYD variant", action: "Reduce/avoid 5-FU." }
  ],
  refs: [
    { label: "FLOT4-AIO", detail: "Al-Batran SE et al. Lancet 2019;393:1948. mOS 50 vs 35 mo vs ECF/ECX.", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(18)32557-1/fulltext" }
  ],
  verified: "2026-06-24"
},
{
  id: "folfox-nivolumab",
  name: "FOLFOX + Nivolumab",
  aliases: ["CheckMate 649", "nivo folfox gastric"],
  tumour: ["Gastroesophageal"],
  setting: ["Metastatic", "1st line"],
  cycle: "Every 14 days (nivolumab 240 mg q2w)",
  cycles: "Until progression",
  drugs: [
    { drug: "Nivolumab", dose: "240 mg flat (q2w) or 360 mg (q3w with CapeOX)", route: "IV", days: "Day 1" },
    { drug: "Oxaliplatin", dose: "85 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Leucovorin", dose: "400 mg/m²", route: "IV", days: "Day 1" },
    { drug: "5-FU", dose: "400 mg/m² bolus + 1200 mg/m²/day × 2 (CI)", route: "IV", days: "Days 1–2" }
  ],
  support: {
    emetogenicity: "Moderate",
    gcsf: "Per risk",
    premeds: ["5-HT3 + dexamethasone"]
  },
  modifications: [
    { trigger: "PD-L1 CPS", action: "Greatest benefit at CPS ≥5; check CPS to guide use." },
    { trigger: "irAE (nivolumab)", action: "Hold/discontinue + steroids per grade." },
    { trigger: "Neuropathy / heme", action: "Modify FOLFOX as standard." }
  ],
  refs: [
    { label: "CheckMate 649", detail: "Janjigian YY et al. Lancet 2021;398:27.", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(21)00797-2/fulltext" }
  ],
  verified: "2026-06-24"
},
{
  id: "ramucirumab-paclitaxel",
  name: "Ramucirumab + Paclitaxel",
  aliases: ["RAINBOW", "second-line gastric"],
  tumour: ["Gastroesophageal"],
  setting: ["Metastatic", "2nd line"],
  cycle: "28-day cycle",
  cycles: "Until progression",
  drugs: [
    { drug: "Ramucirumab", dose: "8 mg/kg", route: "IV", days: "Days 1, 15" },
    { drug: "Paclitaxel", dose: "80 mg/m²", route: "IV", days: "Days 1, 8, 15" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Per risk",
    premeds: ["Paclitaxel: dexamethasone + H1/H2 premed"]
  },
  modifications: [
    { trigger: "Ramucirumab — BP/proteinuria/bleeding", action: "Hold for severe HTN, proteinuria >2 g, or bleeding; hold around surgery." },
    { trigger: "Neuropathy / neutropenia", action: "Hold/reduce paclitaxel per grade." }
  ],
  refs: [
    { label: "RAINBOW", detail: "Wilke H et al. Lancet Oncol 2014;15:1224.", url: "https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(14)70420-6/fulltext" }
  ],
  verified: "2026-06-24"
},
{
  id: "tas102",
  name: "Trifluridine/Tipiracil (± Bevacizumab)",
  aliases: ["TAS-102", "Lonsurf", "RECOURSE", "SUNLIGHT"],
  tumour: ["Colorectal", "Gastroesophageal"],
  setting: ["Metastatic", "Refractory (later-line)"],
  cycle: "28-day cycle",
  cycles: "Until progression",
  drugs: [
    { drug: "Trifluridine/tipiracil", dose: "35 mg/m² (trifluridine component) BID", route: "PO", days: "Days 1–5 and 8–12", notes: "With food; max single dose 80 mg trifluridine" },
    { drug: "Bevacizumab", dose: "5 mg/kg", route: "IV", days: "Days 1, 15", notes: "Optional (SUNLIGHT) — improves OS" }
  ],
  support: {
    emetogenicity: "Low–moderate",
    gcsf: "Per risk (frequent grade 3–4 neutropenia)",
    premeds: ["Antiemetic per protocol"]
  },
  modifications: [
    { trigger: "Myelosuppression", action: "Hold for ANC < 0.5 or platelets < 50; resume at dose reduced by 5 mg/m²/dose (min 20 mg/m²)." },
    { trigger: "Renal impairment", action: "Reduce dose for moderate–severe renal impairment (CrCl < 60)." }
  ],
  refs: [
    { label: "RECOURSE", detail: "Mayer RJ et al. NEJM 2015;372:1909.", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1414325" },
    { label: "SUNLIGHT", detail: "Prager GW et al. NEJM 2023;388:1657 (add bevacizumab).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2214963" }
  ],
  verified: "2026-06-24"
},
{
  id: "regorafenib",
  name: "Regorafenib",
  aliases: ["Stivarga", "CORRECT", "ReDOS"],
  tumour: ["Colorectal", "Hepatocellular", "GIST"],
  setting: ["Metastatic", "Refractory (later-line)"],
  cycle: "28-day cycle (3 weeks on, 1 week off)",
  cycles: "Until progression",
  drugs: [
    { drug: "Regorafenib", dose: "160 mg daily (or ReDOS escalation 80 → 120 → 160)", route: "PO", days: "Days 1–21", notes: "With low-fat meal" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Not applicable",
    premeds: ["Counsel on hand-foot skin reaction, hypertension, fatigue"]
  },
  modifications: [
    { trigger: "Hand-foot skin reaction", action: "ReDOS weekly dose-escalation (start 80 mg) improves tolerability; dose-reduce/interrupt for grade ≥2." },
    { trigger: "Hepatotoxicity", action: "Monitor LFTs; hold/discontinue for significant transaminase or bilirubin rise (boxed warning)." },
    { trigger: "Hypertension", action: "Monitor and manage BP; hold for severe HTN." }
  ],
  refs: [
    { label: "CORRECT", detail: "Grothey A et al. Lancet 2013;381:303.", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(12)61900-X/fulltext" },
    { label: "ReDOS", detail: "Bekaii-Saab TS et al. Lancet Oncol 2019 (dose-escalation strategy).", url: "https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(19)30272-4/fulltext" }
  ],
  verified: "2026-06-24"
},

/* ===================== BREAST ===================== */
{
  id: "ac-t",
  name: "AC → T (dose-dense option)",
  aliases: ["AC paclitaxel", "doxorubicin cyclophosphamide paclitaxel", "ddAC"],
  tumour: ["Breast"],
  setting: ["Adjuvant", "Neoadjuvant"],
  cycle: "AC every 14 or 21 days × 4, then paclitaxel",
  cycles: "4 cycles AC, then 4 (q3w) or 12 (weekly) paclitaxel",
  drugs: [
    { drug: "Doxorubicin", dose: "60 mg/m²", route: "IV", days: "Day 1 (AC phase)" },
    { drug: "Cyclophosphamide", dose: "600 mg/m²", route: "IV", days: "Day 1 (AC phase)" },
    { drug: "Paclitaxel", dose: "175 mg/m² q3w ×4, or 80 mg/m² weekly ×12", route: "IV", days: "Sequential after AC" }
  ],
  support: {
    emetogenicity: "High (AC); low–moderate (paclitaxel)",
    gcsf: "Required if dose-dense (q14d)",
    premeds: ["AC: NK1 + 5-HT3 + dexamethasone", "Paclitaxel: dexamethasone + H1/H2 premed"]
  },
  modifications: [
    { trigger: "Cardiac (anthracycline)", action: "Baseline + monitoring LVEF; cumulative doxorubicin limit ~450–550 mg/m²." },
    { trigger: "Neutropenia", action: "Add/escalate G-CSF; reduce dose for febrile neutropenia." },
    { trigger: "Paclitaxel neuropathy", action: "Hold/reduce for grade ≥2." }
  ],
  refs: [
    { label: "CALGB 9741", detail: "Citron ML et al. J Clin Oncol 2003 (dose-dense scheduling).", url: "https://ascopubs.org/doi/10.1200/JCO.2003.09.081" }
  ],
  verified: "2026-06-24"
},
{
  id: "tc",
  name: "TC (Docetaxel + Cyclophosphamide)",
  aliases: ["docetaxel cyclophosphamide"],
  tumour: ["Breast"],
  setting: ["Adjuvant"],
  cycle: "Every 21 days",
  cycles: "4 (or 6) cycles",
  drugs: [
    { drug: "Docetaxel", dose: "75 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Cyclophosphamide", dose: "600 mg/m²", route: "IV", days: "Day 1" }
  ],
  support: {
    emetogenicity: "Moderate",
    gcsf: "Primary prophylaxis recommended",
    premeds: ["Docetaxel: dexamethasone premed (e.g., 8 mg BID × 3d)", "5-HT3 + dexamethasone"]
  },
  modifications: [
    { trigger: "Febrile neutropenia", action: "G-CSF support; reduce docetaxel to 60 mg/m²." },
    { trigger: "Neuropathy / nail / fluid retention", action: "Reduce/hold docetaxel per grade." }
  ],
  refs: [
    { label: "US Oncology 9735", detail: "Jones S et al. J Clin Oncol 2009 (TC vs AC).", url: "https://ascopubs.org/doi/10.1200/JCO.2008.18.4028" }
  ],
  verified: "2026-06-24"
},
{
  id: "tchp",
  name: "TCHP (Docetaxel + Carboplatin + Trastuzumab + Pertuzumab)",
  aliases: ["TCHP", "HER2 neoadjuvant"],
  tumour: ["Breast — HER2+"],
  setting: ["Neoadjuvant", "Adjuvant"],
  cycle: "Every 21 days",
  cycles: "6 cycles (then continue HP to complete 1 year)",
  drugs: [
    { drug: "Docetaxel", dose: "75 mg/m² (may escalate to 100)", route: "IV", days: "Day 1" },
    { drug: "Carboplatin", dose: "AUC 6", route: "IV", days: "Day 1" },
    { drug: "Trastuzumab", dose: "8 mg/kg load → 6 mg/kg", route: "IV", days: "Day 1" },
    { drug: "Pertuzumab", dose: "840 mg load → 420 mg", route: "IV", days: "Day 1" }
  ],
  support: {
    emetogenicity: "Moderate–high",
    gcsf: "Primary prophylaxis recommended",
    premeds: ["Docetaxel: dexamethasone premed", "Antiemetics per protocol"]
  },
  modifications: [
    { trigger: "Cardiac", action: "Monitor LVEF q3 months; hold HER2 agents for significant LVEF drop." },
    { trigger: "Diarrhea", action: "Common with pertuzumab; loperamide, dose interruption as needed." },
    { trigger: "Neutropenia", action: "G-CSF; reduce docetaxel/carboplatin per grade." }
  ],
  refs: [
    { label: "TRYPHAENA / NeoSphere", detail: "Pertuzumab in neoadjuvant HER2+ disease.", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1413513" }
  ],
  verified: "2026-06-24"
},
{
  id: "paclitaxel-trastuzumab",
  name: "Paclitaxel (weekly) + Trastuzumab",
  aliases: ["APT regimen", "weekly paclitaxel herceptin"],
  tumour: ["Breast — HER2+"],
  setting: ["Adjuvant"],
  cycle: "Paclitaxel weekly ×12; trastuzumab to complete 1 year",
  cycles: "12 weeks chemo",
  drugs: [
    { drug: "Paclitaxel", dose: "80 mg/m²", route: "IV", days: "Weekly × 12" },
    { drug: "Trastuzumab", dose: "4 mg/kg load → 2 mg/kg weekly (or 6 mg/kg q3w after)", route: "IV", days: "Weekly, then complete 1 year" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Not routine",
    premeds: ["Paclitaxel: dexamethasone + H1/H2 premed"]
  },
  modifications: [
    { trigger: "Cardiac", action: "Monitor LVEF; hold trastuzumab per cardiac protocol." },
    { trigger: "Neuropathy", action: "Hold/reduce paclitaxel for grade ≥2." }
  ],
  refs: [
    { label: "APT trial", detail: "Tolaney SM et al. NEJM 2015;372:134 (small node-negative HER2+).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1406281" }
  ],
  verified: "2026-06-24"
},
{
  id: "tdm1",
  name: "Trastuzumab emtansine (T-DM1)",
  aliases: ["Kadcyla", "ado-trastuzumab emtansine", "KATHERINE", "EMILIA"],
  tumour: ["Breast — HER2+"],
  setting: ["Adjuvant (residual disease)", "Metastatic"],
  cycle: "Every 21 days",
  cycles: "14 cycles (adjuvant) or until progression",
  drugs: [
    { drug: "Trastuzumab emtansine", dose: "3.6 mg/kg", route: "IV", days: "Day 1", notes: "First infusion over 90 min; then 30 min if tolerated" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Not routine",
    premeds: ["None routine"]
  },
  modifications: [
    { trigger: "Thrombocytopenia", action: "Hold for platelets < 100; resume at same or reduced dose level (3.0 → 2.4 mg/kg) per recovery." },
    { trigger: "Hepatotoxicity", action: "Hold/reduce for transaminase or bilirubin elevation; discontinue for severe." },
    { trigger: "Cardiac", action: "Monitor LVEF; hold for significant decline." }
  ],
  refs: [
    { label: "KATHERINE", detail: "von Minckwitz G et al. NEJM 2019;380:617 (adjuvant, residual disease).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1814017" },
    { label: "EMILIA", detail: "Verma S et al. NEJM 2012;367:1783 (metastatic).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1209124" }
  ],
  verified: "2026-06-24"
},
{
  id: "tdxd",
  name: "Trastuzumab deruxtecan (T-DXd)",
  aliases: ["Enhertu", "DESTINY-Breast", "fam-trastuzumab deruxtecan"],
  tumour: ["Breast — HER2+", "Breast — HER2-low", "Gastroesophageal"],
  setting: ["Metastatic"],
  cycle: "Every 21 days",
  cycles: "Until progression",
  drugs: [
    { drug: "Trastuzumab deruxtecan", dose: "5.4 mg/kg (breast)", route: "IV", days: "Day 1", notes: "6.4 mg/kg for gastric; first infusion 90 min, then 30 min" }
  ],
  support: {
    emetogenicity: "Moderate–high",
    gcsf: "Per risk",
    premeds: ["Antiemetic prophylaxis (NK1 + 5-HT3 + dexamethasone)"]
  },
  modifications: [
    { trigger: "Interstitial lung disease / pneumonitis", action: "BOXED WARNING. Monitor for cough/dyspnea; hold for grade 1 + corticosteroids, permanently discontinue for grade ≥2." },
    { trigger: "Neutropenia", action: "Hold for grade ≥3; dose-reduce (5.4 → 4.4 → 3.2 mg/kg) on recurrence." },
    { trigger: "LVEF decline", action: "Monitor LVEF; hold/discontinue per protocol." }
  ],
  refs: [
    { label: "DESTINY-Breast03", detail: "Cortés J et al. NEJM 2022;386:1143 (vs T-DM1, HER2+).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2115022" },
    { label: "DESTINY-Breast04", detail: "Modi S et al. NEJM 2022;387:9 (HER2-low).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2203690" }
  ],
  verified: "2026-06-24"
},
{
  id: "sacituzumab",
  name: "Sacituzumab govitecan",
  aliases: ["Trodelvy", "ASCENT", "sacituzumab govitecan-hziy"],
  tumour: ["Breast — TNBC", "Breast — HR+/HER2−", "Bladder / Urothelial"],
  setting: ["Metastatic", "Pretreated"],
  cycle: "21-day cycle (days 1, 8)",
  cycles: "Until progression",
  drugs: [
    { drug: "Sacituzumab govitecan", dose: "10 mg/kg", route: "IV", days: "Days 1, 8", notes: "First infusion over 3h; then 1–2h" }
  ],
  support: {
    emetogenicity: "Moderate",
    gcsf: "Primary prophylaxis often needed (frequent neutropenia)",
    premeds: ["Antiemetics", "Pre-infusion antipyretic/antihistamine; consider corticosteroid for prior reactions"]
  },
  modifications: [
    { trigger: "Neutropenia", action: "BOXED WARNING (neutropenia + diarrhea). Hold for grade ≥3; G-CSF; dose-reduce (10 → 7.5 → 5 mg/kg)." },
    { trigger: "Diarrhea", action: "Rule out infection; loperamide; atropine for acute cholinergic symptoms." },
    { trigger: "UGT1A1*28 homozygous", action: "Higher risk of neutropenia." }
  ],
  refs: [
    { label: "ASCENT", detail: "Bardia A et al. NEJM 2021;384:1529 (mTNBC).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2028485" }
  ],
  verified: "2026-06-24"
},
{
  id: "eribulin",
  name: "Eribulin",
  aliases: ["Halaven", "EMBRACE", "eribulin mesylate"],
  tumour: ["Breast"],
  setting: ["Metastatic", "Pretreated"],
  cycle: "21-day cycle (days 1, 8)",
  cycles: "Until progression",
  drugs: [
    { drug: "Eribulin mesylate", dose: "1.4 mg/m²", route: "IV over 2–5 min", days: "Days 1, 8" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Per risk",
    premeds: ["Antiemetic per low emetogenic protocol"]
  },
  modifications: [
    { trigger: "Neutropenia / thrombocytopenia", action: "Hold day 8 for ANC < 1.0 / platelets < 75; reduce (1.4 → 1.1 → 0.7 mg/m²)." },
    { trigger: "Hepatic / renal impairment", action: "Reduce starting dose (e.g., 1.1 mg/m² for mild hepatic or CrCl 30–50)." },
    { trigger: "Peripheral neuropathy", action: "Hold for grade ≥3 until ≤2." }
  ],
  refs: [
    { label: "EMBRACE", detail: "Cortes J et al. Lancet 2011;377:914.", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(11)60070-6/fulltext" }
  ],
  verified: "2026-06-24"
},
{
  id: "pembro-chemo-tnbc",
  name: "Pembrolizumab + Chemotherapy (TNBC)",
  aliases: ["KEYNOTE-355", "KEYNOTE-522", "pembro nab-paclitaxel"],
  tumour: ["Breast — TNBC"],
  setting: ["Metastatic (1st line, CPS ≥10)", "Neoadjuvant (KN-522)"],
  cycle: "Pembrolizumab q3w; chemo backbone varies",
  cycles: "Per setting",
  drugs: [
    { drug: "Pembrolizumab", dose: "200 mg q3w (or 400 mg q6w)", route: "IV", days: "Day 1" },
    { drug: "nab-Paclitaxel", dose: "100 mg/m²", route: "IV", days: "Days 1, 8, 15 (q28d)", notes: "Metastatic option" },
    { drug: "Paclitaxel", dose: "90 mg/m²", route: "IV", days: "Days 1, 8, 15 (q28d)", notes: "Metastatic option" },
    { drug: "Gemcitabine + Carboplatin", dose: "gem 1000 mg/m² + carbo AUC 2", route: "IV", days: "Days 1, 8 (q21d)", notes: "Metastatic option" }
  ],
  support: {
    emetogenicity: "Varies by backbone (low–moderate)",
    gcsf: "Per risk",
    premeds: ["Taxane premed where applicable", "Antiemetics per backbone"]
  },
  modifications: [
    { trigger: "PD-L1 CPS (metastatic)", action: "Benefit confined to CPS ≥10 in 1st-line metastatic TNBC." },
    { trigger: "irAE", action: "Hold/discontinue pembrolizumab + steroids per grade." },
    { trigger: "Chemo toxicity", action: "Dose-reduce backbone per agent-specific rules." }
  ],
  refs: [
    { label: "KEYNOTE-355", detail: "Cortes J et al. NEJM 2022;387:217 (metastatic, CPS ≥10).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2202809" },
    { label: "KEYNOTE-522", detail: "Schmid P et al. NEJM 2020;382:810 (neoadjuvant: pembro + carbo/taxane → pembro + AC).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1910549" }
  ],
  verified: "2026-06-24"
},
{
  id: "capecitabine-mono",
  name: "Capecitabine (single agent)",
  aliases: ["xeloda"],
  tumour: ["Breast", "Colorectal"],
  setting: ["Adjuvant (CREATE-X)", "Metastatic"],
  cycle: "Every 21 days",
  cycles: "Until progression / 6–8 cycles (adjuvant)",
  drugs: [
    { drug: "Capecitabine", dose: "1000–1250 mg/m² BID", route: "PO", days: "Days 1–14", notes: "2 weeks on, 1 week off" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Not routine",
    premeds: ["Counsel on hand-foot syndrome, diarrhea"]
  },
  modifications: [
    { trigger: "Renal", action: "CrCl 30–50: reduce to 75%; CrCl < 30: contraindicated." },
    { trigger: "Hand-foot syndrome", action: "Hold for grade ≥2; resume at lower dose level." },
    { trigger: "DPYD variant", action: "Reduce or avoid." }
  ],
  refs: [
    { label: "CREATE-X", detail: "Masuda N et al. NEJM 2017;376:2147 (residual TNBC after neoadjuvant).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1612645" }
  ],
  verified: "2026-06-24"
},

/* ----- HR+/HER2− breast — endocrine & targeted ----- */
{
  id: "palbociclib",
  name: "Palbociclib + Endocrine Therapy",
  aliases: ["Ibrance", "PALOMA", "CDK4/6 palbociclib", "palbo letrozole fulvestrant"],
  tumour: ["Breast — HR+/HER2−"],
  setting: ["Metastatic", "1st line", "2nd line"],
  cycle: "28-day cycle (21 days on, 7 off)",
  cycles: "Until progression",
  drugs: [
    { drug: "Palbociclib", dose: "125 mg daily", route: "PO", days: "Days 1–21", notes: "7-day break each cycle" },
    { drug: "Aromatase inhibitor", dose: "letrozole 2.5 mg daily", route: "PO", days: "Continuous", notes: "1st-line partner (PALOMA-2)" },
    { drug: "Fulvestrant", dose: "500 mg", route: "IM", days: "Days 1, 15, then q28d", notes: "Alternative partner (PALOMA-3)" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Not used (neutropenia managed by dose hold/reduction, not G-CSF)",
    premeds: ["Pre/perimenopausal: add ovarian suppression (LHRH agonist)", "CBC day 1 & 15 of first 2 cycles, then each cycle"]
  },
  modifications: [
    { trigger: "Neutropenia (dose-limiting)", action: "Hold for ANC < 1.0; resume reduced. Dose levels 125 → 100 → 75 mg." },
    { trigger: "Take with food", action: "Improves absorption/consistency." }
  ],
  refs: [
    { label: "PALOMA-2 / PALOMA-3", detail: "Finn RS et al. NEJM 2016;375:1925; Cristofanilli M et al. Lancet Oncol 2016 (fulvestrant).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1607303" }
  ],
  verified: "2026-06-24"
},
{
  id: "ribociclib",
  name: "Ribociclib + Endocrine Therapy",
  aliases: ["Kisqali", "MONALEESA", "CDK4/6 ribociclib"],
  tumour: ["Breast — HR+/HER2−"],
  setting: ["Metastatic", "1st line", "2nd line"],
  cycle: "28-day cycle (21 days on, 7 off)",
  cycles: "Until progression",
  drugs: [
    { drug: "Ribociclib", dose: "600 mg daily", route: "PO", days: "Days 1–21", notes: "7-day break each cycle" },
    { drug: "Aromatase inhibitor", dose: "letrozole 2.5 mg daily (or anastrozole)", route: "PO", days: "Continuous" },
    { drug: "Fulvestrant", dose: "500 mg", route: "IM", days: "Days 1, 15, then q28d", notes: "Alternative partner" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Not used",
    premeds: ["Pre/perimenopausal: add goserelin/LHRH agonist (MONALEESA-7)", "Baseline ECG + electrolytes; LFTs and CBC monitoring"]
  },
  modifications: [
    { trigger: "QTc prolongation", action: "ECG at baseline, day 14, and start of cycle 2; avoid concomitant QT-prolonging drugs; hold/reduce for QTcF > 480 ms. Dose levels 600 → 400 → 200 mg." },
    { trigger: "Hepatotoxicity", action: "Monitor LFTs; hold/reduce per grade." },
    { trigger: "Neutropenia", action: "Hold/reduce per ANC." }
  ],
  refs: [
    { label: "MONALEESA-2/3/7", detail: "Hortobagyi GN et al. NEJM 2022;386:942 (OS).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2114663" }
  ],
  verified: "2026-06-24"
},
{
  id: "abemaciclib",
  name: "Abemaciclib + Endocrine Therapy",
  aliases: ["Verzenio", "MONARCH", "CDK4/6 abemaciclib"],
  tumour: ["Breast — HR+/HER2−"],
  setting: ["Metastatic", "1st line", "2nd line"],
  cycle: "Continuous (no break)",
  cycles: "Until progression",
  drugs: [
    { drug: "Abemaciclib", dose: "150 mg BID (with ET); 200 mg BID monotherapy", route: "PO", days: "Continuous" },
    { drug: "Aromatase inhibitor", dose: "letrozole 2.5 mg or anastrozole 1 mg daily", route: "PO", days: "Continuous", notes: "MONARCH-3" },
    { drug: "Fulvestrant", dose: "500 mg", route: "IM", days: "Days 1, 15, then q28d", notes: "MONARCH-2" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Not used",
    premeds: ["Pre/perimenopausal: add ovarian suppression", "Counsel that diarrhea typically starts early"]
  },
  modifications: [
    { trigger: "Diarrhea (very common, early onset)", action: "Start loperamide at first loose stool + hydration; hold and dose-reduce for grade ≥2 persistent. Dose levels 150 → 100 → 50 mg BID." },
    { trigger: "VTE", action: "Increased thromboembolism risk; evaluate symptoms promptly." },
    { trigger: "ILD / pneumonitis & hepatotoxicity", action: "Monitor; hold/discontinue per grade; monitor LFTs." }
  ],
  refs: [
    { label: "MONARCH-2 / MONARCH-3", detail: "Sledge GW et al. JCO 2017 (fulvestrant); Goetz MP et al. JCO 2017 (AI).", url: "https://ascopubs.org/doi/10.1200/JCO.2017.73.7585" }
  ],
  verified: "2026-06-24",
  notes: "Less neutropenia than palbociclib/ribociclib; diarrhea is the dominant toxicity."
},
{
  id: "cdk46-adjuvant",
  name: "Adjuvant CDK4/6 inhibitor + Endocrine Therapy",
  aliases: ["monarchE", "NATALEE", "adjuvant abemaciclib ribociclib"],
  tumour: ["Breast — HR+/HER2−"],
  setting: ["Adjuvant", "High-risk early breast"],
  cycle: "Abemaciclib continuous ×2 yr, or ribociclib 21/7 ×3 yr",
  cycles: "Plus endocrine therapy for ≥5 years",
  drugs: [
    { drug: "Abemaciclib", dose: "150 mg BID", route: "PO", days: "Continuous × 2 years", notes: "monarchE (node-positive high risk)" },
    { drug: "Ribociclib", dose: "400 mg daily", route: "PO", days: "21 days on / 7 off × 3 years", notes: "NATALEE (stage II–III)" },
    { drug: "Endocrine therapy", dose: "AI ± ovarian suppression, or tamoxifen", route: "PO", days: "Continuous (≥5 years)" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Not used",
    premeds: ["Monitoring per the chosen CDK4/6 agent (CBC; LFTs + ECG for ribociclib)"]
  },
  modifications: [
    { trigger: "Abemaciclib — diarrhea", action: "Loperamide + dose reduction (150 → 100 → 50 BID)." },
    { trigger: "Ribociclib — QTc / LFTs / neutropenia", action: "ECG + LFT monitoring; dose-reduce 400 → 200 mg." }
  ],
  refs: [
    { label: "monarchE", detail: "Johnston SRD et al. JCO 2020; Lancet Oncol 2023 (abemaciclib ×2 yr).", url: "https://ascopubs.org/doi/10.1200/JCO.20.02514" },
    { label: "NATALEE", detail: "Slamon D et al. NEJM 2024;390:1080 (ribociclib ×3 yr).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2305488" }
  ],
  verified: "2026-06-24"
},
{
  id: "fulvestrant",
  name: "Fulvestrant",
  aliases: ["Faslodex", "FALCON", "CONFIRM", "SERD"],
  tumour: ["Breast — HR+/HER2−"],
  setting: ["Metastatic", "1st/2nd line", "Backbone for targeted combos"],
  cycle: "Loading days 1, 15, then every 28 days",
  cycles: "Until progression",
  drugs: [
    { drug: "Fulvestrant", dose: "500 mg (two 250 mg injections)", route: "IM", days: "Days 1, 15, 29, then q28d", notes: "One injection into each buttock" }
  ],
  support: {
    emetogenicity: "Minimal",
    gcsf: "Not applicable",
    premeds: ["Pre/perimenopausal: combine with ovarian suppression"]
  },
  modifications: [
    { trigger: "Injection-site reactions", action: "Common; rotate sites." },
    { trigger: "Bleeding risk / anticoagulation", action: "Give IM with caution (thrombocytopenia, bleeding disorders, anticoagulants)." }
  ],
  refs: [
    { label: "FALCON / CONFIRM", detail: "Robertson JFR et al. Lancet 2016 (FALCON, 1st-line 500 mg).", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(16)32389-3/fulltext" }
  ],
  verified: "2026-06-24",
  notes: "Most commonly used as the endocrine backbone with a CDK4/6 inhibitor or a targeted agent (alpelisib, capivasertib)."
},
{
  id: "aromatase-inhibitor",
  name: "Aromatase Inhibitor (letrozole / anastrozole / exemestane)",
  aliases: ["AI", "letrozole", "anastrozole", "exemestane", "Femara Arimidex Aromasin"],
  tumour: ["Breast — HR+/HER2−"],
  setting: ["Adjuvant (postmenopausal)", "Metastatic", "Backbone"],
  cycle: "Continuous daily oral",
  cycles: "Adjuvant 5–10 years; metastatic until progression",
  drugs: [
    { drug: "Letrozole", dose: "2.5 mg daily", route: "PO", days: "Continuous", notes: "Nonsteroidal" },
    { drug: "Anastrozole", dose: "1 mg daily", route: "PO", days: "Continuous", notes: "Nonsteroidal" },
    { drug: "Exemestane", dose: "25 mg daily", route: "PO", days: "Continuous", notes: "Steroidal" }
  ],
  support: {
    emetogenicity: "Minimal",
    gcsf: "Not applicable",
    premeds: ["Baseline + periodic bone density (DXA)", "Premenopausal: ineffective without ovarian suppression — use OFS or tamoxifen instead"]
  },
  modifications: [
    { trigger: "Arthralgia / myalgia", action: "Very common; analgesia, exercise; consider switching between AIs or to tamoxifen if intolerable." },
    { trigger: "Bone loss / fracture", action: "Monitor BMD; calcium/vitamin D; bisphosphonate or denosumab if osteopenia/osteoporosis." },
    { trigger: "Hyperlipidemia", action: "Monitor lipids." }
  ],
  refs: [
    { label: "BIG 1-98 / ATAC / MA.17", detail: "Foundational adjuvant AI trials.", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa052258" }
  ],
  verified: "2026-06-24"
},
{
  id: "tamoxifen",
  name: "Tamoxifen",
  aliases: ["Nolvadex", "SERM", "ATLAS"],
  tumour: ["Breast — HR+/HER2−"],
  setting: ["Adjuvant (pre- & postmenopausal)", "Metastatic", "Prevention"],
  cycle: "Continuous daily oral",
  cycles: "Adjuvant 5–10 years",
  drugs: [
    { drug: "Tamoxifen", dose: "20 mg daily", route: "PO", days: "Continuous" }
  ],
  support: {
    emetogenicity: "Minimal",
    gcsf: "Not applicable",
    premeds: ["Counsel to report abnormal vaginal bleeding"]
  },
  modifications: [
    { trigger: "VTE risk", action: "Increased thromboembolism; caution with prior VTE/immobilization/surgery." },
    { trigger: "Endometrial carcinoma / hyperplasia", action: "Investigate abnormal uterine bleeding promptly." },
    { trigger: "CYP2D6 interactions", action: "Avoid strong CYP2D6 inhibitors (e.g., paroxetine, fluoxetine, bupropion) — reduce active metabolite." }
  ],
  refs: [
    { label: "EBCTCG / ATLAS", detail: "Davies C et al. Lancet 2013 (10 vs 5 years).", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(12)61963-1/fulltext" }
  ],
  verified: "2026-06-24"
},
{
  id: "everolimus-exemestane",
  name: "Everolimus + Exemestane",
  aliases: ["BOLERO-2", "mTOR everolimus", "Afinitor"],
  tumour: ["Breast — HR+/HER2−"],
  setting: ["Metastatic", "After nonsteroidal AI"],
  cycle: "Continuous daily oral",
  cycles: "Until progression",
  drugs: [
    { drug: "Everolimus", dose: "10 mg daily", route: "PO", days: "Continuous" },
    { drug: "Exemestane", dose: "25 mg daily", route: "PO", days: "Continuous" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Not applicable",
    premeds: ["Prophylactic alcohol-free dexamethasone mouthwash from day 1 (SWISH) — markedly reduces stomatitis", "Monitor glucose, lipids, CBC"]
  },
  modifications: [
    { trigger: "Stomatitis", action: "Dexamethasone mouthwash prophylaxis; topical care; hold/reduce everolimus to 5 mg for grade ≥2." },
    { trigger: "Non-infectious pneumonitis", action: "Monitor for dyspnea/cough; hold + corticosteroids per grade." },
    { trigger: "Hyperglycemia / infections", action: "Monitor and treat; everolimus is immunosuppressive." }
  ],
  refs: [
    { label: "BOLERO-2 / SWISH", detail: "Baselga J et al. NEJM 2012;366:520; Rugo HS et al. Lancet Oncol 2017 (SWISH).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1109653" }
  ],
  verified: "2026-06-24"
},
{
  id: "alpelisib-fulvestrant",
  name: "Alpelisib + Fulvestrant",
  aliases: ["SOLAR-1", "Piqray", "PI3K alpelisib", "PIK3CA"],
  tumour: ["Breast — HR+/HER2−"],
  setting: ["Metastatic", "PIK3CA-mutant", "After endocrine therapy"],
  cycle: "Alpelisib daily; fulvestrant q28d",
  cycles: "Until progression",
  drugs: [
    { drug: "Alpelisib", dose: "300 mg daily", route: "PO", days: "Continuous (with food)" },
    { drug: "Fulvestrant", dose: "500 mg", route: "IM", days: "Days 1, 15, then q28d" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Not applicable",
    premeds: ["Baseline fasting glucose + HbA1c; optimize glycemic control before starting", "Consider prophylactic antihistamine to reduce rash"]
  },
  modifications: [
    { trigger: "Hyperglycemia (very common, dose-limiting)", action: "Monitor glucose; treat with metformin first-line; hold/reduce alpelisib (300 → 250 → 200) for persistent grade ≥2." },
    { trigger: "Rash", action: "Antihistamine prophylaxis reduces incidence; topical/oral steroids; hold/reduce for severe." },
    { trigger: "Diarrhea / stomatitis", action: "Supportive care; dose-reduce per grade." }
  ],
  refs: [
    { label: "SOLAR-1", detail: "André F et al. NEJM 2019;380:1929 (PIK3CA-mutated).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1813904" }
  ],
  verified: "2026-06-24",
  notes: "Requires a PIK3CA mutation (tumor or ctDNA)."
},
{
  id: "elacestrant",
  name: "Elacestrant",
  aliases: ["Orserdu", "EMERALD", "oral SERD", "ESR1"],
  tumour: ["Breast — HR+/HER2−"],
  setting: ["Metastatic", "ESR1-mutant", "After CDK4/6 + endocrine therapy"],
  cycle: "Continuous daily oral",
  cycles: "Until progression",
  drugs: [
    { drug: "Elacestrant", dose: "345 mg daily", route: "PO", days: "Continuous (with food)" }
  ],
  support: {
    emetogenicity: "Low–moderate",
    gcsf: "Not applicable",
    premeds: ["Antiemetic as needed for nausea"]
  },
  modifications: [
    { trigger: "Nausea (most common)", action: "Antiemetics; dose-reduce to 258 mg for persistent grade ≥2." },
    { trigger: "Dyslipidemia", action: "Monitor lipids." }
  ],
  refs: [
    { label: "EMERALD", detail: "Bidard FC et al. JCO 2022;40:3246 (ESR1-mutated).", url: "https://ascopubs.org/doi/10.1200/JCO.22.00338" }
  ],
  verified: "2026-06-24",
  notes: "Requires an ESR1 mutation; benefit greatest with longer prior CDK4/6 exposure."
},
{
  id: "capivasertib-fulvestrant",
  name: "Capivasertib + Fulvestrant",
  aliases: ["CAPItello-291", "Truqap", "AKT inhibitor", "PIK3CA AKT1 PTEN"],
  tumour: ["Breast — HR+/HER2−"],
  setting: ["Metastatic", "PIK3CA/AKT1/PTEN-altered", "After AI ± CDK4/6"],
  cycle: "28-day cycle (capivasertib 4 days on, 3 off)",
  cycles: "Until progression",
  drugs: [
    { drug: "Capivasertib", dose: "400 mg BID", route: "PO", days: "4 days on, 3 days off (each week)" },
    { drug: "Fulvestrant", dose: "500 mg", route: "IM", days: "Days 1, 15, then q28d" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Not applicable",
    premeds: ["Baseline glucose/HbA1c", "Counsel on diarrhea and rash"]
  },
  modifications: [
    { trigger: "Diarrhea (common)", action: "Antidiarrheals at onset; hold/reduce for grade ≥2 persistent. Dose levels 400 → 320 → 200 mg BID." },
    { trigger: "Rash (can be severe)", action: "Topical/oral steroids ± antihistamine; hold for grade ≥3; consider prophylaxis." },
    { trigger: "Hyperglycemia", action: "Monitor glucose; manage as for other PI3K/AKT-pathway agents." }
  ],
  refs: [
    { label: "CAPItello-291", detail: "Turner NC et al. NEJM 2023;388:2058 (PIK3CA/AKT1/PTEN-altered).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2214131" }
  ],
  verified: "2026-06-24"
},

/* ===================== GU ===================== */
{
  id: "gem-cis-bladder",
  name: "Gemcitabine + Cisplatin",
  aliases: ["GC bladder", "urothelial"],
  tumour: ["Bladder / Urothelial"],
  setting: ["Neoadjuvant", "Metastatic"],
  cycle: "Every 21–28 days",
  cycles: "4 (neoadjuvant) to 6 cycles",
  drugs: [
    { drug: "Gemcitabine", dose: "1000 mg/m²", route: "IV", days: "Days 1, 8 (±15)" },
    { drug: "Cisplatin", dose: "70 mg/m²", route: "IV", days: "Day 1 (or split day 1–2)" }
  ],
  support: {
    emetogenicity: "High (cisplatin)",
    gcsf: "Per risk",
    premeds: ["NK1 + 5-HT3 + dexamethasone", "Cisplatin hydration"]
  },
  modifications: [
    { trigger: "Cisplatin-ineligible", action: "If CrCl < 60, hearing loss, neuropathy, ECOG ≥2: substitute carboplatin (AUC 4.5–5)." },
    { trigger: "Hematologic", action: "Hold day 8/15 for cytopenias; reduce gemcitabine per nadir." }
  ],
  refs: [
    { label: "von der Maase H et al.", detail: "J Clin Oncol 2000;18:3068 (GC vs MVAC).", url: "https://ascopubs.org/doi/10.1200/JCO.2000.18.17.3068" }
  ],
  verified: "2026-06-24"
},
{
  id: "carbo-gem-urothelial",
  name: "Carboplatin + Gemcitabine",
  aliases: ["cisplatin-ineligible urothelial", "GCa"],
  tumour: ["Bladder / Urothelial"],
  setting: ["Metastatic", "1st line (cisplatin-ineligible)"],
  cycle: "Every 21 days",
  cycles: "4–6 cycles",
  drugs: [
    { drug: "Gemcitabine", dose: "1000 mg/m²", route: "IV", days: "Days 1, 8" },
    { drug: "Carboplatin", dose: "AUC 4.5–5", route: "IV", days: "Day 1" }
  ],
  support: {
    emetogenicity: "Moderate",
    gcsf: "Per risk",
    premeds: ["5-HT3 + dexamethasone"]
  },
  modifications: [
    { trigger: "Hematologic", action: "Common dose-limiting toxicity; hold day 8 / reduce per nadir. Many patients need dose reduction." },
    { trigger: "Renal (CKD 4–5)", action: "Poor outcomes/tolerance; consider alternatives." }
  ],
  refs: [
    { label: "EORTC 30986", detail: "De Santis M et al. J Clin Oncol 2012 (carbo/gem in cisplatin-unfit).", url: "https://ascopubs.org/doi/10.1200/JCO.2011.37.3571" }
  ],
  verified: "2026-06-24",
  notes: "First-line use is increasingly replaced by enfortumab vedotin + pembrolizumab where available."
},
{
  id: "ddmvac",
  name: "dose-dense MVAC",
  aliases: ["ddMVAC", "methotrexate vinblastine doxorubicin cisplatin"],
  tumour: ["Bladder / Urothelial"],
  setting: ["Neoadjuvant", "Metastatic"],
  cycle: "Every 14 days (with G-CSF)",
  cycles: "3–4 (neoadjuvant) to 6 cycles",
  drugs: [
    { drug: "Methotrexate", dose: "30 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Vinblastine", dose: "3 mg/m²", route: "IV", days: "Day 2" },
    { drug: "Doxorubicin", dose: "30 mg/m²", route: "IV", days: "Day 2" },
    { drug: "Cisplatin", dose: "70 mg/m²", route: "IV", days: "Day 2" }
  ],
  support: {
    emetogenicity: "High",
    gcsf: "Required (defines the dose-dense schedule)",
    premeds: ["NK1 + 5-HT3 + dexamethasone", "Cisplatin hydration"]
  },
  modifications: [
    { trigger: "Mucositis / cytopenias", action: "Leucovorin rescue if mucositis; dose-reduce per protocol." },
    { trigger: "Renal", action: "Cisplatin-ineligible patients should not receive this regimen." }
  ],
  refs: [
    { label: "Sternberg CN et al.", detail: "EORTC 30924 — dd-MVAC vs MVAC.", url: "https://ascopubs.org/doi/10.1200/JCO.2001.19.10.2638" }
  ],
  verified: "2026-06-24"
},
{
  id: "ev-pembro",
  name: "Enfortumab vedotin + Pembrolizumab",
  aliases: ["EV-302", "EV pembro", "Padcev Keytruda"],
  tumour: ["Bladder / Urothelial"],
  setting: ["Metastatic", "1st line"],
  cycle: "Every 21 days (EV days 1, 8)",
  cycles: "Until progression",
  drugs: [
    { drug: "Enfortumab vedotin", dose: "1.25 mg/kg (max 125 mg)", route: "IV", days: "Days 1, 8" },
    { drug: "Pembrolizumab", dose: "200 mg flat (or 400 mg q6w)", route: "IV", days: "Day 1" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Per risk",
    premeds: ["Monitor glucose (EV); skin checks"]
  },
  modifications: [
    { trigger: "Skin reactions (EV)", action: "BOXED WARNING — severe/SJS-TEN-like skin reactions. Hold for grade ≥2; permanently discontinue for SJS/TEN or grade ≥3." },
    { trigger: "Hyperglycemia (EV)", action: "Monitor glucose; hold if glucose > 250 mg/dL." },
    { trigger: "Peripheral neuropathy (EV)", action: "Hold for grade ≥2; dose-reduce; discontinue grade ≥3." },
    { trigger: "irAE (pembrolizumab)", action: "Manage per immune-toxicity grade." }
  ],
  refs: [
    { label: "EV-302 / KEYNOTE-A39", detail: "Powles T et al. NEJM 2024;390:875. mOS 31.5 vs 16.1 mo (HR 0.47).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2312117" }
  ],
  verified: "2026-06-24",
  notes: "New first-line standard for advanced urothelial carcinoma regardless of cisplatin eligibility."
},
{
  id: "enfortumab-mono",
  name: "Enfortumab vedotin (monotherapy)",
  aliases: ["Padcev", "EV-301"],
  tumour: ["Bladder / Urothelial"],
  setting: ["Metastatic", "Pretreated"],
  cycle: "28-day cycle (days 1, 8, 15)",
  cycles: "Until progression",
  drugs: [
    { drug: "Enfortumab vedotin", dose: "1.25 mg/kg (max 125 mg)", route: "IV", days: "Days 1, 8, 15" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Per risk",
    premeds: ["Monitor glucose; skin checks"]
  },
  modifications: [
    { trigger: "Skin reactions", action: "BOXED WARNING; hold/discontinue per severity (as above)." },
    { trigger: "Hyperglycemia", action: "Monitor and hold for glucose > 250 mg/dL." },
    { trigger: "Peripheral neuropathy", action: "Hold/reduce/discontinue per grade." }
  ],
  refs: [
    { label: "EV-301", detail: "Powles T et al. NEJM 2021;384:1125 (post-platinum + IO).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2035807" }
  ],
  verified: "2026-06-24"
},
{
  id: "docetaxel-prostate",
  name: "Docetaxel (+ prednisone)",
  aliases: ["taxotere prostate"],
  tumour: ["Prostate"],
  setting: ["mHSPC", "mCRPC"],
  cycle: "Every 21 days",
  cycles: "6 cycles (mHSPC) or until progression (mCRPC)",
  drugs: [
    { drug: "Docetaxel", dose: "75 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Prednisone", dose: "5 mg BID", route: "PO", days: "Daily (mCRPC)", notes: "Often omitted in mHSPC" }
  ],
  support: {
    emetogenicity: "Low–moderate",
    gcsf: "Per risk",
    premeds: ["Docetaxel: dexamethasone 8 mg premed × 3 doses"]
  },
  modifications: [
    { trigger: "Neutropenia", action: "Reduce docetaxel to 60 mg/m² after febrile neutropenia; add G-CSF." },
    { trigger: "Hepatic", action: "Avoid if bilirubin > ULN or marked transaminase + ALP elevation." },
    { trigger: "Neuropathy / fluid retention", action: "Dose-reduce/hold per grade." }
  ],
  refs: [
    { label: "CHAARTED / TAX 327", detail: "Sweeney CJ et al. NEJM 2015 (mHSPC); Tannock IF et al. NEJM 2004 (mCRPC).", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1503747" }
  ],
  verified: "2026-06-24"
},
{
  id: "cabazitaxel",
  name: "Cabazitaxel (+ prednisone)",
  aliases: ["jevtana"],
  tumour: ["Prostate"],
  setting: ["mCRPC (post-docetaxel)"],
  cycle: "Every 21 days",
  cycles: "Until progression",
  drugs: [
    { drug: "Cabazitaxel", dose: "25 mg/m² (20 mg/m² option)", route: "IV", days: "Day 1" },
    { drug: "Prednisone", dose: "5 mg BID", route: "PO", days: "Daily" }
  ],
  support: {
    emetogenicity: "Low–moderate",
    gcsf: "Primary prophylaxis recommended (esp. at 25 mg/m²)",
    premeds: ["Antihistamine + corticosteroid + H2 blocker premed"]
  },
  modifications: [
    { trigger: "Neutropenia", action: "20 mg/m² dose reduces toxicity with similar efficacy (PROSELICA); G-CSF support." },
    { trigger: "Diarrhea", action: "Aggressive supportive care; dose reduce for grade ≥3." }
  ],
  refs: [
    { label: "TROPIC / PROSELICA", detail: "de Bono JS et al. Lancet 2010; Eisenberger M et al. JCO 2017 (20 vs 25).", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(10)61389-X/fulltext" }
  ],
  verified: "2026-06-24"
},
{
  id: "nivo-ipi-rcc",
  name: "Nivolumab + Ipilimumab (RCC)",
  aliases: ["CheckMate 214", "ipi nivo kidney"],
  tumour: ["Renal cell carcinoma"],
  setting: ["Metastatic", "1st line (intermediate/poor risk)"],
  cycle: "Induction q3w × 4, then nivolumab maintenance",
  cycles: "4 induction doses, then maintenance until progression",
  drugs: [
    { drug: "Nivolumab", dose: "3 mg/kg", route: "IV", days: "Day 1 (induction)", notes: "Maintenance: 240 mg q2w or 480 mg q4w" },
    { drug: "Ipilimumab", dose: "1 mg/kg", route: "IV", days: "Day 1 (induction × 4 only)" }
  ],
  support: {
    emetogenicity: "Minimal",
    gcsf: "Not applicable",
    premeds: ["None routine"]
  },
  modifications: [
    { trigger: "Immune-related AE", action: "Combination has high irAE rate; hold + corticosteroids per organ/grade; permanently discontinue ipilimumab for many grade 3–4 events." },
    { trigger: "Endocrinopathy", action: "Monitor thyroid, adrenal, pituitary; hormone replacement as needed." }
  ],
  refs: [
    { label: "CheckMate 214", detail: "Motzer RJ et al. NEJM 2018;378:1277.", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1712126" }
  ],
  verified: "2026-06-24",
  notes: "Note RCC induction dosing (nivo 3 / ipi 1) differs from melanoma (nivo 1 / ipi 3)."
},

/* ===================== GYN ===================== */
{
  id: "carbo-paclitaxel",
  name: "Carboplatin + Paclitaxel",
  aliases: ["CP", "carbo taxol"],
  tumour: ["Ovarian", "Endometrial", "Lung — NSCLC"],
  setting: ["Adjuvant", "1st line", "Metastatic"],
  cycle: "Every 21 days",
  cycles: "6 cycles",
  drugs: [
    { drug: "Paclitaxel", dose: "175 mg/m² over 3h", route: "IV", days: "Day 1" },
    { drug: "Carboplatin", dose: "AUC 5–6", route: "IV", days: "Day 1", notes: "Give after paclitaxel" }
  ],
  support: {
    emetogenicity: "Moderate",
    gcsf: "Per risk",
    premeds: ["Paclitaxel: dexamethasone + H1/H2 premed", "5-HT3 + dexamethasone"]
  },
  modifications: [
    { trigger: "Neuropathy", action: "Hold/reduce paclitaxel for grade ≥2." },
    { trigger: "Hematologic", action: "Carboplatin dosed by Calvert AUC; reduce per nadir counts / renal function." },
    { trigger: "Hypersensitivity", action: "Carboplatin reactions increase after ~6+ exposures; consider desensitization." }
  ],
  refs: [
    { label: "GOG-111 / dose-dense JGOG", detail: "Foundational platinum-taxane data in ovarian cancer.", url: "https://ascopubs.org/doi/10.1200/JCO.2000.18.1.106" }
  ],
  verified: "2026-06-24",
  notes: "Weekly dose-dense paclitaxel (80 mg/m² days 1,8,15) is an alternative schedule."
},
{
  id: "carbo-pac-bev",
  name: "Carboplatin + Paclitaxel + Bevacizumab",
  aliases: ["GOG-218", "ICON7"],
  tumour: ["Ovarian", "Cervical"],
  setting: ["1st line", "Metastatic"],
  cycle: "Every 21 days",
  cycles: "6 cycles chemo + bevacizumab maintenance",
  drugs: [
    { drug: "Paclitaxel", dose: "175 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Carboplatin", dose: "AUC 5–6", route: "IV", days: "Day 1" },
    { drug: "Bevacizumab", dose: "7.5–15 mg/kg", route: "IV", days: "Day 1", notes: "Continue as maintenance" }
  ],
  support: {
    emetogenicity: "Moderate",
    gcsf: "Per risk",
    premeds: ["Paclitaxel premed", "Antiemetics per protocol"]
  },
  modifications: [
    { trigger: "Bevacizumab — BP/proteinuria", action: "Hold for uncontrolled hypertension or proteinuria > 2 g/24h." },
    { trigger: "GI perforation risk", action: "Avoid with bowel involvement / recent surgery; counsel on perforation/fistula." }
  ],
  refs: [
    { label: "GOG-218 / ICON7", detail: "Burger RA et al. NEJM 2011; Perren TJ et al. NEJM 2011.", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1104390" }
  ],
  verified: "2026-06-24"
},
{
  id: "carbo-pac-pembro-endometrial",
  name: "Carboplatin + Paclitaxel + Pembrolizumab (Endometrial)",
  aliases: ["NRG-GY018", "pembro endometrial chemo"],
  tumour: ["Endometrial"],
  setting: ["Advanced / Recurrent", "1st line"],
  cycle: "Every 21 days",
  cycles: "6 cycles, then pembrolizumab maintenance q6w",
  drugs: [
    { drug: "Pembrolizumab", dose: "200 mg q3w (then 400 mg q6w maintenance)", route: "IV", days: "Day 1" },
    { drug: "Paclitaxel", dose: "175 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Carboplatin", dose: "AUC 5", route: "IV", days: "Day 1" }
  ],
  support: {
    emetogenicity: "Moderate",
    gcsf: "Per risk",
    premeds: ["Paclitaxel premed", "Antiemetics per protocol"]
  },
  modifications: [
    { trigger: "Benefit by MMR status", action: "Largest benefit in dMMR; also approved/active in pMMR." },
    { trigger: "irAE", action: "Hold/discontinue pembrolizumab + steroids per grade." },
    { trigger: "Neuropathy / heme", action: "Reduce paclitaxel/carboplatin per grade." }
  ],
  refs: [
    { label: "NRG-GY018", detail: "Eskander RN et al. NEJM 2023;388:2159.", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2302312" }
  ],
  verified: "2026-06-24"
},
{
  id: "pembro-lenvatinib",
  name: "Pembrolizumab + Lenvatinib",
  aliases: ["KEYNOTE-775", "lenva pembro endometrial"],
  tumour: ["Endometrial"],
  setting: ["Advanced", "Pretreated (pMMR)"],
  cycle: "Pembrolizumab q3w; lenvatinib daily",
  cycles: "Until progression",
  drugs: [
    { drug: "Lenvatinib", dose: "20 mg daily", route: "PO", days: "Continuous" },
    { drug: "Pembrolizumab", dose: "200 mg q3w (or 400 mg q6w)", route: "IV", days: "Day 1" }
  ],
  support: {
    emetogenicity: "Low (oral TKI)",
    gcsf: "Not applicable",
    premeds: ["BP monitoring; counsel on diarrhea, fatigue"]
  },
  modifications: [
    { trigger: "Lenvatinib toxicity (very common)", action: "Most patients require dose reduction (20 → 14 → 10 → 8 mg) and/or interruption for HTN, diarrhea, fatigue, proteinuria, hand-foot." },
    { trigger: "Hypertension", action: "Optimize antihypertensives; hold lenvatinib for severe HTN." },
    { trigger: "irAE (pembrolizumab)", action: "Manage per immune-toxicity grade." }
  ],
  refs: [
    { label: "KEYNOTE-775 / Study 309", detail: "Makker V et al. NEJM 2022;386:437.", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2108330" }
  ],
  verified: "2026-06-24"
},
{
  id: "pembro-chemo-cervical",
  name: "Pembrolizumab + Chemotherapy ± Bevacizumab (Cervical)",
  aliases: ["KEYNOTE-826", "pembro cervical"],
  tumour: ["Cervical"],
  setting: ["Persistent / Recurrent / Metastatic", "1st line"],
  cycle: "Every 21 days",
  cycles: "Chemo 6 cycles; pembrolizumab up to 35 cycles (± bevacizumab maintenance)",
  drugs: [
    { drug: "Pembrolizumab", dose: "200 mg q3w (or 400 mg q6w)", route: "IV", days: "Day 1" },
    { drug: "Paclitaxel", dose: "175 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Cisplatin (or Carboplatin)", dose: "cisplatin 50 mg/m² or carboplatin AUC 5", route: "IV", days: "Day 1" },
    { drug: "Bevacizumab", dose: "15 mg/kg", route: "IV", days: "Day 1", notes: "Optional; add unless contraindicated" }
  ],
  support: {
    emetogenicity: "Moderate–high (cisplatin)",
    gcsf: "Per risk",
    premeds: ["Paclitaxel premed", "Cisplatin hydration", "Antiemetics per protocol"]
  },
  modifications: [
    { trigger: "PD-L1 CPS", action: "Benefit established for CPS ≥1." },
    { trigger: "Bevacizumab", action: "Counsel/monitor for fistula, perforation, bleeding, HTN, proteinuria." },
    { trigger: "irAE", action: "Hold/discontinue pembrolizumab per grade." }
  ],
  refs: [
    { label: "KEYNOTE-826", detail: "Colombo N et al. NEJM 2021;385:1856.", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2112435" }
  ],
  verified: "2026-06-24"
},
{
  id: "pld",
  name: "Pegylated liposomal doxorubicin (PLD)",
  aliases: ["Doxil", "Caelyx", "liposomal doxorubicin"],
  tumour: ["Ovarian"],
  setting: ["Recurrent", "Metastatic"],
  cycle: "Every 28 days",
  cycles: "Until progression",
  drugs: [
    { drug: "Pegylated liposomal doxorubicin", dose: "40–50 mg/m²", route: "IV", days: "Day 1", notes: "Often combined with carboplatin in platinum-sensitive relapse" }
  ],
  support: {
    emetogenicity: "Low–moderate",
    gcsf: "Per risk",
    premeds: ["Antiemetic per protocol"]
  },
  modifications: [
    { trigger: "Hand-foot syndrome (PPE)", action: "Dose-limiting; delay and reduce dose for grade ≥2; cooling measures." },
    { trigger: "Stomatitis", action: "Dose-reduce/delay per grade." },
    { trigger: "Cardiac", action: "Cumulative anthracycline cardiotoxicity still applies; monitor LVEF." }
  ],
  refs: [
    { label: "CALYPSO", detail: "Pujade-Lauraine E et al. J Clin Oncol 2010 (carbo + PLD, platinum-sensitive relapse).", url: "https://ascopubs.org/doi/10.1200/JCO.2009.25.4649" }
  ],
  verified: "2026-06-24"
},

/* ===================== MELANOMA / IMMUNOTHERAPY ===================== */
{
  id: "nivo-ipi-melanoma",
  name: "Nivolumab + Ipilimumab (Melanoma)",
  aliases: ["CheckMate 067", "ipi nivo melanoma"],
  tumour: ["Melanoma"],
  setting: ["Unresectable / Metastatic", "1st line"],
  cycle: "Induction q3w × 4, then nivolumab maintenance",
  cycles: "4 induction doses, then maintenance up to 2 years",
  drugs: [
    { drug: "Nivolumab", dose: "1 mg/kg", route: "IV", days: "Day 1 (induction)", notes: "Maintenance: 240 mg q2w or 480 mg q4w" },
    { drug: "Ipilimumab", dose: "3 mg/kg", route: "IV", days: "Day 1 (induction × 4 only)" }
  ],
  support: {
    emetogenicity: "Minimal",
    gcsf: "Not applicable",
    premeds: ["None routine"]
  },
  modifications: [
    { trigger: "Immune-related AE", action: "High-grade irAE in ~40–60%; hold + corticosteroids (± second-line immunosuppression) per organ/grade; permanently discontinue many grade 3–4 events." },
    { trigger: "Colitis / hepatitis / pneumonitis / endocrinopathy", action: "Manage per irAE guidelines; do not dose-reduce — hold/discontinue." }
  ],
  refs: [
    { label: "CheckMate 067", detail: "Larkin J et al. NEJM 2015;373:23; 6.5-yr OS update.", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1504030" }
  ],
  verified: "2026-06-24",
  notes: "Melanoma induction dosing (nivo 1 / ipi 3) differs from RCC (nivo 3 / ipi 1)."
},
{
  id: "nivo-relatlimab",
  name: "Nivolumab + Relatlimab (Opdualag)",
  aliases: ["RELATIVITY-047", "LAG-3", "Opdualag"],
  tumour: ["Melanoma"],
  setting: ["Unresectable / Metastatic", "1st line"],
  cycle: "Every 4 weeks (fixed-dose combination)",
  cycles: "Until progression",
  drugs: [
    { drug: "Nivolumab", dose: "480 mg flat", route: "IV", days: "Day 1", notes: "Fixed-dose combination with relatlimab" },
    { drug: "Relatlimab", dose: "160 mg flat", route: "IV", days: "Day 1" }
  ],
  support: {
    emetogenicity: "Minimal",
    gcsf: "Not applicable",
    premeds: ["None routine"]
  },
  modifications: [
    { trigger: "Immune-related AE", action: "Lower high-grade irAE rate than nivo+ipi; hold/discontinue + steroids per organ/grade." },
    { trigger: "Myocarditis / endocrinopathy", action: "Monitor; manage per irAE guidelines." }
  ],
  refs: [
    { label: "RELATIVITY-047", detail: "Tawbi HA et al. NEJM 2022;386:24.", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2109970" }
  ],
  verified: "2026-06-24"
},
{
  id: "dab-tram",
  name: "Dabrafenib + Trametinib",
  aliases: ["BRAF MEK", "dabrafenib trametinib", "COMBI-d COMBI-v"],
  tumour: ["Melanoma", "Lung — NSCLC", "Thyroid (anaplastic)"],
  setting: ["BRAF V600-mutant", "Adjuvant / Metastatic"],
  cycle: "Continuous daily oral",
  cycles: "Until progression (12 months adjuvant melanoma)",
  drugs: [
    { drug: "Dabrafenib", dose: "150 mg BID", route: "PO", days: "Continuous", notes: "Take ≥1h before / 2h after meals" },
    { drug: "Trametinib", dose: "2 mg daily", route: "PO", days: "Continuous" }
  ],
  support: {
    emetogenicity: "Low",
    gcsf: "Not applicable",
    premeds: ["Counsel on pyrexia; BP and LVEF monitoring; skin checks"]
  },
  modifications: [
    { trigger: "Pyrexia (dabrafenib)", action: "Common; interrupt both drugs for fever ≥38.5°C; antipyretics; resume at same/reduced dose per recurrence." },
    { trigger: "LVEF decline (trametinib)", action: "Monitor LVEF; hold/reduce for significant drop." },
    { trigger: "Ocular (retinal vein occlusion / RPED)", action: "Ophthalmology referral; hold per findings." }
  ],
  refs: [
    { label: "COMBI-d / COMBI-v", detail: "Long GV et al. NEJM 2014; Robert C et al. NEJM 2015.", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1414428" }
  ],
  verified: "2026-06-24"
},

/* ===================== HEAD & NECK ===================== */
{
  id: "cisplatin-concurrent",
  name: "Cisplatin (concurrent with RT)",
  aliases: ["high-dose cisplatin chemoradiation", "weekly cisplatin"],
  tumour: ["Head & Neck", "Cervical"],
  setting: ["Definitive chemoRT", "Adjuvant chemoRT"],
  cycle: "q3w (100 mg/m²) or weekly (40 mg/m²)",
  cycles: "3 doses (q3w) over the RT course",
  drugs: [
    { drug: "Cisplatin", dose: "100 mg/m² q3w (or 40 mg/m² weekly)", route: "IV", days: "Days 1, 22, 43 with RT" }
  ],
  support: {
    emetogenicity: "High (100 mg/m²); moderate (weekly 40)",
    gcsf: "Per risk",
    premeds: ["NK1 + 5-HT3 + dexamethasone", "Vigorous hydration + Mg/K repletion"]
  },
  modifications: [
    { trigger: "Renal / ototoxicity / neuropathy", action: "Weekly 40 mg/m² better tolerated; switch from q3w if toxicity. Carboplatin/cetuximab if cisplatin-ineligible." },
    { trigger: "Cisplatin-ineligible (CrCl < 50)", action: "Consider carboplatin-based or cetuximab-RT (less preferred)." }
  ],
  refs: [
    { label: "Pignon JP et al. (MACH-NC)", detail: "Radiother Oncol 2009 — concurrent cisplatin survival benefit.", url: "https://www.sciencedirect.com/science/article/pii/S0167814009003715" }
  ],
  verified: "2026-06-24"
},
{
  id: "tpf",
  name: "TPF (Docetaxel + Cisplatin + 5-FU)",
  aliases: ["induction TPF", "docetaxel cisplatin fluorouracil"],
  tumour: ["Head & Neck"],
  setting: ["Induction"],
  cycle: "Every 21 days",
  cycles: "3 cycles induction",
  drugs: [
    { drug: "Docetaxel", dose: "75 mg/m²", route: "IV", days: "Day 1" },
    { drug: "Cisplatin", dose: "75 mg/m²", route: "IV", days: "Day 1" },
    { drug: "5-FU", dose: "750 mg/m²/day", route: "IV continuous", days: "Days 1–5" }
  ],
  support: {
    emetogenicity: "High",
    gcsf: "Primary prophylaxis recommended",
    premeds: ["Docetaxel: dexamethasone premed", "NK1 + 5-HT3 + dexamethasone", "Antibiotic prophylaxis often advised", "Cisplatin hydration"]
  },
  modifications: [
    { trigger: "Febrile neutropenia / mucositis", action: "G-CSF + antibiotic prophylaxis; dose reduce per grade." },
    { trigger: "DPYD variant", action: "Reduce/avoid 5-FU." }
  ],
  refs: [
    { label: "TAX 323 / TAX 324", detail: "Vermorken JB et al. NEJM 2007; Posner MR et al. NEJM 2007.", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa071028" }
  ],
  verified: "2026-06-24"
},
{
  id: "keynote-048",
  name: "Pembrolizumab + Carboplatin + 5-FU",
  aliases: ["KEYNOTE-048", "pembro chemo head neck"],
  tumour: ["Head & Neck"],
  setting: ["Recurrent / Metastatic", "1st line"],
  cycle: "Every 21 days",
  cycles: "6 cycles chemo + pembrolizumab, then pembrolizumab maintenance",
  drugs: [
    { drug: "Pembrolizumab", dose: "200 mg flat", route: "IV", days: "Day 1" },
    { drug: "Carboplatin", dose: "AUC 5", route: "IV", days: "Day 1", notes: "Cisplatin 100 mg/m² an alternative" },
    { drug: "5-FU", dose: "1000 mg/m²/day", route: "IV continuous", days: "Days 1–4" }
  ],
  support: {
    emetogenicity: "Moderate–high",
    gcsf: "Per risk",
    premeds: ["Antiemetics per protocol"]
  },
  modifications: [
    { trigger: "irAE", action: "Manage pembrolizumab per immune-toxicity grade." },
    { trigger: "DPYD variant", action: "Reduce/avoid 5-FU." }
  ],
  refs: [
    { label: "KEYNOTE-048", detail: "Burtness B et al. Lancet 2019;394:1915.", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(19)32591-7/fulltext" }
  ],
  verified: "2026-06-24",
  notes: "Pembrolizumab monotherapy preferred for CPS ≥1 in many cases; chemo combination for higher disease burden."
}

];
