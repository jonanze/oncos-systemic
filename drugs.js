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
    { indication: "Colon, adjuvant",            hsa: "y", fda: "y", ema: "y", dose: "1250 mg/m² BID, D1–14 q3w × 8 (6 mo)" },
    { indication: "Colorectal, metastatic",      hsa: "y", fda: "y", ema: "y", dose: "1250 mg/m² BID, D1–14 q3w" },
    { indication: "Gastric, advanced",           hsa: "y", fda: "n", ema: "y", dose: "1000 mg/m² BID, D1–14 q3w (+ platinum)" },
    { indication: "Breast, advanced/metastatic", hsa: "y", fda: "y", ema: "y", dose: "1250 mg/m² BID, D1–14 q3w — monotherapy, or + docetaxel 75 mg/m² q3w" }
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
  tumours: ["Ovarian"],
  mechanism: "Platinum agent — forms DNA crosslinks; less nephro-, oto- and neurotoxic but more myelosuppressive than cisplatin.",
  boxedWarning: "Bone-marrow suppression — dose-related, may be severe (infection and/or bleeding). Anaphylactic-like reactions within minutes of administration. Administer under the supervision of a physician experienced with cancer chemotherapy.",
  indications: [
    { indication: "Ovarian, advanced — initial",        hsa: "y", fda: "y", ema: "y", dose: "300 mg/m² q4w × 6 (+ cyclophosphamide); or Calvert AUC 5–6" },
    { indication: "Ovarian, recurrent — single agent",   hsa: "y", fda: "y", ema: "y", dose: "360 mg/m² q4w; or Calvert AUC 4–6" }
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
  sources: "FDA label (DailyMed) · EU SmPC (national authorisation) · Calvert et al. (AUC dosing) · HSA register / NDF (SDL) · MOH Cancer Drug List",
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
  tumours: ["Testicular", "Ovarian", "Bladder"],
  mechanism: "Platinum agent — forms intrastrand DNA crosslinks, blocking replication and transcription.",
  boxedWarning: "Nephrotoxicity — severe, including acute renal failure; ensure adequate hydration. Dose-related peripheral neuropathy. Severe nausea and vomiting — premedicate with antiemetics. Myelosuppression — severe, with fatal infections. Cumulative ototoxicity.",
  indications: [
    { indication: "Testicular, advanced", hsa: "y", fda: "y", ema: "y", dose: "20 mg/m² daily × 5, per cycle" },
    { indication: "Ovarian, advanced",     hsa: "y", fda: "y", ema: "y", dose: "75–100 mg/m² q3–4w" },
    { indication: "Bladder, advanced",     hsa: "y", fda: "y", ema: "y", dose: "50–70 mg/m² q3–4w" }
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
  sources: "FDA label (DailyMed) · EU SmPC (national authorisation) · HSA register / NDF (SDL) · MOH Cancer Drug List",
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
    { indication: "Colon, adjuvant",        hsa: "y", fda: "y", ema: "y", dose: "85 mg/m² D1 q2w × 12 (+ infusional 5-FU/LV)" },
    { indication: "Colorectal, advanced",   hsa: "y", fda: "y", ema: "y", dose: "85 mg/m² D1 q2w (+ infusional 5-FU/LV)" }
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
  sources: "FDA label (Eloxatin, DailyMed) · EU SmPC (national authorisation) · HSA register / NDF (SDL) · MOH Cancer Drug List",
  verified: "2026-06-29"
}

];
