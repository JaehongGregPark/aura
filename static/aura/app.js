const copy = {
  ko: {
    eyebrow: "AI 토탈 뷰티 큐레이션",
    title: "메이크업에서 시작해 나만의 라이프스타일까지.",
    lead: "관심사, 스타일, 분위기를 고르면 AURA가 메이크업 중심의 개인 취향 리포트와 확장 큐레이션을 생성합니다.",
    journeyMakeup: "Makeup",
    journeyHair: "Hair",
    journeyFashion: "Fashion",
    journeyInterior: "Interior",
    quizEyebrow: "온보딩 퀴즈",
    quizTitle: "취향 분석",
    prev: "이전",
    next: "다음",
    finish: "리포트 보기",
    reportEyebrow: "AI 스타일 리포트",
    ready: "실시간 생성",
    summaryTitle: "AI Style Summary",
    phaseOne: "Phase 1",
    phaseOneText: "취향 분석 엔진, AI 리포트, 기본 큐레이션 UI",
    phaseTwo: "Phase 2",
    phaseTwoText: "전문가 상담 섹션과 1:1 매칭",
    phaseThree: "Phase 3",
    phaseThreeText: "상품 연동과 스타일링 세트 커머스",
    chatAction: "챗",
    expertAction: "전문가",
    assist: {
      chat: {
        eyebrow: "AURA Chat",
        title: "취향 챗 상담",
        copy: "선택한 취향을 바탕으로 메이크업 톤, 헤어 컬러, 데일리 룩 질문을 가볍게 이어갈 수 있어요.",
        primary: "챗 시작",
        chips: ["톤 추천", "제품 질문", "룩 조합"]
      },
      expert: {
        eyebrow: "AURA Expert",
        title: "전문가 상담",
        copy: "AI 리포트를 전문가에게 전달해 메이크업 중심의 1:1 스타일 상담으로 이어갈 수 있어요.",
        primary: "상담 요청",
        chips: ["메이크업", "헤어", "패션 매칭"]
      }
    },
    questions: [
      {
        label: "STEP 1",
        title: "가장 먼저 큐레이션 받고 싶은 관심사는?",
        key: "interest",
        options: [
          ["makeup", "메이크업", "톤, 광채, 컬러 조합"],
          ["hair", "헤어", "스타일과 컬러 밸런스"],
          ["fashion", "패션", "실루엣과 데일리 룩"],
          ["interior", "인테리어", "공간 무드 확장"]
        ]
      },
      {
        label: "STEP 2",
        title: "선호하는 스타일 방향은?",
        key: "style",
        options: [
          ["minimal", "미니멀", "깨끗하고 정돈된 인상"],
          ["romantic", "로맨틱", "부드럽고 사랑스러운 결"],
          ["modern", "모던", "선명하고 세련된 균형"],
          ["vintage", "빈티지", "클래식한 질감과 색감"]
        ]
      },
      {
        label: "STEP 3",
        title: "오늘 만들고 싶은 분위기는?",
        key: "mood",
        options: [
          ["calm", "차분한", "은은한 톤과 안정감"],
          ["glam", "화려한", "반짝이는 포인트"],
          ["natural", "내추럴", "피부결 중심의 자연스러움"],
          ["urban", "도시적인", "차가운 선과 또렷한 대비"]
        ]
      }
    ],
    summaries: {
      makeup: "메이크업을 중심축으로 팔레트, 헤어 톤, 패션 컬러, 공간 무드까지 하나의 취향으로 연결합니다.",
      hair: "헤어 컬러와 질감을 기준으로 메이크업 톤을 조정하고 패션 실루엣까지 자연스럽게 이어갑니다.",
      fashion: "패션의 선과 소재감을 기준으로 메이크업 포인트와 헤어 연출을 균형 있게 추천합니다.",
      interior: "공간 취향에서 출발해 매일의 메이크업과 스타일링에 어울리는 컬러 감도를 제안합니다."
    }
  },
  en: {
    eyebrow: "AI total beauty curation",
    title: "From makeup to a lifestyle that feels unmistakably yours.",
    lead: "Choose your interests, style, and mood. AURA turns them into a makeup-led personal style report and connected curation.",
    journeyMakeup: "Makeup",
    journeyHair: "Hair",
    journeyFashion: "Fashion",
    journeyInterior: "Interior",
    quizEyebrow: "Onboarding quiz",
    quizTitle: "Taste analysis",
    prev: "Back",
    next: "Next",
    finish: "View report",
    reportEyebrow: "AI style report",
    ready: "Live report",
    summaryTitle: "AI Style Summary",
    phaseOne: "Phase 1",
    phaseOneText: "Taste engine, AI report, core curation UI",
    phaseTwo: "Phase 2",
    phaseTwoText: "Expert consultation and 1:1 matching",
    phaseThree: "Phase 3",
    phaseThreeText: "Product links and styling-set commerce",
    chatAction: "Chat",
    expertAction: "Expert",
    assist: {
      chat: {
        eyebrow: "AURA Chat",
        title: "Taste chat",
        copy: "Continue with quick questions about makeup tone, hair color, and daily looks based on your selected profile.",
        primary: "Start chat",
        chips: ["Tone match", "Product Q&A", "Look pairing"]
      },
      expert: {
        eyebrow: "AURA Expert",
        title: "Expert consultation",
        copy: "Send your AI report into a 1:1 consultation flow centered on makeup and connected styling.",
        primary: "Request consult",
        chips: ["Makeup", "Hair", "Fashion match"]
      }
    },
    questions: [
      {
        label: "STEP 1",
        title: "What would you like AURA to curate first?",
        key: "interest",
        options: [
          ["makeup", "Makeup", "Tone, glow, color pairing"],
          ["hair", "Hair", "Style and color balance"],
          ["fashion", "Fashion", "Silhouette and daily looks"],
          ["interior", "Interior", "Mood for your space"]
        ]
      },
      {
        label: "STEP 2",
        title: "Which style direction feels closest?",
        key: "style",
        options: [
          ["minimal", "Minimal", "Clean and composed"],
          ["romantic", "Romantic", "Soft and graceful"],
          ["modern", "Modern", "Sharp and balanced"],
          ["vintage", "Vintage", "Classic texture and color"]
        ]
      },
      {
        label: "STEP 3",
        title: "What mood do you want to create?",
        key: "mood",
        options: [
          ["calm", "Calm", "Gentle tones and ease"],
          ["glam", "Glam", "A polished highlight"],
          ["natural", "Natural", "Fresh skin-first styling"],
          ["urban", "Urban", "Cool lines and contrast"]
        ]
      }
    ],
    summaries: {
      makeup: "A makeup-first profile connects palette, hair tone, fashion color, and room mood into one coherent taste system.",
      hair: "A hair-led profile tunes makeup shades around color and texture, then carries that balance into styling.",
      fashion: "A fashion-led profile starts from line and material, then balances makeup points and hair direction.",
      interior: "A space-led profile translates atmosphere into everyday makeup colors and styling cues."
    }
  }
};

