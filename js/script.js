//Name Field
document.getElementById("name").focus();

//Job role
const jobRole = document.querySelector("#title");
const otherJob = document.querySelector("#other-job-role");
otherJob.style.display = 'none';

jobRole.addEventListener('change', (event) => {
    if (event.target.value === 'other') {
        otherJob.style.display = '';
    } else {
        otherJob.style.display = 'none';

    }
});

//T-Shirt info   
const colorSelect = document.querySelector("#color");
colorSelect.disabled = true;

const designDropdown = document.querySelector("#design");
const colorOptions = colorSelect.children;

designDropdown.addEventListener('change', (event) => {
    colorSelect.disabled = false;
    for (let i = 0; i < colorSelect.children.length; i++) {
        const selectedDesign = event.target.value;
        const themeColor = colorSelect.children[i].getAttribute('data-theme');

        if (selectedDesign === themeColor) {
            colorSelect.children[i].hidden = false;
            colorSelect.children[i].setAttribute('selected', true); // Select
        } else {
            colorSelect.children[i].hidden = true; // Hide 
            colorSelect.children[i].removeAttribute('selected'); // Deselect
        }
    }
});

//Activities 
const forActivities = document.querySelector("#activities");
const activitiesCost = document.querySelector("#activities-cost");
let totalCost = 0;

forActivities.addEventListener('change', (event) => {
    const dataCost = +event.target.getAttribute('data-cost');
    if (event.target.checked === true) {
        totalCost += dataCost;

    } else if (event.target.checked === false) {

        totalCost -= dataCost;
    }

    activitiesCost.innerHTML = `Total: $${totalCost}`;
});

//Payment method

const creditCard = document.querySelector("#credit-card");
const paypal = document.querySelector("#paypal");
const bitcoin = document.querySelector("#bitcoin");
paypal.style.display = 'none';
bitcoin.style.display = 'none';

const paymentDropdown = document.querySelector("#payment");
paymentDropdown.children[1].setAttribute('selected', true);

paymentDropdown.addEventListener('change', (event) => {
    if (event.target.value === "credit-card") {
        creditCard.style.display = '';
        bitcoin.style.display = 'none';
        paypal.style.display = 'none';
    } else if (event.target.value === "paypal") {
        paypal.style.display = '';
        creditCard.style.display = 'none';
        bitcoin.style.display = 'none';


    } else if (event.target.value === "bitcoin") {
        bitcoin.style.display = '';
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
    }

});


//Activity Checkboxes
const activityCheckboxes = document.querySelectorAll('#activities input[type="checkbox"]');
activityCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('focus', () => {
        checkbox.parentElement.classList.add('focus');
    });
    checkbox.addEventListener('blur', () => {
        checkbox.parentElement.classList.remove('focus');
    });

    checkbox.addEventListener('change', (event) => {
        const clickedTime = event.target.getAttribute('data-day-and-time');

        activityCheckboxes.forEach(otherCheckbox => {
            const otherTime = otherCheckbox.getAttribute('data-day-and-time');

            if (clickedTime === otherTime && otherCheckbox !== event.target) {
                if (event.target.checked) {
                    otherCheckbox.setAttribute('disabled', true);
                    otherCheckbox.parentElement.classList.add('disabled');
                } else {
                    otherCheckbox.removeAttribute('disabled');
                    otherCheckbox.parentElement.classList.remove('disabled');
                }
            }
        });
    });
});



// Function for email validation
function validateEmail() {
    const emailValue = email.value;
    const emailHintEmpty = document.querySelector("#email-hint-empty");
    const emailHintInvalid = document.querySelector("#email-hint-invalid");


 if (emailValue === '') {
        email.parentElement.classList.add('not-valid');
        email.parentElement.classList.remove('valid');
        emailHintEmpty.style.display = 'block'; 
        emailHintInvalid.style.display = 'none'; 
        return false;
    }

    // Check if the email format is invalid
    const isEmailValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    if (!isEmailValid) {
        email.parentElement.classList.add('not-valid');
        email.parentElement.classList.remove('valid');
        emailHintEmpty.style.display = 'none'; 
        emailHintInvalid.style.display = 'block'; 
        return false;
    }

    // If email is valid
    email.parentElement.classList.add('valid');
    email.parentElement.classList.remove('not-valid');
    emailHintEmpty.style.display = 'none';
    emailHintInvalid.style.display = 'none';
    return true;
}


//Form Validation 
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const cardNumber = document.querySelector("#cc-num");
const zipCode = document.querySelector("#zip");
const cvv = document.querySelector("#cvv");
const form = document.querySelector('#form')

form.addEventListener('submit', (event) => {

    const nameValue = name.value;
    const isNameValid = /^[a-zA-Z\s]+$/.test(nameValue);
    if (!isNameValid) {
        event.preventDefault();
        name.parentElement.classList.add('not-valid');
        name.parentElement.classList.remove('valid');
        name.parentElement.lastElementChild.style.display = 'block';
    } else {
        name.parentElement.classList.add('valid');
        name.parentElement.classList.remove('not-valid');
        name.parentElement.lastElementChild.style.display = 'none';
    }

    const isEmailValid = validateEmail();
    if (!isEmailValid) {
        event.preventDefault();
    }

    if (paymentDropdown.value === "credit-card") {

        const cardNumberValue = cardNumber.value;
        const isCardNumberValid = /^\d{13,16}$/.test(cardNumberValue);
        if (!isCardNumberValid) {
            event.preventDefault();
            cardNumber.parentElement.classList.add('not-valid');
            cardNumber.parentElement.classList.remove('valid');
            cardNumber.parentElement.lastElementChild.style.display = 'block';
        } else {
            cardNumber.parentElement.classList.add('valid');
            cardNumber.parentElement.classList.remove('not-valid');
            cardNumber.parentElement.lastElementChild.style.display = 'none';
        }



        const zipCodeValue = zipCode.value;
        const isZipCodeValid = /^\d{5}$/.test(zipCodeValue);
        if (!isZipCodeValid) {
            event.preventDefault();
            zipCode.parentElement.classList.add('not-valid');
            zipCode.parentElement.classList.remove('valid');
            zipCode.parentElement.lastElementChild.style.display = 'block';
        } else {
            zipCode.parentElement.classList.add('valid');
            zipCode.parentElement.classList.remove('not-valid');
            zipCode.parentElement.lastElementChild.style.display = 'none';
        }


        const cvvValue = cvv.value;
        const isCvvValid = /^\d{3}$/.test(cvvValue);
        if (!isCvvValid) {
            event.preventDefault();
            cvv.parentElement.classList.add('not-valid');
            cvv.parentElement.classList.remove('valid');
            cvv.parentElement.lastElementChild.style.display = 'block';
        } else {
            cvv.parentElement.classList.add('valid');
            cvv.parentElement.classList.remove('not-valid');
            cvv.parentElement.lastElementChild.style.display = 'none';
        }
    }


    const isForActivitiesValid = forActivities.querySelectorAll('input:checked').length > 0;
    const activitiesHint = document.querySelector("#activities-hint");
    if (!isForActivitiesValid) {
        event.preventDefault();
        forActivities.classList.add('not-valid');
        forActivities.classList.remove('valid');
        activitiesHint.style.display = 'block';
    } else {
        forActivities.classList.add('valid');
        forActivities.classList.remove('not-valid');
        activitiesHint.style.display = 'none';
    }

});


email.addEventListener('keyup', validateEmail);
