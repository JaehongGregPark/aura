// Concept/language content lives in data.js (loaded before this file in
// index.html). This file only contains rendering + interaction logic.

let lang = "ko";
let activeConcept = "concept1";
let step = 0;
let answers = {};
let assistMode = "chat";
let consultStep = 0;
let expertRequested = false;

const consultAnswers = {
  occasion: null,
  concern: null,
  finish: null,
};

const consultQuestions = {
  ko: [
    {
      key: "occasion",
      label: "1. 상담 목적",
      title: "어떤 상황의 메이크업이 필요하세요?",
      options: [
        ["daily", "데일리 보정"],
        ["event", "중요한 일정"],
        ["shoot", "촬영/프로필"],
        ["product", "제품 추천"],
      ],
    },
    {
      key: "concern",
      label: "2. 핵심 고민",
      title: "가장 먼저 해결하고 싶은 포인트는?",
      options: [
        ["redness", "홍조"],
        ["dark-circles", "다크서클"],
        ["dryness", "건조함"],
        ["lasting", "지속력"],
        ["pores", "모공"],
      ],
    },
    {
      key: "finish",
      label: "3. 원하는 결과",
      title: "상담 후 어떤 인상을 원하세요?",
      options: [
        ["glow", "자연스러운 광채"],
        ["defined", "또렷한 인상"],
        ["calm", "차분한 무드"],
        ["statement", "화려한 포인트"],
      ],
    },
  ],
  en: [
    {
      key: "occasion",
      label: "1. Goal",
      title: "What situation is this makeup for?",
      options: [
        ["daily", "Daily polish"],
        ["event", "Important event"],
        ["shoot", "Profile shoot"],
        ["product", "Product picks"],
      ],
    },
    {
      key: "concern",
      label: "2. Concern",
      title: "What should the consultation solve first?",
      options: [
        ["redness", "Redness"],
        ["dark-circles", "Dark circles"],
        ["dryness", "Dryness"],
        ["lasting", "Lasting power"],
        ["pores", "Pores"],
      ],
    },
    {
      key: "finish",
      label: "3. Result",
      title: "What impression do you want after the consult?",
      options: [
        ["glow", "Natural glow"],
        ["defined", "Defined look"],
        ["calm", "Calm mood"],
        ["statement", "Statement point"],
      ],
    },
  ],
};

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
let assistSummary = document.querySelector("#assistSummary");
const assistPrimary = document.querySelector("#assistPrimary");
const assistClose = document.querySelector("#assistClose");
const assistButtons = document.querySelectorAll(".assist-action");
const chatActionLabel = document.querySelector("#chatActionLabel");
const expertActionLabel = document.querySelector("#expertActionLabel");

if (!assistSummary) {
  assistSummary = document.createElement("div");
  assistSummary.className = "assist-summary";
  assistSummary.id = "assistSummary";
  assistSummary.hidden = true;
  assistPrimary.before(assistSummary);
}

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
  if (activeConcept === "concept1" && mode === "chat") {
    renderConsultHelper();
    return;
  }

  if (activeConcept === "concept1" && mode === "expert") {
    renderExpertHandoff();
    return;
  }

  const [eyebrow, title, copy, primary, chips] = concept().assist[mode];
  assistEyebrow.textContent = eyebrow;
  assistTitle.textContent = title;
  assistCopy.textContent = copy;
  assistPrimary.textContent = primary;
  assistChips.innerHTML = "";
  assistSummary.hidden = true;
  assistSummary.innerHTML = "";
  assistPrimary.disabled = false;
  assistPrimary.onclick = null;
  chips.forEach((chip) => {
    const item = document.createElement("span");
    item.textContent = chip;
    assistChips.append(item);
  });
  updateAssistButtonState(mode);
}

function updateAssistButtonState(mode) {
  assistButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.assist === mode && !assistCard.hidden);
  });
}

function currentConsultQuestions() {
  return consultQuestions[lang] ?? consultQuestions.ko;
}

function isConsultComplete() {
  return currentConsultQuestions().every((question) => consultAnswers[question.key]);
}

function findConsultLabel(key) {
  const question = currentConsultQuestions().find((item) => item.key === key);
  return question?.options.find(([value]) => value === consultAnswers[key])?.[1] ?? consultAnswers[key];
}

function getQuizSummary() {
  const current = concept();
  return {
    interest: findLabel(current.questions[0], answers.interest),
    style: findLabel(current.questions[1], answers.style),
    mood: findLabel(current.questions[2], answers.mood),
  };
}

function buildConsultSummary() {
  const quiz = getQuizSummary();
  if (lang === "en") {
    return [
      ["AI report", `${quiz.style} ${quiz.mood} ${quiz.interest}`],
      ["Goal", findConsultLabel("occasion")],
      ["Concern", findConsultLabel("concern")],
      ["Wanted result", findConsultLabel("finish")],
      ["Request", "Start with base makeup, color palette, and daily product direction."],
    ];
  }

  return [
    ["AI 리포트", `${quiz.style} ${quiz.mood} ${quiz.interest}`],
    ["상담 목적", findConsultLabel("occasion")],
    ["핵심 고민", findConsultLabel("concern")],
    ["원하는 결과", findConsultLabel("finish")],
    ["요청 방향", "피부 표현, 컬러 팔레트, 데일리 제품 방향을 먼저 상담"],
  ];
}

