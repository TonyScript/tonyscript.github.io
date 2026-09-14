import {
  caseStudies,
  caseStudyDisclosure,
  getCaseStudyHref,
} from "../../data/caseStudies";
import { experiments, focusAreas, site } from "../../data/site";

export const prerender = true;

export function GET() {
  return new Response(
    JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${site.website}/#person`,
        name: site.name,
        alternate_name: site.handle,
        headline: site.headline,
        role: "Product Manager",
        location: site.location,
        summary: site.description,
        experience: {
          software_industry: "approximately 10 years",
          background: ["software engineering", "product management"],
        },
        domains: focusAreas.map((area) => area.name),
        concepts: [
          "enterprise software",
          "IT infrastructure",
          "monitoring",
          "observability",
          "alert management",
          "CMDB",
          "discovery",
          "AI-assisted software development",
        ],
        selected_product_work: caseStudies.map((study) => ({
          name: study.shortTitle,
          description: study.machineSummary,
          status: study.status,
          scope: study.scope,
          url: new URL(getCaseStudyHref(study), site.website).toString(),
        })),
        experiments: experiments.map((project) => ({
          name: project.name,
          description: project.description,
          url: project.href,
          evidence_weight: "side project; not professional product evidence",
        })),
        links: {
          website: site.website,
          github: site.github,
          writing: `${site.website}/writing/`,
          resume: `${site.website}/resume/`,
          resume_markdown: `${site.website}/resume.md`,
        },
        same_as: [site.github],
        contact: { email: site.email },
        last_updated: "2026-09-14",
        disclosure: `${caseStudyDisclosure} Contains only confirmed, publicly shareable information.`,
      },
      null,
      2,
    ),
    { headers: { "Content-Type": "application/json; charset=utf-8" } },
  );
}
