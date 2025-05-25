import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen loadingSpinner">
      <motion.div
        className="w-16 h-16 border-8 border-t-blue-500 border-r-green-500 border-b-yellow-500 border-l-red-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />
    </div>
  );
};

export default LoadingSpinner;