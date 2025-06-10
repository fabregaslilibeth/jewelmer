import { motion } from "framer-motion";

interface ButtonProps {
  children?: React.ReactNode;
}

export default function LargeButton({ children = "" }: ButtonProps) {
  return (
    <div className="relative group">
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
        {children}
      </motion.button>
      <motion.div
        className="absolute inset-0 rounded-full border border-foreground/20 -z-10"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}