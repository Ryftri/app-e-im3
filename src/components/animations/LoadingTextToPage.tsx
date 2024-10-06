"use client"

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingText = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500); // 500ms interval untuk menambahkan titik
    return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
    >
      <p>Menyiapkan halaman anda{dots}</p>
    </motion.div>
  );
};

export default LoadingText;
