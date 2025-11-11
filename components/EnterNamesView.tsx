import { useState, useRef, useEffect } from 'react';
import svgPaths from '../imports/svg-8nzbo79v3t';

interface EnterNamesViewProps {
  onDone: (userName: string, teamNames: string) => void;
  isFirstSubmission: boolean;
  currentUserName: string;
}

export function EnterNamesView({ onDone, isFirstSubmission, currentUserName }: EnterNamesViewProps) {
  const [names, setNames] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Focus the input when component mounts
    // Use setTimeout to avoid conflicts with browser extensions
    const timer = setTimeout(() => {
      try {
        inputRef.current?.focus();
      } catch (error) {
        // Ignore focus errors from browser extensions
        console.log('Focus handled by browser extension');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-resize textarea as content changes
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [names]);

  const handleDone = () => {
    try {
      const trimmedNames = names.trim();
      if (trimmedNames) {
        if (isFirstSubmission) {
          // First submission: use the entered names as userName, empty teamNames
          onDone(trimmedNames, trimmedNames);
        } else {
          // Subsequent submissions: keep existing userName, use entered names as teamNames
          onDone(currentUserName, trimmedNames);
        }
      }
    } catch (error) {
      console.error('Error in handleDone:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      handleDone();
    }
  };

  const isDoneEnabled = names.trim().length > 0;

  return (
    <>
      {/* Text input area with placeholder/typed text */}
      <div className="absolute left-[108px] top-[494px] w-[911px]">
        <div className="relative">
          {/* Placeholder text - shows when empty */}
          {!names && (
            <p className="absolute font-['Helvetica_Neue:Medium',sans-serif] not-italic text-[64px] text-[rgba(0,0,213,0.15)] tracking-[-2.5px] pointer-events-none whitespace-nowrap" style={{ lineHeight: '72px' }}>
              Enter Your Names
            </p>
          )}
          
          {/* Actual textarea for input */}
          <textarea
            ref={inputRef}
            value={names}
            onChange={(e) => {
              try {
                setNames(e.target.value);
              } catch (error) {
                console.error('Error updating names:', error);
              }
            }}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            data-lpignore="true"
            data-form-type="other"
            className="font-['Helvetica_Neue:Medium',sans-serif] not-italic text-[64px] text-[#0000d5] tracking-[-2.5px] bg-transparent border-none outline-none resize-none w-full"
            style={{ 
              caretColor: '#0000d5',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              overflow: 'hidden',
              lineHeight: '72px'
            }}
            placeholder=""
          />
        </div>
      </div>

      {/* Done button - right filled circle with checkmark */}
      <div className="absolute left-[1196px] top-[474px]">
        <div 
          className={`relative size-[76.178px] ${isDoneEnabled ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
          onClick={isDoneEnabled ? handleDone : undefined}
        >
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
            <circle 
              cx="38.0888" 
              cy="38.0888" 
              fill={isDoneEnabled ? "#0000D5" : "#D4D4D4"} 
              r="36.8052" 
              stroke="#0000D5" 
              strokeWidth="2.56708" 
            />
          </svg>
          {/* Checkmark centered in button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="h-[34.594px] rotate-[90.305deg] w-[25.945px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 37">
                <path 
                  d={svgPaths.p1e11f600} 
                  stroke={isDoneEnabled ? "#D4D4D4" : "#0000D5"} 
                  strokeWidth="3" 
                />
              </svg>
            </div>
          </div>
        </div>
        {/* Done text centered below button */}
        <p className="font-['Droid_Sans:Regular',sans-serif] leading-[20px] not-italic text-[#0000d5] text-[14px] text-center mt-2 pointer-events-none">
          Done
        </p>
      </div>
    </>
  );
}
