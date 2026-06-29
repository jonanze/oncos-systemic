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
}

];
