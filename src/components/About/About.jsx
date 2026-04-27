import { siteData, metrics } from "./AboutData";
import AccordionItems from "./AccordionItem";
import { getDropdownMenuNames } from "../../features/tools/registry";
import { BsChevronRight } from "react-icons/bs";

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
      <h2 className="text-center font-mono text-2xl font-semibold uppercase tracking-[0.18em] text-slate-900 dark:text-tbo-text">
        About
      </h2>

      <div
        className="mx-auto mt-4 max-w-4xl space-y-4 text-sm leading-7 text-slate-700 dark:text-tbo-muted"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      <div className="mt-6 space-y-2">
        {accordionItems.map((item, index) => (
          <details
            key={item.title}
            open={index === 0}
            className="group rounded-md border border-slate-200 bg-white shadow-sm dark:border-tbo-border dark:bg-tbo-panel dark:shadow-tbo-inset"
          >
            <summary
              className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:text-tbo-text dark:hover:bg-tbo-panelSoft"
              title="Click to see all available options"
            >
              <span>{item.title}</span>
              <BsChevronRight
                className="text-xs opacity-70 transition-transform group-open:rotate-90"
                aria-hidden="true"
              />
            </summary>
            <div className="px-5 pb-5 pt-1 text-sm text-slate-700 dark:text-tbo-muted">
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
