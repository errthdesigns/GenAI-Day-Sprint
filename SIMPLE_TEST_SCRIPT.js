// SIMPLE TEST VERSION - This will create files in your root Drive first to test
// Once this works, we'll fix the folder issue

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: "Google Apps Script is running correctly. Use POST to submit data."
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    Logger.log('=== doPost START ===');
    
    if (!e || !e.postData || !e.postData.contents) {
      Logger.log('ERROR: No postData');
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'No data received'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    Logger.log('Parsing data...');
    const data = JSON.parse(e.postData.contents);
    Logger.log('Data received. userName: ' + (data.userName || 'MISSING'));
    
    const { userName, briefId, briefTitle, submissionTime, submissionUrl, teamNames, timestamp } = data;
    
    if (!userName) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'userName is required'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // SIMPLE TEST: Create file directly in root Drive first
    Logger.log('Creating test file in root Drive...');
    const testFileName = 'TEST_' + userName + '_' + new Date().getTime() + '.txt';
    const testContent = 'Test submission from: ' + userName + '\nBrief: ' + briefTitle;
    
    try {
      const testFile = DriveApp.createFile(testFileName, testContent);
      Logger.log('SUCCESS: File created in root: ' + testFile.getName());
      Logger.log('File ID: ' + testFile.getId());
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Test file created successfully in root Drive. Check your Drive root folder.",
        fileId: testFile.getId()
      })).setMimeType(ContentService.MimeType.JSON);
      
    } catch (fileError) {
      Logger.log('ERROR creating file: ' + fileError.toString());
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Could not create file: ' + fileError.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    Logger.log('ERROR in doPost: ' + error.toString());
    Logger.log('Stack: ' + (error.stack || 'no stack'));
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

