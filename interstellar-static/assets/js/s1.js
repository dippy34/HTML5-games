// Ads
// settings.js
document.addEventListener("DOMContentLoaded", () => {
  function adChange(selectedValue) {
    if (selectedValue === "default") {
      localStorage.setItem("ads", "on");
    } else if (selectedValue === "popups") {
      localStorage.setItem("ads", "popups");
    } else if (selectedValue === "off") {
      localStorage.setItem("ads", "off");
    }
  }

  const adTypeElement = document.getElementById("adType");

  if (adTypeElement) {
    adTypeElement.addEventListener("change", function () {
      const selectedOption = this.value;
      adChange(selectedOption);
    });

    const storedAd = localStorage.getItem("ads");
    if (storedAd === "on") {
      adTypeElement.value = "default";
    } else if (storedAd === "popups") {
      adTypeElement.value = "popups";
    } else if (storedAd === "off") {
      adTypeElement.value = "off";
    } else {
      adTypeElement.value = "default";
    }
  }
  // Makes the custom icon and name persistent (only if inputs exist)
  const iconElement = document.getElementById("icon");
  const nameElement = document.getElementById("name");
  const customIcon = localStorage.getItem("CustomIcon");
  const customName = localStorage.getItem("CustomName");
  if (iconElement && nameElement) {
    iconElement.value = customIcon || "";
    nameElement.value = customName || "";
  }

  if (localStorage.getItem("ab") === "true") {
    document.getElementById("ab-settings-switch").checked = true;
  }

  // Panic button settings initialisation
  const panicToggle = document.getElementById("panic-button-toggle");
  const panicUrlInput = document.getElementById("panic-button-url");

  if (panicToggle && panicUrlInput) {
    const storedEnabled = localStorage.getItem("panicButtonEnabled") === "true";
    const storedUrl = localStorage.getItem("panicButtonUrl") || "";

    panicToggle.checked = storedEnabled;
    panicUrlInput.value = storedUrl;

    // Auto-save function
    function savePanicButtonSettings() {
      const enabled = panicToggle.checked;
      let url = panicUrlInput.value.trim();

      // Ensure URL has a protocol
      if (url && !url.match(/^https?:\/\//i)) {
        url = "https://" + url;
        panicUrlInput.value = url; // Update the input field
      }

      localStorage.setItem("panicButtonEnabled", enabled ? "true" : "false");
      if (url) {
        localStorage.setItem("panicButtonUrl", url);
      } else {
        localStorage.removeItem("panicButtonUrl");
      }

      // Trigger update event for same-tab updates
      window.dispatchEvent(new Event("panicButtonUpdate"));
      
      // Also trigger storage event manually (for cross-tab updates)
      window.dispatchEvent(new StorageEvent("storage", {
        key: "panicButtonEnabled",
        newValue: enabled ? "true" : "false"
      }));
    }

    // Auto-save on toggle change
    panicToggle.addEventListener("change", () => {
      savePanicButtonSettings();
    });

    // Auto-save on URL input (with debounce)
    let urlSaveTimeout;
    panicUrlInput.addEventListener("input", () => {
      clearTimeout(urlSaveTimeout);
      urlSaveTimeout = setTimeout(() => {
        savePanicButtonSettings();
      }, 500); // Save 500ms after they stop typing
    });
  }

  // Clear All Data & Caches function
  window.clearGameProgress = async function() {
    const warning = document.getElementById("clear-progress-warning");
    const btn = document.getElementById("clear-game-progress-btn");
    
    // Show warning and confirm
    if (!warning.style.display || warning.style.display === "none") {
      warning.style.display = "block";
      btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Confirm Clear All Data';
      btn.style.background = "linear-gradient(135deg, #cc0000 0%, #990000 100%)";
      btn.style.transform = "scale(1.05)";
      return;
    }
    
    // User confirmed - proceed with clearing
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Clearing...';
    btn.disabled = true;
    btn.style.opacity = "0.7";
    
    let clearedItems = {
      localStorage: 0,
      sessionStorage: 0,
      indexedDB: 0,
      caches: 0
    };
    
    try {
      // Clear all localStorage
      const localStorageKeys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) localStorageKeys.push(key);
      }
      localStorageKeys.forEach(key => {
        localStorage.removeItem(key);
        clearedItems.localStorage++;
      });
      
      // Clear all sessionStorage
      const sessionStorageKeys = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key) sessionStorageKeys.push(key);
      }
      sessionStorageKeys.forEach(key => {
        sessionStorage.removeItem(key);
        clearedItems.sessionStorage++;
      });
      
      // Clear IndexedDB databases
      if ('indexedDB' in window) {
        try {
          const databases = await indexedDB.databases();
          for (const db of databases) {
            if (db.name) {
              const deleteReq = indexedDB.deleteDatabase(db.name);
              await new Promise((resolve, reject) => {
                deleteReq.onsuccess = () => resolve();
                deleteReq.onerror = () => reject(deleteReq.error);
                deleteReq.onblocked = () => resolve(); // Continue even if blocked
              });
              clearedItems.indexedDB++;
            }
          }
        } catch (e) {
          console.warn("Error clearing IndexedDB:", e);
        }
      }
      
      // Clear Cache API caches
      if ('caches' in window) {
        try {
          const cacheNames = await caches.keys();
          for (const cacheName of cacheNames) {
            await caches.delete(cacheName);
            clearedItems.caches++;
          }
        } catch (e) {
          console.warn("Error clearing caches:", e);
        }
      }
      
      // Calculate total
      const total = clearedItems.localStorage + clearedItems.sessionStorage + clearedItems.indexedDB + clearedItems.caches;
      
      // Show success message
      btn.innerHTML = '<i class="fa-solid fa-check-circle"></i> Cleared! (' + total + ' items)';
      btn.style.background = "linear-gradient(135deg, #4a9eff 0%, #2d7acc 100%)";
      btn.style.borderColor = "#4a9eff";
      btn.style.transform = "scale(1)";
      btn.disabled = false;
      btn.style.opacity = "1";
      warning.style.display = "none";
      
      // Reset button after 4 seconds
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-broom"></i> Clear All Data & Caches';
        btn.style.background = "linear-gradient(135deg, #ff5555 0%, #cc0000 100%)";
        btn.style.borderColor = "#ff6666";
        btn.style.transform = "scale(1)";
      }, 4000);
      
    } catch (e) {
      console.error("Error clearing data:", e);
      btn.innerHTML = '<i class="fa-solid fa-xmark-circle"></i> Error - Try Again';
      btn.style.background = "linear-gradient(135deg, #ff5555 0%, #cc0000 100%)";
      btn.style.borderColor = "#ff6666";
      btn.disabled = false;
      btn.style.opacity = "1";
      warning.style.display = "none";
      
      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-broom"></i> Clear All Data & Caches';
        btn.style.background = "linear-gradient(135deg, #ff5555 0%, #cc0000 100%)";
        btn.style.borderColor = "#ff6666";
        btn.style.transform = "scale(1)";
      }, 3000);
    }
  };
});

