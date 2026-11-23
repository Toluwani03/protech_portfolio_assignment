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

    // console.log(name.length)

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


// Event listener and Event delegation
projectContainer.addEventListener("click", function (event) {
    // console.log("A project was clicked!");
    const clickedCard = event.target.closest(".project-card");

    if (clickedCard) {
        const projectTitle = clickedCard.querySelector("h2").textContent;
        console.log(projectTitle);    
    }
});



// Post Explorer elements
const postSearch = document.getElementById("post-search");
// const userFilter = document.getElementById("user-filter");
const postsContainer = document.getElementById("posts-container");
const postsStatus = document.getElementById("posts-status");



// Store fetched posts
let allPosts = [];

// Fetch posts from API
async function fetchPosts() {
    postsStatus.textContent = "Loading posts...";

    try {
        const response = await fetch("https://dev.to/api/articles?per_page=5");

        if (!response.ok) {
            throw new Error("Unable to fetch posts");
        }

        allPosts = (await response.json()).slice(0, 5);

        postsStatus.textContent = `Successfully loaded ${allPosts.length} posts.`;

        displayPosts(allPosts);

    } 
    catch (error) {
        postsStatus.textContent = "Unable to load posts. Please try again.";
        console.error("Error fetching posts:", error);
    }
}

// Call the function
fetchPosts();


// Display fetched posts
function displayPosts(posts) {
    postsContainer.textContent = "";

    posts.forEach(function (post) {
        const postCard = document.createElement("article");
        postCard.classList.add("project-card");

        const postTitle = document.createElement("h2");
        postTitle.textContent = post.title;

        const postBody = document.createElement("p");
        postBody.textContent = post.body;

        const postUser = document.createElement("small");
        postUser.textContent = `Posted by User ${post.user.name}`;

        postCard.appendChild(postTitle);
        postCard.appendChild(postBody);
        postCard.appendChild(postUser);

        postsContainer.appendChild(postCard);
    });
}


// Search posts
function searchPosts(searchTerm) {
    const filteredPosts = allPosts.filter(function (post) {
        return post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               post.description.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return filteredPosts;
}

// Search input event
postSearch.addEventListener("input", function () {
    const searchTerm = postSearch.value.trim();

    const filteredPosts = searchPosts(searchTerm);

    displayPosts(filteredPosts);
});

// Filter posts by user
// function filterPosts(userId) {
//     if (userId === "all") {
//         return allPosts;
//     }

//     return allPosts.filter(function (post) {
//         return post.userId === Number(userId);
//     });
// }

// Filter dropdown event
// userFilter.addEventListener("change", function () {
//     const selectedUser = userFilter.value;

//     const filteredPosts = filterPosts(selectedUser);

//     displayPosts(filteredPosts);
// });