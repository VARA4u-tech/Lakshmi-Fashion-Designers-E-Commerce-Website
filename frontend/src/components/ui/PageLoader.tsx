import { motion } from "framer-motion";
import logo from "@/assets/logo.jpg";

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      {/* Background Gradient Pulse */}
      <motion.div
        className="absolute inset-0 bg-background"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, hsl(345, 70%, 10%) 0%, hsl(345, 70%, 8%) 100%)",
            "radial-gradient(circle at 50% 50%, hsl(345, 70%, 15%) 0%, hsl(345, 70%, 8%) 100%)",
            "radial-gradient(circle at 50% 50%, hsl(345, 70%, 10%) 0%, hsl(345, 70%, 8%) 100%)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex flex-col items-center">
        {/* Logo Container with Golden Ring */}
        <div className="relative mb-8">
          {/* Rotating Gold Ring */}
          <motion.div
            className="absolute -inset-4 rounded-full border border-accent/30 border-t-accent"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Counter-rotating Inner Ring */}
          <motion.div
            className="absolute -inset-2 rounded-full border border-accent/20 border-b-accent"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-accent/50 shadow-[0_0_30px_rgba(234,179,8,0.2)]"
          >
            <img src={logo} alt="Logo" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Text Animations */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center relative z-10"
        >
          <h1 className="font-heading text-2xl md:text-3xl text-gradient-gold mb-2 font-bold tracking-wide">
            Lakshmi Fashion
          </h1>
          <motion.p
            className="text-cream/60 text-sm tracking-[0.2em] uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Crafting Elegance
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};
