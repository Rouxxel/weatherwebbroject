//List of whitelisted urls for redirects
const whitelist = ['main.html', 'about.html', 'contact.html'];


//----------------------------------------redirect validation---------------------------------------------------------------------------------------------
function redirectTo(url) {
  if (whitelist.includes(url)) {
    window.location.href = url;
  } else {
    console.error('Invalid redirect URL:', url);
    alert('Invalid URL');
  }
}

// Wait for the DOM to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', function() {

  // Add a submit event listener to the form with id 'contactForm'
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Clear previous error messages
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.textContent = '');

    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
   
    let hasError = false;

    // Validate first name
    if (firstName === '') {
      document.getElementById('firstNameError').textContent = 'First name is required';
      hasError = true;
    }

    // Validate last name
    if (lastName === '') {
      document.getElementById('lastNameError').textContent = 'Last name is required';
      hasError = true;
    }

    // Validate email using a regular expression pattern
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email === '') {
      document.getElementById('emailError').textContent = 'Email is required';
      hasError = true;
    } else if (!emailPattern.test(email)) {
      document.getElementById('emailError').textContent = 'Invalid email format';
      hasError = true;  
    }

    // If no validation errors, submit the form
    if (!hasError) {
      alert('Your contact info. has been sent successfully!');
    }
  });
});

