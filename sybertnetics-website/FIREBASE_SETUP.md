# Firebase Setup Guide

## Quick Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create new project named "sybertnetics-website"

2. **Enable Services**
   - **Firestore Database**: Create in test mode
   - **Authentication**: Enable Email/Password

3. **Create Admin User**
   - In Authentication > Users > Add user
   - Use admin@sybertnetics.com

4. **Get Client Config**
   - Project Settings > Add web app
   - Copy config to `.env.local`

5. **Get Admin SDK Config**
   - Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download JSON file
   - Copy values to `.env.local`

6. **Environment Variables**
   ```
   # Client-side Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Server-side Firebase Admin
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   ```

7. **Test**
   - Admin login: `/admin/login`
   - Beta signup: `/runedrive/beta`
   - Contact form: `/contact`

## Benefits
- ✅ Reliable backend (no more 500 errors)
- ✅ Real database storage
- ✅ Working contact forms
- ✅ Secure admin authentication with Firebase
- ✅ Scalable and cost-effective
- ✅ Server-side authentication verification 