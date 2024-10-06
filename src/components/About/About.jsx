
import { siteData, metrics } from "./AboutData";
import AccordionItems from "./AccordionItem";

const description = siteData.description;

function About({ mode }) {
  const isDarkMode = mode === "dark";
  const backgroundColor = isDarkMode ? "#242526" : "white";
  const textColor = isDarkMode ? "white" : "black";

  const accordionItems = [
    { title: "Edit Your Text", menu: "Edit" },
    { title: "Change The Case Of Your Text", menu: "Change Case" },
    { title: "Generate Different Kinds Of Text", menu: "Generate" },
    { title: "Know The Statistics/Summary of Your Text", metrics: true },
  ];

  return (
    <>
      <h1 className={`text-center mb-4 text-${isDarkMode ? "light" : "dark"}`}>
        <span className="text-uppercase font-monospace">about</span>
      </h1>
      <p
        className={`lh-lg text-justify text-${isDarkMode ? "light" : "dark"}`}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div
        className="accordion my-4"
        id="accordionPanelsStayOpenExample"
        style={{ backgroundColor, color: textColor }}
      >
        {accordionItems.map((item, index) => {
          const isExpanded = index === 0;
          const collapseId = `panelsStayOpen-collapse${index + 1}`;
          const headingId = `panelsStayOpen-heading${index + 1}`;

          return (
            <div
              className="accordion-item"
              key={index}
              style={{ backgroundColor, color: textColor }}
            >
              <h2 className="accordion-header" id={headingId}>
                <button
                  className={`accordion-button ${
                    !isExpanded ? "collapsed" : ""
                  }`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${collapseId}`}
                  aria-expanded={isExpanded}
                  aria-controls={collapseId}
                  style={{ backgroundColor, color: textColor }}
                  title="Click to see all available options"
                >
                  <strong>{item.title}</strong>
                </button>
              </h2>
              <div
                id={collapseId}
                className={`accordion-collapse collapse ${
                  isExpanded ? "show" : ""
                }`}
                aria-labelledby={headingId}
              >
                <div className="accordion-body">
                  {item.metrics ? (
                    <ul style={{ listStyleType: "none" }} className="lh-lg">
                      {metrics.map((metric, metricIndex) => (
                        <li
                          key={metricIndex}
                          style={{ width: "80%", borderRadius: "5px" }}
                        >
                          <small>{metric.description}</small>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <AccordionItems menu={item.menu} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default About;