// Dyn
document.addEventListener("DOMContentLoaded", () => {
  function pChange(selectedValue) {
    if (selectedValue === "uv") {
      localStorage.setItem("uv", "true");
      localStorage.setItem("dy", "false");
    } else if (selectedValue === "dy") {
      localStorage.setItem("uv", "false");
      localStorage.setItem("dy", "true");
    }
  }

  const pChangeElement = document.getElementById("pChange");

  if (pChangeElement) {
    pChangeElement.addEventListener("change", function () {
      const selectedOption = this.value;
      pChange(selectedOption);
    });

    const storedP = localStorage.getItem("uv");
    if (storedP === "true") {
      pChangeElement.value = "uv";
    } else if (localStorage.getItem("dy") === "true" || localStorage.getItem("dy") === "auto") {
      pChangeElement.value = "dy";
    } else {
      pChangeElement.value = "uv";
    }
  }
});

// Key
let eventKey = localStorage.getItem("eventKey") || "`";
let eventKeyRaw = localStorage.getItem("eventKeyRaw") || "`";
let pLink = localStorage.getItem("pLink") || "https://classroom.google.com/";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("eventKeyInput").value = eventKeyRaw;
  document.getElementById("linkInput").value = pLink;

  const selectedOption = localStorage.getItem("selectedOption");
  if (selectedOption) {
    updateHeadSection(selectedOption);
  }
});

const eventKeyInput = document.getElementById("eventKeyInput");
eventKeyInput.addEventListener("input", () => {
  eventKey = eventKeyInput.value.split(",");
});

const linkInput = document.getElementById("linkInput");
linkInput.addEventListener("input", () => {
  pLink = linkInput.value;
});

