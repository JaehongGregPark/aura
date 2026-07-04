// Concept/language content lives in data.js (loaded before this file in
// index.html). This file only contains rendering + interaction logic.

let lang = "ko";
let activeConcept = "concept1";
let step = 0;
let answers = {};
let assistMode = "chat";

const body = document.body;
const brand = document.querySelector(".brand");
const conceptTitle = document.querySelector("#conceptTitle");
const conceptLead = document.querySelector("#conceptLead");
const conceptButtons = document.querySelectorAll(".concept-option");
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
const assistPrimary = document.querySelector("#assistPrimary");
const assistClose = document.querySelector("#assistClose");
const assistButtons = document.querySelectorAll(".assist-action");
const chatActionLabel = document.querySelector("#chatActionLabel");
const expertActionLabel = document.querySelector("#expertActionLabel");

function data() {
  return portfolioData[lang];
}

function concept() {
  return data().concepts[activeConcept];
}

function resetAnswers() {
  answers = { ...concept().defaults };
  step = 0;
}

function translate() {
  const ui = data().conceptUi;
  document.documentElement.lang = lang;
  document.querySelector("[data-i18n='conceptEyebrow']").textContent = ui.eyebrow;
  conceptTitle.textContent = ui.title;
  conceptLead.textContent = ui.lead;
  ui.options.forEach(([id, title, copy], index) => {
    const button = conceptButtons[index];
    button.dataset.concept = id;
    button.querySelector("strong").textContent = title;
    button.querySelector("span").textContent = copy;
  });
  applyConcept(false);
}

function applyConcept(shouldReset = true) {
  if (shouldReset) resetAnswers();
  const current = concept();
  body.className = activeConcept;
  brand.textContent = current.brand;
  setText("eyebrow", current.eyebrow);
  setText("title", current.title);
  setText("lead", current.lead);
  setText("quizEyebrow", current.quizEyebrow);
  setText("quizTitle", current.quizTitle);
  setText("reportEyebrow", current.reportEyebrow);
  setText("ready", data().common.ready);
  setText("summaryTitle", current.summaryTitle);
  ["journeyMakeup", "journeyHair", "journeyFashion", "journeyInterior"].forEach((key, index) => setText(key, current.journey[index]));
  ["phaseOne", "phaseTwo", "phaseThree"].forEach((key, index) => setText(key, current.phases[index][0]));
  ["phaseOneText", "phaseTwoText", "phaseThreeText"].forEach((key, index) => setText(key, current.phases[index][1]));
  chatActionLabel.textContent = current.assist.chatAction;
  expertActionLabel.textContent = current.assist.expertAction;
  conceptButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.concept === activeConcept));
  renderAssist(assistMode);
  renderQuestion();
  renderReport();
}

function setText(key, value) {
  document.querySelectorAll(`[data-i18n="${key}"]`).forEach((element) => {
    element.textContent = value;
  });
}

function renderQuestion() {
  const questions = concept().questions;
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
    button.innerHTML = `<strong>${label}</strong><span>${helper}</span>`;
    if (answers[question.key] === value) button.classList.add("is-selected");
    button.addEventListener("click", () => {
      answers[question.key] = value;
      renderQuestion();
      renderReport();
    });
    optionGrid.append(button);
  });
}

function renderReport() {
  const current = concept();
  const styleLabel = findLabel(current.questions[1], answers.style);
  const moodLabel = findLabel(current.questions[2], answers.mood);
  const interestLabel = findLabel(current.questions[0], answers.interest);

  reportTitle.textContent = `${styleLabel} ${moodLabel} ${interestLabel}`;
  summaryText.textContent = current.summaries[answers.interest];

  paletteRow.innerHTML = "";
  current.palettes[answers.style].forEach((color) => {
    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.style.background = color;
    paletteRow.append(swatch);
  });

  tagList.innerHTML = "";
  [styleLabel, moodLabel, ...current.moodTags[answers.mood]].forEach((tag) => {
    const item = document.createElement("span");
    item.textContent = tag;
    tagList.append(item);
  });
}

function findLabel(question, value) {
  return question.options.find((option) => option[0] === value)?.[1] ?? value;
}

function renderAssist(mode) {
  const [eyebrow, title, copy, primary, chips] = concept().assist[mode];
  assistEyebrow.textContent = eyebrow;
  assistTitle.textContent = title;
  assistCopy.textContent = copy;
  assistPrimary.textContent = primary;
  assistChips.innerHTML = "";
  chips.forEach((chip) => {
    const item = document.createElement("span");
    item.textContent = chip;
    assistChips.append(item);
  });
  assistButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.assist === mode && !assistCard.hidden);
  });
}

prevButton.addEventListener("click", () => {
  step = Math.max(0, step - 1);
  renderQuestion();
});

nextButton.addEventListener("click", () => {
  if (step < concept().questions.length - 1) {
    step += 1;
    renderQuestion();
    return;
  }
  document.querySelector(".report-panel").scrollIntoView({ behavior: "smooth", block: "center" });
});

document.querySelectorAll(".lang-button").forEach((button) => {
  button.addEventListener("click", () => {
    lang = button.dataset.lang;
    document.querySelectorAll(".lang-button").forEach((item) => item.classList.toggle("is-active", item === button));
    translate();
  });
});

conceptButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeConcept = button.dataset.concept;
    applyConcept(true);
  });
});

assistButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedMode = button.dataset.assist;
    const shouldClose = !assistCard.hidden && assistMode === selectedMode;
    assistMode = selectedMode;
    assistCard.hidden = shouldClose;
    renderAssist(assistMode);
  });
});

assistClose.addEventListener("click", () => {
  assistCard.hidden = true;
  renderAssist(assistMode);
});

resetAnswers();
translate();
