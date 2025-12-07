// cloak.js
let appInd;
const g = window.location.pathname === "/a" || window.location.pathname === "/games";
const a = window.location.pathname === "/b";
const c = window.location.pathname === "/gt";

// Image cache system - stores successful image URLs for instant loading
const ImageCache = {
  cacheKey: 'gameThumbnailCache',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  
  getCache: function() {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (!cached) return {};
      const data = JSON.parse(cached);
      // Clean old entries
      const now = Date.now();
      const cleaned = {};
      for (const [key, value] of Object.entries(data)) {
        if (value.timestamp && (now - value.timestamp) < this.maxAge) {
          cleaned[key] = value;
        }
      }
      if (Object.keys(cleaned).length !== Object.keys(data).length) {
        localStorage.setItem(this.cacheKey, JSON.stringify(cleaned));
      }
      return cleaned;
    } catch (e) {
      return {};
    }
  },
  
  get: function(gameLink) {
    const cache = this.getCache();
    return cache[gameLink]?.url || null;
  },
  
  set: function(gameLink, imageUrl) {
    try {
      const cache = this.getCache();
      cache[gameLink] = {
        url: imageUrl,
        timestamp: Date.now()
      };
      localStorage.setItem(this.cacheKey, JSON.stringify(cache));
    } catch (e) {
      // If storage is full, clear old entries
      try {
        localStorage.removeItem(this.cacheKey);
        this.set(gameLink, imageUrl);
      } catch (e2) {}
    }
  }
};

// Image loading - no limits, load all immediately
const ImageLoader = {
  load: function(image, src, callback) {
    image.src = src;
    if (callback) callback();
  },
  
  onLoadComplete: function() {
    // No-op, no queue to manage
  }
};

let t;

try {
  t = window.top.location.pathname === "/d";
} catch {
  try {
    t = window.parent.location.pathname === "/d";
  } catch {
    t = false;
  }
}

function Span(name) {
  return name.split("").map(char => {
    const span = document.createElement("span");
    span.textContent = char;
    return span;
  });
}

