document.addEventListener('DOMContentLoaded', function() {
    // Handle the main contact form on main.html
    const mainContactForm = document.querySelector('.contact-form');
    if (mainContactForm) {
        mainContactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                subject: document.getElementById('subject')?.value || 'Contact Form Submission',
                message: document.getElementById('message')?.value || '',
                company: '' // Added for consistency with other forms
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
                
                // Reset button
                submitButton.innerText = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Handle the investors page contact form
    const investorsContactForm = document.querySelector('.contact-form');
    if (investorsContactForm && investorsContactForm !== mainContactForm) {
        investorsContactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                company: document.getElementById('company')?.value || '',
                subject: 'Investor Inquiry',
                message: document.getElementById('message')?.value || '',
                investorType: document.getElementById('investor-type')?.value || 'Not Specified'
            };
            
            try {
                // Show sending message
                const submitButton = investorsContactForm.querySelector('.btn[type="submit"]');
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
                        alert('Thank you for your investment inquiry! We will contact you shortly.');
                        investorsContactForm.reset();
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
                
                // Reset button
                submitButton.innerText = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Handle the interactive form in clients.html
    const interactiveForm = document.getElementById('interactive-form');
    if (interactiveForm) {
        // This function is called when the final submit button is pressed
        window.submitForm = function() {
            // Collect form data from the global formData object
            const emailData = {
                name: window.formData.name || '',
                email: window.formData.email || '',
                company: window.formData.company?.name || '',
                subject: `Service Inquiry: ${window.formData.service || 'General'}`,
                message: prepareDetailedMessage()
            };

            // Function to compile a detailed message from form data
            function prepareDetailedMessage() {
                let message = `Service Interest: ${window.formData.service || 'Not Specified'}\n`;
                
                if (window.formData.service === 'web-development') {
                    message += `Web Development Level: ${window.formData.webLevel || 'Not Specified'}\n`;
                }
                
                if (window.formData.addOns && window.formData.addOns.length > 0) {
                    message += `Additional Services: ${window.formData.addOns.join(', ')}\n`;
                }
                
                if (window.formData.hosting) {
                    message += `Hosting Option: ${window.formData.hosting}\n`;
                }
                
                if (window.formData.referral.hasReferral) {
                    message += `Referral: ${window.formData.referral.name}\n`;
                }
                
                message += `\nAdditional Info:\n${window.formData.additionalInfo || 'No additional details provided'}`;
                
                return message;
            }

            // Show loading indicator
            const loadingIndicator = document.createElement('div');
            loadingIndicator.innerText = 'Sending your request...';
            loadingIndicator.style.color = 'var(--primary-color)';
            loadingIndicator.style.textAlign = 'center';
            document.getElementById('question-8').appendChild(loadingIndicator);

            // Send the data to the server
            fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            })
            .then(response => response.json())
            .then(data => {
                // Remove loading indicator
                loadingIndicator.remove();

                if (data.success) {
                    // Hide current question
                    document.getElementById('question-8').classList.remove('active');
                    
                    // Show success message
                    document.getElementById('form-success').classList.add('active');
                } else {
                    // Show error message
                    alert('There was an error submitting your request. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                
                // Remove loading indicator
                loadingIndicator.remove();
                
                // Show error message
                alert('There was a network error. Please try again later.');
            });
        };
    }
});

// Utility function for email validation
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
