document.addEventListener('DOMContentLoaded', function() {
    // Handle the main contact form
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
                const formStatus = document.createElement('div');
                formStatus.className = 'status-message loading';
                formStatus.innerText = 'Sending your message...';
                mainContactForm.appendChild(formStatus);
                
                // Send form data to backend
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                // Remove loading message
                formStatus.remove();
                
                if (result.success) {
                    // Success message
                    alert('Your message has been sent successfully!');
                    mainContactForm.reset();
                } else {
                    // Error message
                    alert('There was an error sending your message: ' + result.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error sending your message. Please try again later.');
            }
        });
    }
    
    // Handle the interactive form in clients.html
    const interactiveForm = document.getElementById('interactive-form');
    if (interactiveForm) {
        const submitButton = interactiveForm.querySelector('button[onclick="submitForm()"]');
        if (submitButton) {
            // Override the original submitForm function
            window.submitForm = async function() {
                const formData = window.formData || {}; // Use the existing formData object
                
                try {
                    // Show sending message
                    const formStatus = document.createElement('div');
                    formStatus.className = 'status-message loading';
                    formStatus.innerText = 'Sending your message...';
                    interactiveForm.appendChild(formStatus);
                    
                    // Send form data to backend
                    const response = await fetch('/api/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: formData.name,
                            email: formData.email,
                            company: formData.company?.name || '',
                            message: formData.additionalInfo,
                            subject: `New Service Request: ${formData.service}`
                        })
                    });
                    
                    const result = await response.json();
                    
                    // Remove loading message
                    formStatus.remove();
                    
                    // Continue with original success flow
                    document.getElementById('question-8').classList.remove('active');
                    document.getElementById('form-success').classList.add('active');
                    
                } catch (error) {
                    console.error('Error:', error);
                    alert('There was an error submitting your request. Please try again later.');
                }
            };
        }
    }
});
