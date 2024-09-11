/*
  File Uploader for Google Apps/Drive

  Usage:

    //Configure instance with ID of Google Drive Folder
    var thisUploader = new Uploader('folder-id');

    //Call upload function with filename and base64-encoded filecontents as arguments
    thisUploader.upload('test.txt','dGhpcyBpcyBhIHRlc3QK');

  NOTE:  Exception handling must be handled externally
*/
class Uploader {
  constructor(folderId) {
    this.folder = DriveApp.getFolderById(folderId);
  }

  upload(fileName,fileContent) {
    var byteArFile = new Uint8Array(Utilities.base64Decode(fileContent)).map(x => x & 0xFF);
    var blobFile = Utilities.newBlob(byteArFile);
    blobFile.setName(fileName);
    this.folder.createFile(blobFile);
  }
}
