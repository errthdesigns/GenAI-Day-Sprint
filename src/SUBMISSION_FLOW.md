# Ad Sprint Submission Flow

This document explains the complete submission flow in Ad Sprint, including the new team names feature.

## Complete User Journey

### 1. **Reading the Brief (First Time)**
- User sees the brief (multi-page for initial brief)
- Navigates through pages using arrow buttons
- "Start" button becomes available after reading all pages

### 2. **Working on the Brief**
- User clicks "Start" to begin 10-minute timer
- Timer counts down from 10:00
- User can toggle between "Brief" and "Timer" views
- User creates their design in external tool (Figma, etc.)

### 3. **Submission Process**

#### Step 1: Click Submit
- User clicks "Submit" button (bottom center)
- Switches to Submit View

#### Step 2: Upload Files (Optional)
- User can drag & drop up to 5 files
- Or click the upload button to select files
- Files show with progress bars
- User can remove files by clicking the X button

#### Step 3: Click Done (After Uploads)
- User clicks the "Done" button (filled circle with checkmark)
- App transitions to **Enter Names View**

#### Step 4: Enter Your Name and Team Names (First Submission Only)
- **First Submission**: Two input fields appear
  - "Your Name" - Enter your individual name
  - "Team Names" - Enter team member names (e.g., "Erin, Vi, Sam")
  - Both fields must be filled
  - Your name is saved and displayed in top-right for all future submissions
- **Subsequent Submissions**: Only one field appears
  - "Team Names" - Enter the team members for this brief
  - Your name from first submission is automatically used
- Done button (checkmark) activates when required fields are filled
- User clicks Done or presses Cmd+Enter

#### Step 5: Enter URL
- **Submit Dialog** appears
- User pastes the URL to their design
- User clicks "Submit" or presses Enter

#### Step 6: Sent to Client (Confetti)
- **Confetti animation** plays
- Submission is sent to Google Drive in the background

#### Step 7: Client Reaction
- Animated client character appears
- Looks around, checks watch
- Shows reaction based on completion time:
  - **Surprised**: < 3 minutes (fastest)
  - **Grin**: 3-7 minutes (good job)
  - **Frown**: > 7 minutes (slow)

#### Step 8: Next Brief
- Toast notification shows completion time
- Next brief loads automatically
- User starts again from step 1 (but won't need to re-enter their name)

### 4. **Timeout Scenario**

If the timer reaches 0:00:
1. Screen shakes and goes blue
2. All UI elements disperse
3. "OUT OF TIME!" appears
4. "Start Again" button appears
5. Clicking it resets to the same brief

## Data Saved to Google Drive

Each submission creates a text file in the user's folder containing:

```
Brief: [Brief Title]
Brief ID: [Brief ID]
Submitted By: [User Name]
Team Names: [Team Names or "Not provided"]
Submission Time: [MM:SS]
Submission URL: [URL]
Submitted At: [Date and Time]
```

Additionally, any files uploaded by the user are saved directly to their folder in Google Drive.

## File Organization

```
📁 GenAI Sprint Submissions/
├── 📁 John Smith/
│   ├── 📄 Lidl Christmas Brief - 2025-11-11T14-30-45.txt
│   ├── 🖼️ design.png
│   ├── 📄 presentation.pdf
│   └── 📄 Tech Startup Brief - 2025-11-11T14-45-22.txt
└── 📁 Jane Doe/
    ├── 📄 Lidl Christmas Brief - 2025-11-11T14-35-10.txt
    └── 🖼️ campaign.jpg
```

## Navigation During Active Session

**Bottom Left Button:**
- Shows "Timer" when viewing Brief or Submit
- Shows "Brief" when viewing Timer

**Bottom Center Button:**
- Shows "Submit" normally
- Shows "Timer" when in Submit view

**Bottom Right Button:**
- Always shows "Help"
- Has fun "repelling" effect that moves away from cursor

## Visual States

### Submit View Buttons
- **Upload Button**: Circle with upload arrow (outlined)
- **Done Button**: Circle with checkmark (filled when files uploaded, or can skip)

### Enter Names View Buttons
- **Done Button**: 
  - Gray/outlined when no text entered
  - Blue/filled when text is entered
  - Checkmark icon color changes accordingly

### Submit Dialog
- Modal with URL input field
- Blue pill-shaped Submit button
- Can press Enter to submit quickly

## Keyboard Shortcuts

- **Arrow keys**: Navigate brief pages
- **Enter**: Submit URL in dialog
- **Cmd+Enter**: Submit team names
- **X key**: (Debug) Trigger timeout immediately

## Tips for Users

1. **First Submission**: You'll need to enter your name once - it will be saved for all future briefs
2. **Work Fast**: The client reaction depends on your speed
3. **Read Carefully**: Make sure to review all brief pages
4. **Name Format**: Enter team names however you like (e.g., "Erin, Vi" or "Erin and Vi")
5. **Team Changes**: You can enter different team members for each brief
6. **URL Required**: You must provide a URL to complete submission
7. **Files Optional**: File upload is optional - URL is what matters
8. **Keep URL Handy**: Have your Figma/drive link ready before hitting submit

## Implementation Notes

The submission flow is intentionally sequential:
1. Files first (optional, establishes workspace)
2. Identity and team (first-time user setup, then team acknowledgment)
3. URL (actual deliverable)
4. Celebration (confetti)
5. Feedback (client reaction)

This creates a natural progression from work → identity/team → delivery → celebration → feedback.

### First vs. Subsequent Submissions

**First Submission:**
- User enters both their name and team names
- Their name is stored and shown in the top-right corner
- Creates their personal folder in Google Drive

**Subsequent Submissions:**
- User only enters team names (can be different each time)
- Their saved name is automatically used
- Submissions go to their existing Google Drive folder
