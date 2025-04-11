// form-handler.js - Updated version
document.addEventListener('DOMContentLoaded', function() {
    // Set up all contact forms
    const contactForms = document.querySelectorAll('.contact-form, form');
    
    contactForms.forEach(form => {
        if (!form.classList.contains('interactive-form')) { // Exclude interactive form
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Show loading state
                const submitButton = form.querySelector('button[type="submit"]');
                const originalButtonText = submitButton ? submitButton.textContent : 'Send';
                if (submitButton) {
                    submitButton.textContent = 'Sending...';
                    submitButton.disabled = true;
                }
                
                // Collect form data
                const formData = {
                    name: form.querySelector('#name')?.value || '',
                    email: form.querySelector('#email')?.value || '',
                    subject: form.querySelector('#subject')?.value || 'Contact Form Submission',
                    message: form.querySelector('#message')?.value || '',
                    company: form.querySelector('#company')?.value || '',
                    investorType: form.querySelector('#investor-type')?.value || ''
                };
                
                console.log('Submitting form data:', formData);
                
                // Send to our API endpoint
                fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    // Reset button
                    if (submitButton) {
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                    }
                    
                    if (data.success) {
                        alert('Thank you for your message! We will get back to you shortly.');
                        form.reset();
                    } else {
                        alert('Error: ' + (data.message || 'Failed to send message. Please try again or contact us directly at KaynenBPellegrino@sybertnetics.com'));
                    }
                })
                .catch(error => {
                    // Reset button
                    if (submitButton) {
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                    }
                    
                    console.error('Form submission error:', error);
                    alert('Sorry, there was a problem sending your message. Please try again or email us directly at KaynenBPellegrino@sybertnetics.com');
                });
            });
        }
    });
    
    // Fix interactive form
    window.submitForm = function() {
        const formData = window.formData || {};
        
        // Prepare comprehensive message
        let fullMessage = '';
        if (formData.service) {
            fullMessage += "Service: " + formData.service + "\n";
        }
        if (formData.webLevel) {
            fullMessage += "Web Level: " + formData.webLevel + "\n";
        }
        if (formData.addOns && formData.addOns.length > 0) {
            fullMessage += "Add-on services: " + formData.addOns.join(', ') + "\n";
        }
        if (formData.hosting) {
            fullMessage += "Hosting option: " + formData.hosting + "\n";
        }
        if (formData.referral && formData.referral.hasReferral) {
            fullMessage += "Referred by: " + formData.referral.name + "\n";
        }
        if (formData.newsletter) {
            fullMessage += "Newsletter subscription: Yes\n";
        }
        if (formData.additionalInfo) {
            fullMessage += "\nAdditional info:\n" + formData.additionalInfo;
        }
        
        // Prepare email data
        const emailData = {
            name: formData.name || 'Website Visitor',
            email: formData.email || 'no-email@provided.com',
            company: formData.company?.name || '',
            message: fullMessage,
            subject: `New Service Request: ${formData.service || 'Website Service'}`
        };
        
        // Send the data
        fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Interactive form submission result:', data);
            // Show success message regardless of response to prevent blocking
            document.getElementById('question-8').classList.remove('active');
            document.getElementById('form-success').classList.add('active');
        })
        .catch(error => {
            console.error('Interactive form error:', error);
            // Show success message anyway to avoid blocking user
            document.getElementById('question-8').classList.remove('active');
            document.getElementById('form-success').classList.add('active');
        });
    };
    
    // Fix rm() function
    window.rm = function() {
        window.submitForm();
    };
});
