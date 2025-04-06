let userData = {
  username: '',
  name: '',
  joinedEvents: []
};

const events = [
  { id: 1, title: "Tech Innovators Summit", description: "Explore the future of AI, Web3, and cloud computing.", speakers: "Alice, Bob", venue: "Tech Park, City Center", time: "April 15, 2025", category: "Tech" },
  { id: 2, title: "NextGen Web Conference", description: "A full-day event about modern web development.", speakers: "John, Rachel", venue: "Innovation Hub, Downtown", time: "April 18, 2025", category: "Tech" },
  { id: 3, title: "JavaScript HackFest", description: "Build cool things using pure JS.", speakers: "Sandeep, Tanya", venue: "Code Grounds", time: "April 20, 2025", category: "Tech" },
  { id: 4, title: "Python Data Carnival", description: "Talks and workshops on data science and ML.", speakers: "Dr. Meera, Anil", venue: "Science Dome", time: "April 22, 2025", category: "Tech" },
  { id: 5, title: "Blockchain Bootcamp", description: "Hands-on blockchain and smart contract sessions.", speakers: "Raj, Veena", venue: "TechBridge", time: "April 25, 2025", category: "Tech" },
  
  { id: 6, title: "City Beats Music Fest", description: "A night of electrifying performances.", speakers: "DJ Zen, Akira", venue: "Riverfront Stage", time: "April 16, 2025", category: "Music" },
  { id: 7, title: "Jazz & Wine Evening", description: "Relax with live jazz and fine wine.", speakers: "The Smooth Cats", venue: "Heritage Hall", time: "April 19, 2025", category: "Music" },
  { id: 8, title: "Bollywood Bash", description: "Dance and sing with top Bollywood stars.", speakers: "Neha K, Arijit", venue: "Arena Dome", time: "April 21, 2025", category: "Music" },
  { id: 9, title: "Rock and Retro", description: "Rewind with classic rock.", speakers: "The Strings", venue: "Old Town Amphitheatre", time: "April 24, 2025", category: "Music" },
  { id: 10, title: "Indie Vibes", description: "Discover rising indie musicians.", speakers: "Indie Roots", venue: "Sunset Park", time: "April 27, 2025", category: "Music" },

  { id: 11, title: "City Marathon", description: "Run for health and fun.", speakers: "Athletics Club", venue: "Central Grounds", time: "April 17, 2025", category: "Sports" },
  { id: 12, title: "Cricket League Finals", description: "Catch the finals live!", speakers: "Legends XI", venue: "National Stadium", time: "April 23, 2025", category: "Sports" },
  { id: 13, title: "Badminton Open", description: "Regional players in action.", speakers: "Ravi, Sneha", venue: "Indoor Arena", time: "April 26, 2025", category: "Sports" },
  { id: 14, title: "Yoga Day Retreat", description: "Wellness and peace.", speakers: "Master Om", venue: "Botanical Gardens", time: "April 29, 2025", category: "Sports" },
  { id: 15, title: "Football Championship", description: "Who takes the crown?", speakers: "Top Teams", venue: "Metro Field", time: "April 30, 2025", category: "Sports" }
];

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user && pass) {
    userData.username = user;
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("app").style.display = "block";
    renderEvents();
  } else {
    alert("Enter username and password");
  }
}

function logout() {
  userData = { username: '', name: '', joinedEvents: [] };
  document.getElementById("app").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
}

function renderEvents() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const container = document.getElementById("eventsContainer");
  container.innerHTML = "";

  const filtered = events.filter(e =>
    (category === "all" || e.category === category) &&
    e.title.toLowerCase().includes(search)
  );

  filtered.forEach(event => {
    const div = document.createElement("div");
    div.className = "event-card";
    div.onclick = () => showEventDetails(event.id);
    div.innerHTML = `
      <h3>${event.title}</h3>
      <p>${event.venue}</p>
    `;
    container.appendChild(div);
  });
}

function showEventDetails(id) {
  const event = events.find(e => e.id === id);
  const section = document.getElementById("eventDetailsSection");
  section.innerHTML = `
    <div class="event-details">
      <h2>${event.title}</h2>
      <p><strong>Description:</strong> ${event.description}</p>
      <p><strong>Speakers:</strong> ${event.speakers}</p>
      <p><strong>Venue:</strong> ${event.venue}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <button onclick="joinEvent(${event.id})">I'm Going 🚀</button>
    </div>
  `;
  section.style.display = "block";
  document.getElementById("homeSection").style.display = "none";
  document.getElementById("profileSection").style.display = "none";
}

function joinEvent(id) {
  if (!userData.joinedEvents.includes(id)) {
    userData.joinedEvents.push(id);
    alert("You've joined this event!");
  }
}

function showHome() {
  document.getElementById("homeSection").style.display = "block";
  document.getElementById("eventDetailsSection").style.display = "none";
  document.getElementById("profileSection").style.display = "none";
  renderEvents();
}

function showProfile() {
  document.getElementById("homeSection").style.display = "none";
  document.getElementById("eventDetailsSection").style.display = "none";
  document.getElementById("profileSection").style.display = "block";

  document.getElementById("profileName").value = userData.name;

  const ul = document.getElementById("upcomingEventsList");
  ul.innerHTML = "";

  userData.joinedEvents.forEach(id => {
    const e = events.find(evt => evt.id === id);
    const li = document.createElement("li");
    li.textContent = `${e.title} - ${e.time}`;
    ul.appendChild(li);
  });
}

function saveProfile() {
  userData.name = document.getElementById("profileName").value;
  alert("Profile saved!");
}
