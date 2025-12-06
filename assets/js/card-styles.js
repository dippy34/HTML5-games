// Game Card Appearance Customization
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

// Apply styles when page loads
document.addEventListener("DOMContentLoaded", () => {
  applyCardStyles();
});

// Also apply after games are loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyCardStyles);
} else {
  applyCardStyles();
}

// Re-apply styles after a short delay to ensure games are rendered
setTimeout(applyCardStyles, 500);
setTimeout(applyCardStyles, 1000);


