const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');
const submit = document.getElementById('submit');

let isValid = false;
let passwordMatch = false;

// Utility Functions
function manageMessageContainer(errorMessage, messageColor, containerColor) {
    message.textContent = errorMessage;
    message.style.color = messageColor;
    messageContainer.style.borderColor = containerColor;
}

function validateForm() {
    // using constraint API
    isValid = form.checkValidity();;

    // style main message for an error
    if (!isValid) {
        manageMessageContainer('Please fill all fields.', 'red', 'red');
        return;
    }

    if (password2El.value === password1El.value) {
        passwordMatch = true;
        password1El.style.borderColor = 'green';
        password2El.style.borderColor = 'green';
    } else {
        passwordMatch = false;
        password1El.style.borderColor = 'red';
        password2El.style.borderColor = 'red';
        manageMessageContainer('Make sure password match', 'red', 'red');
        return;
    }

    if (isValid && passwordMatch) {
        manageMessageContainer('Successfully Registered', 'green', 'green');
    }
    return true;
}



function storeFormData() {
    debugger;
    const user = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        website: form.website.value,
        password: form.password.value,
    }
    console.log(user);
}

function processFormData(e) {
    e.preventDefault();
    // Validate our Form
    validateForm() && storeFormData();
}

// Event Listeners
form.addEventListener('submit', processFormData);