const config = {
    // ⭐ YOUR API GATEWAY ENDPOINT ⭐
    API_ENDPOINT: "https://ke3a91dqwe.execute-api.ap-south-1.amazonaws.com/prod/optimize",
    
    // ⭐ YOUR S3 BUCKET ⭐
    S3_BUCKET: "image-optimization-uploads",
    S3_REGION: "ap-south-1",
    
    // Optimization levels
    OPTIMIZATION_LEVELS: [
        { value: 'basic', label: 'Basic (Fast)', description: 'Quick processing' },
        { value: 'balanced', label: 'Balanced', description: 'Optimal quality & size' },
        { value: 'advanced', label: 'Advanced', description: 'Best quality with enhancements' }
    ],
    
    // Output formats
    FORMATS: [
        { value: 'webp', label: 'WebP', description: 'Best modern format' },
        { value: 'jpeg', label: 'JPEG', description: 'Universal compatibility' },
        { value: 'png', label: 'PNG', description: 'Lossless quality' }
    ],
    
    // Default settings
    DEFAULT_WIDTH: 1200,
    DEFAULT_QUALITY: 85,
    DEFAULT_OPTIMIZATION: 'balanced',
    
    // File limits
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    SUPPORTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp']
};

export default config;