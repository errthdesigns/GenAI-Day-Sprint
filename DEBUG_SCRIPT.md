# Debug Test Function

Add this function to your Google Apps Script to test if you can access the folder:

```javascript
function testFolderAccess() {
  try {
    const mainFolderId = '1aByN4rHpzslKIGr3Nsr4w2KHUT7vCH7m';
    Logger.log('Testing folder access: ' + mainFolderId);
    
    const mainFolder = DriveApp.getFolderById(mainFolderId);
    Logger.log('SUCCESS: Folder found - ' + mainFolder.getName());
    Logger.log('Folder URL: ' + mainFolder.getUrl());
    
    // Try creating a test file
    const testFile = mainFolder.createFile('TEST.txt', 'This is a test');
    Logger.log('SUCCESS: Test file created - ' + testFile.getName());
    
    return 'SUCCESS: Folder access works!';
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    return 'ERROR: ' + error.toString();
  }
}
```

**To run:**
1. Paste this function into your script
2. Select `testFolderAccess` from the function dropdown
3. Click "Run" (▶️)
4. Authorize if prompted
5. Check "Execution log" at the bottom

If this fails, the folder ID is wrong or you don't have permission. If it works, the issue is elsewhere in the doPost function.

