// DOM Elements
const navLoginBtn = document.getElementById('nav-login');
const loginModal = new bootstrap.Modal(document.getElementById('login-modal'));
const registerModal = new bootstrap.Modal(document.getElementById('register-modal'));
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const clubsContainer = document.getElementById('clubs-container');
const eventsContainer = document.getElementById('events-container');

// Sample Data for SGSITS Clubs (Would come from database in real app)
const clubsData = [
  {
    id: 1,
    name: "Robotics Club",
    description: "Explore the world of robotics and automation with hands-on projects and workshops.",
    category: "Technical",
    members: 85,
    logo: "images/images.jpg",
    faculty: "Dr. A. Sharma",
    email: "robotics@sgsits.ac.in"
  },
  {
    id: 2,
    name: "CodeChef Chapter",
    description: "Competitive programming club that organizes coding contests and workshops.",
    category: "Technical",
    members: 120,
    logo: "images/pasted image 0.png",
    faculty: "Dr. B. Patel",
    email: "codechef@sgsits.ac.in"
  },
  {
    id: 3,
    name: "Dramatics Club",
    description: "For students passionate about theatre, acting, and stage performances.",
    category: "Cultural",
    members: 65,
    logo: "images/dramatics.jpg",
    faculty: "Prof. C. Verma",
    email: "drama@sgsits.ac.in"
  },
  {
    id: 4,
    name: "Music Club",
    description: "Bringing together musicians and music enthusiasts for performances and jam sessions.",
    category: "Cultural",
    members: 90,
    logo: "images/music.jpg",
    faculty: "Dr. D. Singh",
    email: "music@sgsits.ac.in"
  },
  {
    id: 5,
    name: "Entrepreneurship Cell",
    description: "Fostering entrepreneurial mindset through workshops, speaker sessions and competitions.",
    category: "Management",
    members: 110,
    logo: "images/ecell.jpg",
    faculty: "Dr. E. Gupta",
    email: "ecell@sgsits.ac.in"
  },
  {
    id: 6,
    name: "Gsph Club sgsits",
    description: "For photography enthusiasts to learn, share and capture moments.",
    category: "Arts",
    members: 75,
    logo: "images/images.jpg",
    faculty: "Prof. F. Khan",
    email: "photo@sgsits.ac.in"
  }
];

const eventsData = [
  {
    id: 1,
    title: "Robo Wars",
    club: "Robotics Club",
    date: "2023-11-15",
    description: "Annual robotics competition with exciting challenges and prizes.",
    venue: "Main Auditorium",
    time: "10:00 AM"
  },
  {
    id: 2,
    title: "Code Sprint",
    club: "CodeChef Chapter",
    date: "2023-11-20",
    description: "24-hour competitive coding marathon for all skill levels.",
    venue: "Computer Center",
    time: "9:00 AM"
  },
  {
    id: 3,
    title: "Nukkad Natak",
    club: "Dramatics Club",
    date: "2023-11-25",
    description: "Street play competition on social issues.",
    venue: "Open Air Theatre",
    time: "5:00 PM"
  }
];
// Event Listeners
navLoginBtn.addEventListener('click', () => {
  loginModal.show();
});

showRegister.addEventListener('click', (e) => {
  e.preventDefault();
  loginModal.hide();
  registerModal.show();
});

showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  registerModal.hide();
  loginModal.show();
});

// Email validation function
function isValidEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@(sgsits\.ac\.in|student\.sgsits\.ac\.in)$/;
  return re.test(String(email).toLowerCase());
}

// Password validation
function isValidPassword(password) {
  return password.length >= 6;
}

// Display clubs
function displayClubs() {
  clubsContainer.innerHTML = '';
  clubsData.forEach(club => {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';
    card.innerHTML = `
      <div class="card h-100">
        <img src="${club.logo}" class="card-img-top" alt="${club.name}">
        <div class="card-body">
          <h5 class="card-title">${club.name}</h5>
          <span class="badge bg-primary mb-2">${club.category}</span>
          <p class="card-text">${club.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted"><i class="fas fa-users"></i> ${club.members} members</small>
            <button class="btn btn-sm btn-outline-primary view-club" data-id="${club.id}">View Details</button>
          </div>
        </div>
      </div>
    `;
    clubsContainer.appendChild(card);
  });

  // Add event listeners to all view buttons
  document.querySelectorAll('.view-club').forEach(button => {
    button.addEventListener('click', (e) => {
      const clubId = e.target.getAttribute('data-id');
      window.location.href = `club-details.html?id=${clubId}`;
    });
  });
}

// Display events
function displayEvents() {
  eventsContainer.innerHTML = '';
  eventsData.forEach(event => {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';
    card.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${event.title}</h5>
          <p class="text-muted"><i class="fas fa-calendar-alt"></i> ${new Date(event.date).toDateString()}</p>
          <p class="card-text">${event.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted"><i class="fas fa-map-marker-alt"></i> ${event.venue}</small>
            <button class="btn btn-sm btn-outline-primary register-event" data-id="${event.id}">Register</button>
          </div>
        </div>
      </div>
    `;
    eventsContainer.appendChild(card);
  });

  // Add event listeners to all register buttons
  document.querySelectorAll('.register-event').forEach(button => {
    button.addEventListener('click', (e) => {
      const eventId = e.target.getAttribute('data-id');
      window.location.href = `event-register.html?id=${eventId}`;
    });
  });
}

// Event Listeners


loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email');
  const password = document.getElementById('login-password');
  
  // Reset validation
  email.classList.remove('is-invalid');
  password.classList.remove('is-invalid');
  
  // Validate
  let isValid = true;
  
  if (!isValidEmail(email.value)) {
    email.classList.add('is-invalid');
    isValid = false;
  }
  
  if (!isValidPassword(password.value)) {
    password.classList.add('is-invalid');
    isValid = false;
  }
  
  if (isValid) {
    // In a real app, you would send this to your backend
    console.log('Login attempt with:', email.value);
    alert('Login successful! (This would connect to backend in real app)');
    loginModal.hide();
    // Reset form
    loginForm.reset();
  }
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('register-name');
  const email = document.getElementById('register-email');
  const password = document.getElementById('register-password');
  const department = document.getElementById('register-department');
  
  // Reset validation
  email.classList.remove('is-invalid');
  password.classList.remove('is-invalid');
  department.classList.remove('is-invalid');
  
  // Validate
  let isValid = true;
  
  if (!isValidEmail(email.value)) {
    email.classList.add('is-invalid');
    isValid = false;
  }
  
  if (!isValidPassword(password.value)) {
    password.classList.add('is-invalid');
    isValid = false;
  }
  
  if (!department.value) {
    department.classList.add('is-invalid');
    isValid = false;
  }
  
  if (isValid) {
    // In a real app, you would send this to your backend
    console.log('Registration data:', {
      name: name.value,
      email: email.value,
      password: password.value,
      department: department.value
    });
    alert('Registration successful! (This would connect to backend in real app)');
    registerModal.hide();
    // Reset form
    registerForm.reset();
  }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  displayClubs();
  displayEvents();
});