function saveEventKey() {
  eventKey = eventKeyInput.value.split(",");
  eventKeyRaw = eventKeyInput.value;
  localStorage.setItem("eventKey", JSON.stringify(eventKey));
  localStorage.setItem("pLink", pLink);
  localStorage.setItem("eventKeyRaw", eventKeyRaw);
  // biome-ignore lint: idk
  window.location = window.location;
}
const dropdown = document.getElementById("dropdown");
const options = dropdown.getElementsByTagName("option");

const sortedOptions = Array.from(options).sort((a, b) => a.textContent.localeCompare(b.textContent));

while (dropdown.firstChild) {
  dropdown.removeChild(dropdown.firstChild);
}

for (const option of sortedOptions) {
  dropdown.appendChild(option);
}

function saveIcon() {
  const iconElement = document.getElementById("icon");
  const iconValue = iconElement.value;
  console.log("saveIcon function called with icon value:", iconValue);
  localStorage.setItem("icon", iconValue);
}

function saveName() {
  const nameElement = document.getElementById("name");
  const nameValue = nameElement.value;
  console.log("saveName function called with name value:", nameValue);
  localStorage.setItem("name", nameValue);
}

function CustomIcon() {
  const iconElement = document.getElementById("icon");
  const iconValue = iconElement.value;
  console.log("saveIcon function called with icon value:", iconValue);
  localStorage.setItem("CustomIcon", iconValue);
}

function CustomName() {
  const nameElement = document.getElementById("name");
  const nameValue = nameElement.value;
  console.log("saveName function called with name value:", nameValue);
  localStorage.setItem("CustomName", nameValue);
}
function ResetCustomCloak() {
  localStorage.removeItem("CustomName");
  localStorage.removeItem("CustomIcon");
  document.getElementById("icon").value = "";
  document.getElementById("name").value = "";
}

function redirectToMainDomain() {
  const currentUrl = window.location.href;
  const mainDomainUrl = currentUrl.replace(/\/[^/]*$/, "");
  const target = mainDomainUrl + window.location.pathname;
  if (window !== top) {
    try {
      top.location.href = target;
    } catch {
      try {
        parent.location.href = target;
      } catch {
        window.location.href = target;
      }
    }
  } else window.location.href = mainDomainUrl + window.location.pathname;
}

document.addEventListener("DOMContentLoaded", event => {
  const icon = document.getElementById("tab-favicon");
  const name = document.getElementById("t");
  const selectedValue = localStorage.getItem("selectedOption") || "Default";
  document.getElementById("dropdown").value = selectedValue;
  updateHeadSection(selectedValue);
});

function handleDropdownChange(selectElement) {
  const selectedValue = selectElement.value;
  localStorage.removeItem("CustomName");
  localStorage.removeItem("CustomIcon");
  localStorage.setItem("selectedOption", selectedValue);
  updateHeadSection(selectedValue);
  redirectToMainDomain(selectedValue);
}

function updateHeadSection(selectedValue) {
  const icon = document.getElementById("tab-favicon");
  const name = document.getElementById("t");
  const customName = localStorage.getItem("CustomName");
  const customIcon = localStorage.getItem("CustomIcon");

  if (customName && customIcon) {
    name.textContent = customName;
    icon.setAttribute("href", customIcon);
    localStorage.setItem("name", customName);
    localStorage.setItem("icon", customIcon);
  }
}
// Custom Background
document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.getElementById("save-button");
  const backgroundInput = document.getElementById("background-input");
  const resetButton = document.getElementById("reset-button");

  saveButton.addEventListener("click", () => {
    const imageURL = backgroundInput.value;
    if (imageURL.trim() !== "") {
      localStorage.setItem("backgroundImage", imageURL);
      document.body.style.backgroundImage = `url('${imageURL}')`;
      backgroundInput.value = "";
    } else {
      console.log("No image URL entered.");
    }
  });

  resetButton.addEventListener("click", () => {
    localStorage.removeItem("backgroundImage");
    document.body.style.backgroundImage = "url('default-background.jpg')";
    window.location.reload();
  });
});

// Particles
const switches = document.getElementById("2");

if (window.localStorage.getItem("particles") !== "") {
  if (window.localStorage.getItem("particles") === "true") {
    switches.checked = true;
  } else {
    switches.checked = false;
  }
}

