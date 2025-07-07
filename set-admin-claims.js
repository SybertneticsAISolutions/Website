const fetch = require('node-fetch');

async function setAdminClaims() {
  try {
    console.log('Setting admin claims...');
    
    const response = await fetch('https://us-east1-sybertnetics-webpage.cloudfunctions.net/setAdminClaims', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    });

    console.log('Response status:', response.status);
    
    const text = await response.text();
    console.log('Response body:', text);
    
    if (response.ok) {
      try {
        const json = JSON.parse(text);
        console.log('Success:', json);
      } catch (e) {
        console.log('Response is not JSON');
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

setAdminClaims(); 