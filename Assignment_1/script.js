
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

document.getElementById("year").textContent = new Date().getFullYear();

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    showMessage("Please fill in all fields.", "error");
    return;
  }

  if (!emailPattern.test(email)) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  showMessage("Thanks! Your form passed validation.", "success");
  contactForm.reset();
});

function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = "form-message " + type;
}
