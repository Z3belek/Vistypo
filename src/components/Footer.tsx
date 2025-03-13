import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} Vistypo. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="https://github.com/Z3belek/Vistypo"
              className="text-sm text-neutral-500 hover:text-amaranth-500 dark:text-neutral-400 dark:hover:text-amaranth-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </Link>
            <Link
              href="/"
              className="text-sm text-neutral-500 hover:text-amaranth-500 dark:text-neutral-400 dark:hover:text-amaranth-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </Link>
            <Link
              href="/"
              className="text-sm text-neutral-500 hover:text-amaranth-500 dark:text-neutral-400 dark:hover:text-amaranth-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
