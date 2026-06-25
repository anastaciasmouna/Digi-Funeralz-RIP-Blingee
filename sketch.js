// =====================================================
// DIGI FUNERALZ INTERACTION
// Landing page → funeral page → warning → continue
// =====================================================

window.addEventListener("DOMContentLoaded", () => {
  const landingPayRespectsBtn = document.querySelector(".landing-pay-respects");
  const warningScreen = document.querySelector(".warning-screen");
  const warningContinueBtn = document.querySelector(".warning-continue");
  const warningLeaveBtn = document.querySelector(".warning-leave");

  if (
    !landingPayRespectsBtn ||
    !warningScreen ||
    !warningContinueBtn ||
    !warningLeaveBtn
  ) {
    console.error("Missing HTML element. Check your class names:", {
      landingPayRespectsBtn,
      warningScreen,
      warningContinueBtn,
      warningLeaveBtn,
    });
    return;
  }

  // If Live Server refreshes, remember that we were already inside the funeral page
  if (sessionStorage.getItem("enteredFuneral") === "true") {
    document.body.classList.add("entered-funeral");
    warningScreen.classList.remove("show");
  } else {
    document.body.classList.remove("entered-funeral");
    warningScreen.classList.remove("show");
  }

  // Click Pay Your Respects on landing page
  landingPayRespectsBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    document.body.classList.add("entered-funeral");
    warningScreen.classList.add("show");

    sessionStorage.setItem("enteredFuneral", "true");
  });

  // Click Continue on warning
  warningContinueBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    warningScreen.classList.remove("show");

    sessionStorage.setItem("enteredFuneral", "true");
  });

  // Click No thanks on warning
  warningLeaveBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    warningScreen.classList.remove("show");
    document.body.classList.remove("entered-funeral");

    sessionStorage.removeItem("enteredFuneral");
  });

  // =====================================================
  // PEARL BORDER GENERATOR
  // =====================================================

  const pearlContainers = document.querySelectorAll(".pearl-border");

  pearlContainers.forEach((container) => {
    container.innerHTML = "";

    for (let i = 0; i < 120; i++) {
      const pearl = document.createElement("img");
      pearl.src = "imgs/pearl.png";
      pearl.alt = "";
      container.appendChild(pearl);
    }
  });
});
// =====================================================
// BLINGEE MEMORY MESSAGE STATION
// Saves messages on this browser/computer using localStorage
// =====================================================
// =====================================================
// BLINGEE MEMORY MESSAGE STATION
// Saves messages on this browser/computer using localStorage
// =====================================================

