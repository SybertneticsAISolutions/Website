// Enhanced form-handler.js with fixes for Sybertnetics website
document.addEventListener('DOMContentLoaded', function() {
    console.log('Form handler initializing...');

// Extra debugging to check for forms
document.querySelectorAll('form').forEach((form, index) => {
    console.log(`Form ${index + 1} found with ID: ${form.id}, class: ${form.className}`);
});

// Initialize direct form event listeners for standalone forms
document.querySelectorAll('form').forEach(form => {
    // Skip forms that aren't contact forms or already have event handlers
    if (!form.classList.contains('contact-form') && !form.classList.contains('initialized')) {
        form.classList.add('initialized');
        
        console.log('Adding submit event to form:', form);
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted directly');
            
            // Gather form data
            const formData = {
                name: form.querySelector('[name="name"], #name')?.value || '',
                email: form.querySelector('[name="email"], #email')?.value || '',
                subject: form.querySelector('[name="subject"], #subject')?.value || 'Website Form Submission',
                message: form.querySelector('[name="message"], #message')?.value || '',
                company: form.querySelector('[name="company"], #company')?.value || ''
            };
            
            // Validate
            if (!formData.name || !formData.email) {
                alert('Please complete all required fields');
                return;
            }
            
            // Show loading
            const submitButton = form.querySelector('button[type="submit"], input[type="submit"], .btn[type="submit"]');
            const originalText = submitButton ? submitButton.innerText : null;
            if (submitButton) {
                submitButton.innerText = 'Sending...';
                submitButton.disabled = true;
            }
            
            // Send
            sendFormData(formData)
                .then(response => {
                    if (submitButton) {
                        submitButton.innerText = originalText || 'Submit';
                        submitButton.disabled = false;
                    }
                    
                    if (response.success) {
                        alert('Thank you! Your message has been sent successfully.');
                        form.reset();
                    } else {
                        alert('There was a problem sending your message: ' + response.message);
                    }
                })
                .catch(error => {
                    console.error('Form submission error:', error);
                    
                    if (submitButton) {
                        submitButton.innerText = originalText || 'Submit';
                        submitButton.disabled = false;
                    }
                    
                    alert('There was a problem sending your message. Please try again later.');
                });
        });
    }
});
    
    // Initialize form data object if not already set
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
    
    // Setup all contact forms on the site
    setupContactForms();
    
    // Setup interactive form triggers
    setupFormTriggers();
    
    // Setup navigation for interactive form questions
    setupFormNavigation();
    
    // Setup direct event handlers for specifically problematic buttons
    setupDirectEventHandlers();
    
    // Setup enter key handling
    setupEnterKeyHandling();
});

// Setup all regular contact forms (main page and investors page)
function setupContactForms() {
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(form => {
        if (!form.classList.contains('initialized')) {
            form.classList.add('initialized');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Contact form submitted');
                
                // Get form data
                const nameInput = form.querySelector('#name') || form.querySelector('[name="name"]');
                const emailInput = form.querySelector('#email') || form.querySelector('[name="email"]');
                const subjectInput = form.querySelector('#subject') || form.querySelector('[name="subject"]');
                const messageInput = form.querySelector('#message') || form.querySelector('[name="message"]');
                const companyInput = form.querySelector('#company') || form.querySelector('[name="company"]');
                const investorTypeInput = form.querySelector('#investor-type') || form.querySelector('[name="investor-type"]');
                
                const formData = {
                    name: nameInput ? nameInput.value : '',
                    email: emailInput ? emailInput.value : '',
                    subject: subjectInput ? subjectInput.value : 'Contact Form Submission',
                    message: messageInput ? messageInput.value : '',
                    company: companyInput ? companyInput.value : '',
                    investorType: investorTypeInput ? investorTypeInput.value : ''
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
                loadingIndicator.style.padding = '10px';
                loadingIndicator.style.background = 'rgba(0,0,0,0.7)';
                loadingIndicator.style.color = '#fff';
                loadingIndicator.style.borderRadius = '5px';
                loadingIndicator.style.margin = '10px 0';
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
                        if (loadingIndicator.parentNode === form) {
                            form.removeChild(loadingIndicator);
                        }
                        console.error('Form submission error:', error);
                        alert('There was a problem sending your message. Please try again later or contact us directly at KaynenBPellegrino@Sybertnetics.com');
                    });
            });
        }
    });
}

