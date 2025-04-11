// form-handler.js - Updated version
document.addEventListener('DOMContentLoaded', function() {
    // Set up all contact forms
    const contactForms = document.querySelectorAll('.contact-form, form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
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
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                if (data.success) {
                    alert('Thank you for your message! We will get back to you shortly.');
                    form.reset();
                } else {
                    alert('Error: ' + (data.message || 'Failed to send message. Please try again or contact us directly at KaynenBPellegrino@sybertnetics.com'));
                }
            })
            .catch(error => {
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                console.error('Form submission error:', error);
                alert('Sorry, there was a problem sending your message. Please try again or email us directly at KaynenBPellegrino@sybertnetics.com');
            });
        });
    });
    
    // Handle interactive form
    const interactiveForm = document.getElementById('interactive-form');
    if (interactiveForm) {
        // Fix for the interactive form submit function
        window.submitForm = function() {
            const formData = window.formData || {};
            
            // Add additional info for special forms
            let additionalServices = '';
            if (formData.addOns && formData.addOns.length > 0) {
                additionalServices += "Add-on services requested: " + formData.addOns.join(', ') + "\n";
            }
            if (formData.hosting) {
                additionalServices += "Hosting option: " + formData.hosting + "\n";
            }
            
            // Prepare comprehensive message
            let fullMessage = '';
            if (additionalServices) {
                fullMessage += additionalServices + "\n";
            }
            fullMessage += formData.additionalInfo || '';
            
            // Prepare email data
            const emailData = {
                name: formData.name || 'Website Visitor',
                email: formData.email || 'no-email@provided.com',
                company: formData.company?.name || '',
                message: fullMessage,
                subject: `New Service Request: ${formData.service || 'Website Service'}`
            };
            
            // Show status message
            const successElement = document.getElementById('form-success');
            if (successElement) {
                document.getElementById('question-8').classList.remove('active');
                successElement.classList.add('active');
            }
            
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
            })
            .catch(error => {
                console.error('Interactive form error:', error);
            });
        };
        
        // Fix rm() function
        window.rm = function() {
            window.submitForm();
        };
    }
});
