// Enhanced form-handler.js with fixes for Sybertnetics website
document.addEventListener('DOMContentLoaded', function() {
    console.log('Form handler initialized');
    
    // Initialize form data object if not already set
    if (!window.formData) {
        window.formData = {
            name: '',
            company: { isCompany: false, name: '' },
            service: '',
            webLevel: '',
            addOns: [],
            hosting: '',
            referral: { hasReferral: false, name: '' },
            email: '',
            additionalInfo: '',
            newsletter: false
        };
    }
    
    // Setup all contact forms on the site
    setupContactForms();
    
    // Setup interactive form triggers
    setupFormTriggers();
    
    // Setup navigation for interactive form questions
    setupFormNavigation();
});

// Setup all regular contact forms
function setupContactForms() {
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(form => {
        if (!form.classList.contains('initialized')) {
            form.classList.add('initialized');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Contact form submitted');
                
                // Get form data
                const formData = {
                    name: form.querySelector('#name')?.value || '',
                    email: form.querySelector('#email')?.value || '',
                    subject: form.querySelector('#subject')?.value || 'Contact Form Submission',
                    message: form.querySelector('#message')?.value || '',
                    company: form.querySelector('#company')?.value || '',
                    investorType: form.querySelector('#investor-type')?.value || ''
                };
                
                // Validate required fields
                if (!formData.name || !formData.email) {
                    alert('Please fill in all required fields');
                    return;
                }
                
                // Show loading indicator
                const loadingIndicator = document.createElement('div');
                loadingIndicator.className = 'loading-indicator';
                loadingIndicator.innerText = 'Sending...';
                form.appendChild(loadingIndicator);
                
                // Send data to server
                sendFormData(formData)
                    .then(response => {
                        form.removeChild(loadingIndicator);
                        if (response.success) {
                            alert('Thank you! Your message has been sent successfully.');
                            form.reset();
                        } else {
                            alert('There was a problem sending your message: ' + response.message);
                        }
                    })
                    .catch(error => {
                        form.removeChild(loadingIndicator);
                        console.error('Form submission error:', error);
                        alert('There was a problem sending your message. Please try again later or contact us directly at KaynenBPellegrino@Sybertnetics.com');
                    });
            });
        }
    });
}

// Setup triggers for interactive form
function setupFormTriggers() {
    const serviceButtons = document.querySelectorAll('.btn[onclick*="startForm"]');
    serviceButtons.forEach(button => {
        // Replace the onclick attribute with a proper event listener
        const serviceName = button.getAttribute('onclick').match(/'([^']*)'/)?.[1] || '';
        button.removeAttribute('onclick');
        
        button.addEventListener('click', function() {
            startForm(serviceName);
        });
    });
}

// Setup navigation for interactive form questions
function setupFormNavigation() {
    // Setup next/prev buttons
    document.querySelectorAll('.form-buttons .btn').forEach(button => {
        if (button.innerText.includes('Next')) {
            const questionId = button.closest('.form-question').id;
            const questionNumber = parseInt(questionId.split('-')[1]);
            button.removeAttribute('onclick');
            
            button.addEventListener('click', function() {
                nextQuestion(questionNumber);
            });
        } else if (button.innerText.includes('Back')) {
            const questionId = button.closest('.form-question').id;
            const questionNumber = parseInt(questionId.split('-')[1]);
            button.removeAttribute('onclick');
            
            button.addEventListener('click', function() {
                prevQuestion(questionNumber);
            });
        } else if (button.innerText.includes('Submit')) {
            button.removeAttribute('onclick');
            
            button.addEventListener('click', function() {
                submitForm();
            });
        } else if (button.innerText.includes('Close')) {
            button.removeAttribute('onclick');
            
            button.addEventListener('click', function() {
                closeForm();
            });
        }
    });
    
    // Setup option buttons
    document.querySelectorAll('.option-btn').forEach(button => {
        button.removeAttribute('onclick');
        
        button.addEventListener('click', function() {
            const parent = this.closest('.options-grid');
            const questionType = parent.getAttribute('data-field') || this.getAttribute('data-field');
            const optionValue = this.getAttribute('data-value');
            
            if (questionType && optionValue) {
                selectOption(this, questionType, optionValue);
            } else if (this.classList.contains('toggle-option')) {
                const toggleType = this.getAttribute('data-toggle-field');
                const toggleValue = this.getAttribute('data-toggle-value');
                
                if (toggleType && toggleValue) {
                    toggleOption(this, toggleType, toggleValue);
                }
            }
        });
    });
}

