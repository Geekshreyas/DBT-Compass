
import { motion } from 'framer-motion';
export default function Spinner({ message }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="mt-4 text-gray-600 font-medium">
        {message || "Checking NPCI Mapper Status..."}
      </p>
    </div>
  );
}