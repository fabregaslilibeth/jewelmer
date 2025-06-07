import { motion } from "framer-motion";
import Link from "next/link";

interface LargeButtonProps {
  text?: string;
  href?: string;
}

export default function LargeButton({ text = "Store Locator", href = "/" }: LargeButtonProps) {
  return (
    <Link href={href} className="relative group">
      <motion.button
        className="relative bg-foreground text-white px-4 py-2 rounded-full overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
          initial={{ scale: 0 }}
          whileHover={{ scale: 2 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <span className="relative z-10 text-sm uppercase font-bold tracking-wider flex items-center gap-3">
          {text}
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:translate-x-1 transition-transform"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </span>
      </motion.button>
      <motion.div
        className="absolute inset-0 rounded-full border border-foreground/20 -z-10"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}