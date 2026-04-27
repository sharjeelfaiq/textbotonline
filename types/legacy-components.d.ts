declare module "@/src/components/Utils/TextStatsOverlay" {
  import * as React from "react";

  export type PrimaryTextStats = {
    characters: number;
    words: number;
    lines: number;
  };

  const TextStatsOverlay: React.MemoExoticComponent<
    (props: { stats?: PrimaryTextStats | null }) => React.JSX.Element | null
  >;

  export default TextStatsOverlay;
}

declare module "@/src/components/Utils/TextareaIconControls" {
  import * as React from "react";

  type IconComponent = React.ComponentType<{
    className?: string;
    "aria-hidden"?: boolean;
  }>;

  export type TextareaAction = {
    key?: string;
    label: string;
    title?: string;
    icon?: IconComponent;
    disabled?: boolean;
    onClick?: () => void;
  };

  export type TextareaDropdownItem = {
    id: string;
    title?: string;
    optionName?: string;
    disabled?: boolean;
  };

  export type TextareaDropdown = {
    key?: string;
    label: string;
    icon?: IconComponent;
    items?: TextareaDropdownItem[];
    disabled?: boolean;
    onSelect?: (id: string) => void;
  };

  const TextareaIconControls: React.MemoExoticComponent<
    (props: {
      actions?: TextareaAction[];
      dropdowns?: TextareaDropdown[];
      position?: "top" | "bottom";
      alwaysVisible?: boolean;
    }) => React.JSX.Element
  >;

  export default TextareaIconControls;
}

declare module "@/src/components/Main/Main" {
  import * as React from "react";

  const Main: React.MemoExoticComponent<
    (props: { mode: string; showAlert: (message: string, type: string) => void }) => React.JSX.Element
  >;

  export default Main;
}

declare module "@/src/components/Footer/Footer" {
  import * as React from "react";

  const Footer: React.MemoExoticComponent<(props: { mode: string }) => React.JSX.Element>;

  export default Footer;
}

declare module "@/src/components/Statistics/Statistics" {
  import * as React from "react";

  const Statistics: React.MemoExoticComponent<
    (props: { mode: string; outputText: string }) => React.JSX.Element
  >;

  export default Statistics;
}
