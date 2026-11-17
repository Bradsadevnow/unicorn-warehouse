import "server-only";

import { terms, productDetails } from "@/content/portfolioTerms";

export type SupportReference = { id: string; label: string; href: string; text: string; excerpt?: string };

const stopWords = new Set("a an at and are as be by can could do does for from how i in is it may my of on or the this to under upon what when where which who will with you your".split(" "));

function words(text: string) {
  return (text.toLowerCase().match(/[a-z0-9]+/g) ?? [])
    .filter((word) => !stopWords.has(word))
    .map((word) => word.length > 4 ? word.replace(/(?:ies|ing|ed|s)$/, (suffix) => suffix === "ies" ? "y" : "") : word);
}

const clauses = ([
  ["T", "Terms & Conditions", "/terms", terms],
  ["P", "Product Details", "/product-details", productDetails],
] as const).flatMap(([prefix, title, path, sections]) =>
  sections.flatMap((section, index) => section.paragraphs.map((body, clause) => {
    const number = `${index + 1}.${clause + 1}`;
    const reference: SupportReference = {
      id: `${prefix}:${number}`, label: `${title} · ${number}`, href: `${path}#${section.id}`,
      text: `${section.title}. ${body}`,
    };
    return {
      reference, prefix, section: new Set(words(`${section.title} ${section.id}`)),
      heading: new Set(words(body.split(". ", 1)[0])), body: new Set(words(body)),
    };
  })),
);

export function searchPolicy(query: string, product?: string, document?: string) {
  const corpus = clauses.filter(({ prefix }) =>
    document === "terms" ? prefix === "T" : document === "product_details" ? prefix === "P" : true);
  const exact = query.trim().toUpperCase().replace(/^\[|\]$/g, "");
  const direct = corpus.find(({ reference }) => reference.id === exact);
  if (direct) return [direct.reference];

  const terms = [...new Set(words(query))];
  const productWords = product ? words(product) : [];
  return corpus.map((clause) => {
    const score = terms.reduce((total, term) => total +
      (clause.heading.has(term) ? 4 : 0) + (clause.section.has(term) ? 3 : 0) + (clause.body.has(term) ? 2 : 0), 0);
    const boost = productWords.reduce((total, term) => total +
      (clause.section.has(term) ? 5 : clause.body.has(term) ? 2 : 0), 0);
    return { reference: clause.reference, score: score ? score + boost : 0 };
  }).filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ reference }) => reference);
}

export function getPolicyReference(href: string) {
  return clauses.find(({ reference }) => reference.href === href)?.reference;
}
