import { motion } from "framer-motion";

export default function Button({ children, ...rest }) {
  const cardPosition = { x: 300, y: 100 };
  return (
    <button
      {...rest}
      className="relative flex h-[36px] items-center justify-center rounded-xl border-2 border-primary-9 bg-primary-9 px-4 align-middle shadow-lg transition-all duration-100 hover:bg-primary-10 active:border-2 active:border-primary-11 active:shadow-sm">
      <span className="text-white">{children}</span>
      {/* <motion.div
        className="absolute top-0 left-0 w-10 h-10 bg-pink-400 rounded-xl"
        animate={cardPosition}
        transition={{ delay: 1, duration: 2 }}
      /> */}
    </button>
  );
}
