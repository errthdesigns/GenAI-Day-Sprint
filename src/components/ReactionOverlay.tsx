import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ReactionType } from '../types';
import clientVideo from '../assets/client-vid-square.mp4';

interface ReactionOverlayProps {
  onComplete: (reaction: ReactionType) => void;
  timeElapsed: number;
}

export function ReactionOverlay({ onComplete, timeElapsed }: ReactionOverlayProps) {
  const [phase, setPhase] = useState<'looking' | 'watch' | 'final'>('looking');
  const [reaction, setReaction] = useState<ReactionType>('grin');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Determine reaction based on submission time
    let finalReaction: ReactionType;
    if (timeElapsed < 300) {
      // Under 5 minutes - impressed/surprised
      finalReaction = 'surprised';
    } else if (timeElapsed < 480) {
      // 5-8 minutes - happy
      finalReaction = 'grin';
    } else {
      // Over 8 minutes - disappointed
      finalReaction = 'frown';
    }
    setReaction(finalReaction);

    // After 2 seconds, check watch
    const watchTimer = setTimeout(() => {
      setPhase('watch');
    }, 2000);

    // After 6 seconds total, show final reaction
    const finalTimer = setTimeout(() => {
      setPhase('final');
    }, 6000);

    // After 8 seconds, complete
    const completeTimer = setTimeout(() => {
      onComplete(finalReaction);
    }, 8000);

    return () => {
      clearTimeout(watchTimer);
      clearTimeout(finalTimer);
      clearTimeout(completeTimer);
    };
  }, [timeElapsed, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="text-center"
      >
        <div className="flex flex-col items-center gap-12">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            width="500"
            height="500"
            className="rounded-full object-cover mx-auto"
            style={{ 
              backgroundColor: '#F3F4F6',
              width: '500px',
              height: '500px',
              display: 'block'
            }}
            onError={(e) => {
              console.error('Video failed to load:', e, clientVideo);
            }}
            onLoadedData={() => {
              console.log('Video loaded successfully');
              videoRef.current?.play().catch(err => console.error('Play failed:', err));
            }}
          >
            <source src={clientVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="text-white text-xl text-center whitespace-nowrap">
            The client is reviewing your work...
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
