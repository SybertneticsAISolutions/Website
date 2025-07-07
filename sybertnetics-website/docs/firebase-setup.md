# Firebase Setup for Sybertnetics Website

## Overview
This document outlines the migration from Netlify Functions to Firebase for backend functionality, including beta signups, contact forms, and admin authentication.

## What's Been Migrated

### 1. Beta Signup System
- **Old**: Netlify function at `/.netlify/functions/beta-signup`
- **New**: API route at `/api/beta-signup` using Firebase Firestore
- **Data**: Stored in `beta-signups` collection

### 2. Contact Form System
- **Old**: Netlify Forms
- **New**: API route at `/api/contact` using Firebase Firestore
- **Data**: Stored in `contact-messages` collection

### 3. Admin Authentication
- **Old**: JWT-based authentication
- **New**: Firebase Authentication
- **Features**: Email/password login, secure session management

## GitHub Actions CI/CD Setup

### Required IAM Permissions

The GitHub Actions service account needs specific roles for successful deployment:

**Service Account**: `github-action-957289697@sybertnetics-webpage.iam.gserviceaccount.com`

**Required Roles**:
- `roles/firebase.admin` - Comprehensive Firebase permissions
- `roles/firebaseextensions.admin` - Firebase Extensions management
- `roles/runtimeconfig.admin` - Runtime configuration access
- `roles/firebasehosting.admin` - Hosting deployment
- `roles/firebaseauth.admin` - Authentication management

### Setting Up Permissions

1. **List Service Accounts** (to find your GitHub Actions service account):
   ```bash
   gcloud iam service-accounts list --project=sybertnetics-webpage
   ```

2. **Add Required Roles**:
   ```bash
   # Firebase Admin (comprehensive permissions)
   gcloud projects add-iam-policy-binding sybertnetics-webpage \
     --member="serviceAccount:YOUR_GITHUB_ACTION_SERVICE_ACCOUNT_EMAIL" \
     --role="roles/firebase.admin" --condition=None

   # Firebase Extensions Admin
   gcloud projects add-iam-policy-binding sybertnetics-webpage \
     --member="serviceAccount:YOUR_GITHUB_ACTION_SERVICE_ACCOUNT_EMAIL" \
     --role="roles/firebaseextensions.admin" --condition=None

   # Runtime Config Admin
   gcloud projects add-iam-policy-binding sybertnetics-webpage \
     --member="serviceAccount:YOUR_GITHUB_ACTION_SERVICE_ACCOUNT_EMAIL" \
     --role="roles/runtimeconfig.admin" --condition=None
   ```

3. **Verify Permissions**:
   ```bash
   gcloud projects get-iam-policy sybertnetics-webpage \
     --flatten="bindings[].members" \
     --format="table(bindings.role)" \
     --filter="bindings.members:'YOUR_GITHUB_ACTION_SERVICE_ACCOUNT_EMAIL'"
   ```

### GitHub Actions Configuration

The workflow files include the `webframeworks` experiment flag:

```yaml
- uses: FirebaseExtended/action-hosting-deploy@v0
  with:
    repoToken: ${{ secrets.GITHUB_TOKEN }}
    firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_SYBERTNETICS_WEBPAGE }}
    channelId: live
    projectId: sybertnetics-webpage
  env:
    FIREBASE_CLI_EXPERIMENTS: webframeworks
```

## Setup Instructions

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it "sybertnetics-website" (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Services

#### Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll add security rules later)
4. Select a location close to your users
5. Click "Done"

#### Authentication
1. Go to "Authentication" in Firebase Console
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password"
5. Click "Save"

### Step 3: Create Admin User

1. In Authentication, go to "Users" tab
2. Click "Add user"
3. Enter admin email and password
4. Click "Add user"

### Step 4: Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (</>)
4. Register app with name "sybertnetics-website"
5. Copy the configuration object

### Step 5: Set Environment Variables

1. Copy `env.example` to `.env.local`
2. Replace the placeholder values with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

ADMIN_EMAIL=admin@sybertnetics.com
ADMIN_PASSWORD=your_secure_password
```

### Step 6: Set Netlify Environment Variables

1. In Netlify dashboard, go to your site settings
2. Navigate to "Environment variables"
3. Add all the Firebase environment variables from Step 5

## Security Rules (Optional but Recommended)

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Beta signups - anyone can create, only admins can read
    match /beta-signups/{document} {
      allow create: if true;
      allow read, write: if request.auth != null && request.auth.token.email == "admin@sybertnetics.com";
    }
    
    // Contact messages - anyone can create, only admins can read
    match /contact-messages/{document} {
      allow create: if true;
      allow read, write: if request.auth != null && request.auth.token.email == "admin@sybertnetics.com";
    }
  }
}
```

## Testing the Migration

### 1. Test Beta Signup
1. Go to `/runedrive/beta`
2. Fill out the form and submit
3. Check Firebase Console > Firestore > beta-signups collection
4. Verify the entry was created

### 2. Test Contact Form
1. Go to `/contact`
2. Fill out the form and submit
3. Check Firebase Console > Firestore > contact-messages collection
4. Verify the message was created

### 3. Test Admin Login
1. Go to `/admin/login`
2. Use the admin credentials you created
3. Verify you can access admin pages

## Benefits of Firebase Migration

1. **Reliability**: No more 500 errors from Netlify functions
2. **Scalability**: Firebase handles traffic spikes automatically
3. **Real-time**: Can add real-time features later
4. **Security**: Built-in authentication and security rules
5. **Monitoring**: Firebase Console provides usage analytics
6. **Cost-effective**: Generous free tier, pay-as-you-grow

## Troubleshooting

### Common Issues

1. **"Firebase not initialized" error**
   - Check that all environment variables are set correctly
   - Verify the Firebase config object matches your project

2. **"Permission denied" errors**
   - Check Firestore security rules
   - Verify admin user is created in Firebase Auth

3. **"Network error" in forms**
   - Check that API routes are working
   - Verify Firebase project is active

### Getting Help

- Check Firebase Console for error logs
- Review browser console for client-side errors
- Verify environment variables are set in Netlify

## Next Steps

1. **Email Notifications**: Set up Firebase Functions to send email notifications for contact form submissions
2. **Analytics**: Enable Firebase Analytics for better insights
3. **Real-time Updates**: Add real-time updates for admin dashboard
4. **Backup**: Set up automated backups of Firestore data 