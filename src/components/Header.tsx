import ThemeToggle from "./ThemeToggle";
import { Logo } from "@/icons/Logo";

const Header = () => {
  return (
    <header className="w-full py-10">
      <div className="flex items-center justify-center">
        <div className="relative">
          <Logo className="fill-black dark:fill-white w-52 h-auto" />
          <h1 className="sr-only">Vistypo</h1>
          <div className="absolute bottom-0 right-0">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
