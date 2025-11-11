# Google Drive Integration Setup Guide

This guide will help you set up Google Drive integration for Ad Sprint, so that all 37 users' submissions are automatically saved to individual folders in your Google Drive.

## Overview

When users submit their work, the app will:
1. Create a main folder called "GenAI Sprint Submissions" in your Google Drive
2. Create a subfolder for each user (named after them)
3. Save their submission details as a text file including:
   - Brief title and ID
   - Submitted by (user name)
   - Team member names (if provided)
   - Submission time
   - Submission URL
   - Timestamp
4. Upload any files they attached to their user folder

## Step-by-Step Setup

### Step 1: Create a Google Apps Script

1. Go to [https://script.google.com](https://script.google.com)
2. Click **"New project"**
3. Delete any default code in the editor
4. Copy and paste the following code:

```javascript
// Simple test function - returns success message when accessed via browser
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: "Google Apps Script is running correctly. Use POST to submit data."
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    // Log that we received a request
    Logger.log('doPost called');
    
    // Handle case when called directly (for testing) vs web app POST
    if (!e || !e.postData || !e.postData.contents) {
      Logger.log('ERROR: No postData.contents');
      Logger.log('e is: ' + (e ? 'defined' : 'undefined'));
      Logger.log('e.postData is: ' + (e && e.postData ? 'defined' : 'undefined'));
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'No data received. Make sure you are calling this as a POST request from your web app.'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    Logger.log('postData exists, parsing...');
    
    const data = JSON.parse(e.postData.contents);
    Logger.log('Data parsed. userName: ' + (data.userName || 'MISSING'));
    
    const { userName, briefId, briefTitle, submissionTime, submissionUrl, teamNames, timestamp, files } = data;
    
    if (!userName) {
      Logger.log('ERROR: userName is missing or empty');
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'userName is required'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Access folder structure: GenAI Day > GenAI Sprint Submissions
    // First try to access GenAI Sprint Submissions directly by ID
    const mainFolderId = '1aByN4rHpzslKIGr3Nsr4w2KHUT7vCH7m';
    Logger.log('Attempting to access folder ID: ' + mainFolderId);
    
    let mainFolder;
    try {
      // Try direct access
      mainFolder = DriveApp.getFolderById(mainFolderId);
      Logger.log('SUCCESS: Folder found by ID - Name: ' + mainFolder.getName());
      Logger.log('Folder URL: ' + mainFolder.getUrl());
    } catch (folderError) {
      Logger.log('ERROR accessing by ID: ' + folderError.toString());
      Logger.log('Trying alternative: access parent folder first...');
      
      // Alternative: Access parent "GenAI Day" folder, then find subfolder
      try {
        const parentFolderId = '1CXfauYs1VZKn7orWIIT_Tn-eDzYINoiz';
        Logger.log('Accessing parent folder: ' + parentFolderId);
        const parentFolder = DriveApp.getFolderById(parentFolderId);
        Logger.log('Parent folder found: ' + parentFolder.getName());
        
        // Find GenAI Sprint Submissions inside parent
        const folders = parentFolder.getFoldersByName('GenAI Sprint Submissions');
        if (folders.hasNext()) {
          mainFolder = folders.next();
          Logger.log('Found subfolder by name: ' + mainFolder.getName());
        } else {
          Logger.log('Subfolder not found, creating it...');
          mainFolder = parentFolder.createFolder('GenAI Sprint Submissions');
          Logger.log('Created subfolder: ' + mainFolder.getName());
        }
      } catch (parentError) {
        Logger.log('Parent folder method failed: ' + parentError.toString());
        Logger.log('Last resort: searching root Drive...');
        
        // Last resort: search root Drive
        try {
          const rootFolders = DriveApp.getFoldersByName('GenAI Sprint Submissions');
          if (rootFolders.hasNext()) {
            mainFolder = rootFolders.next();
            Logger.log('Found in root: ' + mainFolder.getName());
          } else {
            Logger.log('Creating in root Drive...');
            mainFolder = DriveApp.createFolder('GenAI Sprint Submissions');
            Logger.log('Created in root: ' + mainFolder.getName());
          }
        } catch (rootError) {
          Logger.log('ALL METHODS FAILED: ' + rootError.toString());
          return ContentService.createTextOutput(JSON.stringify({
            success: false,
            error: 'Could not access or create folder. Check permissions and folder IDs.'
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }
    
    // Get or create user's folder
    Logger.log('Creating/finding user folder for: ' + userName);
    const userFolders = mainFolder.getFoldersByName(userName);
    const userFolder = userFolders.hasNext() ? userFolders.next() : mainFolder.createFolder(userName);
    Logger.log('User folder: ' + userFolder.getName());
    
    // Format submission time
    const minutes = Math.floor(submissionTime / 60);
    const seconds = submissionTime % 60;
    const secondsStr = seconds < 10 ? '0' + seconds : String(seconds);
    const formattedTime = minutes + ':' + secondsStr;
    
    // Create a text file with submission details
    const timestampStr = new Date(timestamp).toISOString().replace(/:/g, '-').substring(0, 19);
    const fileName = briefTitle + ' - ' + timestampStr + '.txt';
    const fileContent = 
      'Brief: ' + briefTitle + '\n' +
      'Brief ID: ' + briefId + '\n' +
      'Submitted By: ' + userName + '\n' +
      'Team Names: ' + (teamNames || 'Not provided') + '\n' +
      'Submission Time: ' + formattedTime + '\n' +
      'Submission URL: ' + (submissionUrl || 'Not provided') + '\n' +
      'Submitted At: ' + new Date(timestamp).toLocaleString() + '\n';
    
    Logger.log('Creating file: ' + fileName);
    userFolder.createFile(fileName, fileContent);
    Logger.log('File created successfully');
    
    // Upload files if provided
    Logger.log('Checking for files. files variable: ' + (files ? 'exists' : 'undefined'));
    Logger.log('files type: ' + typeof files);
    Logger.log('files is array: ' + Array.isArray(files));
    Logger.log('files length: ' + (files ? files.length : 'N/A'));
    
    if (files && Array.isArray(files) && files.length > 0) {
      Logger.log('Processing ' + files.length + ' files');
      files.forEach(function(fileData, index) {
        try {
          Logger.log('Processing file ' + (index + 1));
          Logger.log('File data keys: ' + Object.keys(fileData || {}).join(', '));
          Logger.log('File name: ' + (fileData.name || 'unnamed'));
          Logger.log('File mimeType: ' + (fileData.mimeType || 'missing'));
          Logger.log('File data length: ' + (fileData.data ? fileData.data.length : 'missing'));
          
          // Decode base64 file data
          const fileBlob = Utilities.newBlob(
            Utilities.base64Decode(fileData.data),
            fileData.mimeType || 'application/octet-stream',
            fileData.name || 'file_' + (index + 1)
          );
          
          // Upload file to user's folder
          const uploadedFile = userFolder.createFile(fileBlob);
          Logger.log('File ' + (index + 1) + ' uploaded successfully: ' + uploadedFile.getName());
        } catch (fileError) {
          Logger.log('ERROR uploading file ' + index + ': ' + fileError.toString());
          Logger.log('Error stack: ' + (fileError.stack || 'no stack'));
        }
      });
    } else {
      Logger.log('No files to process. files is: ' + (files ? 'empty array or invalid' : 'undefined/null'));
    }
    
    Logger.log('SUCCESS: Submission completed');
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Submission saved successfully"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('ERROR in doPost: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. Click the **disk icon** or press `Ctrl+S` (Windows) / `Cmd+S` (Mac) to save
6. Give your project a name like "Ad Sprint Submissions"

### Step 2: Deploy as Web App

1. Click **"Deploy"** in the top right
2. Select **"New deployment"**
3. Click the gear icon ⚙️ next to "Select type" and choose **"Web app"**
4. Configure the deployment:
   - **Description:** "Ad Sprint Submission Handler"
   - **Execute as:** "Me" (your account)
   - **Who has access:** "Anyone"
5. Click **"Deploy"**
6. You may need to authorize the script:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to [project name] (unsafe)"
   - Click "Allow"
7. **IMPORTANT:** Copy the **Web App URL** that appears (it will look like: `https://script.google.com/macros/s/ABC123.../exec`)

### Step 3: Configure Ad Sprint

1. Open the file `/utils/googleDrive.ts` in your Ad Sprint project
2. Find this line:
   ```typescript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_SCRIPT_URL_HERE'` with your actual Web App URL (keep the quotes):
   ```typescript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ABC123.../exec';
   ```
4. Save the file

### Step 4: Test the Integration

1. Run your Ad Sprint app
2. Enter a test name when prompted
3. Complete a brief and submit a URL
4. Check your Google Drive:
   - You should see a folder called "GenAI Sprint Submissions"
   - Inside, there should be a folder with the test user's name
   - Inside that, there should be a `.txt` file with the submission details
   - Any uploaded files should also appear in the user's folder

## Folder Structure

Your Google Drive will be organized like this:

```
📁 GenAI Sprint Submissions/
├── 📁 John Smith/
│   ├── 📄 Lidl Christmas Brief - 2025-11-11T14-30-45.txt
│   ├── 🖼️ design.png
│   ├── 📄 presentation.pdf
│   └── 📄 Tech Startup Brief - 2025-11-11T14-45-22.txt
├── 📁 Jane Doe/
│   ├── 📄 Lidl Christmas Brief - 2025-11-11T14-35-10.txt
│   └── 🖼️ campaign.jpg
└── 📁 Mike Johnson/
    ├── 📄 Lidl Christmas Brief - 2025-11-11T14-40-33.txt
    └── 🎬 video.mp4
```

## Viewing Submissions

To view all submissions:
1. Go to [Google Drive](https://drive.google.com)
2. Find the "Ad Sprint Submissions" folder
3. Each user has their own subfolder
4. Open any `.txt` file to see submission details

## Troubleshooting

### Issue: Submissions aren't appearing in Google Drive

**Solutions:**
1. Check that you've updated the `GOOGLE_SCRIPT_URL` in `/utils/googleDrive.ts`
2. Make sure you deployed the script as "Anyone" can access
3. Check the browser console (F12) for error messages
4. Verify that the script is authorized (you may need to re-authorize)

### Issue: "Authorization required" error

**Solution:**
1. Go back to your Google Apps Script
2. Click "Deploy" → "Manage deployments"
3. Click "Authorize access"
4. Complete the authorization process

### Issue: Want to change the folder structure

You can modify the Google Apps Script to:
- Change the main folder name (line 7: `const mainFolderName`)
- Add more data to the submission files
- Create subfolders by date or brief type
- Generate CSV files instead of text files

## Privacy & Security Notes

- The script runs under **your** Google account
- All submissions are saved to **your** Google Drive
- Users don't need Google accounts - they only need to enter their name
- The script has access only to your Drive (not users' data)
- You can revoke access anytime at [myaccount.google.com/permissions](https://myaccount.google.com/permissions)

## Advanced: Export to Spreadsheet

If you prefer all submissions in a Google Spreadsheet instead of text files, replace the Google Apps Script with this version:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { userName, briefId, briefTitle, submissionTime, submissionUrl, teamNames, timestamp } = data;
    
    // Get or create the spreadsheet
    const spreadsheetName = "Ad Sprint Submissions";
    const files = DriveApp.getFilesByName(spreadsheetName);
    let spreadsheet;
    
    if (files.hasNext()) {
      spreadsheet = SpreadsheetApp.open(files.next());
    } else {
      spreadsheet = SpreadsheetApp.create(spreadsheetName);
      // Add headers
      const sheet = spreadsheet.getActiveSheet();
      sheet.appendRow(['Timestamp', 'User Name', 'Team Names', 'Brief Title', 'Brief ID', 'Submission Time', 'Submission URL']);
    }
    
    // Format submission time
    const minutes = Math.floor(submissionTime / 60);
    const seconds = submissionTime % 60;
    const formattedTime = minutes + ':' + String(seconds).padStart(2, '0');
    
    // Add row to spreadsheet
    const sheet = spreadsheet.getActiveSheet();
    sheet.appendRow([
      new Date(timestamp),
      userName,
      teamNames || 'Not provided',
      briefTitle,
      briefId,
      formattedTime,
      submissionUrl
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Submission saved successfully"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

This version creates a single spreadsheet with all submissions in rows, which makes it easier to analyze and export data.

## Questions?

If you have any issues with the setup, check:
1. The Google Apps Script is deployed correctly
2. The Web App URL is copied exactly (including the `/exec` at the end)
3. The script has been authorized
4. Your Google account has permissions to create files in Drive
