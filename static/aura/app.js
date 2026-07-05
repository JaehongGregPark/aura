let lang = "ko";
let activeArea = "makeup";
let step = 0;
let answers = {
  area: "makeup",
  style: "romantic",
  mood: "calm",
};
let autoCycleId = null;
let userHasChosenArea = false;
let assistMode = "chat";
let chatStarted = false;
let expertRequested = false;
let managedPortfolioData = portfolioData;

const areaOrder = ["makeup", "hair", "fashion", "interior"];

const body = document.body;
const categoryTabs = document.querySelectorAll(".category-tab");
const langButtons = document.querySelectorAll(".lang-button");
const authButtons = document.querySelectorAll(".auth-button");
const activeAreaTitle = document.querySelector("#activeAreaTitle");
const activeAreaCopy = document.querySelector("#activeAreaCopy");
const journeyLabels = document.querySelectorAll("[data-area-label]");
const optionGrid = document.querySelector("#optionGrid");
const questionLabel = document.querySelector("#questionLabel");
const questionTitle = document.querySelector("#questionTitle");
const stepCurrent = document.querySelector("#stepCurrent");
const progressFill = document.querySelector("#progressFill");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const paletteRow = document.querySelector("#paletteRow");
const tagList = document.querySelector("#tagList");
const summaryText = document.querySelector("#summaryText");
const reportTitle = document.querySelector("#reportTitle");
const assistCard = document.querySelector("#assistCard");
const assistEyebrow = document.querySelector("#assistEyebrow");
const assistTitle = document.querySelector("#assistTitle");
const assistCopy = document.querySelector("#assistCopy");
const assistChips = document.querySelector("#assistChips");
const assistSummary = document.querySelector("#assistSummary");
const assistPrimary = document.querySelector("#assistPrimary");
const assistClose = document.querySelector("#assistClose");
const assistButtons = document.querySelectorAll(".assist-action");
const chatActionLabel = document.querySelector("#chatActionLabel");
const expertActionLabel = document.querySelector("#expertActionLabel");

function data() {
  return managedPortfolioData[lang];
}

function area() {
  return data().areas[activeArea];
}

function labels() {
  return data().labels;
}

function setText(key, value) {
  document.querySelectorAll(`[data-i18n="${key}"]`).forEach((element) => {
    element.textContent = value;
  });
}

function translate(nextLang) {
  lang = nextLang;
  document.documentElement.lang = lang;

  const currentData = data();
  Object.entries(currentData.common).forEach(([key, value]) => setText(key, value));

  categoryTabs.forEach((tab) => {
    tab.textContent = currentData.nav[tab.dataset.area];
  });

  authButtons.forEach((button) => {
    button.textContent = currentData.auth[button.dataset.auth];
  });

  chatActionLabel.textContent = currentData.assist.chatAction;
  expertActionLabel.textContent = currentData.assist.expertAction;

  langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === lang);
  });

  renderAll();
}

function setActiveArea(nextArea, { fromUser = false } = {}) {
  activeArea = nextArea;
  answers.area = nextArea;

  if (fromUser) {
    userHasChosenArea = true;
    stopAutoCycle();
  }

  renderAll();
}

function renderAll() {
  renderArea();
  renderQuestion();
  renderReport();
  renderAssist();
}

function renderArea() {
  const current = area();
  body.className = `area-${activeArea}`;
  activeAreaTitle.textContent = current.title;
  activeAreaCopy.textContent = current.hero;

  categoryTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.area === activeArea);
  });

  journeyLabels.forEach((label) => {
    const labelArea = label.dataset.areaLabel;
    label.textContent = data().areas[labelArea].journey;
    label.classList.toggle("is-active", labelArea === activeArea);
  });
}

function renderQuestion() {
  const questions = data().questions;
  const question = questions[step];

  questionLabel.textContent = question.label;
  questionTitle.textContent = question.title;
  stepCurrent.textContent = String(step + 1);
  progressFill.style.width = `${((step + 1) / questions.length) * 100}%`;
  prevButton.disabled = step === 0;
  prevButton.textContent = data().common.prev;
  nextButton.textContent = step === questions.length - 1 ? data().common.finish : data().common.next;

  optionGrid.innerHTML = "";
  question.options.forEach(([value, label, helper]) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.dataset.value = value;

    const title = document.createElement("strong");
    title.textContent = label;

    const copy = document.createElement("span");
    copy.textContent = helper;

    button.append(title, copy);
    button.classList.toggle("is-selected", answers[question.key] === value);
    button.addEventListener("click", () => {
      answers[question.key] = value;
      if (question.key === "area") {
        setActiveArea(value, { fromUser: true });
        return;
      }
      renderQuestion();
      renderReport();
      renderAssist();
    });
    optionGrid.append(button);
  });
}

function renderReport() {
  const current = area();
  const currentLabels = labels();
  reportTitle.textContent = `${currentLabels[answers.style]} ${currentLabels[answers.mood]} ${current.report}`;
  summaryText.textContent = current.summary;

  paletteRow.innerHTML = "";
  current.palette.forEach((color) => {
    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.style.background = color;
    paletteRow.append(swatch);
  });

  tagList.innerHTML = "";
  [currentLabels[answers.style], currentLabels[answers.mood], ...current.tags].forEach((tag) => {
    const item = document.createElement("span");
    item.textContent = tag;
    tagList.append(item);
  });
}

