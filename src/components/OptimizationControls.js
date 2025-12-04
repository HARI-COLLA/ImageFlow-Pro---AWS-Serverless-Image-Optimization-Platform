import React, { useState } from 'react';
import '../styles/components.css';

// Hardcoded config
const config = {
    DEFAULT_WIDTH: 1200,
    DEFAULT_QUALITY: 85,
    DEFAULT_OPTIMIZATION: 'balanced',
    OPTIMIZATION_LEVELS: [
        { value: 'basic', label: 'Basic (Fast)', description: 'Quick processing' },
        { value: 'balanced', label: 'Balanced', description: 'Optimal quality & size' },
        { value: 'advanced', label: 'Advanced', description: 'Best quality with enhancements' }
    ],
    FORMATS: [
        { value: 'webp', label: 'WebP', description: 'Best modern format' },
        { value: 'jpeg', label: 'JPEG', description: 'Universal compatibility' },
        { value: 'png', label: 'PNG', description: 'Lossless quality' }
    ]
};

const OptimizationControls = ({ onOptimize, loading, originalFile }) => {
    const [width, setWidth] = useState(config.DEFAULT_WIDTH);
    const [format, setFormat] = useState('webp');
    const [quality, setQuality] = useState(config.DEFAULT_QUALITY);
    const [optimizationLevel, setOptimizationLevel] = useState(config.DEFAULT_OPTIMIZATION);
    
    const handleOptimize = () => {
        const basicOptions = { 
            width, 
            format, 
            quality, 
            optimizationLevel 
        };
        
        onOptimize(basicOptions);
    };
    
    const sizePresets = [
        { label: 'Thumbnail', value: 320 },
        { label: 'Medium', value: 768 },
        { label: 'Large', value: 1200 },
        { label: 'Full HD', value: 1920 }
    ];
    
    return (
        <div className="controls">
            <div className="controls-header">
                <h3>Optimization Settings</h3>
                {originalFile && (
                    <div className="file-info">
                        {originalFile.name} • {(originalFile.size / 1024 / 1024).toFixed(2)}MB
                    </div>
                )}
            </div>
            
            <div className="controls-grid">
                <div className="control-group">
                    <label>Optimization Level</label>
                    <div className="level-buttons">
                        {config.OPTIMIZATION_LEVELS.map(level => (
                            <button
                                key={level.value}
                                className={`level-btn ${optimizationLevel === level.value ? 'active' : ''}`}
                                onClick={() => setOptimizationLevel(level.value)}
                                title={level.description}
                            >
                                {level.label}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="control-group">
                    <label>Output Format</label>
                    <div className="format-buttons">
                        {config.FORMATS.map(fmt => (
                            <button
                                key={fmt.value}
                                className={`format-btn ${format === fmt.value ? 'active' : ''}`}
                                onClick={() => setFormat(fmt.value)}
                                title={fmt.description}
                            >
                                {fmt.label}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="control-group">
                    <label>Width: {width}px</label>
                    <div className="size-presets">
                        {sizePresets.map(preset => (
                            <button
                                key={preset.value}
                                className={`size-btn ${width === preset.value ? 'active' : ''}`}
                                onClick={() => setWidth(preset.value)}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                    <input
                        type="range"
                        min="100"
                        max="4000"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                    />
                </div>
                
                <div className="control-group">
                    <label>Quality: {quality}%</label>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                    />
                    <div className="quality-labels">
                        <span>Smaller</span>
                        <span>Balanced</span>
                        <span>Better</span>
                    </div>
                </div>
            </div>
            
            <button
                className="optimize-btn"
                onClick={handleOptimize}
                disabled={loading || !originalFile}
            >
                {loading ? '⚡ Processing...' : '🚀 Optimize Image'}
            </button>
        </div>
    );
};

export default OptimizationControls;