/**
 * Google Drive Integration Utility
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Copy the code below into the script editor:
 * 
 * ```
 * See GOOGLE_DRIVE_SETUP.md for the complete Google Apps Script code.
 * The script will save submissions with user name, team names, brief info, and URLs.
 * ```
 * 
 * 4. Click "Deploy" > "New deployment"
 * 5. Select type: "Web app"
 * 6. Execute as: "Me"
 * 7. Who has access: "Anyone"
 * 8. Click "Deploy"
 * 9. Copy the Web App URL
 * 10. Paste it in the GOOGLE_SCRIPT_URL constant below
 */

// ⚠️ IMPORTANT: Replace this with your actual Google Apps Script Web App URL
// See GOOGLE_DRIVE_SETUP.md for complete setup instructions
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzicbXzXNWDxD_OBRXE4IQKm5c4mRxJJ2TIYkYgazF-rPzmBgWH2N2UVIx-J4P2dyxD/exec';

export interface FileData {
  name: string;
  mimeType: string;
  data: string; // base64 encoded file data
}

export interface SubmissionData {
  userName: string;
  briefId: string;
  briefTitle: string;
  submissionTime: number; // in seconds
  submissionUrl: string;
  teamNames?: string; // Optional team member names
  timestamp: string;
  files?: FileData[]; // Optional uploaded files
}

/**
 * Converts a File object to base64 encoded string
 */
async function fileToBase64(file: File): Promise<FileData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/png;base64,")
      const base64Data = result.includes(',') ? result.split(',')[1] : result;
      resolve({
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        data: base64Data,
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Converts an array of File objects to FileData array
 */
async function filesToBase64(files: File[]): Promise<FileData[]> {
  return Promise.all(files.map(fileToBase64));
}

export async function submitToGoogleDrive(data: SubmissionData): Promise<void> {
  if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
    // Silently log to console without showing error to user
    console.log('Google Script URL not configured. Submission data:', data);
    return;
  }

  // Debug logging
  console.log('Submitting to Google Drive:', {
    userName: data.userName,
    briefTitle: data.briefTitle,
    hasFiles: data.files ? data.files.length : 0,
    url: GOOGLE_SCRIPT_URL
  });

  try {
    // Convert files to base64 if provided
    let submissionData = { ...data };
    if (data.files && data.files.length > 0) {
      // Check if files are File objects (from the app) or already FileData objects
      const firstFile = data.files[0] as unknown;
      if (firstFile instanceof File) {
        console.log('Converting files to base64...');
        // Convert File objects to FileData
        submissionData.files = await filesToBase64(data.files as unknown as File[]);
        console.log('Files converted:', submissionData.files.length);
      }
      // If already FileData objects, use them as-is (no conversion needed)
    }

    console.log('Sending submission data:', {
      userName: submissionData.userName,
      briefTitle: submissionData.briefTitle,
      fileCount: submissionData.files ? submissionData.files.length : 0
    });

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    // Note: With no-cors mode, we can't read the response
    // But the submission will still be recorded in Google Drive
    console.log('Submission sent to Google Drive (no-cors mode, cannot verify response)');
  } catch (error) {
    console.error('Error submitting to Google Drive:', error);
    // Don't throw - we don't want to break the app if Google Drive fails
  }
}

export function formatSubmissionTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}
