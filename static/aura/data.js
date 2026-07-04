const portfolioData = {
  ko: {
    conceptUi: {
      eyebrow: "PORTFOLIO OPTIONS",
      title: "첫 화면 콘셉트를 선택하세요.",
      lead: "1안은 현재 AURA 큐레이션을 유지하고, 2안과 3안은 완전히 다른 포트폴리오 무드로 전환됩니다.",
      options: [
        ["concept1", "1안", "AURA 뷰티 큐레이션"],
        ["concept2", "2안", "패션 에디토리얼 아틀리에"],
        ["concept3", "3안", "리빙 웰니스 포트폴리오"]
      ]
    },
    common: {
      prev: "이전",
      next: "다음",
      finish: "리포트 보기",
      ready: "실시간 생성"
    },
    concepts: {
      concept1: {
        brand: "AURA",
        eyebrow: "AI 토탈 뷰티 큐레이션",
        title: "메이크업에서 시작해 나만의 라이프스타일까지.",
        lead: "관심사, 스타일, 분위기를 고르면 AURA가 메이크업 중심의 개인 취향 리포트와 확장 큐레이션을 생성합니다.",
        journey: ["Makeup", "Hair", "Fashion", "Interior"],
        quizEyebrow: "온보딩 퀴즈",
        quizTitle: "취향 분석",
        reportEyebrow: "AI 스타일 리포트",
        summaryTitle: "AI Style Summary",
        phases: [
          ["Phase 1", "취향 분석 엔진, AI 리포트, 기본 큐레이션 UI"],
          ["Phase 2", "전문가 상담 섹션과 1:1 매칭"],
          ["Phase 3", "상품 연동과 스타일링 세트 커머스"]
        ],
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
        defaults: { interest: "makeup", style: "romantic", mood: "calm" },
        summaries: {
          makeup: "메이크업을 중심축으로 팔레트, 헤어 톤, 패션 컬러, 공간 무드까지 하나의 취향으로 연결합니다.",
          hair: "헤어 컬러와 질감을 기준으로 메이크업 톤을 조정하고 패션 실루엣까지 자연스럽게 이어갑니다.",
          fashion: "패션의 선과 소재감을 기준으로 메이크업 포인트와 헤어 연출을 균형 있게 추천합니다.",
          interior: "공간 취향에서 출발해 매일의 메이크업과 스타일링에 어울리는 컬러 감도를 제안합니다."
        },
        palettes: {
          minimal: ["#fff7fa", "#f1dfe8", "#dfd8f5", "#c9c4ea", "#9c93bd"],
          romantic: ["#fff0f5", "#f7bdd1", "#dfa8d8", "#ddd7fb", "#beb3e4"],
          modern: ["#fbf7f8", "#d7d3dc", "#b9acd9", "#8d7faa", "#4f4558"],
          vintage: ["#fff1ec", "#e8c4c9", "#c9a5bd", "#b8b1d6", "#766d85"]
        },
        moodTags: {
          calm: ["Soft", "Balanced", "Lavender Veil"],
          glam: ["Glowing", "Defined", "Pearl Point"],
          natural: ["Fresh", "Skin-first", "Airy Pink"],
          urban: ["Chic", "Clean Line", "Cool Contrast"]
        },
        assist: {
          chatAction: "챗",
          expertAction: "전문가",
          chat: ["AURA Chat", "취향 챗 상담", "선택한 취향을 바탕으로 메이크업 톤, 헤어 컬러, 데일리 룩 질문을 가볍게 이어갈 수 있어요.", "챗 시작", ["톤 추천", "제품 질문", "룩 조합"]],
          expert: ["AURA Expert", "전문가 상담", "AI 리포트를 전문가에게 전달해 메이크업 중심의 1:1 스타일 상담으로 이어갈 수 있어요.", "상담 요청", ["메이크업", "헤어", "패션 매칭"]]
        }
      },
      concept2: {
        brand: "NOIR ATELIER",
        eyebrow: "AI 패션 에디토리얼 포트폴리오",
        title: "한 사람의 실루엣을 하나의 캠페인처럼 설계합니다.",
        lead: "브랜드 아이덴티티, 룩북, 소재감, 촬영 무드를 조합해 개인 혹은 브랜드의 패션 포트폴리오를 에디토리얼 톤으로 구성합니다.",
        journey: ["Identity", "Lookbook", "Wardrobe", "Campaign"],
        quizEyebrow: "디렉션 보드",
        quizTitle: "에디토리얼 설계",
        reportEyebrow: "Campaign Direction",
        summaryTitle: "Editorial Summary",
        phases: [
          ["Chapter 1", "시그니처 실루엣과 룩북 무드보드 구성"],
          ["Chapter 2", "촬영 콘셉트, 스타일링 컷, 포트폴리오 페이지 확장"],
          ["Chapter 3", "브랜드 협업 제안서와 캠페인 패키지 구성"]
        ],
        questions: [
          {
            label: "BOARD 1",
            title: "이번 포트폴리오의 중심 결과물은?",
            key: "interest",
            options: [
              ["identity", "브랜드 아이덴티티", "로고 없이도 기억되는 인상"],
              ["lookbook", "룩북", "착장과 포즈 중심의 시퀀스"],
              ["runway", "런웨이 무드", "움직임과 구조감"],
              ["campaign", "디지털 캠페인", "SNS와 웹 비주얼 확장"]
            ]
          },
          {
            label: "BOARD 2",
            title: "가장 강하게 가져갈 스타일 언어는?",
            key: "style",
            options: [
              ["tailored", "테일러드", "정제된 재킷과 선"],
              ["sculptural", "스컬프처럴", "조형적인 볼륨"],
              ["street", "스트리트", "레이어와 텍스처"],
              ["luxury", "럭셔리", "광택과 밀도 있는 소재"]
            ]
          },
          {
            label: "BOARD 3",
            title: "촬영의 감정 온도는?",
            key: "mood",
            options: [
              ["sharp", "샤프한", "명확한 대비"],
              ["velvet", "벨벳 같은", "깊고 부드러운 그림자"],
              ["metallic", "메탈릭", "차가운 반사광"],
              ["afterdark", "애프터다크", "밤의 네온과 긴장감"]
            ]
          }
        ],
        defaults: { interest: "lookbook", style: "tailored", mood: "velvet" },
        summaries: {
          identity: "브랜드의 핵심 인상을 실루엣, 타이포그래피, 컷 구성으로 압축해 오래 남는 포트폴리오 첫 장을 만듭니다.",
          lookbook: "착장별 리듬과 화면 간 긴장감을 설계해 하나의 에디토리얼 시퀀스로 읽히게 합니다.",
          runway: "움직임이 있는 라인과 구조감을 중심으로 런웨이형 프레젠테이션에 가까운 흐름을 추천합니다.",
          campaign: "짧은 카피, 강한 썸네일, 반복 가능한 비주얼 규칙으로 디지털 캠페인 확장성을 만듭니다."
        },
        palettes: {
          tailored: ["#fffaf4", "#d8c6bb", "#8f1f36", "#3a2723", "#171518"],
          sculptural: ["#f5efe7", "#c8b26a", "#b99a8a", "#7a1730", "#282428"],
          street: ["#f8f1ea", "#a7a099", "#7e2433", "#35333a", "#09090b"],
          luxury: ["#fff7e8", "#d4b76a", "#9b263f", "#5a3c30", "#1d1818"]
        },
        moodTags: {
          sharp: ["High Contrast", "Clean Cut", "Chrome Line"],
          velvet: ["Deep Shadow", "Soft Grain", "Quiet Luxury"],
          metallic: ["Cold Flash", "Mirror Edge", "Tech Noir"],
          afterdark: ["Night Signal", "Low Light", "Bold Tension"]
        },
        assist: {
          chatAction: "디렉터",
          expertAction: "스타일리스트",
          chat: ["NOIR Director", "무드보드 챗", "룩북 컷 순서, 소재 조합, 캠페인 카피를 빠르게 점검합니다.", "보드 점검", ["룩북", "촬영", "카피"]],
          expert: ["NOIR Stylist", "스타일리스트 상담", "선택한 포트폴리오 방향을 기반으로 착장 구성과 촬영 콘셉트 상담을 연결합니다.", "상담 요청", ["착장", "포즈", "캠페인"]]
        }
      },
      concept3: {
        brand: "VERDE HOUSE",
        eyebrow: "AI 리빙 웰니스 포트폴리오",
        title: "공간, 향, 소리, 루틴이 만나는 조용한 라이프 아카이브.",
        lead: "집의 장면과 일상의 리듬을 분석해 리빙 스타일, 웰니스 루틴, 감각 큐레이션을 하나의 포트폴리오로 정리합니다.",
        journey: ["Space", "Scent", "Sound", "Ritual"],
        quizEyebrow: "라이프 리듬 체크",
        quizTitle: "공간 취향 설계",
        reportEyebrow: "Living Wellness Report",
        summaryTitle: "Ritual Summary",
        phases: [
          ["Season 1", "공간 톤, 조명, 오브제 큐레이션"],
          ["Season 2", "향, 음악, 루틴 기반 웰니스 플랜"],
          ["Season 3", "홈 스타일링 키트와 클래스형 커머스 확장"]
        ],
        questions: [
          {
            label: "RITUAL 1",
            title: "가장 먼저 바꾸고 싶은 생활 장면은?",
            key: "interest",
            options: [
              ["home", "홈 스타일링", "방의 첫인상과 동선"],
              ["wellness", "웰니스 루틴", "수면과 회복의 리듬"],
              ["plant", "플랜테리어", "식물과 자연광"],
              ["table", "테이블 무드", "식사와 초대의 장면"]
            ]
          },
          {
            label: "RITUAL 2",
            title: "공간에 어울리는 스타일은?",
            key: "style",
            options: [
              ["organic", "오가닉", "곡선과 자연 소재"],
              ["japanese", "재패니즈", "여백과 낮은 가구"],
              ["nordic", "노르딕", "밝은 목재와 실용성"],
              ["artisan", "아티잔", "손맛 있는 오브제"]
            ]
          },
          {
            label: "RITUAL 3",
            title: "공간에 남기고 싶은 기분은?",
            key: "mood",
            options: [
              ["fresh", "신선한", "맑은 공기감"],
              ["grounded", "차분히 머무는", "낮은 톤과 안정감"],
              ["sunlit", "햇살 같은", "따뜻한 오후의 질감"],
              ["quiet", "고요한", "소리와 빛을 덜어낸 상태"]
            ]
          }
        ],
        defaults: { interest: "home", style: "organic", mood: "sunlit" },
        summaries: {
          home: "입구에서 머무는 자리까지 동선을 정리하고, 조명과 오브제로 일상의 첫인상을 부드럽게 만듭니다.",
          wellness: "수면 전후의 루틴, 향, 소리, 조도를 연결해 회복감을 주는 생활 포트폴리오로 구성합니다.",
          plant: "식물의 높이와 빛의 방향을 기준으로 공간에 생동감을 주는 플랜테리어 균형을 제안합니다.",
          table: "식기, 패브릭, 조명의 온도를 맞춰 매일의 식탁과 초대의 장면이 자연스럽게 이어지게 합니다."
        },
        palettes: {
          organic: ["#fbfff8", "#dcebdc", "#a8c7ad", "#5b8a73", "#26352d"],
          japanese: ["#fffaf0", "#e6dac9", "#b8c5ad", "#6f806d", "#30382f"],
          nordic: ["#f8fbf2", "#e5ecd8", "#c8d9d0", "#85a998", "#405f51"],
          artisan: ["#fff8ea", "#e7c4a4", "#d49b82", "#8b6d4f", "#354538"]
        },
        moodTags: {
          fresh: ["Airy", "Green Note", "Clean Light"],
          grounded: ["Low Tone", "Slow Pace", "Warm Wood"],
          sunlit: ["Afternoon", "Soft Linen", "Honey Light"],
          quiet: ["Stillness", "Muted Sound", "Restful Space"]
        },
        assist: {
          chatAction: "루틴",
          expertAction: "공간 상담",
          chat: ["VERDE Guide", "루틴 챗", "공간, 향, 조명, 수면 루틴을 가볍게 조합해 봅니다.", "루틴 만들기", ["향", "조명", "수면"]],
          expert: ["VERDE Stylist", "공간 상담", "선택한 라이프 리포트를 바탕으로 홈 스타일링과 웰니스 루틴 상담을 연결합니다.", "상담 요청", ["공간", "식물", "테이블"]]
        }
      }
    }
  },
  en: {
    conceptUi: {
      eyebrow: "PORTFOLIO OPTIONS",
      title: "Choose the first-screen concept.",
      lead: "Option 1 keeps the current AURA curation. Options 2 and 3 switch into entirely different portfolio moods.",
      options: [
        ["concept1", "Option 1", "AURA beauty curation"],
        ["concept2", "Option 2", "Fashion editorial atelier"],
        ["concept3", "Option 3", "Living wellness portfolio"]
      ]
    },
    common: {
      prev: "Back",
      next: "Next",
      finish: "View report",
      ready: "Live report"
    },
    concepts: {}
  }
};

