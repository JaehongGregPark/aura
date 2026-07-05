const portfolioData = {
  ko: {
    nav: {
      makeup: "메이크업",
      hair: "헤어",
      fashion: "패션",
      interior: "인테리어"
    },
    auth: {
      login: "로그인",
      guest: "게스트"
    },
    common: {
      eyebrow: "AI 토탈 스타일 큐레이션",
      title: "메이크업에서 시작해 나에게 맞는 라이프스타일까지.",
      lead: "AURA가 메이크업, 헤어, 패션, 인테리어를 하나의 취향 흐름으로 연결합니다.",
      sectionKicker: "지금 보고 있는 섹션",
      quizEyebrow: "온보딩 퀴즈",
      quizTitle: "취향 분석",
      reportEyebrow: "AI 스타일 리포트",
      summaryTitle: "AI Style Summary",
      ready: "실시간 생성",
      prev: "이전",
      next: "다음",
      finish: "리포트 보기",
      phaseOne: "Phase 1",
      phaseOneText: "메이크업 취향 분석과 AI 리포트",
      phaseTwo: "Phase 2",
      phaseTwoText: "전문가 상담과 1:1 매칭",
      phaseThree: "Phase 3",
      phaseThreeText: "헤어, 패션, 인테리어까지 확장"
    },
    areas: {
      makeup: {
        title: "메이크업",
        journey: "Makeup",
        hero: "피부 표현, 색조, 분위기를 먼저 분석해 전체 스타일의 기준을 잡습니다.",
        report: "Soft Glow Makeup",
        summary: "은은한 피부 표현과 장밋빛 컬러를 중심으로 헤어 톤, 데일리 룩, 공간 무드까지 자연스럽게 이어지는 스타일을 제안합니다.",
        tags: ["Skin-first", "Rose Glow", "Soft Balance"],
        palette: ["#fff7fa", "#f8ccd9", "#dfb0cf", "#c6bddf", "#76698a"]
      },
      hair: {
        title: "헤어",
        journey: "Hair",
        hero: "얼굴형과 피부 톤에 맞는 컬러, 길이, 질감을 찾아 메이크업과 균형을 맞춥니다.",
        report: "Airy Hair Balance",
        summary: "부드러운 레이어와 차분한 브라운 톤을 기준으로 얼굴 주변의 빛과 인상을 정돈하는 헤어 방향을 추천합니다.",
        tags: ["Layer", "Tone Match", "Face Line"],
        palette: ["#fff3eb", "#edc5b2", "#bd8f7a", "#8e6257", "#443239"]
      },
      fashion: {
        title: "패션",
        journey: "Fashion",
        hero: "실루엣, 소재, 컬러 조합을 읽어 매일 입기 좋은 스타일 언어로 확장합니다.",
        report: "Quiet Daily Look",
        summary: "정돈된 실루엣과 포인트 컬러를 섞어 메이크업과 헤어가 따로 보이지 않는 데일리 스타일을 구성합니다.",
        tags: ["Clean Line", "Daily Fit", "Color Point"],
        palette: ["#fbf7f1", "#d9d1c7", "#9a8f88", "#6d5967", "#302a35"]
      },
      interior: {
        title: "인테리어",
        journey: "Interior",
        hero: "개인의 분위기를 공간의 빛, 오브제, 향으로 번역해 오래 머무는 취향을 만듭니다.",
        report: "Calm Living Mood",
        summary: "차분한 조명과 자연 소재를 중심으로 스타일 리포트가 생활 공간에서도 이어지도록 컬러와 오브제 방향을 잡습니다.",
        tags: ["Warm Light", "Object", "Slow Mood"],
        palette: ["#fbfff8", "#dcebdc", "#a8c7ad", "#6e927a", "#29382f"]
      }
    },
    questions: [
      {
        label: "STEP 1",
        title: "가장 먼저 보고 싶은 섹션은 무엇인가요?",
        key: "area",
        options: [
          ["makeup", "메이크업", "피부 표현과 색조부터 시작"],
          ["hair", "헤어", "컬러와 실루엣 균형"],
          ["fashion", "패션", "데일리 룩과 소재감"],
          ["interior", "인테리어", "공간 무드와 오브제"]
        ]
      },
      {
        label: "STEP 2",
        title: "가장 가까운 스타일 방향은?",
        key: "style",
        options: [
          ["minimal", "미니멀", "맑고 정돈된 인상"],
          ["romantic", "로맨틱", "부드럽고 사랑스러운 결"],
          ["modern", "모던", "선명하고 세련된 균형"],
          ["natural", "내추럴", "편안하고 자연스러운 흐름"]
        ]
      },
      {
        label: "STEP 3",
        title: "오늘 만들고 싶은 분위기는?",
        key: "mood",
        options: [
          ["calm", "차분함", "낮은 채도와 안정감"],
          ["glow", "화사함", "밝은 빛과 생기"],
          ["chic", "시크함", "간결한 선과 대비"],
          ["warm", "따뜻함", "부드러운 온도감"]
        ]
      }
    ],
    labels: {
      minimal: "미니멀",
      romantic: "로맨틱",
      modern: "모던",
      natural: "내추럴",
      calm: "차분함",
      glow: "화사함",
      chic: "시크함",
      warm: "따뜻함"
    },
    assist: {
      chatAction: "채팅",
      expertAction: "전문가",
      chat: {
        eyebrow: "AURA Chat",
        title: "취향 상담",
        copy: "선택한 섹션과 리포트를 바탕으로 메이크업, 헤어, 패션, 인테리어 질문을 이어갈 수 있어요.",
        primary: "채팅 시작",
        chips: ["톤 매칭", "제품 추천", "룩 조합", "공간 무드"]
      },
      expert: {
        eyebrow: "AURA Expert",
        title: "전문가 상담",
        copy: "AI 리포트를 전문가에게 전달해 1:1 스타일 상담으로 이어가는 흐름입니다.",
        primary: "상담 요청",
        chips: ["메이크업", "헤어", "패션", "인테리어"]
      }
    },
    chat: {
      startedTitle: "AURA 채팅 시작",
      startedCopy: "현재 스타일 리포트를 바탕으로 채팅 준비가 완료됐어요.",
      send: "메시지 보내기",
      message: "메시지",
      placeholder: "톤, 제품, 헤어, 룩, 공간 무드에 대해 물어보세요.",
      introTemplate: "{areaTitle} 섹션과 {styleLabel} {moodLabel} 무드를 기준으로 상담을 시작할게요.",
      you: "나",
      replyTemplate: "좋아요. {areaTitle}에서는 {tag} 방향부터 보고, 지금 팔레트와 자연스럽게 연결해볼게요."
    },
    expert: {
      readyTitle: "상담 요청 준비 완료",
      readyCopy: "현재 리포트를 전문가에게 전달할 준비가 됐어요.",
      readyButton: "요청 준비 완료",
      section: "섹션",
      report: "리포트"
    }
  },
  en: {
    nav: {
      makeup: "Makeup",
      hair: "Hair",
      fashion: "Fashion",
      interior: "Interior"
    },
    auth: {
      login: "Log in",
      guest: "Guest"
    },
    common: {
      eyebrow: "AI total style curation",
      title: "Start with makeup, then expand into your lifestyle.",
      lead: "AURA connects makeup, hair, fashion, and interiors into one taste flow.",
      sectionKicker: "Current section",
      quizEyebrow: "Onboarding quiz",
      quizTitle: "Taste analysis",
      reportEyebrow: "AI style report",
      summaryTitle: "AI Style Summary",
      ready: "Live report",
      prev: "Back",
      next: "Next",
      finish: "View report",
      phaseOne: "Phase 1",
      phaseOneText: "Makeup taste analysis and AI report",
      phaseTwo: "Phase 2",
      phaseTwoText: "Expert consultation and 1:1 matching",
      phaseThree: "Phase 3",
      phaseThreeText: "Expansion into hair, fashion, and interiors"
    },
    areas: {
      makeup: {
        title: "Makeup",
        journey: "Makeup",
        hero: "Analyze skin finish, color, and mood first to set the anchor for the full style.",
        report: "Soft Glow Makeup",
        summary: "A soft skin finish and rosy palette become the base for connected hair tone, daily outfits, and living mood.",
        tags: ["Skin-first", "Rose Glow", "Soft Balance"],
        palette: ["#fff7fa", "#f8ccd9", "#dfb0cf", "#c6bddf", "#76698a"]
      },
      hair: {
        title: "Hair",
        journey: "Hair",
        hero: "Find color, length, and texture that balance your face shape, skin tone, and makeup.",
        report: "Airy Hair Balance",
        summary: "Soft layers and calm brown tones refine the light around the face and keep the overall impression balanced.",
        tags: ["Layer", "Tone Match", "Face Line"],
        palette: ["#fff3eb", "#edc5b2", "#bd8f7a", "#8e6257", "#443239"]
      },
      fashion: {
        title: "Fashion",
        journey: "Fashion",
        hero: "Read silhouette, material, and color pairings as a practical daily style language.",
        report: "Quiet Daily Look",
        summary: "Clean silhouettes and measured color points build daily looks that sit naturally with makeup and hair.",
        tags: ["Clean Line", "Daily Fit", "Color Point"],
        palette: ["#fbf7f1", "#d9d1c7", "#9a8f88", "#6d5967", "#302a35"]
      },
      interior: {
        title: "Interior",
        journey: "Interior",
        hero: "Translate personal mood into light, objects, scent, and a space you want to stay in.",
        report: "Calm Living Mood",
        summary: "Soft lighting and natural materials carry the style report into the room through color and object direction.",
        tags: ["Warm Light", "Object", "Slow Mood"],
        palette: ["#fbfff8", "#dcebdc", "#a8c7ad", "#6e927a", "#29382f"]
      }
    },
    questions: [
      {
        label: "STEP 1",
        title: "Which section should AURA show first?",
        key: "area",
        options: [
          ["makeup", "Makeup", "Skin finish and color"],
          ["hair", "Hair", "Color and silhouette"],
          ["fashion", "Fashion", "Daily looks and texture"],
          ["interior", "Interior", "Space mood and objects"]
        ]
      },
      {
        label: "STEP 2",
        title: "Which style direction feels closest?",
        key: "style",
        options: [
          ["minimal", "Minimal", "Clean and refined"],
          ["romantic", "Romantic", "Soft and lovely"],
          ["modern", "Modern", "Clear and polished"],
          ["natural", "Natural", "Easy and effortless"]
        ]
      },
      {
        label: "STEP 3",
        title: "What mood do you want today?",
        key: "mood",
        options: [
          ["calm", "Calm", "Low tone and stable"],
          ["glow", "Glow", "Bright and lively"],
          ["chic", "Chic", "Clean contrast"],
          ["warm", "Warm", "Soft temperature"]
        ]
      }
    ],
    labels: {
      minimal: "Minimal",
      romantic: "Romantic",
      modern: "Modern",
      natural: "Natural",
      calm: "Calm",
      glow: "Glow",
      chic: "Chic",
      warm: "Warm"
    },
    assist: {
      chatAction: "Chat",
      expertAction: "Expert",
      chat: {
        eyebrow: "AURA Chat",
        title: "Taste chat",
        copy: "Continue with quick questions about makeup, hair, fashion, and interiors based on the current report.",
        primary: "Start chat",
        chips: ["Tone match", "Product picks", "Look pairing", "Room mood"]
      },
      expert: {
        eyebrow: "AURA Expert",
        title: "Expert consultation",
        copy: "Send your AI report into a 1:1 consultation flow with a style expert.",
        primary: "Request consult",
        chips: ["Makeup", "Hair", "Fashion", "Interior"]
      }
    },
    chat: {
      startedTitle: "AURA Chat Started",
      startedCopy: "The chat is ready with your current style report.",
      send: "Send message",
      message: "Message",
      placeholder: "Ask about tone, products, hair, outfits, or space mood.",
      introTemplate: "AURA will start the consultation with the {areaTitle} section and your {styleLabel} {moodLabel} mood.",
      you: "You",
      replyTemplate: "Good. For {areaTitle}, I would start from {tag} and connect it with your current palette."
    },
    expert: {
      readyTitle: "Consult Request Ready",
      readyCopy: "Your current report is ready to hand off to an expert.",
      readyButton: "Request ready",
      section: "Section",
      report: "Report"
    }
  }
};
