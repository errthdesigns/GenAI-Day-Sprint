import { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import svgPaths from '../imports/svg-bvj9nfqkrp';
import imgScreenshot20210621At4472 from "figma:asset/8e919004e62587114444caaf1af0266680244039.png";
import { imgScreenshot20210621At4471 } from '../imports/svg-ashni';

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  complete: boolean;
  preview?: string;
}

interface SubmitViewProps {
  onSubmitComplete?: (files: File[]) => void;
  onNavigateToTimer?: () => void;
  onDone?: (files: File[]) => void;
}

export function SubmitView({ onSubmitComplete, onNavigateToTimer, onDone }: SubmitViewProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const validTypes = ['image/', 'video/', 'application/pdf', 'audio/mpeg', 'audio/mp3'];
      return validTypes.some(type => file.type.startsWith(type));
    });

    // Limit to 5 files total
    const remainingSlots = 5 - uploadedFiles.length;
    const filesToAdd = validFiles.slice(0, remainingSlots);

    const newFiles: UploadedFile[] = filesToAdd.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      complete: false,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((uploadFile, index) => {
      simulateUpload(uploadFile.id);
    });
  }, [uploadedFiles.length]);

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, progress: 100, complete: true } : f)
        );
        clearInterval(interval);
      } else {
        setUploadedFiles(prev => 
          prev.map(f => f.id === fileId ? { ...f, progress } : f)
        );
      }
    }, 100);
  };

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const scrollPercentage = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setScrollPosition(scrollPercentage);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Trigger initial calculation
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, uploadedFiles.length]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  }, [handleFiles]);

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return '🖼️';
    if (file.type.startsWith('video/')) return '🎬';
    if (file.type === 'application/pdf') return '📄';
    if (file.type.startsWith('audio/')) return '🎵';
    return '📁';
  };

  // Calculate scroll thumb position
  const scrollThumbTop = 379 + (scrollPosition * (265 - 119));

  return (
    <>
      {/* Submit header - top left */}
      <div className="absolute inset-[10.06%_83.96%_85.06%_7.5%]">
        <div className="absolute inset-0 rounded-[100px]">
          <div aria-hidden="true" className="absolute border-2 border-[#0000d5] border-solid inset-[-1px] pointer-events-none rounded-[101px]" />
        </div>
        <p className="absolute bottom-[30%] font-['Droid_Sans:Bold',sans-serif] leading-[20px] left-0 not-italic right-0 text-[#0000d5] text-[14px] text-center top-[30%]">Submit</p>
      </div>

      {uploadedFiles.length === 0 ? (
        <>
          {/* Drag and drop area */}
          <div
            className="absolute left-[108.4px] top-[494px] w-[911px] cursor-pointer"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <p className="font-['Droid_Sans:Regular',sans-serif] leading-[36px] not-italic text-[#0000d5] text-[64px] tracking-[-2.5px]">
              Drag and drop your files here.
            </p>
          </div>

          {/* Upload icon with circle - clickable */}
          <div 
            className="absolute left-[1066px] top-[473.91px] size-[76.178px] cursor-pointer"
            onClick={() => document.getElementById('file-input')?.click()}
          >
            {/* Circle */}
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
              <circle cx="38.0888" cy="38.0888" r="36.8052" stroke="#0000D5" strokeWidth="2.56708" />
            </svg>
            {/* Centered upload icon */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="rotate-[180deg] scale-y-[-100%] size-[37.682px]">
                <Upload className="size-full" style={{ color: '#0000D5' }} strokeWidth={2} />
              </div>
            </div>
          </div>

        </>
      ) : (
        <>

          {/* Uploaded files header */}
          <p className="absolute font-['Droid_Sans:Regular',sans-serif] leading-[28px] left-[108px] not-italic text-[#0000d5] text-[18px] text-nowrap top-[299px] whitespace-pre">
            Uploaded Files ({uploadedFiles.length}/5)
          </p>

          {/* Scroll bar track - vertical on left */}
          <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center left-[108px] top-[379px] w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "265", "--transform-inner-height": "7" } as React.CSSProperties}>
            <div className="flex-none rotate-[270deg]">
              <div className="bg-[#c4c4c4] h-[7px] rounded-[100px] w-[265px]" />
            </div>
          </div>
          
          {/* Scroll bar thumb - dynamic position */}
          <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center left-[108px] w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))] transition-all duration-150" style={{ "--transform-inner-width": "119", "--transform-inner-height": "7", top: `${scrollThumbTop}px` } as React.CSSProperties}>
            <div className="flex-none rotate-[270deg]">
              <div className="bg-[#636363] h-[7px] rounded-[100px] w-[119px]" />
            </div>
          </div>

          {/* Scrollable container for file list */}
          <div 
            ref={scrollContainerRef}
            className="absolute left-[142px] top-[358.81px] right-[200px] h-[285px] overflow-y-auto" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={handleScroll}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="relative" style={{ minHeight: `${uploadedFiles.length * 94 + 123}px` }}>
              {uploadedFiles.map((uploadFile, index) => {
                const topOffset = index * 94;
                
                return (
                  <div key={uploadFile.id}>
                    {/* MaskGroup - File thumbnail */}
                    <div className="absolute contents" style={{ left: '0px', top: `${topOffset}px` }}>
                      <div 
                        className="absolute h-[123.416px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[21.479px_20.186px] mask-size-[138px_77.023px] w-[178.019px]" 
                        style={{ 
                          top: `${topOffset}px`,
                          maskImage: `url('${imgScreenshot20210621At4471}')`
                        }}
                      >
                        {uploadFile.preview ? (
                          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={uploadFile.preview} />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-[#c4c4c4]">
                            <span className="text-[48px]">{getFileIcon(uploadFile.file)}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Filename */}
                    <p 
                      className="absolute font-['Helvetica_Neue:Medium',sans-serif] leading-[28px] not-italic text-[#979797] text-[18px] text-nowrap whitespace-pre max-w-[330px] truncate"
                      style={{ left: '172.72px', top: `${topOffset + 47.7}px` }}
                    >
                      {uploadFile.file.name}
                    </p>

                    {/* Progress percentage */}
                    <p 
                      className="absolute font-['Helvetica_Neue:Medium',sans-serif] leading-[28px] not-italic text-[#636363] text-[18px] text-nowrap whitespace-pre"
                      style={{ left: '522.31px', top: `${topOffset + 47.7}px` }}
                    >
                      {uploadFile.progress}%
                    </p>

                    {/* Progress bar background */}
                    <div 
                      className="absolute bg-[rgba(196,196,196,0.2)] h-[6.947px] rounded-[100px] w-[398.585px]"
                      style={{ left: '172.72px', top: `${topOffset + 85.5}px` }}
                    />
                    
                    {/* Progress bar fill */}
                    <div 
                      className="absolute bg-[#c4c4c4] h-[6.947px] rounded-[100px] transition-all duration-200"
                      style={{ 
                        left: '172.72px', 
                        top: `${topOffset + 85.5}px`,
                        width: `${(398.585 * uploadFile.progress) / 100}px`
                      }}
                    />

                    {/* Delete button - gray circle with X */}
                    <div 
                      className="absolute size-[38.714px] cursor-pointer flex items-center justify-center"
                      style={{ left: '592.24px', top: `${topOffset + 53.73}px` }}
                      onClick={() => handleRemoveFile(uploadFile.id)}
                    >
                      <svg className="absolute inset-0 block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 39">
                        <circle cx="19.3571" cy="19.3571" fill="#C4C4C4" r="19.3571" />
                      </svg>
                      <X className="relative z-10 size-[18px]" style={{ color: '#d4d4d4', strokeWidth: 2.5 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upload button - left circle with plus icon */}
          <div 
            className="absolute left-[1089px] size-[76.178px] top-[474px] cursor-pointer" 
            onClick={() => uploadedFiles.length < 5 ? document.getElementById('file-input')?.click() : null}
            style={{ opacity: uploadedFiles.length >= 5 ? 0.5 : 1 }}
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
              <circle cx="38.0888" cy="38.0888" r="36.8052" stroke="#0000D5" strokeWidth="2.56708" />
            </svg>
          </div>
          
          {/* Plus icon - Group2 exact positioning */}
          <div className="absolute contents left-[1113px] top-[499px] pointer-events-none">
            <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*1)+(var(--transform-inner-height)*0)))] items-center justify-center left-[1126px] top-[499px] w-[calc(1px*((var(--transform-inner-height)*1)+(var(--transform-inner-width)*0)))]" style={{ "--transform-inner-width": "28", "--transform-inner-height": "0" } as React.CSSProperties}>
              <div className="flex-none rotate-[90deg]">
                <div className="h-0 relative w-[28px]">
                  <div className="absolute bottom-0 left-0 right-0 top-[-3px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 3">
                      <line stroke="#0000D5" strokeWidth="3" x2="28" y1="1.5" y2="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex h-0 items-center justify-center left-[1113px] top-[511px] w-[28px]">
              <div className="flex-none rotate-[180deg]">
                <div className="h-0 relative w-[28px]">
                  <div className="absolute bottom-0 left-0 right-0 top-[-3px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 3">
                      <line stroke="#0000D5" strokeWidth="3" x2="28" y1="1.5" y2="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upload text below left circle - centered */}
          <p className="absolute font-['Droid_Sans:Regular',sans-serif] leading-[20px] left-[1089px] not-italic text-[#0000d5] text-[14px] text-center top-[565px] w-[76.178px] pointer-events-none">Upload</p>

          {/* Done button - right filled circle with checkmark (when files are uploaded) */}
          <div 
            className="absolute left-[1196px] size-[76.178px] top-[474px] cursor-pointer flex items-center justify-center"
            onClick={() => {
              const files = uploadedFiles.map(uf => uf.file);
              if (onSubmitComplete) {
                onSubmitComplete(files);
              }
              if (onDone) {
                onDone(files);
              }
            }}
          >
            <svg className="absolute inset-0 block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
              <circle cx="38.0888" cy="38.0888" fill="#0000D5" r="36.8052" stroke="#0000D5" strokeWidth="2.56708" />
            </svg>
            {/* Checkmark - centered */}
            <div className="relative flex items-center justify-center pointer-events-none">
              <div className="flex-none h-[34.594px] rotate-[90.305deg] w-[25.945px]">
                <div className="relative size-full">
                  <div className="absolute inset-[-3.33%_-8.56%_-3.07%_-3.7%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 37">
                      <path d={svgPaths.p1e11f600} stroke="#D4D4D4" strokeWidth="3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Done text below right circle - centered */}
          <p className="absolute font-['Droid_Sans:Regular',sans-serif] leading-[20px] left-[1196px] not-italic text-[#0000d5] text-[14px] text-center top-[565px] w-[76.178px] pointer-events-none">Done</p>

        </>
      )}

      {/* Hidden file input */}
      <input
        id="file-input"
        type="file"
        multiple
        accept="image/*,video/*,application/pdf,audio/mpeg,audio/mp3"
        onChange={handleFileInput}
        className="hidden"
      />
    </>
  );
}
