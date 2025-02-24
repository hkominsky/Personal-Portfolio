  /** THEME TOGGLE FUNCTIONALITY **/
  const changeTheme = () => {
    const root = document.documentElement;
    const currTheme = root.getAttribute("page-theme");
    const newTheme = currTheme === "dark" ? "light" : "dark";

    document.querySelector(".toggle").classList.toggle("active");
    root.setAttribute("page-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    ["location", "linkedin", "github", "me", "logo"].forEach(id => {
      document.getElementById(`${id}-icon`).src = `images/${id}-${newTheme}.png`;
    });
  };

document.addEventListener("DOMContentLoaded", () => {
  /** SMOOTH SCROLL FUNCTIONALITY **/
  const redirectOffset = 100;
  document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetElement = document.getElementById(anchor.getAttribute("href").substring(1));

      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop - redirectOffset, behavior: "smooth" });
      }
    });
  });

  /** CONTACT FORM SUBMISSION **/
  const URL = "https://script.google.com/macros/s/AKfycbwXEQ8Fu2jBDr7KLDNASK6njDyu9RQakWUnvG_lV5nJrq5IyDhcF06KvSlIaBrJNYw3Ow/exec";
  const contactForm = document.getElementById('contactForm');
  const apiResponse = document.getElementById('apiResponse');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitButton = contactForm.querySelector('input[type="submit"]');
      const formElements = contactForm.querySelectorAll('input, textarea');

      // Disable form elements during submission
      formElements.forEach(el => { el.disabled = true; el.style.cursor = "wait"; });
      submitButton.disabled = true;
      document.body.style.cursor = "wait";

      const formData = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        message: contactForm.message.value
      };

      const firstName = formData.name.split(" ")[0];
      apiResponse.textContent = `Your message is being sent, ${firstName}...`;
      apiResponse.style.display = "block";

      fetch(URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      .then(() => {
        contactForm.reset();
        apiResponse.textContent = "Message sent! I’ll reach out to you as soon as possible.";
        apiResponse.className = "contact-api-response success";
      })
      .catch(() => {
        apiResponse.textContent = "There was an error sending your message. Please try again!";
        apiResponse.className = "contact-api-response error";
      })
      .finally(() => {
        formElements.forEach(el => { el.disabled = false; el.style.cursor = "text"; });
        submitButton.disabled = false;
        document.body.style.cursor = "default";

        setTimeout(() => apiResponse.style.display = "none", 5000);
      });
    });
  } else {
    console.error("contactForm not found in the DOM!");
  }

  /** PROJECT MODAL FUNCTIONALITY **/
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const closeBtn = document.querySelector('.close-btn');
  const experienceArticles = document.querySelectorAll('#experience .roles article');

  const workExperiences = [
    { title: "Data Engineer Intern, J&K Semainrs", description: "As a data analyst intern, I worked on a team that developed a new inventory system for the company. I was responsible for creating dynamic visualizations of the data and writing SQL queries to optimize the system. I also worked on the backend of the system, writing code in Python and SQL." },
    { title: "Reinsurance Modeling Co-Op, Guy Carpenter", description: "As a data analyst intern, I worked on a team that developed a new inventory system for the company. I was responsible for creating dynamic visualizations of the data and writing SQL queries to optimize the system. I also worked on the backend of the system, writing code in Python and SQL." },
    { title: "Quantitative Developer Co-Op, Scotiabank", description: "As a software developer intern, I worked on a team that developed a new mobile banking application. I was responsible for implementing new features and fixing bugs in the application. I also worked on the backend of the application, writing code in Java and SQL." },
  ];

  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };

  experienceArticles.forEach((item, index) => {
    item.addEventListener('click', () => {
      modalTitle.textContent = workExperiences [index].title;
      modalDescription.textContent = workExperiences [index].description;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

});
