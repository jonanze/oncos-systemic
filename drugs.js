/*
 * OncOS — Systemic Therapy : per-drug data
 * ==========================================================================
 * One entry per drug. Each card renders: identity header, FDA boxed warning
 * (if any), an indication table (HSA · FDA · EMA · dose), CDL status, common
 * toxicities, and dose-reduction levels. Scope is REGULATORY ON-LABEL ONLY —
 * list only indications on the FDA / EMA / HSA label; no off-label rows.
 *
 * SOURCING (propose-then-write): every field traces to a primary source —
 * HSA register / Singapore package insert, FDA label (DailyMed/Drugs@FDA),
 * EMA SmPC, MOH Cancer Drug List / SDL-MAF. Where regulators conflict,
 * HSA (local) governs the indication set + dose. Never fabricate a dose;
 * mark anything unconfirmed rather than guessing. Update `verified` on change.
 *
 * FIELD REFERENCE
 *   id            unique slug, lowercase-with-hyphens
 *   name          INN (display name)
 *   aliases       [..] brand names / abbreviations (searchable)
 *   class         drug class (filter chip), e.g. "Antimetabolite"
 *   subclass      finer class label (chip), optional
 *   route         [..] "IV" | "PO" | ... (filter chip)
 *   atc           ATC code, optional
 *   brands        [..] registered brand names (shown in header)
 *   tumours       [..] tumour types for the filter chip (derive from indications)
 *   mechanism     one-line mechanism of action
 *   boxedWarning  string — FDA boxed warning (omit if none)
 *   indications   [{ indication, hsa, fda, dose }]
 *                   hsa/fda: "y" = on label, "n" = not on label
 *                   (EMA column removed 2026-06-29; any legacy `ema` key is ignored)
 *   cdl           { class: "SDL"|"MAF"|"Not listed", wording: "<verbatim CDL text>" }
 *                   for indication-specific CDL (e.g. MAF drugs) use instead:
 *                   { class, limit?: "<MSHL limit>", items: [{ cancer, text }] }
 *   toxicities    { common:[..], serious:[..] }
 *   doseReductions{ toxicityTable:[{grade, levels:[1st,2nd,3rd]}], renal, hepatic?, other:[{label,text}] }
 *   sources       string — source list shown in the footer
 *   verified      "YYYY-MM-DD" last reviewed
 * --------------------------------------------------------------------------
 */