const palettes = {
  minimal: ["#fff7fa", "#f1dfe8", "#dfd8f5", "#c9c4ea", "#9c93bd"],
  romantic: ["#fff0f5", "#f7bdd1", "#dfa8d8", "#ddd7fb", "#beb3e4"],
  modern: ["#fbf7f8", "#d7d3dc", "#b9acd9", "#8d7faa", "#4f4558"],
  vintage: ["#fff1ec", "#e8c4c9", "#c9a5bd", "#b8b1d6", "#766d85"]
};

const moodTags = {
  calm: ["Soft", "Balanced", "Lavender Veil"],
  glam: ["Glowing", "Defined", "Pearl Point"],
  natural: ["Fresh", "Skin-first", "Airy Pink"],
  urban: ["Chic", "Clean Line", "Cool Contrast"]
};

let lang = "ko";
let step = 0;
const answers = {
  interest: "makeup",
  style: "romantic",
  mood: "calm"
};

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
let assistMode = "chat";

function translate() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = copy[lang][key];
  });
  chatActionLabel.textContent = copy[lang].chatAction;
  expertActionLabel.textContent = copy[lang].expertAction;
  renderAssist(assistMode);
  renderQuestion();
  renderReport();
}

function renderQuestion() {
  const question = copy[lang].questions[step];
  questionLabel.textContent = question.label;
  questionTitle.textContent = question.title;
  stepCurrent.textContent = String(step + 1);
  progressFill.style.width = `${((step + 1) / copy[lang].questions.length) * 100}%`;
  prevButton.disabled = step === 0;
  nextButton.textContent = step === copy[lang].questions.length - 1 ? copy[lang].finish : copy[lang].next;

  optionGrid.innerHTML = "";
  question.options.forEach(([value, label, helper]) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.dataset.value = value;
    button.innerHTML = `<strong>${label}</strong><span>${helper}</span>`;
    if (answers[question.key] === value) {
      button.classList.add("is-selected");
    }
    button.addEventListener("click", () => {
      answers[question.key] = value;
      renderQuestion();
      renderReport();
    });
    optionGrid.append(button);
  });
}

function renderReport() {
  const styleQuestion = copy[lang].questions[1];
  const moodQuestion = copy[lang].questions[2];
  const styleLabel = findLabel(styleQuestion, answers.style);
  const moodLabel = findLabel(moodQuestion, answers.mood);
  const interestLabel = findLabel(copy[lang].questions[0], answers.interest);

  reportTitle.textContent = `${styleLabel} ${moodLabel} ${interestLabel}`;
  summaryText.textContent = copy[lang].summaries[answers.interest];

  paletteRow.innerHTML = "";
  palettes[answers.style].forEach((color) => {
    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.style.background = color;
    paletteRow.append(swatch);
  });

  tagList.innerHTML = "";
  [styleLabel, moodLabel, ...moodTags[answers.mood]].forEach((tag) => {
    const item = document.createElement("span");
    item.textContent = tag;
    tagList.append(item);
  });
}

function findLabel(question, value) {
  return question.options.find((option) => option[0] === value)?.[1] ?? value;
}

function renderAssist(mode) {
  const content = copy[lang].assist[mode];
  assistEyebrow.textContent = content.eyebrow;
  assistTitle.textContent = content.title;
  assistCopy.textContent = content.copy;
  assistPrimary.textContent = content.primary;
  assistChips.innerHTML = "";
  content.chips.forEach((chip) => {
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
  if (step < copy[lang].questions.length - 1) {
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

translate();
