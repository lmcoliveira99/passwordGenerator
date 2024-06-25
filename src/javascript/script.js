// Function to get the selected character types
function getChartTypes() {
    const uppercase = document.querySelector('#uppercase').checked;
    const lowercase = document.querySelector('#lowercase').checked;
    const number = document.querySelector('#number').checked;
    const specialCharacter = document.querySelector('#special-char').checked;

    const charTypes = [];

    if (uppercase) {
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }

    if (lowercase) {
        charTypes.push('abcdefghijklmnopqrstuvwxyz');
    }

    if (number) {
        charTypes.push('0123456789');
    }

    if (specialCharacter) {
        charTypes.push('!@#$%^&*()_-+={}[]|\\/?><:;"\'.,~`');
    }

    return charTypes;
}

// Function to get the desired password size
function getPasswordSize() {
    const size = document.querySelector('#length').value;

    if (isNaN(size) || size < 4 || size > 16) {
        displayError('Invalid size, must be a number between 4 and 16');
        return null;
    }

    clearError(); // Clear any existing error message
    return size;
}

// Function to display an error message
function displayError(message) {
    const errorElement = document.createElement('p');
    errorElement.textContent = message;
    errorElement.classList.add('error'); // Apply error styling
    const passwordItems = document.querySelector('#password-items');
    passwordItems.appendChild(errorElement);
}

// Function to clear error messages
function clearError() {
    const errorElement = document.querySelector('.error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Function to generate a password with specified size and character types
function generatePassword(size, charTypes) {
    let passwordGenerated = '';

    const selectedChars = charTypes.join('');

    charTypes.forEach(type => {
        passwordGenerated += type[Math.floor(Math.random() * type.length)];
    });

    while (passwordGenerated.length < size) {
        passwordGenerated += selectedChars[Math.floor(Math.random() * selectedChars.length)];
    }

    passwordGenerated = passwordGenerated.split('').sort(() => Math.random() - 0.5).join('');

    return passwordGenerated;
}

// Function to display a message using Toastify library
function message(text, status = 'success') {
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: status === 'success' ? '#84cc16' : '#dc2626',
            boxShadow: 'none'
        }
    }).showToast();
}

// Event listener for the "Generate" button
document.querySelector('#generate').addEventListener('click', function () {
    const size = getPasswordSize();
    if (size === null) {
        return;
    }

    const charTypes = getChartTypes();
    if (charTypes.length === 0) {
        displayError('Select at least one character type!');
        return;
    }

    clearError(); // Clear any existing error message

    const passwordGenerated = generatePassword(size, charTypes);

    document.querySelector('#password-container').classList.add('show');
    document.querySelector('#password').textContent = passwordGenerated;
});

// Event listener for the "Copy" button
document.querySelector('#copy').addEventListener('click', function () {
    navigator.clipboard.writeText(document.querySelector('#password').textContent);
    message('Password copied!', 'success');
});
