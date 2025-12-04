import React from 'react';
import '../styles/components.css';

const ResultsDisplay = ({ result, originalImage }) => {
  if (!result || !originalImage) {
    console.log("❌ ResultsDisplay: Missing data", { result, originalImage });
    return null;
  }
  
  console.log("🖼️ Rendering optimized image:", result.optimizedImage?.substring(0, 100) + "...");
  
  const downloadImage = () => {
    if (!result.optimizedImage) {
      alert("No image to download!");
      return;
    }
    const link = document.createElement('a');
    link.href = result.optimizedImage;
    link.download = `optimized-${Date.now()}.${result.format || 'webp'}`;
    link.click();
  };
  
  const calculateSavings = () => {
    if (!result.originalSize || !result.size) return 0;
    return ((1 - result.size / result.originalSize) * 100).toFixed(1);
  };
  
  const savings = calculateSavings();
  const sizeReduction = result.originalSize && result.size 
    ? (result.originalSize - result.size) / 1024 
    : 0;
  
  return (
    <div className="results">
      <div className="results-header">
        <h3>✅ Optimization Complete!</h3>
        <div className="success-badge">AI Enhanced</div>
      </div>
      
      <div className="results-grid">
        <div className="result-card">
          <div className="card-title">Compression</div>
          <div className="card-value">{result.compressionRatio || savings}%</div>
          <div className="card-sub">Size Reduction</div>
        </div>
        
        <div className="result-card">
          <div className="card-title">Quality Score</div>
          <div className="card-value">{result.qualityScore || 85}</div>
          <div className="card-sub">/100 points</div>
        </div>
        
        <div className="result-card">
          <div className="card-title">Level</div>
          <div className="card-value">{result.optimizationLevel || 'balanced'}</div>
          <div className="card-sub">Optimization</div>
        </div>
        
        <div className="result-card">
          <div className="card-title">Savings</div>
          <div className="card-value">{savings}%</div>
          <div className="card-sub">File Size</div>
        </div>
      </div>
      
      <div className="image-comparison">
        <div className="comparison-box">
          <h4>Original</h4>
          {originalImage.previewUrl && (
            <img 
              src={originalImage.previewUrl} 
              alt="Original" 
              onError={(e) => console.log("Original image error", e)}
            />
          )}
          <div className="image-stats">
            <div>Size: {(originalImage.file.size / 1024).toFixed(2)} KB</div>
            <div>Dimensions: {result.originalWidth || 'Unknown'} × {result.originalHeight || 'Unknown'}</div>
          </div>
        </div>
        
        <div className="comparison-box">
          <h4>Optimized ({result.format?.toUpperCase() || 'WEBP'})</h4>
          {result.optimizedImage ? (
            <img 
              src={result.optimizedImage} 
              alt="Optimized" 
              onLoad={() => console.log("✅ Optimized image loaded successfully")}
              onError={(e) => console.log("❌ Optimized image failed to load", e)}
            />
          ) : (
            <div className="image-error">
              <p>⚠️ Image not available</p>
              <p>Check console for details</p>
            </div>
          )}
          <div className="image-stats">
            <div>Size: {(result.size / 1024).toFixed(2)} KB</div>
            <div>Dimensions: {result.width || 'Unknown'} × {result.height || 'Unknown'}</div>
            {sizeReduction > 0 && (
              <div>Saved: {sizeReduction.toFixed(2)} KB</div>
            )}
          </div>
        </div>
      </div>
      
      <div className="action-buttons">
        <button 
          className="download-btn" 
          onClick={downloadImage}
          disabled={!result.optimizedImage}
        >
          💾 Download Optimized Image
        </button>
        
        <button 
          className="share-btn" 
          onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2)).then(() => alert('Result copied to clipboard!'))}
        >
          📋 Copy Result JSON
        </button>
      </div>
      
      <div className="debug-info">
        <h4>🔍 Debug Information</h4>
        <div className="debug-grid">
          <div>API Success: <strong>{result.success ? 'Yes' : 'No'}</strong></div>
          <div>Has Image: <strong>{result.optimizedImage ? 'Yes' : 'No'}</strong></div>
          <div>Image Type: <strong>{result.format}</strong></div>
          <div>Response Size: <strong>{JSON.stringify(result).length} chars</strong></div>
        </div>
        <button 
          className="debug-btn"
          onClick={() => console.log("Full result:", result)}
        >
          View Full Response in Console
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;