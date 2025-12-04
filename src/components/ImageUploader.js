import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import '../styles/components.css';

// Hardcoded config
const config = {
    MAX_FILE_SIZE: 10 * 1024 * 1024,
    SUPPORTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp']
};

const ImageUploader = ({ onUpload }) => {
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            alert('Please upload a valid image file (JPG, PNG, WebP, GIF, BMP)');
            return;
        }
        
        const file = acceptedFiles[0];
        
        if (file.size > config.MAX_FILE_SIZE) {
            alert(`File too large. Maximum size: ${config.MAX_FILE_SIZE / 1024 / 1024}MB`);
            return;
        }
        
        const previewUrl = URL.createObjectURL(file);
        onUpload(file, previewUrl);
    }, [onUpload]);
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.bmp']
        },
        maxFiles: 1,
        maxSize: config.MAX_FILE_SIZE
    });
    
    return (
        <div className="uploader">
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                <input {...getInputProps()} />
                <div className="upload-icon">📁</div>
                <h3>Upload Image</h3>
                <p>{isDragActive ? 'Drop image here' : 'Drag & drop or click to select'}</p>
                <p className="file-types">Supports: JPEG, PNG, WebP, GIF, BMP</p>
                <p className="file-size">Max: 10MB</p>
            </div>
        </div>
    );
};

export default ImageUploader;