// Generate unique description for games using name + simple keyword/category heuristics
function getUniqueDescription(app) {
  const gameName = app?.name || "this game";
  const categories = Array.isArray(app?.categories)
    ? app.categories.map(c => String(c).toLowerCase())
    : [];

  const descriptions = {
    "99balls": "A challenging physics-based puzzle game where you strategically break numbered balls to clear the board.",
    "1v1lol": "Fast-paced multiplayer battle royale with building mechanics and intense combat.",
    "1v1space": "Space-themed competitive shooter with unique mechanics and strategic gameplay.",
    "10 Minutes Till Dawn": "Survive the night in this roguelike top-down shooter with endless waves of enemies.",
    "100ng": "Test your reflexes and timing in this precision-based challenge game.",
    "9007199254740992": "A mathematical puzzle game that challenges your number manipulation skills.",
    "A Dance Of Fire And Ice": "Rhythm-based game where you control two orbiting planets to the beat.",
    "Achievementunlocked": "Unlock achievements and complete challenges in this meta-gaming experience.",
    "Adrenalinechallenge": "High-speed action game that tests your reaction time and precision.",
    "Adventure Drivers": "Racing game with adventure elements and challenging tracks.",
    "Adarkroom": "Minimalist text-based adventure with mysterious storytelling.",
    "Angry Sharks": "Underwater action game where you control a shark on a feeding frenzy.",
    "Bad Ice Cream": "Classic arcade-style game with ice cream characters and strategic gameplay.",
    "Basketball Stars": "Arcade basketball game with skill-based shooting mechanics.",
    "Basketbros IO": "Multiplayer basketball game with competitive online matches.",
    "Bloons TD": "Tower defense game featuring monkeys, balloons, and strategic placement.",
    "Chess": "Classic strategy game of chess with online multiplayer support.",
    "Chrome Dino": "The classic offline Chrome dinosaur runner game.",
    "Cookie Clicker": "Idle clicker game where you bake cookies and build an empire.",
    "Crossy Road": "Endless arcade hopper with procedurally generated challenges.",
    "Doom": "Classic first-person shooter with fast-paced action and demon-slaying.",
    "Flappy Bird": "Simple yet challenging side-scrolling game with precise timing.",
    "Friday Night Funkin": "Rhythm game with catchy music and challenging patterns.",
    "Geometry Dash": "Rhythm-based platformer with custom levels and music.",
    "Happy Wheels": "Physics-based ragdoll game with user-generated content.",
    "Krunker": "Fast-paced browser-based FPS with customizable weapons.",
    "Mario": "Classic platformer featuring the iconic plumber on adventures.",
    "Minecraft": "Sandbox building game with infinite creativity and exploration.",
    "Papa's Pizzeria": "Time management game where you run a pizza restaurant.",
    "Roblox": "User-generated gaming platform with millions of experiences.",
    "Slope": "Endless runner with 3D graphics and increasing difficulty.",
    "Smash Karts": "Multiplayer kart racing with power-ups and chaos.",
    "Tetris": "Classic tile-matching puzzle game that never gets old.",
    "Tunnel Rush": "High-speed tunnel runner with neon graphics and obstacles.",
    "Ace Attorney": "Legal drama visual novel where you solve cases and defend clients.",
    "Agario": "Massive multiplayer online game where you control a cell and grow by eating others.",
    "Among Us": "Social deduction game where you find the impostor among your crew.",
    "Baldi's Basics": "Educational horror game with a twist - escape the school.",
    "BitLife": "Life simulation game where you make choices and live a virtual life.",
    "Bloons TD 5": "Advanced tower defense with monkeys, bloons, and strategic upgrades.",
    "Boxhead": "Zombie survival shooter with waves of enemies and weapons.",
    "Burger Time": "Classic arcade game where you build burgers while avoiding enemies.",
    "Candy Box": "ASCII art adventure game with RPG elements and progression.",
    "Celeste": "Precision platformer with challenging levels and emotional storytelling.",
    "Clash Royale": "Real-time strategy card game with tower defense mechanics.",
    "Cuphead": "Run and gun boss battle game with 1930s cartoon art style.",
    "Duck Life": "Train your duck and compete in races to become the champion.",
    "Earn to Die": "Zombie apocalypse driving game with upgrades and survival.",
    "Elden Ring": "Open-world action RPG with challenging combat and exploration.",
    "Fall Guys": "Battle royale party game with obstacle courses and elimination.",
    "Fireboy and Watergirl": "Cooperative puzzle platformer with two characters.",
    "FNAF": "Survival horror game where you survive nights at Freddy's.",
    "Fortnite": "Battle royale with building mechanics and seasonal updates.",
    "Fruit Ninja": "Slice fruits with your finger in this arcade action game.",
    "Genshin Impact": "Open-world action RPG with gacha mechanics and exploration.",
    "Getting Over It": "Frustrating climbing game with a hammer and a pot.",
    "Goat Simulator": "Physics-based sandbox where you play as a destructive goat.",
    "GTA": "Open-world crime game with missions, vehicles, and mayhem.",
    "Half Life": "Sci-fi first-person shooter with innovative gameplay mechanics.",
    "Hollow Knight": "Metroidvania action-adventure with beautiful hand-drawn art.",
    "Just Fall": "Physics-based falling game with obstacles and challenges.",
    "Learn to Fly": "Penguin launching game with upgrades and distance challenges.",
    "Moto X3M": "Motorcycle stunt racing with physics and challenging tracks.",
    "Nintendo": "Classic gaming platform with iconic characters and franchises.",
    "Pac Man": "Classic arcade maze game with dots, ghosts, and power pellets.",
    "Paper.io": "Territory control game where you draw lines to claim space.",
    "Pokemon": "Catch, train, and battle creatures in this RPG adventure.",
    "Portal": "First-person puzzle game with portals and physics manipulation.",
    "Rocket League": "Soccer with rocket-powered cars and aerial maneuvers.",
    "Sonic": "High-speed platformer with the blue hedgehog and rings.",
    "Stick Fight": "Physics-based fighting game with stick figures and weapons.",
    "Subway Surfers": "Endless runner on subway tracks with obstacles and power-ups.",
    "Super Mario": "Classic platformer with power-ups, coins, and Bowser battles.",
    "Temple Run": "Endless runner through ancient temples with obstacles and turns.",
    "The Impossible Game": "One-button precision platformer with challenging levels.",
    "Tomb Raider": "Action-adventure with exploration, puzzles, and combat.",
    "Undertale": "RPG where your choices matter and you can spare or fight enemies.",
    "World Box": "God simulation sandbox where you create and destroy civilizations.",
    "Zelda": "Action-adventure RPG with exploration, puzzles, and epic quests."
  };
  
  // Check for exact match first (exact known titles)
  if (descriptions[gameName]) {
    return descriptions[gameName];
  }
  
  // Check for partial matches
  const lowerName = gameName.toLowerCase();
  for (const [key, desc] of Object.entries(descriptions)) {
    if (lowerName.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerName)) {
      return desc;
    }
  }
  
  // Generate based on game name patterns (keywords in the title)
  if (lowerName.includes("ball") || lowerName.includes("balls")) {
    return "A ball-based game with physics and strategic gameplay mechanics.";
  }
  if (lowerName.includes("racing") || lowerName.includes("race") || lowerName.includes("car")) {
    return "High-speed racing action with challenging tracks and vehicles.";
  }
  if (lowerName.includes("shooter") || lowerName.includes("shoot") || lowerName.includes("gun")) {
    return "Intense action shooter with fast-paced combat and weapons.";
  }
  if (lowerName.includes("puzzle") || lowerName.includes("puzzle")) {
    return "Brain-teasing puzzle game that challenges your problem-solving skills.";
  }
  if (lowerName.includes("adventure") || lowerName.includes("rpg")) {
    return "Epic adventure game with exploration, quests, and character progression.";
  }
  if (lowerName.includes("sports") || lowerName.includes("sport")) {
    return "Competitive sports game with realistic gameplay and mechanics.";
  }
  if (lowerName.includes("strategy") || lowerName.includes("tower")) {
    return "Strategic gameplay requiring planning and tactical decision-making.";
  }
  if (lowerName.includes("platform") || lowerName.includes("jump")) {
    return "Precision platformer with challenging jumps and obstacles.";
  }
  if (lowerName.includes("idle") || lowerName.includes("clicker")) {
    return "Idle game where progress continues even when you're away.";
  }

  // Generate based on category tags if name patterns didn't match
  if (categories.includes("action")) {
    return `${gameName} is a fast-paced action game with plenty of moment-to-moment decisions.`;
  }
  if (categories.includes("local")) {
    return `${gameName} is a locally hosted game you can play right in your browser without external sites.`;
  }
  if (categories.includes("2p") || categories.includes("multiplayer")) {
    return `${gameName} lets you challenge friends in competitive multiplayer matches.`;
  }
  if (categories.includes("puzzle")) {
    return `${gameName} focuses on clever puzzles and logic-based challenges.`;
  }
  if (categories.includes("strategy")) {
    return `${gameName} rewards careful planning and long-term strategy.`;
  }
  if (categories.includes("horror")) {
    return `${gameName} is a horror experience built around tension, atmosphere, and jump scares.`;
  }
  if (categories.includes("platformer")) {
    return `${gameName} is a platformer with tricky jumps and tight level design.`;
  }

  // Final fallback: still personalized by name so every line is at least slightly different
  return `${gameName} is a browser game with its own mechanics and challenges to master.`;
}