switches.addEventListener("change", event => {
  if (event.currentTarget.checked) {
    window.localStorage.setItem("particles", "true");
  } else {
    window.localStorage.setItem("particles", "false");
  }
});
// AB Cloak
function AB() {
  let inFrame;

  try {
    inFrame = window !== top;
  } catch (e) {
    inFrame = true;
  }

  if (!inFrame && !navigator.userAgent.includes("Firefox")) {
    const popup = open("about:blank", "_blank");
    if (!popup || popup.closed) {
      alert("Window blocked. Please allow popups for this site.");
    } else {
      const doc = popup.document;
      const iframe = doc.createElement("iframe");
      const style = iframe.style;
      const link = doc.createElement("link");

      const name = localStorage.getItem("name") || "My Drive - Google Drive";
      const icon = localStorage.getItem("icon") || "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";

      doc.title = name;
      link.rel = "icon";
      link.href = icon;

      iframe.src = location.href;
      style.position = "fixed";
      style.top = style.bottom = style.left = style.right = 0;
      style.border = style.outline = "none";
      style.width = style.height = "100%";

      const pLink = localStorage.getItem(encodeURI("pLink")) || getRandomURL();
      location.replace(pLink);

      const script = doc.createElement("script");
      script.textContent = `
        window.onbeforeunload = function (event) {
          const confirmationMessage = 'Leave Site?';
          (event || window.event).returnValue = confirmationMessage;
          return confirmationMessage;
        };
      `;
      doc.head.appendChild(link);
      doc.body.appendChild(iframe);
      doc.head.appendChild(script);
    }
  }
}

function toggleAB() {
  ab = localStorage.getItem("ab");
  if (!ab) {
    localStorage.setItem("ab", "true");
  } else if (ab === "true") {
    localStorage.setItem("ab", "false");
  } else {
    localStorage.setItem("ab", "true");
  }
}
// Search Engine
function EngineChange(dropdown) {
  const selectedEngine = dropdown.value;

  const engineUrls = {
    Google: "https://www.google.com/search?q=",
    Bing: "https://www.bing.com/search?q=",
    DuckDuckGo: "https://duckduckgo.com/?q=",
    Qwant: "https://www.qwant.com/?q=",
    Startpage: "https://www.startpage.com/search?q=",
    SearchEncrypt: "https://www.searchencrypt.com/search/?q=",
    Ecosia: "https://www.ecosia.org/search?q=",
  };

  localStorage.setItem("engine", engineUrls[selectedEngine]);
  localStorage.setItem("enginename", selectedEngine);

  dropdown.value = selectedEngine;
}

