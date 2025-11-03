"use client";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";

function splitToChars(text: string) {
  return text.split("");
}

const containerVariants: Variants = {
  rest: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
  hover: {
    transition: { staggerChildren: 0.03, staggerDirection: 1 },
  },
};

const charVariants: Variants = {
  rest: { y: 0, opacity: 1 },
  hover: { y: -6, opacity: 0.9 },
};

function AnimatedLabel({ text }: { text: string }) {
  const chars = useMemo(() => splitToChars(text), [text]);
  return (
    <motion.span
      className="inline-flex"
      variants={containerVariants}
      initial="rest"
      whileHover="hover"
    >
      {chars.map((c, i) => (
        <motion.span
          key={i}
          variants={charVariants}
          transition={{ type: "tween", duration: 0.2 }}
          className="inline-block"
        >
          {c}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function LogoSpinner() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

  return (
    <motion.svg
      style={{ rotate }}
      className="h-8 w-8 text-blue-600"
      viewBox="0 0 100 100"
      aria-label="Logo"
    >
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8" />
      <circle cx="50" cy="50" r="26" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" />
      <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
      <circle cx="50" cy="50" r="6" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2" />
    </motion.svg>
  );
}

export default function NavBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/30 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <LogoSpinner />
          <span className="text-sm font-semibold tracking-wide text-gray-900">CreativeDev</span>
        </div>

        <NavigationMenu.Root>
          <NavigationMenu.List className="flex items-center gap-6">
            <NavigationMenu.Item>
              <Link href="#home" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                <AnimatedLabel text="Home" />
              </Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <Link href="#projects" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                <AnimatedLabel text="Projects" />
              </Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <Link href="#about" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                <AnimatedLabel text="About" />
              </Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <Link href="#contact" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                <AnimatedLabel text="Contact" />
              </Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
    </div>
  );
}