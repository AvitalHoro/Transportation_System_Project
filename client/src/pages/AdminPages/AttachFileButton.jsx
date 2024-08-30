import React, {useState} from 'react';
import '../../style/AttachFile.css';
import axios from 'axios';


const AttachFileButton = () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
    const [fileName, setFileName] = useState('');
  
    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        setFileName(file.name);
        const formData = new FormData();
        formData.append('file', file);
  
        try {
          const response = await axios.post('/upload-endpoint', formData, {
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(progress);
            },
          });
  
          // Assuming the server returns the URL of the uploaded file
          setUploadedFileUrl(response.data.fileUrl);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };
  
    return (
      <div>
        <label
          htmlFor="file-upload"
          style={{
            cursor: 'pointer',
            padding: '10px 20px',
            border: '1px solid #007bff',
            borderRadius: '5px',
            backgroundColor: '#007bff',
            color: 'white',
            fontSize: '16px',
            display: 'inline-block',
            textAlign: 'center',
            marginBottom: '10px',
          }}
        >
          Attach File
        </label>
        <input
          id="file-upload"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
  
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div style={{ marginTop: '10px' }}>
            <progress value={uploadProgress} max="100" style={{ width: '100%' }} />
            <span>{uploadProgress}%</span>
          </div>
        )}
  
        {uploadedFileUrl && (
          <div style={{ marginTop: '10px' }}>
            <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer">
              {fileName}
            </a>
          </div>
        )}
      </div>
    );
  };

export default AttachFileButton;
