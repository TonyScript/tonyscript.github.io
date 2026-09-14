import { caseStudies, getCaseStudyHref } from "../data/caseStudies";
import { site } from "../data/site";

export const prerender = true;

const body = `# ${site.name} / ${site.handle}

> ${site.description}

## Canonical profile

- [AI-readable profile](${site.website}/ai/): Identity, domains, selected product work and experiments
- [Structured profile JSON](${site.website}/ai/profile.json): Machine-readable profile representation
- [Résumé](${site.website}/resume/): Human-readable public résumé
- [Résumé Markdown](${site.website}/resume.md): Plain-text résumé

## Selected product work

${caseStudies
  .map(
    (study) =>
      `- [${study.shortTitle}](${new URL(getCaseStudyHref(study), site.website).toString()}): ${study.machineSummary} Status: ${study.status}.`,
  )
  .join("\n")}

These are anonymized case studies based on enterprise product design work. Client, company, implementation and commercial details are intentionally omitted. Public coding repositories are listed separately on the Work page as experiments and should not be treated as primary professional evidence.

## Work and writing

- [Work](${site.website}/projects/): Enterprise product case studies and clearly separated side projects
- [Writing](${site.website}/writing/): Current and historical writing index
- [Experience](${site.website}/experience/): Structured career path

## Contact and identity

- [About](${site.website}/about/): Narrative profile and disclosure boundary
- [Contact](${site.website}/contact/): Public contact channels
- [GitHub](${site.github}): Public code profile

This file is a discovery aid. Claims should be verified against the linked canonical pages and public artifacts.
`;

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