function renderAssist() {
  const content = data().assist[assistMode];
  assistEyebrow.textContent = content.eyebrow;
  assistTitle.textContent = content.title;
  assistCopy.textContent = content.copy;
  assistPrimary.textContent = content.primary;
  assistPrimary.disabled = false;
  assistPrimary.onclick = assistMode === "chat" ? startChat : requestExpert;

  assistChips.innerHTML = "";
  content.chips.forEach((chip) => {
    const item = document.createElement("span");
    item.textContent = chip;
    assistChips.append(item);
  });

  if (assistMode === "chat" && chatStarted) {
    renderChatStarted();
  } else if (assistMode === "expert" && expertRequested) {
    renderExpertRequested();
  } else {
    assistSummary.hidden = true;
    assistSummary.innerHTML = "";
  }

  assistButtons.forEach((button) => {
    button.classList.toggle("is-active", !assistCard.hidden && button.dataset.assist === assistMode);
  });
}

function startChat() {
  chatStarted = true;
  renderAssist();
}

function requestExpert() {
  expertRequested = true;
  renderAssist();
}

function renderChatStarted() {
  const current = area();
  const currentLabels = labels();
  const chat = data().chat;

  assistTitle.textContent = chat.startedTitle;
  assistCopy.textContent = chat.startedCopy;
  assistPrimary.textContent = chat.send;

  assistSummary.hidden = false;
  assistSummary.innerHTML = "";

  const thread = document.createElement("div");
  thread.className = "chat-thread";
  thread.setAttribute("aria-live", "polite");

  const intro = document.createElement("p");
  intro.innerHTML = `<strong>AURA</strong> ${formatTemplate(chat.introTemplate, {
    areaTitle: current.title,
    styleLabel: currentLabels[answers.style],
    moodLabel: currentLabels[answers.mood],
  })}`;
  thread.append(intro);

  const label = document.createElement("label");
  label.className = "chat-composer";

  const labelText = document.createElement("span");
  labelText.textContent = chat.message;

  const textarea = document.createElement("textarea");
  textarea.rows = 3;
  textarea.placeholder = chat.placeholder;

  label.append(labelText, textarea);
  assistSummary.append(thread, label);

  assistPrimary.onclick = () => {
    const value = textarea.value.trim();
    if (!value) {
      textarea.focus();
      return;
    }

    const userMessage = document.createElement("p");
    userMessage.innerHTML = `<strong>${chat.you}</strong> ${escapeHtml(value)}`;

    const auraMessage = document.createElement("p");
    auraMessage.innerHTML = `<strong>AURA</strong> ${formatTemplate(chat.replyTemplate, {
      areaTitle: current.title,
      tag: current.tags[0],
    })}`;

    thread.append(userMessage, auraMessage);
    textarea.value = "";
    textarea.focus();
  };
}

function renderExpertRequested() {
  const current = area();
  const expert = data().expert;

  assistTitle.textContent = expert.readyTitle;
  assistCopy.textContent = expert.readyCopy;
  assistPrimary.textContent = expert.readyButton;
  assistPrimary.disabled = true;

  assistSummary.hidden = false;
  assistSummary.innerHTML = "";

  [
    [expert.section, current.title],
    [expert.report, reportTitle.textContent],
  ].forEach(([label, value]) => {
    const row = document.createElement("div");
    row.className = "assist-summary-row";

    const key = document.createElement("strong");
    key.textContent = label;

    const text = document.createElement("span");
    text.textContent = value;

    row.append(key, text);
    assistSummary.append(row);
  });
}

function escapeHtml(value) {
  const element = document.createElement("span");
  element.textContent = value;
  return element.innerHTML;
}

function formatTemplate(template, values) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, value),
    template
  );
}

async function loadManagedContent() {
  try {
    const response = await fetch("/api/content/", { cache: "no-store" });
    if (!response.ok) throw new Error("Content API failed");
    managedPortfolioData = await response.json();
  } catch (error) {
    managedPortfolioData = portfolioData;
  }
}

function startAutoCycle() {
  stopAutoCycle();
  autoCycleId = window.setInterval(() => {
    if (userHasChosenArea) {
      stopAutoCycle();
      return;
    }

    const currentIndex = areaOrder.indexOf(activeArea);
    const nextArea = areaOrder[(currentIndex + 1) % areaOrder.length];
    setActiveArea(nextArea);
  }, 2800);
}

function stopAutoCycle() {
  if (!autoCycleId) return;
  window.clearInterval(autoCycleId);
  autoCycleId = null;
}

categoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveArea(tab.dataset.area, { fromUser: true });
  });
});

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    translate(button.dataset.lang);
  });
});

authButtons.forEach((button) => {
  button.addEventListener("click", () => {
    authButtons.forEach((item) => item.classList.toggle("is-active", item === button));
  });
});

prevButton.addEventListener("click", () => {
  step = Math.max(0, step - 1);
  renderQuestion();
});

nextButton.addEventListener("click", () => {
  if (step < data().questions.length - 1) {
    step += 1;
    renderQuestion();
    return;
  }
  document.querySelector(".report-panel").scrollIntoView({ behavior: "smooth", block: "center" });
});

assistButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedMode = button.dataset.assist;
    const shouldClose = !assistCard.hidden && assistMode === selectedMode;
    assistMode = selectedMode;
    assistCard.hidden = shouldClose;
    renderAssist();
  });
});

assistClose.addEventListener("click", () => {
  assistCard.hidden = true;
  renderAssist();
});

loadManagedContent().finally(() => {
  translate("ko");
  startAutoCycle();
});
