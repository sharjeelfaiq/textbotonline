import { siteData, metrics } from "./AboutData";
import AccordionItems from "./AccordionItem";
import { getDropdownMenuNames } from "../../features/tools/registry";

const description = siteData.description;

function About({ mode }) {
  const menuTitles = {
    Edit: "Edit Your Text",
    "Change Case": "Change The Case Of Your Text",
    Generate: "Generate Different Kinds Of Text",
  };

  const accordionItems = [
    ...getDropdownMenuNames().map((menu) => ({
      title: menuTitles[menu] ?? menu,
      menu,
    })),
    { title: "Know The Statistics/Summary of Your Text", metrics: true },
  ];

  return (
    <>
      <h2 className="text-center font-mono text-2xl font-semibold uppercase tracking-wide text-slate-900 dark:text-zinc-100">
        About
      </h2>

      <div
        className="mx-auto mt-4 max-w-4xl space-y-4 text-sm leading-7 text-slate-700 dark:text-zinc-300"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      <div className="mt-6 space-y-2">
        {accordionItems.map((item, index) => (
          <details
            key={item.title}
            open={index === 0}
            className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          >
            <summary
              className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:text-zinc-100 dark:hover:bg-zinc-900"
              title="Click to see all available options"
            >
              <span>{item.title}</span>
              <i
                className="bi bi-chevron-down text-xs opacity-70"
                aria-hidden="true"
              />
            </summary>
            <div className="px-4 pb-4 pt-1 text-sm text-slate-700 dark:text-zinc-300">
              {item.metrics ? (
                <ul className="list-disc space-y-1 pl-5">
                  {metrics.map((metric) => (
                    <li key={metric.label}>{metric.description}</li>
                  ))}
                </ul>
              ) : (
                <AccordionItems menu={item.menu} />
              )}
            </div>
          </details>
        ))}
      </div>
    </>
  );
}

export default About;
