const config = {
  API_KEY: String(import.meta.env.VITE_FIREBASE_API_KEY),
  AUTH_DOMAIN: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  PROJECT_ID: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  STORAGE_BUCKET_ID: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_ID),
  MESSAGING_SENDER_ID: String(
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
  ),
  APP_ID: String(import.meta.env.VITE_FIREBASE_APP_ID),
  MEASUREMENT_ID: String(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID),
};

export default config;