window.DRUGS = [

{
  id: "capecitabine",
  name: "Capecitabine",
  aliases: ["Xeloda", "Capetero", "Incitabine", "Intacape", "Kapetral", "cape"],
  class: "Antimetabolite",
  subclass: "Fluoropyrimidine",
  route: ["PO"],
  atc: "L01BC06",
  brands: ["Xeloda", "Capetero", "Incitabine", "Intacape", "Kapetral"],
  tumours: ["Colorectal", "Gastric", "Breast"],
  mechanism: "Oral 5-FU prodrug — activated by thymidine phosphorylase, inhibits thymidylate synthase.",
  boxedWarning: "Coumarin anticoagulant interaction (warfarin, phenprocoumon): monitor INR/PT frequently. Altered coagulation and bleeding, including death, reported — onset days to months after starting, up to 1 month after stopping. Higher risk if age >60 or cancer.",
  indications: [
    { indication: "Colon, adjuvant",            hsa: "y", fda: "y", dose: "1250 mg/m² BID, D1–14 q3w × 8 (6 mo)" },
    { indication: "Colorectal, metastatic",      hsa: "y", fda: "y", dose: "1250 mg/m² BID, D1–14 q3w" },
    { indication: "Gastric, advanced",           hsa: "y", fda: "n", dose: "1000 mg/m² BID, D1–14 q3w (+ platinum)" },
    { indication: "Breast, advanced/metastatic", hsa: "y", fda: "y", dose: "1250 mg/m² BID, D1–14 q3w — monotherapy, or + docetaxel 75 mg/m² q3w" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: [
      "Hand–foot syndrome ~54–60%",
      "Diarrhoea ~55%",
      "Hyperbilirubinaemia ~48% (G3/4 ~15%/4%)",
      "Nausea ~43–53%, vomiting ~27–37%",
      "Fatigue ~42%, abdominal pain ~35%, stomatitis"
    ],
    serious: ["Coronary vasospasm", "Severe diarrhoea", "Rare SJS/TEN"]
  },
  doseReductions: {
    toxicityTable: [
      { grade: "G2", levels: ["100%", "75%", "50%"] },
      { grade: "G3", levels: ["75%", "50%", "stop"] },
      { grade: "G4", levels: ["50%/stop", "stop", "—"] }
    ],
    renal: "CrCl 30–50 → 75%; <30 contraindicated.",
    other: [
      { label: "DPD", text: "complete deficiency contraindicated; test DPYD/uracil pre-Rx (EMA)." }
    ]
  },
  sources: "HSA register / SG package insert (SIN10677P, Prescription Only) · FDA label (DailyMed) · EMA SmPC · MOH SDL / Cancer Drug List",
  verified: "2026-06-29"
},

{
  id: "carboplatin",
  name: "Carboplatin",
  aliases: ["Paraplatin", "DBL Carboplatin", "Kemocarb", "Carbotinol", "CBDCA"],
  class: "Platinum",
  subclass: "Alkylating-like",
  route: ["IV"],
  atc: "L01XA02",
  brands: ["Paraplatin", "DBL Carboplatin", "Kemocarb", "Carbotinol"],
  tumours: ["Ovarian", "Lung — SCLC", "Head & Neck"],
  mechanism: "Platinum agent — forms DNA crosslinks; less nephro-, oto- and neurotoxic but more myelosuppressive than cisplatin.",
  boxedWarning: "Bone-marrow suppression — dose-related, may be severe (infection and/or bleeding). Anaphylactic-like reactions within minutes of administration. Administer under the supervision of a physician experienced with cancer chemotherapy.",
  indications: [
    { indication: "Ovarian, advanced (epithelial)", hsa: "y", fda: "y", dose: "Calvert AUC 5–6 q3–4w (AUC 4–6 if recurrent / single agent)" },
    { indication: "Lung — small cell",              hsa: "y", fda: "n", dose: "Calvert AUC 5–6 q3w" },
    { indication: "Head & neck",                    hsa: "y", fda: "n", dose: "Calvert AUC 5–6 q3w (regimen-dependent)" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: [
      "Thrombocytopenia — dose-limiting (66% <100k, 33% <50k)",
      "Neutropenia, anaemia",
      "Nausea/vomiting — moderate",
      "Peripheral neuropathy 4–6% (↑ elderly / cisplatin-pretreated)",
      "Less nephro-, oto- and neurotoxic than cisplatin"
    ],
    serious: ["Severe myelosuppression", "Hypersensitivity / anaphylaxis (~2%, risk rises with repeated cycles)"]
  },
  doseReductions: {
    renal: "Dose by Calvert formula — total mg = AUC × (GFR + 25). If dosed by BSA: CrCl 41–59 → 250 mg/m²; 16–40 → 200 mg/m².",
    other: [
      { label: "Myelosuppression", text: "adjust % of prior dose by nadir counts — plt >100k & ANC >2000 → up to 125%; plt 50–100k / ANC 500–2000 → 100%; plt <50k / ANC <500 → 75%." }
    ]
  },
  sources: "HSA SG package insert (DBL Carboplatin, SIN02301P, §4.1) · FDA label (DailyMed) · Calvert et al. (AUC dosing) · MOH SDL / Cancer Drug List",
  verified: "2026-06-29"
},

{
  id: "cisplatin",
  name: "Cisplatin",
  aliases: ["Platinol", "DBL Cisplatin", "CDDP"],
  class: "Platinum",
  subclass: "Alkylating-like",
  route: ["IV"],
  atc: "L01XA01",
  brands: ["Platinol", "DBL Cisplatin"],
  tumours: ["Testicular", "Ovarian", "Bladder", "Head & Neck"],
  mechanism: "Platinum agent — forms intrastrand DNA crosslinks, blocking replication and transcription.",
  boxedWarning: "Nephrotoxicity — severe, including acute renal failure; ensure adequate hydration. Dose-related peripheral neuropathy. Severe nausea and vomiting — premedicate with antiemetics. Myelosuppression — severe, with fatal infections. Cumulative ototoxicity.",
  indications: [
    { indication: "Testicular (germ cell), metastatic", hsa: "y", fda: "y", dose: "20 mg/m² daily × 5, per cycle" },
    { indication: "Ovarian, advanced",                  hsa: "y", fda: "y", dose: "75–100 mg/m² q3–4w" },
    { indication: "Bladder, advanced",                  hsa: "y", fda: "y", dose: "50–70 mg/m² q3–4w" },
    { indication: "Head & neck, squamous cell",         hsa: "y", fda: "n", dose: "100 mg/m² q3w (e.g. concurrent chemoRT)" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: [
      "Highly emetogenic — severe nausea/vomiting",
      "Nephrotoxicity — dose-related; needs hydration + Mg/K repletion",
      "Ototoxicity — high-frequency hearing loss, tinnitus, vestibular",
      "Peripheral neuropathy — stocking-glove, may be irreversible",
      "Electrolyte wasting — Mg, K, Na, Ca"
    ],
    serious: ["Acute renal failure", "Severe myelosuppression", "Anaphylactic-like reactions"]
  },
  doseReductions: {
    renal: "Reduce dose or use an alternative in renal impairment; repeat dosing requires serum creatinine <1.5 mg/dL, platelets ≥100k, WBC ≥4k.",
    other: [
      { label: "Oto/neurotoxicity", text: "hold or switch (e.g. to carboplatin) for significant hearing loss or neuropathy." }
    ]
  },
  sources: "HSA SG package insert (DBL Cisplatin, Prescription Only) · FDA label (DailyMed) · MOH SDL / Cancer Drug List",
  verified: "2026-06-29"
},

{
  id: "oxaliplatin",
  name: "Oxaliplatin",
  aliases: ["Eloxatin", "Oliplat", "Hovid Oxaliplatin", "L-OHP"],
  class: "Platinum",
  subclass: "Alkylating-like",
  route: ["IV"],
  atc: "L01XA03",
  brands: ["Eloxatin", "Oliplat", "Hovid Oxaliplatin"],
  tumours: ["Colorectal"],
  mechanism: "Platinum agent — forms DNA crosslinks; partners with infusional 5-FU / leucovorin (FOLFOX).",
  boxedWarning: "Anaphylaxis and serious hypersensitivity reactions — can occur within minutes of administration, during any cycle, and may be fatal. Administer under supervision with emergency treatment available.",
  indications: [
    { indication: "Colon, adjuvant",      hsa: "y", fda: "y", dose: "85 mg/m² D1 q2w × 12 (+ infusional 5-FU/LV)" },
    { indication: "Colorectal, advanced", hsa: "y", fda: "y", dose: "85 mg/m² D1 q2w (+ infusional 5-FU/LV)" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: [
      "Peripheral sensory neuropathy — acute cold-triggered (dysaesthesia, pharyngolaryngeal) and cumulative dose-dependent",
      "Nausea/vomiting, diarrhoea",
      "Myelosuppression (with 5-FU)",
      "Fatigue"
    ],
    serious: ["Anaphylaxis / hypersensitivity", "Cumulative sensory neuropathy (may persist)", "Rare pulmonary fibrosis, PRES, hepatic sinusoidal injury"]
  },
  doseReductions: {
    renal: "Use caution in renal impairment; reduce starting dose for severe impairment.",
    other: [
      { label: "Neuropathy", text: "persistent grade 2 → consider dose reduction; grade 3 → reduce or discontinue. Acute cold-induced — prolong infusion to 6 h and avoid cold exposure." }
    ]
  },
  sources: "HSA SG package insert (Eloxatin, SIN13237P) · FDA label (Eloxatin, DailyMed) · MOH SDL / Cancer Drug List",
  verified: "2026-06-29"
},

{
  id: "fluorouracil",
  name: "Fluorouracil (5-FU)",
  aliases: ["5-FU", "5-fluorouracil", "DBL Fluorouracil"],
  class: "Antimetabolite",
  subclass: "Fluoropyrimidine",
  route: ["IV"],
  atc: "L01BC02",
  brands: ["DBL Fluorouracil"],
  tumours: ["Colorectal", "Breast", "Gastric", "Pancreatic"],
  mechanism: "Fluoropyrimidine — metabolites inhibit thymidylate synthase and incorporate into RNA/DNA.",
  boxedWarning: "DPD deficiency — patients with complete dihydropyrimidine dehydrogenase deficiency are at high risk of serious or fatal toxicity (mucositis, diarrhoea, neutropenia, neurotoxicity). Test for DPYD variants before starting; avoid in complete DPD deficiency. (FDA, 2024.)",
  indications: [
    { indication: "Colorectal", hsa: "y", fda: "y", dose: "Regimen-based — e.g. 400 mg/m² bolus + 2400 mg/m² over 46 h q2w (FOLFOX/FOLFIRI)" },
    { indication: "Breast",     hsa: "y", fda: "y", dose: "Regimen-based (e.g. CMF/FEC)" },
    { indication: "Gastric",    hsa: "y", fda: "y", dose: "Regimen-based (e.g. FLOT, ECF/EOX)" },
    { indication: "Pancreatic", hsa: "y", fda: "y", dose: "400 mg/m² bolus + 2400 mg/m² over 46 h (FOLFIRINOX)" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: [
      "Mucositis / stomatitis",
      "Diarrhoea",
      "Myelosuppression — neutropenia",
      "Hand–foot syndrome (with infusional/protracted)",
      "Coronary vasospasm / cardiotoxicity (chest pain during infusion)"
    ],
    serious: ["Severe toxicity in DPD deficiency", "Cardiac ischaemia", "Hyperammonaemic encephalopathy (rare)"]
  },
  doseReductions: {
    other: [
      { label: "DPD", text: "complete deficiency contraindicated; partial — reduce and titrate. Test DPYD/uracil pre-Rx." },
      { label: "Cardiac", text: "stop for chest pain / coronary vasospasm; rechallenge hazardous." },
      { label: "Mucositis / diarrhoea / myelosuppression", text: "hold for grade ≥3; resume reduced on recovery." }
    ]
  },
  sources: "HSA SG package insert · FDA label (DailyMed, 2024 DPD boxed warning) · MOH SDL / Cancer Drug List",
  verified: "2026-06-30"
},

{
  id: "gemcitabine",
  name: "Gemcitabine",
  aliases: ["Gemzar", "dFdC", "DBL Gemcitabine"],
  class: "Antimetabolite",
  subclass: "Nucleoside analogue",
  route: ["IV"],
  atc: "L01BC05",
  brands: ["Gemzar", "DBL Gemcitabine"],
  tumours: ["Lung — NSCLC", "Pancreatic", "Bladder", "Breast", "Ovarian"],
  mechanism: "Pyrimidine nucleoside analogue — incorporates into DNA (masked chain termination); inhibits ribonucleotide reductase.",
  indications: [
    { indication: "Lung — non-small cell", hsa: "y", fda: "y", dose: "1000–1250 mg/m² D1,8 (±15) — + cisplatin 1L, or monotherapy" },
    { indication: "Pancreatic",            hsa: "y", fda: "y", dose: "1000 mg/m² weekly × 7, then D1,8,15 q4w" },
    { indication: "Bladder, advanced",     hsa: "y", fda: "n", dose: "1000 mg/m² D1,8,15 q4w (+ cisplatin)" },
    { indication: "Breast",                hsa: "y", fda: "y", dose: "1250 mg/m² D1,8 q3w (+ paclitaxel)" },
    { indication: "Ovarian, relapsed",     hsa: "n", fda: "y", dose: "1000 mg/m² D1,8 q3w (+ carboplatin)" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: [
      "Myelosuppression — thrombocytopenia prominent, neutropenia, anaemia",
      "Flu-like symptoms, fever",
      "Transaminitis",
      "Peripheral oedema",
      "Rash, nausea"
    ],
    serious: ["Haemolytic-uraemic syndrome / TMA", "Interstitial pneumonitis / ARDS", "Capillary leak syndrome", "PRES"]
  },
  doseReductions: {
    renal: "Caution in renal/hepatic impairment; for HUS/TMA — discontinue, do not rechallenge.",
    other: [
      { label: "Myelosuppression (day 8/15)", text: "ANC ≥1000 & plt ≥100k → 100%; ANC 500–999 or plt 50–99k → 75%; ANC <500 or plt <50k → hold." }
    ]
  },
  sources: "HSA SG package insert (Gemzar, SIN13229P) · FDA label (DailyMed) · MOH SDL / Cancer Drug List",
  verified: "2026-06-30"
},

{
  id: "methotrexate",
  name: "Methotrexate",
  aliases: ["MTX", "amethopterin", "Abitrexate", "DBL Methotrexate"],
  class: "Antimetabolite",
  subclass: "Antifolate (DHFR inhibitor)",
  route: ["IV", "IM", "PO", "IT"],
  atc: "L01BA01",
  brands: ["Abitrexate", "DBL Methotrexate"],
  tumours: ["Gestational trophoblastic", "Lymphoma", "Breast", "Head & Neck", "Osteosarcoma"],
  mechanism: "Antifolate — inhibits dihydrofolate reductase, blocking tetrahydrofolate and purine/thymidylate synthesis.",
  boxedWarning: "Multiple — embryo-fetal toxicity / death (avoid in pregnancy); hepatotoxicity (fibrosis/cirrhosis with chronic use); renal impairment increases toxicity (renally cleared); severe myelosuppression (↑ with NSAIDs); interstitial pneumonitis (any dose, may be fatal); severe diarrhoea / mucositis (can be fatal); serious skin reactions (SJS/TEN); opportunistic infections; tumour lysis. Use preservative-free formulation for intrathecal / high-dose.",
  indications: [
    { indication: "Gestational trophoblastic neoplasia", hsa: "y", fda: "y", dose: "15–30 mg/day PO/IM × 5, repeat after ≥1 wk" },
    { indication: "Lymphoma (CNS / Burkitt)",            hsa: "y", fda: "y", dose: "High-dose IV + leucovorin rescue (protocol-dependent)" },
    { indication: "Breast",                              hsa: "y", fda: "y", dose: "Regimen-based (e.g. CMF)" },
    { indication: "Head & neck",                         hsa: "y", fda: "y", dose: "Regimen-based / palliative" },
    { indication: "Osteosarcoma",                        hsa: "y", fda: "y", dose: "High-dose 12 g/m² IV + leucovorin rescue" },
    { indication: "Mycosis fungoides (CTCL)",            hsa: "y", fda: "y", dose: "5–50 mg weekly" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: [
      "Mucositis / stomatitis",
      "Myelosuppression",
      "Nausea, diarrhoea",
      "Transaminitis",
      "Renal impairment (high-dose)"
    ],
    serious: ["Interstitial pneumonitis", "Hepatic fibrosis / cirrhosis", "Acute renal failure (HDMTX crystal nephropathy)", "CNS toxicity / leukoencephalopathy (IT / high-dose)", "SJS/TEN"]
  },
  doseReductions: {
    renal: "Renally cleared — reduce/hold in renal impairment; high-dose needs CrCl >60, hydration + urinary alkalinisation (pH >7).",
    other: [
      { label: "Leucovorin rescue", text: "mandatory after high-dose MTX — 15 mg q6h × 10 from 24 h post-infusion, adjusted to serum MTX levels until <0.05 µM." },
      { label: "NSAIDs", text: "avoid with high-dose MTX — can cause fatal toxicity." },
      { label: "Mucositis / myelosuppression", text: "hold and reduce for grade ≥3." }
    ]
  },
  sources: "FDA label (DailyMed, multiple boxed warnings) · HSA SG package insert · MOH SDL / Cancer Drug List",
  verified: "2026-06-30"
},

{
  id: "pemetrexed",
  name: "Pemetrexed",
  aliases: ["Alimta", "Pemfexy"],
  class: "Antimetabolite",
  subclass: "Antifolate (multitargeted)",
  route: ["IV"],
  atc: "L01BA04",
  brands: ["Alimta"],
  tumours: ["Lung — NSCLC", "Mesothelioma"],
  mechanism: "Multitargeted antifolate — inhibits thymidylate synthase, DHFR and GARFT. Needs folate/B12 supplementation.",
  indications: [
    { indication: "Lung — non-small cell (non-squamous)", hsa: "y", fda: "y", dose: "500 mg/m² q3w — 1L + cisplatin, maintenance, or 2L mono" },
    { indication: "Pleural mesothelioma",                 hsa: "y", fda: "y", dose: "500 mg/m² q3w + cisplatin" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: [
      "Myelosuppression — neutropenia, thrombocytopenia, anaemia",
      "Fatigue",
      "Mucositis / stomatitis",
      "Rash (dexamethasone prophylaxis)",
      "Nausea, anorexia"
    ],
    serious: ["Severe myelosuppression", "Renal failure", "Rare pneumonitis, severe skin reactions"]
  },
  doseReductions: {
    renal: "Do NOT administer if CrCl < 45 mL/min.",
    other: [
      { label: "Mandatory supplementation", text: "folic acid 400–1000 mcg PO daily (≥7 d before → +21 d after); B12 1000 mcg IM q9wk; dexamethasone 4 mg BID × 3 d (rash)." },
      { label: "Myelosuppression", text: "nadir ANC <500 or plt <50k → reduce to 75% of prior dose." }
    ]
  },
  sources: "HSA SG package insert (Alimta) · FDA label (DailyMed) · MOH Cancer Drug List (1 Jun 2026, SDL)",
  verified: "2026-06-30"
},

{
  id: "paclitaxel",
  name: "Paclitaxel",
  aliases: ["Taxol", "Anzatax", "DBL Paclitaxel"],
  class: "Taxane",
  subclass: "Antimicrotubule",
  route: ["IV"],
  atc: "L01CD01",
  brands: ["Taxol", "Anzatax"],
  tumours: ["Ovarian", "Breast", "Lung — NSCLC", "Kaposi sarcoma"],
  mechanism: "Taxane — stabilises microtubules, arresting mitosis. Cremophor EL solvent drives hypersensitivity → premedication required.",
  boxedWarning: "Severe hypersensitivity / anaphylaxis (2–4%, fatal despite premedication) — premedicate with corticosteroid + antihistamine + H2 antagonist. Severe bone-marrow suppression — do not start if baseline neutrophils <1500 cells/mm³.",
  indications: [
    { indication: "Ovarian",                       hsa: "y", fda: "y", dose: "175 mg/m² over 3 h q3w (± carboplatin)" },
    { indication: "Breast",                        hsa: "y", fda: "y", dose: "175 mg/m² q3w or weekly 80 mg/m²; adjuvant after AC; + trastuzumab if HER2+" },
    { indication: "Lung — non-small cell",         hsa: "y", fda: "y", dose: "175–200 mg/m² q3w (+ platinum) or weekly" },
    { indication: "Kaposi sarcoma (AIDS-related)", hsa: "n", fda: "y", dose: "135 mg/m² q3w or 100 mg/m² q2w" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: [
      "Neutropenia — dose-limiting",
      "Peripheral sensory neuropathy",
      "Hypersensitivity / infusion reactions",
      "Myalgia / arthralgia",
      "Alopecia, mucositis",
      "Bradycardia / hypotension"
    ],
    serious: ["Anaphylaxis", "Severe / febrile neutropenia", "Cardiac conduction abnormalities"]
  },
  doseReductions: {
    hepatic: "Reduce dose in hepatic impairment (extensively hepatically metabolised).",
    other: [
      { label: "Premedication (mandatory)", text: "dexamethasone + diphenhydramine + H2 antagonist before each dose." },
      { label: "Neutropenia", text: "do not re-treat until neutrophils ≥1500; reduce ~20% for febrile or severe neutropenia." },
      { label: "Neuropathy", text: "reduce ~20% for grade ≥2 persistent peripheral neuropathy." }
    ]
  },
  sources: "HSA SG package insert (Anzatax, SIN09539P) · FDA label (DailyMed) · MOH Cancer Drug List (1 Jun 2026, SDL)",
  verified: "2026-06-30"
},

{
  id: "docetaxel",
  name: "Docetaxel",
  aliases: ["Taxotere", "Docetaxel Sandoz"],
  class: "Taxane",
  subclass: "Antimicrotubule",
  route: ["IV"],
  atc: "L01CD02",
  brands: ["Taxotere", "Docetaxel Sandoz"],
  tumours: ["Breast", "Lung — NSCLC", "Prostate", "Gastric", "Head & Neck"],
  mechanism: "Taxane — stabilises microtubules, arresting mitosis. Dexamethasone premedication reduces fluid retention.",
  boxedWarning: "Toxic deaths — increased with hepatic impairment, higher doses, and in NSCLC after prior platinum. Do NOT give if bilirubin > ULN, or AST/ALT >1.5× ULN with ALP >2.5× ULN. Severe neutropenia — do not start if neutrophils <1500. Severe hypersensitivity (do not rechallenge). Severe fluid retention despite dexamethasone premedication.",
  indications: [
    { indication: "Breast",                hsa: "y", fda: "y", dose: "60–100 mg/m² q3w; adjuvant (TAC); + trastuzumab if HER2+" },
    { indication: "Lung — non-small cell", hsa: "y", fda: "y", dose: "75 mg/m² q3w (post-platinum, or + cisplatin 1L)" },
    { indication: "Prostate (mCRPC)",      hsa: "y", fda: "y", dose: "75 mg/m² q3w + prednisone" },
    { indication: "Gastric (incl. GEJ)",   hsa: "y", fda: "y", dose: "75 mg/m² q3w + cisplatin + 5-FU (DCF)" },
    { indication: "Head & neck",           hsa: "y", fda: "y", dose: "75 mg/m² + cisplatin + 5-FU (TPF induction)" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: [
      "Neutropenia — frequent, often febrile",
      "Fluid retention / oedema",
      "Peripheral neuropathy",
      "Alopecia, nail changes",
      "Fatigue, stomatitis, diarrhoea",
      "Hypersensitivity / infusion reactions"
    ],
    serious: ["Febrile neutropenia / sepsis", "Toxic death in hepatic impairment", "Severe fluid retention", "Severe skin reactions"]
  },
  doseReductions: {
    hepatic: "Contraindicated if bilirubin > ULN, or transaminases >1.5× ULN with ALP >2.5× ULN (toxic-death risk).",
    other: [
      { label: "Premedication (mandatory)", text: "dexamethasone 8 mg BID × 3 d from the day before (reduces fluid retention + hypersensitivity)." },
      { label: "Neutropenia", text: "febrile neutropenia or neutrophils <500 for >1 wk → reduce 100 → 75 (→ 60) mg/m²." },
      { label: "Neuropathy / skin", text: "reduce for grade ≥3." }
    ]
  },
  sources: "HSA SG package insert (Taxotere / Docetaxel Sandoz, SIN14564P) · FDA label (DailyMed) · MOH Cancer Drug List (1 Jun 2026, SDL)",
  verified: "2026-06-30"
},

{
  id: "nab-paclitaxel",
  name: "Nab-paclitaxel",
  aliases: ["Abraxane", "albumin-bound paclitaxel", "paclitaxel protein-bound"],
  class: "Taxane",
  subclass: "Albumin-bound (solvent-free)",
  route: ["IV"],
  atc: "L01CD01",
  brands: ["Abraxane"],
  tumours: ["Breast", "Lung — NSCLC", "Pancreatic"],
  mechanism: "Albumin-bound paclitaxel — solvent-free, so no Cremophor hypersensitivity and no routine steroid premedication.",
  boxedWarning: "Severe bone-marrow suppression — do not start if baseline neutrophils <1500 cells/mm³; monitor counts. Solvent-free — do not substitute for solvent-based paclitaxel on an mg-for-mg basis.",
  indications: [
    { indication: "Breast, metastatic",    hsa: "y", fda: "y", dose: "260 mg/m² q3w (after combination chemo failure)" },
    { indication: "Lung — non-small cell", hsa: "y", fda: "y", dose: "100 mg/m² D1,8,15 q3w + carboplatin (1L, non-surgical)" },
    { indication: "Pancreatic",            hsa: "y", fda: "y", dose: "125 mg/m² D1,8,15 q4w + gemcitabine (metastatic)" }
  ],
  cdl: { class: "MAF", limit: "MediShield Life $1,200/mth", items: [
    { cancer: "Breast (metastatic)", text: "monotherapy after 1L failure, when anthracycline-containing therapy not indicated" },
    { cancer: "Lung", text: "+ carboplatin, previously untreated locally advanced / metastatic NSCLC, not for curative surgery/RT" },
    { cancer: "Pancreatic", text: "+ gemcitabine, locally advanced / metastatic adenocarcinoma" },
    { cancer: "Taxane-intolerant", text: "for cancer treatment in patients intolerant to taxane chemotherapy" }
  ] },
  toxicities: {
    common: [
      "Neutropenia",
      "Peripheral sensory neuropathy",
      "Anaemia, thrombocytopenia",
      "Fatigue, alopecia",
      "Nausea, diarrhoea"
    ],
    serious: ["Severe neutropenia / sepsis", "Severe sensory neuropathy", "Rare pneumonitis"]
  },
  doseReductions: {
    hepatic: "Reduce / avoid in moderate–severe hepatic impairment.",
    other: [
      { label: "Neutropenia", text: "hold until neutrophils ≥1500; reduce for severe or febrile neutropenia." },
      { label: "Neuropathy", text: "grade 3 → hold until ≤grade 1, resume reduced. No routine steroid premedication (solvent-free)." }
    ]
  },
  sources: "HSA SG package insert (Abraxane, SIN14532P) · FDA label (DailyMed) · MOH Cancer Drug List (1 Jun 2026, MAF — indication-specific)",
  verified: "2026-06-30"
},

{
  id: "doxorubicin",
  name: "Doxorubicin",
  aliases: ["Adriamycin", "Adrim", "hydroxydaunorubicin"],
  class: "Anthracycline",
  subclass: "Topoisomerase II inhibitor",
  route: ["IV"],
  atc: "L01DB01",
  brands: ["Adriamycin", "Adrim"],
  tumours: ["Breast", "Sarcoma", "Lymphoma", "Ovarian", "Bladder", "Gastric", "Lung — SCLC", "Thyroid"],
  mechanism: "Anthracycline — intercalates DNA and inhibits topoisomerase II; free-radical generation drives cumulative cardiotoxicity.",
  boxedWarning: "Cardiomyopathy / CHF — cumulative, dose-related (risk rises above 550 mg/m²; can occur during or years after); monitor LVEF. Secondary AML/MDS. Extravasation — severe tissue necrosis (vesicant); give via free-flowing IV. Severe myelosuppression. Reduce dose in hepatic impairment.",
  indications: [
    { indication: "Breast",                       hsa: "y", fda: "y", dose: "60 mg/m² (AC); 60–75 mg/m² q3w" },
    { indication: "Sarcoma (soft tissue & bone)", hsa: "y", fda: "y", dose: "60–75 mg/m² q3w (± ifosfamide)" },
    { indication: "Hodgkin lymphoma",             hsa: "y", fda: "y", dose: "25 mg/m² D1,15 (ABVD)" },
    { indication: "Non-Hodgkin lymphoma",         hsa: "y", fda: "y", dose: "50 mg/m² q3w (CHOP)" },
    { indication: "Ovarian",                      hsa: "y", fda: "y", dose: "60–75 mg/m² q3w" },
    { indication: "Bladder (transitional cell)",  hsa: "y", fda: "y", dose: "60 mg/m² q3w (MVAC)" },
    { indication: "Gastric",                      hsa: "y", fda: "y", dose: "Regimen-dependent" },
    { indication: "Lung — small cell",            hsa: "y", fda: "y", dose: "Regimen-dependent" },
    { indication: "Thyroid",                      hsa: "y", fda: "y", dose: "60 mg/m² q3w" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: [
      "Myelosuppression — neutropenia",
      "Alopecia",
      "Nausea / vomiting",
      "Mucositis / stomatitis",
      "Red discolouration of urine",
      "Radiation recall"
    ],
    serious: ["Cardiomyopathy / CHF (cumulative)", "Acute arrhythmia", "Extravasation necrosis (vesicant)", "Secondary AML/MDS"]
  },
  doseReductions: {
    hepatic: "Bilirubin 1.2–3 mg/dL → 50%; 3.1–5 → 75%; >5 → contraindicated.",
    other: [
      { label: "Cumulative dose cap", text: "lifetime max ~450–550 mg/m² (lower with prior chest RT, cardiac risk, or concurrent trastuzumab). Monitor LVEF before / during / after." },
      { label: "Cardiac", text: "hold or discontinue for significant LVEF fall or clinical CHF." },
      { label: "Myelosuppression", text: "reduce / delay for grade ≥3 neutropenia or febrile neutropenia." }
    ]
  },
  sources: "HSA SG package insert (Adrim, SIN16081P) · FDA label (Adriamycin, DailyMed) · MOH Cancer Drug List (1 Jun 2026, SDL)",
  verified: "2026-06-30"
},

{
  id: "epirubicin",
  name: "Epirubicin",
  aliases: ["Ellence", "Pharmorubicin"],
  class: "Anthracycline",
  subclass: "Topoisomerase II inhibitor",
  route: ["IV"],
  atc: "L01DB03",
  brands: ["Ellence", "Pharmorubicin"],
  tumours: ["Breast", "Gastric", "Ovarian", "Lymphoma"],
  mechanism: "Anthracycline (doxorubicin epimer) — intercalates DNA, inhibits topoisomerase II; less cardiotoxic per mg than doxorubicin (higher cumulative cap).",
  boxedWarning: "Cardiotoxicity / CHF — cumulative, dose-related (risk rises sharply above 900 mg/m²; during or years after). Secondary AML/MDS. Extravasation — severe tissue necrosis (vesicant). Severe myelosuppression. Reduce dose in hepatic impairment.",
  indications: [
    { indication: "Breast",   hsa: "y", fda: "y", dose: "90–100 mg/m² q3w (FEC/EC); adjuvant node-positive" },
    { indication: "Gastric",  hsa: "y", fda: "n", dose: "50 mg/m² q3w (ECF/EOX)" },
    { indication: "Ovarian",  hsa: "y", fda: "n", dose: "Regimen-dependent" },
    { indication: "Lymphoma", hsa: "y", fda: "n", dose: "Regimen-dependent" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: [
      "Myelosuppression — neutropenia",
      "Alopecia",
      "Nausea / vomiting",
      "Mucositis / stomatitis",
      "Red discolouration of urine"
    ],
    serious: ["Cardiomyopathy / CHF (cumulative)", "Extravasation necrosis (vesicant)", "Secondary AML/MDS"]
  },
  doseReductions: {
    hepatic: "Bilirubin 1.2–3 mg/dL (or AST 2–4× ULN) → 50%; bilirubin >3 (or AST >4× ULN) → 75%.",
    other: [
      { label: "Cumulative dose cap", text: "lifetime max ~900 mg/m² (exceed only with extreme caution; lower with prior chest RT / cardiac risk). Monitor LVEF." },
      { label: "Cardiac", text: "hold or discontinue for significant LVEF fall or CHF." },
      { label: "Toxicity at nadir", text: "reduce day-1 dose for grade ≥3 haematologic or non-haematologic toxicity." }
    ]
  },
  sources: "HSA SG package insert (Pharmorubicin) · FDA label (Ellence, DailyMed) · MOH Cancer Drug List (1 Jun 2026, SDL). NB: only adjuvant breast is FDA-approved; gastric/ovarian/lymphoma are SG/EU — exact SG PI list to confirm.",
  verified: "2026-06-30"
},

{
  id: "cyclophosphamide",
  name: "Cyclophosphamide",
  aliases: ["Cytoxan", "Endoxan", "Cycloblastin", "CTX"],
  class: "Alkylating agent",
  subclass: "Oxazaphosphorine (nitrogen mustard)",
  route: ["IV", "PO"],
  atc: "L01AA01",
  brands: ["Endoxan", "Cycloblastin"],
  tumours: ["Breast", "Ovarian", "Lymphoma"],
  mechanism: "Prodrug alkylating agent — hepatic activation to phosphoramide mustard (crosslinks DNA); the acrolein metabolite causes haemorrhagic cystitis.",
  indications: [
    { indication: "Breast",                   hsa: "y", fda: "y", dose: "600 mg/m² (AC/TAC); 100 mg/m² PO ×14 (CMF)" },
    { indication: "Ovarian",                  hsa: "y", fda: "y", dose: "Regimen-dependent (+ platinum)" },
    { indication: "Hodgkin lymphoma",         hsa: "y", fda: "y", dose: "Regimen-dependent (e.g. BEACOPP)" },
    { indication: "Non-Hodgkin lymphoma",     hsa: "y", fda: "y", dose: "750 mg/m² q3w (CHOP / R-CHOP)" },
    { indication: "Mycosis fungoides (CTCL)", hsa: "y", fda: "y", dose: "Regimen-dependent" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: [
      "Myelosuppression — neutropenia",
      "Nausea / vomiting",
      "Alopecia",
      "Haemorrhagic cystitis (acrolein) — hydrate ± mesna at high dose",
      "Hyponatraemia / SIADH-like"
    ],
    serious: ["Haemorrhagic cystitis", "Cardiotoxicity (high-dose)", "SIADH / water intoxication", "Secondary malignancy / infertility", "Pulmonary fibrosis (rare)"]
  },
  doseReductions: {
    renal: "Reduce in significant renal impairment; ensure adequate hydration.",
    hepatic: "Reduce in significant hepatic impairment.",
    other: [
      { label: "Haemorrhagic cystitis", text: "hydration ± mesna (esp. high-dose); contraindicated with urinary outflow obstruction; hold for gross haematuria." },
      { label: "Myelosuppression", text: "reduce / delay for grade ≥3 neutropenia or febrile neutropenia." }
    ]
  },
  sources: "HSA SG package insert (Endoxan) · FDA label (DailyMed) · MOH Cancer Drug List (1 Jun 2026, SDL)",
  verified: "2026-06-30"
},

{
  id: "ifosfamide",
  name: "Ifosfamide",
  aliases: ["Ifex", "Holoxan", "Mitoxana"],
  class: "Alkylating agent",
  subclass: "Oxazaphosphorine",
  route: ["IV"],
  atc: "L01AA06",
  brands: ["Holoxan", "Ifex"],
  tumours: ["Testicular", "Sarcoma", "Cervical", "Lung — NSCLC"],
  mechanism: "Prodrug alkylating agent — hepatic activation; acrolein causes haemorrhagic cystitis, chloroacetaldehyde drives CNS + renal toxicity. Always co-administer mesna.",
  boxedWarning: "Urotoxicity — severe haemorrhagic cystitis; reduce with prophylactic mesna + hydration. CNS toxicity — encephalopathy can be severe and may be fatal. Severe myelosuppression (fatal infections). Nephrotoxicity — can cause renal failure.",
  indications: [
    { indication: "Testicular (germ cell)",       hsa: "y", fda: "y", dose: "1.2 g/m²/day × 5 (+ mesna), 3rd-line combination" },
    { indication: "Sarcoma (soft tissue & bone)", hsa: "y", fda: "n", dose: "2–3 g/m²/day × 2–4 (+ mesna); ± doxorubicin" },
    { indication: "Cervical",                      hsa: "y", fda: "n", dose: "Regimen-dependent (+ mesna)" },
    { indication: "Lung — non-small cell",         hsa: "y", fda: "n", dose: "Regimen-dependent (+ mesna)" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: [
      "Haemorrhagic cystitis (acrolein) — mesna mandatory",
      "Encephalopathy — confusion, somnolence, hallucinations",
      "Myelosuppression — leukopenia",
      "Nephrotoxicity — tubular (Fanconi syndrome)",
      "Nausea / vomiting, alopecia"
    ],
    serious: ["Severe / fatal encephalopathy", "Severe haemorrhagic cystitis", "Acute renal failure / Fanconi", "Severe myelosuppression"]
  },
  doseReductions: {
    renal: "Reduce / avoid in renal impairment (↑ encephalopathy + nephrotoxicity); low albumin, prior cisplatin and bulky pelvic disease raise CNS-toxicity risk.",
    other: [
      { label: "Mesna (mandatory)", text: "always co-administer mesna + vigorous hydration to prevent haemorrhagic cystitis." },
      { label: "Encephalopathy", text: "hold for CNS toxicity; methylene blue used for treatment/prophylaxis; avoid re-exposure if severe." },
      { label: "Myelosuppression", text: "reduce / delay for grade ≥3 neutropenia or febrile neutropenia." }
    ]
  },
  sources: "HSA SG package insert (Holoxan) · FDA label (Ifex, DailyMed) · MOH Cancer Drug List (1 Jun 2026, SDL). NB: only germ-cell testicular is FDA-approved; sarcoma/cervical/lung are SG/EU — exact SG PI list to confirm.",
  verified: "2026-06-30"
},

{
  id: "irinotecan",
  name: "Irinotecan",
  aliases: ["Campto", "Camptosar", "CPT-11"],
  class: "Topoisomerase I inhibitor",
  subclass: "Camptothecin",
  route: ["IV"],
  atc: "L01CE02",
  brands: ["Campto", "Camptosar"],
  tumours: ["Colorectal"],
  mechanism: "Camptothecin — active metabolite SN-38 inhibits topoisomerase I, causing DNA strand breaks. SN-38 is cleared by UGT1A1.",
  boxedWarning: "Diarrhoea — early (cholinergic, during/shortly after infusion; treat with atropine) and late (>24 h, can be life-threatening → dehydration, electrolyte imbalance, sepsis; treat promptly with loperamide). Severe myelosuppression — neutropenia, including febrile/fatal.",
  indications: [
    { indication: "Colorectal, metastatic", hsa: "y", fda: "y", dose: "180 mg/m² q2w (FOLFIRI); or 350 mg/m² q3w / 125 mg/m² weekly (single agent)" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: [
      "Diarrhoea — early cholinergic + late (dose-limiting)",
      "Neutropenia",
      "Nausea / vomiting",
      "Alopecia",
      "Cholinergic syndrome (sweating, cramps, lacrimation)",
      "Fatigue"
    ],
    serious: ["Life-threatening late diarrhoea", "Febrile neutropenia / sepsis", "Colitis / ileus"]
  },
  doseReductions: {
    other: [
      { label: "UGT1A1", text: "*28/*28 (or *6) poor metabolisers → ↑ severe neutropenia; reduce starting dose by ≥1 level, then titrate to tolerance." },
      { label: "Diarrhoea", text: "early — atropine; late — loperamide promptly + fluids; hold/reduce for grade ≥3." },
      { label: "Neutropenia", text: "hold until recovery; reduce for febrile neutropenia or grade ≥3." }
    ]
  },
  sources: "HSA SG package insert (Campto) · FDA label (Camptosar, DailyMed) · MOH Cancer Drug List (1 Jun 2026, SDL). NB: conventional irinotecan = SDL; liposomal irinotecan (Onivyde) is a separate, non-subsidised product.",
  verified: "2026-06-30"
},

{
  id: "etoposide",
  name: "Etoposide",
  aliases: ["VePesid", "Etopophos", "Lastet", "VP-16"],
  class: "Topoisomerase II inhibitor",
  subclass: "Podophyllotoxin",
  route: ["IV", "PO"],
  atc: "L01CB01",
  brands: ["VePesid", "Lastet"],
  tumours: ["Lung — SCLC", "Testicular", "Lymphoma"],
  mechanism: "Podophyllotoxin — inhibits topoisomerase II, causing DNA strand breaks. Associated with balanced 11q23 translocations (secondary AML).",
  indications: [
    { indication: "Lung — small cell",        hsa: "y", fda: "y", dose: "100 mg/m² D1–3 q3w (+ platinum)" },
    { indication: "Testicular (refractory)",  hsa: "y", fda: "y", dose: "50–100 mg/m² D1–5 (+ combination)" },
    { indication: "Lymphoma",                 hsa: "y", fda: "n", dose: "Regimen-dependent (e.g. BEACOPP, EPOCH, ICE)" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: [
      "Myelosuppression — dose-limiting (neutropenia)",
      "Alopecia",
      "Nausea / vomiting",
      "Hypotension (with rapid infusion)",
      "Mucositis"
    ],
    serious: ["Severe myelosuppression — fatal infection/bleeding", "Hypersensitivity / anaphylaxis", "Secondary AML (11q23 / MLL)"]
  },
  doseReductions: {
    renal: "Reduce for CrCl <50 (partly renally cleared).",
    other: [
      { label: "Infusion", text: "give over ≥30–60 min to avoid hypotension; stop for hypersensitivity." },
      { label: "Myelosuppression", text: "hold/reduce for grade ≥3 neutropenia or thrombocytopenia." }
    ]
  },
  sources: "HSA SG package insert · FDA label (DailyMed; no boxed warning — myelosuppression is dose-limiting) · MOH Cancer Drug List (1 Jun 2026, SDL). NB: FDA-approved for SCLC + testicular; lymphoma is SG/EU + standard use — exact SG PI to confirm.",
  verified: "2026-06-30"
},

{
  id: "vinorelbine",
  name: "Vinorelbine",
  aliases: ["Navelbine", "vinorelbine tartrate"],
  class: "Vinca alkaloid",
  subclass: "Antimicrotubule",
  route: ["IV"],
  atc: "L01CA04",
  brands: ["Navelbine"],
  tumours: ["Lung — NSCLC", "Breast"],
  mechanism: "Semi-synthetic vinca alkaloid — binds tubulin, inhibiting microtubule assembly and arresting mitosis.",
  boxedWarning: "Fatal if given intrathecally — for INTRAVENOUS use only (intrathecal vinca alkaloids cause death). Severe myelosuppression — granulocytopenia (dose-limiting), with serious/fatal infection.",
  indications: [
    { indication: "Lung — non-small cell", hsa: "y", fda: "y", dose: "25–30 mg/m² weekly (single agent or + cisplatin)" },
    { indication: "Breast, advanced",      hsa: "y", fda: "n", dose: "25–30 mg/m² weekly" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: [
      "Granulocytopenia — dose-limiting (nadir 7–10 d)",
      "Constipation",
      "Peripheral neuropathy (milder than other vincas)",
      "Injection-site reaction (vesicant)",
      "Fatigue, nausea"
    ],
    serious: ["Severe granulocytopenia / sepsis", "Extravasation tissue injury (vesicant)", "Paralytic ileus", "Death if given intrathecally"]
  },
  doseReductions: {
    hepatic: "Reduce for hepatic impairment (bilirubin 2.1–3 mg/dL → 50%; >3 → 25%).",
    other: [
      { label: "Granulocytopenia", text: "ANC <1000 on treatment day → hold; reduce for repeated or febrile neutropenia." },
      { label: "Route", text: "IV ONLY — never intrathecal (fatal). Manage extravasation as a vesicant." }
    ]
  },
  sources: "HSA SG package insert (Navelbine) · FDA label (DailyMed) · MOH Cancer Drug List (1 Jun 2026, SDL — IV form; some oral forms non-subsidised). NB: FDA-approved for NSCLC; advanced breast is SG/EU.",
  verified: "2026-06-30"
},

{
  id: "durvalumab",
  name: "Durvalumab",
  aliases: ["Imfinzi"],
  class: "Checkpoint inhibitor",
  subclass: "Anti–PD-L1",
  route: ["IV"],
  atc: "L01FF03",
  brands: ["Imfinzi"],
  tumours: ["Lung — NSCLC", "Lung — SCLC", "Hepatocellular", "Biliary tract"],
  mechanism: "Anti–PD-L1 monoclonal antibody — blocks PD-L1 binding to PD-1 and CD80, restoring T-cell antitumour activity. Flat dosing; toxicity managed by withholding/steroids, not dose reduction.",
  indications: [
    { indication: "Lung — NSCLC (stage III, consolidation)", hsa: "y", fda: "y", dose: "1500 mg q4w × 12 mo, after platinum chemo-RT (PACIFIC)" },
    { indication: "Lung — small cell (extensive-stage, 1L)", hsa: "y", fda: "y", dose: "1500 mg + platinum/etoposide q3w, then 1500 mg q4w (CASPIAN)" },
    { indication: "Hepatocellular (1L, unresectable)",       hsa: "y", fda: "y", dose: "1500 mg q4w + single priming dose tremelimumab (STRIDE)" },
    { indication: "Biliary tract (advanced)",                hsa: "y", fda: "y", dose: "1500 mg q3w + cisplatin/gemcitabine (TOPAZ-1)" }
  ],
  cdl: { items: [
    { cancer: "NSCLC — stage III consolidation", status: "MAF", limit: "$2,000/mth", text: "unresectable, no progression after platinum chemo-RT; max 12 months; retreatment allowed at progression for up to 1 yr if stopped for other reasons" },
    { cancer: "SCLC — extensive-stage",          status: "MAF", limit: "$2,000/mth", text: "+ platinum + etoposide, untreated" },
    { cancer: "Hepatocellular (1L)",             status: "MAF", limit: "$2,000–4,600/mth", text: "unresectable, + single priming dose tremelimumab; adequate liver function (Child-Pugh)" },
    { cancer: "Biliary tract",                   status: "MSV/MSHL", text: "+ cisplatin + gemcitabine, locally advanced/metastatic" }
  ] },
  toxicities: {
    common: [
      "Immune-related: pneumonitis, colitis / diarrhoea, hepatitis",
      "Endocrinopathies — thyroid (hypo/hyper), adrenal insufficiency, hypophysitis, T1DM",
      "Dermatitis / rash, pruritus",
      "Nephritis",
      "Fatigue, infusion reactions, cough"
    ],
    serious: ["Severe/fatal pneumonitis, colitis, hepatitis", "Myocarditis", "Adrenal crisis / DKA", "Severe skin reactions (SJS/TEN)", "Rare neuro/haematologic irAEs"]
  },
  doseModLabel: "irAE management",
  doseReductions: {
    other: [
      { label: "Withhold (grade 2)", text: "moderate irAEs — withhold + corticosteroids (e.g. prednisolone 1–2 mg/kg/day, taper over ≥1 month); resume when ≤grade 1 and steroid ≤10 mg/day." },
      { label: "Discontinue", text: "permanently for most grade ≥3/4 irAEs, recurrent grade ≥2, or any myocarditis." },
      { label: "Endocrinopathies", text: "may continue with hormone replacement (thyroid, adrenal, T1DM)." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Imfinzi) · FDA label (DailyMed). irAE management per CTCAE / ASCO-ESMO guidance",
  verified: "2026-06-30"
},

{
  id: "pembrolizumab",
  name: "Pembrolizumab",
  aliases: ["Keytruda"],
  class: "Checkpoint inhibitor",
  subclass: "Anti–PD-1",
  route: ["IV"],
  atc: "L01FF02",
  brands: ["Keytruda"],
  tumours: ["Lung — NSCLC", "Head & Neck", "Melanoma", "Bladder", "Gastric", "Colorectal", "Breast", "Lymphoma", "Renal", "Cervical", "Endometrial", "Hepatocellular"],
  mechanism: "Anti–PD-1 monoclonal antibody — blocks PD-1 binding to PD-L1/PD-L2, restoring T-cell antitumour activity. The widest indication set of any ICI.",
  dosing: "200 mg IV q3w or 400 mg q6w (flat). Most indications up to 2 years; adjuvant ~1 year.",
  cdl: { items: [
    { cancer: "NSCLC — 1L mono (PD-L1 TPS ≥50%)", status: "MAF", text: "metastatic, no EGFR/ALK (KEYNOTE-024)" },
    { cancer: "NSCLC non-squamous — 1L", status: "MAF", text: "+ platinum-doublet, metastatic, no EGFR/ALK (KEYNOTE-189)" },
    { cancer: "NSCLC squamous — 1L", status: "MAF", text: "+ platinum-doublet, metastatic (KEYNOTE-407)" },
    { cancer: "NSCLC — 2L (PD-L1 TPS ≥1%)", status: "MAF", text: "metastatic, post-platinum progression, no prior PD-1/PD-L1 (KEYNOTE-010)" },
    { cancer: "Head & neck SCC — 1L mono (CPS ≥1)", status: "MAF", text: "untreated recurrent/metastatic (KEYNOTE-048)" },
    { cancer: "Head & neck SCC — 1L combo (CPS ≥1)", status: "MAF", text: "+ platinum chemo, untreated R/M (KEYNOTE-048)" },
    { cancer: "Melanoma — advanced", status: "MAF", text: "unresectable/metastatic, no prior PD-1 or ipilimumab (KEYNOTE-006)" },
    { cancer: "Melanoma — adjuvant", status: "MAF", text: "resected, node+; start ≤12 wk of resection; max 12 mo (KEYNOTE-054)" },
    { cancer: "Urothelial — 2L", status: "MAF", text: "locally advanced/metastatic, post-platinum, no prior PD-1/PD-L1 (KEYNOTE-045)" },
    { cancer: "Colorectal — 1L (MSI-H / dMMR)", status: "MAF", text: "untreated metastatic (KEYNOTE-177)" },
    { cancer: "TNBC — 1L (PD-L1 CPS ≥10)", status: "MAF", text: "+ chemo, locally recurrent unresectable/metastatic, no prior chemo for mets (KEYNOTE-355)" },
    { cancer: "Oesophageal / GEJ — 1L", status: "MAF", text: "+ fluoropyrimidine/platinum, LA/metastatic, HER2-neg GEJ (KEYNOTE-590)" },
    { cancer: "Classical Hodgkin lymphoma — R/R", status: "MAF", text: "post-ASCT or ≥2 prior therapies, no prior PD-1/PD-L1 (KEYNOTE-204)" },
    { cancer: "NSCLC — resectable (perioperative)", status: "MSV/MSHL", text: "stage II–IIIB, neoadjuvant + adjuvant (KEYNOTE-671)" },
    { cancer: "Gastric / GEJ — 1L (HER2+)", status: "MSV/MSHL", text: "+ trastuzumab + fluoropyrimidine/platinum (KEYNOTE-811)" },
    { cancer: "Urothelial — 1L (cisplatin-ineligible)", status: "MSV/MSHL", text: "locally advanced/metastatic" },
    { cancer: "Urothelial — 1L (platinum-ineligible, PD-L1)", status: "MSV/MSHL", text: "locally advanced/metastatic" },
    { cancer: "Cervical — 1L (CPS ≥1)", status: "MSV/MSHL", text: "+ chemo ± bevacizumab, persistent/recurrent/metastatic (KEYNOTE-826)" },
    { cancer: "Hepatocellular — 2L", status: "MSV/MSHL", text: "advanced unresectable, post-sorafenib (KEYNOTE-240)" },
    { cancer: "Primary mediastinal B-cell lymphoma — R/R", status: "MSV/MSHL", text: "refractory or ≥2 prior lines" },
    { cancer: "Merkel cell carcinoma", status: "MSV/MSHL", text: "metastatic" },
    { cancer: "Tumour-agnostic (MSI-H / dMMR)", status: "MSV/MSHL", text: "unresectable/metastatic solid tumours, post-prior therapy (KEYNOTE-158)" },
    { cancer: "TNBC — neoadjuvant/adjuvant", status: "MSV/MSHL", text: "high-risk early TNBC, + chemo neoadjuvant then adjuvant (KEYNOTE-522)" },
    { cancer: "Renal cell — adjuvant", status: "MSV/MSHL", text: "increased recurrence risk post-nephrectomy (KEYNOTE-564)" },
    { cancer: "Renal cell — 1L (+ axitinib)", status: "MSV/MSHL", text: "advanced (KEYNOTE-426)" },
    { cancer: "Renal cell — 1L (+ lenvatinib)", status: "MSV/MSHL", text: "advanced (CLEAR / KEYNOTE-581)" },
    { cancer: "Endometrial — advanced (+ lenvatinib)", status: "MSV/MSHL", text: "after prior systemic therapy, non-MSI-H (KEYNOTE-775)" }
  ] },
  toxicities: {
    common: [
      "Immune-related: pneumonitis, colitis / diarrhoea, hepatitis",
      "Endocrinopathies — hypothyroidism (common), hyperthyroidism, adrenal insufficiency, hypophysitis, T1DM",
      "Dermatitis / rash, pruritus, vitiligo",
      "Nephritis",
      "Fatigue, arthralgia, infusion reactions"
    ],
    serious: ["Severe/fatal pneumonitis, colitis, hepatitis", "Myocarditis", "Adrenal crisis / DKA", "SJS/TEN", "Rare neuro (Guillain-Barré, myasthenia, encephalitis), haematologic irAEs"]
  },
  doseModLabel: "irAE management",
  doseReductions: {
    other: [
      { label: "Withhold (grade 2)", text: "moderate irAEs — withhold + corticosteroids (prednisolone 1–2 mg/kg/day, taper over ≥1 month); resume when ≤grade 1 and steroid ≤10 mg/day." },
      { label: "Discontinue", text: "permanently for most grade ≥3/4 irAEs, recurrent grade ≥2, or any grade ≥3 myocarditis / neurologic / haematologic event." },
      { label: "Endocrinopathies", text: "may continue with hormone replacement (thyroid, adrenal, T1DM)." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Keytruda) · FDA label (DailyMed). All indications HSA-registered; KEYNOTE trials cited as the registration basis. irAE management per CTCAE / ASCO-ESMO guidance",
  verified: "2026-06-30"
},

{
  id: "nivolumab",
  name: "Nivolumab",
  aliases: ["Opdivo"],
  class: "Checkpoint inhibitor",
  subclass: "Anti–PD-1",
  route: ["IV"],
  atc: "L01FF01",
  brands: ["Opdivo"],
  tumours: ["Melanoma", "Lung — NSCLC", "Head & Neck", "Renal", "Lymphoma", "Gastric", "Bladder", "Colorectal", "Hepatocellular", "Mesothelioma"],
  mechanism: "Anti–PD-1 monoclonal antibody — blocks PD-1 binding to PD-L1/PD-L2, restoring T-cell antitumour activity. Frequently paired with ipilimumab.",
  dosing: "240 mg q2w or 480 mg q4w (flat). With ipilimumab: regimen-specific (melanoma — nivo 1 + ipi 3 mg/kg q3w ×4; RCC — nivo 3 + ipi 1 mg/kg q3w ×4), then nivolumab maintenance.",
  cdl: { items: [
    { cancer: "Melanoma — advanced (mono)", status: "MAF", text: "unresectable/metastatic, no prior PD-1 or ipilimumab (CheckMate-066)" },
    { cancer: "Melanoma — advanced (+ ipilimumab)", status: "MAF", text: "induction nivo+ipi → nivo maintenance (CheckMate-067)" },
    { cancer: "Melanoma — adjuvant", status: "MAF", text: "resected, node+, max 12 mo (CheckMate-238)" },
    { cancer: "NSCLC — 2L", status: "MAF", text: "metastatic, post-platinum, no prior PD-1/PD-L1 (CheckMate-017/057)" },
    { cancer: "Head & neck SCC — 2L", status: "MAF", text: "R/M, progressed ≤6 mo of platinum, no prior PD-1/PD-L1 (CheckMate-141)" },
    { cancer: "Renal cell — 1L (+ ipilimumab)", status: "MAF", text: "intermediate/poor-risk; induction → nivo maintenance (CheckMate-214)" },
    { cancer: "Renal cell — advanced 2L", status: "MAF", text: "previously treated, no prior PD-1/PD-L1 (CheckMate-025)" },
    { cancer: "Classical Hodgkin lymphoma — R/R", status: "MAF", text: "post-ASCT + brentuximab vedotin (CheckMate-205)" },
    { cancer: "Gastric / GEJ / oesophageal adeno — 1L", status: "MAF", text: "+ chemo, HER2-neg, unresectable adv/metastatic; stop at 2 yr (CheckMate-649)" },
    { cancer: "Gastric / GEJ — ≥3L", status: "MAF", text: "unresectable LA/recurrent, after ≥2 prior (ATTRACTION-2)" },
    { cancer: "Oesophageal SCC — 1L", status: "MAF", text: "+ fluoropyrimidine/platinum, unresectable adv/recurrent/metastatic (CheckMate-648)" },
    { cancer: "Oesophageal SCC — 2L", status: "MAF", text: "after fluoropyrimidine/platinum, no prior PD-1/PD-L1 (ATTRACTION-3)" },
    { cancer: "Oesophageal / GEJ — adjuvant", status: "MAF", text: "resected, residual disease post-neoadjuvant chemoRT, max 12 mo (CheckMate-577)" },
    { cancer: "Urothelial — 2L", status: "MSV/MSHL", text: "locally advanced/metastatic, post-platinum (CheckMate-275)" },
    { cancer: "Urothelial — adjuvant (MIUC)", status: "MSV/MSHL", text: "high-risk muscle-invasive, post-resection (CheckMate-274)" },
    { cancer: "Colorectal — MSI-H/dMMR (mono)", status: "MSV/MSHL", text: "unresectable/metastatic (CheckMate-142)" },
    { cancer: "Colorectal — MSI-H/dMMR (+ ipilimumab)", status: "MSV/MSHL", text: "unresectable/metastatic (CheckMate-142)" },
    { cancer: "Hepatocellular — advanced", status: "MSV/MSHL", text: "post prior systemic therapy" },
    { cancer: "Hepatocellular — advanced (+ ipilimumab)", status: "MSV/MSHL", text: "unresectable (CheckMate-040)" },
    { cancer: "NSCLC — resectable (neoadjuvant)", status: "MSV/MSHL", text: "+ platinum-doublet, neoadjuvant (CheckMate-816)" },
    { cancer: "NSCLC — 1L (+ ipilimumab + 2 cycles chemo)", status: "MSV/MSHL", text: "untreated metastatic (CheckMate-9LA)" },
    { cancer: "Renal cell — 1L (+ cabozantinib)", status: "MSV/MSHL", text: "untreated advanced (CheckMate-9ER)" },
    { cancer: "Mesothelioma — unresectable (+ ipilimumab)", status: "MSV/MSHL", text: "1L pleural (CheckMate-743)" },
    { cancer: "Gastric / GEJ — 1L (+ ipilimumab)", status: "MSV/MSHL", text: "untreated unresectable adv/recurrent/metastatic" }
  ] },
  toxicities: {
    common: [
      "Immune-related: pneumonitis, colitis / diarrhoea, hepatitis",
      "Endocrinopathies — thyroid, adrenal insufficiency, hypophysitis, T1DM",
      "Dermatitis / rash, pruritus, vitiligo",
      "Nephritis · fatigue, arthralgia, infusion reactions"
    ],
    serious: ["Severe/fatal pneumonitis, colitis, hepatitis", "Myocarditis", "Adrenal crisis / DKA", "SJS/TEN", "Rare neuro/haematologic irAEs — markedly higher with ipilimumab combinations"]
  },
  doseModLabel: "irAE management",
  doseReductions: {
    other: [
      { label: "Withhold (grade 2)", text: "moderate irAEs — withhold + corticosteroids (prednisolone 1–2 mg/kg/day, taper over ≥1 month); resume when ≤grade 1 and steroid ≤10 mg/day." },
      { label: "Discontinue", text: "permanently for most grade ≥3/4 irAEs, recurrent grade ≥2, or any grade ≥3 myocarditis / neurologic / haematologic event." },
      { label: "+ Ipilimumab combinations", text: "substantially higher irAE rates/severity — lower threshold to hold + steroid; per-organ guidance." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Opdivo) · FDA label (DailyMed). All indications HSA-registered; CheckMate trials cited as the registration basis. irAE management per CTCAE / ASCO-ESMO guidance",
  verified: "2026-06-30"
},

{
  id: "atezolizumab",
  name: "Atezolizumab",
  aliases: ["Tecentriq"],
  class: "Checkpoint inhibitor",
  subclass: "Anti–PD-L1",
  route: ["IV"],
  atc: "L01FF05",
  brands: ["Tecentriq"],
  tumours: ["Lung — NSCLC", "Lung — SCLC", "Hepatocellular", "Bladder", "Breast"],
  mechanism: "Anti–PD-L1 monoclonal antibody — blocks PD-L1 binding to PD-1 and B7.1, restoring T-cell antitumour activity.",
  dosing: "1200 mg q3w (or 840 mg q2w / 1680 mg q4w), flat.",
  cdl: { items: [
    { cancer: "NSCLC — 1L mono (PD-L1 TPS ≥50%)", status: "MAF", text: "metastatic, no EGFR/ALK (IMpower110)" },
    { cancer: "NSCLC non-squamous — 1L", status: "MAF", text: "+ platinum-doublet, metastatic, no EGFR/ALK (IMpower130)" },
    { cancer: "NSCLC non-squamous — 1L (+ bevacizumab)", status: "MAF", text: "+ subsidised bev biosimilar + platinum-doublet; non-subsidised bev brand → MSV/MSHL (IMpower150)" },
    { cancer: "NSCLC — 2L", status: "MAF", text: "metastatic, post-platinum, no prior PD-1/PD-L1 (OAK)" },
    { cancer: "NSCLC — adjuvant", status: "MAF", text: "resected stage II–IIIA, PD-L1 ≥50%, post-adjuvant chemo, max 12 mo (IMpower010)" },
    { cancer: "SCLC — extensive-stage 1L", status: "MAF", text: "+ platinum + etoposide, untreated (IMpower133)" },
    { cancer: "Hepatocellular — 1L (+ bevacizumab)", status: "MAF", text: "unresectable, Child-Pugh adequate; subsidised bev biosimilar; non-subsidised bev brand → MSV/MSHL (IMbrave150)" },
    { cancer: "Urothelial — 2L", status: "MSV/MSHL", text: "locally advanced/metastatic, post-platinum" },
    { cancer: "Urothelial — 1L (cisplatin-ineligible)", status: "MSV/MSHL", text: "locally advanced/metastatic" },
    { cancer: "Urothelial — 1L (PD-L1)", status: "MSV/MSHL", text: "locally advanced/metastatic, platinum-ineligible" },
    { cancer: "TNBC — 1L (PD-L1+)", status: "MSV/MSHL", text: "+ nab-paclitaxel, unresectable LA/metastatic (IMpassion130)" }
  ] },
  toxicities: {
    common: [
      "Immune-related: pneumonitis, colitis / diarrhoea, hepatitis",
      "Endocrinopathies — thyroid, adrenal insufficiency, hypophysitis, T1DM",
      "Dermatitis / rash, pruritus",
      "Nephritis · fatigue, infusion reactions"
    ],
    serious: ["Severe/fatal pneumonitis, colitis, hepatitis", "Myocarditis", "Adrenal crisis / DKA", "SJS/TEN", "Rare neuro/haematologic irAEs"]
  },
  doseModLabel: "irAE management",
  doseReductions: {
    other: [
      { label: "Withhold (grade 2)", text: "moderate irAEs — withhold + corticosteroids (prednisolone 1–2 mg/kg/day, taper over ≥1 month); resume when ≤grade 1 and steroid ≤10 mg/day." },
      { label: "Discontinue", text: "permanently for most grade ≥3/4 irAEs, recurrent grade ≥2, or any grade ≥3 myocarditis / neurologic / haematologic event." },
      { label: "Endocrinopathies", text: "may continue with hormone replacement (thyroid, adrenal, T1DM)." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Tecentriq) · FDA label (DailyMed). All indications HSA-registered; IMpower/IMbrave/OAK trials cited as the registration basis. irAE management per CTCAE / ASCO-ESMO guidance",
  verified: "2026-06-30"
},

{
  id: "ipilimumab",
  name: "Ipilimumab",
  aliases: ["Yervoy"],
  class: "Checkpoint inhibitor",
  subclass: "Anti–CTLA-4",
  route: ["IV"],
  atc: "L01FX04",
  brands: ["Yervoy"],
  tumours: ["Melanoma", "Renal", "Colorectal", "Hepatocellular", "Lung — NSCLC", "Mesothelioma"],
  mechanism: "Anti–CTLA-4 monoclonal antibody — blocks CTLA-4 to potentiate T-cell activation. In SG always combined with nivolumab; markedly higher irAE rates than PD-1/PD-L1 monotherapy.",
  dosing: "Always with nivolumab; ipilimumab dose regimen-specific — 1 or 3 mg/kg q3w ×4 induction, or 1 mg/kg q6w (lung/meso/oesophageal). Then nivolumab maintenance.",
  cdl: { items: [
    { cancer: "Melanoma — advanced (+ nivolumab)", status: "MAF", text: "unresectable/metastatic; ipi 3 + nivo 1 mg/kg q3w ×4 (CheckMate-067)" },
    { cancer: "Renal cell — 1L (+ nivolumab)", status: "MAF", text: "intermediate/poor-risk; ipi 1 + nivo 3 mg/kg q3w ×4 (CheckMate-214)" },
    { cancer: "Colorectal — MSI-H/dMMR (+ nivolumab)", status: "MSV/MSHL", text: "post fluoropyrimidine/oxaliplatin/irinotecan; ipi 1 + nivo 3 mg/kg q3w ×4 (CheckMate-142)" },
    { cancer: "Hepatocellular — advanced (+ nivolumab)", status: "MSV/MSHL", text: "after ≥1 prior line, Child-Pugh adequate; ipi 3 + nivo 1 mg/kg q3w ×4 (CheckMate-040)" },
    { cancer: "NSCLC — 1L (+ nivolumab + 2 cycles chemo)", status: "MSV/MSHL", text: "metastatic, no EGFR/ALK; stop at 2 yr (CheckMate-9LA)" },
    { cancer: "Mesothelioma — unresectable pleural (+ nivolumab)", status: "MSV/MSHL", text: "1L; ipi 1 mg/kg q6w + nivo q2w; stop at 2 yr (CheckMate-743)" },
    { cancer: "Oesophageal SCC — 1L (+ nivolumab)", status: "MSV/MSHL", text: "unresectable adv/recurrent/metastatic; stop at 2 yr (CheckMate-648)" }
  ] },
  toxicities: {
    common: [
      "Immune-related — colitis / diarrhoea (prominent with CTLA-4), hepatitis, pneumonitis",
      "Endocrinopathies — hypophysitis (notably CTLA-4), thyroid, adrenal, T1DM",
      "Dermatitis / rash, pruritus",
      "Fatigue, nausea"
    ],
    serious: ["Severe colitis / bowel perforation", "Severe hepatitis", "Hypophysitis / adrenal crisis", "Myocarditis", "SJS/TEN", "Highest irAE burden with nivolumab combination"]
  },
  doseModLabel: "irAE management",
  doseReductions: {
    other: [
      { label: "Higher irAE risk", text: "CTLA-4 (esp. + nivolumab) → more frequent, earlier, more severe irAEs (colitis, hypophysitis). Low threshold to withhold + corticosteroids." },
      { label: "Withhold (grade 2)", text: "withhold + steroids; resume when ≤grade 1 and steroid ≤10 mg/day." },
      { label: "Discontinue", text: "permanently for most grade ≥3/4 irAEs or any myocarditis." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Yervoy) · FDA label (DailyMed). All SG indications are with nivolumab; CheckMate trials cited. irAE management per CTCAE / ASCO-ESMO guidance",
  verified: "2026-06-30"
},

{
  id: "tremelimumab",
  name: "Tremelimumab",
  aliases: ["Imjudo"],
  class: "Checkpoint inhibitor",
  subclass: "Anti–CTLA-4",
  route: ["IV"],
  atc: "L01FX20",
  brands: ["Imjudo"],
  tumours: ["Hepatocellular"],
  mechanism: "Anti–CTLA-4 monoclonal antibody — used as a single priming dose with durvalumab (STRIDE regimen) in HCC.",
  dosing: "Single priming dose 300 mg, given once with durvalumab 1500 mg; then durvalumab q4w (STRIDE).",
  cdl: { items: [
    { cancer: "Hepatocellular — 1L (+ durvalumab)", status: "MAF", text: "unresectable, no prior systemic therapy; single priming dose tremelimumab + durvalumab; adequate Child-Pugh (HIMALAYA / STRIDE)" }
  ] },
  toxicities: {
    common: [
      "Immune-related — hepatitis, colitis / diarrhoea, pneumonitis",
      "Endocrinopathies — thyroid, adrenal, hypophysitis",
      "Rash, pruritus, fatigue"
    ],
    serious: ["Severe hepatitis (HCC context)", "Severe colitis", "Hypophysitis / adrenal crisis", "Myocarditis"]
  },
  doseModLabel: "irAE management",
  doseReductions: {
    other: [
      { label: "Single priming dose", text: "only one tremelimumab dose in STRIDE — irAEs may still occur; manage by withholding durvalumab + corticosteroids per grade." },
      { label: "Discontinue", text: "permanently discontinue the regimen for most grade ≥3/4 irAEs or myocarditis." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Imjudo) · FDA label (DailyMed). irAE management per CTCAE / ASCO-ESMO guidance",
  verified: "2026-06-30"
},

{
  id: "avelumab",
  name: "Avelumab",
  aliases: ["Bavencio"],
  class: "Checkpoint inhibitor",
  subclass: "Anti–PD-L1",
  route: ["IV"],
  atc: "L01FF04",
  brands: ["Bavencio"],
  tumours: ["Bladder", "Skin / Merkel", "Renal"],
  mechanism: "Anti–PD-L1 monoclonal antibody. Higher infusion-reaction rate — premedicate for the first 4 infusions.",
  dosing: "800 mg q2w (10 mg/kg, max 800 mg). Premedicate (antihistamine + paracetamol) before the first 4 infusions.",
  cdl: { items: [
    { cancer: "Urothelial — 1L maintenance", status: "MAF", text: "locally advanced/metastatic, no progression after 1L platinum (JAVELIN Bladder 100)" },
    { cancer: "Merkel cell carcinoma", status: "MAF", text: "metastatic (JAVELIN Merkel 200)" },
    { cancer: "Renal cell — 1L (+ axitinib)", status: "MAF", text: "untreated advanced (JAVELIN Renal 101)" }
  ] },
  toxicities: {
    common: [
      "Infusion-related reactions (premedicate first 4 doses)",
      "Immune-related — pneumonitis, colitis, hepatitis",
      "Endocrinopathies — thyroid, adrenal, T1DM",
      "Rash, fatigue"
    ],
    serious: ["Severe infusion reaction", "Severe pneumonitis / colitis / hepatitis", "Myocarditis", "Adrenal crisis / DKA"]
  },
  doseModLabel: "irAE management",
  doseReductions: {
    other: [
      { label: "Infusion reactions", text: "premedicate (antihistamine + paracetamol) for first 4 infusions; slow/interrupt for mild-moderate, discontinue for severe." },
      { label: "Withhold (grade 2)", text: "irAEs — withhold + corticosteroids; resume when ≤grade 1." },
      { label: "Discontinue", text: "permanently for most grade ≥3/4 irAEs or myocarditis." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Bavencio) · FDA label (DailyMed). JAVELIN trials cited. irAE management per CTCAE / ASCO-ESMO guidance",
  verified: "2026-06-30"
},

{
  id: "dostarlimab",
  name: "Dostarlimab",
  aliases: ["Jemperli"],
  class: "Checkpoint inhibitor",
  subclass: "Anti–PD-1",
  route: ["IV"],
  atc: "L01FF07",
  brands: ["Jemperli"],
  tumours: ["Endometrial"],
  mechanism: "Anti–PD-1 monoclonal antibody — predominantly endometrial cancer, with greatest benefit in dMMR/MSI-H tumours.",
  dosing: "500 mg q3w ×4, then 1000 mg q6w.",
  cdl: { items: [
    { cancer: "Endometrial — 1L dMMR/MSI-H (+ chemo)", status: "MAF", text: "untreated primary advanced/recurrent; + carboplatin/paclitaxel then dostarlimab mono; stop at 3 yr (RUBY)" },
    { cancer: "Endometrial — 1L all-comers (+ chemo)", status: "MSV/MSHL", text: "untreated primary advanced/recurrent; + chemo then mono; stop at 3 yr (RUBY)" },
    { cancer: "Endometrial — 2L dMMR/MSI-H (mono)", status: "MSV/MSHL", text: "recurrent/advanced, post-platinum, no prior PD-1/PD-L1 (GARNET)" }
  ] },
  toxicities: {
    common: [
      "Immune-related — pneumonitis, colitis, hepatitis",
      "Endocrinopathies — thyroid, adrenal, T1DM",
      "Rash, fatigue, nausea, anaemia"
    ],
    serious: ["Severe pneumonitis / colitis / hepatitis", "Myocarditis", "Adrenal crisis / DKA"]
  },
  doseModLabel: "irAE management",
  doseReductions: {
    other: [
      { label: "Withhold (grade 2)", text: "irAEs — withhold + corticosteroids; resume when ≤grade 1 and steroid ≤10 mg/day." },
      { label: "Discontinue", text: "permanently for most grade ≥3/4 irAEs or myocarditis." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Jemperli) · FDA label (DailyMed). RUBY/GARNET trials cited. irAE management per CTCAE / ASCO-ESMO guidance",
  verified: "2026-06-30"
},

{
  id: "nivolumab-relatlimab",
  name: "Nivolumab + relatlimab",
  aliases: ["Opdualag", "relatlimab"],
  class: "Checkpoint inhibitor",
  subclass: "Anti–PD-1 + anti–LAG-3",
  route: ["IV"],
  atc: "L01FF09",
  brands: ["Opdualag"],
  tumours: ["Melanoma"],
  mechanism: "Fixed-dose combination of nivolumab (anti–PD-1) and relatlimab (anti–LAG-3) — dual checkpoint blockade; LAG-3 is the third checkpoint with an approved inhibitor.",
  dosing: "Fixed-dose: nivolumab 480 mg + relatlimab 160 mg IV q4w.",
  cdl: { items: [
    { cancer: "Melanoma — advanced", status: "Not listed", text: "unresectable/metastatic, 1L; nivolumab + relatlimab fixed-dose (RELATIVITY-047)" }
  ] },
  toxicities: {
    common: [
      "Immune-related — pneumonitis, colitis, hepatitis, adrenal insufficiency",
      "Endocrinopathies — thyroid, adrenal, hypophysitis, T1DM",
      "Rash, pruritus, fatigue, arthralgia",
      "Myocarditis — monitor (dual checkpoint)"
    ],
    serious: ["Severe pneumonitis / colitis / hepatitis", "Myocarditis", "Adrenal crisis / DKA", "Rare neurologic irAEs"]
  },
  doseModLabel: "irAE management",
  doseReductions: {
    other: [
      { label: "Withhold (grade 2)", text: "irAEs — withhold the combination + corticosteroids; resume when ≤grade 1 and steroid ≤10 mg/day." },
      { label: "Discontinue", text: "permanently for most grade ≥3/4 irAEs or myocarditis. Given as a fixed-dose combination, not titrated separately." }
    ]
  },
  sources: "HSA register / NDF (Opdualag) · FDA label (DailyMed) · RELATIVITY-047. NOT on the MOH Cancer Drug List → not subsidised (Not listed). irAE management per CTCAE / ASCO-ESMO guidance",
  verified: "2026-06-30"
},

{
  id: "trastuzumab-emtansine",
  name: "Trastuzumab emtansine (T-DM1)",
  aliases: ["Kadcyla", "T-DM1", "ado-trastuzumab emtansine"],
  class: "Antibody-drug conjugate",
  subclass: "HER2 · DM1 (maytansinoid)",
  route: ["IV"],
  atc: "L01FD03",
  brands: ["Kadcyla"],
  tumours: ["Breast"],
  mechanism: "HER2-directed ADC — trastuzumab linked to DM1 (microtubule inhibitor); delivers payload into HER2+ cells. Do not substitute for/with trastuzumab.",
  boxedWarning: "Hepatotoxicity (including fatal liver failure / nodular regenerative hyperplasia). Cardiotoxicity — LVEF decline. Embryo-fetal toxicity.",
  indications: [
    { indication: "Breast — HER2+ adjuvant (residual disease)", hsa: "y", fda: "y", dose: "3.6 mg/kg q3w ×14 (post-neoadjuvant residual, KATHERINE)" },
    { indication: "Breast — HER2+ advanced (2L)", hsa: "y", fda: "y", dose: "3.6 mg/kg q3w (post-trastuzumab + chemo, EMILIA)" }
  ],
  cdl: { items: [
    { cancer: "Breast — HER2+ adjuvant", status: "MSV/MSHL", text: "residual invasive disease after neoadjuvant trastuzumab + taxane; max 14 cycles" },
    { cancer: "Breast — HER2+ advanced", status: "MSV/MSHL", text: "LA/unresectable/metastatic, after prior trastuzumab + chemotherapy" }
  ] },
  toxicities: {
    common: ["Thrombocytopenia (prominent)", "Transaminitis / hepatotoxicity", "Fatigue, nausea", "Peripheral neuropathy", "Epistaxis, headache", "LVEF decline"],
    serious: ["Fatal hepatotoxicity / nodular regenerative hyperplasia", "Severe thrombocytopenia / haemorrhage", "Cardiac failure", "Pneumonitis (rare)"]
  },
  doseReductions: {
    other: [
      { label: "Thrombocytopenia", text: "hold for platelets <100k; reduce one dose level on recovery; discontinue for grade 4." },
      { label: "Hepatotoxicity", text: "hold for AST/ALT >3× or bilirubin >1.5× ULN; discontinue for transaminases >3× with bilirubin >2× ULN." },
      { label: "LVEF", text: "hold for symptomatic CHF or LVEF <40%; reassess before resuming." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Kadcyla) · FDA label (DailyMed). KATHERINE, EMILIA",
  verified: "2026-06-30"
},

{
  id: "trastuzumab-deruxtecan",
  name: "Trastuzumab deruxtecan (T-DXd)",
  aliases: ["Enhertu", "T-DXd", "fam-trastuzumab deruxtecan"],
  class: "Antibody-drug conjugate",
  subclass: "HER2 · deruxtecan (topo-I)",
  route: ["IV"],
  atc: "L01FD04",
  brands: ["Enhertu"],
  tumours: ["Breast", "Gastric"],
  mechanism: "HER2-directed ADC — trastuzumab linked to a topoisomerase-I inhibitor (deruxtecan); high drug-to-antibody ratio + bystander effect (active in HER2-low).",
  boxedWarning: "Interstitial lung disease / pneumonitis — can be severe, life-threatening or fatal; monitor and interrupt/treat promptly. Embryo-fetal toxicity.",
  indications: [
    { indication: "Breast — HER2+ advanced (2L+)", hsa: "y", fda: "y", dose: "5.4 mg/kg q3w (post anti-HER2, DESTINY-Breast03)" },
    { indication: "Breast — HER2-low advanced", hsa: "y", fda: "y", dose: "5.4 mg/kg q3w (≥1 prior chemo; HR+ endocrine-refractory, DESTINY-Breast04)" },
    { indication: "Gastric / GEJ — HER2+ (≥3L)", hsa: "y", fda: "y", dose: "6.4 mg/kg q3w (≥2 prior incl. trastuzumab, DESTINY-Gastric01)" }
  ],
  cdl: { items: [
    { cancer: "Breast — HER2+ advanced", status: "MSV/MSHL", text: "unresectable/metastatic, after a prior anti-HER2 regimen" },
    { cancer: "Breast — HER2-low advanced", status: "MSV/MSHL", text: "≥1 prior chemo in metastatic (or recurrence ≤6 mo of adjuvant); HR+ must be endocrine-refractory" },
    { cancer: "Gastric / GEJ — HER2+", status: "MSV/MSHL", text: "LA/metastatic, ≥2 prior regimens incl. trastuzumab" }
  ] },
  toxicities: {
    common: ["Nausea / vomiting (highly emetogenic)", "Fatigue, alopecia", "Neutropenia, anaemia", "Decreased appetite", "LVEF decline"],
    serious: ["Interstitial lung disease / pneumonitis (may be fatal)", "Severe neutropenia", "Cardiac failure"]
  },
  doseReductions: {
    other: [
      { label: "ILD / pneumonitis", text: "any grade — interrupt + investigate. Grade 1 → resume after resolution; grade ≥2 → corticosteroids + PERMANENTLY discontinue." },
      { label: "Neutropenia", text: "grade 3-4 → interrupt until ≤grade 2, then reduce one dose level." },
      { label: "LVEF", text: "hold for LVEF 40-45% with >10% drop; discontinue if <40% or symptomatic CHF." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Enhertu) · FDA label (DailyMed). DESTINY-Breast03/04, DESTINY-Gastric01",
  verified: "2026-06-30"
},

{
  id: "sacituzumab-govitecan",
  name: "Sacituzumab govitecan",
  aliases: ["Trodelvy"],
  class: "Antibody-drug conjugate",
  subclass: "Trop-2 · SN-38 (topo-I)",
  route: ["IV"],
  atc: "L01FX17",
  brands: ["Trodelvy"],
  tumours: ["Breast"],
  mechanism: "Trop-2-directed ADC — delivers SN-38 (the active metabolite of irinotecan, a topoisomerase-I inhibitor).",
  boxedWarning: "Severe or life-threatening neutropenia. Severe diarrhoea.",
  indications: [
    { indication: "Breast — TNBC (2L+)", hsa: "y", fda: "y", dose: "10 mg/kg D1,8 q3w (≥2 prior, ≥1 for metastatic; ASCENT)" },
    { indication: "Breast — HR+/HER2- (post-endocrine)", hsa: "y", fda: "y", dose: "10 mg/kg D1,8 q3w (post-endocrine + ≥2 systemic for mets; TROPiCS-02)" }
  ],
  cdl: { items: [
    { cancer: "Breast — TNBC", status: "MSV/MSHL", text: "unresectable LA/metastatic, ≥2 prior systemic (≥1 for metastatic)" },
    { cancer: "Breast — HR+/HER2-", status: "MSV/MSHL", text: "unresectable LA/metastatic, post endocrine-based + ≥2 additional systemic for metastatic" }
  ] },
  toxicities: {
    common: ["Neutropenia (dose-limiting)", "Diarrhoea", "Nausea / vomiting", "Anaemia", "Fatigue, alopecia"],
    serious: ["Febrile / severe neutropenia", "Severe diarrhoea / dehydration", "Hypersensitivity / infusion reaction"]
  },
  doseReductions: {
    other: [
      { label: "Neutropenia", text: "G-CSF support; hold for ANC <1500 (day 1) or <1000 (day 8); reduce 25% for severe/febrile or recurrent." },
      { label: "Diarrhoea", text: "loperamide; assess for infection; hold + reduce for grade 3-4." },
      { label: "UGT1A1", text: "poor metabolisers (*28/*28) at higher risk of severe neutropenia — monitor closely." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Trodelvy) · FDA label (DailyMed). ASCENT, TROPiCS-02",
  verified: "2026-06-30"
},

{
  id: "enfortumab-vedotin",
  name: "Enfortumab vedotin",
  aliases: ["Padcev"],
  class: "Antibody-drug conjugate",
  subclass: "Nectin-4 · MMAE (antimicrotubule)",
  route: ["IV"],
  atc: "L01FX13",
  brands: ["Padcev"],
  tumours: ["Bladder"],
  mechanism: "Nectin-4-directed ADC — delivers MMAE (microtubule disruptor) to urothelial carcinoma cells.",
  boxedWarning: "Serious and fatal skin reactions — including Stevens-Johnson syndrome and toxic epidermal necrolysis; monitor closely, withhold/discontinue for severe reactions.",
  indications: [
    { indication: "Urothelial — advanced (post-IO + platinum)", hsa: "y", fda: "y", dose: "1.25 mg/kg D1,8,15 q4w (EV-301)" }
  ],
  cdl: { items: [
    { cancer: "Urothelial — advanced", status: "MSV/MSHL", text: "LA/metastatic, after a PD-1/PD-L1 inhibitor and platinum chemotherapy" }
  ] },
  toxicities: {
    common: ["Skin reactions / rash", "Peripheral sensory neuropathy", "Hyperglycaemia (monitor — can be severe)", "Fatigue, alopecia, decreased appetite", "Diarrhoea, nausea"],
    serious: ["SJS / TEN (may be fatal)", "Severe hyperglycaemia / DKA", "Pneumonitis", "Severe peripheral neuropathy"]
  },
  doseReductions: {
    other: [
      { label: "Skin reactions", text: "withhold for grade 2-3 until ≤grade 1; PERMANENTLY discontinue for SJS/TEN or grade 4." },
      { label: "Hyperglycaemia", text: "withhold if blood glucose >250 mg/dL until ≤250; monitor even in non-diabetics." },
      { label: "Peripheral neuropathy", text: "withhold for grade 2-3 until ≤grade 1, resume reduced; discontinue grade 4." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Padcev) · FDA label (DailyMed). EV-301",
  verified: "2026-06-30"
},

{
  id: "brentuximab-vedotin",
  name: "Brentuximab vedotin",
  aliases: ["Adcetris"],
  class: "Antibody-drug conjugate",
  subclass: "CD30 · MMAE (antimicrotubule)",
  route: ["IV"],
  atc: "L01FX05",
  brands: ["Adcetris"],
  tumours: ["Lymphoma"],
  mechanism: "CD30-directed ADC — delivers MMAE to CD30+ lymphoma cells. Concomitant bleomycin is contraindicated (pulmonary toxicity).",
  boxedWarning: "Progressive multifocal leukoencephalopathy (PML) — JC-virus reactivation; can be fatal.",
  indications: [
    { indication: "Hodgkin lymphoma — advanced 1L (+ AVD)", hsa: "y", fda: "y", dose: "1.2 mg/kg q2w + AVD (ECHELON-1)" },
    { indication: "Hodgkin lymphoma — R/R", hsa: "y", fda: "y", dose: "1.8 mg/kg q3w (post-ASCT or ≥2 prior)" },
    { indication: "Hodgkin lymphoma — post-ASCT consolidation", hsa: "y", fda: "y", dose: "1.8 mg/kg q3w (high-risk, AETHERA)" },
    { indication: "Peripheral T-cell lymphoma — 1L (+ CHP)", hsa: "y", fda: "y", dose: "1.8 mg/kg q3w + CHP (CD30+, ECHELON-2)" },
    { indication: "Systemic ALCL — R/R", hsa: "y", fda: "y", dose: "1.8 mg/kg q3w" },
    { indication: "Cutaneous T-cell lymphoma — CD30+", hsa: "y", fda: "y", dose: "1.8 mg/kg q3w, ≥1 prior, max 16 cyc (ALCANZA)" }
  ],
  cdl: { items: [
    { cancer: "Hodgkin — 1L advanced (+ AVD, bleomycin-intolerant)", status: "MAF", text: "CD30+ advanced cHL (ECHELON-1)" },
    { cancer: "Hodgkin — 1L advanced (+ AVD, all-comers)", status: "MSV/MSHL", text: "CD30+ advanced cHL" },
    { cancer: "Hodgkin — R/R", status: "MAF", text: "post-ASCT, or ≥2 prior when ASCT/multi-agent not an option; max 16 cyc" },
    { cancer: "Hodgkin — post-ASCT consolidation", status: "MAF", text: "CD30+, increased relapse risk; max 16 cyc" },
    { cancer: "Peripheral T-cell lymphoma — 1L (+ CHP)", status: "MAF", text: "untreated CD30+ PTCL" },
    { cancer: "Systemic ALCL — R/R", status: "MAF", text: "max 16 cyc" },
    { cancer: "Cutaneous T-cell lymphoma — CD30+", status: "MAF", text: "≥1 prior systemic; max 16 cyc" }
  ] },
  toxicities: {
    common: ["Peripheral sensory neuropathy (prominent, cumulative)", "Neutropenia", "Nausea, fatigue, diarrhoea", "Infusion reactions", "Anaemia"],
    serious: ["PML (rare)", "Febrile neutropenia", "Pulmonary toxicity (with bleomycin — contraindicated)", "Pancreatitis", "Tumour lysis", "SJS/TEN (rare)"]
  },
  doseReductions: {
    other: [
      { label: "Peripheral neuropathy", text: "hold for grade 2-3 until ≤grade 1, resume at 1.2 mg/kg; discontinue for grade 4." },
      { label: "Neutropenia", text: "hold for grade 3-4 until recovery; consider G-CSF; reduce on recurrence." },
      { label: "Avoid bleomycin", text: "concomitant bleomycin is contraindicated (pulmonary toxicity)." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Adcetris) · FDA label (DailyMed). ECHELON-1/-2, ALCANZA, AETHERA",
  verified: "2026-06-30"
},

{
  id: "polatuzumab-vedotin",
  name: "Polatuzumab vedotin",
  aliases: ["Polivy"],
  class: "Antibody-drug conjugate",
  subclass: "CD79b · MMAE (antimicrotubule)",
  route: ["IV"],
  atc: "L01FX18",
  brands: ["Polivy"],
  tumours: ["Lymphoma"],
  mechanism: "CD79b-directed ADC — delivers MMAE to B-cell lymphoma cells.",
  indications: [
    { indication: "DLBCL — 1L (+ R-CHP)", hsa: "y", fda: "y", dose: "1.8 mg/kg q3w ×6 + R-CHP (IPI 3-5, POLARIX)" }
  ],
  cdl: { items: [
    { cancer: "DLBCL — 1L (+ R-CHP, subsidised rituximab biosimilar)", status: "MAF", text: "previously untreated, IPI 3-5 (POLARIX)" },
    { cancer: "DLBCL — 1L (+ R-CHP, non-subsidised rituximab brand)", status: "MSV/MSHL", text: "previously untreated (IPI 3-5, or all-comers)" }
  ] },
  toxicities: {
    common: ["Peripheral neuropathy", "Neutropenia", "Anaemia, thrombocytopenia", "Infections", "Fatigue, diarrhoea, nausea"],
    serious: ["Febrile neutropenia / serious infection", "PML (rare)", "Tumour lysis syndrome", "Hepatotoxicity"]
  },
  doseReductions: {
    other: [
      { label: "Peripheral neuropathy", text: "hold for grade 2-3 until ≤grade 1, resume reduced; discontinue for grade 4." },
      { label: "Neutropenia", text: "hold for grade 3-4; G-CSF prophylaxis recommended with R-CHP." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Polivy) · FDA label (DailyMed). POLARIX",
  verified: "2026-06-30"
},

{
  id: "osimertinib",
  name: "Osimertinib",
  aliases: ["Tagrisso"],
  class: "EGFR inhibitor",
  subclass: "3rd-gen (T790M-active)",
  route: ["PO"],
  atc: "L01EB04",
  brands: ["Tagrisso"],
  tumours: ["Lung — NSCLC"],
  mechanism: "3rd-generation irreversible EGFR TKI — active against sensitising mutations and T790M resistance; CNS-penetrant.",
  dosing: "80 mg PO once daily (40 mg if dose-reduced).",
  cdl: { items: [
    { cancer: "NSCLC — 2L (EGFR T790M+)", status: "MAF", text: "LA/metastatic, progressed on/after an EGFR TKI (AURA3)" },
    { cancer: "NSCLC — 1L (EGFR-mutant)", status: "MSV/MSHL", text: "newly diagnosed LA/metastatic EGFR-mut; incl. intolerance to another EGFR TKI (FLAURA)" },
    { cancer: "NSCLC — adjuvant (EGFR ex19del/L858R)", status: "MSV/MSHL", text: "resected stage IB-IIIA; max 3 yr (ADAURA)" }
  ] },
  toxicities: {
    common: ["Diarrhoea", "Rash / acneiform, dry skin, paronychia", "Stomatitis", "Decreased appetite", "Mild cytopenias"],
    serious: ["Interstitial lung disease / pneumonitis", "QTc prolongation", "Cardiomyopathy / LVEF decline", "Erythema multiforme / SJS (rare)"]
  },
  doseReductions: {
    other: [
      { label: "ILD / pneumonitis", text: "permanently discontinue for any grade of confirmed ILD." },
      { label: "QTc / cardiac", text: "hold for QTc >500 ms or symptomatic arrhythmia; monitor LVEF, hold/discontinue for significant decline." },
      { label: "Other toxicity", text: "reduce 80 → 40 mg for grade ≥3; discontinue if intolerable." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Tagrisso) · FDA label (DailyMed). FLAURA, AURA3, ADAURA",
  verified: "2026-06-30"
},

{
  id: "afatinib",
  name: "Afatinib",
  aliases: ["Giotrif", "Gilotrif"],
  class: "EGFR inhibitor",
  subclass: "2nd-gen irreversible (pan-HER)",
  route: ["PO"],
  atc: "L01EB03",
  brands: ["Giotrif"],
  tumours: ["Lung — NSCLC"],
  mechanism: "2nd-generation irreversible ErbB-family (EGFR/HER2/HER4) TKI — covers common and some uncommon EGFR mutations.",
  dosing: "40 mg PO once daily (reduce 40 → 30 → 20 mg).",
  cdl: { items: [
    { cancer: "NSCLC — 1L (EGFR-mutant)", status: "MAF", text: "locally advanced or metastatic EGFR-mut NSCLC (LUX-Lung 3/6)" }
  ] },
  toxicities: {
    common: ["Diarrhoea (prominent)", "Rash / acneiform", "Stomatitis", "Paronychia", "Dry skin"],
    serious: ["Severe diarrhoea / dehydration", "ILD (rare)", "Hepatotoxicity", "Keratitis"]
  },
  doseReductions: {
    other: [
      { label: "Diarrhoea", text: "loperamide + fluids; hold for grade ≥2 until ≤grade 1, resume reduced (40 → 30 → 20 mg)." },
      { label: "Skin / other", text: "reduce one level for grade ≥3; discontinue if intolerable at 20 mg." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Giotrif) · FDA label (DailyMed). LUX-Lung 3/6",
  verified: "2026-06-30"
},

{
  id: "erlotinib",
  name: "Erlotinib",
  aliases: ["Tarceva"],
  class: "EGFR inhibitor",
  subclass: "1st-gen reversible",
  route: ["PO"],
  atc: "L01EB02",
  brands: ["Tarceva"],
  tumours: ["Lung — NSCLC"],
  mechanism: "1st-generation reversible EGFR TKI.",
  indications: [
    { indication: "NSCLC — EGFR-mutant (advanced)", hsa: "y", fda: "y", dose: "150 mg PO daily (1L or maintenance)" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: ["Rash / acneiform", "Diarrhoea", "Dry skin, paronychia", "Fatigue, anorexia"],
    serious: ["ILD (rare)", "Hepatotoxicity", "GI perforation (rare)"]
  },
  doseReductions: {
    other: [
      { label: "Skin / diarrhoea", text: "reduce 150 → 100 → 50 mg for grade ≥3; supportive care." },
      { label: "Food effect", text: "take on an empty stomach (≥1 h before / 2 h after food)." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026, SDL) · HSA register (Tarceva) · FDA label (DailyMed)",
  verified: "2026-06-30"
},

{
  id: "gefitinib",
  name: "Gefitinib",
  aliases: ["Iressa"],
  class: "EGFR inhibitor",
  subclass: "1st-gen reversible",
  route: ["PO"],
  atc: "L01EB01",
  brands: ["Iressa"],
  tumours: ["Lung — NSCLC"],
  mechanism: "1st-generation reversible EGFR TKI.",
  indications: [
    { indication: "NSCLC — 1L EGFR-mutant (advanced)", hsa: "y", fda: "y", dose: "250 mg PO daily (IPASS)" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: ["Rash / acneiform", "Diarrhoea", "Dry skin", "Nausea, anorexia"],
    serious: ["Interstitial lung disease (higher in East-Asian patients — monitor)", "Hepatotoxicity"]
  },
  doseReductions: {
    other: [
      { label: "ILD", text: "interrupt + investigate for acute dyspnoea/cough/fever; discontinue if confirmed." },
      { label: "Toxicity", text: "single 250 mg strength — interrupt up to 14 days for grade ≥3, then resume; monitor LFTs." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026, SDL) · HSA register (Iressa) · FDA label (DailyMed). IPASS",
  verified: "2026-06-30"
},

{
  id: "dacomitinib",
  name: "Dacomitinib",
  aliases: ["Vizimpro"],
  class: "EGFR inhibitor",
  subclass: "2nd-gen irreversible (pan-HER)",
  route: ["PO"],
  atc: "L01EB07",
  brands: ["Vizimpro"],
  tumours: ["Lung — NSCLC"],
  mechanism: "2nd-generation irreversible pan-HER TKI.",
  indications: [
    { indication: "NSCLC — 1L EGFR ex19del/L858R (advanced)", hsa: "y", fda: "y", dose: "45 mg PO daily (ARCHER-1050)" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: ["Diarrhoea", "Rash / acneiform", "Paronychia", "Stomatitis", "Dry skin (more toxic than other EGFR TKIs)"],
    serious: ["Severe diarrhoea", "ILD (rare)"]
  },
  doseReductions: {
    other: [
      { label: "Toxicity", text: "reduce 45 → 30 → 15 mg for grade ≥3 diarrhoea / skin / mucositis; supportive care." },
      { label: "ILD", text: "discontinue for confirmed ILD." }
    ]
  },
  sources: "MOH Cancer Drug List (1 Jun 2026, SDL) · HSA register (Vizimpro) · FDA label (DailyMed). ARCHER-1050",
  verified: "2026-06-30"
},

{
  id: "alectinib",
  name: "Alectinib",
  aliases: ["Alecensa"],
  class: "ALK inhibitor",
  subclass: "2nd-gen (CNS-active)",
  route: ["PO"],
  atc: "L01ED03",
  brands: ["Alecensa"],
  tumours: ["Lung — NSCLC"],
  mechanism: "2nd-generation ALK TKI — high CNS penetration; a preferred 1L option for ALK+ NSCLC.",
  dosing: "600 mg PO BID with food (reduce 600 → 450 → 300 mg BID).",
  cdl: { items: [
    { cancer: "NSCLC — advanced (ALK+)", status: "MAF", text: "locally advanced or metastatic ALK+ NSCLC (ALEX)" },
    { cancer: "NSCLC — adjuvant (ALK+)", status: "MSV/MSHL", text: "resected stage II-IIIB (T3N2); max 2 yr (ALINA)" }
  ] },
  toxicities: {
    common: ["Myalgia, CPK elevation", "Oedema", "Constipation", "Anaemia", "Transaminitis", "Photosensitivity, bradycardia"],
    serious: ["Hepatotoxicity", "ILD / pneumonitis", "Severe myalgia / rhabdomyolysis (rare)", "Bradycardia"]
  },
  doseReductions: { other: [
    { label: "Toxicity", text: "reduce 600 → 450 → 300 mg BID for grade ≥3 (hepatic, CPK/myalgia); discontinue below 300 mg BID." },
    { label: "ILD / hepatotoxicity", text: "hold + investigate; discontinue for confirmed ILD or severe hepatotoxicity." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Alecensa) · FDA label (DailyMed). ALEX, ALINA",
  verified: "2026-06-30"
},

{
  id: "brigatinib",
  name: "Brigatinib",
  aliases: ["Alunbrig"],
  class: "ALK inhibitor",
  subclass: "2nd-gen",
  route: ["PO"],
  atc: "L01ED04",
  brands: ["Alunbrig"],
  tumours: ["Lung — NSCLC"],
  mechanism: "2nd-generation ALK TKI with broad resistance-mutation coverage and CNS activity.",
  dosing: "90 mg PO daily ×7 days (lead-in), then 180 mg daily — the lead-in mitigates early pulmonary events.",
  cdl: { items: [
    { cancer: "NSCLC — advanced (ALK+)", status: "MAF", text: "locally advanced or metastatic ALK+ NSCLC (ALTA-1L)" }
  ] },
  toxicities: {
    common: ["Hypertension", "GI (nausea, diarrhoea)", "Rash", "CPK / lipase / amylase elevation", "Cough, fatigue", "Visual disturbance"],
    serious: ["Early pulmonary events (within first week — hence the 7-day lead-in)", "Pneumonitis", "Severe hypertension", "Bradycardia"]
  },
  doseReductions: { other: [
    { label: "Early pulmonary events", text: "use the 7-day 90 mg lead-in; hold for new respiratory symptoms; discontinue for confirmed ILD." },
    { label: "Toxicity", text: "reduce 180 → 120 → 90 mg for grade ≥3 (hypertension, CPK, hepatic)." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Alunbrig) · FDA label (DailyMed). ALTA-1L",
  verified: "2026-06-30"
},

{
  id: "lorlatinib",
  name: "Lorlatinib",
  aliases: ["Lorviqua", "Lorbrena"],
  class: "ALK inhibitor",
  subclass: "3rd-gen (ALK/ROS1, CNS)",
  route: ["PO"],
  atc: "L01ED05",
  brands: ["Lorviqua"],
  tumours: ["Lung — NSCLC"],
  mechanism: "3rd-generation ALK/ROS1 TKI — covers most resistance mutations incl. G1202R; high CNS penetration.",
  dosing: "100 mg PO once daily (reduce 100 → 75 → 50 mg).",
  cdl: { items: [
    { cancer: "NSCLC — advanced (ALK+)", status: "MAF", text: "locally advanced or metastatic ALK+ NSCLC (1L CROWN, or post-prior ALK TKI)" }
  ] },
  toxicities: {
    common: ["Hyperlipidaemia — hypercholesterolaemia + hypertriglyceridaemia (prominent; needs statin)", "Oedema, weight gain", "CNS effects — cognitive / mood / speech (notable)", "Peripheral neuropathy", "Fatigue"],
    serious: ["Severe CNS / psychiatric effects", "AV block", "Severe hyperlipidaemia / pancreatitis", "ILD (rare)"]
  },
  doseReductions: { other: [
    { label: "Hyperlipidaemia", text: "start a statin; manage per lipids (rarely needs a dose change)." },
    { label: "CNS effects", text: "hold for grade ≥2 CNS effects until ≤grade 1, resume reduced (100 → 75 → 50 mg)." },
    { label: "Other toxicity", text: "reduce one level for grade ≥3." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Lorviqua) · FDA label (DailyMed). CROWN",
  verified: "2026-06-30"
},

{
  id: "ceritinib",
  name: "Ceritinib",
  aliases: ["Zykadia"],
  class: "ALK inhibitor",
  subclass: "2nd-gen",
  route: ["PO"],
  atc: "L01ED02",
  brands: ["Zykadia"],
  tumours: ["Lung — NSCLC"],
  mechanism: "2nd-generation ALK TKI.",
  indications: [
    { indication: "NSCLC — advanced (ALK+)", hsa: "y", fda: "y", dose: "450 mg PO daily with food (ASCEND)" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: ["Diarrhoea, nausea, vomiting (prominent GI)", "Transaminitis", "Hyperglycaemia", "Fatigue", "Abdominal pain"],
    serious: ["Hepatotoxicity", "QTc prolongation", "ILD / pneumonitis", "Hyperglycaemia", "Bradycardia / pancreatitis"]
  },
  doseReductions: { other: [
    { label: "GI / hepatic", text: "take 450 mg with food; reduce by 150 mg increments for grade ≥3 GI or transaminitis." },
    { label: "QTc / ILD", text: "hold for QTc >500 ms; discontinue for confirmed ILD." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, SDL) · HSA register (Zykadia) · FDA label (DailyMed). ASCEND",
  verified: "2026-06-30"
},

{
  id: "crizotinib",
  name: "Crizotinib",
  aliases: ["Xalkori"],
  class: "ALK inhibitor",
  subclass: "1st-gen (ALK/ROS1/MET)",
  route: ["PO"],
  atc: "L01ED01",
  brands: ["Xalkori"],
  tumours: ["Lung — NSCLC", "Lymphoma"],
  mechanism: "1st-generation ALK/ROS1/MET TKI. Now used mainly for ROS1+ NSCLC (ALK NSCLC largely superseded by 2nd/3rd-gen agents).",
  dosing: "250 mg PO BID (reduce 200 mg BID → 250 mg daily).",
  cdl: { items: [
    { cancer: "NSCLC — advanced (ROS1+)", status: "MSV/MSHL", text: "locally advanced/metastatic ROS1+ NSCLC, no prior ROS1 inhibitor (PROFILE-1001)" },
    { cancer: "Systemic ALCL (ALK+) — R/R (paediatric)", status: "MSV/MSHL", text: "≥1 yr / young adults, relapsed/refractory ALK+ sALCL" }
  ] },
  toxicities: {
    common: ["Visual disturbances (prominent)", "Nausea / vomiting / diarrhoea", "Oedema", "Transaminitis", "Constipation, fatigue", "Bradycardia"],
    serious: ["Hepatotoxicity", "ILD / pneumonitis", "QTc prolongation", "Severe visual loss (rare)", "Bradycardia"]
  },
  doseReductions: { other: [
    { label: "Hepatic / QTc", text: "hold + reduce (250 BID → 200 BID → 250 daily) for grade ≥3 transaminitis or QTc >500 ms." },
    { label: "ILD", text: "discontinue for confirmed ILD." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Xalkori) · FDA label (DailyMed). PROFILE-1001/1014",
  verified: "2026-06-30"
},

{
  id: "entrectinib",
  name: "Entrectinib",
  aliases: ["Rozlytrek"],
  class: "ROS1/NTRK inhibitor",
  subclass: "CNS-active",
  route: ["PO"],
  atc: "L01EX14",
  brands: ["Rozlytrek"],
  tumours: ["Lung — NSCLC", "Tumour-agnostic"],
  mechanism: "ROS1 / NTRK / ALK TKI with CNS penetration.",
  dosing: "600 mg PO once daily (reduce 600 → 400 → 200 mg).",
  cdl: { items: [
    { cancer: "NSCLC — advanced (ROS1+)", status: "MSV/MSHL", text: "LA/metastatic ROS1+ NSCLC, no prior ROS1 inhibitor" },
    { cancer: "Tumour-agnostic (NTRK fusion)", status: "MSV/MSHL", text: "solid tumours with NTRK fusion (no resistance mutation), metastatic / unresectable, no satisfactory alternative" }
  ] },
  toxicities: {
    common: ["Dysgeusia", "Fatigue, dizziness", "Constipation", "Oedema, weight gain", "Peripheral neuropathy"],
    serious: ["CHF / LVEF decline", "QTc prolongation", "CNS / cognitive effects", "Hepatotoxicity", "Skeletal fractures"]
  },
  doseReductions: { other: [
    { label: "Toxicity", text: "reduce 600 → 400 → 200 mg for grade ≥3 (cardiac, CNS, hepatic, QTc)." },
    { label: "CHF / QTc", text: "monitor LVEF + ECG; hold/discontinue for significant decline or QTc >500 ms." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Rozlytrek) · FDA label (DailyMed). STARTRK-2",
  verified: "2026-06-30"
},

{
  id: "larotrectinib",
  name: "Larotrectinib",
  aliases: ["Vitrakvi"],
  class: "NTRK inhibitor",
  subclass: "selective TRK",
  route: ["PO"],
  atc: "L01EX12",
  brands: ["Vitrakvi"],
  tumours: ["Tumour-agnostic"],
  mechanism: "Highly selective TRK (NTRK1/2/3) inhibitor — tumour-agnostic for NTRK-fusion solid tumours.",
  dosing: "100 mg PO BID (reduce per toxicity).",
  cdl: { items: [
    { cancer: "Tumour-agnostic (NTRK fusion)", status: "MSV/MSHL", text: "solid tumours with NTRK fusion (no resistance mutation), metastatic / unresectable, no satisfactory alternative (NAVIGATE)" }
  ] },
  toxicities: {
    common: ["Fatigue, dizziness", "Nausea", "Transaminitis", "Cough", "Constipation"],
    serious: ["Hepatotoxicity", "CNS effects (dizziness, cognitive)", "Skeletal fractures"]
  },
  doseReductions: { other: [
    { label: "Toxicity", text: "reduce stepwise for grade ≥3 (hepatic, CNS); monitor LFTs." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Vitrakvi) · FDA label (DailyMed). NAVIGATE / LOXO-TRK",
  verified: "2026-06-30"
},

{
  id: "tepotinib",
  name: "Tepotinib",
  aliases: ["Tepmetko"],
  class: "MET inhibitor",
  subclass: "selective MET",
  route: ["PO"],
  atc: "L01EX21",
  brands: ["Tepmetko"],
  tumours: ["Lung — NSCLC"],
  mechanism: "Selective MET TKI for MET exon-14 skipping NSCLC.",
  dosing: "450 mg PO once daily with food (reduce to 225 mg).",
  cdl: { items: [
    { cancer: "NSCLC — metastatic (METex14)", status: "MAF", text: "MET exon-14 skipping alterations (VISION)" }
  ] },
  toxicities: {
    common: ["Peripheral oedema (prominent)", "Nausea, diarrhoea", "Hypoalbuminaemia", "Transaminitis", "Fatigue"],
    serious: ["ILD / pneumonitis", "Hepatotoxicity", "Severe fluid retention"]
  },
  doseReductions: { other: [
    { label: "Oedema", text: "diuretics / supportive; interrupt for grade ≥3, resume at 225 mg." },
    { label: "ILD / hepatic", text: "discontinue for confirmed ILD; hold for grade ≥3 transaminitis." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Tepmetko) · FDA label (DailyMed). VISION",
  verified: "2026-06-30"
},

{
  id: "dabrafenib-trametinib",
  name: "Dabrafenib + trametinib",
  aliases: ["Tafinlar + Mekinist", "dabrafenib", "trametinib"],
  class: "BRAF/MEK inhibitor",
  subclass: "BRAF + MEK combination",
  route: ["PO"],
  atc: "L01EC02",
  brands: ["Tafinlar", "Mekinist"],
  tumours: ["Melanoma", "Lung — NSCLC", "Thyroid", "CNS"],
  mechanism: "BRAF (dabrafenib) + MEK (trametinib) inhibitor combination for BRAF V600-mutant tumours; dual blockade limits paradoxical MAPK activation and delays resistance.",
  dosing: "Dabrafenib 150 mg PO BID + trametinib 2 mg PO once daily.",
  cdl: { items: [
    { cancer: "Melanoma — advanced (BRAF V600)", status: "MAF", text: "unresectable/metastatic, no prior BRAF/MEK inhibitor (COMBI-d/v)" },
    { cancer: "Melanoma — adjuvant (BRAF V600)", status: "MSV/MSHL", text: "resected, node+; max 12 mo (COMBI-AD)" },
    { cancer: "NSCLC — advanced (BRAF V600)", status: "MAF", text: "BRAF V600-mutant advanced NSCLC" },
    { cancer: "Anaplastic thyroid (BRAF V600)", status: "MAF", text: "LA/metastatic, no satisfactory locoregional option (ROAR)" },
    { cancer: "Glioma — paediatric LGG/HGG (BRAF V600E)", status: "MAF", text: "≥1 yr; LGG needing systemic therapy, or HGG post-prior treatment" }
  ] },
  toxicities: {
    common: ["Pyrexia (characteristic — fever ± chills/rigors)", "Fatigue, chills", "Rash, arthralgia", "Nausea, diarrhoea", "Headache"],
    serious: ["High fever / hypotension (pyrexia syndrome)", "Cardiomyopathy / LVEF decline", "Ocular — uveitis, retinal vein occlusion", "Haemorrhage, VTE", "Hyperglycaemia, hepatotoxicity", "Serious skin reactions (fewer cutaneous SCCs than BRAF monotherapy)"]
  },
  doseReductions: { other: [
    { label: "Pyrexia", text: "interrupt BOTH drugs for fever ≥38.5°C; antipyretics ± short corticosteroid; resume when afebrile ≥24 h. Recurrent → dose-reduce." },
    { label: "Cardiac / ocular", text: "baseline + periodic LVEF; hold for symptomatic LVEF drop or serious eye toxicity." },
    { label: "Other toxicity", text: "reduce dabrafenib (150 → 100 → 75 → 50 BID) and/or trametinib (2 → 1.5 → 1 mg) per component." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Tafinlar/Mekinist) · FDA label (DailyMed). COMBI-d/v/AD, ROAR",
  verified: "2026-06-30"
},

{
  id: "encorafenib",
  name: "Encorafenib",
  aliases: ["Braftovi"],
  class: "BRAF inhibitor",
  subclass: "BRAF V600",
  route: ["PO"],
  atc: "L01EC03",
  brands: ["Braftovi"],
  tumours: ["Colorectal", "Melanoma"],
  mechanism: "BRAF V600 inhibitor. Funded in SG for BRAF V600E mCRC with cetuximab; also melanoma with binimetinib (MEK) — always combined to limit paradoxical activation.",
  dosing: "mCRC: 300 mg PO daily + cetuximab. Melanoma: 450 mg PO daily + binimetinib 45 mg BID.",
  cdl: { items: [
    { cancer: "Colorectal — BRAF V600E (+ cetuximab)", status: "MSV/MSHL", text: "metastatic, after prior systemic therapy (BEACON CRC)" }
  ] },
  toxicities: {
    common: ["Fatigue", "Nausea, diarrhoea", "Arthralgia, myalgia", "Dermatologic — rash, hyperkeratosis", "Headache"],
    serious: ["Secondary cutaneous malignancies (keratoacanthoma / SCC)", "QTc prolongation", "Hepatotoxicity", "Uveitis", "Haemorrhage"]
  },
  doseReductions: { other: [
    { label: "Always combine", text: "do not use as BRAF monotherapy (paradoxical MAPK activation) — give with cetuximab (CRC) or binimetinib (melanoma)." },
    { label: "Toxicity", text: "reduce stepwise for grade ≥3 (skin, QTc, hepatic); dermatologic surveillance for new skin lesions." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Braftovi) · FDA label (DailyMed). BEACON CRC; COLUMBUS (melanoma)",
  verified: "2026-06-30"
},

{
  id: "cabozantinib",
  name: "Cabozantinib",
  aliases: ["Cabometyx", "Cometriq"],
  class: "VEGFR TKI",
  subclass: "VEGFR/MET/AXL/RET",
  route: ["PO"],
  atc: "L01EX07",
  brands: ["Cabometyx"],
  tumours: ["Renal", "Hepatocellular"],
  mechanism: "Multikinase VEGFR2 / MET / AXL / RET inhibitor.",
  dosing: "60 mg PO once daily (40 mg with nivolumab); reduce 60 → 40 → 20 mg.",
  cdl: { items: [
    { cancer: "Renal cell — 1L (intermediate/poor-risk)", status: "MAF", text: "untreated advanced RCC (CABOSUN; or + nivolumab, CheckMate-9ER)" },
    { cancer: "Renal cell — 2L", status: "MAF", text: "previously treated advanced RCC (METEOR)" },
    { cancer: "Hepatocellular — 2L", status: "MAF", text: "advanced unresectable, after ≥1 prior line, Child-Pugh adequate (CELESTIAL)" }
  ] },
  toxicities: {
    common: ["Diarrhoea", "Hand-foot skin reaction", "Hypertension", "Fatigue, decreased appetite", "Mucositis", "Hypothyroidism"],
    serious: ["Haemorrhage", "GI perforation / fistula", "RPLS", "Wound-healing complications (hold before surgery)"]
  },
  doseReductions: { other: [
    { label: "Hypertension / HFSR / diarrhoea", text: "interrupt for grade ≥3, resume reduced (60 → 40 → 20 mg)." },
    { label: "Surgery / bleeding", text: "hold ≥3 weeks before elective surgery; discontinue for GI perforation/fistula or severe haemorrhage." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Cabometyx) · FDA label (DailyMed). CABOSUN, METEOR, CELESTIAL",
  verified: "2026-06-30"
},

{
  id: "axitinib",
  name: "Axitinib",
  aliases: ["Inlyta"],
  class: "VEGFR TKI",
  subclass: "selective VEGFR1-3",
  route: ["PO"],
  atc: "L01EK01",
  brands: ["Inlyta"],
  tumours: ["Renal"],
  mechanism: "Selective VEGFR1-3 inhibitor.",
  dosing: "5 mg PO BID, titrate to 7 → 10 mg BID if tolerated (reduce 3 → 2 mg BID).",
  cdl: { items: [
    { cancer: "Renal cell — 2L", status: "MAF", text: "previously treated advanced RCC (AXIS). Also 1L + pembrolizumab/avelumab (see those drugs)." }
  ] },
  toxicities: {
    common: ["Hypertension (prominent)", "Diarrhoea", "Fatigue", "Hand-foot skin reaction", "Hypothyroidism", "Proteinuria"],
    serious: ["Hypertensive crisis", "Haemorrhage", "RPLS", "Arterial / venous thrombosis", "GI perforation / fistula"]
  },
  doseReductions: { other: [
    { label: "Hypertension", text: "optimise antihypertensives; hold for uncontrolled BP, resume reduced." },
    { label: "Toxicity", text: "reduce 5 → 3 → 2 mg BID for grade ≥3; hold before surgery." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Inlyta) · FDA label (DailyMed). AXIS",
  verified: "2026-06-30"
},

{
  id: "lenvatinib",
  name: "Lenvatinib",
  aliases: ["Lenvima"],
  class: "VEGFR TKI",
  subclass: "VEGFR/FGFR/RET",
  route: ["PO"],
  atc: "L01EX08",
  brands: ["Lenvima"],
  tumours: ["Hepatocellular", "Thyroid"],
  mechanism: "Multikinase VEGFR1-3 / FGFR1-4 / RET inhibitor.",
  dosing: "HCC: 12 mg daily (≥60 kg) / 8 mg (<60 kg). DTC: 24 mg daily. (20 mg with pembrolizumab/everolimus.)",
  cdl: { items: [
    { cancer: "Hepatocellular — 1L", status: "MAF", text: "advanced unresectable, Child-Pugh adequate, HSA-recommended dosing (REFLECT)" },
    { cancer: "Thyroid — RAI-refractory DTC", status: "MAF", text: "LA/metastatic, progressive, radioactive-iodine-refractory (SELECT)" }
  ] },
  toxicities: {
    common: ["Hypertension (prominent)", "Diarrhoea", "Decreased appetite / weight loss", "Fatigue", "Hand-foot skin reaction", "Proteinuria, hypothyroidism"],
    serious: ["Haemorrhage", "GI perforation / fistula", "Cardiac dysfunction", "QTc prolongation", "RPLS", "Hepatotoxicity"]
  },
  doseReductions: { other: [
    { label: "Hypertension / proteinuria", text: "control BP; hold for grade ≥3 or nephrotic-range proteinuria, resume reduced." },
    { label: "Toxicity", text: "stepwise reductions per indication; hold before surgery; discontinue for GI perforation or arterial events." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Lenvima) · FDA label (DailyMed). REFLECT, SELECT",
  verified: "2026-06-30"
},

{
  id: "pazopanib",
  name: "Pazopanib",
  aliases: ["Votrient"],
  class: "VEGFR TKI",
  subclass: "VEGFR/PDGFR/KIT",
  route: ["PO"],
  atc: "L01EX03",
  brands: ["Votrient"],
  tumours: ["Renal", "Sarcoma"],
  mechanism: "Multikinase VEGFR / PDGFR / KIT inhibitor.",
  boxedWarning: "Severe and fatal hepatotoxicity — monitor liver function; interrupt / reduce / discontinue per transaminase and bilirubin levels.",
  dosing: "800 mg PO once daily on an empty stomach (reduce 800 → 400 → 200 mg).",
  indications: [
    { indication: "Renal cell — advanced", hsa: "y", fda: "y", dose: "800 mg daily" },
    { indication: "Soft-tissue sarcoma — advanced (post-chemo)", hsa: "y", fda: "y", dose: "800 mg daily (PALETTE; excludes adipocytic STS / GIST)" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: ["Hypertension", "Diarrhoea", "Hair colour change", "Nausea, anorexia", "Fatigue", "Transaminitis"],
    serious: ["Severe / fatal hepatotoxicity", "QTc prolongation / torsades", "Haemorrhage", "Arterial thrombosis", "GI perforation / fistula"]
  },
  doseReductions: { other: [
    { label: "Hepatotoxicity", text: "monitor LFTs (baseline + weekly for first 9 weeks); interrupt for ALT >3× ULN, reduce/discontinue per severity." },
    { label: "QTc / BP", text: "baseline ECG + electrolytes; control hypertension." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, SDL) · HSA register (Votrient) · FDA label (DailyMed). PALETTE",
  verified: "2026-06-30"
},

{
  id: "sunitinib",
  name: "Sunitinib",
  aliases: ["Sutent"],
  class: "VEGFR TKI",
  subclass: "VEGFR/PDGFR/KIT/FLT3",
  route: ["PO"],
  atc: "L01EX01",
  brands: ["Sutent"],
  tumours: ["Renal", "GIST", "Neuroendocrine"],
  mechanism: "Multikinase VEGFR / PDGFR / KIT / FLT3 / RET inhibitor.",
  boxedWarning: "Severe and fatal hepatotoxicity — monitor liver function; interrupt / discontinue for hepatic failure.",
  dosing: "RCC/GIST: 50 mg daily, 4 weeks on / 2 off. pNET: 37.5 mg continuous. (Adjust by 12.5 mg.)",
  indications: [
    { indication: "Renal cell — advanced", hsa: "y", fda: "y", dose: "50 mg daily, 4/2 schedule" },
    { indication: "GIST — post-imatinib", hsa: "y", fda: "y", dose: "50 mg daily, 4/2" },
    { indication: "Pancreatic NET — advanced", hsa: "y", fda: "y", dose: "37.5 mg continuous" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: ["Fatigue", "Diarrhoea", "Hand-foot skin reaction", "Hypertension", "Mucositis, dysgeusia", "Skin/hair yellow discolouration, hypothyroidism, cytopenias"],
    serious: ["Severe / fatal hepatotoxicity", "Cardiac dysfunction / LVEF decline", "QTc prolongation", "Haemorrhage / TMA", "Adrenal insufficiency"]
  },
  doseReductions: { other: [
    { label: "Hepatotoxicity / cardiac", text: "monitor LFTs + LVEF; interrupt/reduce by 12.5 mg; discontinue for hepatic failure or symptomatic CHF." },
    { label: "HFSR / BP", text: "supportive care; control hypertension; hold for grade ≥3." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, SDL) · HSA register (Sutent) · FDA label (DailyMed)",
  verified: "2026-06-30"
},

{
  id: "sorafenib",
  name: "Sorafenib",
  aliases: ["Nexavar"],
  class: "VEGFR TKI",
  subclass: "VEGFR/PDGFR/RAF",
  route: ["PO"],
  atc: "L01EX02",
  brands: ["Nexavar"],
  tumours: ["Hepatocellular", "Renal", "Thyroid"],
  mechanism: "Multikinase VEGFR / PDGFR / RAF / KIT inhibitor.",
  dosing: "400 mg PO BID on an empty stomach (reduce to 400 mg daily → 400 mg every other day).",
  indications: [
    { indication: "Hepatocellular — advanced", hsa: "y", fda: "y", dose: "400 mg BID (SHARP)" },
    { indication: "Renal cell — advanced", hsa: "y", fda: "y", dose: "400 mg BID" },
    { indication: "Thyroid — RAI-refractory DTC", hsa: "y", fda: "y", dose: "400 mg BID (DECISION)" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: ["Hand-foot skin reaction (prominent)", "Diarrhoea", "Rash, alopecia", "Hypertension", "Fatigue", "Hypophosphataemia"],
    serious: ["Cardiac ischaemia", "Haemorrhage", "GI perforation", "Hepatotoxicity", "QTc prolongation", "Severe skin reactions (SJS/TEN, rare)"]
  },
  doseReductions: { other: [
    { label: "HFSR", text: "emollients / urea cream; interrupt for grade ≥2-3, resume reduced (400 daily → 400 every other day)." },
    { label: "Cardiac / bleeding", text: "hold for cardiac ischaemia or significant bleeding." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, SDL) · HSA register (Nexavar) · FDA label (DailyMed). SHARP, DECISION",
  verified: "2026-06-30"
},

{
  id: "regorafenib",
  name: "Regorafenib",
  aliases: ["Stivarga"],
  class: "VEGFR TKI",
  subclass: "VEGFR/KIT/RAF/RET",
  route: ["PO"],
  atc: "L01EX05",
  brands: ["Stivarga"],
  tumours: ["Colorectal", "Hepatocellular", "Sarcoma"],
  mechanism: "Multikinase VEGFR / KIT / RET / RAF / PDGFR inhibitor.",
  boxedWarning: "Severe and fatal hepatotoxicity — monitor liver function; interrupt / reduce / discontinue per transaminase and bilirubin levels.",
  dosing: "160 mg PO once daily, 3 weeks on / 1 off (reduce 120 → 80 mg).",
  cdl: { items: [
    { cancer: "Colorectal — metastatic (refractory)", status: "MAF", text: "after fluoropyrimidine/oxaliplatin/irinotecan, anti-VEGF, anti-EGFR if RAS-wt (CORRECT)" },
    { cancer: "Hepatocellular — 2L", status: "MAF", text: "advanced unresectable, after ≥1 prior line, Child-Pugh adequate (RESORCE)" },
    { cancer: "GIST — post-imatinib", status: "MAF", text: "LA/unresectable/metastatic, previously treated with imatinib (GRID)" }
  ] },
  toxicities: {
    common: ["Hand-foot skin reaction (prominent)", "Fatigue", "Diarrhoea", "Hypertension", "Mucositis, rash", "Weight loss, hypophosphataemia, transaminitis"],
    serious: ["Severe / fatal hepatotoxicity", "Haemorrhage", "GI perforation / fistula", "Severe skin reactions", "RPLS", "Cardiac ischaemia"]
  },
  doseReductions: { other: [
    { label: "Hepatotoxicity", text: "monitor LFTs (baseline + every 2 weeks for first 2 months); interrupt/reduce/discontinue per transaminase / bilirubin." },
    { label: "HFSR", text: "interrupt for grade ≥2-3, resume reduced (160 → 120 → 80 mg)." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Stivarga) · FDA label (DailyMed). CORRECT, RESORCE, GRID",
  verified: "2026-06-30"
},

{
  id: "fruquintinib",
  name: "Fruquintinib",
  aliases: ["Fruzaqla"],
  class: "VEGFR TKI",
  subclass: "selective VEGFR1-3",
  route: ["PO"],
  atc: "L01EK03",
  brands: ["Fruzaqla"],
  tumours: ["Colorectal"],
  mechanism: "Selective VEGFR1-3 inhibitor.",
  dosing: "5 mg PO once daily, 3 weeks on / 1 off (reduce 4 → 3 mg).",
  cdl: { items: [
    { cancer: "Colorectal — metastatic (refractory)", status: "MAF", text: "after fluoropyrimidine/oxaliplatin/irinotecan, anti-VEGF, anti-EGFR if RAS-wt (FRESCO-2)" }
  ] },
  toxicities: {
    common: ["Hypertension", "Hand-foot skin reaction", "Proteinuria", "Fatigue, diarrhoea", "Hypothyroidism, dysphonia"],
    serious: ["Haemorrhage", "GI perforation", "RPLS", "Severe hypertension"]
  },
  doseReductions: { other: [
    { label: "Hypertension / proteinuria", text: "control BP; hold for grade ≥3, resume reduced (5 → 4 → 3 mg)." },
    { label: "Bleeding / GI", text: "hold before surgery; discontinue for GI perforation or severe haemorrhage." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Fruzaqla) · FDA label (DailyMed). FRESCO-2",
  verified: "2026-06-30"
},

{
  id: "abemaciclib",
  name: "Abemaciclib",
  aliases: ["Verzenio", "Verzenios"],
  class: "CDK4/6 inhibitor",
  subclass: "continuous dosing",
  route: ["PO"],
  atc: "L01EF03",
  brands: ["Verzenio"],
  tumours: ["Breast"],
  mechanism: "CDK4/6 inhibitor (continuous dosing) — blocks Rb phosphorylation → G1 arrest in HR+ breast cancer.",
  dosing: "150 mg PO BID (with endocrine therapy); 200 mg BID monotherapy. Reduce 150 → 100 → 50 mg BID.",
  cdl: { items: [
    { cancer: "Breast — adjuvant (HR+/HER2-, node+)", status: "MAF", text: "+ endocrine; high recurrence risk; max 2 yr (monarchE)" },
    { cancer: "Breast — advanced 1L (HR+/HER2-)", status: "MAF", text: "+ aromatase inhibitor (± LHRHa if pre/peri) (MONARCH-3)" },
    { cancer: "Breast — advanced 2L (HR+/HER2-)", status: "MAF", text: "+ fulvestrant, after prior endocrine therapy (MONARCH-2)" }
  ] },
  toxicities: {
    common: ["Diarrhoea (prominent, early)", "Neutropenia (less than other CDK4/6)", "Fatigue, nausea", "Transaminitis", "Benign creatinine rise (tubular secretion)"],
    serious: ["Venous thromboembolism", "Interstitial lung disease / pneumonitis", "Severe diarrhoea / dehydration", "Hepatotoxicity"]
  },
  doseReductions: { other: [
    { label: "Diarrhoea", text: "loperamide at first loose stool + fluids; hold for grade ≥2 until ≤grade 1, resume reduced (150 → 100 → 50 mg BID)." },
    { label: "Neutropenia / hepatic / VTE / ILD", text: "hold/reduce per grade; discontinue for confirmed ILD or recurrent VTE." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Verzenio) · FDA label (DailyMed). monarchE, MONARCH-2/3",
  verified: "2026-06-30"
},

{
  id: "palbociclib",
  name: "Palbociclib",
  aliases: ["Ibrance"],
  class: "CDK4/6 inhibitor",
  subclass: "3 weeks on / 1 off",
  route: ["PO"],
  atc: "L01EF01",
  brands: ["Ibrance"],
  tumours: ["Breast"],
  mechanism: "CDK4/6 inhibitor (intermittent dosing) for HR+/HER2- breast cancer.",
  dosing: "125 mg PO once daily, 3 weeks on / 1 off (reduce 125 → 100 → 75 mg).",
  cdl: { items: [
    { cancer: "Breast — advanced 1L (HR+/HER2-)", status: "MAF", text: "+ aromatase inhibitor (± LHRHa) (PALOMA-2)" },
    { cancer: "Breast — advanced 2L (HR+/HER2-)", status: "MAF", text: "+ fulvestrant, after prior endocrine therapy (PALOMA-3)" }
  ] },
  toxicities: {
    common: ["Neutropenia (prominent, dose-limiting)", "Fatigue", "Nausea", "Stomatitis", "Alopecia", "Anaemia"],
    serious: ["Febrile neutropenia", "Pulmonary embolism", "ILD / pneumonitis (rare)"]
  },
  doseReductions: { other: [
    { label: "Neutropenia", text: "FBC day 1 + day 15 of first 2 cycles; hold for ANC <1000 / grade ≥3, resume reduced (125 → 100 → 75 mg)." },
    { label: "Other toxicity", text: "reduce one level for grade ≥3 non-haematologic." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Ibrance) · FDA label (DailyMed). PALOMA-2/3",
  verified: "2026-06-30"
},

{
  id: "ribociclib",
  name: "Ribociclib",
  aliases: ["Kisqali"],
  class: "CDK4/6 inhibitor",
  subclass: "3 weeks on / 1 off (QTc monitoring)",
  route: ["PO"],
  atc: "L01EF02",
  brands: ["Kisqali"],
  tumours: ["Breast"],
  mechanism: "CDK4/6 inhibitor for HR+/HER2- breast cancer; requires ECG monitoring (QTc).",
  dosing: "600 mg PO daily, 3 weeks on / 1 off (400 mg for adjuvant NATALEE). Reduce 600 → 400 → 200 mg.",
  cdl: { items: [
    { cancer: "Breast — adjuvant (HR+/HER2-, stage II-III)", status: "MAF", text: "+ aromatase inhibitor; high risk (extra criteria for IIA N0); max 3 yr (NATALEE)" },
    { cancer: "Breast — advanced 1L (HR+/HER2-)", status: "MAF", text: "+ aromatase inhibitor (± LHRHa) (MONALEESA-2/7)" },
    { cancer: "Breast — advanced 2L (HR+/HER2-)", status: "MAF", text: "+ fulvestrant, after prior endocrine therapy (MONALEESA-3)" }
  ] },
  toxicities: {
    common: ["Neutropenia", "Nausea, fatigue", "Transaminitis", "Diarrhoea", "QTc prolongation"],
    serious: ["QTc prolongation / torsades (ECG monitoring)", "Hepatotoxicity", "ILD / pneumonitis", "Severe skin reactions (SJS/TEN, rare)"]
  },
  doseReductions: { other: [
    { label: "QTc", text: "baseline + day-14 ECG + electrolytes; avoid other QT-prolonging drugs; hold/reduce for QTc >480-500 ms." },
    { label: "Neutropenia / hepatic", text: "monitor FBC + LFTs; reduce 600 → 400 → 200 mg for grade ≥3." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Kisqali) · FDA label (DailyMed). NATALEE, MONALEESA-2/3/7",
  verified: "2026-06-30"
},

{
  id: "olaparib",
  name: "Olaparib",
  aliases: ["Lynparza"],
  class: "PARP inhibitor",
  subclass: "PARP1/2",
  route: ["PO"],
  atc: "L01XK01",
  brands: ["Lynparza"],
  tumours: ["Ovarian", "Breast", "Prostate", "Pancreatic"],
  mechanism: "PARP1/2 inhibitor — synthetic lethality in BRCA-mutant / HRD tumours (trapped PARP-DNA complexes).",
  dosing: "300 mg PO BID (tablets); reduce 300 → 250 → 200 mg BID.",
  cdl: { items: [
    { cancer: "Ovarian — 1L maintenance (BRCA+)", status: "MAF", text: "advanced high-grade epithelial, CR/PR to 1L platinum; max 24 mo (SOLO-1)" },
    { cancer: "Ovarian — relapsed maintenance (BRCA+)", status: "MAF", text: "platinum-sensitive relapsed, CR/PR to platinum, no prior PARP (SOLO-2)" },
    { cancer: "Ovarian — relapsed maintenance (all-comers)", status: "MSV/MSHL", text: "platinum-sensitive relapsed, CR/PR to platinum, no prior PARP" },
    { cancer: "Breast — advanced (gBRCA, HER2-)", status: "MAF", text: "LA/metastatic, prior chemotherapy (OlympiAD)" },
    { cancer: "Breast — adjuvant (gBRCA, HER2-)", status: "MAF", text: "high-risk early, post neo/adjuvant chemo; max 1 yr (OlympiA)" },
    { cancer: "Prostate — mCRPC (BRCA1/2/ATM)", status: "MAF", text: "HRR-mutated, progressed on abiraterone / 2nd-gen anti-androgen; continue ADT (PROfound)" },
    { cancer: "Pancreatic — maintenance (gBRCA)", status: "MAF", text: "metastatic, no progression after ≥16 wk 1L platinum (POLO)" }
  ] },
  toxicities: {
    common: ["Nausea", "Fatigue", "Anaemia (prominent)", "Neutropenia, thrombocytopenia", "Decreased appetite, dysgeusia"],
    serious: ["MDS / AML (rare class effect — monitor FBC)", "Pneumonitis", "Severe cytopenias"]
  },
  doseReductions: { other: [
    { label: "Anaemia / cytopenias", text: "monthly FBC; interrupt for grade ≥3, support/transfuse; reduce 300 → 250 → 200 mg BID; investigate prolonged cytopenia for MDS/AML." },
    { label: "Pneumonitis", text: "interrupt + investigate; discontinue if confirmed." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Lynparza) · FDA label (DailyMed). SOLO-1/2, OlympiAD/A, PROfound, POLO",
  verified: "2026-06-30"
},

{
  id: "niraparib",
  name: "Niraparib",
  aliases: ["Zejula"],
  class: "PARP inhibitor",
  subclass: "PARP1/2 (once daily)",
  route: ["PO"],
  atc: "L01XK02",
  brands: ["Zejula"],
  tumours: ["Ovarian"],
  mechanism: "PARP1/2 inhibitor — once-daily; used as ovarian maintenance.",
  dosing: "200 mg PO daily (300 mg if ≥77 kg and platelets ≥150k). Reduce 300 → 200 → 100 mg.",
  cdl: { items: [
    { cancer: "Ovarian — 1L maintenance (BRCA+ / HRD+)", status: "MAF", text: "advanced high-grade, CR/PR to 1L platinum; max 36 mo (PRIMA)" },
    { cancer: "Ovarian — 1L maintenance (all-comers)", status: "MSV/MSHL", text: "advanced high-grade, CR/PR to 1L platinum; max 36 mo (PRIMA)" },
    { cancer: "Ovarian — relapsed maintenance (BRCA+)", status: "MSV/MSHL", text: "platinum-sensitive relapsed, CR/PR to platinum, no prior PARP (NOVA)" }
  ] },
  toxicities: {
    common: ["Thrombocytopenia (prominent, dose-related)", "Anaemia, neutropenia", "Hypertension", "Fatigue, nausea", "Insomnia, constipation"],
    serious: ["Severe thrombocytopenia", "MDS / AML (rare — monitor FBC)", "Hypertensive crisis", "PRES"]
  },
  doseReductions: { other: [
    { label: "Thrombocytopenia", text: "weekly FBC first month; individualised starting dose (200 mg if <77 kg or plt <150k); interrupt/reduce 300 → 200 → 100 mg for grade ≥3." },
    { label: "Hypertension", text: "monitor and treat BP." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Zejula) · FDA label (DailyMed). PRIMA, NOVA",
  verified: "2026-06-30"
},

{
  id: "talazoparib",
  name: "Talazoparib",
  aliases: ["Talzenna"],
  class: "PARP inhibitor",
  subclass: "potent PARP-trapper",
  route: ["PO"],
  atc: "L01XK04",
  brands: ["Talzenna"],
  tumours: ["Breast"],
  mechanism: "Potent PARP-trapping inhibitor.",
  dosing: "1 mg PO once daily (reduce 1 → 0.75 → 0.5 mg).",
  cdl: { items: [
    { cancer: "Breast — advanced (gBRCA, HER2-)", status: "MSV/MSHL", text: "LA/metastatic, prior chemotherapy (EMBRACA)" }
  ] },
  toxicities: {
    common: ["Anaemia (prominent)", "Neutropenia, thrombocytopenia", "Fatigue", "Nausea", "Alopecia, decreased appetite"],
    serious: ["Severe myelosuppression", "MDS / AML (rare — monitor FBC)"]
  },
  doseReductions: { other: [
    { label: "Myelosuppression", text: "monthly FBC; interrupt for grade ≥3, reduce 1 → 0.75 → 0.5 mg; investigate prolonged cytopenia for MDS/AML." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Talzenna) · FDA label (DailyMed). EMBRACA",
  verified: "2026-06-30"
},

{
  id: "lapatinib",
  name: "Lapatinib",
  aliases: ["Tyverb", "Tykerb"],
  class: "HER2 TKI",
  subclass: "HER2/EGFR (reversible)",
  route: ["PO"],
  atc: "L01EH01",
  brands: ["Tyverb"],
  tumours: ["Breast"],
  mechanism: "Reversible HER2/EGFR dual TKI.",
  dosing: "+ capecitabine: 1250 mg daily. + aromatase inhibitor: 1500 mg daily. Take 1 h before / after food.",
  cdl: { items: [
    { cancer: "Breast — HER2+/HR+ MBC (+ AI)", status: "MAF", text: "postmenopausal, metastatic (EGF30008)" },
    { cancer: "Breast — HER2+ advanced (+ capecitabine)", status: "MAF", text: "progressed after anthracycline, taxane and trastuzumab (EGF100151)" }
  ] },
  toxicities: {
    common: ["Diarrhoea", "Hand-foot skin reaction (with capecitabine)", "Rash", "Nausea", "Fatigue"],
    serious: ["Hepatotoxicity", "LVEF decline", "Severe diarrhoea", "QTc prolongation", "ILD (rare)"]
  },
  doseReductions: { other: [
    { label: "Diarrhoea", text: "loperamide; hold for grade ≥2, resume reduced." },
    { label: "Cardiac / hepatic", text: "baseline + periodic LVEF + LFTs; hold/discontinue for symptomatic LVEF drop or severe hepatotoxicity." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Tyverb) · FDA label (DailyMed). EGF100151, EGF30008",
  verified: "2026-06-30"
},

{
  id: "neratinib",
  name: "Neratinib",
  aliases: ["Nerlynx"],
  class: "HER2 TKI",
  subclass: "irreversible pan-HER",
  route: ["PO"],
  atc: "L01EH02",
  brands: ["Nerlynx"],
  tumours: ["Breast"],
  mechanism: "Irreversible pan-HER (HER1/2/4) TKI.",
  dosing: "240 mg PO once daily with food. Mandatory antidiarrhoeal (loperamide) prophylaxis for the first 1-2 cycles.",
  cdl: { items: [
    { cancer: "Breast — HER2+ extended adjuvant", status: "MSV/MSHL", text: "early HER2+, after adjuvant trastuzumab; start ≤1 yr of completing trastuzumab (ExteNET)" },
    { cancer: "Breast — HER2+ advanced (+ capecitabine)", status: "MSV/MSHL", text: "≥2 prior anti-HER2 regimens in metastatic (NALA)" }
  ] },
  toxicities: {
    common: ["Diarrhoea (prominent — needs prophylaxis)", "Nausea, vomiting", "Abdominal pain", "Fatigue", "Rash, transaminitis"],
    serious: ["Severe diarrhoea / dehydration", "Hepatotoxicity"]
  },
  doseReductions: { other: [
    { label: "Diarrhoea prophylaxis", text: "loperamide prophylaxis cycles 1-2 (mandatory); hold for grade ≥3 until ≤grade 1, resume reduced (240 → 200 → 160 → 120 mg)." },
    { label: "Hepatotoxicity", text: "monitor LFTs; hold/discontinue per severity." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Nerlynx) · FDA label (DailyMed). ExteNET, NALA",
  verified: "2026-06-30"
},

{
  id: "alpelisib",
  name: "Alpelisib",
  aliases: ["Piqray"],
  class: "PI3K inhibitor",
  subclass: "PI3Kα-selective",
  route: ["PO"],
  atc: "L01EM03",
  brands: ["Piqray"],
  tumours: ["Breast"],
  mechanism: "PI3Kα-selective inhibitor for PIK3CA-mutant HR+ breast cancer.",
  dosing: "300 mg PO once daily with food (+ fulvestrant). Reduce 300 → 250 → 200 mg.",
  cdl: { items: [
    { cancer: "Breast — HR+/HER2- advanced (PIK3CA-mut)", status: "MSV/MSHL", text: "+ fulvestrant, after progression on endocrine therapy (SOLAR-1)" }
  ] },
  toxicities: {
    common: ["Hyperglycaemia (prominent — class effect)", "Rash", "Diarrhoea", "Nausea, decreased appetite", "Stomatitis, fatigue"],
    serious: ["Severe hyperglycaemia / DKA", "Severe cutaneous reactions (SJS/TEN, DRESS)", "Pneumonitis"]
  },
  doseReductions: { other: [
    { label: "Hyperglycaemia", text: "baseline + monitor fasting glucose / HbA1c; metformin first-line; hold/reduce for grade ≥3; optimise before starting." },
    { label: "Rash", text: "antihistamine prophylaxis; hold/reduce for grade ≥2-3; discontinue for SJS/TEN/DRESS." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Piqray) · FDA label (DailyMed). SOLAR-1",
  verified: "2026-06-30"
},

{
  id: "everolimus",
  name: "Everolimus",
  aliases: ["Afinitor"],
  class: "mTOR inhibitor",
  subclass: "mTORC1",
  route: ["PO"],
  atc: "L01EG02",
  brands: ["Afinitor"],
  tumours: ["Breast", "Neuroendocrine", "Renal"],
  mechanism: "mTORC1 inhibitor.",
  dosing: "10 mg PO once daily (reduce to 5 mg, or 5 mg alternate days).",
  cdl: { items: [
    { cancer: "Neuroendocrine — GI / lung (non-functional)", status: "MAF", text: "unresectable/metastatic, well-differentiated, progressive (RADIANT-4)" },
    { cancer: "Neuroendocrine — pancreatic", status: "MAF", text: "unresectable / LA / metastatic, progressive (RADIANT-3)" },
    { cancer: "Breast — HR+/HER2- advanced (+ endocrine)", status: "MSV/MSHL", text: "postmenopausal, no visceral crisis, after a non-steroidal AI (BOLERO-2, + exemestane)" },
    { cancer: "Renal cell — 2L", status: "MSV/MSHL", text: "previously treated advanced RCC (RECORD-1)" }
  ] },
  toxicities: {
    common: ["Stomatitis / mouth ulcers (prominent)", "Rash", "Fatigue", "Diarrhoea", "Hyperglycaemia, hyperlipidaemia", "Cytopenias"],
    serious: ["Non-infectious pneumonitis (class effect)", "Severe infections (immunosuppression)", "Angioedema (esp. with ACE inhibitors)", "Severe stomatitis"]
  },
  doseReductions: { other: [
    { label: "Stomatitis", text: "dexamethasone mouthwash prophylaxis; hold for grade ≥3, resume reduced (10 → 5 mg)." },
    { label: "Pneumonitis", text: "hold + corticosteroids for symptomatic disease; discontinue for severe." },
    { label: "Metabolic", text: "monitor glucose / lipids; manage medically." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Afinitor) · FDA label (DailyMed). RADIANT-3/4, BOLERO-2, RECORD-1",
  verified: "2026-06-30"
},

{
  id: "erdafitinib",
  name: "Erdafitinib",
  aliases: ["Balversa"],
  class: "FGFR inhibitor",
  subclass: "pan-FGFR",
  route: ["PO"],
  atc: "L01EN01",
  brands: ["Balversa"],
  tumours: ["Bladder"],
  mechanism: "Pan-FGFR (1-4) inhibitor for FGFR-altered urothelial carcinoma.",
  dosing: "8 mg PO once daily, uptitrate to 9 mg by serum phosphate (reduce per toxicity).",
  cdl: { items: [
    { cancer: "Urothelial — advanced (FGFR3+)", status: "MSV/MSHL", text: "susceptible FGFR3 alteration, after ≥1 prior systemic therapy; not for IO-naive eligible patients (THOR)" }
  ] },
  toxicities: {
    common: ["Hyperphosphataemia (on-target — guides titration)", "Stomatitis", "Dry mouth / skin", "Diarrhoea", "Nail changes (onycholysis)", "Dysgeusia"],
    serious: ["Central serous retinopathy / retinal detachment (ophthalmic monitoring)", "Severe hyperphosphataemia / soft-tissue mineralisation"]
  },
  doseReductions: { other: [
    { label: "Phosphate-guided titration", text: "check serum phosphate day 14-21; uptitrate 8 → 9 mg if phosphate <5.5 mg/dL; phosphate-binders + dose reduction for hyperphosphataemia." },
    { label: "Ocular", text: "baseline + periodic eye exams; hold for central serous retinopathy." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Balversa) · FDA label (DailyMed). THOR / BLC2001",
  verified: "2026-06-30"
},

{
  id: "pemigatinib",
  name: "Pemigatinib",
  aliases: ["Pemazyre"],
  class: "FGFR inhibitor",
  subclass: "FGFR1-3 selective",
  route: ["PO"],
  atc: "L01EN02",
  brands: ["Pemazyre"],
  tumours: ["Biliary tract"],
  mechanism: "Selective FGFR1-3 inhibitor for FGFR2-fusion cholangiocarcinoma.",
  dosing: "13.5 mg PO once daily, 2 weeks on / 1 off (reduce per toxicity).",
  cdl: { items: [
    { cancer: "Cholangiocarcinoma — FGFR2 fusion", status: "MSV/MSHL", text: "LA/metastatic, after ≥1 prior systemic therapy (FIGHT-202)" }
  ] },
  toxicities: {
    common: ["Hyperphosphataemia (on-target)", "Alopecia", "Diarrhoea", "Stomatitis", "Dry mouth / skin / eye", "Nail changes, dysgeusia"],
    serious: ["Central serous retinopathy / RPE detachment", "Severe hyperphosphataemia"]
  },
  doseReductions: { other: [
    { label: "Hyperphosphataemia", text: "low-phosphate diet + phosphate-binders; reduce/interrupt for persistent elevation." },
    { label: "Ocular", text: "baseline + periodic eye exams; hold for serous retinopathy." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Pemazyre) · FDA label (DailyMed). FIGHT-202",
  verified: "2026-06-30"
},

{
  id: "imatinib",
  name: "Imatinib",
  aliases: ["Glivec", "Gleevec"],
  class: "KIT/PDGFR inhibitor",
  subclass: "BCR-ABL/KIT/PDGFR",
  route: ["PO"],
  atc: "L01EA01",
  brands: ["Glivec"],
  tumours: ["GIST"],
  mechanism: "BCR-ABL / KIT / PDGFR TKI. Solid-tumour use = KIT+ GIST (and DFSP). CML / Ph+ ALL are haematological — out of this module's scope.",
  indications: [
    { indication: "GIST — KIT+ (advanced)", hsa: "y", fda: "y", dose: "400 mg daily (800 mg if KIT exon 9)" },
    { indication: "GIST — adjuvant (high-risk, resected)", hsa: "y", fda: "y", dose: "400 mg daily × 3 yr" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: ["Oedema (periorbital, peripheral)", "Nausea, diarrhoea", "Muscle cramps, myalgia", "Rash", "Fatigue, cytopenias"],
    serious: ["Fluid retention / pleural-pericardial effusion", "Hepatotoxicity", "Severe cytopenias", "Tumour lysis (bulky disease)"]
  },
  doseReductions: { other: [
    { label: "Fluid retention", text: "diuretics / supportive care; interrupt for severe effusions." },
    { label: "Cytopenias / hepatic", text: "monitor FBC + LFTs; interrupt/reduce for grade ≥3." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, SDL) · HSA register (Glivec) · FDA label (DailyMed). GIST: B2222, Z9001 / SSG-XVIII",
  verified: "2026-06-30"
},

{
  id: "ripretinib",
  name: "Ripretinib",
  aliases: ["Qinlock"],
  class: "KIT/PDGFR inhibitor",
  subclass: "switch-control",
  route: ["PO"],
  atc: "L01EX19",
  brands: ["Qinlock"],
  tumours: ["GIST"],
  mechanism: "KIT / PDGFRA switch-control inhibitor — broad activity across resistance mutations; for ≥4th-line GIST.",
  dosing: "150 mg PO once daily (reduce to 100 mg).",
  cdl: { items: [
    { cancer: "GIST — ≥4L", status: "MSV/MSHL", text: "advanced, after ≥3 prior kinase inhibitors incl. imatinib (INVICTUS)" }
  ] },
  toxicities: {
    common: ["Alopecia", "Fatigue", "Nausea", "Hand-foot skin reaction (palmar-plantar)", "Myalgia, diarrhoea", "Hypertension"],
    serious: ["Secondary cutaneous malignancies (SCC / melanoma — skin surveillance)", "Hypertension", "Cardiac dysfunction / LVEF decline"]
  },
  doseReductions: { other: [
    { label: "Toxicity", text: "reduce 150 → 100 mg for grade ≥3 (HFSR, hypertension, LVEF); dermatologic surveillance for new lesions." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Qinlock) · FDA label (DailyMed). INVICTUS",
  verified: "2026-06-30"
},

{
  id: "vismodegib",
  name: "Vismodegib",
  aliases: ["Erivedge"],
  class: "Hedgehog inhibitor",
  subclass: "SMO",
  route: ["PO"],
  atc: "L01XJ01",
  brands: ["Erivedge"],
  tumours: ["Skin / BCC"],
  mechanism: "Hedgehog-pathway (smoothened, SMO) inhibitor for advanced basal cell carcinoma.",
  boxedWarning: "Embryo-fetal toxicity — can cause severe birth defects or embryo-fetal death. Verify pregnancy status; strict contraception; no blood/semen donation during and after treatment.",
  dosing: "150 mg PO once daily until progression or unacceptable toxicity.",
  cdl: { items: [
    { cancer: "Basal cell carcinoma — advanced", status: "MSV/MSHL", text: "metastatic, or locally advanced recurrent post-surgery / not a surgery- or RT-candidate (ERIVANCE)" }
  ] },
  toxicities: {
    common: ["Muscle spasms (prominent)", "Alopecia", "Dysgeusia / ageusia", "Weight loss", "Fatigue, nausea", "Decreased appetite"],
    serious: ["Embryo-fetal toxicity", "Premature epiphyseal fusion (paediatric)", "Severe muscle spasms"]
  },
  doseReductions: { other: [
    { label: "Muscle spasms", text: "supportive (hydration, calcium / magnesium); treatment interruptions for tolerability (no formal dose-reduction levels)." },
    { label: "Contraception", text: "strict contraception during and after treatment; no blood/semen donation." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Erivedge) · FDA label (DailyMed). ERIVANCE",
  verified: "2026-06-30"
},

{
  id: "anastrozole",
  name: "Anastrozole",
  aliases: ["Arimidex"],
  class: "Aromatase inhibitor",
  subclass: "non-steroidal",
  route: ["PO"],
  atc: "L02BG03",
  brands: ["Arimidex"],
  tumours: ["Breast"],
  mechanism: "Non-steroidal aromatase inhibitor — blocks peripheral oestrogen synthesis in postmenopausal women.",
  indications: [
    { indication: "Breast — HR+ adjuvant (postmenopausal)", hsa: "y", fda: "y", dose: "1 mg PO once daily" },
    { indication: "Breast — HR+ advanced / metastatic (postmenopausal)", hsa: "y", fda: "y", dose: "1 mg PO once daily" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: ["Hot flushes", "Arthralgia / joint stiffness", "Bone loss (osteopenia/osteoporosis)", "Fatigue", "Vaginal dryness", "Raised cholesterol"],
    serious: ["Osteoporotic fractures", "Ischaemic cardiovascular events", "Rare hepatitis"]
  },
  doseModLabel: "Monitoring & supportive care",
  doseReductions: { other: [
    { label: "Bone health", text: "baseline + serial DEXA; calcium/vitamin D; bisphosphonate or denosumab for declining BMD. No formal dose-reduction levels." },
    { label: "Arthralgia", text: "analgesia / exercise; consider switch to tamoxifen or another AI if intolerable." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, SDL) · HSA register (Arimidex) · FDA label (DailyMed). ATAC",
  verified: "2026-07-01"
},

{
  id: "letrozole",
  name: "Letrozole",
  aliases: ["Femara"],
  class: "Aromatase inhibitor",
  subclass: "non-steroidal",
  route: ["PO"],
  atc: "L02BG04",
  brands: ["Femara"],
  tumours: ["Breast"],
  mechanism: "Non-steroidal aromatase inhibitor.",
  indications: [
    { indication: "Breast — HR+ adjuvant (postmenopausal)", hsa: "y", fda: "y", dose: "2.5 mg PO once daily" },
    { indication: "Breast — HR+ extended adjuvant", hsa: "y", fda: "y", dose: "2.5 mg PO once daily (after ~5 yr tamoxifen)" },
    { indication: "Breast — HR+ advanced / metastatic (postmenopausal)", hsa: "y", fda: "y", dose: "2.5 mg PO once daily (± CDK4/6 inhibitor)" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: ["Hot flushes", "Arthralgia / myalgia", "Bone loss", "Fatigue", "Raised cholesterol", "Headache"],
    serious: ["Osteoporotic fractures", "Ischaemic cardiovascular events", "Rare hepatitis"]
  },
  doseModLabel: "Monitoring & supportive care",
  doseReductions: { other: [
    { label: "Bone health", text: "baseline + serial DEXA; calcium/vitamin D; antiresorptive therapy for BMD decline. No formal dose-reduction levels." },
    { label: "Arthralgia", text: "analgesia / exercise; consider AI switch or tamoxifen if intolerable." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, SDL) · HSA register (Femara) · FDA label (DailyMed). BIG 1-98, MA.17",
  verified: "2026-07-01"
},

{
  id: "exemestane",
  name: "Exemestane",
  aliases: ["Aromasin"],
  class: "Aromatase inhibitor",
  subclass: "steroidal (irreversible)",
  route: ["PO"],
  atc: "L02BG06",
  brands: ["Aromasin"],
  tumours: ["Breast"],
  mechanism: "Steroidal (irreversible) aromatase inactivator.",
  indications: [
    { indication: "Breast — HR+ adjuvant (postmenopausal)", hsa: "y", fda: "y", dose: "25 mg PO once daily after food (switch after 2-3 yr tamoxifen)" },
    { indication: "Breast — HR+ advanced (post non-steroidal AI)", hsa: "y", fda: "y", dose: "25 mg PO once daily after food" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: ["Hot flushes", "Arthralgia", "Fatigue", "Bone loss", "Increased sweating", "Nausea"],
    serious: ["Osteoporotic fractures", "Ischaemic cardiovascular events", "Rare hepatitis"]
  },
  doseModLabel: "Monitoring & supportive care",
  doseReductions: { other: [
    { label: "Bone health", text: "baseline + serial DEXA; calcium/vitamin D; antiresorptive therapy for BMD decline. No formal dose-reduction levels." },
    { label: "Arthralgia", text: "analgesia / exercise; AI switch if intolerable." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, SDL) · HSA register (Aromasin) · FDA label (DailyMed). IES, TEXT/SOFT (+ OFS)",
  verified: "2026-07-01"
},

{
  id: "tamoxifen",
  name: "Tamoxifen",
  aliases: ["Nolvadex"],
  class: "SERM",
  subclass: "selective oestrogen-receptor modulator",
  route: ["PO"],
  atc: "L02BA01",
  brands: ["Nolvadex"],
  tumours: ["Breast"],
  mechanism: "Selective oestrogen-receptor modulator — antagonist in breast, partial agonist in endometrium/bone.",
  boxedWarning: "Serious, sometimes fatal events in risk-reduction / DCIS use — uterine malignancies (endometrial carcinoma + uterine sarcoma), stroke, and pulmonary embolism. Discuss benefit-risk for women at high risk of breast cancer or with DCIS.",
  indications: [
    { indication: "Breast — HR+ adjuvant (pre- or post-menopausal)", hsa: "y", fda: "y", dose: "20 mg PO once daily" },
    { indication: "Breast — HR+ advanced / metastatic", hsa: "y", fda: "y", dose: "20 mg PO once daily (up to 40 mg)" },
    { indication: "Breast — DCIS / risk reduction", hsa: "y", fda: "y", dose: "20 mg PO once daily × 5 yr" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: ["Hot flushes", "Vaginal discharge / bleeding", "Menstrual changes", "Mood changes", "Fluid retention", "Cataracts"],
    serious: ["Endometrial carcinoma / uterine sarcoma", "Venous thromboembolism (DVT/PE)", "Stroke", "Rare hepatotoxicity"]
  },
  doseModLabel: "Monitoring & supportive care",
  doseReductions: { other: [
    { label: "Endometrial surveillance", text: "report abnormal vaginal bleeding promptly; gynaecological assessment for any postmenopausal bleeding." },
    { label: "Thromboembolism", text: "assess VTE risk; consider interruption around major surgery / immobility; counsel on symptoms." },
    { label: "Drug interactions", text: "avoid potent CYP2D6 inhibitors (e.g. paroxetine, fluoxetine) — reduce active endoxifen." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, SDL) · HSA register (Nolvadex) · FDA label (DailyMed). EBCTCG, NSABP P-1",
  verified: "2026-07-01"
},

{
  id: "fulvestrant",
  name: "Fulvestrant",
  aliases: ["Faslodex"],
  class: "SERD",
  subclass: "selective oestrogen-receptor degrader",
  route: ["IM"],
  atc: "L02BA03",
  brands: ["Faslodex"],
  tumours: ["Breast"],
  mechanism: "Selective oestrogen-receptor degrader — binds and downregulates ER, no agonist activity.",
  dosing: "500 mg IM (two 250 mg injections, one in each buttock) on days 1, 15, 29, then every 28 days. Often combined with a CDK4/6 inhibitor or alpelisib (PIK3CA-mut).",
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: ["Injection-site reactions", "Hot flushes", "Arthralgia / myalgia", "Nausea", "Fatigue", "Raised transaminases"],
    serious: ["Injection-site nerve injury (sciatic / neuropathy)", "Hepatic impairment caution", "Hypersensitivity"]
  },
  doseModLabel: "Monitoring & supportive care",
  doseReductions: { other: [
    { label: "Hepatic impairment", text: "moderate impairment (Child-Pugh B): reduce to 250 mg per schedule; not studied in severe impairment." },
    { label: "Injection technique", text: "slow IM into gluteus; avoid the dorsogluteal sciatic region. No cytotoxic dose-reduction levels." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, SDL) · HSA register (Faslodex) · FDA label (DailyMed). CONFIRM, FALCON",
  verified: "2026-07-01"
},

{
  id: "goserelin",
  name: "Goserelin",
  aliases: ["Zoladex"],
  class: "GnRH agonist",
  subclass: "LHRH agonist",
  route: ["SC"],
  atc: "L02AE03",
  brands: ["Zoladex"],
  tumours: ["Prostate", "Breast"],
  mechanism: "GnRH (LHRH) agonist — chronic stimulation downregulates pituitary GnRH receptors → medical castration. Initial testosterone/oestrogen surge ('flare').",
  indications: [
    { indication: "Prostate — advanced / metastatic", hsa: "y", fda: "y", dose: "3.6 mg SC every 28 days, or 10.8 mg SC every 12 weeks (cover flare with an antiandrogen)" },
    { indication: "Breast — pre/peri-menopausal (advanced or adjuvant OFS)", hsa: "y", fda: "y", dose: "3.6 mg SC every 28 days" }
  ],
  cdl: { class: "MAF", wording: "For cancer treatment" },
  toxicities: {
    common: ["Hot flushes", "Reduced libido / erectile dysfunction", "Injection-site reactions", "Sweating", "Mood changes", "Weight gain"],
    serious: ["Tumour flare (cord compression / ureteric obstruction in prostate)", "Reduced bone mineral density", "Metabolic / cardiovascular effects", "Hyperglycaemia"]
  },
  doseModLabel: "Monitoring & supportive care",
  doseReductions: { other: [
    { label: "Tumour flare (prostate)", text: "start an antiandrogen (e.g. bicalutamide) before / with the first dose in high-volume or symptomatic disease." },
    { label: "Bone / metabolic", text: "monitor BMD + glucose/lipids on long-term androgen deprivation; bone-protective therapy as needed." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, MAF) · HSA register (Zoladex) · FDA label (DailyMed). TEXT/SOFT, prostate ADT",
  verified: "2026-07-01"
},

{
  id: "leuprorelin",
  name: "Leuprorelin",
  aliases: ["Leuprolide", "Lucrin", "Eligard"],
  class: "GnRH agonist",
  subclass: "LHRH agonist",
  route: ["IM", "SC"],
  atc: "L02AE02",
  brands: ["Lucrin", "Eligard"],
  tumours: ["Prostate", "Breast"],
  mechanism: "GnRH (LHRH) agonist — medical castration after an initial testosterone flare.",
  indications: [
    { indication: "Prostate — advanced / metastatic", hsa: "y", fda: "y", dose: "Depot 7.5 mg monthly / 22.5 mg q3-monthly / 45 mg q6-monthly (cover flare with an antiandrogen)" },
    { indication: "Breast — pre-menopausal (ovarian suppression)", hsa: "y", fda: "n", dose: "Depot 3.75 mg monthly" }
  ],
  cdl: { class: "MAF", wording: "For cancer treatment" },
  toxicities: {
    common: ["Hot flushes", "Reduced libido / erectile dysfunction", "Injection-site reactions", "Fatigue", "Sweating", "Weight gain"],
    serious: ["Tumour flare (prostate)", "Reduced bone mineral density", "Hyperglycaemia / diabetes", "Cardiovascular events", "QTc prolongation"]
  },
  doseModLabel: "Monitoring & supportive care",
  doseReductions: { other: [
    { label: "Tumour flare (prostate)", text: "antiandrogen before / with the first depot in symptomatic or high-volume disease." },
    { label: "Bone / metabolic / cardiac", text: "monitor BMD, glucose/lipids on long-term ADT; assess cardiovascular + QTc risk." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, MAF) · HSA register (Lucrin / Eligard) · FDA label (DailyMed). Prostate ADT",
  verified: "2026-07-01"
},

{
  id: "triptorelin",
  name: "Triptorelin",
  aliases: ["Decapeptyl", "Diphereline"],
  class: "GnRH agonist",
  subclass: "LHRH agonist",
  route: ["IM"],
  atc: "L02AE04",
  brands: ["Diphereline", "Decapeptyl"],
  tumours: ["Prostate", "Breast"],
  mechanism: "GnRH (LHRH) agonist — medical castration after an initial flare.",
  indications: [
    { indication: "Prostate — locally advanced / metastatic", hsa: "y", fda: "y", dose: "Depot 3.75 mg monthly / 11.25 mg q3-monthly / 22.5 mg q6-monthly (cover flare with an antiandrogen)" },
    { indication: "Breast — pre-menopausal (ovarian suppression)", hsa: "y", fda: "n", dose: "Depot 3.75 mg monthly" }
  ],
  cdl: { class: "MAF", wording: "For cancer treatment" },
  toxicities: {
    common: ["Hot flushes", "Reduced libido / erectile dysfunction", "Injection-site reactions", "Fatigue", "Sweating"],
    serious: ["Tumour flare (prostate)", "Reduced bone mineral density", "Hyperglycaemia", "Cardiovascular events"]
  },
  doseModLabel: "Monitoring & supportive care",
  doseReductions: { other: [
    { label: "Tumour flare (prostate)", text: "antiandrogen cover before / with the first depot in symptomatic disease." },
    { label: "Bone / metabolic", text: "monitor BMD + glucose on long-term ADT; bone protection as indicated." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, MAF; one prostate product row listed No-subsidy → MSV/MSHL) · HSA register (Diphereline) · FDA label (DailyMed)",
  verified: "2026-07-01"
},

{
  id: "degarelix",
  name: "Degarelix",
  aliases: ["Firmagon"],
  class: "GnRH antagonist",
  subclass: "LHRH antagonist",
  route: ["SC"],
  atc: "L02BX02",
  brands: ["Firmagon"],
  tumours: ["Prostate"],
  mechanism: "GnRH (LHRH) antagonist — immediate, direct receptor blockade → rapid testosterone suppression with no flare.",
  dosing: "Loading 240 mg SC (two 120 mg injections), then 80 mg SC every 28 days.",
  cdl: { items: [
    { cancer: "Prostate — advanced hormone-dependent", status: "MAF", text: "advanced hormone-dependent prostate cancer; no antiandrogen flare cover required" }
  ] },
  toxicities: {
    common: ["Injection-site reactions (prominent — erythema, pain, swelling)", "Hot flushes", "Weight gain", "Fatigue", "Raised transaminases"],
    serious: ["QTc prolongation", "Reduced bone mineral density", "Hypersensitivity / anaphylaxis (rare)"]
  },
  doseModLabel: "Monitoring & supportive care",
  doseReductions: { other: [
    { label: "No flare cover", text: "antagonist gives immediate suppression — unlike agonists, no antiandrogen flare prophylaxis needed (useful when cord-compression risk)." },
    { label: "Cardiac / bone", text: "assess QTc + electrolytes; monitor BMD on long-term androgen deprivation." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, MAF) · HSA register (Firmagon) · FDA label (DailyMed). CS21",
  verified: "2026-07-01"
},

{
  id: "bicalutamide",
  name: "Bicalutamide",
  aliases: ["Casodex"],
  class: "Antiandrogen",
  subclass: "non-steroidal (first-generation)",
  route: ["PO"],
  atc: "L02BB03",
  brands: ["Casodex"],
  tumours: ["Prostate"],
  mechanism: "First-generation non-steroidal androgen-receptor antagonist.",
  indications: [
    { indication: "Prostate — advanced (with LHRH agonist)", hsa: "y", fda: "y", dose: "50 mg PO once daily (combined androgen blockade)" },
    { indication: "Prostate — flare prophylaxis at LHRH-agonist start", hsa: "y", fda: "y", dose: "50 mg PO once daily, started before / with the agonist" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: ["Gynaecomastia / breast tenderness", "Hot flushes", "Reduced libido", "Asthenia", "Raised transaminases"],
    serious: ["Hepatotoxicity (monitor LFTs)", "Interstitial lung disease (rare)", "Photosensitivity"]
  },
  doseModLabel: "Monitoring & supportive care",
  doseReductions: { other: [
    { label: "Hepatic", text: "check LFTs at baseline, then periodically; discontinue for severe transaminitis / jaundice." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, SDL) · HSA register (Casodex) · FDA label (DailyMed)",
  verified: "2026-07-01"
},

{
  id: "flutamide",
  name: "Flutamide",
  aliases: ["Eulexin"],
  class: "Antiandrogen",
  subclass: "non-steroidal (first-generation)",
  route: ["PO"],
  atc: "L02BB01",
  brands: ["Eulexin"],
  tumours: ["Prostate"],
  mechanism: "First-generation non-steroidal androgen-receptor antagonist.",
  boxedWarning: "Hepatic injury — hospitalisation and deaths from hepatic failure reported. Measure serum transaminases before starting, monthly for the first 4 months, then periodically; stop immediately for jaundice or ALT > 2× upper limit of normal.",
  indications: [
    { indication: "Prostate — advanced (with LHRH agonist)", hsa: "y", fda: "y", dose: "250 mg PO three times daily" }
  ],
  cdl: { items: [
    { cancer: "Prostate — advanced", status: "MSV/MSHL", text: "with an LHRH agonist for previously untreated advanced prostate cancer" }
  ] },
  toxicities: {
    common: ["Diarrhoea (prominent)", "Gynaecomastia", "Hot flushes", "Reduced libido", "Nausea"],
    serious: ["Hepatic failure / fatal hepatotoxicity", "Methaemoglobinaemia", "Interstitial pneumonitis"]
  },
  doseModLabel: "Monitoring & supportive care",
  doseReductions: { other: [
    { label: "Hepatic monitoring", text: "LFTs at baseline, monthly × 4 months, then periodically; stop immediately for jaundice or ALT > 2× ULN." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026) · HSA register (Eulexin) · FDA label (DailyMed)",
  verified: "2026-07-01"
},

{
  id: "cyproterone",
  name: "Cyproterone acetate",
  aliases: ["Androcur"],
  class: "Antiandrogen",
  subclass: "steroidal",
  route: ["PO"],
  atc: "L02BB04",
  brands: ["Androcur"],
  tumours: ["Prostate"],
  mechanism: "Steroidal androgen-receptor antagonist with progestogenic / central anti-gonadotrophic activity. (Not FDA-approved; HSA-registered.)",
  indications: [
    { indication: "Prostate — advanced", hsa: "y", fda: "n", dose: "100 mg PO 2-3 times daily" },
    { indication: "Prostate — LHRH-agonist flare cover", hsa: "y", fda: "n", dose: "100 mg PO 2-3 times daily around agonist initiation" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: ["Gynaecomastia", "Reduced libido / erectile dysfunction", "Fatigue", "Weight changes", "Mood changes"],
    serious: ["Dose-dependent hepatotoxicity (some fatal — monitor LFTs)", "Venous thromboembolism", "Meningioma (long-term, high cumulative dose)", "Depression"]
  },
  doseModLabel: "Monitoring & supportive care",
  doseReductions: { other: [
    { label: "Hepatic", text: "monitor LFTs before and during treatment; stop for significant hepatotoxicity." },
    { label: "Meningioma / VTE", text: "weigh long-term high-dose meningioma risk; assess thromboembolic risk; stop if meningioma diagnosed." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, SDL) · HSA register (Androcur). Not FDA-approved (EU SmPC used for label detail)",
  verified: "2026-07-01"
},

{
  id: "abiraterone",
  name: "Abiraterone acetate",
  aliases: ["Zytiga"],
  class: "CYP17 inhibitor",
  subclass: "androgen-biosynthesis inhibitor",
  route: ["PO"],
  atc: "L02BX03",
  brands: ["Zytiga"],
  tumours: ["Prostate"],
  mechanism: "CYP17 (17α-hydroxylase / C17,20-lyase) inhibitor — blocks androgen synthesis in testes, adrenals and tumour. Given with prednisolone to offset mineralocorticoid excess.",
  indications: [
    { indication: "Prostate — metastatic castration-resistant (mCRPC)", hsa: "y", fda: "y", dose: "1000 mg PO once daily (fasting) + prednisolone 5 mg twice daily; with ADT" },
    { indication: "Prostate — metastatic hormone-sensitive (mHSPC, high-risk)", hsa: "y", fda: "y", dose: "1000 mg PO once daily (fasting) + prednisolone 5 mg once daily; with ADT" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: ["Hypertension", "Hypokalaemia", "Fluid retention / oedema", "Fatigue", "Hot flushes", "Raised transaminases"],
    serious: ["Hepatotoxicity (monitor LFTs)", "Mineralocorticoid excess (hypertension, hypokalaemia, fluid overload)", "Cardiac failure / arrhythmia", "Adrenocortical insufficiency on stress / steroid withdrawal"]
  },
  doseModLabel: "Monitoring & dose modification",
  doseReductions: { other: [
    { label: "Administration", text: "take on an empty stomach (food markedly increases exposure); co-administer prednisolone; never omit the steroid." },
    { label: "Hepatic", text: "LFTs every 2 weeks × 3 months then monthly; hold for ALT/AST > 5× ULN, resume reduced (1000 → 750 → 500 mg) once recovered." },
    { label: "Mineralocorticoid effects", text: "monitor BP, potassium, fluid status; treat hypertension / hypokalaemia." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026; SDL subsidised + a non-subsidised brand row → MSV/MSHL) · HSA register (Zytiga) · FDA label (DailyMed). COU-AA-301/302, LATITUDE",
  verified: "2026-07-01"
},

{
  id: "enzalutamide",
  name: "Enzalutamide",
  aliases: ["Xtandi"],
  class: "Androgen receptor inhibitor",
  subclass: "second-generation",
  route: ["PO"],
  atc: "L02BB04",
  brands: ["Xtandi"],
  tumours: ["Prostate"],
  mechanism: "Second-generation androgen-receptor inhibitor — blocks AR binding, nuclear translocation and DNA interaction.",
  dosing: "160 mg PO once daily, with ADT (continue GnRH analogue or post-orchidectomy).",
  cdl: { items: [
    { cancer: "Prostate — nmCRPC (high-risk)", status: "MAF", text: "+ ADT, non-metastatic castration-resistant (PROSPER)" },
    { cancer: "Prostate — mCRPC", status: "MAF", text: "+ ADT, metastatic castration-resistant (AFFIRM, PREVAIL)" },
    { cancer: "Prostate — mHSPC", status: "MAF", text: "+ ADT, metastatic hormone-sensitive (ARCHES, ENZAMET)" }
  ] },
  toxicities: {
    common: ["Fatigue / asthenia", "Hot flushes", "Hypertension", "Falls", "Arthralgia", "Reduced libido"],
    serious: ["Seizures (lowers threshold)", "Posterior reversible encephalopathy syndrome (PRES, rare)", "Falls / fractures", "Ischaemic cardiovascular events", "Hypertension"]
  },
  doseModLabel: "Dose modification",
  doseReductions: { other: [
    { label: "Toxicity", text: "withhold 1 week for grade ≥3 toxicity, resume at same or reduced dose (120 → 80 mg)." },
    { label: "Seizure / CNS", text: "caution with seizure-threshold-lowering drugs or predisposing factors; discontinue for seizure or PRES." },
    { label: "Falls / cardiovascular", text: "assess falls risk; monitor BP." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, MAF ×3) · HSA register (Xtandi) · FDA label (DailyMed). AFFIRM, PREVAIL, PROSPER, ARCHES, ENZAMET",
  verified: "2026-07-01"
},

{
  id: "apalutamide",
  name: "Apalutamide",
  aliases: ["Erleada"],
  class: "Androgen receptor inhibitor",
  subclass: "second-generation",
  route: ["PO"],
  atc: "L02BB05",
  brands: ["Erleada"],
  tumours: ["Prostate"],
  mechanism: "Second-generation androgen-receptor inhibitor.",
  dosing: "240 mg PO once daily, with ADT.",
  cdl: { items: [
    { cancer: "Prostate — nmCRPC (high-risk)", status: "MSV/MSHL", text: "+ ADT, non-metastatic castration-resistant (SPARTAN)" },
    { cancer: "Prostate — mHSPC", status: "MSV/MSHL", text: "+ ADT, metastatic hormone-sensitive (TITAN)" }
  ] },
  toxicities: {
    common: ["Rash (prominent)", "Fatigue", "Hypertension", "Hot flushes", "Arthralgia", "Falls", "Hypothyroidism"],
    serious: ["Severe cutaneous reactions (SJS/TEN, DRESS)", "Falls / fractures", "Seizures (rare)", "Ischaemic cardiovascular events"]
  },
  doseModLabel: "Dose modification",
  doseReductions: { other: [
    { label: "Rash", text: "topical steroids / antihistamines for mild; withhold for grade ≥3, resume reduced (180 → 120 mg); discontinue for SJS/TEN/DRESS." },
    { label: "Thyroid / falls", text: "monitor TSH; assess falls and fracture risk." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, MSV/MSHL ×2) · HSA register (Erleada) · FDA label (DailyMed). SPARTAN, TITAN",
  verified: "2026-07-01"
},

{
  id: "darolutamide",
  name: "Darolutamide",
  aliases: ["Nubeqa"],
  class: "Androgen receptor inhibitor",
  subclass: "second-generation (low CNS penetration)",
  route: ["PO"],
  atc: "L02BB06",
  brands: ["Nubeqa"],
  tumours: ["Prostate"],
  mechanism: "Second-generation androgen-receptor inhibitor with low blood-brain-barrier penetration (fewer CNS effects).",
  dosing: "600 mg PO twice daily with food, with ADT.",
  cdl: { items: [
    { cancer: "Prostate — nmCRPC (high-risk)", status: "MAF", text: "+ ADT, non-metastatic castration-resistant (ARAMIS)" },
    { cancer: "Prostate — mHSPC", status: "MAF", text: "+ ADT + docetaxel, metastatic hormone-sensitive (ARASENS)" }
  ] },
  toxicities: {
    common: ["Fatigue", "Rash", "Pain in extremity", "Raised transaminases / bilirubin", "Reduced neutrophils"],
    serious: ["Ischaemic cardiovascular events", "Hepatotoxicity", "Lower seizure / fall risk than other AR inhibitors (low CNS penetration)"]
  },
  doseModLabel: "Dose modification",
  doseReductions: { other: [
    { label: "Toxicity", text: "withhold for grade ≥3 toxicity until ≤grade 1, resume at 300 mg twice daily; may re-escalate to 600 mg twice daily." },
    { label: "Cardiac / hepatic", text: "monitor cardiovascular risk + LFTs." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, MAF ×2) · HSA register (Nubeqa) · FDA label (DailyMed). ARAMIS, ARASENS",
  verified: "2026-07-01"
},

{
  id: "denosumab",
  name: "Denosumab",
  aliases: ["Xgeva", "Prolia"],
  class: "Bone-targeted agent",
  subclass: "RANKL inhibitor (monoclonal antibody)",
  route: ["SC"],
  atc: "M05BX04",
  brands: ["Xgeva", "Prolia"],
  tumours: ["Supportive care"],
  mechanism: "Fully human monoclonal antibody against RANKL — inhibits osteoclast formation and bone resorption. Xgeva = oncology (120 mg); Prolia = bone loss / osteoporosis (60 mg).",
  indications: [
    { indication: "Bone metastases — prevention of skeletal-related events (solid tumours)", hsa: "y", fda: "y", dose: "Xgeva 120 mg SC every 4 weeks (+ calcium/vitamin D)" },
    { indication: "Giant cell tumour of bone (unresectable)", hsa: "y", fda: "y", dose: "Xgeva 120 mg SC every 4 weeks, with loading doses days 8 & 15 of cycle 1" },
    { indication: "Hypercalcaemia of malignancy (bisphosphonate-refractory)", hsa: "y", fda: "y", dose: "Xgeva 120 mg SC every 4 weeks, with loading doses days 8 & 15" },
    { indication: "Cancer treatment-induced bone loss (AI / ADT)", hsa: "y", fda: "y", dose: "Prolia 60 mg SC every 6 months (+ calcium/vitamin D)" }
  ],
  cdl: { items: [
    { cancer: "Supportive — bone-targeted", status: "Not listed", text: "not on the MOH Cancer Drug List (supportive bone agent, not a CDL antineoplastic); HSA-registered" }
  ] },
  toxicities: {
    common: ["Hypocalcaemia", "Fatigue / asthenia", "Nausea", "Diarrhoea", "Arthralgia", "Hypophosphataemia"],
    serious: ["Osteonecrosis of the jaw", "Atypical femoral fracture", "Severe hypocalcaemia (higher risk in renal impairment)", "Rebound multiple vertebral fractures if Prolia stopped without follow-on antiresorptive"]
  },
  doseModLabel: "Monitoring & supportive care",
  doseReductions: { other: [
    { label: "Hypocalcaemia", text: "correct pre-existing hypocalcaemia before starting; supplement calcium + vitamin D; higher risk with renal impairment (no renal dose adjustment, but monitor closely)." },
    { label: "Jaw (ONJ)", text: "dental exam + preventive dentistry before starting; avoid invasive dental procedures during treatment." },
    { label: "Discontinuation (Prolia)", text: "do not delay/stop without transitioning to another antiresorptive — rebound vertebral-fracture risk." }
  ] },
  sources: "Not on MOH Cancer Drug List (supportive agent) · HSA register (Xgeva / Prolia) · FDA label (DailyMed). Freedom (bone loss), giant-cell-tumour studies",
  verified: "2026-07-01"
},

{
  id: "zoledronic-acid",
  name: "Zoledronic acid",
  aliases: ["Zometa", "Aclasta", "Reclast"],
  class: "Bisphosphonate",
  subclass: "nitrogen-containing (IV)",
  route: ["IV"],
  atc: "M05BA08",
  brands: ["Zometa"],
  tumours: ["Supportive care"],
  mechanism: "Nitrogen-containing bisphosphonate — inhibits osteoclast-mediated bone resorption (farnesyl pyrophosphate synthase). Zometa = oncology; Aclasta = osteoporosis.",
  indications: [
    { indication: "Bone metastases — prevention of skeletal-related events", hsa: "y", fda: "y", dose: "Zometa 4 mg IV over ≥15 min every 3-4 weeks (+ calcium/vitamin D)" },
    { indication: "Hypercalcaemia of malignancy", hsa: "y", fda: "y", dose: "Zometa 4 mg IV single dose (may repeat after ≥7 days if needed)" }
  ],
  cdl: { items: [
    { cancer: "Supportive — bone-targeted", status: "Not listed", text: "not on the MOH Cancer Drug List (supportive bone agent, not a CDL antineoplastic); HSA-registered" }
  ] },
  toxicities: {
    common: ["Acute-phase reaction (flu-like symptoms, first infusion)", "Hypocalcaemia / hypophosphataemia", "Fatigue", "Arthralgia / myalgia", "Nausea"],
    serious: ["Renal impairment / acute kidney injury", "Osteonecrosis of the jaw", "Atypical femoral fracture", "Severe hypocalcaemia"]
  },
  doseModLabel: "Monitoring & dose modification",
  doseReductions: { other: [
    { label: "Renal (bone-mets dosing)", text: "reduce dose by creatinine clearance (CrCl 50-60: 3.5 mg; 40-49: 3.3 mg; 30-39: 3 mg); avoid if CrCl < 30; withhold for renal deterioration until recovery." },
    { label: "Hypocalcaemia", text: "correct calcium/vitamin D before and during; check calcium, phosphate, magnesium, creatinine." },
    { label: "Jaw (ONJ)", text: "dental assessment before starting; avoid invasive dental procedures on treatment." }
  ] },
  sources: "Not on MOH Cancer Drug List (supportive agent) · HSA register (Zometa) · FDA label (DailyMed)",
  verified: "2026-07-01"
},

{
  id: "pamidronate",
  name: "Pamidronate",
  aliases: ["Aredia"],
  class: "Bisphosphonate",
  subclass: "nitrogen-containing (IV)",
  route: ["IV"],
  atc: "M05BA03",
  brands: ["Aredia"],
  tumours: ["Supportive care"],
  mechanism: "Nitrogen-containing bisphosphonate — inhibits osteoclastic bone resorption. Largely superseded by zoledronic acid (longer infusion, less potent) but still used.",
  indications: [
    { indication: "Osteolytic bone metastases (breast) / myeloma bone disease", hsa: "y", fda: "y", dose: "90 mg IV over 2-4 h every 3-4 weeks" },
    { indication: "Hypercalcaemia of malignancy", hsa: "y", fda: "y", dose: "60-90 mg IV over 2-24 h, single dose (by calcium level)" }
  ],
  cdl: { items: [
    { cancer: "Supportive — bone-targeted", status: "Not listed", text: "not on the MOH Cancer Drug List (supportive bone agent, not a CDL antineoplastic); HSA-registered" }
  ] },
  toxicities: {
    common: ["Acute-phase reaction (fever, myalgia)", "Hypocalcaemia / hypophosphataemia / hypomagnesaemia", "Injection-site reactions", "Fatigue", "Nausea"],
    serious: ["Renal impairment (avoid rapid infusion)", "Osteonecrosis of the jaw", "Atypical femoral fracture", "Severe electrolyte disturbance"]
  },
  doseModLabel: "Monitoring & supportive care",
  doseReductions: { other: [
    { label: "Renal / infusion", text: "infuse slowly (never as a bolus); caution + monitor renal function in impairment; correct calcium/vitamin D." },
    { label: "Jaw (ONJ)", text: "dental assessment before starting; avoid invasive dental procedures on treatment." }
  ] },
  sources: "Not on MOH Cancer Drug List (supportive agent) · HSA register (Aredia) · FDA label (DailyMed)",
  verified: "2026-07-01"
},

{
  id: "octreotide",
  name: "Octreotide",
  aliases: ["Sandostatin", "Sandostatin LAR"],
  class: "Somatostatin analogue",
  subclass: "SSTR2/5 agonist",
  route: ["SC", "IM"],
  atc: "H01CB02",
  brands: ["Sandostatin", "Sandostatin LAR"],
  tumours: ["Neuroendocrine"],
  mechanism: "Synthetic somatostatin analogue — binds somatostatin receptors (mainly SSTR2/5), suppressing hormone secretion and giving an antiproliferative effect in well-differentiated NET.",
  indications: [
    { indication: "Carcinoid syndrome / functioning NET — symptom control", hsa: "y", fda: "y", dose: "Immediate-release 50-100 mcg SC 2-3×/day, titrate; then LAR 20-30 mg IM every 4 weeks" },
    { indication: "Advanced midgut NET — antiproliferative", hsa: "y", fda: "y", dose: "LAR 30 mg IM every 4 weeks (PROMID)" },
    { indication: "VIPoma / glucagonoma — symptom control", hsa: "y", fda: "y", dose: "50-100 mcg SC 2-3×/day, then LAR depot" }
  ],
  cdl: { class: "SDL", wording: "For cancer treatment" },
  toxicities: {
    common: ["Injection-site reactions", "Diarrhoea / steatorrhoea", "Abdominal cramps, flatulence", "Nausea", "Glucose dysregulation (hyper- or hypo-glycaemia)"],
    serious: ["Cholelithiasis / biliary sludge (long-term)", "Bradycardia / conduction changes", "Hypothyroidism (long-term)", "Rebound symptoms on abrupt withdrawal"]
  },
  doseModLabel: "Monitoring & supportive care",
  doseReductions: { other: [
    { label: "Biliary", text: "periodic gallbladder ultrasound on long-term therapy (gallstone risk)." },
    { label: "Glucose / thyroid", text: "monitor glucose (adjust antidiabetics) and TSH periodically." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, SDL) · HSA register (Sandostatin) · FDA label (DailyMed). PROMID",
  verified: "2026-07-01"
},

{
  id: "lanreotide",
  name: "Lanreotide",
  aliases: ["Somatuline Autogel", "Somatuline Depot"],
  class: "Somatostatin analogue",
  subclass: "SSTR2/5 agonist",
  route: ["SC"],
  atc: "H01CB03",
  brands: ["Somatuline Autogel"],
  tumours: ["Neuroendocrine"],
  mechanism: "Long-acting somatostatin analogue — SSTR2/5 agonist with antiproliferative activity in well-differentiated GEP-NET.",
  dosing: "90-120 mg by deep SC injection every 4 weeks.",
  cdl: { items: [
    { cancer: "Neuroendocrine — GEP-NET (antiproliferative)", status: "MAF", text: "gastrointestinal or pancreatic origin, well-differentiated (CLARINET)" },
    { cancer: "Neuroendocrine — carcinoid syndrome (symptom control)", status: "MAF", text: "reduction of carcinoid-syndrome symptoms" }
  ] },
  toxicities: {
    common: ["Injection-site reactions", "Diarrhoea / loose stools", "Abdominal pain", "Nausea", "Glucose dysregulation"],
    serious: ["Cholelithiasis / biliary sludge (long-term)", "Bradycardia", "Hypothyroidism (long-term)"]
  },
  doseModLabel: "Monitoring & supportive care",
  doseReductions: { other: [
    { label: "Biliary", text: "periodic gallbladder ultrasound on long-term therapy." },
    { label: "Glucose / thyroid", text: "monitor glucose and TSH periodically." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, MAF; acromegaly rows excluded as non-oncology) · HSA register (Somatuline Autogel) · FDA label (DailyMed). CLARINET",
  verified: "2026-07-01"
},

{
  id: "radium-223",
  name: "Radium-223 dichloride",
  aliases: ["Xofigo", "Ra-223"],
  class: "Radiopharmaceutical",
  subclass: "alpha-emitter (bone-targeted)",
  route: ["IV"],
  atc: "V10XX03",
  brands: ["Xofigo"],
  tumours: ["Prostate"],
  mechanism: "Alpha-particle-emitting calcium mimetic — localises to newly formed bone stroma in osteoblastic metastases and causes double-strand DNA breaks. Short alpha range limits marrow toxicity.",
  dosing: "55 kBq/kg body weight by slow IV injection every 4 weeks, for 6 doses.",
  cdl: { items: [
    { cancer: "Prostate — CRPC symptomatic bone metastases", status: "MSV/MSHL", text: "castration-resistant, symptomatic bone metastases, no known visceral metastatic disease (ALSYMPCA)" }
  ] },
  toxicities: {
    common: ["Diarrhoea", "Nausea / vomiting", "Peripheral oedema", "Bone pain (may flare)", "Anaemia", "Thrombocytopenia / neutropenia"],
    serious: ["Myelosuppression (thrombocytopenia, neutropenia)", "Increased fractures and deaths when combined with abiraterone + prednisolone (avoid — ERA-223)", "Secondary myeloid malignancy (rare)"]
  },
  doseModLabel: "Dose modification & safety",
  doseReductions: { other: [
    { label: "Haematologic", text: "check ANC + platelets before each dose; withhold for ANC < 1.0 or platelets < 50 until recovery; discontinue if no recovery within ~6-8 weeks." },
    { label: "Do not combine", text: "avoid concurrent abiraterone + prednisolone/prednisone (excess fractures and deaths in ERA-223)." },
    { label: "Radiation safety", text: "predominantly faecal excretion; standard handling of body fluids; no special isolation required." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, MSV/MSHL) · HSA register (Xofigo) · FDA label (DailyMed). ALSYMPCA",
  verified: "2026-07-01"
},

{
  id: "lutetium-dotatate",
  name: "Lutetium (177Lu) oxodotreotide",
  aliases: ["Lutathera", "177Lu-DOTATATE", "177Lu-DOTA-TATE"],
  class: "Radiopharmaceutical",
  subclass: "beta-emitter PRRT (SSTR-targeted)",
  route: ["IV"],
  atc: "V10XX04",
  brands: ["Lutathera"],
  tumours: ["Neuroendocrine"],
  mechanism: "Peptide-receptor radionuclide therapy (PRRT) — 177Lu-labelled somatostatin analogue binds SSTR2 on tumour cells and delivers targeted beta radiation.",
  dosing: "7.4 GBq (200 mCi) by IV infusion every 8 weeks, for 4 doses, with a co-infused amino-acid solution (renal protection) + antiemetic prophylaxis.",
  cdl: { items: [
    { cancer: "Neuroendocrine — SSTR+ GEP-NET", status: "MSV/MSHL", text: "unresectable/metastatic, progressive, well-differentiated (G1/G2), somatostatin-receptor-positive; foregut, midgut or hindgut (NETTER-1)" }
  ] },
  toxicities: {
    common: ["Nausea / vomiting (largely from the amino-acid infusion)", "Fatigue", "Lymphopenia", "Thrombocytopenia / anaemia", "Abdominal pain", "Decreased appetite"],
    serious: ["Myelosuppression", "Secondary myeloid neoplasm (MDS / acute leukaemia)", "Renal toxicity (mitigated by amino-acid co-infusion)", "Hepatotoxicity", "Neuroendocrine hormonal crisis"]
  },
  doseModLabel: "Dose modification & safety",
  doseReductions: { other: [
    { label: "Renal protection", text: "co-infuse amino-acid (lysine/arginine) solution; monitor renal function; dose reduction to 3.7 GBq for defined toxicities." },
    { label: "Haematologic / hepatic", text: "monitor FBC + LFTs; withhold / reduce / discontinue per grade of cytopenia or hepatotoxicity." },
    { label: "Hormonal crisis", text: "watch for carcinoid crisis in functional tumours; supportive somatostatin-analogue cover." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, MSV/MSHL) · HSA register (Lutathera) · FDA label (DailyMed). NETTER-1",
  verified: "2026-07-01"
},

{
  id: "lutetium-psma",
  name: "Lutetium (177Lu) vipivotide tetraxetan",
  aliases: ["Pluvicto", "177Lu-PSMA-617"],
  class: "Radiopharmaceutical",
  subclass: "beta-emitter (PSMA-targeted)",
  route: ["IV"],
  atc: "V10XX05",
  brands: ["Pluvicto"],
  tumours: ["Prostate"],
  mechanism: "177Lu-labelled PSMA-directed ligand — binds prostate-specific membrane antigen on tumour cells and delivers targeted beta radiation. Requires PSMA-PET-positive selection.",
  dosing: "7.4 GBq (200 mCi) by IV infusion every 6 weeks, for up to 6 doses.",
  cdl: { items: [
    { cancer: "Prostate — PSMA+ mCRPC", status: "MSV/MSHL", text: "metastatic castration-resistant, previously treated with a docetaxel-containing regimen (VISION); PSMA-PET positive" }
  ] },
  toxicities: {
    common: ["Fatigue", "Dry mouth / xerostomia (salivary PSMA uptake)", "Nausea", "Anaemia", "Thrombocytopenia", "Decreased appetite"],
    serious: ["Myelosuppression", "Renal toxicity", "Secondary myeloid malignancy (rare)", "Dehydration / electrolyte disturbance"]
  },
  doseModLabel: "Dose modification & safety",
  doseReductions: { other: [
    { label: "Haematologic / renal", text: "monitor FBC + renal function; withhold / reduce (to 5.6 GBq) / discontinue per toxicity; maintain hydration." },
    { label: "Radiation safety", text: "renal excretion; counsel on fluid/toileting precautions to limit household radiation exposure." }
  ] },
  sources: "MOH Cancer Drug List (1 Jun 2026, MSV/MSHL) · HSA register (Pluvicto) · FDA label (DailyMed). VISION",
  verified: "2026-07-01"
},

{
  id: "elacestrant",
  name: "Elacestrant",
  aliases: ["Orserdu"],
  class: "SERD",
  subclass: "oral selective oestrogen-receptor degrader",
  route: ["PO"],
  atc: "L02BA04",
  brands: ["Orserdu"],
  tumours: ["Breast"],
  mechanism: "Oral selective oestrogen-receptor degrader — binds and degrades ER, with activity retained in ESR1-mutant tumours (a common driver of endocrine resistance).",
  dosing: "345 mg PO once daily with food.",
  cdl: { items: [
    { cancer: "Breast — ER+/HER2- advanced (ESR1-mut)", status: "Not listed", text: "after progression on ≥1 line of endocrine therapy incl. a CDK4/6 inhibitor (EMERALD); HSA-registered (Orserdu, 2024), not on the CDL" }
  ] },
  toxicities: {
    common: ["Nausea", "Fatigue", "Hot flushes", "Arthralgia", "Diarrhoea / vomiting", "Raised cholesterol / triglycerides", "Dyspepsia"],
    serious: ["Dyslipidaemia", "Hepatic impairment caution"]
  },
  doseModLabel: "Dose modification",
  doseReductions: { other: [
    { label: "Toxicity", text: "withhold for grade ≥2 toxicity; resume reduced to 258 mg once daily if needed." },
    { label: "Hepatic impairment", text: "moderate impairment (Child-Pugh B): reduce to 258 mg once daily; avoid in severe impairment." },
    { label: "Lipids", text: "monitor cholesterol / triglycerides periodically." }
  ] },
  sources: "HSA register (Orserdu, SIN17096P; approved 2024-09-25, A. Menarini Singapore) · not on MOH Cancer Drug List · FDA label (DailyMed). EMERALD",
  verified: "2026-07-01"
}

];
