// console.log ("It is working")

// Theme-toggle
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

     if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "Light Mode";
    }
    
    else {
        themeToggle.textContent = "Dark Mode";
    }

    // localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
    localStorage.setItem("themePreference", JSON.stringify(document.body.classList.contains("dark-mode") ? "dark" : "light"));

});

// const savedTheme = localStorage.getItem("theme");
try {
    const savedTheme = JSON.parse(localStorage.getItem("themePreference"));

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "Light Mode";
    } else {
        document.body.classList.remove("dark-mode");
        themeToggle.textContent = "Dark Mode";
    }
} catch (error) {
    console.error("Unable to load theme preference:", error);
}


// Validations
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

