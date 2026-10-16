"use client";

import { Button } from "@/components/ui/Button";
import { MoonIcon, SunIcon } from "@/components/ui/icons";
import { useColorMode } from "@/hooks/useColorMode";

/** Switches the page between light and dark. The PDF is not affected. */
export function ThemeToggle() {
  const [mode, toggle] = useColorMode();
  const dark = mode === "dark";

  return (
    <Button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
    >
      {dark ? <SunIcon /> : <MoonIcon />}
      <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
    </Button>
  );
}
