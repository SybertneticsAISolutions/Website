const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./sybertnetics-webpage-firebase-adminsdk-7kvxz-b9dd92c42d.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'sybertnetics-webpage'
});

async function createAdminUser() {
  try {
    const userRecord = await admin.auth().createUser({
      email: 'kaynbpellegrino@sybertnetics.com',
      password: 'AdminPass123!',
      displayName: 'Kaynen B Pellegrino'
    });
    
    console.log('Successfully created new admin user:', userRecord.uid);
    console.log('Email:', userRecord.email);
    console.log('Display Name:', userRecord.displayName);
    
    // Optionally set custom claims for admin role
    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
    console.log('Admin claims set successfully');
    
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      console.log('User already exists. Updating password...');
      try {
        // Get the existing user
        const userRecord = await admin.auth().getUserByEmail('kaynbpellegrino@sybertnetics.com');
        
        // Update the password
        await admin.auth().updateUser(userRecord.uid, {
          password: 'AdminPass123!'
        });
        
        // Set admin claims
        await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
        
        console.log('Successfully updated admin user:', userRecord.uid);
        console.log('Email:', userRecord.email);
        console.log('New password set and admin claims updated');
      } catch (updateError) {
        console.error('Error updating existing user:', updateError);
      }
    } else {
      console.error('Error creating admin user:', error);
    }
    process.exit(1);
  }
}

createAdminUser(); 