function renderSummaryRows(rows) {
  assistSummary.innerHTML = "";
  rows.forEach(([label, value]) => {
    const row = document.createElement("div");
    row.className = "assist-summary-row";

    const term = document.createElement("strong");
    term.textContent = label;

    const description = document.createElement("span");
    description.textContent = value;

    row.append(term, description);
    assistSummary.append(row);
  });
}

function renderConsultHelper() {
  const questions = currentConsultQuestions();
  const question = questions[consultStep];
  const complete = isConsultComplete();

  assistEyebrow.textContent = lang === "en" ? "Pre-Consult Helper" : "상담 전 정리 도우미";
  assistTitle.textContent = complete ? (lang === "en" ? "Consult Summary" : "전문가 전달 요약") : question.title;
  assistCopy.textContent = complete
    ? (lang === "en" ? "This summary combines your AI report with the consultation brief." : "AI 리포트와 상담 목적을 합쳐 전문가에게 전달할 핵심 내용을 정리했어요.")
    : (lang === "en" ? "Answer three quick prompts before meeting an expert." : "전문가 상담 전에 목적, 고민, 원하는 결과를 3단계로 정리합니다.");

  assistChips.innerHTML = "";
  assistSummary.hidden = !complete;
  assistSummary.innerHTML = "";
  assistPrimary.disabled = false;

  if (complete) {
    renderSummaryRows(buildConsultSummary());
    buildConsultSummary().slice(1, 4).forEach(([, value]) => {
      const item = document.createElement("span");
      item.textContent = value;
      assistChips.append(item);
    });
    assistPrimary.textContent = lang === "en" ? "Send to expert" : "전문가에게 전달하기";
    assistPrimary.onclick = () => {
      assistMode = "expert";
      renderAssist("expert");
    };
    updateAssistButtonState("chat");
    return;
  }

  const selected = consultAnswers[question.key];
  assistChips.dataset.step = question.label;
  question.options.forEach(([value, label]) => {
    const button = document.createElement("button");
    button.className = "assist-chip-button";
    button.type = "button";
    button.textContent = label;
    button.classList.toggle("is-selected", selected === value);
    button.addEventListener("click", () => {
      consultAnswers[question.key] = value;
      renderConsultHelper();
    });
    assistChips.append(button);
  });

  assistPrimary.textContent = consultStep === questions.length - 1
    ? (lang === "en" ? "Make summary" : "요약 만들기")
    : (lang === "en" ? "Next" : "다음");
  assistPrimary.disabled = !selected;
  assistPrimary.onclick = () => {
    if (!consultAnswers[question.key]) return;
    consultStep = Math.min(questions.length - 1, consultStep + 1);
    renderConsultHelper();
  };
  updateAssistButtonState("chat");
}

function renderExpertHandoff() {
  const complete = isConsultComplete();
  assistEyebrow.textContent = lang === "en" ? "AURA Expert" : "전문가 상담";
  assistChips.innerHTML = "";
  assistSummary.hidden = !complete;
  assistSummary.innerHTML = "";
  assistPrimary.disabled = false;

  if (!complete) {
    assistTitle.textContent = lang === "en" ? "Summary needed first" : "상담 요약이 먼저 필요해요";
    assistCopy.textContent = lang === "en"
      ? "Complete the three-step helper so the expert receives a clear brief."
      : "챗에서 3단계 정리를 완료하면 전문가에게 보낼 요약이 자동으로 만들어집니다.";
    const item = document.createElement("span");
    item.textContent = lang === "en" ? "3-step brief" : "3단계 정리";
    assistChips.append(item);
    assistPrimary.textContent = lang === "en" ? "Open helper" : "정리 도우미 열기";
    assistPrimary.onclick = () => {
      assistMode = "chat";
      renderAssist("chat");
    };
    updateAssistButtonState("expert");
    return;
  }

  assistTitle.textContent = expertRequested
    ? (lang === "en" ? "Request draft ready" : "상담 요청 초안 준비 완료")
    : (lang === "en" ? "Ready for handoff" : "전문가 전달 준비 완료");
  assistCopy.textContent = expertRequested
    ? (lang === "en" ? "The expert can start from this brief." : "전문가는 아래 요약을 기준으로 바로 상담을 시작할 수 있어요.")
    : (lang === "en" ? "Use this brief as the starting point for a 1:1 makeup consultation." : "아래 요약을 기준으로 1:1 메이크업 상담을 요청합니다.");
  renderSummaryRows(buildConsultSummary());
  assistPrimary.textContent = expertRequested
    ? (lang === "en" ? "Ready" : "요청 준비 완료")
    : (lang === "en" ? "Request 1:1 consult" : "1:1 상담 요청");
  assistPrimary.onclick = () => {
    expertRequested = true;
    renderExpertHandoff();
  };
  updateAssistButtonState("expert");
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
