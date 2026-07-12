"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function SplashScreen({ children }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>

        {loading && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
              }}
            >
              <h1 className="text-6xl md:text-7xl font-black tracking-widest text-yellow-500">
                ISLAND
              </h1>

              <p className="mt-3 text-center text-zinc-400 tracking-[8px] uppercase">
                Premier
              </p>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {!loading && children}
    </>
  );
}