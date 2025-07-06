const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function createAdminUser() {
  try {
    const email = 'kaynbpellegrino@sybertnetics.com';
    const password = 'KcMsLbMnAs2024!!';
    
    // Create the user
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: 'KaynenBPellegrino',
    });

    // Set custom claims for admin role
    await admin.auth().setCustomUserClaims(userRecord.uid, {
      admin: true,
      role: 'admin',
    });

    console.log('Admin user created successfully:', {
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName
    });
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      console.log('Admin user already exists');
      
      // Get the existing user and update claims
      const userRecord = await admin.auth().getUserByEmail('kaynbpellegrino@sybertnetics.com');
      await admin.auth().setCustomUserClaims(userRecord.uid, {
        admin: true,
        role: 'admin',
      });
      
      console.log('Admin claims updated for existing user:', userRecord.uid);
    } else {
      console.error('Error creating admin user:', error);
    }
  }
}

createAdminUser().then(() => {
  console.log('Script completed');
  process.exit(0);
}).catch((error) => {
  console.error('Script failed:', error);
  process.exit(1);
}); 