function createGameCard(app, appIndex, pinList) {
  const columnDiv = document.createElement("div");
  columnDiv.classList.add("column");
  // Ensure categories is an array and has at least "all"
  const categories = Array.isArray(app.categories) && app.categories.length > 0 
    ? app.categories 
    : ["all"];
  columnDiv.setAttribute("data-category", categories.join(" "));
  // Removed --index animation delay for instant loading

  const link = document.createElement("a");
  link.onclick = () => {
    handleClick(app);
  };

  // Thumbnail container
  const thumbnailContainer = document.createElement("div");
  thumbnailContainer.className = "thumbnail-container";

  // Description placeholder (shown while loading/fallback)
  const descriptionPlaceholder = document.createElement("div");
  descriptionPlaceholder.className = "description-placeholder";
  const uniqueDesc = getUniqueDescription(app);
  descriptionPlaceholder.textContent = uniqueDesc;
  // Show description initially while loading
  descriptionPlaceholder.style.display = 'flex';
  thumbnailContainer.appendChild(descriptionPlaceholder);
  
  // Debug: log first few games to verify function is running
  if (appIndex < 3) {
    console.log(`[DEBUG] Creating game card for: ${app.name}, description: ${uniqueDesc.substring(0, 50)}...`);
  }

  const image = document.createElement("img");
  image.alt = app.name;
  image.className = "thumbnail-img";
  
  // Simple approach: build paths, try in order, cache on success
  let paths = [];
  let currentIndex = 0;
  let imageLoaded = false;
  
  function buildPaths() {
    if (paths.length > 0) return;
    const cached = ImageCache.get(app.link);
    if (cached) paths.push(cached);
    if (app.image) paths.push(app.image);
    
    if (app.link && (app.link.startsWith('/e/') || app.local)) {
      const linkPath = app.link;
      if (linkPath.includes('/')) {
        const dir = linkPath.substring(0, linkPath.lastIndexOf('/') + 1);
        const gameName = linkPath.match(/\/e\/load\/([^\/]+)/)?.[1] || '';
        const patterns = ['splash.png', 'splash.jpg', 'splash.jpeg', 'logo.png', 'logo.jpg', 
                         'icon.png', 'icon.jpg', 'cover.png', 'cover.jpg', 'thumbnail.png', 
                         'thumbnail.jpg', 'banner.png', 'banner.jpg', 'preview.png', 
                         'image.png', 'image.jpg', 'img.png', 'img.jpg'];
        const subdirs = ['', 'assets/img/', 'assets/', 'img/'];
        patterns.forEach(p => subdirs.forEach(s => paths.push(dir + s + p)));
        if (gameName) [gameName + '.png', gameName + '.jpg'].forEach(p => paths.push(dir + p));
      }
    }
    paths.push("/assets/media/icons/custom.webp");
  }
  
  function tryNext() {
    buildPaths();
    if (currentIndex < paths.length) {
      image.src = paths[currentIndex++];
    }
  }
  
  image.onload = function() {
    imageLoaded = true;
    if (this.src.includes('custom.webp')) {
      // Show description for fallback (custom.webp)
      descriptionPlaceholder.style.display = 'flex';
      image.style.opacity = '0.3'; // Make fallback image semi-transparent
    } else {
      // Hide description when real image loads
      descriptionPlaceholder.style.display = 'none';
      image.style.opacity = '1';
      if (app.link) {
        ImageCache.set(app.link, this.src);
      }
    }
    image.onerror = null; // Stop trying once loaded
  };
  
  image.onerror = function() {
    if (currentIndex >= paths.length) {
      // All paths exhausted, show description
      descriptionPlaceholder.style.display = 'flex';
      image.style.opacity = '0.3';
      imageLoaded = true;
    } else {
      tryNext(); // Try next path on error
    }
  };
  
  tryNext(); // Start loading
  
  thumbnailContainer.appendChild(image);
  link.appendChild(thumbnailContainer);

  // Title
  const title = document.createElement("div");
  title.className = "game-title";
  title.textContent = app.name;
  link.appendChild(title);

  columnDiv.appendChild(link);

  if (app.error) {
    if (!app.say) {
      app.say = "This app is currently not working.";
    }
  } else if (app.load) {
    if (!app.say) {
      app.say = "This app may experience excessive loading times.";
    }
  } else if (app.partial) {
    if (!app.say) {
      app.say = "This app is currently experiencing some issues, it may not work for you. (Dynamic doesn't work in about:blank)";
    }
  }

  return columnDiv;
}

