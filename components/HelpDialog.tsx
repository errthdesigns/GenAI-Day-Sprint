import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-neutral-300 border-2 border-[#0000d5]">
        <DialogHeader>
          <DialogTitle className="font-['Droid_Sans',sans-serif] text-[24px] text-[#0000d5]">
            How Ad Sprint Works
          </DialogTitle>
          <DialogDescription className="font-['Droid_Sans',sans-serif] text-[16px] text-[#0000d5]/90">
            Learn how to participate in Ad Sprint challenges
          </DialogDescription>
        </DialogHeader>
        <div className="font-['Droid_Sans',sans-serif] text-[16px] text-[#0000d5]/90 leading-relaxed space-y-4">
          <p>
            <strong>The Challenge:</strong> {`You'll receive a client brief and have 10 minutes to create and submit your design.`}
          </p>
          <div>
            <p><strong>Difficulty Levels:</strong></p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>{`🟢 Easy: >10 minutes or timeout`}</li>
              <li>{`🟡 Medium: 5-10 minutes`}</li>
              <li>{`🔴 Hard: <5 minutes`}</li>
            </ul>
          </div>
          <p>
            <strong>The faster you submit, the harder the next brief!</strong> Speed and quality both matter.
          </p>
          <p>
            {`Click "Brief" to view your current challenge, then start the timer to begin. Submit your work before time runs out!`}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
