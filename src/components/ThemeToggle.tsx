"use client";
import { Moon } from "@/icons/Moon";
import { Sun } from "@/icons/Sun";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9"></div>;
  }

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={handleTheme}
      className="size-10 border-none rounded-full bg-neutral-100 dark:bg-neutral-800 backdrop-opacity-10 flex items-center justify-center cursor-pointer relative group/theme"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <>
          <Sun className="text-black" />
          <span className="absolute -bottom-5 opacity-0 px-2 py-1.5 rounded-md flex items-center justify-center duration-200 pointer-events-none text-nowrap text-neutral-800 bg-neutral-200 dark:bg-neutral-800 before:absolute before:content-['_'] before:size-2.5 before:bg-neutral-200 before:bg-center before:rotate-45 before:-top-[10%] before:duration-300 dark:before:bg-neutral-800 group-hover/theme:-bottom-13 group-hover/theme:opacity-100 group-hover/theme:duration-300">
            Switch to Dark Mode
          </span>
        </>
      ) : (
        <>
          <Moon />
          <span className="absolute -bottom-5 opacity-0 px-2 py-1.5 rounded-md flex items-center justify-center duration-200 pointer-events-none text-nowrap bg-neutral-200 dark:bg-neutral-800 before:absolute before:content-['_'] before:size-2.5 before:bg-neutral-200 before:bg-center before:rotate-45 before:-top-[10%] before:duration-300 dark:before:bg-neutral-800 group-hover/theme:-bottom-13 group-hover/theme:opacity-100 group-hover/theme:duration-300">
            Switch to Light Mode
          </span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
