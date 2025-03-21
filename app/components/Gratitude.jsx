import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Gratitude = ({ name }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="p-8 w-[90%] max-w-lg bg-white/10 backdrop-blur-md shadow-xl border border-white/20 rounded-2xl text-white text-center mb-[15vh]"
    >
      {/* 🎉 Gratitude Message */}
      <h2 className="text-3xl font-semibold mb-2">Thank You, {name}! 🙌</h2>
      <p className="text-base text-white/80">
        Your kindness and support mean the world to us.<br />We truly appreciate it! 💙
      </p>

      {/* 📝 Short Personalized Message */}
      <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
        <p className="text-sm text-white/80 text-md">
          We will get back to you soon with more details.<br />Meanwhile, take care and stay safe! 🌟
        </p>
        <br />
        <span className="ml-[17vw] text-sm">Team : Code Nation</span>
      </div>

      {/* 🔙 Back Button */}
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-6 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition-all rounded-lg shadow-md cursor-pointer"
      >
        Back to Home
      </button>
    </motion.div>
  );
};

export default Gratitude;