function saveToLocal(path) {
  sessionStorage.setItem("GoUrl", path);
}

function handleClick(app) {
  if (typeof app.say !== "undefined") {
    alert(app.say);
  }

  let Selected = app.link;
  if (app.links && app.links.length > 1) {
    Selected = getSelected(app.links);
    if (!Selected) {
      return false;
    }
  }

  if (app.local) {
    // Original behavior: instantly go through rx (fullscreen/local handler)
    saveToLocal(Selected);
    window.location.href = "rx";
    if (t) {
      window.location.href = Selected;
    }
  } else if (app.local2) {
    saveToLocal(Selected);
    window.location.href = Selected;
  } else if (app.blank) {
    blank(Selected);
  } else if (app.now) {
    now(Selected);
    if (t) {
      window.location.href = Selected;
    }
  } else if (app.custom) {
    Custom(app);
  } else if (app.dy) {
    dy(Selected);
  } else {
    go(Selected);
    if (t) {
      blank(Selected);
    }
  }
  return false;
}

function getSelected(links) {
  const options = links.map((link, index) => `${index + 1}: ${link.name}`).join("\n");
  const choice = prompt(`Select a link by entering the corresponding number:\n${options}`);
  const selectedIndex = Number.parseInt(choice, 10) - 1;

  if (Number.isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= links.length) {
    alert("Invalid selection. Please try again.");
    return null;
  }

  return links[selectedIndex].url;
}

