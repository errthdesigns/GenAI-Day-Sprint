import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TimeoutScreenProps {
  onStartAgain: () => void;
}

export function TimeoutScreen({ onStartAgain }: TimeoutScreenProps) {
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    // Show shake animation with dispersed buttons for 2 seconds
    const timer = setTimeout(() => {
      setShowFinal(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showFinal) {
    // Final "OUT OF TIME!" screen
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#0000d5] relative size-full"
      >
        <p className="absolute font-['Droid_Sans:Bold',sans-serif] h-[183px] leading-[200px] left-[calc(50%+0.5px)] not-italic text-[150px] text-center text-white top-[calc(50%-91px)] translate-x-[-50%] w-[1127px]">
          OUT OF TIME!
        </p>
        <button
          onClick={onStartAgain}
          className="absolute bottom-[10.06%] left-[calc(50%+0.5px)] top-[85.06%] translate-x-[-50%] w-[123px]"
        >
          <div className="absolute bg-white inset-0 rounded-[100px]">
            <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-1px] pointer-events-none rounded-[101px]" />
          </div>
          <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[#0000d5] text-[14px] text-center top-[30%]">
            Start Again
          </p>
        </button>
      </motion.div>
    );
  }

  // Shake animation screen with dispersed buttons
  return (
    <motion.div
      initial={{ backgroundColor: '#d4d4d4' }}
      animate={{ 
        backgroundColor: '#0000d5',
        x: [0, -10, 10, -10, 10, -5, 5, 0],
        y: [0, 5, -5, 5, -5, 2, -2, 0]
      }}
      transition={{ 
        backgroundColor: { duration: 0.3 },
        x: { duration: 0.6, times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 1] },
        y: { duration: 0.6, times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 1] }
      }}
      className="relative size-full"
    >
      {/* Large timer showing 00:00 */}
      <motion.p
        initial={{ opacity: 0, color: '#0000D5' }}
        animate={{ 
          opacity: 1, 
          color: '#ffffff',
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          opacity: { delay: 0.2 },
          color: { delay: 0.3 },
          scale: { duration: 0.4, delay: 0.3 }
        }}
        className="absolute font-['Droid_Sans:Bold',sans-serif] h-[144px] leading-[163.18px] left-[calc(50%+0.5px)] not-italic text-[400px] text-center top-[calc(50%-72px)] translate-x-[-50%] w-[1127px]"
      >
        00:00
      </motion.p>

      {/* Timer button - bottom center, fades out */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="absolute bottom-[5.18%] left-[calc(50%-0.5px)] top-[89.94%] translate-x-[-50%] w-[123px]"
      >
        <div className="absolute inset-0 rounded-[100px]">
          <div aria-hidden="true" className="absolute border-2 border-neutral-300 border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
        </div>
        <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[14px] text-center text-neutral-300 top-[30%]">
          Timer
        </p>
      </motion.div>

      {/* Help button - top right, dispersed with rotation */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ 
          rotate: 60,
          x: [0, 20],
          y: [0, -50]
        }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute flex inset-[12.13%_10.15%_75.02%_82.58%] items-center justify-center"
      >
        <div className="flex-none h-[50px] w-[123px]">
          <div className="relative size-full">
            <div className="absolute inset-0 rounded-[100px]">
              <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-1px] pointer-events-none rounded-[101px]" />
            </div>
            <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[14px] text-center text-white top-[30%]">
              Help
            </p>
          </div>
        </div>
      </motion.div>

      {/* Brief button - bottom left, dispersed with rotation */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ 
          rotate: 330,
          x: [0, -30],
          y: [0, 40]
        }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute flex inset-[69.88%_83.66%_19.88%_7.2%] items-center justify-center"
      >
        <div className="flex-none h-[50px] w-[123px]">
          <div className="relative size-full">
            <div className="absolute inset-0 rounded-[100px]">
              <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-1px] pointer-events-none rounded-[101px]" />
            </div>
            <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[14px] text-center text-white top-[30%]">
              Brief
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
