import { caseStudies, caseStudyDisclosure, getCaseStudyHref } from "../data/caseStudies";
import { experiments, site } from "../data/site";

export const prerender = true;

const body = `# ${site.name}

Product Manager | ITOM | AIOps | AI

## Summary

Software-industry product manager with an engineering background and approximately 10 years of experience. Focused on enterprise software, IT operations, AIOps, AI agents, and the systems that connect product decisions with technical delivery.

## Background

- Software engineering
- Product management
- Enterprise software and IT operations
- AI-assisted products and software development

## Domain expertise

- IT Operations Management (ITOM)
- IT Service Management (ITSM)
- IT Asset Management (ITAM)
- AIOps and AI Agents
- CMDB and discovery
- Monitoring and observability
- Alert management
- IT infrastructure

## Technical background

- iOS and Objective-C
- Xamarin and C#
- Python
- Web development

## Selected product work

${caseStudies
  .map(
    (study) =>
      `- [${study.shortTitle}](${new URL(getCaseStudyHref(study), site.website).toString()}): ${study.machineSummary} Status: ${study.status}.`,
  )
  .join("\n")}

## Experiments

The following public repositories are side projects and are not presented as professional product evidence.

${experiments.map((project) => `- [${project.name}](${project.href})`).join("\n")}

## Historical writing

- Historical writing: ${site.website}/writing/

## Contact

- Website: ${site.website}
- GitHub: ${site.github}
- Email: ${site.email}

## Disclosure

${caseStudyDisclosure} This public résumé includes only confirmed, publicly shareable information. Company names, exact employment dates, client details, and confidential outcomes are intentionally omitted.
`;

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