function CustomApp(customApp) {
  let apps;
  if (g) {
    apps = localStorage.getItem("Gcustom");
  } else if (c) {
    apps = localStorage.getItem("Tcustom");
  } else if (a) {
    apps = localStorage.getItem("Acustom");
  }

  if (apps === null) {
    apps = {};
  } else {
    apps = JSON.parse(apps);
  }

  const key = `custom${Object.keys(apps).length + 1}`;

  apps[key] = customApp;

  if (g) {
    localStorage.setItem("Gcustom", JSON.stringify(apps));
  } else if (c) {
    localStorage.setItem("Tcustom", JSON.stringify(apps));
  } else if (a) {
    localStorage.setItem("Acustom", JSON.stringify(apps));
  }
}

function setPin(index) {
  let pins;
  if (g) {
    pins = localStorage.getItem("Gpinned");
  } else if (c) {
    pins = localStorage.getItem("Tpinned");
  } else if (a) {
    pins = localStorage.getItem("Apinned");
  }

  if (pins === null || pins === "") {
    pins = [];
  } else {
    pins = pins.split(",").map(Number);
  }
  if (pinContains(index, pins)) {
    const remove = pins.indexOf(index);
    pins.splice(remove, 1);
  } else {
    pins.push(index);
  }
  if (g) {
    localStorage.setItem("Gpinned", pins);
  } else if (c) {
    localStorage.setItem("Tpinned", pins);
  } else if (a) {
    localStorage.setItem("Apinned", pins);
  }
  location.reload();
}

function pinContains(i, p) {
  if (p === "") {
    return false;
  }
  for (const x of p) {
    if (x === i) {
      return true;
    }
  }
  return false;
}

function Custom(app) {
  const title = prompt("Enter title for the app:");
  const link = prompt("Enter link for the app:");
  if (title && link) {
    const customApp = {
      name: `[Custom] ${title}`,
      link: link,
      image: "/assets/media/icons/custom.webp",
      custom: false,
    };

    CustomApp(customApp);
    CreateCustomApp(customApp);
  }
}

function CreateCustomApp(customApp) {
  const columnDiv = document.createElement("div");
  columnDiv.classList.add("column");
  columnDiv.setAttribute("data-category", "all");

  const pinIcon = document.createElement("i");
  pinIcon.classList.add("fa", "fa-map-pin");
  pinIcon.ariaHidden = true;

  const btn = document.createElement("button");
  btn.appendChild(pinIcon);
  btn.onclick = () => {
    setPin(appInd);
  };
  btn.title = "Pin";
  btn.setAttribute("aria-label", "Pin game");

  const linkElem = document.createElement("a");
  linkElem.onclick = () => {
    handleClick(customApp);
  };

  // Don't create image element - thumbnails removed
  const image = document.createElement("div");
  image.style.display = "none";

  const paragraph = document.createElement("p");

  // Game name
  const nameContainer = document.createElement("div");
  nameContainer.className = "game-name";
  for (const span of Span(customApp.name)) {
    nameContainer.appendChild(span);
  }
  paragraph.appendChild(nameContainer);
  
  // Add description
  const desc = document.createElement("div");
  desc.className = "game-description";
  desc.textContent = customApp.description || `Play ${customApp.name}!`;
  paragraph.appendChild(desc);

  linkElem.appendChild(image);
  linkElem.appendChild(paragraph);
  columnDiv.appendChild(linkElem);
  columnDiv.appendChild(btn);

  const nonPinnedApps = document.querySelector(".apps");
  nonPinnedApps.insertBefore(columnDiv, nonPinnedApps.firstChild);
}

document.addEventListener("DOMContentLoaded", () => {
  let storedApps;
  if (g) {
    storedApps = JSON.parse(localStorage.getItem("Gcustom"));
  } else if (c) {
    storedApps = JSON.parse(localStorage.getItem("Tcustom"));
  } else if (a) {
    storedApps = JSON.parse(localStorage.getItem("Acustom"));
  }
  if (storedApps) {
    for (const app of Object.values(storedApps)) {
      CreateCustomApp(app);
    }
  }
});

