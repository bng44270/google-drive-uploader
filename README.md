# Google Drive Uploader  
  
Uses SHA512 Auth Token for client authentication  
  
Installation/Setup:  
  
1) Create new Apps Script project  
2) Add Code.gs and Uploader.gs files to the project  
3) Save and Deploy project (note the deployment URL)  
4) To initialize the auth token, make a POST request to the deployment URL with the following JSON:  
  {"token":""}  
5) Once POST request completes, go into Project Settings and take note of  "auth_token" under Script Properties  
6) To upload a file, make a POST request to the depoyment URL using the following JSON template:  
  {"name":"name-of-file-to-upload","content":"base64-encoded-file-content","token":"auth_token-value"}
