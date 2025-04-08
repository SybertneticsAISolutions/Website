document.addEventListener('DOMContentLoaded', function() {
    // Handle the main contact form (on main.html and investors.html)
    const mainContactForm = document.querySelector('.contact-form');
    if (mainContactForm) {
        mainContactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                company: document.getElementById('company')?.value || '',
                subject: document.getElementById('subject')?.value || 'Contact Form Submission',
                message: document.getElementById('message')?.value || ''
            };
            
            try {
                // Show sending message
                const submitButton = mainContactForm.querySelector('.btn[type="submit"]');
                const originalText = submitButton.innerText;
                submitButton.innerText = 'Sending...';
                submitButton.disabled = true;
                
                // Send form data to backend
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                // Reset button
                submitButton.innerText = originalText;
                submitButton.disabled = false;
                
                if (response.ok) {
                    const result = await response.json();
                    
                    if (result.success) {
                        // Success message
                        alert('Your message has been sent successfully!');
                        mainContactForm.reset();
                    } else {
                        // Error message from server
                        alert('There was an error sending your message: ' + (result.message || 'Please try again later'));
                    }
                } else {
                    // HTTP error
                    alert('There was a problem connecting to the server. Please try again later.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again later or contact us directly.');
            }
        });
    }
    
    // Handle the interactive form in clients.html
    // This just adds event listeners - the actual submission is handled by submitForm()
    const interactiveForm = document.getElementById('interactive-form');
    if (interactiveForm) {
        console.log("Interactive form found, attaching event handlers");
        
        // Make sure to initialize formData if it doesn't exist
        if (typeof window.formData === 'undefined') {
            window.formData = {
                name: '',
                company: { isCompany: false, name: '' },
                service: '',
                webLevel: '',
                referral: { hasReferral: false, name: '' },
                email: '',
                additionalInfo: '',
                newsletter: false
            };
        }
        
        // Add enter key handling for form fields
        interactiveForm.querySelectorAll('input, textarea').forEach(element => {
            element.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    const questionDiv = element.closest('.form-question');
                    if (questionDiv) {
                        const questionId = questionDiv.id;
                        const questionNumber = parseInt(questionId.split('-')[1]);
                        nextQuestion(questionNumber);
                        event.preventDefault();
                    }
                }
            });
        });
    }
});