window.addEventListener("DOMContentLoaded", () => {
  const candleButtons = document.querySelectorAll(".candle-choice");
  const messageGifButtons = document.querySelectorAll(".message-gif-choice");
  const bgButtons = document.querySelectorAll(".message-bg-choice");
  const fontButtons = document.querySelectorAll(".font-choice");

  const chosenCandleImg = document.querySelector(".chosen-candle-img");
  const chosenMessageGifImg = document.querySelector(".chosen-message-gif-img");
  const previewCard = document.querySelector(".memory-preview-card");
  const transformBox = document.querySelector(".gif-transform-box");
  const resizeHandle = document.querySelector(".gif-resize-handle");

  const messageInput = document.querySelector(".memory-message-input");
  const postButton = document.querySelector(".post-memory-button");
  const clearButton = document.querySelector(".clear-memory-button");

  const memoryWallLeft = document.querySelector(".memory-wall-left");
  const memoryWallRight = document.querySelector(".memory-wall-right");

  if (
    !candleButtons.length ||
    !messageGifButtons.length ||
    !bgButtons.length ||
    !fontButtons.length ||
    !chosenCandleImg ||
    !chosenMessageGifImg ||
    !previewCard ||
    !transformBox ||
    !resizeHandle ||
    !messageInput ||
    !postButton ||
    !clearButton ||
    !memoryWallLeft ||
    !memoryWallRight
  ) {
    return;
  }

  let selectedCandle = "imgs/candle1.png";
  let selectedMessageGif = "imgs/messagegif1.gif";
  let selectedBg = "imgs/background1.gif";
  let selectedFont = "'Apple Chancery', cursive";

  let gifX = 45;
  let gifY = 20;
  let gifSize = 90;

  const colours = [
    "#fff8d8",
    "#ffd6f3",
    "#d8f7ff",
    "#e3ffd8",
    "#fff0b8",
    "#ead8ff",
    "#ffd8d8",
    "#d8ffe9",
  ];

  function getSavedMessages() {
    const saved = localStorage.getItem("blingeeMemoryMessages");

    if (!saved) {
      return [];
    }

    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }

  function saveMessages(messages) {
    localStorage.setItem("blingeeMemoryMessages", JSON.stringify(messages));
  }

  function updateTransformBox() {
    transformBox.style.left = `${gifX}px`;
    transformBox.style.top = `${gifY}px`;
    transformBox.style.width = `${gifSize}px`;
    transformBox.style.height = `${gifSize}px`;
    transformBox.style.transform = "none";
  }

  function renderMessages() {
    const messages = getSavedMessages();

    memoryWallLeft.innerHTML = "";
    memoryWallRight.innerHTML = "";

    messages.forEach((message, index) => {
      const note = document.createElement("div");
      note.className = "memory-note";
      note.style.background = message.colour;
      note.style.fontFamily = message.font;

      if (message.background) {
        note.style.setProperty("--saved-message-bg", `url("${message.background}")`);
      }

      const visual = document.createElement("div");
      visual.className = "memory-note-visual";

      const candle = document.createElement("img");
      candle.className = "memory-note-candle";
      candle.src = message.candle;
      candle.alt = "";

      const messageGif = document.createElement("img");
      messageGif.className = "memory-note-gif";
      messageGif.src = message.messageGif;
      messageGif.alt = "";

      messageGif.style.left = `${message.gifX || 45}px`;
      messageGif.style.top = `${message.gifY || 0}px`;
      messageGif.style.width = `${message.gifSize || 70}px`;
      messageGif.style.height = `${message.gifSize || 70}px`;
      messageGif.style.transform = "none";

      const text = document.createElement("p");
      text.textContent = message.text;

      visual.appendChild(candle);
      visual.appendChild(messageGif);

      note.appendChild(visual);
      note.appendChild(text);

      if (index % 2 === 0) {
        memoryWallLeft.appendChild(note);
      } else {
        memoryWallRight.appendChild(note);
      }
    });
  }

  candleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      candleButtons.forEach((btn) => btn.classList.remove("selected"));

      button.classList.add("selected");
      selectedCandle = button.dataset.candle;
      chosenCandleImg.src = selectedCandle;
    });
  });

  messageGifButtons.forEach((button) => {
    button.addEventListener("click", () => {
      messageGifButtons.forEach((btn) => btn.classList.remove("selected"));

      button.classList.add("selected");
      selectedMessageGif = button.dataset.messageGif;
      chosenMessageGifImg.src = selectedMessageGif;
    });
  });

  bgButtons.forEach((button) => {
    button.addEventListener("click", () => {
      bgButtons.forEach((btn) => btn.classList.remove("selected"));

      button.classList.add("selected");
      selectedBg = button.dataset.bg;
      previewCard.style.setProperty("--message-bg", `url("${selectedBg}")`);
    });
  });

  fontButtons.forEach((button) => {
    button.addEventListener("click", () => {
      fontButtons.forEach((btn) => btn.classList.remove("selected"));

      button.classList.add("selected");
      selectedFont = button.dataset.font;

      messageInput.style.setProperty("font-family", selectedFont, "important");
    });
  });

  // drag the GIF box
  let dragging = false;
  let resizing = false;
  let startMouseX = 0;
  let startMouseY = 0;
  let startX = 0;
  let startY = 0;
  let startSize = 90;

  transformBox.addEventListener("mousedown", (event) => {
    if (event.target === resizeHandle) {
      return;
    }

    dragging = true;
    startMouseX = event.clientX;
    startMouseY = event.clientY;
    startX = gifX;
    startY = gifY;

    event.preventDefault();
  });

  resizeHandle.addEventListener("mousedown", (event) => {
    resizing = true;
    startMouseX = event.clientX;
    startMouseY = event.clientY;
    startSize = gifSize;

    event.preventDefault();
    event.stopPropagation();
  });

  window.addEventListener("mousemove", (event) => {
    if (dragging) {
      gifX = startX + (event.clientX - startMouseX);
      gifY = startY + (event.clientY - startMouseY);

      gifX = Math.max(0, Math.min(180 - gifSize, gifX));
      gifY = Math.max(0, Math.min(180 - gifSize, gifY));

      updateTransformBox();
    }

    if (resizing) {
      const movement = Math.max(
        event.clientX - startMouseX,
        event.clientY - startMouseY
      );

      gifSize = Math.max(35, Math.min(160, startSize + movement));
      gifX = Math.max(0, Math.min(180 - gifSize, gifX));
      gifY = Math.max(0, Math.min(180 - gifSize, gifY));

      updateTransformBox();
    }
  });

  window.addEventListener("mouseup", () => {
    dragging = false;
    resizing = false;
  });

  postButton.addEventListener("click", () => {
    const text = messageInput.value.trim();

    if (!text) {
      messageInput.focus();
      return;
    }

    const messages = getSavedMessages();

    messages.push({
      text,
      candle: selectedCandle,
      messageGif: selectedMessageGif,
      background: selectedBg,
      font: selectedFont,
      gifX,
      gifY,
      gifSize,
      colour: colours[messages.length % colours.length],
    });

    saveMessages(messages);
    renderMessages();

    messageInput.value = "";
  });

  clearButton.addEventListener("click", () => {
    const confirmed = confirm("Clear all Blingee memory messages on this computer?");

    if (!confirmed) {
      return;
    }

    localStorage.removeItem("blingeeMemoryMessages");
    renderMessages();
  });

  candleButtons[0].classList.add("selected");
  messageGifButtons[0].classList.add("selected");
  bgButtons[0].classList.add("selected");
  fontButtons[0].classList.add("selected");

  previewCard.style.setProperty("--message-bg", `url("${selectedBg}")`);
  messageInput.style.setProperty("font-family", selectedFont, "important");

  updateTransformBox();
  renderMessages();
});