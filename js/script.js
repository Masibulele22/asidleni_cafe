// Function to collapse the navbar on click and enable smooth scrolling
document.querySelectorAll(".navbar-nav a").forEach((link) => {
    link.addEventListener("click", function () {
        // Collapse the navbar (for mobile views)
        const navbarToggler = document.querySelector(".navbar-toggler");
        const navbarCollapse = document.querySelector(".navbar-collapse");

        if (navbarCollapse.classList.contains("show")) {
            navbarToggler.click(); // Simulates click to collapse the navbar
        }

        // Smooth scroll to the target section
        const targetSection = document.querySelector(
            this.getAttribute("href")
        );
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 60, // Adjust for fixed navbar height
                behavior: "smooth",
            });
        }
    });
});

document
    .querySelector("form")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from submitting and refreshing the page

        // Get the form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const guests = parseInt(document.getElementById("guests").value);

        // Validation checks for empty fields
        if (!name) {
            alert("Please enter your name.");
            return;
        }
        if (!email) {
            alert("Please enter your email.");
            return;
        }
        if (!date) {
            alert("Please select a date.");
            return;
        }
        if (!time) {
            alert("Please select a time.");
            return;
        }
        if (!guests || guests <= 0) {
            alert("Please enter a valid number of guests.");
            return;
        }

        // Validate email format
        const emailPattern =
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Parse the selected date and time
        const selectedDateTime = new Date(`${date}T${time}`);

        // Get the current date and time
        const currentDateTime = new Date();

        // Set constraints: at least 1 hour in the future
        const oneHourLater = new Date();
        oneHourLater.setHours(currentDateTime.getHours() + 1);

        // Set the maximum date for booking (7 days from the current time)
        const oneWeekLater = new Date(
            currentDateTime.getTime() + 7 * 24 * 60 * 60 * 1000
        );

        // Check if the selected date is within the business hours (8 AM to 10 PM)
        const selectedDay = selectedDateTime.getDay(); // 0 = Sunday, 6 = Saturday
        const selectedHours = selectedDateTime.getHours();

        // Time and business day validation
        if (selectedDateTime < oneHourLater) {
            alert("Please select a time at least 1 hour from now.");
            return;
        }
        if (selectedDateTime > oneWeekLater) {
            alert("Bookings cannot be made more than 7 days in advance.");
            return;
        }
        if (selectedHours < 8 || selectedHours >= 22) {
            alert("Reservations can only be made between 8 AM and 10 PM.");
            return;
        }
        if (selectedDay < 1 || selectedDay > 7) {
            alert("Please select a valid day between Monday and Sunday.");
            return;
        }

        // Validate guest count (no more than 10 guests)
        if (guests > 10) {
            alert("Bookings cannot be made for more than 10 guests.");
            return;
        }

        // Create an alert message if all validations pass
        const message = `Reservation Confirmed!
    Name: ${name}
    Email: ${email}
    Date: ${date}
    Time: ${time}
    Guests: ${guests}`;

        alert(message);

        // Redirect to home page after the alert
        window.location.href = "index.html"; // Replace with your home page URL
    });

function showImage(imagePath, title) {
    document.getElementById('modalImage').src = imagePath;
    document.getElementById('imageModalLabel').textContent = title;
}
