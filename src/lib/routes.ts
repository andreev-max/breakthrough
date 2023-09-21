import Icons from "@/components/Icons";

export const navigationConfig = {
  home: {
    href: "/",
    name: "Home",
    icon: Icons.Home,
  },
  sets: {
    href: "/sets",
    name: "My Sets",
    icon: Icons.BookMarked,
  },
} as const;

export type NavigationConfig =
  (typeof navigationConfig)[keyof typeof navigationConfig];
