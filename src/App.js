import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import OptimizationControls from './components/OptimizationControls';
import AdvancedOptions from './components/AdvancedOptions';
import ResultsDisplay from './components/ResultsDisplay';
import { optimizeImage } from './services/api';
import './styles/App.css';

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleUpload = (file, previewUrl) => {
    console.log("📁 Image uploaded:", file.name, file.size);
    setOriginalImage({ file, previewUrl });
    setResult(null);
    setError('');
  };
  
  const handleOptimize = async (basicOptions) => {
    if (!originalImage) return;
    
    console.log("🟡 Starting optimization...", basicOptions);
    setLoading(true);
    setError('');
    
    try {
      const data = await optimizeImage(originalImage.file, basicOptions);
      console.log("✅ API Response received!");
      console.log("📊 Has optimizedImage?", !!data.optimizedImage);
      console.log("📊 Image data length:", data.optimizedImage?.length);
      console.log("📊 Full response:", data);
      
      setResult(data);
    } catch (err) {
      console.error("❌ API Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 Advanced Image Optimizer</h1>
        <p className="subtitle">Professional-grade image optimization with AI enhancements</p>
      </header>
      
      <main className="app-main">
        <section className="upload-section">
          <ImageUploader onUpload={handleUpload} />
        </section>
        
        {originalImage && (
          <section className="controls-section">
            <OptimizationControls 
              onOptimize={handleOptimize}
              loading={loading}
              originalFile={originalImage.file}
            />
            <AdvancedOptions />
          </section>
        )}
        
        <section className="results-section">
          {error && <div className="error-alert">❌ {error}</div>}
          
          {result && (
            <ResultsDisplay 
              result={result}
              originalImage={originalImage}
            />
          )}
        </section>
        
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Applying AI optimizations...</p>
          </div>
        )}
      </main>
      
      <footer className="app-footer">
        <p>Powered by AWS Lambda • Advanced Image Processing • AI Enhancements</p>
        <p className="api-info">API: https://ke3a91dqwe.execute-api.ap-south-1.amazonaws.com/prod/optimize</p>
      </footer>
    </div>
  );
}

export default App;