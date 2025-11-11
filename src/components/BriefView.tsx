import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Brief } from '../types';

interface BriefViewProps {
  brief: Brief;
  onReadyToStart?: (ready: boolean) => void;
  showHeader?: boolean;
}

export function BriefView({ brief, onReadyToStart, showHeader = false }: BriefViewProps) {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Check if this is a multi-page brief
  const isMultiPage = brief.pages !== undefined;
  
  // Reset to first page when brief changes
  useEffect(() => {
    setCurrentPage(0);
    if (onReadyToStart) {
      // If it's a single-page brief (text only), ready immediately
      // If it's multi-page, not ready until last page
      onReadyToStart(!isMultiPage);
    }
  }, [brief.id, onReadyToStart, isMultiPage]);

  // Only calculate these for multi-page briefs
  const totalPages = isMultiPage ? brief.pages!.length : 1;
  const isLastPage = currentPage === totalPages - 1;

  const handleNextPage = () => {
    if (isMultiPage && currentPage < totalPages - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      if (newPage === totalPages - 1 && onReadyToStart) {
        onReadyToStart(true);
      }
    }
  };

  const handlePrevPage = () => {
    if (isMultiPage && currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      if (onReadyToStart) {
        onReadyToStart(false);
      }
    }
  };

  return (
    <>
      {/* Mini header - shown when viewing brief during active timer */}
      {showHeader && (
        <div className="absolute inset-[10.06%_83.96%_85.06%_7.5%]">
          <div className="absolute inset-0 rounded-[100px]">
            <div aria-hidden="true" className="absolute border-2 border-[#0000d5] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
          </div>
          <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[#0000d5] text-[14px] text-center top-[30%]">Brief</p>
        </div>
      )}

      {/* Brief content */}
      <div className="absolute font-['Droid_Sans:Regular',sans-serif] h-[468px] leading-[60px] left-[108px] not-italic text-[#0000d4] text-[50px] top-[278px] w-[911px]">
        {isMultiPage ? (
          // Multi-page brief: show current page content
          brief.pages![currentPage].content.map((line, index) => {
            // Empty line renders as nbsp
            if (line === "") {
              return <p key={index} className="mb-0">&nbsp;</p>;
            }
            
            // Check if this is a feedback brief (single long line with zero-width spaces)
            // vs initial brief (multiple lines, each already separate)
            const isFeedbackBrief = brief.pages![currentPage].content.length === 1 && line.includes('​');
            
            if (isFeedbackBrief) {
              // Split by zero-width space and render as separate paragraphs
              const segments = line.split('​').filter(segment => segment.trim().length > 0);
              return (
                <div key={index}>
                  {segments.map((segment, segIndex) => (
                    <div key={segIndex}>
                      <p className="mb-0">{segment}</p>
                      {segIndex < segments.length - 1 && <p className="mb-0">&nbsp;</p>}
                    </div>
                  ))}
                </div>
              );
            }
            
            // Check if line contains text that should be bold (initial brief format)
            const parts = line.split(/(\*\*.*?\*\*)/g);
            
            return (
              <p key={index} className="mb-0">
                {parts.map((part, partIndex) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    const text = part.slice(2, -2);
                    return (
                      <span key={partIndex} className="font-['Droid_Sans:Bold',sans-serif] not-italic">
                        {text}
                      </span>
                    );
                  }
                  return <span key={partIndex}>{part}</span>;
                })}
              </p>
            );
          })
        ) : (
          // Single-text brief: show text (legacy support)
          <p className="mb-0 whitespace-pre-wrap">{brief.text}</p>
        )}
      </div>

      {/* Image - shown on pages that have an image */}
      {isMultiPage && brief.pages![currentPage].image && (
        <div className="absolute right-[108px] bottom-[108px] w-[350px] h-[450px]">
          <img 
            src={brief.pages![currentPage].image} 
            alt="Client reaction"
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Navigation arrows - only show for multi-page briefs */}
      {isMultiPage && (
        <>
          {/* Left arrow */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="absolute left-[1091px] size-[76.178px] top-[476px]"
          >
            <svg className="block size-full" fill="none" viewBox="0 0 77 77">
              <circle 
                cx="38.0888" 
                cy="38.0888" 
                r="36.8052" 
                stroke={currentPage === 0 ? "#979797" : "#0000D5"} 
                strokeWidth="2.56708" 
              />
            </svg>
            <div className="absolute left-[17.12px] top-[18.41px] size-[41.929px] h-[41.073px] flex items-center justify-center">
              <ChevronLeft 
                className="size-6" 
                style={{ color: currentPage === 0 ? "#979797" : "#0000D5" }}
                strokeWidth={3}
              />
            </div>
          </button>

          {/* Right arrow */}
          <button
            onClick={handleNextPage}
            disabled={isLastPage}
            className="absolute left-[1198px] size-[76.178px] top-[476px]"
          >
            <svg className="block size-full" fill="none" viewBox="0 0 77 77">
              <circle 
                cx="38.0888" 
                cy="38.0888" 
                r="36.8052" 
                stroke={isLastPage ? "#979797" : "#0000D5"} 
                strokeWidth="2.56708" 
              />
            </svg>
            <div className="absolute left-[17.13px] top-[18.41px] size-[41.929px] h-[41.073px] flex items-center justify-center">
              <ChevronRight 
                className="size-6" 
                style={{ color: isLastPage ? "#979797" : "#0000D5" }}
                strokeWidth={3}
              />
            </div>
          </button>
        </>
      )}
    </>
  );
}
