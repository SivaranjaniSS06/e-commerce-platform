import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        
        if (selectedFile && validTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
        } else {
            alert('Please select a valid image file (JPEG, PNG, GIF)');
            setFile(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('product', file);

        try {
            const response = await axios.post('http://localhost:4002/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file: ' + error.response?.data?.error || 'Unknown error');
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="file" name="product" onChange={handleFileChange} required />
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadForm;
