import { useState, useEffect, useRef } from 'react';
import svgPaths from '../imports/svg-bbpcjnbwmo';
import { imgEllipse } from '../imports/svg-b5zld';

interface TimerViewProps {
  isActive: boolean;
  onTimeout: () => void;
  onTimeUpdate?: (timeRemaining: number, timeElapsed: number) => void;
}

function Group() {
  return <div className="absolute contents left-[710.34px] top-[322px]" />;
}

interface Group1Props {
  progress: number;
}

function Group1({ progress }: Group1Props) {
  if (progress < 0.01) {
    // No progress - show gray outline only
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute flex h-[368.628px] items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[365.821px]">
          <div className="flex-none rotate-[90deg]">
            <div className="h-[368.628px] relative w-[365.821px]" data-name="Ellipse">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 366 369">
                <path d={svgPaths.p7fbe000} id="Ellipse" stroke="#CFCFCF" strokeWidth="5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // With progress - show filled blue arc with mask
  // Generate points along the arc from top (0°) going clockwise
  const numPoints = 100;
  const angle = progress * 360; // 0 to 360 degrees
  const points = ['50% 50%', '50% 0%']; // Start from center, then top
  
  for (let i = 0; i <= numPoints; i++) {
    const currentAngle = (angle * i) / numPoints;
    const rad = (currentAngle * Math.PI) / 180;
    const x = 50 + 50 * Math.sin(rad);
    const y = 50 - 50 * Math.cos(rad);
    points.push(`${x}% ${y}%`);
  }
  
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {/* Masked filled arc showing progress */}
      <div 
        className="absolute flex h-[379.625px] items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[376.551px]" 
        style={{ 
          clipPath: `polygon(${points.join(', ')})`
        } as React.CSSProperties}
      >
        <div className="flex-none rotate-[90deg]">
          <div className="h-[379.625px] relative w-[376.551px]" data-name="Ellipse">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 377 380">
              <ellipse cx="188.276" cy="189.813" fill="#0000D5" id="Ellipse" rx="188.276" ry="189.813" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Background low opacity blue circle */}
      <div className="absolute flex h-[379.625px] items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[376.551px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-[379.625px] relative w-[376.551px]" data-name="Ellipse">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 377 380">
              <ellipse cx="188.276" cy="189.813" fill="#0000D5" fillOpacity="0.25" id="Ellipse" opacity="0.03" rx="188.276" ry="189.813" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Gray center circle to create the ring effect */}
      <div className="absolute flex h-[368.628px] items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[365.821px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-[368.628px] relative w-[365.821px]" data-name="Ellipse">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 366 369">
              <ellipse cx="182.91" cy="184.314" fill="#D4D4D4" id="Ellipse" rx="182.91" ry="184.314" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FilterPartProps {
  timeRemaining: number;
  progress: number;
}

function FilterPart({ timeRemaining, progress }: FilterPartProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeDisplay = `${minutes}:${String(seconds).padStart(2, '0')}`;
  
  // Calculate dot position on the circle (radius 184px from center)
  const radius = 184;
  
  // Angle in radians - starting from top (12 o'clock), going clockwise
  const angle = progress * 2 * Math.PI; // 0 to 2π
  
  // Calculate position (starting from top, going clockwise)
  const dotX = radius * Math.sin(angle);
  const dotY = -radius * Math.cos(angle);
  
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" data-name="filter-part">
      <Group1 progress={progress} />
      
      {/* Timer text - centered inside circle */}
      <p className="absolute font-['Droid_Sans:Bold',sans-serif] h-[120px] leading-[120px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-[70px] not-italic text-[#0000d5] text-[120px] text-center w-[400px]">{timeDisplay}</p>
      
      {/* "mins" label - centered below timer inside circle */}
      <p className="absolute font-['Droid_Sans:Regular',sans-serif] h-[27px] leading-[normal] left-1/2 top-1/2 -translate-x-1/2 translate-y-[45px] not-italic text-[#0000d5] text-[22.252px] text-center w-[77px]">mins</p>
      
      {/* Progress dot */}
      <div 
        className="absolute h-[12.682px] w-[12.745px] left-1/2 top-1/2" 
        data-name="Ellipse"
        style={{
          transform: `translate(calc(-50% + ${dotX}px), calc(-50% + ${dotY}px))`,
          transition: 'transform 1s linear'
        }}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
          <ellipse cx="6.37256" cy="6.34089" fill="#0000D5" id="Ellipse" rx="6.37256" ry="6.34089" />
        </svg>
      </div>
    </div>
  );
}

export function TimerView({ isActive, onTimeout, onTimeUpdate }: TimerViewProps) {
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const totalTime = 600;
  const onTimeUpdateRef = useRef(onTimeUpdate);

  // Keep the ref updated
  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
  }, [onTimeUpdate]);

  // Separate effect to call onTimeUpdate when timeRemaining changes
  useEffect(() => {
    if (isActive && onTimeUpdateRef.current) {
      const timeElapsed = totalTime - timeRemaining;
      onTimeUpdateRef.current(timeRemaining, timeElapsed);
    }
  }, [timeRemaining, isActive]);

  useEffect(() => {
    if (!isActive) {
      setTimeRemaining(600);
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;

        if (newTime <= 0) {
          clearInterval(interval);
          onTimeout();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, onTimeout]);

  const progress = (totalTime - timeRemaining) / totalTime;

  return (
    <div className="bg-neutral-300 fixed inset-0 w-screen h-screen flex items-center justify-center" data-name="Timer View">
      <div className="relative w-[400px] h-[400px]">
        <FilterPart timeRemaining={timeRemaining} progress={progress} />
      </div>
    </div>
  );
}