// Setup triggers for interactive form
function setupFormTriggers() {
    const serviceButtons = document.querySelectorAll('button[onclick*="startForm"], .btn[onclick*="startForm"]');
    serviceButtons.forEach(button => {
        const onclickAttr = button.getAttribute('onclick');
        if (onclickAttr) {
            // Extract service name from onclick attribute
            const match = onclickAttr.match(/startForm\(['"](.*)['"]\)/);
            const serviceName = match ? match[1] : '';
            
            // Replace onclick with event listener
            button.removeAttribute('onclick');
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                startForm(serviceName);
            });
        }
    });
}

// Setup navigation for interactive form questions
function setupFormNavigation() {
    // Setup next/prev buttons
    document.querySelectorAll('.form-buttons .btn').forEach(button => {
        if (button.innerText.includes('Next') || button.id.startsWith('next-')) {
            const questionElement = button.closest('.form-question');
            if (questionElement) {
                const questionId = questionElement.id;
                const questionNumber = questionId.replace('question-', '');
                
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    nextQuestion(questionNumber);
                });
            }
        } else if (button.innerText.includes('Back') || button.id.startsWith('prev-')) {
            const questionElement = button.closest('.form-question');
            if (questionElement) {
                const questionId = questionElement.id;
                const questionNumber = questionId.replace('question-', '');
                
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    prevQuestion(questionNumber);
                });
            }
        } else if (button.innerText.includes('Submit') || button.id === 'submit-form') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                submitForm();
            });
        }
    });
    
    // Setup option buttons
    document.querySelectorAll('.option-btn').forEach(button => {
        if (button.hasAttribute('onclick')) {
            const onclickAttr = button.getAttribute('onclick');
            
            // For regular option selection
            if (onclickAttr.includes('selectOption')) {
                const match = onclickAttr.match(/selectOption\(this,\s*['"](.*)['"]\s*,\s*['"](.*)['"]\s*\)/);
                if (match) {
                    const field = match[1];
                    const value = match[2];
                    button.removeAttribute('onclick');
                    button.setAttribute('data-field', field);
                    button.setAttribute('data-value', value);
                    
                    button.addEventListener('click', function() {
                        selectOption(this, field, value);
                    });
                }
            }
            // For toggle options
            else if (onclickAttr.includes('toggleOption')) {
                const match = onclickAttr.match(/toggleOption\(this,\s*['"](.*)['"]\s*,\s*['"](.*)['"]\s*\)/);
                if (match) {
                    const field = match[1];
                    const value = match[2];
                    button.removeAttribute('onclick');
                    button.classList.add('toggle-option');
                    button.setAttribute('data-toggle-field', field);
                    button.setAttribute('data-toggle-value', value);
                    
                    button.addEventListener('click', function() {
                        toggleOption(this, field, value);
                    });
                }
            }
        } else if (button.hasAttribute('data-field') && button.hasAttribute('data-value')) {
            // For buttons with data attributes already set
            const field = button.getAttribute('data-field');
            const value = button.getAttribute('data-value');
            
            button.addEventListener('click', function() {
                selectOption(this, field, value);
            });
        } else if (button.classList.contains('toggle-option') && 
                  button.hasAttribute('data-toggle-field') && 
                  button.hasAttribute('data-toggle-value')) {
            // For toggle buttons with data attributes already set
            const field = button.getAttribute('data-toggle-field');
            const value = button.getAttribute('data-toggle-value');
            
            button.addEventListener('click', function() {
                toggleOption(this, field, value);
            });
        } else {
            // Try to get field/value from parent container
            const parent = button.closest('.options-grid');
            if (parent && parent.hasAttribute('data-field')) {
                const field = parent.getAttribute('data-field');
                const value = button.textContent.trim().toLowerCase();
                
                button.addEventListener('click', function() {
                    selectOption(this, field, value);
                });
            }
        }
    });
}

// Setup direct event handlers for problematic elements
function setupDirectEventHandlers() {
    // Close button (X) at top of form
    const closeButton = document.querySelector('.form-close');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            closeForm();
        });
    }
    
    // Success close button
    const closeSuccessButton = document.querySelector('#form-success .btn, .form-success .btn');
    if (closeSuccessButton) {
        closeSuccessButton.addEventListener('click', function() {
            closeForm();
        });
    }
}

// Setup enter key handling
function setupEnterKeyHandling() {
    document.addEventListener('keydown', function(event) {
        // Check if the key pressed is Enter
        if (event.key === 'Enter') {
            // Find the currently active question
            const activeQuestion = document.querySelector('.form-question.active');
            if (activeQuestion) {
                // Get the question number from the ID
                const questionId = activeQuestion.id;
                const questionNumber = questionId.replace('question-', '');
                
                // If user is on an input field
                const focusedElement = document.activeElement;
                if (focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA') {
                    // Trigger the next button
                    event.preventDefault();
                    nextQuestion(questionNumber);
                }
            }
        }
    });
}

// Handle starting the interactive form
window.startForm = function(service) {
    console.log('Starting form for service:', service);
    
    const interactiveForm = document.getElementById('interactive-form');
    if (!interactiveForm) {
        console.error('Interactive form not found');
        return;
    }
    
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
    console.log('Closing form');
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
    console.log('Moving to next question from:', currentQuestion);
    
    // Validate current question
    if (!validateQuestion(currentQuestion)) return;
    
    // Hide current question
    const currentQuestionElement = document.getElementById(`question-${currentQuestion}`);
    if (currentQuestionElement) {
        currentQuestionElement.classList.remove('active');
    }
    
    // Determine next question based on logic
    let nextQuestionNumber;
    
    if (currentQuestion === '3' && window.formData.service === 'web-development') {
        // If user selected web development, go to web development level question
        nextQuestionNumber = '4-web';
    } else if (currentQuestion === '3' && window.formData.service !== 'web-development') {
        // If user selected something else, skip web development specific question
        nextQuestionNumber = '5';
    } else if (currentQuestion === '4-web') {
        // After web development level, go to question 5
        nextQuestionNumber = '5';
    } else {
        // Standard increment to next question
        nextQuestionNumber = String(parseInt(currentQuestion) + 1);
    }
    
    console.log('Next question will be:', nextQuestionNumber);
    
    // Show next question
    const nextQuestionElement = document.getElementById(`question-${nextQuestionNumber}`);
    if (nextQuestionElement) {
        nextQuestionElement.classList.add('active');
    } else {
        console.error(`Question element question-${nextQuestionNumber} not found`);
        alert(`Error navigating to next question. Please try again or contact support.`);
    }
};

window.prevQuestion = function(currentQuestion) {
    console.log('Moving to previous question from:', currentQuestion);
    
    // Hide current question
    const currentQuestionElement = document.getElementById(`question-${currentQuestion}`);
    if (currentQuestionElement) {
        currentQuestionElement.classList.remove('active');
    }
    
    // Determine previous question based on logic
    let prevQuestionNumber;
    
    if (currentQuestion === '5' && window.formData.service === 'web-development') {
        prevQuestionNumber = '4-web';
    } else if (currentQuestion === '5' && window.formData.service !== 'web-development') {
        prevQuestionNumber = '3';
    } else if (currentQuestion === '4-web') {
        prevQuestionNumber = '3';
    } else {
        // Convert to number and subtract 1, then back to string
        prevQuestionNumber = String(parseInt(currentQuestion) - 1);
    }
    
    console.log('Previous question will be:', prevQuestionNumber);
    
    // Show previous question
    const prevQuestionElement = document.getElementById(`question-${prevQuestionNumber}`);
    if (prevQuestionElement) {
        prevQuestionElement.classList.add('active');
    } else {
        console.error(`Question element question-${prevQuestionNumber} not found`);
    }
};

// Form validation
function validateQuestion(questionNumber) {
    console.log('Validating question:', questionNumber);
    
    if (questionNumber === '1') {
        const nameInput = document.getElementById('client-name');
        if (!nameInput || !nameInput.value.trim()) {
            alert('Please enter your name');
            return false;
        }
        window.formData.name = nameInput.value.trim();
    } else if (questionNumber === '2') {
        if (window.formData.company.isCompany) {
            const companyNameInput = document.getElementById('company-name');
            if (!companyNameInput || !companyNameInput.value.trim()) {
                alert('Please enter your company name');
                return false;
            }
            window.formData.company.name = companyNameInput.value.trim();
        }
    } else if (questionNumber === '3') {
        if (!window.formData.service) {
            alert('Please select a service');
            return false;
        }
    } else if (questionNumber === '4-web') {
        if (!window.formData.webLevel) {
            alert('Please select a service level');
            return false;
        }
    } else if (questionNumber === '5') {
        if (window.formData.referral.hasReferral) {
            const referralNameInput = document.getElementById('referral-name');
            if (!referralNameInput || !referralNameInput.value.trim()) {
                alert('Please enter the name of the person who referred you');
                return false;
            }
            window.formData.referral.name = referralNameInput.value.trim();
        }
    } else if (questionNumber === '6') {
        const emailInput = document.getElementById('client-email');
        if (!emailInput || !emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
            alert('Please enter a valid email address');
            return false;
        }
        window.formData.email = emailInput.value.trim();
    } else if (questionNumber === '7') {
        const additionalInfoInput = document.getElementById('additional-info');
        if (additionalInfoInput) {
            window.formData.additionalInfo = additionalInfoInput.value.trim();
        }
    }
    
    return true;
}

// Option selection helpers
window.selectOption = function(btn, field, value) {
    console.log('Option selected:', field, value);
    
    // Remove selected class from all buttons in the same group
    const buttonsInGroup = btn.closest('.options-grid').querySelectorAll('.option-btn');
    buttonsInGroup.forEach(button => {
        button.classList.remove('selected');
    });
    
    // Add selected class to clicked button
    btn.classList.add('selected');
    
    // Save data based on field
    if (field === 'company') {
        window.formData.company.isCompany = (value === 'yes');
        const companyNameField = document.getElementById('company-name-field');
        if (companyNameField) {
            companyNameField.style.display = window.formData.company.isCompany ? 'block' : 'none';
        }
    } else if (field === 'service') {
        window.formData.service = value;
    } else if (field === 'web-level') {
        window.formData.webLevel = value;
        // Show custom options when selecting custom web level
        const customOptions = document.getElementById('custom-options');
        if (customOptions) {
            customOptions.style.display = value === 'custom' ? 'block' : 'none';
        }
    } else if (field === 'hosting') {
        window.formData.hosting = value;
    } else if (field === 'referral') {
        window.formData.referral.hasReferral = (value === 'yes');
        const referralNameField = document.getElementById('referral-name-field');
        if (referralNameField) {
            referralNameField.style.display = window.formData.referral.hasReferral ? 'block' : 'none';
        }
    } else if (field === 'newsletter') {
        window.formData.newsletter = (value === 'yes');
    }
};

window.toggleOption = function(btn, field, value) {
    console.log('Option toggled:', field, value);
    
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
    const questionElement = document.getElementById('question-8');
    if (questionElement) {
        const formStatus = document.createElement('div');
        formStatus.className = 'status-message loading';
        formStatus.innerText = 'Sending your message...';
        formStatus.style.padding = '10px';
        formStatus.style.background = 'rgba(0,0,0,0.7)';
        formStatus.style.color = '#fff';
        formStatus.style.borderRadius = '5px';
        formStatus.style.margin = '10px 0';
        questionElement.appendChild(formStatus);
    }
    
    // Send to server
    sendFormData(emailData)
        .then(response => {
            // Remove loading message if it exists
            const statusMessage = document.querySelector('.status-message');
            if (statusMessage && statusMessage.parentNode) {
                statusMessage.parentNode.removeChild(statusMessage);
            }
            
            if (response.success) {
                // Show success message
                document.getElementById('question-8').classList.remove('active');
                document.getElementById('form-success').classList.add('active');
            } else {
                alert('There was an error submitting your request: ' + response.message);
            }
        })
        .catch(error => {
            // Remove loading message if it exists
            const statusMessage = document.querySelector('.status-message');
            if (statusMessage && statusMessage.parentNode) {
                statusMessage.parentNode.removeChild(statusMessage);
            }
            
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
        console.log('Sending form data to server:', formData);
        
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const responseData = await response.json();
        console.log('Server response:', responseData);
        
        if (!response.ok) {
            return { 
                success: false, 
                message: responseData.message || 'Server error. Please try again.' 
            };
        }
        
        return responseData;
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
