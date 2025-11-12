import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

function CelebrationConfetti() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Generate 100 confetti pieces */}
      {Array.from({ length: 100 }).map((_, i) => {
        const left = (i * 13.7) % 100;
        const delay = (i * 0.15) % 5;
        const duration = 3 + (i % 3);
        const colors = ['#3271ea', '#fcbd00', '#128937', '#db372d', '#3271ea'];
        const color = colors[i % 5];
        const width = 20 + (i % 15);
        const height = 10 + (i % 10);
        const rotate = i * 37;
        
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ 
              left: `${left}%`,
              width: `${width}px`,
              height: `${height}px`,
              backgroundColor: color,
              borderRadius: '2px',
            }}
            animate={{ 
              y: ['120vh', '-20vh'],
              rotate: [rotate, rotate + 720],
            }}
            transition={{
              duration: duration,
              delay: delay,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 0,
            }}
          />
        );
      })}
    </div>
  );
}

function FallingGrayscaleConfetti() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Generate 100 confetti pieces that start colorful across screen, then turn grayscale and fall */}
      {Array.from({ length: 100 }).map((_, i) => {
        const left = (i * 13.7) % 100;
        const startY = (i * 3.5) % 100; // Start spread across the screen
        const delay = (i * 0.01) % 0.5; // Staggered start
        const duration = 3 + (i % 2);
        const colorfulColors = ['#3271ea', '#fcbd00', '#128937', '#db372d', '#3271ea'];
        const grayscaleColors = ['#202020', '#000000', '#555555', '#808080', '#cfcfcf', '#999999'];
        const colorIndex = i % 5;
        const width = 20 + (i % 15);
        const height = 10 + (i % 10);
        const rotate = i * 37;
        
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ 
              left: `${left}%`,
              width: `${width}px`,
              height: `${height}px`,
              borderRadius: '2px',
            }}
            initial={{
              y: `${startY}vh`,
              rotate: rotate,
              backgroundColor: colorfulColors[colorIndex],
            }}
            animate={{ 
              y: '110vh',
              rotate: rotate + 720,
              backgroundColor: grayscaleColors[i % 6],
            }}
            transition={{
              y: {
                duration: duration,
                delay: delay,
                ease: "easeIn",
              },
              rotate: {
                duration: duration,
                delay: delay,
                ease: "linear",
              },
              backgroundColor: {
                duration: 1.5,
                delay: delay,
                ease: "easeInOut",
              }
            }}
          />
        );
      })}
    </div>
  );
}

function FeedbackButton() {
  return (
    <div className="absolute inset-[10.06%_83.96%_85.06%_7.5%]" data-name="White Stroke / Default">
      <div className="absolute inset-0 rounded-[100px]" data-name=".atom Background">
        <div aria-hidden="true" className="absolute border-2 border-[#0000d5] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
      </div>
      <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[#0000d5] text-[14px] text-center top-[30%]">Feedback</p>
    </div>
  );
}

interface ConfettiScreenProps {
  onComplete: () => void;
}

export function ConfettiScreen({ onComplete }: ConfettiScreenProps) {
  const [phase, setPhase] = useState<'celebration' | 'feedback'>('celebration');

  useEffect(() => {
    // After 7 seconds, transition to feedback phase
    const feedbackTimer = setTimeout(() => {
      setPhase('feedback');
      
      // TODO: Play Teams incoming call sound effect when teams-call.mp3 is added
      // if (audioRef.current) {
      //   audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      // }

      // Transition to feedback view after 4 seconds
      setTimeout(() => {
        onComplete();
      }, 4000);
    }, 7000);

    return () => {
      clearTimeout(feedbackTimer);
    };
  }, [onComplete]);

  return (
    <div className="bg-neutral-300 relative size-full overflow-hidden">
      {/* Hidden audio element for Teams incoming call sound effect */}
      {/* TODO: Add teams-call.mp3 file to src/assets/ folder, then uncomment and import it */}
      {/* 
      <audio 
        ref={audioRef} 
        src={teamsCallSound}
        preload="auto"
      />
      */}
      
      <AnimatePresence mode="wait">
        {phase === 'celebration' ? (
          <motion.div
            key="celebration"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <CelebrationConfetti />
            <FeedbackButton />
            <p className="absolute font-['Droid_Sans:Regular',sans-serif] h-[114px] leading-[90px] left-[108px] not-italic text-[#0000d4] text-[64px] top-[calc(50%-57px)] w-[728px] z-10 pointer-events-none">
              Sent to client!
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="feedback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <FallingGrayscaleConfetti />
            <FeedbackButton />
            <p className="absolute font-['Droid_Sans:Regular',sans-serif] h-[114px] leading-[90px] left-[108px] not-italic text-[#0000d4] text-[64px] top-[calc(50%-56px)] w-[728px] z-10 pointer-events-none">
              The client has replied...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
