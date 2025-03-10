// Theme functionality
const applyTheme = (theme) => {
  const root = document.documentElement;
  root.setAttribute("page-theme", theme);
  
  // Update theme toggle button state
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeToggleContainer = document.querySelector(".theme-toggle");
  
  if (themeToggleContainer) {
    themeToggleContainer.classList.toggle("active", theme === "dark");
  }

  // Update image sources based on theme
  const updateImageSource = (element, imageId) => {
    if (element) {
      element.src = `/images/${imageId}-${theme}.png`;
    }
  };

  // Update theme toggle button image
  updateImageSource(document.querySelector('.theme-toggle img'), 'theme');
  // Update logo and other images
  updateImageSource(document.querySelector('.logo-icon img'), 'logo');

  ["location", "linkedin", "github", "me"].forEach(id => {
    updateImageSource(document.getElementById(`${id}-icon`), id);
  });

    // Update card icons (switching between code-light.svg and code-dark.svg)
    document.querySelectorAll(".card-icon img").forEach(img => {
      img.src = `/images/icons/code-${theme}.svg`;
    });
};

// This function is called by the onClick attribute in HTML
function changeTheme() {
  const root = document.documentElement;
  const currTheme = root.getAttribute("page-theme");
  const newTheme = currTheme === "dark" ? "light" : "dark";
  
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
}

document.addEventListener("DOMContentLoaded", () => {
  // Load saved theme or default to "light"
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
  
  function updateLogoText() {
    let logoText = document.querySelector(".logo-text");
    if (logoText) {
      logoText.textContent = window.innerWidth <= 450 ? "Hugh" : "Hugh Kominsky";
    }
  }

  window.addEventListener("resize", updateLogoText);

  fetch('/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
      updateLogoText(); // Ensure logo text updates after header is loaded
      
      // Re-apply theme to ensure header elements get correct theme after loading
      const currentTheme = localStorage.getItem("theme") || "light";
      applyTheme(currentTheme);
      
      setupMobileMenu();
    })
    .catch(error => console.error("Error loading the header:", error));

  fetch('/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error("Error loading the footer:", error));

  const pageOffset = 110;
  setTimeout(() => {
    if (window.location.hash) {
      const targetElement = document.getElementById(window.location.hash.substring(1));
      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop - pageOffset, behavior: "smooth" });
      }
    }
  }, 100);

  document.addEventListener('click', (e) => {
    let anchor = e.target.closest("a[href*='#']");
    if (anchor) {
      let targetElement = document.getElementById(anchor.getAttribute("href").split('#')[1]);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({ top: targetElement.offsetTop - pageOffset, behavior: "smooth" });
        history.pushState(null, null, `#${targetElement.id}`);
      }
    }
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
    const modalCompany = document.getElementById('modal-company');
    const modalLocation = document.getElementById('modal-location');
    const modalDates = document.getElementById('modal-dates');
    const closeBtn = document.querySelector('.close-btn');
    const experienceSpans = document.querySelectorAll('#experience .roles article span');
  
    const workExperiences = [
      { 
        title: "Quantitative Developer Co-Op", 
        company: "Scotiabank",
        location: "New York City, NY",
        dates: "December 2024 - Present",
        description: `
          - Recognizing the need for improved risk assessment models, I assisted in developing tools to analyze large datasets using SQL, Python, and Excel. This resulted in more precise pricing strategies for reinsurance products.
          - To support decision-making, I created detailed reports and dashboards for senior management, helping them to better understand market trends. This led to more informed decisions and improved risk management.
          - Faced with inefficiencies in data collection, I helped automate processes, which saved time and reduced manual errors, improving workflow efficiency across departments.
          - Collaborating with cross-functional teams, I contributed to improving model accuracy, ultimately leading to enhanced risk models that better predicted financial outcomes.
        `
      },
      { 
        title: "Reinsurance Modeling Co-Op", 
        company: "Guy Carpenter",
        location: "Philadelphia, PA",
        dates: "January 2024 - July 2024",
        description: `
          - Recognizing the need for improved risk assessment models, I assisted in developing tools to analyze large datasets using SQL, Python, and Excel. This resulted in more precise pricing strategies for reinsurance products.
          - To support decision-making, I created detailed reports and dashboards for senior management, helping them to better understand market trends. This led to more informed decisions and improved risk management.
          - Faced with inefficiencies in data collection, I helped automate processes, which saved time and reduced manual errors, improving workflow efficiency across departments.
          - Collaborating with cross-functional teams, I contributed to improving model accuracy, ultimately leading to enhanced risk models that better predicted financial outcomes.
        `
      },
      { 
        title: "Data Engineer Intern", 
        company: "J&K Seminars",
        location: "Philadelphia, PA",
        dates: "April 2023 - July 2023",
        description: `
          - In response to inefficiencies in inventory management, I collaborated with a team to develop a new system, creating dynamic data visualizations and writing optimized SQL queries to improve data accessibility. This led to a more streamlined process, increasing the efficiency of data-driven decisions.
          - Faced with the need to enhance backend functionality, I utilized Python and SQL to write backend code that improved system reliability. As a result, the system supported smoother inventory operations and faster data retrieval.
          - To ensure the system's accuracy, I conducted rigorous data validation tests, identifying errors early. This increased the accuracy of reporting, leading to more reliable data insights.
          - Involved in the deployment phase, I worked on the integration of the new system into the company’s existing operations, ensuring a smooth transition without disruptions to daily activities.
        `
      }
    ];
  
    experienceSpans.forEach((item, index) => {
      item.addEventListener('click', () => {
        modalCompany.textContent = workExperiences[index].company;
        modalTitle.textContent = workExperiences[index].title;
        modalLocation.textContent = workExperiences[index].location;
        modalDates.textContent = workExperiences[index].dates;
        
        const bulletPoints = workExperiences[index].description
          .trim()
          .split('\n')
          .map(line => `<li>${line.trim()}</li>`)
          .join('');
          
        modalDescription.innerHTML = `<ul>${bulletPoints}</ul>`;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });
  
    const closeModal = () => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    };
  
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    let projectMap = new Map();
    projectMap.set(0, 'projects/pickaxe-knockout.html');
    projectMap.set(1, 'projects/code-scout.html');
    projectMap.set(2, 'projects/endzone-analytics.html');
    projectMap.set(3, 'projects/photo-editor.html');
    projectMap.set(4, 'projects/perks-ffa.html');
  
    const projects = document.querySelectorAll('#projects .item');
  
    projects.forEach((item, index) => {
      item.addEventListener('click', () => {
        window.location.href = projectMap.get(index);
      });
    });
});

function setupMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('header .header-content nav ul');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('header .header-content nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

window.addEventListener('hashchange', () => {
  if (window.location.hash) {
    const targetElement = document.getElementById(window.location.hash.substring(1));
    if (targetElement) {
      setTimeout(() => {
        window.scrollTo({ top: targetElement.offsetTop - 100, behavior: "smooth" });
      }, 100);
    }
  }
});
