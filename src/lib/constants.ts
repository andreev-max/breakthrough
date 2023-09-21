export const DEFAULT_ERROR_MESSAGE =
  "Oops. Something went wrong. Please Try to reload the page";

export const primaryThemes = {
  light: "light",
  dark: "dark",
} as const;

export type PrimaryTheme = (typeof primaryThemes)[keyof typeof primaryThemes];

export const secondaryThemes = {
  blue: "blue",
  orange: "orange",
} as const;

export type SecondaryTheme =
  (typeof secondaryThemes)[keyof typeof secondaryThemes];
