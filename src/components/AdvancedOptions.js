import React, { useState } from 'react';
import '../styles/components.css';

const AdvancedOptions = () => {
    const [sharpness, setSharpness] = useState(1.2);
    const [contrast, setContrast] = useState(1.1);
    const [brightness, setBrightness] = useState(1.05);
    const [stripMetadata, setStripMetadata] = useState(true);
    const [progressive, setProgressive] = useState(true);
    const [showAdvanced, setShowAdvanced] = useState(false);
    
    return (
        <div className="advanced-options">
            <div className="advanced-header" onClick={() => setShowAdvanced(!showAdvanced)}>
                <h3>⚙️ Advanced Settings {showAdvanced ? '▲' : '▼'}</h3>
            </div>
            
            {showAdvanced && (
                <div className="advanced-content">
                    <div className="enhancement-sliders">
                        <div className="slider-group">
                            <label>Sharpness: {sharpness.toFixed(1)}x</label>
                            <input
                                type="range"
                                min="0.5"
                                max="2.0"
                                step="0.1"
                                value={sharpness}
                                onChange={(e) => setSharpness(parseFloat(e.target.value))}
                            />
                        </div>
                        
                        <div className="slider-group">
                            <label>Contrast: {contrast.toFixed(1)}x</label>
                            <input
                                type="range"
                                min="0.5"
                                max="2.0"
                                step="0.1"
                                value={contrast}
                                onChange={(e) => setContrast(parseFloat(e.target.value))}
                            />
                        </div>
                        
                        <div className="slider-group">
                            <label>Brightness: {brightness.toFixed(1)}x</label>
                            <input
                                type="range"
                                min="0.5"
                                max="2.0"
                                step="0.1"
                                value={brightness}
                                onChange={(e) => setBrightness(parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                    
                    <div className="advanced-switches">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={stripMetadata}
                                onChange={(e) => setStripMetadata(e.target.checked)}
                            />
                            <span className="slider"></span>
                            <span className="switch-label">Remove Metadata</span>
                        </label>
                        
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={progressive}
                                onChange={(e) => setProgressive(e.target.checked)}
                            />
                            <span className="slider"></span>
                            <span className="switch-label">Progressive Loading</span>
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvancedOptions;