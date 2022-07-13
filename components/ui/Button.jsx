import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

export default function Button({ children, loading, disabled, ...rest }) {
  return (
    <button
      {...rest}
      disabled={disabled ? true : loading && true}
      className={`relative inline-block flex h-[36px] items-center justify-center rounded-xl border-2  px-4 align-middle shadow-lg transition-all duration-100 ${
        disabled || loading
          ? "bg-primary-7"
          : "bg-primary-9 hover:bg-primary-10 active:border-2 active:border-primary-11 active:shadow-sm border-primary-9"
      } `}>
      <div className={`${loading ? "text-transparent" : "text-white"} font-body relative`}>
        {children}
        {loading && (
          <div className="absolute w-full top-0 flex justify-center">
            <LoadingSpinner size={20} />
          </div>
        )}
      </div>
      {/* <motion.div
        className="absolute top-0 left-0 w-10 h-10 bg-pink-400 rounded-xl"
        animate={cardPosition}
        transition={{ delay: 1, duration: 2 }}
      /> */}
    </button>
  );
}
