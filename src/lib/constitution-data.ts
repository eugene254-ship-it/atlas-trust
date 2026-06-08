export type ArticleCategory = "Rights" | "Responsibilities" | "Verification" | "Governance";

export interface ConstitutionArticle {
  id: string;
  number: string;
  title: string;
  category: ArticleCategory;
  body: string;
  checkpoints: string[];
}

export const categories: ArticleCategory[] = [
  "Rights",
  "Responsibilities",
  "Verification",
  "Governance",
];

export const articles: ConstitutionArticle[] = [
  {
    id: "art-1",
    number: "I",
    title: "The Right to Verifiable Identity",
    category: "Rights",
    body: "Every participant — human, organization, ecosystem, or autonomous agent — is entitled to a sovereign, portable, and verifiable identity. No actor may be denied recognition within the network on arbitrary grounds, and no identity may be silently revoked without transparent due process.",
    checkpoints: ["Sovereign identity issuance", "Portable across jurisdictions", "Due-process revocation"],
  },
  {
    id: "art-2",
    number: "II",
    title: "The Right to Recourse",
    category: "Rights",
    body: "Where trust is harmed, recourse must exist. Disputes are adjudicated through transparent, auditable mechanisms, and remedies are proportionate to verified harm. The powerful and the powerless face the same evidentiary standard.",
    checkpoints: ["Transparent adjudication", "Proportionate remedy", "Equal evidentiary standard"],
  },
  {
    id: "art-3",
    number: "III",
    title: "The Duty of Evidence",
    category: "Responsibilities",
    body: "Every claim carries the burden of evidence. Participants are responsible for the provenance of the assertions they make, and unsubstantiated claims hold no weight within the trust layer. Evidence is preserved, timestamped, and independently inspectable.",
    checkpoints: ["Provenance attached", "Immutable timestamping", "Independent inspection"],
  },
  {
    id: "art-4",
    number: "IV",
    title: "The Duty of Accountability",
    category: "Responsibilities",
    body: "Actions leave traceable consequences. Autonomous systems and their operators remain accountable for outcomes, and accountability cannot be laundered through intermediaries, subsidiaries, or opaque automation.",
    checkpoints: ["Traceable consequences", "Operator liability", "No accountability laundering"],
  },
  {
    id: "art-5",
    number: "V",
    title: "Verification Before Reputation",
    category: "Verification",
    body: "Reputation is earned, never assumed. A claim becomes reputation only after independent verification. TrustScore reflects the weight of verified evidence over time, decaying when evidence lapses and strengthening as it accumulates.",
    checkpoints: ["Independent verification", "Time-weighted scoring", "Evidence decay"],
  },
  {
    id: "art-6",
    number: "VI",
    title: "The Oracle Standard",
    category: "Verification",
    body: "Reality is admitted as evidence only through accredited oracles — satellites, sensors, and community validators operating under published methodologies. Conflicting oracle readings trigger escalation rather than silent resolution.",
    checkpoints: ["Accredited oracles", "Published methodology", "Conflict escalation"],
  },
  {
    id: "art-7",
    number: "VII",
    title: "Constitutional Boundaries for Intelligence",
    category: "Governance",
    body: "No autonomous system may operate beyond transparent constitutional boundaries. Agents pass through governance checkpoints before they earn influence, and their permissions are bounded, revocable, and continuously audited.",
    checkpoints: ["Pre-influence checkpoint", "Bounded permissions", "Continuous audit"],
  },
  {
    id: "art-8",
    number: "VIII",
    title: "The Limits of Power",
    category: "Governance",
    body: "Power within the network is bounded by the constitution itself. No participant — however large, sovereign, or capitalized — may rewrite the rules unilaterally. Amendments require transparent deliberation and verifiable consent.",
    checkpoints: ["No unilateral rule changes", "Transparent deliberation", "Verifiable consent"],
  },
];
