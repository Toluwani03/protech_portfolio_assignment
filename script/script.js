console.log ("It is working")

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const message = document.getElementById("message").value.trim()

    // Name validation
    const nameError = document.getElementById("name-error");

    console.log(name.length)

    if (name.length < 3) {
        nameError.textContent = "Name must be at least 3 characters long.";
        return;
    }
    
    else {
        nameError.textContent = "";
    }

    // Email validation
    const emailError = document.getElementById("email-error");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        return;
    }
    
    else {
        emailError.textContent = "";
    }

    // Message validation
    const messageError = document.getElementById("message-error")

    if (message.length < 10) {
        messageError.textContent = "Message must be at least 10 characters long.";
        return;
    } 
    
    else {
        messageError.textContent = "";
    }

    console.log(name, email, message);
});

