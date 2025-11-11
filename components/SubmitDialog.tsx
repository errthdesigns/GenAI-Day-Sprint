import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { PillButton } from './PillButton';

interface SubmitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (url: string) => void;
}

export function SubmitDialog({ open, onOpenChange, onSubmit }: SubmitDialogProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    if (url.trim()) {
      onSubmit(url);
      setUrl('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-neutral-300 border-2 border-[#0000d5]">
        <DialogHeader>
          <DialogTitle className="font-['Droid_Sans',sans-serif] text-[24px] text-[#0000d5]">
            Submit Your Work
          </DialogTitle>
          <DialogDescription className="font-['Droid_Sans',sans-serif] text-[#0000d5]/70">
            Paste the URL to your design or uploaded file
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="url" className="font-['Droid_Sans',sans-serif] text-[#0000d5]">
              Design URL
            </Label>
            <Input
              id="url"
              type="url"
              placeholder="https://figma.com/your-design..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="font-['Droid_Sans',sans-serif] border-2 border-[#0000d5] bg-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <PillButton onClick={handleSubmit}>
            Submit
          </PillButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
