import React from 'react';
import { motion } from 'framer-motion';

// Animasyon varyantları
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

interface CardGridProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  gridClassName?: string;
}

function CardGrid<T>({ items, renderItem, gridClassName = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" }: CardGridProps<T>) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid ${gridClassName} gap-6`}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="group"
        >
          {renderItem(item)}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default CardGrid; 