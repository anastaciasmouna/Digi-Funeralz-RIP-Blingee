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