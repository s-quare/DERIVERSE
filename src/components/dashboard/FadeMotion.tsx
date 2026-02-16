"use client";
import { motion } from "framer-motion";

export default function FadeIn({
  children,
  activeKey,
}: {
  children: React.ReactNode;
  activeKey: string;
}) {
  return (
    <motion.div
      key={activeKey}
      initial={{ opacity: 0, y: 20 }} // Starts invisible and 20px down
      whileInView={{ opacity: 1, y: 0 }} // Fades in and moves to original position
      viewport={{ once: true }} // Only animate the first time it appears
      transition={{ duration: 0.5, ease: "easeOut" }} // Smooth timing
    >
      {children}
    </motion.div>
  );
}
