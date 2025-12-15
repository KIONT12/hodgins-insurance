// Configuration for the application
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  port: 3001,
  nodeEnv: 'development',
  rateLimitWindowMs: 900000, // 15 minutes
  rateLimitMaxRequests: 5,
}

