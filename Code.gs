function initAuthToken() {
  var token = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_512,Math.random().toString()).map(x => x.toString(16)).join("");
  
  PropertiesService.getScriptProperties().setProperty("auth_token",token);
}

function doPost(e) {
  var authToken = PropertiesService.getScriptProperties().getProperty("auth_token");

  var uploadFolder = PropertiesService.getScriptProperties().getProperty('upload_folder');
  
  var uploadFile = JSON.parse(e.postData.contents);

  if (uploadFile.token == authToken) {
    try {
      var thisUploader = new Uploader(uploadFolder);
      thisUploader.upload(uploadFile.name,uploadFile.content);
      return ContentService.createTextOutput("File " + uploadFile.name + " uploaded successfully");
    }
    catch(e) {
      return ContentService.createTextOutput("Error uploading file");
    }
  }
  else {
    if (!authToken) {
      initAuthToken();
      authToken = PropertiesService.getScriptProperties().getProperty("auth_token");
      return ContentService.createTextOutput("Uploader Initiailzed.  Please try again");
    }
    else {
      return ContentService.createTextOutput("Unauthorized access");
    }
  }

  
}