function SaveEngine() {
  const customEngine = document.getElementById("engine-form").value;
  if (customEngine.trim() !== "") {
    localStorage.setItem("engine", customEngine);
    localStorage.setItem("enginename", "Custom");
  } else {
    alert("Please enter a custom search engine value.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const selectedEngineName = localStorage.getItem("enginename");
  const dropdown = document.getElementById("engine");
  if (selectedEngineName) {
    dropdown.value = selectedEngineName;
  }
});

function getRandomURL() {
  const randomURLS = [
    "https://kahoot.it",
    "https://classroom.google.com",
    "https://drive.google.com",
    "https://google.com",
    "https://docs.google.com",
    "https://slides.google.com",
    "https://www.nasa.gov",
    "https://blooket.com",
    "https://clever.com",
    "https://edpuzzle.com",
    "https://khanacademy.org",
    "https://wikipedia.org",
    "https://dictionary.com",
  ];
  return randomURLS[randRange(0, randomURLS.length)];
}

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function exportSaveData() {
  function getCookies() {
    const cookies = document.cookie.split("; ");
    const cookieObj = {};
    cookies.forEach(cookie => {
      const [name, value] = cookie.split("=");
      cookieObj[name] = value;
    });
    return cookieObj;
  }
  function getLocalStorage() {
    const localStorageObj = {};
    for (const key in localStorage) {
      if (Object.hasOwn(localStorage, key)) {
        localStorageObj[key] = localStorage.getItem(key);
      }
    }
    return localStorageObj;
  }
  const data = {
    cookies: getCookies(),
    localStorage: getLocalStorage(),
  };
  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "save_data.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importSaveData() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";
  input.onchange = event => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.cookies) {
          Object.entries(data.cookies).forEach(([key, value]) => {
            document.cookie = `${key}=${value}; path=/`;
          });
        }
        if (data.localStorage) {
          Object.entries(data.localStorage).forEach(([key, value]) => {
            localStorage.setItem(key, value);
          });
        }
        alert("Your save data has been imported. Please test it out.");
        alert("If you find any issues then report it in GitHub or the Interstellar Discord.");
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// Game Card Appearance Customization
document.addEventListener("DOMContentLoaded", () => {
  // Load saved values
  const savedBorderRadius = localStorage.getItem("cardBorderRadius") || "12";
  const savedOpacity = localStorage.getItem("cardOpacity") || "0.95";
  const savedNameSize = localStorage.getItem("cardNameSize") || "24";
  const savedDescSize = localStorage.getItem("cardDescSize") || "14";
  const savedDescLines = localStorage.getItem("cardDescLines") || "5";
  
  const borderRadiusSlider = document.getElementById("card-border-radius");
  const opacitySlider = document.getElementById("card-opacity");
  const nameSizeSlider = document.getElementById("name-font-size");
  const descSizeSlider = document.getElementById("desc-font-size");
  const descLinesSlider = document.getElementById("desc-lines");
  
  if (borderRadiusSlider) {
    borderRadiusSlider.value = savedBorderRadius;
    document.getElementById("border-radius-value").textContent = savedBorderRadius + "px";
  }
  if (opacitySlider) {
    opacitySlider.value = savedOpacity;
    document.getElementById("opacity-value").textContent = Math.round(savedOpacity * 100) + "%";
  }
  if (nameSizeSlider) {
    nameSizeSlider.value = savedNameSize;
    document.getElementById("name-size-value").textContent = savedNameSize + "px";
  }
  if (descSizeSlider) {
    descSizeSlider.value = savedDescSize;
    document.getElementById("desc-size-value").textContent = savedDescSize + "px";
  }
  if (descLinesSlider) {
    descLinesSlider.value = savedDescLines;
    document.getElementById("desc-lines-value").textContent = savedDescLines + " lines";
  }
  
  // Apply saved styles on page load
  applyCardStyles();
});

function updateCardStyle() {
  const borderRadius = document.getElementById("card-border-radius").value;
  const opacity = document.getElementById("card-opacity").value;
  const nameSize = document.getElementById("name-font-size").value;
  const descSize = document.getElementById("desc-font-size").value;
  const descLines = document.getElementById("desc-lines").value;
  
  // Update display values
  document.getElementById("border-radius-value").textContent = borderRadius + "px";
  document.getElementById("opacity-value").textContent = Math.round(opacity * 100) + "%";
  document.getElementById("name-size-value").textContent = nameSize + "px";
  document.getElementById("desc-size-value").textContent = descSize + "px";
  document.getElementById("desc-lines-value").textContent = descLines + " lines";
  
  // Save to localStorage
  localStorage.setItem("cardBorderRadius", borderRadius);
  localStorage.setItem("cardOpacity", opacity);
  localStorage.setItem("cardNameSize", nameSize);
  localStorage.setItem("cardDescSize", descSize);
  localStorage.setItem("cardDescLines", descLines);
  
  // Apply styles
  applyCardStyles();
}

function applyCardStyles() {
  const borderRadius = localStorage.getItem("cardBorderRadius") || "12";
  const opacity = localStorage.getItem("cardOpacity") || "0.95";
  const nameSize = localStorage.getItem("cardNameSize") || "24";
  const descSize = localStorage.getItem("cardDescSize") || "14";
  const descLines = localStorage.getItem("cardDescLines") || "5";
  
  // Create or update style element
  let styleElement = document.getElementById("card-custom-styles");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "card-custom-styles";
    document.head.appendChild(styleElement);
  }
  
  styleElement.textContent = `
    .column {
      border-radius: ${borderRadius}px !important;
    }
    .column p {
      background: linear-gradient(135deg, rgba(30, 30, 30, ${opacity}) 0%, rgba(20, 20, 20, ${opacity}) 100%) !important;
    }
    .column p .game-name {
      font-size: ${nameSize}px !important;
    }
    .column p .game-description {
      font-size: ${descSize}px !important;
      -webkit-line-clamp: ${descLines} !important;
      line-clamp: ${descLines} !important;
    }
  `;
}

function resetCardStyle() {
  localStorage.removeItem("cardBorderRadius");
  localStorage.removeItem("cardOpacity");
  localStorage.removeItem("cardNameSize");
  localStorage.removeItem("cardDescSize");
  localStorage.removeItem("cardDescLines");
  
  document.getElementById("card-border-radius").value = "12";
  document.getElementById("card-opacity").value = "0.95";
  document.getElementById("name-font-size").value = "24";
  document.getElementById("desc-font-size").value = "14";
  document.getElementById("desc-lines").value = "5";
  
  updateCardStyle();
  location.reload();
}