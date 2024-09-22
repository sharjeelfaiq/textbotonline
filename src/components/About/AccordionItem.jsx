import React from "react";
import { motion } from "framer-motion";

const AccordionItems = ({ title, description }) => {
  return (
    <motion.li style={{ width: "80%", borderRadius: "5px" }}>
      <small>
        <strong>{title} - </strong>
        {description}
      </small>
    </motion.li>
  );
};

export default AccordionItems;
