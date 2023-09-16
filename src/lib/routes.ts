import { type NavigationConfigItem } from "./constants";

export const navigationConfig = {
  home: {
    href: "/",
    title: "Home",
  },
  sets: {
    href: "/sets",
    title: "My Sets",
  },
} as const;

export type NavigationConfig =
  (typeof navigationConfig)[keyof typeof navigationConfig];