// Load games instantly from inline data (no network request needed!)
function loadGames() {
  // Use inline data if available (for games page), otherwise fall back to fetch
  let appsList;
  
  console.log("loadGames called, pathname:", window.location.pathname);
  console.log("g =", g, "GAMES_DATA defined:", typeof GAMES_DATA !== 'undefined');
  
  if (g && typeof GAMES_DATA !== 'undefined' && Array.isArray(GAMES_DATA)) {
    // Games page - use inline data (instant!)
    appsList = GAMES_DATA;
    console.log("Games loaded instantly from inline data! Count:", appsList.length);
  } else {
    // Other pages - still use fetch for now
    let path = "/assets/json/a.min.json";
    if (c) {
      path = "/assets/json/t.min.json";
    } else if (a) {
      path = "/assets/json/a.min.json";
    }
    
    fetch(path)
      .then(response => {
        if (!response.ok) {
          // If file doesn't exist, fallback to a.min.json
          if (path.includes('t.min.json')) {
            return fetch("/assets/json/a.min.json");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        processGamesList(data);
      })
      .catch(error => {
        console.error("Error fetching JSON data:", error);
        // Fallback: try to load a.min.json if other files fail
        if (path !== "/assets/json/a.min.json") {
          fetch("/assets/json/a.min.json")
            .then(response => response.json())
            .then(data => processGamesList(data))
            .catch(err => console.error("Fallback JSON load also failed:", err));
        }
      });
    return;
  }
  
  processGamesList(appsList);
}

function processGamesList(appsList) {
  if (!appsList || !Array.isArray(appsList)) {
    console.error("Invalid games data:", appsList);
    return;
  }
  
  appsList.sort((a, b) => {
    if (a.name.startsWith("[Custom]")) {
      return -1;
    }
    if (b.name.startsWith("[Custom]")) {
      return 1;
    }
    return a.name.localeCompare(b.name);
  });
  
  const gamesGrid = document.querySelector(".games-grid");
  if (!gamesGrid) {
    console.error("Games grid element not found!");
    return;
  }
  
  let pinList;
  if (g) {
    pinList = localStorage.getItem("Gpinned") || "";
  } else if (a) {
    pinList = localStorage.getItem("Apinned") || "";
  } else if (c) {
    pinList = localStorage.getItem("Tpinned") || "";
  }
  pinList = pinList ? pinList.split(",").map(Number) : [];
  appInd = 0;

  console.log(`Processing ${appsList.length} games...`);
  let found99balls = false;
  for (const app of appsList) {
    if (!app || !app.name) {
      console.warn("Skipping invalid game entry:", app);
      continue;
    }
    if (app.name.toLowerCase().includes("99balls")) {
      found99balls = true;
      console.log("Found 99balls game:", app);
    }
    if (app.categories?.includes("local")) {
      app.local = true;
    } else if (app.link && (app.link.includes("now.gg") || app.link.includes("nowgg.me"))) {
      if (app.partial === null || app.partial === undefined) {
        app.partial = true;
        app.say = "Now.gg is currently not working for some users.";
      }
    } else if (app.link?.includes("nowgg.nl")) {
      if (app.error === null || app.error === undefined) {
        app.error = true;
        app.say = "NowGG.nl is currently down.";
      }
    }

    const columnDiv = createGameCard(app, appInd, pinList);
    
    if (gamesGrid) {
      gamesGrid.appendChild(columnDiv);
      // Ensure game is visible by default
      columnDiv.style.display = "block";
    }
    
    appInd += 1;
  }
  
  console.log(`Successfully loaded ${appInd} games!`);
  if (!found99balls) {
    console.warn("99balls game was not found in the games list!");
  } else {
    console.log("✓ 99balls game was found and should be visible!");
  }
}

// Load games when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadGames);
} else {
  // DOM is already ready
  loadGames();
}

function category() {
  const selectedCategories = Array.from(document.querySelectorAll("#category option:checked")).map(option => option.value);
  const g = document.getElementsByClassName("column");

  for (const game of g) {
    const categoryAttr = game.getAttribute("data-category");
    if (!categoryAttr) {
      game.style.display = "block"; // Show games without category
      continue;
    }
    
    const categories = categoryAttr.split(" ");

    // If "all" is selected or no categories selected, show all games
    if (selectedCategories.length === 0 || selectedCategories.includes("all") || selectedCategories.some(category => categories.includes(category))) {
      game.style.display = "block";
    } else {
      game.style.display = "none";
    }
  }
}

function bar() {
  const input = document.getElementById("search");
  const filter = input.value.toLowerCase();
  const g = document.getElementsByClassName("column");

  for (const game of g) {
    const titleElement = game.querySelector(".game-title");
    const name = titleElement ? titleElement.textContent.toLowerCase() : "";

    if (name.includes(filter)) {
      game.style.display = "block";
    } else {
      game.style.display = "none";
    }
  }
}
