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
}

];
