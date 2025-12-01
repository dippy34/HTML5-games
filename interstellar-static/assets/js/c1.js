// cloak.js
let appInd;
const g = window.location.pathname === "/a";
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

function createGameCard(app, appIndex, pinList) {
  const columnDiv = document.createElement("div");
  columnDiv.classList.add("column");
  columnDiv.setAttribute("data-category", app.categories.join(" "));
  // Removed --index animation delay for instant loading

  const link = document.createElement("a");
  link.onclick = () => {
    handleClick(app);
  };

  // Thumbnail container
  const thumbnailContainer = document.createElement("div");
  thumbnailContainer.className = "thumbnail-container";

  const image = document.createElement("img");
  image.alt = app.name;
  image.className = "thumbnail-img";
  
  // Simple approach: build paths, try in order, cache on success
  let paths = [];
  let currentIndex = 0;
  
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
    if (currentIndex < paths.length) image.src = paths[currentIndex++];
  }
  
  image.onload = function() {
    if (!this.src.includes('custom.webp') && app.link) {
      ImageCache.set(app.link, this.src);
    }
    image.onerror = null; // Stop trying once loaded
  };
  
  image.onerror = tryNext; // Try next path on error
  
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

let path = "/assets/json/a.min.json";
if (g) {
  path = "/assets/json/g.min.json";
} else if (c) {
  path = "/assets/json/t.min.json";
} else if (a) {
  path = "/assets/json/a.min.json";
}
fetch(path)
  .then(response => {
    return response.json();
  })
  .then(appsList => {
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

    for (const app of appsList) {
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
      }
      
      appInd += 1;
    }
  })
  .catch(error => {
    console.error("Error fetching JSON data:", error);
  });

function category() {
  const selectedCategories = Array.from(document.querySelectorAll("#category option:checked")).map(option => option.value);
  const g = document.getElementsByClassName("column");

  for (const game of g) {
    const categories = game.getAttribute("data-category").split(" ");

    if (selectedCategories.length === 0 || selectedCategories.some(category => categories.includes(category))) {
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
