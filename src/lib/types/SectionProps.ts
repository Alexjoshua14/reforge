import { HTMLAttributes } from "react";
import { Theme } from "./ThemeType";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  theme?: Theme
}