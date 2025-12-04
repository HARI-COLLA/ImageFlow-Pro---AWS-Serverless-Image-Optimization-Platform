import { fileToBase64 } from './utils';

// Hardcoded config
const config = {
    API_ENDPOINT: "https://ke3a91dqwe.execute-api.ap-south-1.amazonaws.com/prod/optimize",
    MAX_FILE_SIZE: 10 * 1024 * 1024,
    SUPPORTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp']
};

export const optimizeImage = async (file, options) => {
    try {
        console.log("📤 Converting file to base64...", file.name, file.size);
        const base64Image = await fileToBase64(file);
        console.log("✅ Base64 length:", base64Image.length);
        
        const requestBody = {
            imageUrl: base64Image,
            width: parseInt(options.width) || 800,
            format: options.format || 'webp',
            quality: parseInt(options.quality) || 85,
            optimizeLevel: options.optimizationLevel || 'balanced'
        };
        
        // Add optional parameters
        if (options.sharpness) requestBody.sharpness = parseFloat(options.sharpness);
        if (options.contrast) requestBody.contrast = parseFloat(options.contrast);
        if (options.brightness) requestBody.brightness = parseFloat(options.brightness);
        if (options.stripMetadata !== undefined) requestBody.stripMetadata = options.stripMetadata;
        if (options.progressive !== undefined) requestBody.progressive = options.progressive;
        
        console.log('🚀 Sending to API:', { 
            endpoint: config.API_ENDPOINT,
            bodySize: JSON.stringify(requestBody).length,
            width: requestBody.width,
            format: requestBody.format
        });
        
        const response = await fetch(config.API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });
        
        console.log("📥 API Response status:", response.status, response.statusText);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error("❌ API Error Response:", errorText);
            throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}`);
        }
        
        const data = await response.json();
        console.log("✅ API Response parsed");
        console.log("🖼️ Has optimizedImage?", !!data.optimizedImage);
        console.log("📊 Data keys:", Object.keys(data));
        
        if (!data.success) {
            console.error("❌ API returned error:", data.error);
            throw new Error(data.error || 'Optimization failed');
        }
        
        // Validate response has image
        if (!data.optimizedImage) {
            console.error("❌ No optimizedImage in response:", data);
            throw new Error('Server did not return optimized image');
        }
        
        console.log("🎉 Success! Image received");
        return data;
        
    } catch (error) {
        console.error('💥 API Call failed:', error);
        throw new Error(`Optimization failed: ${error.message}`);
    }
};

export { config };