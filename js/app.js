const app = document.getElementById("app");

let moduleIndex = 0;
let screenIndex = 0;

function getModule() {
  return COURSE_DATA[moduleIndex];
}

function getScreen() {
  return getModule().screens[screenIndex];
}

function renderApp() {
  app.innerHTML = `
    <div class="app">
      <aside class="sidebar" id="sidebar"></aside>
      <main class="main" id="main"></main>
    </div>
  `;
  renderSidebar();
  renderScreen();
}

function renderSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = `
    <div class="brand-title">CultureCare Studio</div>
    <div class="course-title">Fraud‑Prevention Fundamentals</div>
    <div class="footer-tags">#DomedLivingSeries · #DomesandDashboards · #HolisticVision</div>
    <div class="module-list">
      ${COURSE_DATA.map((m, i) => `
        <button class="module-item ${i === moduleIndex ? "active" : ""}"
          onclick="selectModule(${i})">
          ${m.title}
        </button>
      `).join("")}
    </div>
  `;
}

function selectModule(i) {
  moduleIndex = i;
  screenIndex = 0;
  renderSidebar();
  renderScreen();
}

function renderScreen() {
  const main = document.getElementById("main");
  const screen = getScreen();

  if (screen.type === "content") {
    main.innerHTML = `
      <div class="card">
        <h2>${screen.title}</h2>
        ${screen.body.map(p => `<p>${p}</p>`).join("")}
      </div>
      ${navButtons()}
    `;
  }

  if (screen.type === "quiz") {
    main.innerHTML = `
      <div class="card">
        <h2>${screen.title}</h2>
        <p>${screen.prompt}</p>
        <div>
          ${screen.options.map((opt, i) => `
            <button class="btn" onclick="checkAnswer(${i})">${opt}</button>
          `).join("")}
        </div>
        <div id="feedback"></div>
      </div>
      ${navButtons()}
    `;
  }
}

function checkAnswer(i) {
  const screen = getScreen();
  const feedback = document.getElementById("feedback");

  if (i === screen.correctIndex) {
    feedback.innerHTML = `<p style="color:#4ade80">Correct! ${screen.explanation}</p>`;
  } else {
    feedback.innerHTML = `<p style="color:#f97373">Try again. ${screen.explanation}</p>`;
  }
}

function navButtons() {
  return `
    <div style="margin-top:20px; display:flex; justify-content:space-between;">
      <button class="btn" onclick="prevScreen()">Previous</button>
      <button class="btn primary" onclick="nextScreen()">Next</button>
    </div>
  `;
}

function prevScreen() {
  if (screenIndex > 0) {
    screenIndex--;
  } else if (moduleIndex > 0) {
    moduleIndex--;
    screenIndex = COURSE_DATA[moduleIndex].screens.length - 1;
  }
  renderSidebar();
  renderScreen();
}

function nextScreen() {
  if (screenIndex < getModule().screens.length - 1) {
    screenIndex++;
  } else if (moduleIndex < COURSE_DATA.length - 1) {
    moduleIndex++;
    screenIndex = 0;
  }
  renderSidebar();
  renderScreen();
}

renderApp();
