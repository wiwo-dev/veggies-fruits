import { motion } from "framer-motion";

export default function Button({ children, loading, disabled, ...rest }) {
  return (
    <button
      {...rest}
      disabled={disabled && true}
      className={`relative flex h-[36px] items-center justify-center rounded-xl border-2  px-4 align-middle shadow-lg transition-all duration-100 ${
        disabled
          ? "bg-primary-7"
          : "bg-primary-9 hover:bg-primary-10 active:border-2 active:border-primary-11 active:shadow-sm border-primary-9"
      } `}>
      <span className="text-white font-body">{loading ? "Loading..." : children}</span>
      {/* <motion.div
        className="absolute top-0 left-0 w-10 h-10 bg-pink-400 rounded-xl"
        animate={cardPosition}
        transition={{ delay: 1, duration: 2 }}
      /> */}
    </button>
  );
}
