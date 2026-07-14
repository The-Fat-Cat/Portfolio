import { useEffect } from "react";

const THEME_KEY = "portfolio-theme";

export function useTheme() {
  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) || "dark";
    if (saved === "light") {
      document.documentElement.classList.add("light-theme");
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("light-theme");
    const isLight = html.classList.contains("light-theme");
    localStorage.setItem(THEME_KEY, isLight ? "light" : "dark");
  };

  return { toggleTheme };
}
