interface PillButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'outlined' | 'filled';
}

export function PillButton({ children, onClick, disabled, variant = 'outlined' }: PillButtonProps) {
  const baseClasses = "px-8 py-3 border-2 border-[#0000d5] rounded-[100px] font-['Droid_Sans',sans-serif] text-[14px] leading-[20px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = variant === 'filled' 
    ? "bg-[#0000d5] text-white hover:bg-[#0000b5]"
    : "bg-transparent text-[#0000d5] hover:bg-[#0000d5]/5";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses}`}
    >
      {children}
    </button>
  );
}