// Handle starting the interactive form
window.startForm = function(service) {
    console.log('Starting form for service:', service);
    
    const interactiveForm = document.getElementById('interactive-form');
    if (!interactiveForm) return;
    
    // Reset form data
    window.formData = {
        name: '',
        company: { isCompany: false, name: '' },
        service: '',
        webLevel: '',
        addOns: [],
        hosting: '',
        referral: { hasReferral: false, name: '' },
        email: '',
        additionalInfo: '',
        newsletter: false
    };
    
    // Pre-select service if needed
    if (service) {
        if (service === 'personal' || service === 'small-business' || service === 'enterprise' || service === 'custom') {
            window.formData.service = 'web-development';
            window.formData.webLevel = service;
        } else {
            window.formData.service = service;
        }
    }
    
    // Reset all questions and selections
    document.querySelectorAll('.form-question').forEach(question => {
        question.classList.remove('active');
    });
    
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Show the form and activate first question
    interactiveForm.style.display = 'block';
    document.getElementById('question-1').classList.add('active');
    
    // Prevent scrolling on body
    document.body.style.overflow = 'hidden';
};

// Close the interactive form
window.closeForm = function() {
    const interactiveForm = document.getElementById('interactive-form');
    if (interactiveForm) {
        interactiveForm.style.display = 'none';
        
        // Reset all questions
        document.querySelectorAll('.form-question').forEach(question => {
            question.classList.remove('active');
        });
        
        // Allow scrolling on body again
        document.body.style.overflow = 'auto';
    }
};

// Navigation functions
window.nextQuestion = function(currentQuestion) {
    // Validate current question
    if (!validateQuestion(currentQuestion)) return;
    
    // Hide current question
    document.getElementById(`question-${currentQuestion}`).classList.remove('active');
    
    // Determine next question based on logic
    let nextQuestionNumber;
    
    if (currentQuestion === 3 && window.formData.service === 'web-development') {
        nextQuestionNumber = '4-web';
    } else if (currentQuestion === 3 && window.formData.service !== 'web-development') {
        nextQuestionNumber = 5;
    } else if (currentQuestion === 4 || currentQuestion === '4-web') {
        nextQuestionNumber = 5;
    } else {
        nextQuestionNumber = currentQuestion + 1;
    }
    
    // Show next question
    document.getElementById(`question-${nextQuestionNumber}`).classList.add('active');
};

window.prevQuestion = function(currentQuestion) {
    // Hide current question
    document.getElementById(`question-${currentQuestion}`).classList.remove('active');
    
    // Determine previous question based on logic
    let prevQuestionNumber;
    
    if (currentQuestion === 5 && window.formData.service === 'web-development') {
        prevQuestionNumber = '4-web';
    } else if (currentQuestion === 5 && window.formData.service !== 'web-development') {
        prevQuestionNumber = 3;
    } else if (currentQuestion === '4-web') {
        prevQuestionNumber = 3;
    } else {
        prevQuestionNumber = currentQuestion - 1;
    }
    
    // Show previous question
    document.getElementById(`question-${prevQuestionNumber}`).classList.add('active');
};

// Form validation
function validateQuestion(questionNumber) {
    if (questionNumber === 1) {
        const nameInput = document.getElementById('client-name');
        if (!nameInput.value.trim()) {
            alert('Please enter your name');
            return false;
        }
        window.formData.name = nameInput.value.trim();
    } else if (questionNumber === 2) {
        if (window.formData.company.isCompany && !document.getElementById('company-name').value.trim()) {
            alert('Please enter your company name');
            return false;
        }
        if (window.formData.company.isCompany) {
            window.formData.company.name = document.getElementById('company-name').value.trim();
        }
    } else if (questionNumber === 3) {
        if (!window.formData.service) {
            alert('Please select a service');
            return false;
        }
    } else if (questionNumber === '4-web') {
        if (!window.formData.webLevel) {
            alert('Please select a service level');
            return false;
        }
    } else if (questionNumber === 5) {
        if (window.formData.referral.hasReferral && !document.getElementById('referral-name').value.trim()) {
            alert('Please enter the name of the person who referred you');
            return false;
        }
        if (window.formData.referral.hasReferral) {
            window.formData.referral.name = document.getElementById('referral-name').value.trim();
        }
    } else if (questionNumber === 6) {
        const emailInput = document.getElementById('client-email');
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
            alert('Please enter a valid email address');
            return false;
        }
        window.formData.email = emailInput.value.trim();
    } else if (questionNumber === 7) {
        window.formData.additionalInfo = document.getElementById('additional-info').value.trim();
    }
    
    return true;
}

