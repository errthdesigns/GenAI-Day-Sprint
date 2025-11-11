import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PillButton } from './PillButton';

interface PopupMessage {
  id: number;
  text: string;
  x: number;
  y: number;
}

interface RepellingHelpButtonProps {
  onClick: () => void;
  resetTrigger?: string | number; // Optional prop to trigger position reset
}

const TROLL_MESSAGES = [
  "Have you asked AI?",
  "Do you really think Erin & Vix know more about AI than AI knows about AI...",
  "Have you asked ChatGPT?",
  "Have you asked Gemini?",
  "AI knows 'everything'... go ask it for help!",
  "Have you asked Claude?",
  "AI’s office hours are... always...",
  "If it’s about AI, ask AI...",
  "Ask AI now, thank Erin & Vix later 💅",
  "Short Answer: Ask AI",
];

export function RepellingHelpButton({ onClick, resetTrigger }: RepellingHelpButtonProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [popups, setPopups] = useState<PopupMessage[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);
  const popupIdRef = useRef(0);
  const lastRepelTime = useRef(0);
  const returnTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const usedMessagesRef = useRef<Set<string>>(new Set());

  // Reset position when resetTrigger changes (e.g., screen/view changes)
  useEffect(() => {
    setOffset({ x: 0, y: 0 });
    setPopups([]); // Clear all popup messages
    // Clear any pending timeouts
    if (returnTimeoutRef.current) {
      clearTimeout(returnTimeoutRef.current);
    }
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
  }, [resetTrigger]);

  // Effect to handle 10-second inactivity reset
  useEffect(() => {
    // Clear existing inactivity timeout
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }

    // Only set timeout if button is not at home position
    if (offset.x !== 0 || offset.y !== 0) {
      inactivityTimeoutRef.current = setTimeout(() => {
        setOffset({ x: 0, y: 0 });
      }, 10000); // 10 seconds
    }

    return () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, [offset]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;

      const buttonRect = buttonRef.current.getBoundingClientRect();
      
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Calculate distance from cursor to button center
      const dx = mouseX - buttonCenterX;
      const dy = mouseY - buttonCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Repel zone: 120px radius
      const repelRadius = 120;
      
      // Throttle repels to prevent spam (max once per 400ms)
      const now = Date.now();
      if (distance < repelRadius && distance > 0 && now - lastRepelTime.current > 400) {
        lastRepelTime.current = now;
        
        // Clear any pending return timeout
        if (returnTimeoutRef.current) {
          clearTimeout(returnTimeoutRef.current);
        }
        
        // Calculate viewport bounds with safe margins
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const buttonWidth = buttonRect.width;
        const buttonHeight = buttonRect.height;
        
        const safeMargin = 100; // pixels from edge
        
        // Determine new random position on opposite side
        let newX: number;
        let newY: number;
        
        // If cursor is on left half, jump to right half; otherwise jump to left half
        if (mouseX < viewportWidth / 2) {
          newX = viewportWidth * 0.7 + Math.random() * (viewportWidth * 0.2);
        } else {
          newX = viewportWidth * 0.1 + Math.random() * (viewportWidth * 0.2);
        }
        
        // If cursor is on top half, jump to bottom half; otherwise jump to top half  
        if (mouseY < viewportHeight / 2) {
          newY = viewportHeight * 0.7 + Math.random() * (viewportHeight * 0.2);
        } else {
          newY = viewportHeight * 0.2 + Math.random() * (viewportHeight * 0.3);
        }
        
        // Ensure button stays within safe bounds
        newX = Math.max(safeMargin, Math.min(viewportWidth - buttonWidth - safeMargin, newX));
        newY = Math.max(safeMargin, Math.min(viewportHeight - buttonHeight - safeMargin, newY));
        
        // Calculate offset from original position
        const originalX = buttonRect.left - offset.x;
        const originalY = buttonRect.top - offset.y;
        
        setOffset({ 
          x: newX - originalX, 
          y: newY - originalY 
        });
        
        // Show popup message at button's current position
        // Get a message that hasn't been used recently
        let randomMessage: string;
        let availableMessages = TROLL_MESSAGES.filter(msg => !usedMessagesRef.current.has(msg));
        
        // If all messages have been used, reset the used set
        if (availableMessages.length === 0) {
          usedMessagesRef.current.clear();
          availableMessages = TROLL_MESSAGES;
        }
        
        randomMessage = availableMessages[Math.floor(Math.random() * availableMessages.length)];
        usedMessagesRef.current.add(randomMessage);
        
        // Calculate safe popup position within viewport bounds
        const popupWidth = 400; // Estimated max width for longest message
        const popupHeight = 60; // Estimated height
        const popupMargin = 20; // Margin from viewport edges
        const popupSpacing = 20; // Minimum space between popups
        
        let popupX = buttonCenterX;
        let popupY = buttonCenterY - 40;
        
        // Function to check if a position overlaps with existing popups
        const checkOverlap = (x: number, y: number): boolean => {
          return popups.some(existingPopup => {
            const dx = Math.abs(x - existingPopup.x);
            const dy = Math.abs(y - existingPopup.y);
            // Check if popups overlap (considering width/height + spacing)
            return dx < (popupWidth / 2 + popupSpacing) && dy < (popupHeight + popupSpacing);
          });
        };
        
        // Try to find a non-overlapping position
        let attempts = 0;
        const maxAttempts = 10;
        while (checkOverlap(popupX, popupY) && attempts < maxAttempts) {
          // Try different positions: above, below, left, right
          const angle = (Math.random() * 360) * (Math.PI / 180);
          const distance = 100 + Math.random() * 100;
          popupX = buttonCenterX + Math.cos(angle) * distance;
          popupY = buttonCenterY + Math.sin(angle) * distance;
          attempts++;
        }
        
        // Adjust X position if popup would go off-screen
        const halfWidth = popupWidth / 2;
        if (popupX - halfWidth < popupMargin) {
          popupX = halfWidth + popupMargin;
        } else if (popupX + halfWidth > viewportWidth - popupMargin) {
          popupX = viewportWidth - halfWidth - popupMargin;
        }
        
        // Adjust Y position if popup would go off-screen
        if (popupY < popupMargin) {
          popupY = popupMargin;
        } else if (popupY + popupHeight > viewportHeight - popupMargin) {
          popupY = viewportHeight - popupHeight - popupMargin;
        }
        
        const popup: PopupMessage = {
          id: popupIdRef.current++,
          text: randomMessage,
          x: popupX,
          y: popupY,
        };
        
        setPopups(prev => [...prev, popup]);
        
        // Remove popup after 5 seconds
        setTimeout(() => {
          setPopups(prev => prev.filter(p => p.id !== popup.id));
        }, 5000);
        
        // Return to original position after 1.5 seconds
        returnTimeoutRef.current = setTimeout(() => {
          setOffset({ x: 0, y: 0 });
        }, 1500);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (returnTimeoutRef.current) {
        clearTimeout(returnTimeoutRef.current);
      }
    };
  }, [offset, popups]);

  return (
    <>
      <motion.div
        ref={buttonRef}
        animate={{
          x: offset.x,
          y: offset.y,
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 15,
          rotate: {
            duration: 0.3,
          }
        }}
        className="absolute inset-[85.06%_7.43%_10.06%_84.03%]"
      >
        <PillButton 
          onClick={onClick}
          className="whitespace-nowrap"
        >
          Help
        </PillButton>
      </motion.div>

      {/* Popup messages */}
      <AnimatePresence>
        {popups.map(popup => (
          <motion.div
            key={popup.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.3,
              exit: { duration: 0.5 }
            }}
            className="fixed pointer-events-none z-50 bg-[#0000d5] text-white px-4 py-2 rounded-full text-sm font-['Droid_Sans:Bold',sans-serif] shadow-lg max-w-[90vw]"
            style={{
              left: `${popup.x}px`,
              top: `${popup.y}px`,
              transform: 'translateX(-50%)',
            }}
          >
            {popup.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
