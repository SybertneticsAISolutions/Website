document.addEventListener('DOMContentLoaded', function() {
    // Debugging function to log clicks
    function logClick(elementId, context) {
        console.log(`Click logged on ${elementId} - Context: ${context}`);
    }

    // Universal button click handler for form triggers
    function setupFormTriggers() {
        // Clients page service buttons
        const serviceButtons = document.querySelectorAll('.btn[onclick*="startForm"]');
        serviceButtons.forEach(button => {
            button.addEventListener('click', function() {
                const service = this.getAttribute('onclick').match(/'([^']*)'/)[1];
                logClick(this.textContent, `Start Form for ${service}`);
                startForm(service);
            });
        });

        // Ensure startForm function exists with fallback
        if (typeof window.startForm !== 'function') {
            window.startForm = function(service) {
                console.log('Starting form for:', service);
                const interactiveForm = document.getElementById('interactive-form');
                if (interactiveForm) {
                    interactiveForm.style.display = 'block';
                    // Activate first question
                    const firstQuestion = document.getElementById('question-1');
                    if (firstQuestion) {
                        firstQuestion.classList.add('active');
                    }
                    
                    // Preset some form data if a service is specified
                    if (window.formData) {
                        window.formData.service = service;
                    }
                }
            };
        }
    }

    // Setup contact form submissions
    function setupContactForms() {
        const contactForms = document.querySelectorAll('.contact-form');
        contactForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = {
                    name: form.querySelector('#name')?.value || '',
                    email: form.querySelector('#email')?.value || '',
                    subject: form.querySelector('#subject')?.value || 'Contact Form Submission',
                    message: form.querySelector('#message')?.value || '',
                    company: form.querySelector('#company')?.value || '',
                    investorType: form.querySelector('#investor-type')?.value || ''
                };

                console.log('Contact Form Submission:', formData);

                fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Message sent successfully!');
                        form.reset();
                    } else {
                        alert('Error: ' + (data.message || 'Failed to send message'));
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was a problem sending your message. Please try again.');
                });
            });
        });
    }

    // Fallback for interactive form submission
    if (typeof window.submitForm !== 'function') {
        window.submitForm = function() {
            console.log('Fallback submitForm called');
            alert('Form submission is not fully configured.');
        };
    }

    // Add global error handling
    window.addEventListener('error', function(event) {
        console.error('Unhandled error:', event.error);
    });

    // Setup all event handlers
    setupFormTriggers();
    setupContactForms();

    // Debug logging for interactive form buttons
    const interactiveFormButtons = document.querySelectorAll('#interactive-form button');
    interactiveFormButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Interactive form button clicked:', this.textContent);
        });
    });
});

// Ensure nextQuestion and related functions exist
if (typeof window.nextQuestion !== 'function') {
    window.nextQuestion = function(questionNumber) {
        console.log('Next question called for:', questionNumber);
        const currentQuestion = document.getElementById(`question-${questionNumber}`);
        const nextQuestion = document.getElementById(`question-${questionNumber + 1}`);
        
        if (currentQuestion) currentQuestion.classList.remove('active');
        if (nextQuestion) nextQuestion.classList.add('active');
    };
}

// Fallback for close form
if (typeof window.closeForm !== 'function') {
    window.closeForm = function() {
        const interactiveForm = document.getElementById('interactive-form');
        if (interactiveForm) {
            interactiveForm.style.display = 'none';
        }
    };
}
