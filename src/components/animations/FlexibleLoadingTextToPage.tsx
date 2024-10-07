"use client"

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const FlexibleLoadingText = ({
  textMessage
}: {
  textMessage: string
}) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
    >
      <p>{textMessage}{dots}</p>
    </motion.div>
  );
};

export default FlexibleLoadingText;
