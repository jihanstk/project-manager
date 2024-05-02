"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const DropZon = ({onDrop}) => {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <motion.div
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      className={`${
        showDrop ? "opacity-100 border py-6 px-3" : "opacity-0"
      } duration-300`}
    >
      drop here
    </motion.div>
  );
};

export default DropZon;