// Option selection helpers
window.selectOption = function(btn, field, value) {
    // Remove selected class from all buttons in the same group
    btn.parentNode.querySelectorAll('.option-btn').forEach(button => {
        button.classList.remove('selected');
    });
    
    // Add selected class to clicked button
    btn.classList.add('selected');
    
    // Save data based on field
    if (field === 'company') {
        window.formData.company.isCompany = (value === 'yes');
        document.getElementById('company-name-field').style.display = window.formData.company.isCompany ? 'block' : 'none';
    } else if (field === 'service') {
        window.formData.service = value;
    } else if (field === 'web-level') {
        window.formData.webLevel = value;
        // Show custom options when selecting custom web level
        if (value === 'custom') {
            document.getElementById('custom-options').style.display = 'block';
        } else {
            document.getElementById('custom-options').style.display = 'none';
        }
    } else if (field === 'hosting') {
        window.formData.hosting = value;
    } else if (field === 'referral') {
        window.formData.referral.hasReferral = (value === 'yes');
        document.getElementById('referral-name-field').style.display = window.formData.referral.hasReferral ? 'block' : 'none';
    } else if (field === 'newsletter') {
        window.formData.newsletter = (value === 'yes');
    }
};

window.toggleOption = function(btn, field, value) {
    // Toggle selected class
    btn.classList.toggle('selected');
    
    // Initialize add-ons array if needed
    if (!window.formData.addOns) {
        window.formData.addOns = [];
    }
    
    // Add or remove from array
    if (btn.classList.contains('selected')) {
        if (!window.formData.addOns.includes(value)) {
            window.formData.addOns.push(value);
        }
    } else {
        window.formData.addOns = window.formData.addOns.filter(item => item !== value);
    }
};

// Form submission
window.submitForm = function() {
    console.log('Submitting form data:', window.formData);
    
    // Format add-ons and hosting information
    let additionalServices = '';
    if (window.formData.addOns && window.formData.addOns.length > 0) {
        additionalServices += "Add-on services requested: " + window.formData.addOns.join(', ') + "\n";
    }
    if (window.formData.hosting) {
        additionalServices += "Hosting option: " + window.formData.hosting + "\n";
    }
    
    // Add to additional info
    if (additionalServices) {
        window.formData.additionalInfo = additionalServices + "\n" + (window.formData.additionalInfo || '');
    }
    
    // Prepare email data
    const emailData = {
        name: window.formData.name,
        email: window.formData.email,
        company: window.formData.company?.name || '',
        subject: `New Service Request: ${window.formData.service} ${window.formData.webLevel ? '- ' + window.formData.webLevel : ''}`,
        message: `
Service Type: ${window.formData.service}
${window.formData.webLevel ? 'Service Level: ' + window.formData.webLevel : ''}
${window.formData.company.isCompany ? 'Company: ' + window.formData.company.name : 'Individual Request'}
${window.formData.referral.hasReferral ? 'Referred by: ' + window.formData.referral.name : ''}
${window.formData.newsletter ? 'Subscribed to newsletter: Yes' : 'Subscribed to newsletter: No'}

Additional Information:
${window.formData.additionalInfo || 'None provided'}
        `
    };
    
    // Show loading indicator
    const formStatus = document.createElement('div');
    formStatus.className = 'status-message loading';
    formStatus.innerText = 'Sending your message...';
    document.getElementById('question-8').appendChild(formStatus);
    
    // Send to server
    sendFormData(emailData)
        .then(response => {
            // Remove loading message
            formStatus.remove();
            
            if (response.success) {
                // Show success message
                document.getElementById('question-8').classList.remove('active');
                document.getElementById('form-success').classList.add('active');
            } else {
                alert('There was an error submitting your request: ' + response.message);
            }
        })
        .catch(error => {
            // Remove loading message
            formStatus.remove();
            console.error('Form submission error:', error);
            
            // Show error message but still continue (fallback approach)
            alert('There was an error submitting your request. Please try again or contact us directly at KaynenBPellegrino@Sybertnetics.com');
            
            // Show success message anyway to avoid blocking the user
            document.getElementById('question-8').classList.remove('active');
            document.getElementById('form-success').classList.add('active');
        });
};

// Replace the broken rm() function
window.rm = function() {
    submitForm();
};

// Helper function to send form data to server
async function sendFormData(formData) {
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            return { 
                success: false, 
                message: errorData.message || 'Server error. Please try again.' 
            };
        }
        
        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        return { 
            success: false, 
            message: 'Network error. Please try again later.' 
        };
    }
}

// Email validation
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
