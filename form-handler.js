// This file should be included in your website to handle the form submission

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Update this if your domain changes after deployment
      // For local development: 'http://localhost:8888'
      // For production: your Netlify domain or custom domain
      const baseUrl = window.location.origin;
      
      // Show loading state
      formStatus.innerHTML = '<p class="status-message loading">Sending your message...</p>';
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        message: document.getElementById('message').value
      };
      
      try {
        // Send form data to backend
        const response = await fetch(`${baseUrl}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Success message
          formStatus.innerHTML = '<p class="status-message success">Your message has been sent successfully!</p>';
          contactForm.reset();
          
          // Optional: Send auto-response
          await fetch(`${baseUrl}/api/auto-respond`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          
        } else {
          // Error message
          formStatus.innerHTML = `<p class="status-message error">${result.message}</p>`;
        }
      } catch (error) {
        console.error('Error:', error);
        formStatus.innerHTML = '<p class="status-message error">There was an error sending your message. Please try again later.</p>';
      }
    });
  }
});