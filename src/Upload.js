import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@material-tailwind/react';

export default function Upload() {
   /*  const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
      }
    };
  
    const handleUpload = async () => {
      if (file) {
        console.log("Uploading file...");
  
        const formData = new FormData();
        formData.append("file", file);
  
        try {
          // You can write the URL of your server or any other endpoint used for file upload
          const result = await fetch("https://httpbin.org/post", {
            method: "POST",
            body: formData,
          });
  
          const data = await result.json();
  
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
    };
  
    return (
      <>
        <div>
          <label htmlFor="file" className="sr-only">
            Choose a file
          </label>
          <input id="file" type="file" onChange={handleFileChange} />
        </div>
        {file && (
          <section>
            File details:
            <ul>
              <li>Name: {file.name}</li>
              <li>Type: {file.type}</li>
              <li>Size: {file.size} bytes</li>
            </ul>
          </section>
        )}
  
        {file && <Button color="blue" onClick={handleUpload}>Upload a file</Button>}
      </> */
  const [file, setFile] = useState()
  const [uploadedFileURL, setUploadedFileURL] = useState(null)

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  function handleSubmit(event) {
    event.preventDefault()
    const url = 'http://localhost:5000/admin/uploadcv';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
        if(response.status === 200) {
          console.log("CV uploaded successfullY!")
        }
    });
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <h1>React File Upload</h1>
          <input type="file" name="file" onChange={handleChange}/>
          {file && (
          <section>
            File details:
            <ul>
              <li>Name: {file.name}</li>
              <li>Type: {file.type}</li>
              <li>Size: {file.size} bytes</li>
            </ul>
          </section>
        )}
          <Button type="submit">Upload</Button>
        </form>
        {uploadedFileURL && <img src={uploadedFileURL} alt="Uploaded content"/>}
    </div>
  );
}