portfolioData.en.concepts = {
  concept1: {
    ...portfolioData.ko.concepts.concept1,
    eyebrow: "AI total beauty curation",
    title: "From makeup to a lifestyle that feels unmistakably yours.",
    lead: "Choose your interests, style, and mood. AURA turns them into a makeup-led personal style report and connected curation.",
    quizEyebrow: "Onboarding quiz",
    quizTitle: "Taste analysis",
    reportEyebrow: "AI style report",
    phases: [
      ["Phase 1", "Taste engine, AI report, core curation UI"],
      ["Phase 2", "Expert consultation and 1:1 matching"],
      ["Phase 3", "Product links and styling-set commerce"]
    ],
    assist: {
      chatAction: "Chat",
      expertAction: "Expert",
      chat: ["AURA Chat", "Taste chat", "Continue with quick questions about makeup tone, hair color, and daily looks based on your selected profile.", "Start chat", ["Tone match", "Product Q&A", "Look pairing"]],
      expert: ["AURA Expert", "Expert consultation", "Send your AI report into a 1:1 consultation flow centered on makeup and connected styling.", "Request consult", ["Makeup", "Hair", "Fashion match"]]
    }
  },
  concept2: {
    ...portfolioData.ko.concepts.concept2,
    eyebrow: "AI fashion editorial portfolio",
    title: "Design one silhouette like a complete campaign.",
    lead: "Combine identity, lookbook, material language, and shoot mood into an editorial portfolio for a person or brand.",
    quizEyebrow: "Direction board",
    quizTitle: "Editorial build",
    reportEyebrow: "Campaign Direction",
    phases: [
      ["Chapter 1", "Signature silhouette and lookbook moodboard"],
      ["Chapter 2", "Shoot concept, styling cuts, portfolio expansion"],
      ["Chapter 3", "Brand proposal and campaign package"]
    ],
    assist: {
      chatAction: "Director",
      expertAction: "Stylist",
      chat: ["NOIR Director", "Moodboard chat", "Review lookbook order, material pairing, and campaign copy.", "Review board", ["Lookbook", "Shoot", "Copy"]],
      expert: ["NOIR Stylist", "Stylist consult", "Connect the selected portfolio direction to outfit and shoot planning.", "Request consult", ["Outfit", "Pose", "Campaign"]]
    }
  },
  concept3: {
    ...portfolioData.ko.concepts.concept3,
    eyebrow: "AI living wellness portfolio",
    title: "A quiet life archive of space, scent, sound, and ritual.",
    lead: "Analyze home scenes and daily rhythm, then turn living style and wellness routines into one portfolio.",
    quizEyebrow: "Life rhythm check",
    quizTitle: "Space taste design",
    reportEyebrow: "Living Wellness Report",
    phases: [
      ["Season 1", "Space tone, lighting, object curation"],
      ["Season 2", "Scent, music, and ritual wellness plan"],
      ["Season 3", "Home styling kits and class commerce"]
    ],
    assist: {
      chatAction: "Ritual",
      expertAction: "Space",
      chat: ["VERDE Guide", "Ritual chat", "Pair space, scent, light, and sleep routines quickly.", "Make ritual", ["Scent", "Light", "Sleep"]],
      expert: ["VERDE Stylist", "Space consult", "Connect your living report to home styling and wellness consultation.", "Request consult", ["Space", "Plants", "Table"]]
    }
  }
};
