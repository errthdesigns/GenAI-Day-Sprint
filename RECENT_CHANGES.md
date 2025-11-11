# Recent Changes: Removed Initial Username Dialog

## Summary

Removed the startup username dialog popup. Users now enter their name along with team names during their first submission.

## What Changed

### Removed
- **UserNameDialog component** - No longer needed
- **Startup name collection** - App no longer asks for name at launch

### Modified
- **EnterNamesView component**
  - Now handles two scenarios:
    - **First submission**: Shows "Your Name" + "Team Names" fields
    - **Subsequent submissions**: Shows only "Team Names" field
  - Both fields must be filled on first submission
  - Only team names required on subsequent submissions

- **App.tsx**
  - Removed UserNameDialog import and rendering
  - Updated handleNamesEntered to accept both userName and teamNames
  - Passes isFirstSubmission flag to EnterNamesView
  - Stores userName on first submission for future use

## User Experience

### Before
1. App loads → Username dialog appears
2. User enters name → Clicks Start
3. Name shown in top-right corner
4. [Rest of flow continues...]

### After
1. App loads → Goes directly to brief
2. User reads brief → Starts timer → Works on design
3. User clicks Submit → Uploads files (optional)
4. User clicks Done → **Enter Names View appears**
   - **First time**: Enter both "Your Name" and "Team Names"
   - **Later submissions**: Enter only "Team Names"
5. Name saved and shown in top-right corner (after first submission)
6. [Rest of flow continues...]

## Benefits

1. **Less friction at startup** - Users can immediately read the brief
2. **Context-aware name collection** - Users understand why they're entering their name (for submission tracking)
3. **Better first impression** - No dialog blocking the main interface
4. **Same team flexibility** - Different team members can be entered for each brief
5. **One-time setup** - Name only asked once, then reused automatically

## Technical Details

### Component Props

**EnterNamesView** now accepts:
```typescript
interface EnterNamesViewProps {
  onDone: (userName: string, teamNames: string) => void;
  isFirstSubmission: boolean;    // true if no userName stored yet
  currentUserName: string;        // existing userName if available
}
```

### Data Flow

```
First Submission:
User enters "John" + "Erin, Vi" → 
Saves userName="John", teamNames="Erin, Vi" →
Shows "John" in top-right corner

Second Submission:
User enters "Sam, Alex" →
Uses saved userName="John", new teamNames="Sam, Alex" →
"John" still shown in top-right
```

### Google Drive Submissions

Each submission file still contains:
- Submitted By: [User's saved name]
- Team Names: [Team names entered for this specific brief]

This allows tracking:
- Who owns the submission (consistent user name)
- Who collaborated on each specific brief (can vary)

## Files Modified

- `/App.tsx` - Removed dialog logic, updated name handling
- `/components/EnterNamesView.tsx` - Added dual-mode functionality
- `/SUBMISSION_FLOW.md` - Updated documentation

## Files Deleted

- `/components/UserNameDialog.tsx` - No longer needed
