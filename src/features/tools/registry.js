function normalizeModuleTools(mod) {
  const candidate =
    mod?.default ?? mod?.tools ?? mod?.tool ?? mod?.Tool ?? mod ?? [];
  return Array.isArray(candidate) ? candidate : [candidate];
}

function normalizeInputType(applyTo) {
  if (applyTo === "both") return "both";
  return "outputOnly";
}

function normalizeTool(tool) {
  if (!tool) return null;

  const name = tool.name ?? tool.actionName ?? tool.optionName ?? tool.id;
  const description =
    tool.description ?? tool.optionDescription ?? tool.title ?? "";

  const category =
    tool.category ??
    tool.menuName ??
    (tool.kind === "actionButton" ? "Actions" : "General");

  const component =
    tool.component ??
    (tool.kind === "actionButton"
      ? "ActionButton"
      : tool.kind === "dropdown"
        ? "DropdownMenu"
        : "Tool");

  const inputType = tool.inputType ?? normalizeInputType(tool.applyTo);

  const route = tool.route ?? `/tools/${encodeURIComponent(String(tool.id))}`;

  return {
    ...tool,
    name,
    description,
    category,
    component,
    inputType,
    route,
  };
}

function compareTools(a, b) {
  const orderA = typeof a.order === "number" ? a.order : 0;
  const orderB = typeof b.order === "number" ? b.order : 0;
  return orderA - orderB;
}

const toolsModules = import.meta.glob("./definitions/**/*.tools.js", {
  eager: true,
});

const allTools = Object.values(toolsModules)
  .flatMap((mod) => normalizeModuleTools(mod))
  .map(normalizeTool)
  .filter(Boolean);

const toolsById = new Map();
for (const tool of allTools) {
  if (!tool?.id) continue;
  if (toolsById.has(tool.id)) {
    // eslint-disable-next-line no-console
    console.warn(`[tools] duplicate tool id detected: ${tool.id}`);
  }
  toolsById.set(tool.id, tool);
}

export function getToolById(id) {
  return toolsById.get(id) ?? null;
}

export function getToolRouteById(id) {
  return getToolById(id)?.route ?? null;
}

export function getAllTools() {
  return [...allTools];
}

export function getDropdownToolsByMenu(menuName) {
  return allTools
    .filter((t) => t.kind === "dropdown" && t.menuName === menuName)
    .slice()
    .sort(compareTools);
}

export function getActionButtonToolsByGroup(buttonGroup) {
  return allTools
    .filter(
      (t) => t.kind === "actionButton" && t.ui?.buttonGroup === buttonGroup
    )
    .slice()
    .sort(compareTools);
}

export function getDropdownMenuNames() {
  const menuNames = [];
  const seen = new Set();
  for (const tool of allTools) {
    if (tool.kind !== "dropdown") continue;
    if (!tool.menuName || seen.has(tool.menuName)) continue;
    seen.add(tool.menuName);
    menuNames.push(tool.menuName);
  }
  return menuNames;
}

export function getActionButtonGroupIds() {
  const groupIds = new Set();
  for (const tool of allTools) {
    if (tool.kind !== "actionButton") continue;
    const groupId = tool.ui?.buttonGroup;
    if (typeof groupId === "number") groupIds.add(groupId);
  }
  return [...groupIds].sort((a, b) => a - b);
}
