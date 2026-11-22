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


// Creating a project array
const projects = [
    {
        name: "Personal Portfolio",
        description: "A clean, responsive space to share a learning journey, showcase projects, and connect with others.",
        image: "images/project.png",
        technologies: ["HTML", "CSS", "Responsive design"]
    },
    {
        name: "Everyday tasks",
        description: "A simple task manager to help organize the day, track progress, and keep the little things in order.",
        image: "images/to-do list.jpg",
        technologies: ["HTML", "CSS"]
    },
    {
        name: "A little escape",
        description: "A travel-inspired website exploring thoughtful layouts, beautiful imagery, and responsive design.",
        image: "images/OIP.webp",
        technologies: ["HTML", "CSS"]
    }
    // {
    // name: "My Recipe Book",
    // description: "A website for discovering and organizing favourite recipes.",
    // image: "images/recipe-book.png",
    // technologies: ["HTML", "CSS", "JavaScript"]
    // }
];

// const projectNames = projects.map(function (project) {
//     return project.name;
// });

// console.log(projectNames);

function getProjectCount() {
    return projects.length;
}

console.log(getProjectCount());

function getProjectNames() {
    return projects.map(function (project) {
        return project.name;
    });
}

console.log(getProjectNames());

const projectContainer = document.getElementById("project-container");

function displayProjects() {
    projects.forEach(function (project) {
        const projectCard = document.createElement("article");
        projectCard.classList.add("project-card");
        const projectImage = document.createElement("img");
        projectImage.src = project.image;
        projectImage.alt = `Screenshot of ${project.name}`;
        projectImage.classList.add("project-image");

        // Creating project title
        const projectTitle = document.createElement("h2");
        projectTitle.textContent = project.name;

        // Creating project description
        const projectDescription = document.createElement("p");
        projectDescription.textContent = project.description;

        // Creating tags container
        const techTags = document.createElement("div");
        techTags.classList.add("tech-tags");


        project.technologies.forEach(function (technology) {
        const techTag = document.createElement("span");
        techTag.textContent = technology;
        techTags.appendChild(techTag);
        });


        projectCard.appendChild(projectImage);
        projectCard.appendChild(projectTitle);
        projectCard.appendChild(projectDescription);
        projectCard.appendChild(techTags);

        projectContainer.appendChild(projectCard);
    });
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



// Display projects
displayProjects();


projectContainer.addEventListener("click", function (event) {
    // console.log("A project was clicked!");
    const clickedCard = event.target.closest(".project-card");

    if (clickedCard) {
        const projectTitle = clickedCard.querySelector("h2").textContent;
        console.log(projectTitle);    
    }
});