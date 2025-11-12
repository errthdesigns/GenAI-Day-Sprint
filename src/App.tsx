import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PillButton } from './components/PillButton';
import { BriefView } from './components/BriefView';
import { TimerView } from './components/TimerView';
import { SubmitView } from './components/SubmitView';
import { EnterNamesView } from './components/EnterNamesView';
import { ConfettiScreen } from './components/ConfettiScreen';
import { TimeoutScreen } from './components/TimeoutScreen';
import { SubmitDialog } from './components/SubmitDialog';
import { HelpDialog } from './components/HelpDialog';
import { RepellingHelpButton } from './components/RepellingHelpButton';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';
import { initialBrief, getRandomFeedbackBrief } from './data/briefs';
import { AppState, Brief, ReactionType } from './types';
import { submitToGoogleDrive, formatSubmissionTime } from './utils/googleDrive';

type ViewState = 'brief' | 'timer' | 'submit' | 'enter-names' | 'confetti' | 'timeout';

function App() {
  const [viewState, setViewState] = useState<ViewState>('brief');
  const [appState, setAppState] = useState<AppState>('pre-start');
  const [currentBrief, setCurrentBrief] = useState<Brief>(initialBrief);
  const [submissionTime, setSubmissionTime] = useState(0);
  const [currentTimeElapsed, setCurrentTimeElapsed] = useState(0);
  const [sessionCode] = useState(() => 
    'Droga5 AI Day'
  );
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [isReadyToStart, setIsReadyToStart] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [submittedUrl, setSubmittedUrl] = useState('');
  const [teamNames, setTeamNames] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleStartClick = () => {
    if (appState === 'pre-start' && isReadyToStart) {
      setViewState('timer');
      setAppState('active');
    }
  };

  const handleBriefClick = () => {
    if (appState === 'active') {
      setViewState('brief');
    }
  };

  const handleTimerClick = () => {
    if (appState === 'active') {
      setViewState('timer');
    }
  };

  const handleSubmitClick = () => {
    if (appState === 'active') {
      setViewState('submit');
    }
  };

  const handleSubmit = useCallback((url: string) => {
    setSubmissionTime(currentTimeElapsed);
    setSubmittedUrl(url);
    setAppState('submitting');
    
    // Send to Google Drive with files
    submitToGoogleDrive({
      userName,
      briefId: currentBrief.id,
      briefTitle: currentBrief.title || `Brief ${currentBrief.id}`,
      submissionTime: currentTimeElapsed,
      submissionUrl: url,
      teamNames: teamNames,
      timestamp: new Date().toISOString(),
      files: (uploadedFiles && uploadedFiles.length > 0) ? uploadedFiles as any : undefined,
    }).catch(error => {
      console.error('Failed to submit to Google Drive:', error);
    });
    
    // Clear uploaded files after submission
    setUploadedFiles([]);
    
    // Show confetti immediately
    setViewState('confetti');
  }, [currentTimeElapsed, userName, currentBrief, teamNames, uploadedFiles]);

  const handleTimeout = useCallback(() => {
    setSubmissionTime(600);
    setAppState('timeout');
    setViewState('timeout');
  }, []);

  const handleStartAgain = useCallback(() => {
    // Reset to the same brief (don't load a new one)
    setViewState('brief');
    setAppState('pre-start');
    setIsReadyToStart(false);
    setCurrentTimeElapsed(0);
  }, []);

  const handleReactionComplete = useCallback((reaction: ReactionType) => {
    const minutes = Math.floor(submissionTime / 60);
    const seconds = submissionTime % 60;
    const timeString = `${minutes}:${String(seconds).padStart(2, '0')}`;
    
    // Show result toast
    if (reaction === 'grin') {
      toast.success(`Good job! Completed in ${timeString}`, {
        description: 'Loading next brief...'
      });
    } else if (reaction === 'surprised') {
      toast.success(`Incredible speed! Completed in ${timeString}`, {
        description: 'Buckle up, here comes a harder one!'
      });
    } else {
      toast('Keep practicing!', {
        description: `Completed in ${timeString}. Try the next one!`
      });
    }

    setAppState('result');
    setCurrentTimeElapsed(0);
    // Clear uploaded files for next submission
    setUploadedFiles([]);
    
    // Load the next feedback brief and show it
    setCurrentBrief(getRandomFeedbackBrief(currentBrief.id));
    setViewState('brief');
    setAppState('pre-start');
  }, [submissionTime, currentBrief.id]);

  const handleTimeUpdate = useCallback((timeRemaining: number, timeElapsed: number) => {
    setCurrentTimeElapsed(timeElapsed);
  }, []);

  const handleDone = useCallback((files: File[] = []) => {
    // Store uploaded files (ensure it's always an array)
    console.log('handleDone called with files:', files.length);
    setUploadedFiles(files || []);
    // Go to enter names view
    setViewState('enter-names');
  }, []);

  const handleNamesEntered = useCallback((submittedUserName: string, submittedTeamNames: string) => {
    // Store the username if this is first submission
    const finalUserName = userName || submittedUserName;
    if (!userName) {
      setUserName(submittedUserName);
    }
    setTeamNames(submittedTeamNames);
    
    // Submit directly without URL, using the submitted userName
    setSubmissionTime(currentTimeElapsed);
    setSubmittedUrl('');
    setAppState('submitting');
    
    // Send to Google Drive with files, using the correct userName
    console.log('About to submit. Uploaded files:', uploadedFiles);
    console.log('File count:', uploadedFiles ? uploadedFiles.length : 0);
    
    submitToGoogleDrive({
      userName: finalUserName,
      briefId: currentBrief.id,
      briefTitle: currentBrief.title || `Brief ${currentBrief.id}`,
      submissionTime: currentTimeElapsed,
      submissionUrl: '',
      teamNames: submittedTeamNames,
      timestamp: new Date().toISOString(),
      files: (uploadedFiles && uploadedFiles.length > 0) ? uploadedFiles as any : undefined,
    }).catch(error => {
      console.error('Failed to submit to Google Drive:', error);
    });
    
    // Clear uploaded files after submission
    setUploadedFiles([]);
    
    // Show confetti immediately
    setViewState('confetti');
  }, [userName, currentTimeElapsed, currentBrief, uploadedFiles]);

  const handleConfettiComplete = useCallback(() => {
    // After confetti, go straight to feedback brief - NO REACTION SCREEN
    const minutes = Math.floor(submissionTime / 60);
    const seconds = submissionTime % 60;
    const timeString = `${minutes}:${String(seconds).padStart(2, '0')}`;
    
    // Show result toast
    toast.success(`Good job! Completed in ${timeString}`, {
      description: 'Loading next brief...'
    });

    setAppState('result');
    setCurrentTimeElapsed(0);
    // Clear uploaded files for next submission
    setUploadedFiles([]);
    
    // Load the next feedback brief and show it immediately
    setCurrentBrief(getRandomFeedbackBrief(currentBrief.id));
    setViewState('brief');
    setAppState('pre-start');
  }, [submissionTime, currentBrief.id]);

  return (
    <div className="bg-neutral-300 relative h-screen w-screen overflow-hidden">


      {/* Main content area */}
      {/* Timer View - Always rendered when active to keep timer running */}
      {appState === 'active' && (
        <div className={viewState === 'timer' ? 'block' : 'hidden'}>
          <TimerView 
            isActive={true} 
            onTimeout={handleTimeout}
            onTimeUpdate={handleTimeUpdate}
          />
        </div>
      )}

      {/* Brief View - Pre-start or when toggled during active state */}
      <AnimatePresence mode="wait">
        {(viewState === 'brief' || appState === 'pre-start') && (
          <motion.div
            key="brief"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BriefView 
              brief={currentBrief} 
              onReadyToStart={setIsReadyToStart}
              showHeader={appState === 'active'}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit View - When user clicks submit during active state */}
      {viewState === 'submit' && appState === 'active' && (
        <SubmitView 
          onNavigateToTimer={handleTimerClick} 
          onDone={handleDone}
          onSubmitComplete={handleDone}
        />
      )}

      {/* Enter Names View - After file upload */}
      {viewState === 'enter-names' && (
        <EnterNamesView 
          onDone={handleNamesEntered}
          isFirstSubmission={!userName}
          currentUserName={userName}
        />
      )}

      {/* Confetti Screen - When user clicks done */}
      {viewState === 'confetti' && (
        <ConfettiScreen onComplete={handleConfettiComplete} />
      )}

      {/* Timeout Screen - When timer hits 0:00 */}
      {viewState === 'timeout' && (
        <TimeoutScreen onStartAgain={handleStartAgain} />
      )}

      {/* User name display - top right */}
      {userName && viewState !== 'confetti' && viewState !== 'timeout' && viewState !== 'enter-names' && (
        <div className="absolute right-[7.5%] top-[10.06%]">
          <div className="px-6 py-3 rounded-full border-2 border-[#0000d5]">
            <p className="font-['Droid_Sans',sans-serif] text-[#0000d5] text-[14px]">
              {userName}
            </p>
          </div>
        </div>
      )}

      {/* Bottom buttons - hide during confetti, timeout, and enter-names */}
      {viewState !== 'confetti' && viewState !== 'timeout' && viewState !== 'enter-names' && (
        <>
          {appState === 'pre-start' ? (
            // Pre-start state: show only "Brief" and "Start" buttons
            <>
              {/* Brief button in top left */}
              <div className="absolute left-[7.5%] top-[10.06%]">
                <PillButton onClick={() => setViewState('brief')}>
                  Brief
                </PillButton>
              </div>
              
              {/* Start button centered at bottom */}
              <div className="absolute bottom-[10.06%] left-1/2 -translate-x-1/2">
                <PillButton 
                  onClick={handleStartClick}
                  disabled={!isReadyToStart}
                  variant={isReadyToStart ? 'filled' : 'outlined'}
                >
                  Start
                </PillButton>
              </div>
            </>
          ) : (
        // Active state: show Brief/Timer, Submit, Help buttons positioned as in Figma
        <>
          {/* Brief/Timer toggle button - bottom left */}
          <div className="absolute inset-[85.06%_83.96%_10.06%_7.5%]">
            {viewState === 'timer' ? (
              <PillButton onClick={handleBriefClick}>
                Brief
              </PillButton>
            ) : viewState === 'submit' ? (
              <PillButton onClick={handleBriefClick}>
                Brief
              </PillButton>
            ) : (
              <PillButton onClick={handleTimerClick}>
                Timer
              </PillButton>
            )}
          </div>
          
          {/* Submit/Timer button - bottom center */}
          <div className="absolute bottom-[10.06%] left-[calc(50%+0.5px)] top-[85.06%] translate-x-[-50%] w-[123px]">
            {viewState === 'submit' ? (
              <PillButton onClick={handleTimerClick}>
                Timer
              </PillButton>
            ) : (
              <PillButton 
                onClick={handleSubmitClick}
                disabled={appState !== 'active'}
              >
                Submit
              </PillButton>
            )}
          </div>
          
          {/* Help button - bottom right (with trolling repel effect) */}
          <RepellingHelpButton 
            onClick={() => setShowHelpDialog(true)} 
            resetTrigger={viewState}
          />
        </>
          )}
        </>
      )}

      {/* Dialogs */}
      <HelpDialog 
        open={showHelpDialog}
        onOpenChange={setShowHelpDialog}
      />


      <Toaster />
    </div>
  );
}

export default App;
