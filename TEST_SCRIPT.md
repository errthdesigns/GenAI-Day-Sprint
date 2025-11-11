# Test Your Google Apps Script

Add this test function to your Google Apps Script to verify it can access your folder:

```javascript
function testFolderAccess() {
  try {
    const parentFolderId = '1CXfauYs1VZKn7orWIIT_Tn-eDzYINoiz';
    const parentFolder = DriveApp.getFolderById(parentFolderId);
    Logger.log('Parent folder found: ' + parentFolder.getName());
    
    const mainFolderName = "GenAI Sprint Submissions";
    const folders = parentFolder.getFoldersByName(mainFolderName);
    const mainFolder = folders.hasNext() ? folders.next() : parentFolder.createFolder(mainFolderName);
    Logger.log('Main folder found/created: ' + mainFolder.getName());
    
    // Try creating a test file
    const testFolder = mainFolder.createFolder('TEST_USER');
    testFolder.createFile('test.txt', 'This is a test file');
    Logger.log('Test file created successfully!');
    
    return 'SUCCESS: Folder access works!';
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    return 'ERROR: ' + error.toString();
  }
}
```

**To run the test:**
1. Paste this function into your Google Apps Script
2. Select `testFolderAccess` from the function dropdown
3. Click the "Run" button (▶️)
4. Authorize if prompted
5. Check the "Execution log" at the bottom to see the results

If this test works, the issue is with receiving data from your app. If it fails, there's a permissions or folder access issue.

