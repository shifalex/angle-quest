const NS = "http://www.w3.org/2000/svg";

const families = {
  "שוות": ["מתאימות", "מתחלפות", "קודקודיות"],
  "180°": ["צמודות", "משולש"]
};
const primitiveTools = ["חדה", "ישרה", "שטוחה", "קהה"];
const quadrilateralTools = ["ריבוע", "מעוין", "מלבן", "מקבילית", "טרפז", "דלתון"];

function validQuadrilateralNames(shape) {
  if (shape === "ריבוע") return ["ריבוע", "מלבן", "מעוין", "מקבילית", "דלתון"];
  if (shape === "מלבן") return ["מלבן", "מקבילית"];
  if (shape === "מעוין") return ["מעוין", "מקבילית", "דלתון"];
  return [shape];
}

// כל שלב הוא נתונים בלבד. כך אפשר להוסיף בעתיד מצולעים, פיתגורס ועוד
// בלי לשנות את מנוע הבחירה, ההנחה והבדיקה.
const levels = [
  {
    id: "primitive-acute",
    phase: "beginner",
    family: "פרימיטיבים",
    correctCategory: "חדה",
    primitiveDegrees: 45,
    scene: "primitive"
  },
  {
    id: "primitive-right",
    phase: "beginner",
    family: "פרימיטיבים",
    correctCategory: "ישרה",
    primitiveDegrees: 90,
    scene: "primitive"
  },
  {
    id: "primitive-flat",
    phase: "beginner",
    family: "פרימיטיבים",
    correctCategory: "שטוחה",
    primitiveDegrees: 180,
    scene: "primitive"
  },
  {
    id: "primitive-obtuse",
    phase: "beginner",
    family: "פרימיטיבים",
    correctCategory: "קהה",
    primitiveDegrees: 125,
    scene: "primitive"
  },
  {
    id: "vertical-acute",
    family: "שוות",
    title: "מצאו את הזווית הקודקודית החסרה",
    hint: "זוויות קודקודיות שוות זו לזו. בחרו את החוק ואת הזווית של 48°.",
    categories: ["קודקודיות", "מתאימות", "מתחלפות", "180°"],
    correctCategory: "קודקודיות",
    choices: [
      { id: "acute48", label: "48°", subtitle: "חדה", degrees: 48, type: "acute" },
      { id: "right90", label: "90°", subtitle: "ישרה", degrees: 90, type: "right" },
      { id: "obtuse132", label: "132°", subtitle: "קהה", degrees: 132, type: "obtuse" },
      { id: "acute42", label: "42°", subtitle: "חדה", degrees: 42, type: "acute" }
    ],
    correctChoice: "acute48",
    target: { x: 365, y: 215, rotation: 180, tolerance: 39, rotationTolerance: 15 },
    start: { x: 130, y: 335, rotation: 8 },
    scene: "vertical"
  },
  {
    id: "alternate-obtuse",
    family: "שוות",
    title: "אספו את הזווית המתחלפת",
    hint: "בין שני ישרים מקבילים: הזוויות המתחלפות החדוֹת שוות.",
    categories: ["קודקודיות", "מתאימות", "מתחלפות", "180°"],
    correctCategory: "מתחלפות",
    choices: [
      { id: "acute65", label: "65°", subtitle: "חדה", degrees: 65, type: "acute" },
      { id: "obtuse115", label: "115°", subtitle: "קהה", degrees: 115, type: "obtuse" },
      { id: "right90", label: "90°", subtitle: "ישרה", degrees: 90, type: "right" },
      { id: "obtuse125", label: "125°", subtitle: "קהה", degrees: 125, type: "obtuse" }
    ],
    correctChoice: "acute65",
    target: { x: 321, y: 280, rotation: 327.5, tolerance: 42, rotationTolerance: 16 },
    start: { x: 118, y: 355, rotation: 15 },
    scene: "alternate"
  },
  {
    id: "corresponding-acute",
    family: "שוות",
    title: "מצאו את הזווית המתאימה",
    hint: "אותו מיקום בשני מפגשים עם ישרים מקבילים — זוויות מתאימות שוות.",
    categories: ["מתאימות", "מתחלפות", "קודקודיות", "180°"],
    correctCategory: "מתאימות",
    choices: [
      { id: "acute65", label: "65°", subtitle: "חדה", degrees: 65, type: "acute" },
      { id: "obtuse115", label: "115°", subtitle: "קהה", degrees: 115, type: "obtuse" },
      { id: "right90", label: "90°", subtitle: "ישרה", degrees: 90, type: "right" },
      { id: "acute55", label: "55°", subtitle: "חדה", degrees: 55, type: "acute" }
    ],
    correctChoice: "right90",
    target: { x: 360, y: 280, rotation: 45, tolerance: 42, rotationTolerance: 16 },
    start: { x: 120, y: 365, rotation: 5 },
    scene: "corresponding"
  },
  {
    id: "adjacent-supplementary",
    family: "180°",
    title: "השלימו זוג זוויות צמודות",
    hint: "זוויות צמודות על ישר אחד משלימות יחד 180°.",
    categories: ["צמודות", "משולש"],
    correctCategory: "צמודות",
    choices: [
      { id: "acute45", label: "45°", subtitle: "חדה", degrees: 45, type: "acute" },
      { id: "acute55", label: "55°", subtitle: "חדה", degrees: 55, type: "acute" },
      { id: "right90", label: "90°", subtitle: "ישרה", degrees: 90, type: "right" },
      { id: "obtuse125", label: "125°", subtitle: "קהה", degrees: 125, type: "obtuse" }
    ],
    correctChoice: "acute55",
    target: { x: 360, y: 220, rotation: 332.5, tolerance: 40, rotationTolerance: 15 },
    start: { x: 120, y: 345, rotation: 10 },
    scene: "adjacent"
  },
  {
    id: "triangle-sum",
    family: "180°",
    title: "השלימו את זווית המשולש",
    hint: "סכום הזוויות במשולש הוא 180°. חשבו, אספו והניחו.",
    categories: ["צמודות", "משולש"],
    correctCategory: "משולש",
    choices: [
      { id: "acute50", label: "50°", subtitle: "חדה", degrees: 50, type: "acute" },
      { id: "acute60", label: "60°", subtitle: "חדה", degrees: 60, type: "acute" },
      { id: "acute70", label: "70°", subtitle: "חדה", degrees: 70, type: "acute" },
      { id: "obtuse120", label: "120°", subtitle: "קהה", degrees: 120, type: "obtuse" }
    ],
    correctChoice: "acute70",
    target: { x: 342, y: 153, rotation: 85, tolerance: 42, rotationTolerance: 16 },
    start: { x: 120, y: 292, rotation: 0 },
    scene: "triangle"
  }
];

function configurePrimitiveLevel(level) {
  if (level.correctCategory === "חדה") level.primitiveDegrees = 30 + Math.floor(Math.random() * 11) * 5;
  if (level.correctCategory === "קהה") level.primitiveDegrees = 95 + Math.floor(Math.random() * 15) * 5;
  const type = level.correctCategory === "חדה" ? "acute" : level.correctCategory === "ישרה" ? "right" : level.correctCategory === "שטוחה" ? "flat" : "obtuse";
  level.choices = [{ id: "primitive-target", label: `${level.primitiveDegrees}°`, subtitle: level.correctCategory, degrees: level.primitiveDegrees, type }];
  level.correctChoice = "primitive-target";
  level.target = { x: 365, y: 220, rotation: 0, tolerance: 42, rotationTolerance: 16 };
  level.start = { x: 140, y: 300, rotation: 0 };
  level.lockAngleType = true;
  return level;
}

const primitiveTemplates = levels.filter(level => level.phase === "beginner").map(configurePrimitiveLevel);
const equalityTemplates = levels.filter(level => level.family === "שוות");
const supplementaryTemplates = levels.filter(level => level.family === "180°");
const cloneLevel = (template, id, additions = {}) => Object.assign(JSON.parse(JSON.stringify(template)), { id }, additions);
const makePracticeSet = (templates, count, stageName, xpBase, phaseOverride, exerciseOffset = 0, exerciseTotal = count) => shuffle(Array.from({ length: count }, (_, index) => {
  const level = cloneLevel(templates[index % templates.length], `${stageName}-${index + 1}`, {
    mode: "practice",
    stageName,
    exerciseNumber: exerciseOffset + index + 1,
    exerciseCount: exerciseTotal,
    xpBase
  });
  if (phaseOverride) level.phase = phaseOverride;
  if (level.scene === "primitive") configurePrimitiveLevel(level);
  return level;
})).map((level, index) => Object.assign(level, { exerciseNumber: exerciseOffset + index + 1 }));

const tutorialLevels = [
  ...shuffle(primitiveTemplates.map((level, index) => cloneLevel(level, `tutorial-primitives-${index + 1}`, { mode: "tutorial", stageName: "טוטוריאל פרימיטיבים", xpBase: 40 }))).map((level, index) => Object.assign(level, { exerciseNumber: index + 1, exerciseCount: 10 })),
  ...shuffle(equalityTemplates.map((level, index) => cloneLevel(level, `tutorial-equality-${index + 1}`, { mode: "tutorial", stageName: "טוטוריאל זוויות שוות", xpBase: 60 }))).map((level, index) => Object.assign(level, { exerciseNumber: index + 1, exerciseCount: 10 })),
  ...shuffle(supplementaryTemplates.map((level, index) => cloneLevel(level, `tutorial-180-${index + 1}`, { mode: "tutorial", stageName: "טוטוריאל 180°", xpBase: 70 }))).map((level, index) => Object.assign(level, { exerciseNumber: index + 1, exerciseCount: 10 }))
];
const primitivePractice = makePracticeSet(primitiveTemplates, 6, "תרגול פרימיטיבים", 70, "beginner", 4, 10);
const equalityPractice = makePracticeSet(equalityTemplates, 7, "תרגול זוויות שוות", 100, null, 3, 10);
const supplementaryPractice = makePracticeSet(supplementaryTemplates, 8, "תרגול 180°", 120, null, 2, 10);
const allTemplates = [...primitiveTemplates, ...equalityTemplates, ...supplementaryTemplates];
const masterPractice = shuffle(Array.from({ length: 10 }, (_, index) => {
  const level = cloneLevel(allTemplates[index % allTemplates.length], `master-${index + 1}`, {
    mode: "master",
    phase: "master",
    stageName: "MASTER — הכול מעורבב",
    exerciseNumber: index + 1,
    exerciseCount: 10,
    xpBase: 180
  });
  if (level.scene === "primitive") configurePrimitiveLevel(level);
  return level;
})).map((level, index) => Object.assign(level, { exerciseNumber: index + 1 }));
levels.splice(0, levels.length,
  ...tutorialLevels.slice(0, primitiveTemplates.length),
  ...primitivePractice,
  ...tutorialLevels.slice(primitiveTemplates.length, primitiveTemplates.length + equalityTemplates.length),
  ...equalityPractice,
  ...tutorialLevels.slice(primitiveTemplates.length + equalityTemplates.length),
  ...supplementaryPractice,
  ...masterPractice
);

// Flip is an explicit learning objective: alternate/corresponding questions
// include a deterministic mix of mirrored and non-mirrored solutions.
const flipEligibleLevels = levels.filter(level => level.correctCategory === "מתחלפות" || level.correctCategory === "מתאימות");
const flipCounters = new Map();
flipEligibleLevels.forEach(level => {
  const group = level.mode === "master" ? "master" : "equal";
  const index = flipCounters.get(group) || 0;
  level.requiredMirrored = index % 2 === 0;
  flipCounters.set(group, index + 1);
});

const quadrilateralLevels = Array.from({ length: 12 }, (_, index) => {
  const shapes = ["ריבוע", "מעוין", "מלבן"];
  const shape = shapes[index % shapes.length];
  const dimensions = shape === "ריבוע"
    ? { width: 118 + (index % 3) * 18, height: 118 + (index % 3) * 18 }
    : shape === "מלבן"
      ? { width: 170 - (index % 3) * 12, height: 92 + (index % 3) * 10 }
      : { width: 150 - (index % 3) * 10, height: 112 + (index % 3) * 14 };
  return {
    id: `quadrilateral-${index + 1}`, phase: "quadrilateral", family: "מרובעים",
    mode: "quadrilateral", stageName: "שלב מרובעים", exerciseNumber: index + 1,
    exerciseCount: 12, correctCategory: shape, categories: quadrilateralTools,
    choices: [{ id: "quad-target", degrees: 0, type: "right" }], correctChoice: "quad-target",
    target: { x: 390, y: 218, rotation: (index % 3) * 15 - 15, tolerance: 42, rotationTolerance: 20 },
    start: { x: 145, y: 315, rotation: 0 }, targetDimensions: dimensions,
    scaffold: index < 3, askWhatElse: false, scene: "quadrilateral", xpBase: 120
  };
});
levels.splice(0, 0, ...quadrilateralLevels);

const supportedLanguages = ["he", "en", "ru"];
const supportedCourseSections = ["primitives", "equal", "180", "quadrilaterals", "master"];
const initialLinkSettings = (() => {
  try {
    const params = new URLSearchParams(window.location.search);
    const language = params.get("lang");
    const course = params.get("course");
    return {
      language: supportedLanguages.includes(language) ? language : null,
      course: supportedCourseSections.includes(course) ? course : null,
      tablet: params.get("tablet") === "1"
    };
  } catch {
    return { language: null, course: null, tablet: false };
  }
})();

const savedLanguage = (() => {
  if (initialLinkSettings.language) return initialLinkSettings.language;
  try {
    const value = localStorage.getItem("angleQuestLanguage");
    return supportedLanguages.includes(value) ? value : "he";
  } catch {
    return "he";
  }
})();
let pendingLinkedCourse = initialLinkSettings.course;

const PLAYER_STORE_KEY = "angleQuestPlayersV1";
const playerStore = (() => {
  try {
    const stored = JSON.parse(localStorage.getItem(PLAYER_STORE_KEY));
    if (stored && stored.players && typeof stored.players === "object") return stored;
  } catch { /* Start with an empty local player list. */ }
  return { activePlayerId: null, players: {} };
})();

const state = {
  language: savedLanguage,
  activePlayerId: playerStore.activePlayerId,
  activeRunId: null,
  runScore: 0,
  levelIndex: initialLinkSettings.course ? Math.max(0, sectionStartIndex(initialLinkSettings.course)) : 0,
  score: 0,
  category: null,
  firstChoiceMade: false,
  firstChoiceCorrect: false,
  choice: null,
  degrees: 0,
  equipped: false,
  solved: false,
  followUp: false,
  followUpFound: [],
  piece: { x: 0, y: 0, rotation: 0, mirrored: false },
  dimensions: { arm: 112, cross: 112, gap: 92, spine: 132 },
  dragging: null,
  dragMoved: false,
  dragStartPointer: null,
  rotationAnchor: null,
  angleDragStart: null,
  rotationDragStart: null,
  lastPieceTap: 0,
  pointDragStart: null,
  triangleVertices: null,
  adjacentRays: null,
  quadDimensions: { width: 120, height: 120 },
  quadVertices: null,
  dragOffset: { x: 0, y: 0 }
};

const speechState = { voices: [], utterance: null, timer: null, audio: null, preloaded: [] };
const recordedSpeechFiles = {
  "חדה": "acute.mp3",
  "ישרה": "right.mp3",
  "שטוחה": "straight.mp3",
  "קהה": "obtuse.mp3",
  "מתאימות": "corresponding.mp3",
  "מתחלפות": "alternate.mp3",
  "קודקודיות": "vertical.mp3",
  "צמודות": "adjacent.mp3",
  "משולש": "triangle.mp3",
  "ריבוע": "square.mp3",
  "מלבן": "rectangle.mp3",
  "מעוין": "rhombus.mp3",
  "מקבילית": "parallelogram.mp3",
  "טרפז": "trapezoid.mp3",
  "דלתון": "kite.mp3",
  "sound-on": "sound-on.mp3"
};

const categoryLabels = {
  he: { "חדה": "חדה", "ישרה": "ישרה", "שטוחה": "שטוחה", "קהה": "קהה", "מתאימות": "מתאימות", "מתחלפות": "מתחלפות", "קודקודיות": "קודקודיות", "צמודות": "צמודות", "משולש": "משולש" },
  en: { "חדה": "Acute", "ישרה": "Right", "שטוחה": "Straight", "קהה": "Obtuse", "מתאימות": "Corresponding", "מתחלפות": "Alternate", "קודקודיות": "Vertical", "צמודות": "Adjacent", "משולש": "Triangle" },
  ru: { "חדה": "Острый", "ישרה": "Прямой", "שטוחה": "Развёрнутый", "קהה": "Тупой", "מתאימות": "Соответственные", "מתחלפות": "Накрест лежащие", "קודקודיות": "Вертикальные", "צמודות": "Смежные", "משולש": "Треугольник" }
};
Object.assign(categoryLabels.he, { "ריבוע": "ריבוע", "מעוין": "מעוין", "מלבן": "מלבן" });
Object.assign(categoryLabels.he, { "מקבילית": "מקבילית", "טרפז": "טרפז", "דלתון": "דלתון" });
Object.assign(categoryLabels.en, { "ריבוע": "Square", "מעוין": "Rhombus", "מלבן": "Rectangle", "מקבילית": "Parallelogram", "טרפז": "Trapezoid", "דלתון": "Kite" });
Object.assign(categoryLabels.ru, { "ריבוע": "Квадрат", "מעוין": "Ромб", "מלבן": "Прямоугольник", "מקבילית": "Параллелограмм", "טרפז": "Трапеция", "דלתון": "Дельтоид" });

const uiText = {
  he: {
    appTitle: "משימת הזוויות", level: "שלב", currentMission: "משימה נוכחית", chooseToolEyebrow: "בחרו כלי", chooseTool: "בחרו כלי", placeAngle: "הניחו את הזווית", selectAngle: "בחרו זווית", toolbox: "ארגז הזוויות", primitives: "פרימיטיבים", equalFamily: "שוות", diagramTitle: "תרגיל זוויות", diagramDesc: "שרטוט גאומטרי עם זווית נתונה ומקום לזווית חסרה.", arenaTip: "גררו כדי להזיז • דאבל־קליק/טאפ בכל השרטוט: פליפ • ● זווית • ■ גובה/אורך", anglePlus: "+ זווית", angleMinus: "− זווית", check: "בדיקה", counterClockwise: "↶ נגד השעון", clockwise: "סיבוב ↷", mirror: "⇋ מראה", discard: "⌫ זריקה", footer: "נבנה ללמידה בתנועה: בוחרים, אוספים, מניחים ומגלים.", soundOff: "כיבוי הקראה", soundOn: "הפעלת הקראה",
    tutorialPrimitives: "טוטוריאל פרימיטיבים", tutorialEqual: "טוטוריאל זוויות שוות", tutorial180: "טוטוריאל 180°", practicePrimitives: "תרגול פרימיטיבים", practiceEqual: "תרגול זוויות שוות", practice180: "תרגול 180°", masterStage: "MASTER — הכול מעורבב",
    beginnerHint: "בחרו חדה, ישרה, שטוחה או קהה; אחר כך גררו את הזווית הנבחרת והניחו אותה על השרטוט.", advancedHint: "בחרו לפי שם את הכלי שמתאר את הקשר בשרטוט. הכלי יופיע מיד, ואז כוונו אותו למקום החסר.", masterHint: "הכול פתוח ומעורבב. התעלמו מקווי ההסחה — גם כשקו בצבע השאלה עובר דרך הקודקוד.", beginnerArena: "בחרו והניחו על הזווית", advancedArena: "גררו אל הזווית החסרה", tutorialMode: "TUTORIAL • בחרו כלי", practiceMode: "PRACTICE • בחרו כלי", masterMode: "MASTER • הכול פתוח",
    toolHidden: "הכלי הוסתר. לחצו על שם כדי להציג כלי.", augmented: "AUGMENTED: {tool}. אפשר לגרור, לכוון או לזרוק.", speechActive: "הקראה בעברית פועלת.", placeAgain: "{tool} • לחצו בשרטוט כדי להניח מחדש", discarded: "הכלי נזרק. לחצו בשרטוט כדי להניח כלי חדש.", chooseFirst: "בחרו קודם כלי מארגז הזוויות.", mirrorOn: "מצב מראה הופעל.", mirrorOff: "מצב מראה בוטל.", wrongTool: "הצורה שהנחתם אינה מתארת את הקשר שבשרטוט. זרקו אותה ובחרו כלי אחר.", correct: "פגיעה מדויקת! +{xp} XP", correctBonus: "פגיעה מדויקת! +{xp} XP ועוד +{bonus} בונוס לבחירה נכונה בניסיון הראשון!", moveCloser: "כמעט! שחררו קרוב לעיגול הכחול והכלי ייצמד אליו.", rotateMore: "המיקום נכון. עכשיו סובבו עד שהשוקיים יישבו על השרטוט.", mirrorNeeded: "המיקום והסיבוב נכונים, אבל הצורה פונה לצד השני. עשו דאבל־טאפ בשרטוט.", angleNeeded: "המיקום והכיוון נכונים. היעד הוא {target}° וכרגע הכלי על {current}°.", complete: "המסלול הושלם! צברתם {score} XP ב־{count} משימות.", completeHint: "סיימתם שלוש רמות של 10 שאלות ועוד 10 משימות מאסטר מעורבבות.", touchTip: "אצבע אחת: הזזה • שתי אצבעות: הזזה, סיבוב וגודל • ● כחול: שינוי הזווית • דאבל־טאפ: פליפ", mirrorTutorialTitle: "שליטה טבעית במגע", mirrorTutorialBody: "גררו את הכלי באצבע אחת. הניחו עליו אצבע שנייה: הזיזו יחד, סובבו או צבטו כדי לשנות את גודל הכלי. גררו את הנקודה הכחולה כדי לפתוח ולסגור את הזווית — גם בזוויות צמודות. דאבל־טאפ מבצע פליפ.", replayTutorial: "הציגו שוב", understood: "הבנתי", mirrorHelp: "הדרכת מגע"
  },
  en: {
    appTitle: "Angle Quest", level: "Level", currentMission: "Current mission", chooseToolEyebrow: "Choose your tool", chooseTool: "Choose a tool", placeAngle: "Place the angle", selectAngle: "Choose an angle", toolbox: "Angle toolbox", primitives: "Primitives", equalFamily: "Equal angles", diagramTitle: "Angle exercise", diagramDesc: "A geometric diagram with a given angle and a missing angle.", arenaTip: "Drag to move • Double-click/tap anywhere: flip • ● angle • ■ height/length", anglePlus: "+ Angle", angleMinus: "− Angle", check: "Check", counterClockwise: "↶ Counterclockwise", clockwise: "Rotate ↷", mirror: "⇋ Mirror", discard: "⌫ Discard", footer: "Built for learning in motion: choose, collect, place, discover.", soundOff: "Turn narration off", soundOn: "Turn narration on",
    tutorialPrimitives: "Primitives tutorial", tutorialEqual: "Equal angles tutorial", tutorial180: "180° tutorial", practicePrimitives: "Primitives practice", practiceEqual: "Equal angles practice", practice180: "180° practice", masterStage: "MASTER — everything mixed", beginnerHint: "Choose acute, right, straight, or obtuse; then drag the selected angle onto the diagram.", advancedHint: "Choose the named tool that describes the relationship, then align it with the missing angle.", masterHint: "Everything is open and mixed. Ignore distractor lines, including lines through the vertex in the diagram color.", beginnerArena: "Choose and place on the angle", advancedArena: "Drag to the missing angle", tutorialMode: "TUTORIAL • Choose a tool", practiceMode: "PRACTICE • Choose a tool", masterMode: "MASTER • Everything open",
    toolHidden: "Tool hidden. Press its name to show it again.", augmented: "AUGMENTED: {tool}. Drag, adjust, or discard it.", speechActive: "English narration is on.", placeAgain: "{tool} • Click the diagram to place again", discarded: "Tool discarded. Click the diagram to place a new tool.", chooseFirst: "Choose a tool from the angle toolbox first.", mirrorOn: "Mirror mode on.", mirrorOff: "Mirror mode off.", wrongTool: "This shape does not describe the relationship. Discard it and choose another tool.", correct: "Direct hit! +{xp} XP", correctBonus: "Direct hit! +{xp} XP and +{bonus} first-guess bonus!", moveCloser: "Almost! Place the angle center on the blue point.", rotateMore: "Position is correct. Rotate until the rays align with the diagram.", mirrorNeeded: "Position and rotation are correct, but the shape faces the other way. Double-tap the diagram.", angleNeeded: "Position and direction are correct. Target: {target}°; tool: {current}°.", complete: "Course complete! You earned {score} XP in {count} missions.", completeHint: "You completed three 10-question levels and 10 mixed Master missions.", touchTip: "One finger moves • Two fingers move, rotate, and resize • Blue dot changes the angle • Double-tap flips", mirrorTutorialTitle: "Natural touch controls", mirrorTutorialBody: "Drag the tool with one finger. Add a second finger to move, twist, or pinch the whole tool. Drag the blue dot to open and close the angle, including supplementary adjacent angles. Double-tap to flip.", replayTutorial: "Replay", understood: "Got it", mirrorHelp: "Touch tutorial"
  },
  ru: {
    appTitle: "Квест углов", level: "Уровень", currentMission: "Текущее задание", chooseToolEyebrow: "Выберите инструмент", chooseTool: "Выберите инструмент", placeAngle: "Разместите угол", selectAngle: "Выберите угол", toolbox: "Набор углов", primitives: "Примитивы", equalFamily: "Равные углы", diagramTitle: "Задание с углами", diagramDesc: "Геометрический чертёж с данным и недостающим углом.", arenaTip: "Тяните для перемещения • Двойной щелчок/тап: отражение • ● угол • ■ высота/длина", anglePlus: "+ Угол", angleMinus: "− Угол", check: "Проверить", counterClockwise: "↶ Против часовой", clockwise: "Поворот ↷", mirror: "⇋ Отразить", discard: "⌫ Удалить", footer: "Обучение в движении: выбирай, собирай, размещай, открывай.", soundOff: "Выключить озвучивание", soundOn: "Включить озвучивание",
    tutorialPrimitives: "Урок: примитивы", tutorialEqual: "Урок: равные углы", tutorial180: "Урок: 180°", practicePrimitives: "Практика: примитивы", practiceEqual: "Практика: равные углы", practice180: "Практика: 180°", masterStage: "МАСТЕР — всё вперемешку", beginnerHint: "Выберите острый, прямой, развёрнутый или тупой угол, затем перетащите его на чертёж.", advancedHint: "Выберите инструмент по названию отношения и совместите его с недостающим углом.", masterHint: "Все семейства перемешаны. Игнорируйте отвлекающие линии, даже проходящие через вершину.", beginnerArena: "Выберите и наложите угол", advancedArena: "Перетащите к недостающему углу", tutorialMode: "УРОК • Выберите инструмент", practiceMode: "ПРАКТИКА • Выберите инструмент", masterMode: "МАСТЕР • Всё открыто",
    toolHidden: "Инструмент скрыт. Нажмите его название, чтобы показать снова.", augmented: "AUGMENTED: {tool}. Перетаскивайте, настраивайте или удалите.", speechActive: "Русская озвучка включена.", placeAgain: "{tool} • Нажмите на чертёж, чтобы разместить снова", discarded: "Инструмент удалён. Нажмите на чертёж, чтобы разместить новый.", chooseFirst: "Сначала выберите инструмент.", mirrorOn: "Отражение включено.", mirrorOff: "Отражение выключено.", wrongTool: "Эта фигура не описывает отношение на чертеже. Удалите её и выберите другую.", correct: "Точно! +{xp} XP", correctBonus: "Точно! +{xp} XP и +{bonus} за первую верную догадку!", moveCloser: "Почти! Совместите центр угла с синей точкой.", rotateMore: "Позиция верна. Поверните лучи до совпадения с чертежом.", mirrorNeeded: "Позиция и поворот верны, но фигура направлена в другую сторону. Сделайте двойной щелчок или тап.", angleNeeded: "Позиция и направление верны. Цель: {target}°; инструмент: {current}°.", complete: "Маршрут завершён! Вы заработали {score} XP за {count} заданий.", completeHint: "Вы прошли три уровня по 10 вопросов и 10 смешанных заданий Мастера.", touchTip: "Один палец: движение • Два: движение, поворот и размер • Синяя точка: угол • Двойной тап: отражение", mirrorTutorialTitle: "Естественное управление касанием", mirrorTutorialBody: "Перетаскивайте одним пальцем. Добавьте второй палец, чтобы двигать, поворачивать и менять размер всего инструмента. Синяя точка открывает и закрывает угол. Двойной тап отражает инструмент.", replayTutorial: "Повторить", understood: "Понятно", mirrorHelp: "Урок управления"
  }
};

Object.assign(uiText.he, {
  tutorialPrimitives: "פרימיטיבים", practicePrimitives: "פרימיטיבים", tutorialEqual: "זוויות שוות", practiceEqual: "זוויות שוות", tutorial180: "180°", practice180: "180°", tutorialMode: "בחרו כלי", practiceMode: "בחרו כלי",
  levelComplete: "הרמה הושלמה", levelCompleteBody: "סיימתם 10 שאלות. אפשר לעבור לרמה הבאה.", nextLevel: "לרמה הבאה", chooseLevel: "בחירת רמה", chooseStart: "מאיפה מתחילים?", chooseStartBody: "אפשר להתחיל מכל משפחה או לעבור ישר לשלב המעורבב.", startEqual: "זוויות שוות", startMaster: "MASTER — זוויות מעורבבות", complete: "כל הכבוד! צברתם {score} XP.", completeHint: "סיימתם את כל הרמות.", player: "שחקן", whoPlays: "מי משחק?", localPlayerNote: "השם וההיסטוריה נשמרים רק בדפדפן הזה — בלי סיסמה ובלי חשבון.", playerName: "שם השחקן", addPlayer: "הוספה", recordsTitle: "השיאים וההתקדמות", recentGames: "משחקים אחרונים", notDone: "לא בוצע", inProgress: "בתהליך — {done}/10", completedStatus: "הושלם — שיא {xp} XP", noGames: "עדיין אין משחקים שמורים", close: "סגירה", firstTry: "ניחוש ראשון: {count}"
});
Object.assign(uiText.en, {
  tutorialPrimitives: "Primitives", practicePrimitives: "Primitives", tutorialEqual: "Equal angles", practiceEqual: "Equal angles", tutorial180: "180°", practice180: "180°", tutorialMode: "Choose a tool", practiceMode: "Choose a tool",
  levelComplete: "Level complete", levelCompleteBody: "You completed 10 questions. You can continue to the next level.", nextLevel: "Next level", chooseLevel: "Choose level", chooseStart: "Where do you want to start?", chooseStartBody: "Start with any family or jump directly to the mixed Master level.", startEqual: "Equal angles", startMaster: "MASTER — Mixed", complete: "Well done! You earned {score} XP.", completeHint: "You completed every level.", player: "Player", whoPlays: "Who is playing?", localPlayerNote: "The name and history are stored only in this browser — no password or account.", playerName: "Player name", addPlayer: "Add", recordsTitle: "Records and progress", recentGames: "Recent games", notDone: "Not attempted", inProgress: "In progress — {done}/10", completedStatus: "Completed — best {xp} XP", noGames: "No saved games yet", close: "Close", firstTry: "First guesses: {count}"
});
Object.assign(uiText.ru, {
  tutorialPrimitives: "Примитивы", practicePrimitives: "Примитивы", tutorialEqual: "Равные углы", practiceEqual: "Равные углы", tutorial180: "180°", practice180: "180°", tutorialMode: "Выберите инструмент", practiceMode: "Выберите инструмент",
  levelComplete: "Уровень пройден", levelCompleteBody: "Вы завершили 10 вопросов. Можно перейти к следующему уровню.", nextLevel: "Следующий уровень", chooseLevel: "Выбрать уровень", chooseStart: "С чего начать?", chooseStartBody: "Начните с любого семейства или сразу перейдите к смешанному уровню Мастер.", startEqual: "Равные углы", startMaster: "МАСТЕР — Смешанный", complete: "Отлично! Вы заработали {score} XP.", completeHint: "Вы прошли все уровни.", player: "Игрок", whoPlays: "Кто играет?", localPlayerNote: "Имя и история хранятся только в этом браузере — без пароля и аккаунта.", playerName: "Имя игрока", addPlayer: "Добавить", recordsTitle: "Рекорды и прогресс", recentGames: "Последние игры", notDone: "Не выполнено", inProgress: "В процессе — {done}/10", completedStatus: "Завершено — рекорд {xp} XP", noGames: "Сохранённых игр пока нет", close: "Закрыть", firstTry: "С первой попытки: {count}"
});

function t(key, values = {}) {
  const template = uiText[state.language]?.[key] || uiText.he[key] || key;
  return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), template);
}

function categoryLabel(value) {
  return categoryLabels[state.language]?.[value] || value;
}

const handleLabels = {
  he: { "אורך": "אורך", "גובה": "גובה", "קודקוד": "קודקוד" },
  en: { "אורך": "Length", "גובה": "Height", "קודקוד": "Vertex" },
  ru: { "אורך": "Длина", "גובה": "Высота", "קודקוד": "Вершина" }
};

function handleLabel(value) {
  return handleLabels[state.language]?.[value] || value;
}

const $ = (id) => document.getElementById(id);
const sceneLayer = $("scene-layer");
const targetLayer = $("target-layer");
const pieceLayer = $("piece-layer");
const svg = $("geometry");

const stageTranslationKeys = {
  "טוטוריאל פרימיטיבים": "tutorialPrimitives",
  "טוטוריאל זוויות שוות": "tutorialEqual",
  "טוטוריאל 180°": "tutorial180",
  "תרגול פרימיטיבים": "practicePrimitives",
  "תרגול זוויות שוות": "practiceEqual",
  "תרגול 180°": "practice180",
  "MASTER — הכול מעורבב": "masterStage"
};

function localizedStageName(name) {
  return t(stageTranslationKeys[name] || name);
}

function courseSectionForLevel(level) {
  if (level.phase === "quadrilateral") return "quadrilaterals";
  if (level.mode === "master") return "master";
  if (level.family === "שוות") return "equal";
  if (level.family === "180°") return "180";
  return "primitives";
}

function courseSectionLabel(section) {
  if (section === "quadrilaterals") return "שלב מרובעים";
  if (section === "equal") return t("startEqual");
  if (section === "180") return "180°";
  if (section === "master") return t("startMaster");
  return t("primitives");
}

function updateCourseMenuButton(level = levels[state.levelIndex]) {
  const section = courseSectionForLevel(level);
  $("course-menu-button").textContent = `${t("level")}: ${courseSectionLabel(section)} ▾`;
  $("course-menu-button").setAttribute("aria-label", `${t("chooseLevel")}: ${courseSectionLabel(section)}`);
}

function makeLocalId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function persistPlayerStore() {
  playerStore.activePlayerId = state.activePlayerId;
  try { localStorage.setItem(PLAYER_STORE_KEY, JSON.stringify(playerStore)); } catch { /* Progress remains available for this session. */ }
}

function activePlayer() {
  return state.activePlayerId ? playerStore.players[state.activePlayerId] || null : null;
}

function mostRecentPlayerId() {
  const players = Object.values(playerStore.players);
  if (!players.length) return null;
  players.sort((a, b) => {
    const aTime = Date.parse(a.lastPlayedAt || a.createdAt || 0) || 0;
    const bTime = Date.parse(b.lastPlayedAt || b.createdAt || 0) || 0;
    return bTime - aTime;
  });
  return players[0].id;
}

function sectionStartIndex(section) {
  if (section === "quadrilaterals") return levels.findIndex(level => level.phase === "quadrilateral");
  if (section === "equal") return levels.findIndex(level => level.family === "שוות");
  if (section === "180") return levels.findIndex(level => level.family === "180°");
  if (section === "master") return levels.findIndex(level => level.mode === "master");
  return levels.findIndex(level => level.phase === "beginner");
}

function syncShareUrl(section = courseSectionForLevel(levels[state.levelIndex])) {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", state.language);
    url.searchParams.set("course", supportedCourseSections.includes(section) ? section : "primitives");
    window.history.replaceState({}, "", url);
  } catch { /* The game still works when URL updates are unavailable. */ }
}

function beginPlayerRun(section) {
  const player = activePlayer();
  if (!player) return;
  const now = new Date().toISOString();
  const run = {
    id: makeLocalId("run"),
    section,
    startedAt: now,
    updatedAt: now,
    completed: 0,
    total: 10,
    xp: 0,
    firstTryCorrect: 0,
    status: "in_progress"
  };
  player.history = Array.isArray(player.history) ? player.history : [];
  player.history.unshift(run);
  player.history = player.history.slice(0, 100);
  player.lastPlayedAt = now;
  state.activeRunId = run.id;
  state.runScore = 0;
  persistPlayerStore();
}

function updatePlayerRun(completed, earnedXP, firstTryCorrect) {
  const player = activePlayer();
  if (!player) return;
  let run = (player.history || []).find(item => item.id === state.activeRunId);
  if (!run) {
    beginPlayerRun(courseSectionForLevel(levels[state.levelIndex]));
    run = (player.history || []).find(item => item.id === state.activeRunId);
  }
  if (!run) return;
  state.runScore += earnedXP;
  run.completed = Math.max(run.completed || 0, completed);
  run.xp = state.runScore;
  run.firstTryCorrect = (run.firstTryCorrect || 0) + (firstTryCorrect ? 1 : 0);
  run.updatedAt = new Date().toISOString();
  if (run.completed >= run.total) {
    run.completed = run.total;
    run.status = "completed";
    run.endedAt = run.updatedAt;
  }
  player.lastPlayedAt = run.updatedAt;
  persistPlayerStore();
}

function formatLocalDate(value) {
  if (!value) return "—";
  const locales = { he: "he-IL", en: "en-US", ru: "ru-RU" };
  return new Intl.DateTimeFormat(locales[state.language], { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

function renderPlayerMenu() {
  const list = $("player-list");
  list.replaceChildren();
  const players = Object.values(playerStore.players).sort((a, b) => (b.lastPlayedAt || b.createdAt).localeCompare(a.lastPlayedAt || a.createdAt));
  players.forEach(player => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "player-chip";
    button.textContent = player.name;
    button.dataset.playerId = player.id;
    button.setAttribute("aria-current", String(player.id === state.activePlayerId));
    button.addEventListener("click", () => activatePlayer(player.id));
    list.append(button);
  });

  const player = activePlayer();
  $("player-records").hidden = !player;
  $("player-menu-close").hidden = !player;
  if (!player) return;

  const sections = ["primitives", "equal", "180", "master"];
  const records = $("level-records");
  records.replaceChildren();
  sections.forEach(section => {
    const history = (player.history || []).filter(run => run.section === section);
    const completedRuns = history.filter(run => run.status === "completed");
    const best = completedRuns.reduce((highest, run) => Math.max(highest, run.xp || 0), 0);
    const current = history.find(run => run.status === "in_progress");
    const card = document.createElement("div");
    card.className = `level-record${completedRuns.length ? " completed" : ""}`;
    const title = document.createElement("strong");
    title.textContent = courseSectionLabel(section);
    const status = document.createElement("span");
    status.textContent = completedRuns.length
      ? t("completedStatus", { xp: best })
      : current ? t("inProgress", { done: current.completed || 0 }) : t("notDone");
    card.append(title, status);
    records.append(card);
  });

  const historyElement = $("game-history");
  historyElement.replaceChildren();
  const recent = (player.history || []).slice(0, 12);
  if (!recent.length) {
    const empty = document.createElement("div");
    empty.className = "history-empty";
    empty.textContent = t("noGames");
    historyElement.append(empty);
    return;
  }
  recent.forEach(run => {
    const row = document.createElement("div");
    row.className = "history-row";
    const name = document.createElement("strong");
    name.textContent = courseSectionLabel(run.section);
    const progress = document.createElement("span");
    progress.textContent = `${run.completed || 0}/${run.total || 10} • ${run.xp || 0} XP`;
    progress.title = t("firstTry", { count: run.firstTryCorrect || 0 });
    const time = document.createElement("time");
    time.dateTime = run.updatedAt;
    time.textContent = formatLocalDate(run.updatedAt);
    row.append(name, progress, time);
    historyElement.append(row);
  });
}

function showPlayerMenu() {
  renderPlayerMenu();
  $("player-menu").hidden = false;
  if (!activePlayer()) $("player-name").focus();
}

function closePlayerMenu() {
  if (!activePlayer()) return;
  $("player-menu").hidden = true;
}

function activatePlayer(playerId) {
  const player = playerStore.players[playerId];
  if (!player) return;
  state.activePlayerId = playerId;
  playerStore.activePlayerId = playerId;
  player.lastPlayedAt = new Date().toISOString();
  const linkedCourse = pendingLinkedCourse;
  const resumable = linkedCourse ? null : (player.history || []).find(run => run.status === "in_progress" && run.completed < 10);
  if (linkedCourse) {
    state.activeRunId = null;
    state.runScore = 0;
    state.score = 0;
    state.levelIndex = Math.max(0, sectionStartIndex(linkedCourse));
    pendingLinkedCourse = null;
    beginPlayerRun(linkedCourse);
  } else if (resumable) {
    state.activeRunId = resumable.id;
    state.runScore = resumable.xp || 0;
    state.score = resumable.xp || 0;
    state.levelIndex = Math.min(sectionStartIndex(resumable.section) + (resumable.completed || 0), sectionStartIndex(resumable.section) + 9);
  } else {
    state.levelIndex = 0;
    state.score = 0;
    beginPlayerRun("primitives");
  }
  $("score").textContent = state.score;
  persistPlayerStore();
  $("player-menu").hidden = true;
  loadLevel();
  updateTouchInterface(true);
}

function createOrSelectPlayer(name) {
  const cleanName = name.trim().replace(/\s+/g, " ").slice(0, 24);
  if (!cleanName) return;
  const existing = Object.values(playerStore.players).find(player => player.name.toLocaleLowerCase() === cleanName.toLocaleLowerCase());
  if (existing) {
    activatePlayer(existing.id);
    return;
  }
  const now = new Date().toISOString();
  const player = { id: makeLocalId("player"), name: cleanName, createdAt: now, lastPlayedAt: now, history: [] };
  playerStore.players[player.id] = player;
  state.activePlayerId = player.id;
  persistPlayerStore();
  activatePlayer(player.id);
}

function updatePlayerButton() {
  const player = activePlayer();
  $("player-menu-button").textContent = `${t("player")}: ${player?.name || "—"} ▾`;
}

function applyLanguage(reload = true) {
  const isRtl = state.language === "he";
  document.documentElement.lang = state.language;
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.title = `Angle Quest — ${t("appTitle")}`;
  document.querySelector(".brand h1").textContent = t("appTitle");
  document.querySelector(".mission .eyebrow").textContent = t("currentMission").toUpperCase();
  $("loadout-title").textContent = t("chooseTool");
  document.querySelector(".arena-heading .eyebrow").textContent = t("placeAngle").toUpperCase();
  $("diagram-title").textContent = t("diagramTitle");
  $("diagram-desc").textContent = t("diagramDesc");
  $("arena-tip").textContent = t(document.documentElement.classList.contains("touch-ui") ? "touchTip" : "arenaTip");
  $("angle-larger").textContent = t("anglePlus");
  $("angle-smaller").textContent = t("angleMinus");
  $("check-button").textContent = t("check");
  $("rotate-left").textContent = t("counterClockwise");
  $("rotate-right").textContent = t("clockwise");
  $("mirror-button").textContent = t("mirror");
  $("discard-button").textContent = t("discard");
  document.querySelector(".footer-note").textContent = t("footer");
  document.querySelectorAll("[data-language]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.language === state.language)));
  const portraitCopy = {
    he: ["סובבו את המכשיר", "המשחק פועל במצב אופקי בלבד."],
    en: ["Rotate your device", "The game can only be played in landscape mode."],
    ru: ["Поверните устройство", "Игра работает только в альбомном режиме."]
  }[state.language];
  $("portrait-title").textContent = portraitCopy[0];
  $("portrait-body").textContent = portraitCopy[1];
  $("sound-toggle").setAttribute("aria-label", $("sound-toggle").getAttribute("aria-pressed") === "true" ? t("soundOff") : t("soundOn"));
  $("mirror-help").setAttribute("aria-label", t("mirrorHelp"));
  $("touch-tutorial-title").textContent = t("mirrorTutorialTitle");
  $("touch-tutorial-body").textContent = t("mirrorTutorialBody");
  $("touch-tutorial-try").textContent = t("replayTutorial");
  $("touch-tutorial-close").textContent = t("understood");
  updateCourseMenuButton();
  $("stage-transition-title").textContent = t("levelComplete");
  document.querySelector(".stage-transition-card .eyebrow").textContent = t("levelComplete").toUpperCase();
  $("stage-transition-body").textContent = t("levelCompleteBody");
  $("stage-transition-next").textContent = t("nextLevel");
  $("course-menu-title").textContent = t("chooseStart");
  document.querySelector(".course-menu-card .eyebrow").textContent = t("chooseLevel").toUpperCase();
  $("course-menu-body").textContent = t("chooseStartBody");
  document.querySelector('[data-course-start="primitives"]').textContent = t("primitives");
  document.querySelector('[data-course-start="equal"]').textContent = t("startEqual");
  document.querySelector('[data-course-start="180"]').textContent = "180°";
  document.querySelector('[data-course-start="master"]').textContent = t("startMaster");
  updatePlayerButton();
  $("player-menu-title").textContent = t("whoPlays");
  $("player-menu-note").textContent = t("localPlayerNote");
  $("player-name").placeholder = t("playerName");
  $("player-name").setAttribute("aria-label", t("playerName"));
  $("player-create").textContent = t("addPlayer");
  $("player-records-title").textContent = t("recordsTitle");
  $("game-history-title").textContent = t("recentGames");
  $("player-menu-close").setAttribute("aria-label", t("close"));
  renderPlayerMenu();
  const levelLabel = document.querySelector(".hud-item:nth-last-child(1)");
  if (levelLabel) levelLabel.childNodes[0].textContent = `${t("level")} `;
  if (reload) loadLevel();
}

const touchPointerQuery = window.matchMedia("(any-pointer: coarse)");

function isTouchInterface() {
  return initialLinkSettings.tablet || touchPointerQuery.matches || navigator.maxTouchPoints > 0;
}

function showTouchTutorial() {
  if (!isTouchInterface()) return;
  $("touch-tutorial").hidden = false;
  $("touch-tutorial-close").focus();
}

function closeTouchTutorial() {
  $("touch-tutorial").hidden = true;
  try { localStorage.setItem("angleQuestTouchTutorialV2Seen", "true"); } catch { /* The tutorial can appear again next session. */ }
}

function updateTouchInterface(showFirstTutorial = false) {
  const active = isTouchInterface();
  document.documentElement.classList.toggle("touch-ui", active);
  $("arena-tip").textContent = t(active ? "touchTip" : "arenaTip");
  if (!active) $("touch-tutorial").hidden = true;
  if (active && showFirstTutorial) {
    let seen = false;
    try { seen = localStorage.getItem("angleQuestTouchTutorialV2Seen") === "true"; } catch { /* Show the tutorial. */ }
    if (!seen) showTouchTutorial();
  }
}

function svgEl(tag, attrs = {}, text = "") {
  const el = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  if (text) el.textContent = text;
  return el;
}

function line(parent, x1, y1, x2, y2, className = "geo-line") {
  parent.append(svgEl("line", { x1, y1, x2, y2, class: className }));
}

function label(parent, x, y, text, className = "diagram-label") {
  parent.append(svgEl("text", { x, y, class: className, "text-anchor": "middle" }, text));
}

function polar(radius, degrees) {
  const r = degrees * Math.PI / 180;
  return { x: radius * Math.cos(r), y: radius * Math.sin(r) };
}

function sectorPath(degrees, radius = 54) {
  const start = polar(radius, -degrees / 2);
  const end = polar(radius, degrees / 2);
  const large = degrees > 180 ? 1 : 0;
  return `M 0 0 L ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y} Z`;
}

function arcPath(degrees, radius = 48) {
  const start = polar(radius, -degrees / 2);
  const end = polar(radius, degrees / 2);
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${degrees > 180 ? 1 : 0} 1 ${end.x} ${end.y}`;
}

function renderScene(level) {
  sceneLayer.replaceChildren();
  targetLayer.replaceChildren();
  sceneLayer.removeAttribute("transform");
  targetLayer.removeAttribute("transform");

  if (level.scene === "quadrilateral") {
    const { width, height } = level.targetDimensions;
    const target = svgEl("g", { transform: `translate(${level.target.x} ${level.target.y}) rotate(${level.target.rotation})` });
    target.append(svgEl("polygon", { points: quadrilateralPoints(level.correctCategory, width, height), class: "quad-target" }));
    sceneLayer.append(target);
    return;
  }
  if (level.scene === "primitive") {
    const center = { x: 365, y: 220 };
    const first = polar(130, -level.primitiveDegrees / 2);
    const second = polar(130, level.primitiveDegrees / 2);
    line(sceneLayer, center.x, center.y, center.x + first.x, center.y + first.y);
    line(sceneLayer, center.x, center.y, center.x + second.x, center.y + second.y);
    const primitiveArc = svgEl("path", {
      d: arcPath(level.primitiveDegrees, 62),
      class: "given-arc",
      transform: `translate(${center.x} ${center.y})`
    });
    sceneLayer.append(primitiveArc);
    sceneLayer.append(svgEl("circle", { cx: center.x, cy: center.y, r: 27, class: "target-halo" }));
    sceneLayer.append(svgEl("circle", { cx: center.x, cy: center.y, r: 6, class: "target-dot" }));
    renderDistractorLines(level);
    applyProSceneTransform(level);
    return;
  } else if (level.scene === "vertical") {
    const degrees = level.choices.find(c => c.id === level.correctChoice).degrees;
    const center = { x: level.target.x, y: level.target.y };
    const halfLength = 292;
    [-degrees / 2, degrees / 2].forEach(angle => {
      const direction = polar(halfLength, angle);
      line(sceneLayer, center.x - direction.x, center.y - direction.y, center.x + direction.x, center.y + direction.y);
    });
    const givenLabel = polar(78, 0);
    label(sceneLayer, center.x + givenLabel.x, center.y + givenLabel.y, `${degrees}°`, "given-label");
    label(sceneLayer, 82, 88, "A");
    label(sceneLayer, 650, 350, "B");
    label(sceneLayer, 650, 88, "C");
    label(sceneLayer, 82, 350, "D");
  } else if (level.scene === "alternate" || level.scene === "corresponding") {
    line(sceneLayer, 80, 120, 650, 120);
    line(sceneLayer, 80, 280, 650, 280);
    const degrees = level.choices.find(c => c.id === level.correctChoice).degrees;
    const targetPoint = { x: 360, y: 280 };
    const lineAngle = level.scene === "alternate" ? -degrees : degrees;
    const direction = unit(lineAngle);
    const topScale = (120 - targetPoint.y) / direction.y;
    const topIntersection = { x: targetPoint.x + direction.x * topScale, y: 120 };
    const startScale = (45 - targetPoint.y) / direction.y;
    const endScale = (390 - targetPoint.y) / direction.y;
    line(sceneLayer, targetPoint.x + direction.x * startScale, 45, targetPoint.x + direction.x * endScale, 390);
    if (level.scene === "alternate") {
      const labelPoint = polar(68, normalizeAngle(level.target.rotation + 180));
      label(sceneLayer, topIntersection.x + labelPoint.x, topIntersection.y + labelPoint.y, `${degrees}°`, "given-label");
    } else {
      const labelPoint = polar(68, level.target.rotation);
      label(sceneLayer, topIntersection.x + labelPoint.x, topIntersection.y + labelPoint.y, `${degrees}°`, "given-label");
    }
  } else if (level.scene === "adjacent") {
    const missingDegrees = level.choices.find(c => c.id === level.correctChoice).degrees;
    const givenDegrees = 180 - missingDegrees;
    level.target.rotation = normalizeAngle(-missingDegrees / 2);
    line(sceneLayer, 95, 220, 635, 220);
    const diagonalEnd = polar(258, -missingDegrees);
    line(sceneLayer, level.target.x, level.target.y, level.target.x + diagonalEnd.x, level.target.y + diagonalEnd.y);
    const givenLabel = polar(86, -90 - missingDegrees / 2);
    label(sceneLayer, level.target.x + givenLabel.x, level.target.y + givenLabel.y, `${givenDegrees}°`, "given-label");
    label(sceneLayer, 80, 241, "A");
    label(sceneLayer, 650, 241, "B");
  } else if (level.scene === "triangle") {
    const left = { x: 220, y: 365 };
    const right = { x: 520, y: 365 };
    const leftDegrees = 60;
    const rightDegrees = 50;
    const base = right.x - left.x;
    const height = base / (1 / Math.tan(leftDegrees * Math.PI / 180) + 1 / Math.tan(rightDegrees * Math.PI / 180));
    const top = { x: left.x + height / Math.tan(leftDegrees * Math.PI / 180), y: left.y - height };
    level.target.x = top.x;
    level.target.y = top.y;
    level.target.rotation = (180 - leftDegrees + rightDegrees) / 2;
    line(sceneLayer, left.x, left.y, right.x, right.y);
    line(sceneLayer, left.x, left.y, top.x, top.y);
    line(sceneLayer, top.x, top.y, right.x, right.y);
    label(sceneLayer, 255, 339, "60°", "given-label");
    label(sceneLayer, 481, 339, "50°", "given-label");
  }

  renderDistractorLines(level);
  const target = svgEl("g", { transform: `translate(${level.target.x} ${level.target.y}) rotate(${level.target.rotation})` });
  const degrees = level.choices.find(c => c.id === level.correctChoice).degrees;
  target.append(svgEl("circle", { cx: 0, cy: 0, r: 27, class: "target-halo" }));
  target.append(svgEl("path", { d: sectorPath(degrees, 60), class: "target-arc" }));
  target.append(svgEl("circle", { cx: 0, cy: 0, r: 5, class: "target-dot" }));
  targetLayer.append(target);
  applyProSceneTransform(level);
}

function renderDistractorLines(level) {
  (level.distractors || []).forEach(item => line(sceneLayer, item.x1, item.y1, item.x2, item.y2, item.className || "geo-secondary"));
}

function applyProSceneTransform(level) {
  if (!level.proRotation) return;
  const transform = `rotate(${level.proRotation} 360 215)`;
  sceneLayer.setAttribute("transform", transform);
  targetLayer.setAttribute("transform", transform);
  sceneLayer.querySelectorAll("text").forEach(text => {
    const x = Number(text.getAttribute("x"));
    const y = Number(text.getAttribute("y"));
    text.setAttribute("transform", `rotate(${-level.proRotation} ${x} ${y})`);
  });
}

function currentTarget(level) {
  const rotation = level.proRotation || 0;
  if (!rotation) return { ...level.target };
  const radians = rotation * Math.PI / 180;
  const dx = level.target.x - 360;
  const dy = level.target.y - 215;
  return {
    ...level.target,
    x: 360 + dx * Math.cos(radians) - dy * Math.sin(radians),
    y: 215 + dx * Math.sin(radians) + dy * Math.cos(radians),
    rotation: normalizeAngle(level.target.rotation + rotation)
  };
}

function renderChoices(level) {
  if (level.phase === "quadrilateral") {
    $("category-list").innerHTML = `<legend>בחרו צורה</legend><section class="tool-family"><h3 class="tool-family-title">מרובעים</h3><div class="choice-grid">${shuffle([...quadrilateralTools]).map(value => `<button type="button" class="choice-button" data-category="${value}" aria-pressed="false" ${(level.scaffold && value !== level.correctCategory) || level.disabledCategories?.includes(value) ? "disabled" : ""}>${categoryLabel(value)}</button>`).join("")}</div></section>`;
    document.querySelectorAll("[data-category]").forEach(button => button.addEventListener("click", () => {
      if (state.followUp) { handleWhatElseChoice(level, button); return; }
      if (button.disabled || state.solved) return;
      if (!state.firstChoiceMade) { state.firstChoiceMade = true; state.firstChoiceCorrect = button.dataset.category === level.correctCategory; }
      state.category = button.dataset.category;
      document.querySelectorAll("[data-category]").forEach(b => b.setAttribute("aria-pressed", String(b === button)));
      placeSelected(level.start);
      playEquipSound();
    }));
    return;
  }
  const isBeginner = level.phase === "beginner";
  const isMaster = level.mode === "master";
  const primitivesEnabled = isBeginner || isMaster;
  const advancedHidden = isBeginner && !isMaster;
  const primitiveOrder = isMaster ? masterToolPermutation(primitiveTools, level, 0) : shuffle([...primitiveTools]);
  const primitiveSection = `<section class="tool-family"><h3 class="tool-family-title">${t("primitives")}</h3><div class="choice-grid">${primitiveOrder.map(value => `<button type="button" class="choice-button" data-category="${value}" aria-pressed="false" ${primitivesEnabled ? "" : "disabled"}>${categoryLabel(value)}</button>`).join("")}</div></section>`;
  const advancedSections = Object.entries(families).map(([family, tools], familyIndex) => {
    const familyHidden = advancedHidden || (!isMaster && !isBeginner && family !== level.family);
    const familyLabel = family === "שוות" ? t("equalFamily") : "180°";
    const toolOrder = isMaster ? masterToolPermutation(tools, level, familyIndex + 1) : shuffle([...tools]);
    return `<section class="tool-family ${familyHidden ? "tool-family-reserved" : ""}" ${familyHidden ? "aria-hidden=\"true\"" : ""}><h3 class="tool-family-title">${familyLabel}</h3><div class="choice-grid">${toolOrder.map(value => `<button type="button" class="choice-button" data-category="${value}" aria-pressed="false" ${familyHidden ? "disabled" : ""}>${categoryLabel(value)}</button>`).join("")}</div></section>`;
  }).join("");
  $("category-list").innerHTML = `<legend>${t("toolbox")}</legend>${primitiveSection}${advancedSections}`;
  document.querySelectorAll("[data-category]").forEach(button => button.addEventListener("click", () => {
    if (state.solved) return;
    if (level.phase !== "beginner" && state.category === button.dataset.category && state.equipped) {
      hideSelectedTool();
      document.querySelectorAll("[data-category]").forEach(b => b.setAttribute("aria-pressed", "false"));
      return;
    }
    if (!state.firstChoiceMade) {
      state.firstChoiceMade = true;
      state.firstChoiceCorrect = button.dataset.category === level.correctCategory;
    }
    state.category = button.dataset.category;
    document.querySelectorAll("[data-category]").forEach(b => b.setAttribute("aria-pressed", String(b === button)));
    if (level.phase === "beginner") {
      placeSelected({ x: level.start.x, y: level.start.y });
      playEquipSound();
      return;
    }
    placeSelected({ x: level.start.x, y: level.start.y });
    playEquipSound();
  }));
}

function masterToolPermutation(tools, level, salt) {
  const values = [...tools];
  if (values.length < 2) return values;
  const question = Math.max(1, level.exerciseNumber || 1);
  const offset = (question - 1 + salt) % values.length;
  const rotated = values.slice(offset).concat(values.slice(0, offset));
  return Math.floor((question - 1) / values.length) % 2 ? rotated.reverse() : rotated;
}

function hideSelectedTool() {
  touchPoints.clear();
  touchGesture = null;
  setGestureVisual();
  state.equipped = false;
  state.category = null;
  state.choice = null;
  state.degrees = 0;
  pieceLayer.replaceChildren();
  ["rotate-left", "rotate-right", "check-button", "angle-smaller", "angle-larger", "mirror-button", "discard-button"].forEach(id => $(id).disabled = true);
  $("mirror-button").setAttribute("aria-pressed", "false");
  $("angle-readout").textContent = t("practiceMode");
  feedback(t("toolHidden"), false);
}

function speakSelection(category) {
  const englishNames = {
    "חדה": "Acute angle.",
    "ישרה": "Right angle.",
    "שטוחה": "Straight angle.",
    "קהה": "Obtuse angle.",
    "מתאימות": "Corresponding angles.",
    "מתחלפות": "Alternate angles.",
    "קודקודיות": "Vertical angles.",
    "צמודות": "Supplementary adjacent angles.",
    "משולש": "Triangle.",
    "ריבוע": "Square selected.",
    "מלבן": "Rectangle selected.",
    "מעוין": "Rhombus selected.",
    "מקבילית": "Parallelogram selected.",
    "טרפז": "Trapezoid selected.",
    "דלתון": "Kite selected."
  };
  const russianNames = {
    "ריבוע": "Выбран квадрат.", "מלבן": "Выбран прямоугольник.", "מעוין": "Выбран ромб.",
    "מקבילית": "Выбран параллелограмм.", "טרפז": "Выбрана трапеция.", "דלתון": "Выбран дельтоид."
  };
  const primitiveSpoken = { "חדה": "זווית חדה", "ישרה": "זווית ישרה", "שטוחה": "זָוִית שְׁטוּחָה", "קהה": "זָוִית קֵהָה" };
  const complexSpoken = { "מתאימות": "זָוִיּוֹת מַתְאִימוֹת", "מתחלפות": "זָוִיּוֹת מִתְחַלְּפוֹת", "קודקודיות": "זָוִיּוֹת קוֹדְקוֹדִיּוֹת", "צמודות": "זָוִיּוֹת צְמוּדוֹת" };
  const spokenText = primitiveSpoken[category] || complexSpoken[category]
    || (category === "טרפז" ? "טְרַפֵּז." : category === "מלבן" ? "מַלְבֵּן." : category === "דלתון" ? "דַלְטוֹן." : category);
  return playRecordedSpeech(category, spokenText, englishNames[category], russianNames[category]);
}

function playRecordedSpeech(key, hebrewFallback, englishFallback, russianFallback) {
  if ($("sound-toggle").getAttribute("aria-pressed") !== "true") return Promise.resolve();
  const filename = recordedSpeechFiles[key];
  if (!filename) {
    return speakText(hebrewFallback, englishFallback, russianFallback);
  }
  if (speechState.audio) {
    speechState.audio.pause();
    speechState.audio.currentTime = 0;
  }
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  return new Promise(resolve => {
    const audio = new Audio(`audio/${state.language}/${filename}?v=11`);
    let usedFallback = false;
    let completed = false;
    const safetyTimer = window.setTimeout(() => finish(), 7000);
    function finish() {
      if (completed) return;
      completed = true;
      window.clearTimeout(safetyTimer);
      if (speechState.audio === audio) speechState.audio = null;
      resolve();
    }
    const fallback = () => {
      if (usedFallback) return;
      usedFallback = true;
      if (speechState.audio === audio) speechState.audio = null;
      Promise.resolve(speakText(hebrewFallback, englishFallback, russianFallback)).finally(finish);
    };
    audio.volume = 1;
    audio.onerror = fallback;
    audio.onended = finish;
    speechState.audio = audio;
    audio.play().catch(fallback);
  });
}

function preloadQuadrilateralSpeech() {
  speechState.preloaded = quadrilateralTools.map(category => {
    const filename = recordedSpeechFiles[category];
    const audio = new Audio(`audio/${state.language}/${filename}?v=6`);
    audio.preload = "auto";
    audio.load();
    return audio;
  });
}

function refreshVoices() {
  if (!("speechSynthesis" in window)) return;
  speechState.voices = window.speechSynthesis.getVoices();
}

function speakText(text, englishFallback = text, russianFallback = englishFallback) {
  if ($("sound-toggle").getAttribute("aria-pressed") !== "true") return Promise.resolve();
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    feedback("הדפדפן הזה אינו תומך בהקראה קולית.", false);
    return Promise.resolve();
  }
  refreshVoices();
  if (speechState.timer) {
    clearTimeout(speechState.timer);
    speechState.timer = null;
  }
  if (window.speechSynthesis.speaking || window.speechSynthesis.pending) window.speechSynthesis.cancel();
  if (window.speechSynthesis.paused) window.speechSynthesis.resume();
  const hebrewVoice = speechState.voices.find(voice => voice.lang?.toLowerCase().startsWith("he") && voice.localService);
  const russianVoice = speechState.voices.find(voice => voice.lang?.toLowerCase().startsWith("ru") && voice.localService)
    || speechState.voices.find(voice => voice.lang?.toLowerCase().startsWith("ru"));
  const englishVoice = speechState.voices.find(voice => voice.lang?.toLowerCase().startsWith("en-us") && voice.localService)
    || speechState.voices.find(voice => voice.lang?.toLowerCase().startsWith("en") && voice.localService)
    || speechState.voices.find(voice => voice.lang?.toLowerCase().startsWith("en"));
  const requestedVoice = state.language === "ru" ? russianVoice : state.language === "en" ? englishVoice : hebrewVoice;
  const selectedVoice = requestedVoice || englishVoice || hebrewVoice || russianVoice;
  const requestedText = state.language === "ru" ? (russianFallback || englishFallback || text)
    : state.language === "en" ? (englishFallback || text) : text;
  return new Promise(resolve => {
    const message = new SpeechSynthesisUtterance(requestedText);
    let started = false;
    let completed = false;
    const safetyTimer = window.setTimeout(() => finish(), 7000);
    function finish() {
      if (completed) return;
      completed = true;
      window.clearTimeout(safetyTimer);
      if (speechState.timer) clearTimeout(speechState.timer);
      speechState.timer = null;
      if (speechState.utterance === message) speechState.utterance = null;
      resolve();
    }
    message.lang = selectedVoice?.lang || (state.language === "ru" ? "ru-RU" : state.language === "he" ? "he-IL" : "en-US");
    message.rate = .92;
    message.pitch = 1.05;
    message.volume = 1;
    if (selectedVoice) message.voice = selectedVoice;
    message.onstart = () => {
      started = true;
      if (speechState.timer) clearTimeout(speechState.timer);
      speechState.timer = null;
    };
    message.onend = finish;
    message.onerror = event => {
      if (event.error !== "canceled" && event.error !== "interrupted") feedback(`שגיאת הקראה: ${event.error || "לא ידועה"}.`, false);
      finish();
    };
    speechState.utterance = message;
    window.speechSynthesis.speak(message);
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    speechState.timer = setTimeout(() => {
      if (!started && speechState.utterance === message) feedback("מנוע ההקראה לא התחיל. הצפצוף יעזור לבדוק אם הבעיה היא רק בקול העברי.", false);
    }, 1200);
  });
}

function continueAfterCorrectSpeech(category, continuation) {
  const startedAt = performance.now();
  window.setTimeout(() => {
    Promise.resolve(speakSelection(category)).finally(() => {
      const remainingSuccessTime = Math.max(180, 900 - (performance.now() - startedAt));
      window.setTimeout(continuation, remainingSuccessTime);
    });
  }, 220);
}

function shuffle(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
  }
  return items;
}

function placeSelected(point) {
  const level = levels[state.levelIndex];
  const target = currentTarget(level);
  if (!state.category || state.solved) return;
  state.snappedToTarget = false;
  state.choice = level.correctChoice;
  const selectedAngle = level.choices.find(c => c.id === state.choice);
  state.degrees = defaultDegreesForTool(state.category, selectedAngle.degrees, selectedAngle.type);
  state.triangleVertices = state.category === "משולש"
    ? { a: polar(112, -state.degrees / 2), b: polar(112, state.degrees / 2) }
    : null;
  state.equipped = true;
  const initialRotation = defaultPlacementRotation(state.category, target.rotation, state.degrees);
  state.piece = {
    x: point.x,
    y: point.y,
    rotation: initialRotation,
    handleRotation: -initialRotation,
    mirrored: false
  };
  state.dimensions = { arm: 112, cross: 112, gap: 92, spine: 132 };
  state.adjacentRays = state.category === "צמודות"
    ? { a: -state.degrees, b: 0, opposite: 180 }
    : null;
  if (level.phase === "quadrilateral") {
    const actualShape = state.category;
    state.quadDimensions = actualShape === "ריבוע" ? { width: 110, height: 110 }
      : actualShape === "מלבן" ? { width: 150, height: 86 }
        : actualShape === "מעוין" ? { width: 112, height: 140 }
          : { width: 140, height: 105 };
    state.quadVertices = ["מקבילית", "טרפז", "דלתון"].includes(actualShape)
      ? quadrilateralVertices(actualShape, state.quadDimensions.width, state.quadDimensions.height)
      : null;
  }
  updateAngleReadout();
  ["rotate-left", "rotate-right", "check-button", "angle-smaller", "angle-larger", "mirror-button", "discard-button"].forEach(id => $(id).disabled = false);
  updateShapeControls(level);
  $("mirror-button").setAttribute("aria-pressed", String(state.piece.mirrored));
  feedback(t("augmented", { tool: categoryLabel(state.category) }), true);
  renderPiece();
  pulse(45);
  const equippedCategory = state.category;
  window.setTimeout(() => {
    if (state.equipped && state.category === equippedCategory) speakSelection(equippedCategory);
  }, 220);
}

function defaultDegreesForTool(category, targetDegrees, targetType) {
  const primitiveDegrees = { "חדה": 45, "ישרה": 90, "שטוחה": 180, "קהה": 120 };
  if (primitiveDegrees[category]) return primitiveDegrees[category];
  if (category === "מתחלפות") return 60;
  if (category === "מתאימות" || category === "קודקודיות") return 90;
  if (category === "צמודות" || category === "משולש") return 60;
  return targetDegrees;
}

function defaultPlacementRotation(category, targetRotation, degrees) {
  // Every tool enters in its recognizable neutral silhouette (Z, X, F, etc.).
  // Rotation toward the answer belongs to the player, never to initial placement.
  if (category === "מתחלפות") return normalizeAngle(-degrees / 2);
  return 0;
}

function renderPiece() {
  pieceLayer.replaceChildren();
  if (!state.equipped) return;
  const level = levels[state.levelIndex];
  if (level.phase === "quadrilateral") { renderQuadrilateralPiece(level); return; }
  const choice = level.choices.find(c => c.id === state.choice);
  const shape = augmentedShape(level);
  const mirrorCenterX = shapeMirrorCenterX(shape);
  const group = svgEl("g", {
    class: "piece",
    transform: `translate(${state.piece.x} ${state.piece.y}) rotate(${state.piece.rotation})`,
    "aria-label": `זווית ${Math.round(state.degrees)} מעלות`
  });
  const content = svgEl("g", {
    class: "piece-content",
    transform: shape === "z"
      ? zMirrorTransform(state.piece.mirrored ? -1 : 1)
      : mirrorScaleTransform(mirrorCenterX, state.piece.mirrored ? -1 : 1)
  });
  const rayLength = Math.max(68, Math.min(165, state.dimensions.arm * .8));
  const adjacentRays = shape === "adjacent2"
    ? (state.adjacentRays ||= { a: -state.degrees, b: 0, opposite: 180 })
    : null;
  const aAngle = adjacentRays?.a ?? (shape === "f" || shape === "primitive" ? 0 : -state.degrees / 2);
  const bAngle = adjacentRays?.b ?? (shape === "f" ? state.degrees : shape === "primitive" ? -state.degrees : state.degrees / 2);
  const a = polar(shape === "adjacent2" ? Math.max(56, rayLength - 20) : rayLength, aAngle);
  const b = polar(rayLength, bAngle);
  const triangle = shape === "triangle" ? triangleGeometry() : null;
  let equalMarker = null;
  let primaryMarkerRotation = 0;

  if (shape === "z") {
    equalMarker = renderZShape(content);
  } else if (shape === "f") {
    const markers = renderFShape(content);
    primaryMarkerRotation = markers.primaryRotation;
    equalMarker = markers.equalMarker;
  } else if (shape === "adjacent2") {
    renderAdjacentTwoShape(content, a, b, polar(rayLength, adjacentRays.opposite));
    primaryMarkerRotation = normalizeAngle((aAngle + normalizeSignedAngle(bAngle - aAngle) / 2));
  } else if (shape === "triangle") {
    primaryMarkerRotation = triangleGeometry().rotation;
    renderTriangleShape(content);
  } else if (shape === "primitive") {
    primaryMarkerRotation = -state.degrees / 2;
    renderPrimitiveShape(content, a, b);
  } else {
    const oppositeA = { x: -a.x, y: -a.y };
    const oppositeB = { x: -b.x, y: -b.y };
    content.append(svgEl("line", { x1: oppositeA.x, y1: oppositeA.y, x2: a.x, y2: a.y, class: "piece-rays" }));
    content.append(svgEl("line", { x1: oppositeB.x, y1: oppositeB.y, x2: b.x, y2: b.y, class: "piece-opposite" }));
    equalMarker = { x: 0, y: 0, rotation: 180 };
  }
  renderAngleMarker(content, { x: 0, y: 0, rotation: primaryMarkerRotation });
  if (families["שוות"].includes(state.category) && equalMarker) renderAngleMarker(content, equalMarker);
  content.append(svgEl("circle", { cx: 0, cy: 0, r: 7, class: "piece-core" }));
  if ((state.category === "מתחלפות" || state.category === "מתאימות") && equalMarker) {
    content.append(svgEl("circle", { cx: equalMarker.x, cy: equalMarker.y, r: 7, class: "piece-core" }));
  }
  if (shape === "triangle" && triangle) {
    content.append(svgEl("circle", { cx: triangle.a.x, cy: triangle.a.y, r: 7, class: "piece-core" }));
    content.append(svgEl("circle", { cx: triangle.b.x, cy: triangle.b.y, r: 7, class: "piece-core" }));
  }
  group.addEventListener("pointerdown", startMove);

  const bounds = angleBounds(activeChoiceType(level, choice));
  let angleHandles = bounds.min === bounds.max || shape === "triangle"
    ? []
    : shape === "adjacent2"
      ? [
          { point: b, side: 1, label: "כיוון הישר", priority: "secondary" },
          { point: a, side: -1, label: "פתיחה וסגירה של הזווית", priority: "primary" }
        ]
      : [
          { point: triangle?.a || a, side: -1, label: "כיוון הזרוע הראשונה", priority: "secondary" },
          { point: state.category === "קודקודיות"
            ? polar(rayLength, bAngle + 180)
            : state.category === "מתחלפות"
              ? polar(52, -state.degrees / 2 + 180)
              : (triangle?.b || b), side: 1, label: "פתיחה וסגירה של הזווית", priority: "primary" }
        ];
  angleHandles = angleHandles.filter(handle => handle.priority === "primary");
  if (isTouchInterface()) angleHandles = angleHandles.filter(handle => handle.priority === "primary");
  if (!state.dragging && !state.solved && !state.snappedToTarget) keepAngleHandlesInArena(angleHandles.map(handle => handle.point), mirrorCenterX);
  group.setAttribute("transform", `translate(${state.piece.x} ${state.piece.y}) rotate(${state.piece.rotation})`);
  angleHandles.forEach(({ point, side, label: handleLabel, priority }) => {
    const hit = svgEl("circle", {
      cx: point.x,
      cy: point.y,
      r: isTouchInterface() ? 32 : 24,
      class: `size-handle-hit angle-handle angle-handle-${priority}`,
      role: "button",
      "aria-label": handleLabel
    });
    const visible = svgEl("circle", {
      cx: point.x,
      cy: point.y,
      r: isTouchInterface() && priority === "primary" ? 13 : 10,
      class: `size-handle angle-handle angle-handle-${priority}`
    });
    hit.addEventListener("pointerdown", event => startResize(event, side));
    visible.addEventListener("pointerdown", event => startResize(event, side));
    content.append(hit, visible);
  });

  const rotateHandleDistance = Math.max(92, Math.min(170, rayLength + 18));
  const handleGroup = svgEl("g", { transform: `rotate(${state.piece.handleRotation || 0}) translate(0 ${-rotateHandleDistance})` });
  handleGroup.append(svgEl("line", { x1: 0, y1: 12, x2: 0, y2: 77, class: "rotate-handle-line" }));
  const rotateHit = svgEl("circle", { cx: 0, cy: 0, r: 34, class: "rotate-handle-hit", "aria-label": "סיבוב הכלי" });
  const handle = svgEl("circle", { cx: 0, cy: 0, r: isTouchInterface() ? 18 : 13, class: "rotate-handle" });
  const rotateIcon = svgEl("text", { x: 0, y: 1, class: "rotate-handle-icon", "text-anchor": "middle", "dominant-baseline": "middle", "aria-hidden": "true" }, "↻");
  [rotateHit, handle, rotateIcon].forEach(element => element.addEventListener("pointerdown", startRotate));
  handleGroup.append(rotateHit, handle, rotateIcon);
  group.append(content);
  if (shape === "triangle") {
    const triangleFlip = state.piece.mirrored ? -1 : 1;
    addPointHandle(group, { x: triangle.a.x * triangleFlip, y: triangle.a.y }, "triangleVertexA", "שינוי הקודקוד הראשון של המשולש", "קודקוד");
    addPointHandle(group, { x: triangle.b.x * triangleFlip, y: triangle.b.y }, "triangleVertexB", "שינוי הקודקוד השני של המשולש", "קודקוד");
  }
  group.append(handleGroup);
  pieceLayer.append(group);
  addPieceDragArea(content);
}

function keepAngleHandlesInArena(points, mirrorCenterX = 0) {
  if (!points.length) return;
  const margin = isTouchInterface() ? 38 : 30;
  const rotation = state.piece.rotation * Math.PI / 180;
  const scaleX = state.piece.mirrored ? -1 : 1;
  const transformed = points.map(point => {
    const mirroredX = mirrorCenterX + (point.x - mirrorCenterX) * scaleX;
    return {
      x: state.piece.x + mirroredX * Math.cos(rotation) - point.y * Math.sin(rotation),
      y: state.piece.y + mirroredX * Math.sin(rotation) + point.y * Math.cos(rotation)
    };
  });
  const minX = Math.min(...transformed.map(point => point.x));
  const maxX = Math.max(...transformed.map(point => point.x));
  const minY = Math.min(...transformed.map(point => point.y));
  const maxY = Math.max(...transformed.map(point => point.y));
  const shiftX = minX < margin ? margin - minX : maxX > 720 - margin ? 720 - margin - maxX : 0;
  const shiftY = minY < margin ? margin - minY : maxY > 430 - margin ? 430 - margin - maxY : 0;
  state.piece.x += shiftX;
  state.piece.y += shiftY;
}

function quadrilateralVertices(shape, width, height) {
  if (shape === "מעוין") return [{ x: 0, y: -height / 2 }, { x: width / 2, y: 0 }, { x: 0, y: height / 2 }, { x: -width / 2, y: 0 }];
  if (shape === "מקבילית") {
    const shift = width * .18;
    return [{ x: -width / 2 + shift, y: -height / 2 }, { x: width / 2 + shift, y: -height / 2 }, { x: width / 2 - shift, y: height / 2 }, { x: -width / 2 - shift, y: height / 2 }];
  }
  if (shape === "טרפז") return [{ x: -width * .4, y: -height / 2 }, { x: width * .2, y: -height / 2 }, { x: width / 2, y: height / 2 }, { x: -width / 2, y: height / 2 }];
  if (shape === "דלתון") return [{ x: 0, y: -height * .62 }, { x: width / 2, y: 0 }, { x: 0, y: height * .38 }, { x: -width / 2, y: 0 }];
  return [{ x: -width / 2, y: -height / 2 }, { x: width / 2, y: -height / 2 }, { x: width / 2, y: height / 2 }, { x: -width / 2, y: height / 2 }];
}

function quadrilateralPoints(shape, width, height, vertices = null) {
  return (vertices || quadrilateralVertices(shape, width, height)).map(point => `${point.x},${point.y}`).join(" ");
}

function trapezoidHasSecondParallelPair(vertices = state.quadVertices) {
  if (!vertices || vertices.length !== 4) return false;
  const right = { x: vertices[2].x - vertices[1].x, y: vertices[2].y - vertices[1].y };
  const left = { x: vertices[3].x - vertices[0].x, y: vertices[3].y - vertices[0].y };
  const lengths = Math.hypot(right.x, right.y) * Math.hypot(left.x, left.y);
  return lengths > 0 && Math.abs(right.x * left.y - right.y * left.x) / lengths < .025;
}

function renderQuadrilateralPiece(level) {
  const { width, height } = state.quadDimensions;
  const actualShape = state.category;
  const group = svgEl("g", { class: "piece", transform: `translate(${state.piece.x} ${state.piece.y}) rotate(${state.piece.rotation})` });
  const content = svgEl("g", { class: "piece-content" });
  const flipScale = quadrilateralCanFlip(actualShape) && state.piece.mirrored ? -1 : 1;
  const shapeContent = svgEl("g", { class: "quad-flip-content", transform: `scale(${flipScale} 1)` });
  shapeContent.append(svgEl("polygon", { points: quadrilateralPoints(actualShape, width, height, state.quadVertices), class: "quad-piece piece-rays" }));
  if (actualShape === "טרפז" && trapezoidHasSecondParallelPair(state.quadVertices)) {
    const [topLeft, topRight, bottomRight, bottomLeft] = state.quadVertices;
    shapeContent.append(svgEl("line", { x1: topRight.x, y1: topRight.y, x2: bottomRight.x, y2: bottomRight.y, class: "invalid-parallel-side" }));
    shapeContent.append(svgEl("line", { x1: bottomLeft.x, y1: bottomLeft.y, x2: topLeft.x, y2: topLeft.y, class: "invalid-parallel-side" }));
  }
  if (actualShape === "מעוין") {
    shapeContent.append(svgEl("line", { x1: -width / 2, y1: 0, x2: width / 2, y2: 0, class: "quad-diagonal" }));
    shapeContent.append(svgEl("line", { x1: 0, y1: -height / 2, x2: 0, y2: height / 2, class: "quad-diagonal" }));
  }
  content.append(shapeContent);
  const displayPoint = point => ({ x: point.x * flipScale, y: point.y });
  if (actualShape === "מקבילית") {
    [0, 1, 2].forEach(index => addPointHandle(content, displayPoint(state.quadVertices[index]), `quadVertex${index}`, `שינוי קודקוד ${index + 1}`, "קודקוד"));
  } else if (actualShape === "טרפז") {
    state.quadVertices.forEach((point, index) => addPointHandle(content, displayPoint(point), `quadVertex${index}`, `שינוי קודקוד ${index + 1}`, "קודקוד"));
  } else if (actualShape === "דלתון") {
    [0, 1, 2].forEach(index => addPointHandle(content, displayPoint(state.quadVertices[index]), `quadVertex${index}`, `שינוי קודקוד ${index + 1}`, "קודקוד"));
  } else if (actualShape === "ריבוע") {
    addPointHandle(content, { x: width / 2, y: height / 2 }, "quadUniform", "הגדלה או הקטנה אחידה של הריבוע", "גודל");
  } else {
    addPointHandle(content, { x: width / 2, y: 0 }, "quadWidth", "שינוי רוחב הצורה", "רוחב");
    addPointHandle(content, { x: 0, y: height / 2 }, "quadHeight", "שינוי גובה הצורה", "גובה");
  }
  group.addEventListener("pointerdown", startMove);
  const handleGroup = svgEl("g", { transform: `translate(0 ${-height / 2 - 48})` });
  handleGroup.append(svgEl("line", { x1: 0, y1: 12, x2: 0, y2: 38, class: "rotate-handle-line" }));
  const rotateHit = svgEl("circle", { cx: 0, cy: 0, r: 34, class: "rotate-handle-hit", "aria-label": "סיבוב הצורה" });
  const handle = svgEl("circle", { cx: 0, cy: 0, r: isTouchInterface() ? 18 : 13, class: "rotate-handle" });
  const rotateIcon = svgEl("text", { x: 0, y: 1, class: "rotate-handle-icon", "text-anchor": "middle", "dominant-baseline": "middle", "aria-hidden": "true" }, "↻");
  [rotateHit, handle, rotateIcon].forEach(element => element.addEventListener("pointerdown", startRotate));
  handleGroup.append(rotateHit, handle, rotateIcon); content.append(handleGroup);
  group.append(content); pieceLayer.append(group); addPieceDragArea(content);
}

function resizeQuadrilateral(axis, delta) {
  if (!state.equipped || state.solved) return;
  if (state.category === "ריבוע") {
    const next = Math.max(60, Math.min(210, state.quadDimensions.width + delta));
    state.quadDimensions = { width: next, height: next };
  } else {
    state.quadDimensions[axis] = Math.max(55, Math.min(220, state.quadDimensions[axis] + delta));
  }
  renderPiece();
}

function updateShapeControls(level) {
  const isQuad = level.phase === "quadrilateral";
  document.querySelectorAll(".shape-control").forEach(button => {
    button.hidden = !isQuad;
    button.toggleAttribute("hidden", !isQuad);
  });
  document.querySelectorAll(".angle-size-button").forEach(button => button.hidden = isQuad);
  if (!isQuad) return;
  const square = state.category === "ריבוע";
  const parallelogram = state.category === "מקבילית";
  const vertexTrapezoid = state.category === "טרפז";
  $("shape-width-smaller").textContent = square ? "קטן יותר" : "צר יותר";
  $("shape-width-larger").textContent = square ? "גדול יותר" : "רחב יותר";
  $("shape-height-smaller").disabled = !state.equipped || square || state.solved;
  $("shape-height-larger").disabled = !state.equipped || square || state.solved;
  $("shape-height-smaller").textContent = "נמוך יותר";
  $("shape-height-larger").textContent = "גבוה יותר";
  $("shape-width-smaller").disabled = !state.equipped || state.solved;
  $("shape-width-larger").disabled = !state.equipped || state.solved;
  $("shape-width-smaller").hidden = parallelogram || vertexTrapezoid;
  $("shape-width-larger").hidden = parallelogram || vertexTrapezoid;
  $("shape-height-smaller").hidden = parallelogram || vertexTrapezoid;
  $("shape-height-larger").hidden = parallelogram || vertexTrapezoid;
  if (state.equipped && square) $("angle-readout").textContent = "ריבוע • גודל אחיד • אפשר לסובב";
  $("mirror-button").disabled = !state.equipped || state.solved || !quadrilateralCanFlip(state.category);
}

function addPieceDragArea(content) {
  const geometry = [...content.querySelectorAll(".piece-rays, .piece-opposite, .piece-arc, .piece-core")];
  if (!geometry.length) return;
  try {
    const boxes = geometry.map(element => element.getBBox());
    const minX = Math.min(...boxes.map(box => box.x));
    const minY = Math.min(...boxes.map(box => box.y));
    const maxX = Math.max(...boxes.map(box => box.x + box.width));
    const maxY = Math.max(...boxes.map(box => box.y + box.height));
    const padding = isTouchInterface() ? 24 : 14;
    const hitArea = svgEl("rect", {
      x: minX - padding,
      y: minY - padding,
      width: maxX - minX + padding * 2,
      height: maxY - minY + padding * 2,
      rx: 10,
      class: "piece-drag-area",
      "aria-label": "אזור גרירת הכלי"
    });
    content.insertBefore(hitArea, content.firstChild);
  } catch {
    // הקווים עצמם נשארים זמינים לגרירה גם אם הדפדפן אינו תומך בחישוב SVG.
  }
}

function mirrorScaleTransform(centerX, scaleX) {
  return `translate(${centerX * (1 - scaleX)} 0) scale(${scaleX} 1)`;
}

function quadrilateralCanFlip(shape) {
  return shape === "מקבילית" || shape === "טרפז" || shape === "דלתון";
}

function quadrilateralFlipTransform(shape, scale) {
  return quadrilateralCanFlip(shape) ? `scale(${scale} 1)` : "scale(1 1)";
}

function animateMirrorFlip(fromMirrored, toMirrored, fixedAnchor) {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const group = pieceLayer.querySelector(".piece");
  const content = pieceLayer.querySelector(levels[state.levelIndex].phase === "quadrilateral" ? ".quad-flip-content" : ".piece-content");
  if (!group || !content) return;
  const level = levels[state.levelIndex];
  const isQuadrilateral = level.phase === "quadrilateral";
  const isAlternate = state.category === "מתחלפות";
  const centerX = isQuadrilateral ? 0 : shapeMirrorCenterX(augmentedShape(level));
  const startScale = fromMirrored ? -1 : 1;
  const endScale = toMirrored ? -1 : 1;
  const rotation = state.piece.rotation * Math.PI / 180;
  const renderFrame = scale => {
    if (isQuadrilateral) {
      group.setAttribute("transform", `translate(${state.piece.x} ${state.piece.y}) rotate(${state.piece.rotation})`);
      content.setAttribute("transform", quadrilateralFlipTransform(state.category, scale));
      return;
    }
    if (isAlternate) {
      group.setAttribute("transform", `translate(${state.piece.x} ${state.piece.y}) rotate(${state.piece.rotation})`);
      content.setAttribute("transform", zMirrorTransform(scale));
      return;
    }
    const localAnchorX = centerX * (1 - scale);
    const x = fixedAnchor.x - localAnchorX * Math.cos(rotation);
    const y = fixedAnchor.y - localAnchorX * Math.sin(rotation);
    group.setAttribute("transform", `translate(${x} ${y}) rotate(${state.piece.rotation})`);
    content.setAttribute("transform", mirrorScaleTransform(centerX, scale));
  };
  renderFrame(startScale);
  const startedAt = performance.now();
  const duration = 320;
  const frame = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = progress < .5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    const scale = startScale + (endScale - startScale) * eased;
    renderFrame(scale);
    if (progress < 1 && content.isConnected) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

function augmentedShape(level) {
  if (primitiveTools.includes(state.category)) return "primitive";
  if (state.category === "מתחלפות") return "z";
  if (state.category === "מתאימות") return "f";
  if (state.category === "צמודות") return "adjacent2";
  if (state.category === "משולש") return "triangle";
  return "x";
}

function shapeMirrorCenterX(shape) {
  if (shape === "z") return 0;
  if (shape === "f") {
    const spine = unit(state.degrees);
    const topJointX = -spine.x * state.dimensions.gap;
    const spineEndX = spine.x * (state.dimensions.spine - state.dimensions.gap);
    const middleEndX = state.dimensions.arm;
    const topEndX = topJointX + state.dimensions.arm;
    const values = [0, topJointX, spineEndX, middleEndX, topEndX];
    return (Math.min(...values) + Math.max(...values)) / 2;
  }
  // The triangle flips around its main vertex. A bounding-box center changes
  // while a corner is dragged and creates a feedback loop in mirrored mode.
  if (shape === "triangle") return 0;
  return 0;
}

function zMirrorGeometry() {
  const railAngle = state.degrees / 2;
  const joint = polar(state.dimensions.cross, -state.degrees / 2);
  return { railAngle, center: { x: joint.x / 2, y: joint.y / 2 } };
}

function zMirrorTransform(scale) {
  const { railAngle, center } = zMirrorGeometry();
  return `translate(${center.x} ${center.y}) rotate(${railAngle}) scale(${scale} 1) rotate(${-railAngle}) translate(${-center.x} ${-center.y})`;
}

function zMirrorPoint(point) {
  return reflectZPoint(point, state.degrees, state.dimensions.cross);
}

function reflectZPoint(point, degrees, cross) {
  const railAngle = degrees / 2;
  const joint = polar(cross, -degrees / 2);
  const center = { x: joint.x / 2, y: joint.y / 2 };
  const radians = -railAngle * Math.PI / 180;
  const dx = point.x - center.x;
  const dy = point.y - center.y;
  const alignedX = dx * Math.cos(radians) - dy * Math.sin(radians);
  const alignedY = dx * Math.sin(radians) + dy * Math.cos(radians);
  const reflectedX = -alignedX;
  const reverse = -radians;
  return {
    x: center.x + reflectedX * Math.cos(reverse) - alignedY * Math.sin(reverse),
    y: center.y + reflectedX * Math.sin(reverse) + alignedY * Math.cos(reverse)
  };
}

function alternateHandleWorldForDegrees(degrees, drag) {
  const radians = degrees * Math.PI / 180;
  const cross = Math.min(620, drag.alternateGap / Math.max(.01, Math.sin(radians)));
  let local = polar(52, -degrees / 2 + 180);
  if (drag.alternateMirrored) local = reflectZPoint(local, degrees, cross);
  const rotation = (drag.alternateParallelWorld - degrees / 2) * Math.PI / 180;
  return {
    x: drag.alternateOrigin.x + local.x * Math.cos(rotation) - local.y * Math.sin(rotation),
    y: drag.alternateOrigin.y + local.x * Math.sin(rotation) + local.y * Math.cos(rotation)
  };
}

function closestAlternateDegrees(pointer, bounds, drag) {
  let bestDegrees = Math.max(bounds.min, Math.min(bounds.max, drag.alternateDegrees));
  let bestDistance = Infinity;
  for (let degrees = bounds.min; degrees <= bounds.max; degrees += .5) {
    const handle = alternateHandleWorldForDegrees(degrees, drag);
    const distance = (handle.x - pointer.x) ** 2 + (handle.y - pointer.y) ** 2;
    if (distance < bestDistance) {
      bestDistance = distance;
      bestDegrees = degrees;
    }
  }
  return bestDegrees;
}

function triangleGeometry() {
  const vertices = state.triangleVertices || {
    a: polar(state.dimensions.arm, -state.degrees / 2),
    b: polar(state.dimensions.arm, state.degrees / 2)
  };
  const angleA = Math.atan2(vertices.a.y, vertices.a.x) * 180 / Math.PI;
  const angleB = Math.atan2(vertices.b.y, vertices.b.x) * 180 / Math.PI;
  const sweep = normalizeSignedAngle(angleB - angleA);
  return { ...vertices, degrees: Math.abs(sweep), rotation: normalizeAngle(angleA + sweep / 2) };
}

function trianglePlacementCandidates() {
  const triangle = triangleGeometry();
  const flip = state.piece.mirrored ? -1 : 1;
  const vertices = [
    { x: 0, y: 0 },
    { x: triangle.a.x * flip, y: triangle.a.y },
    { x: triangle.b.x * flip, y: triangle.b.y }
  ];
  const pieceRotation = state.piece.rotation * Math.PI / 180;
  return vertices.map((vertex, index) => {
    const others = vertices.filter((_, otherIndex) => otherIndex !== index);
    const vectors = others.map(point => {
      const x = point.x - vertex.x;
      const y = point.y - vertex.y;
      const length = Math.max(.01, Math.hypot(x, y));
      return { x: x / length, y: y / length };
    });
    const cosine = Math.max(-1, Math.min(1, vectors[0].x * vectors[1].x + vectors[0].y * vectors[1].y));
    const degrees = Math.acos(cosine) * 180 / Math.PI;
    const localRotation = Math.atan2(vectors[0].y + vectors[1].y, vectors[0].x + vectors[1].x) * 180 / Math.PI;
    return {
      anchor: {
        x: state.piece.x + vertex.x * Math.cos(pieceRotation) - vertex.y * Math.sin(pieceRotation),
        y: state.piece.y + vertex.x * Math.sin(pieceRotation) + vertex.y * Math.cos(pieceRotation)
      },
      degrees,
      rotation: normalizeAngle(state.piece.rotation + localRotation)
    };
  });
}

function bestAnglePlacement(level, target) {
  const candidates = state.category === "משולש"
    ? trianglePlacementCandidates()
    : equivalentAngleAnchors().map(anchor => ({
        anchor,
        degrees: state.degrees,
        rotation: effectiveToolRotation(state.category, state.degrees)
      }));
  const targetDegrees = level.choices.find(choice => choice.id === level.correctChoice).degrees;
  return candidates.reduce((best, candidate) => {
    const score = Math.hypot(candidate.anchor.x - target.x, candidate.anchor.y - target.y)
      + Math.abs(candidate.degrees - targetDegrees) * 3
      + toolRotationDistance(state.category, candidate.rotation, target.rotation) * 2;
    return !best || score < best.score ? { ...candidate, score } : best;
  }, null);
}

function toolMarkerRotation(category, degrees) {
  if (primitiveTools.includes(category)) return -degrees / 2;
  if (category === "משולש") return triangleGeometry().rotation;
  if (category === "צמודות" && state.adjacentRays) {
    return normalizeAngle(state.adjacentRays.a + normalizeSignedAngle(state.adjacentRays.b - state.adjacentRays.a) / 2);
  }
  return category === "מתאימות" ? degrees / 2 : 0;
}

function effectiveToolRotation(category, degrees, piece = state.piece) {
  const markerRotation = toolMarkerRotation(category, degrees);
  const mirroredMarkerRotation = !piece.mirrored ? markerRotation
    : category === "מתחלפות" ? normalizeAngle(degrees + 180 - markerRotation)
      : 180 - markerRotation;
  return normalizeAngle(piece.rotation + mirroredMarkerRotation);
}

function placementRotationForTarget(category, degrees, targetRotation, mirrored) {
  const markerRotation = toolMarkerRotation(category, degrees);
  const mirroredMarkerRotation = !mirrored ? markerRotation
    : category === "מתחלפות" ? normalizeAngle(degrees + 180 - markerRotation)
      : 180 - markerRotation;
  return normalizeAngle(targetRotation - mirroredMarkerRotation);
}

function toolRotationDistance(category, actual, target) {
  const direct = angleDistance(actual, target);
  // An X and a Z describe the same marked relationship after a half-turn.
  if (category === "קודקודיות" || category === "מתחלפות") {
    return Math.min(direct, angleDistance(normalizeAngle(actual + 180), target));
  }
  return direct;
}

function renderAngleMarker(group, marker) {
  const markerGroup = svgEl("g", { transform: `translate(${marker.x} ${marker.y}) rotate(${marker.rotation})` });
  const scale = Math.max(.76, Math.min(1.5, state.dimensions.arm / 112));
  markerGroup.append(svgEl("path", { d: sectorPath(state.degrees, 54 * scale), class: "piece-arc" }));
  markerGroup.append(svgEl("path", { d: arcPath(state.degrees, 40 * scale), class: "piece-arc" }));
  group.append(markerGroup);
}

function renderAdjacentTwoShape(group, a, b, opposite) {
  group.append(svgEl("line", { x1: 0, y1: 0, x2: opposite.x, y2: opposite.y, class: "piece-rays" }));
  group.append(svgEl("line", { x1: 0, y1: 0, x2: b.x, y2: b.y, class: "piece-rays" }));
  group.append(svgEl("line", { x1: 0, y1: 0, x2: a.x, y2: a.y, class: "piece-opposite" }));
}

function renderPrimitiveShape(group, a, b) {
  group.append(svgEl("line", { x1: 0, y1: 0, x2: a.x, y2: a.y, class: "piece-rays" }));
  group.append(svgEl("line", { x1: 0, y1: 0, x2: b.x, y2: b.y, class: "piece-rays" }));
}

function renderTriangleShape(group) {
  const { a, b } = triangleGeometry();
  group.append(svgEl("line", { x1: 0, y1: 0, x2: a.x, y2: a.y, class: "piece-rays" }));
  group.append(svgEl("line", { x1: 0, y1: 0, x2: b.x, y2: b.y, class: "piece-rays" }));
  group.append(svgEl("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: "piece-rays" }));
}

function unit(degrees) {
  return polar(1, degrees);
}

function addPointHandle(group, point, kind, labelText, visibleLabel) {
  const hit = svgEl("circle", { cx: point.x, cy: point.y, r: 25, class: "point-handle-hit" });
  const visible = svgEl("rect", {
    x: point.x - 9,
    y: point.y - 9,
    width: 18,
    height: 18,
    rx: 4,
    class: "point-handle",
    "aria-label": labelText
  });
  const directionIcon = kind === "gap" || kind === "height"
    ? svgEl("text", { x: point.x, y: point.y + 1, class: "point-handle-icon", "text-anchor": "middle", "dominant-baseline": "middle", "aria-hidden": "true" }, "↕")
    : null;
  [hit, visible, directionIcon].filter(Boolean).forEach(handle => handle.addEventListener("pointerdown", event => startPointResize(event, kind)));
  const labelOffset = kind === "gap" || kind === "height" ? -22 : 24;
  const textLabel = svgEl("text", { x: point.x, y: point.y + labelOffset, class: "handle-label" }, handleLabel(visibleLabel));
  group.append(hit, visible, ...(directionIcon ? [directionIcon] : []), textLabel);
}

function renderZShape(group) {
  const parallelDirection = unit(state.degrees / 2);
  const diagonalDirection = unit(-state.degrees / 2);
  const joint = {
    x: diagonalDirection.x * state.dimensions.cross,
    y: diagonalDirection.y * state.dimensions.cross
  };
  const lowerEnd = {
    x: parallelDirection.x * state.dimensions.arm,
    y: parallelDirection.y * state.dimensions.arm
  };
  const upperEnd = {
    x: joint.x - parallelDirection.x * state.dimensions.arm,
    y: joint.y - parallelDirection.y * state.dimensions.arm
  };
  group.append(svgEl("line", { x1: upperEnd.x, y1: upperEnd.y, x2: joint.x, y2: joint.y, class: "piece-rays" }));
  group.append(svgEl("line", { x1: joint.x, y1: joint.y, x2: 0, y2: 0, class: "piece-opposite" }));
  group.append(svgEl("line", { x1: 0, y1: 0, x2: lowerEnd.x, y2: lowerEnd.y, class: "piece-rays" }));
  if (!isTouchInterface()) {
    addPointHandle(group, { x: joint.x * .72, y: joint.y * .72 }, "height", "שינוי המרחק בין הישרים המקבילים", "גובה");
  }
  return { x: joint.x, y: joint.y, rotation: 180 };
}

function renderFShape(group) {
  const spineDirection = unit(state.degrees);
  const armDirection = unit(0);
  const topJoint = {
    x: -spineDirection.x * state.dimensions.gap,
    y: -spineDirection.y * state.dimensions.gap
  };
  const spineStart = {
    x: -spineDirection.x * state.dimensions.gap,
    y: -spineDirection.y * state.dimensions.gap
  };
  const spineEnd = {
    x: spineDirection.x * (state.dimensions.spine - state.dimensions.gap),
    y: spineDirection.y * (state.dimensions.spine - state.dimensions.gap)
  };
  const middleEnd = {
    x: armDirection.x * state.dimensions.arm,
    y: armDirection.y * state.dimensions.arm
  };
  const topEnd = {
    x: topJoint.x + armDirection.x * state.dimensions.arm,
    y: topJoint.y + armDirection.y * state.dimensions.arm
  };
  group.append(svgEl("line", { x1: spineStart.x, y1: spineStart.y, x2: spineEnd.x, y2: spineEnd.y, class: "piece-opposite" }));
  group.append(svgEl("line", { x1: 0, y1: 0, x2: middleEnd.x, y2: middleEnd.y, class: "piece-rays" }));
  group.append(svgEl("line", { x1: topJoint.x, y1: topJoint.y, x2: topEnd.x, y2: topEnd.y, class: "piece-rays" }));
  if (!isTouchInterface()) {
    addPointHandle(group, { x: topJoint.x * .72, y: topJoint.y * .72 }, "gap", "שינוי המרחק בין הישרים המקבילים", "גובה");
  }
  return {
    primaryRotation: state.degrees / 2,
    equalMarker: { x: topJoint.x, y: topJoint.y, rotation: state.degrees / 2 }
  };
}

function svgPoint(event) {
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function startMove(event) {
  if (event.target.classList.contains("rotate-handle")) return;
  event.stopPropagation();
  event.preventDefault();
  clearAdjustmentFeedback();
  state.snappedToTarget = false;
  const p = svgPoint(event);
  state.dragging = "move";
  state.dragMoved = false;
  state.dragStartPointer = { x: event.clientX, y: event.clientY };
  state.dragOffset = { x: p.x - state.piece.x, y: p.y - state.piece.y };
  setGestureVisual("moving");
  svg.setPointerCapture(event.pointerId);
}

function startRotate(event) {
  event.stopPropagation();
  event.preventDefault();
  clearAdjustmentFeedback();
  state.rotationAnchor = pieceAnchorPosition();
  const point = svgPoint(event);
  state.rotationDragStart = {
    pointerAngle: Math.atan2(point.y - state.rotationAnchor.y, point.x - state.rotationAnchor.x) * 180 / Math.PI,
    pieceRotation: state.piece.rotation,
    pointerType: event.pointerType
  };
  state.dragging = "rotate";
  setGestureVisual("transforming");
  svg.setPointerCapture(event.pointerId);
}

function startResize(event, side) {
  event.stopPropagation();
  event.preventDefault();
  clearAdjustmentFeedback();
  state.snappedToTarget = false;
  state.rotationAnchor = pieceAnchorPosition();
  const rays = state.category === "צמודות" ? state.adjacentRays : null;
  const fixedAngle = rays ? (side === -1 ? rays.b : rays.a) : 0;
  const movingAngle = rays ? (side === -1 ? rays.a : rays.b) : 0;
  const adjacentSweep = rays ? normalizeSignedAngle(movingAngle - fixedAngle) : 0;
  const alternateParallelWorld = state.category === "מתחלפות"
    ? normalizeAngle(state.piece.rotation + state.degrees / 2)
    : null;
  const pointer = svgPoint(event);
  const pointerAngle = Math.atan2(pointer.y - state.rotationAnchor.y, pointer.x - state.rotationAnchor.x) * 180 / Math.PI;
  state.angleDragStart = {
    side,
    adjacentDirection: adjacentSweep < 0 ? -1 : 1,
    adjacentPointerAngle: rays ? pointerAngle : null,
    adjacentDegrees: rays ? state.degrees : null,
    adjacentMirrored: rays ? state.piece.mirrored : false,
    alternateParallelWorld,
    alternatePointerAngle: state.category === "מתחלפות"
      ? Math.atan2(pointer.y - state.rotationAnchor.y, pointer.x - state.rotationAnchor.x) * 180 / Math.PI
      : null,
    alternateDegrees: state.degrees,
    alternateMirrored: state.piece.mirrored,
    alternateOrigin: { x: state.piece.x, y: state.piece.y },
    alternateGap: state.category === "מתחלפות"
      ? Math.abs(state.dimensions.cross * Math.sin(state.degrees * Math.PI / 180))
      : null
  };
  state.dragging = `resize:${side}`;
  setGestureVisual("angle");
  svg.setPointerCapture(event.pointerId);
}

function startPointResize(event, kind) {
  event.stopPropagation();
  event.preventDefault();
  clearAdjustmentFeedback();
  state.snappedToTarget = false;
  const local = toPieceLocal(svgPoint(event));
  state.pointDragStart = {
    local,
    piece: { ...state.piece },
    dimensions: { ...state.dimensions },
    quadDimensions: { ...state.quadDimensions },
    quadVertices: state.quadVertices?.map(point => ({ ...point })) || null,
    triangleVertices: state.triangleVertices ? {
      a: { ...state.triangleVertices.a },
      b: { ...state.triangleVertices.b }
    } : null
  };
  state.dragging = `point:${kind}`;
  setGestureVisual("transforming");
  svg.setPointerCapture(event.pointerId);
}

const touchPoints = new Map();
let touchGesture = null;
let completedMultiTouch = false;
let longPressTimer = null;
let longPressTriggered = false;

function clearLongPress() {
  if (longPressTimer !== null) window.clearTimeout(longPressTimer);
  longPressTimer = null;
}

function beginLongPress(event) {
  clearLongPress();
  longPressTriggered = false;
  if (!isTouchInterface() || event.pointerType !== "touch") return;
  longPressTimer = window.setTimeout(() => {
    longPressTimer = null;
    if (state.dragging !== "move" || state.dragMoved || touchPoints.size > 1 || state.solved) return;
    if (levels[state.levelIndex].phase === "quadrilateral") return;
    longPressTriggered = true;
    navigator.vibrate?.(25);
    toggleMirror();
  }, 620);
}

function touchPair() {
  return [...touchPoints.values()].slice(0, 2);
}

function pairMetrics(points) {
  const [a, b] = points;
  return {
    midpoint: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
    distance: Math.max(1, Math.hypot(b.x - a.x, b.y - a.y)),
    direction: Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI
  };
}

function setGestureVisual(mode = null) {
  svg.classList.toggle("gesture-moving", mode === "moving");
  svg.classList.toggle("gesture-transforming", mode === "transforming");
  svg.classList.toggle("gesture-angle", mode === "angle");
}

function clampArenaAnchor(point) {
  return {
    x: Math.max(25, Math.min(695, point.x)),
    y: Math.max(25, Math.min(405, point.y))
  };
}

function constrainedToolScale(baseDimensions, requestedScale) {
  const constraints = {
    arm: [76, 200],
    cross: [76, 230],
    gap: [60, 175],
    spine: [90, 250]
  };
  let minimumScale = .62;
  let maximumScale = 1.8;
  Object.entries(constraints).forEach(([key, [minimum, maximum]]) => {
    const base = baseDimensions[key];
    if (!base) return;
    minimumScale = Math.max(minimumScale, minimum / base);
    maximumScale = Math.min(maximumScale, maximum / base);
  });
  return Math.max(minimumScale, Math.min(maximumScale, requestedScale));
}

function maximumQuadrilateralScaleInArena(vertices, piece, margin = 18) {
  const rotation = piece.rotation * Math.PI / 180;
  const flipped = piece.mirrored && quadrilateralCanFlip(state.category) ? -1 : 1;
  let maximum = Infinity;
  vertices.forEach(point => {
    const localX = point.x * flipped;
    const dx = localX * Math.cos(rotation) - point.y * Math.sin(rotation);
    const dy = localX * Math.sin(rotation) + point.y * Math.cos(rotation);
    if (dx > 0) maximum = Math.min(maximum, (720 - margin - piece.x) / dx);
    else if (dx < 0) maximum = Math.min(maximum, (piece.x - margin) / -dx);
    if (dy > 0) maximum = Math.min(maximum, (430 - margin - piece.y) / dy);
    else if (dy < 0) maximum = Math.min(maximum, (piece.y - margin) / -dy);
  });
  return Math.max(0, maximum);
}

function constrainedQuadrilateralScale(baseDimensions, requestedScale, baseVertices, piece) {
  const minimum = state.category === "ריבוע" ? 60 : 55;
  const minimumScale = Math.max(minimum / baseDimensions.width, minimum / baseDimensions.height);
  const maximumScale = maximumQuadrilateralScaleInArena(baseVertices, piece);
  return Math.max(minimumScale, Math.min(maximumScale, requestedScale));
}

function beginTouchGesture() {
  const points = touchPair();
  if (points.length < 2 || !state.equipped) return;
  const metrics = pairMetrics(points);
  if (metrics.distance < 40) return;
  clearLongPress();
  touchGesture = {
    ...metrics,
    piece: { ...state.piece },
    anchor: pieceAnchorPosition(),
    rotation: state.piece.rotation,
    degrees: state.degrees,
    dimensions: { ...state.dimensions },
    quadDimensions: { ...state.quadDimensions },
    quadVertices: state.quadVertices?.map(point => ({ ...point })) || null,
    triangleVertices: state.triangleVertices ? {
      a: { ...state.triangleVertices.a },
      b: { ...state.triangleVertices.b }
    } : null,
    adjacentRays: state.adjacentRays ? { ...state.adjacentRays } : null
  };
  state.dragging = "multitouch";
  state.dragMoved = true;
  completedMultiTouch = true;
  setGestureVisual("transforming");
}

svg.addEventListener("pointerdown", event => {
  if (!isTouchInterface() || event.pointerType !== "touch" || !state.equipped || state.solved) return;
  const startedOnPiece = event.target instanceof Element && Boolean(event.target.closest(".piece"));
  if (touchPoints.size === 0 && !startedOnPiece) return;
  touchPoints.set(event.pointerId, svgPoint(event));
  svg.setPointerCapture(event.pointerId);
  if (touchPoints.size === 2) {
    event.preventDefault();
    event.stopImmediatePropagation();
    beginTouchGesture();
  }
}, true);

svg.addEventListener("pointermove", event => {
  if (!state.dragging || state.solved) return;
  const p = svgPoint(event);
  if (event.pointerType === "touch" && touchPoints.has(event.pointerId)) touchPoints.set(event.pointerId, p);
  if (event.pointerType === "touch" && touchPoints.size >= 2 && state.dragging !== "multitouch") beginTouchGesture();
  if (state.dragging === "multitouch" && touchGesture && touchPoints.size >= 2) {
    event.preventDefault();
    const points = touchPair();
    const metrics = pairMetrics(points);
    const rawScale = metrics.distance / touchGesture.distance;
    const requestedScale = Math.abs(rawScale - 1) < .02 ? 1 : rawScale;
    const rawRotationDelta = normalizeSignedAngle(metrics.direction - touchGesture.direction);
    const rotationDelta = Math.abs(rawRotationDelta) < 1.2 ? 0 : rawRotationDelta;
    const desiredAnchor = clampArenaAnchor({
      x: touchGesture.anchor.x + metrics.midpoint.x - touchGesture.midpoint.x,
      y: touchGesture.anchor.y + metrics.midpoint.y - touchGesture.midpoint.y
    });
    state.piece = {
      ...touchGesture.piece,
      rotation: normalizeAngle(Math.round((touchGesture.rotation + rotationDelta) * 2) / 2)
    };
    const activeLevel = levels[state.levelIndex];
    if (activeLevel.phase === "quadrilateral") {
      const { width, height } = touchGesture.quadDimensions;
      const baseVertices = touchGesture.quadVertices || quadrilateralVertices(state.category, width, height);
      const effectiveScale = constrainedQuadrilateralScale(touchGesture.quadDimensions, requestedScale, baseVertices, state.piece);
      state.quadDimensions = { width: width * effectiveScale, height: height * effectiveScale };
      if (touchGesture.quadVertices) {
        state.quadVertices = touchGesture.quadVertices.map(point => ({
          x: point.x * effectiveScale,
          y: point.y * effectiveScale
        }));
      }
    } else {
      const effectiveScale = constrainedToolScale(touchGesture.dimensions, requestedScale);
      state.dimensions = Object.fromEntries(
        Object.entries(touchGesture.dimensions).map(([key, value]) => [key, value * effectiveScale])
      );
      // After uniform zoom reaches its limit, continued pinching adjusts the
      // height between parallel lines rather than appearing to do nothing.
      if (requestedScale > effectiveScale) {
        if (state.category === "מתחלפות") {
          state.dimensions.cross = Math.min(620, touchGesture.dimensions.cross * requestedScale);
        } else if (state.category === "מתאימות") {
          state.dimensions.gap = Math.min(240, touchGesture.dimensions.gap * requestedScale);
          state.dimensions.spine = Math.max(state.dimensions.spine, state.dimensions.gap + 70);
        }
      }
      state.degrees = touchGesture.degrees;
      state.adjacentRays = touchGesture.adjacentRays ? { ...touchGesture.adjacentRays } : null;
      if (touchGesture.triangleVertices) {
        state.triangleVertices = {
          a: { x: touchGesture.triangleVertices.a.x * effectiveScale, y: touchGesture.triangleVertices.a.y * effectiveScale },
          b: { x: touchGesture.triangleVertices.b.x * effectiveScale, y: touchGesture.triangleVertices.b.y * effectiveScale }
        };
      }
    }
    keepPieceAnchorAt(desiredAnchor);
  } else if (state.dragging === "move") {
    if (state.dragStartPointer && Math.hypot(event.clientX - state.dragStartPointer.x, event.clientY - state.dragStartPointer.y) > 8) {
      state.dragMoved = true;
      clearLongPress();
    }
    state.piece.x = Math.max(25, Math.min(695, p.x - state.dragOffset.x));
    state.piece.y = Math.max(25, Math.min(405, p.y - state.dragOffset.y));
  } else if (state.dragging === "rotate") {
    const anchor = state.rotationAnchor || pieceAnchorPosition();
    const currentAngle = Math.atan2(p.y - anchor.y, p.x - anchor.x) * 180 / Math.PI;
    const start = state.rotationDragStart;
    const sensitivity = start?.pointerType === "touch" ? .72 : 1;
    const nextRotation = start
      ? start.pieceRotation + normalizeSignedAngle(currentAngle - start.pointerAngle) * sensitivity
      : currentAngle + 90;
    setPieceRotation(Math.round(nextRotation * 2) / 2, anchor);
  } else if (state.dragging.startsWith("resize:")) {
    const level = levels[state.levelIndex];
    const choice = level.choices.find(c => c.id === state.choice);
    const bounds = angleBounds(activeChoiceType(level, choice));
    const local = toPieceLocal(p);
    const relativeAngle = Math.atan2(local.y, local.x) * 180 / Math.PI;
    if (state.category === "צמודות") {
      const side = Number(state.dragging.slice(7));
      const rays = state.adjacentRays ||= { a: -state.degrees, b: 0, opposite: 180 };
      const fixedAngle = side === -1 ? rays.b : rays.a;
      const direction = state.angleDragStart?.adjacentDirection || -1;
      const pointerAngle = Math.atan2(p.y - state.rotationAnchor.y, p.x - state.rotationAnchor.x) * 180 / Math.PI;
      const pointerDelta = normalizeSignedAngle(pointerAngle - state.angleDragStart.adjacentPointerAngle);
      const dragSign = side === -1
        ? (state.angleDragStart.adjacentMirrored ? 1 : -1)
        : (state.angleDragStart.adjacentMirrored ? -1 : 1);
      const rawDegrees = state.angleDragStart.adjacentDegrees + pointerDelta * dragSign;
      const crossedWrapAtMaximum = state.degrees >= bounds.max - .5 && rawDegrees < bounds.min + 10;
      const crossedWrapAtMinimum = state.degrees <= bounds.min + .5 && rawDegrees > bounds.max - 10;
      const requestedDegrees = crossedWrapAtMaximum
        ? bounds.max
        : crossedWrapAtMinimum
          ? bounds.min
        : Math.max(bounds.min, Math.min(bounds.max, rawDegrees));
      if (side === -1) rays.a = normalizeAngle(fixedAngle + direction * requestedDegrees);
      else {
        rays.b = normalizeAngle(fixedAngle + direction * requestedDegrees);
        rays.opposite = normalizeAngle(rays.b + 180);
      }
      state.degrees = requestedDegrees;
    } else {
      const previousDegrees = state.degrees;
      const hasFixedHorizontalBase = state.category === "מתאימות" || primitiveTools.includes(state.category);
      const triangle = state.category === "משולש" ? triangleGeometry() : null;
      const requestedDegrees = state.category === "קודקודיות"
        ? Math.abs(normalizeSignedAngle(relativeAngle - 180)) * 2
        : state.category === "מתחלפות"
          ? closestAlternateDegrees(p, bounds, state.angleDragStart)
        : hasFixedHorizontalBase
        ? Math.abs(normalizeSignedAngle(relativeAngle))
        : triangle
          ? Math.abs(normalizeSignedAngle(relativeAngle - triangle.rotation)) * 2
          : Math.abs(relativeAngle) * 2;
      const nextDegrees = Math.max(bounds.min, Math.min(bounds.max, requestedDegrees));
      if (triangle && state.triangleVertices) {
        const lengthA = Math.hypot(triangle.a.x, triangle.a.y);
        const lengthB = Math.hypot(triangle.b.x, triangle.b.y);
        state.triangleVertices = {
          a: polar(lengthA, triangle.rotation - nextDegrees / 2),
          b: polar(lengthB, triangle.rotation + nextDegrees / 2)
        };
      }
      state.degrees = nextDegrees;
      if (state.category === "מתחלפות") {
        state.piece.rotation = normalizeAngle(state.angleDragStart.alternateParallelWorld - nextDegrees / 2);
        state.dimensions.cross = Math.min(620, state.angleDragStart.alternateGap / Math.max(.01, Math.sin(nextDegrees * Math.PI / 180)));
      }
    }
    if (state.rotationAnchor) keepPieceAnchorAt(state.rotationAnchor);
    updateAngleReadout();
  } else if (state.dragging.startsWith("point:")) {
    resizeShapePoint(state.dragging.slice(6), p);
  }
  renderPiece();
});

svg.addEventListener("pointerup", event => {
  const completedGesture = state.dragging;
  clearLongPress();
  touchPoints.delete(event.pointerId);
  const isTap = !state.dragMoved && !completedMultiTouch && !longPressTriggered;
  if (completedGesture === "move" && isTap) registerMirrorTap();
  else if (!completedGesture && state.equipped && isTap) registerMirrorTap();
  if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
  if (completedGesture === "multitouch" && touchPoints.size >= 2) {
    beginTouchGesture();
    return;
  }
  if (completedGesture === "multitouch" && touchPoints.size === 1) {
    touchGesture = null;
    const remainingPoint = [...touchPoints.values()][0];
    state.dragging = "move";
    state.dragMoved = true;
    state.dragStartPointer = null;
    state.dragOffset = { x: remainingPoint.x - state.piece.x, y: remainingPoint.y - state.piece.y };
    state.rotationAnchor = null;
    state.rotationDragStart = null;
    state.pointDragStart = null;
    setGestureVisual("moving");
    return;
  }
  state.dragging = null;
  state.dragStartPointer = null;
  state.rotationAnchor = null;
  state.angleDragStart = null;
  state.rotationDragStart = null;
  state.pointDragStart = null;
  if (completedGesture === "move" || completedGesture === "multitouch" || completedGesture?.startsWith("resize:") || completedGesture?.startsWith("point:")) magneticallySnapToTarget();
  if (completedGesture === "rotate") applyTouchDetents();
  if (completedGesture) renderPiece();
  if (touchPoints.size < 2) touchGesture = null;
  setGestureVisual();
  if (touchPoints.size === 0) {
    completedMultiTouch = false;
    longPressTriggered = false;
  }
});

function flashTargetSnap() {
  sceneLayer.classList.remove("target-layer-snap");
  targetLayer.classList.remove("target-layer-snap");
  window.requestAnimationFrame(() => {
    sceneLayer.classList.add("target-layer-snap");
    targetLayer.classList.add("target-layer-snap");
  });
  window.setTimeout(() => {
    sceneLayer.classList.remove("target-layer-snap");
    targetLayer.classList.remove("target-layer-snap");
  }, 460);
}

function magneticallySnapToTarget() {
  if (!state.equipped || state.solved || !isTouchInterface()) return;
  const level = levels[state.levelIndex];
  const target = currentTarget(level);
  const placement = level.phase === "quadrilateral" ? null : bestAnglePlacement(level, target);
  const anchor = level.phase === "quadrilateral" ? quadrilateralVisualCenter() : placement.anchor;
  const distance = Math.hypot(anchor.x - target.x, anchor.y - target.y);
  const positionTolerance = level.phase === "quadrilateral" ? Math.max(48, level.target.tolerance) : Math.max(54, level.target.tolerance);
  if (distance > positionTolerance) return;
  if (level.phase === "quadrilateral") {
    const forgivingShape = level.correctCategory === "ריבוע" || state.category === "מקבילית" || state.category === "דלתון";
    const shapeTolerance = forgivingShape ? 31 : 27;
    const rotationTolerance = forgivingShape ? 12 : 10;
    if (!level.offeredValidNames?.includes(state.category) || quadrilateralMatchError(level) > shapeTolerance) return;
    if (state.category === "טרפז" && trapezoidHasSecondParallelPair()) return;
    if (quadrilateralRotationError(state.category, state.piece.rotation, target.rotation) > rotationTolerance) return;
    state.piece.rotation = closestQuadrilateralRotation(state.category, state.piece.rotation, target.rotation);
    alignQuadrilateralCenterToTarget(level);
  } else {
    if (state.category !== level.correctCategory) return;
    if (typeof level.requiredMirrored === "boolean" && state.piece.mirrored !== level.requiredMirrored) return;
    const targetDegrees = level.choices.find(choice => choice.id === level.correctChoice).degrees;
    const rotationTolerance = level.target.rotationTolerance + 5;
    if (Math.abs(placement.degrees - targetDegrees) > 7) return;
    if (toolRotationDistance(state.category, placement.rotation, target.rotation) > rotationTolerance) return;
    if (parallelHeightError(level) > 24) return;
    if (state.category === "משולש") {
      state.piece.x += target.x - placement.anchor.x;
      state.piece.y += target.y - placement.anchor.y;
    } else {
      resizeAngle(targetDegrees - state.degrees);
      state.piece.rotation = placementRotationForTarget(state.category, targetDegrees, target.rotation, state.piece.mirrored);
      keepClosestAngleAnchorAt(target);
    }
  }
  state.snappedToTarget = true;
  renderPiece();
  flashTargetSnap();
  pulse(24);
}

function applyTouchDetents() {
  if (!state.equipped || state.solved || !isTouchInterface()) return;
  const level = levels[state.levelIndex];
  const target = currentTarget(level);
  const fixedAnchor = pieceAnchorPosition();
  let snapped = false;
  if (level.phase === "quadrilateral") {
    if (angleDistance(state.piece.rotation, target.rotation) <= 7) {
      state.piece.rotation = target.rotation;
      snapped = true;
    }
  } else {
    const targetDegrees = level.choices.find(choice => choice.id === level.correctChoice).degrees;
    if (Math.abs(state.degrees - targetDegrees) <= 6) {
      resizeAngle(targetDegrees - state.degrees);
      snapped = true;
    }
    if (toolRotationDistance(state.category, effectiveToolRotation(state.category, state.degrees), target.rotation) <= 7) {
      state.piece.rotation = placementRotationForTarget(state.category, state.degrees, target.rotation, state.piece.mirrored);
      snapped = true;
    }
  }
  if (!snapped) return;
  keepPieceAnchorAt(fixedAnchor);
  renderPiece();
  flashTargetSnap();
  pulse(18);
}

// Keep double-click/tap for flipping the tool instead of Safari's zoom gesture.
svg.addEventListener("dblclick", event => event.preventDefault());
["gesturestart", "gesturechange", "gestureend"].forEach(type => {
  svg.addEventListener(type, event => event.preventDefault(), { passive: false });
  document.addEventListener(type, event => event.preventDefault(), { passive: false });
});
document.addEventListener("touchmove", event => {
  if (event.touches.length > 1) event.preventDefault();
}, { passive: false });
document.addEventListener("selectstart", event => {
  const target = event.target;
  if (isTouchInterface() && !(target instanceof Element && target.closest("input"))) event.preventDefault();
});

svg.addEventListener("pointercancel", event => {
  clearLongPress();
  touchPoints.delete(event.pointerId);
  if (state.dragging === "multitouch" && touchPoints.size === 1) {
    const remainingPoint = [...touchPoints.values()][0];
    touchGesture = null;
    state.dragging = "move";
    state.dragMoved = true;
    state.dragOffset = { x: remainingPoint.x - state.piece.x, y: remainingPoint.y - state.piece.y };
    setGestureVisual("moving");
  } else if (touchPoints.size < 2) {
    touchGesture = null;
    state.dragging = null;
    state.angleDragStart = null;
    state.rotationDragStart = null;
    setGestureVisual();
  } else if (state.dragging === "multitouch") {
    beginTouchGesture();
  }
  if (touchPoints.size === 0) completedMultiTouch = false;
});

function registerMirrorTap() {
  const now = Date.now();
  if (now - state.lastPieceTap < 360) {
    state.lastPieceTap = 0;
    toggleMirror();
  } else {
    state.lastPieceTap = now;
  }
}

function normalizeAngle(value) { return ((value % 360) + 360) % 360; }
function normalizeSignedAngle(value) { return ((value + 180) % 360 + 360) % 360 - 180; }
function angleDistance(a, b) { const d = Math.abs(normalizeAngle(a) - normalizeAngle(b)); return Math.min(d, 360 - d); }

function constrainedQuadResizeValue(start, desired, axis) {
  const starting = axis === "uniform" ? start.quadDimensions.width : start.quadDimensions[axis];
  if (desired <= starting) return desired;
  const fits = value => {
    const width = axis === "height" ? start.quadDimensions.width : value;
    const height = axis === "width" ? start.quadDimensions.height : value;
    const localX = axis === "height" ? 0 : (value - starting) / 2;
    const localY = axis === "width" ? 0 : (value - starting) / 2;
    const rotation = start.piece.rotation * Math.PI / 180;
    const piece = {
      ...start.piece,
      x: start.piece.x + localX * Math.cos(rotation) - localY * Math.sin(rotation),
      y: start.piece.y + localX * Math.sin(rotation) + localY * Math.cos(rotation)
    };
    const vertices = quadrilateralVertices(state.category, width, height);
    return maximumQuadrilateralScaleInArena(vertices, piece) >= 1;
  };
  if (fits(desired)) return desired;
  let low = starting;
  let high = desired;
  for (let iteration = 0; iteration < 18; iteration += 1) {
    const middle = (low + high) / 2;
    if (fits(middle)) low = middle;
    else high = middle;
  }
  return low;
}

function resizeShapePoint(kind, svgPosition) {
  const local = toPieceLocal(svgPosition);
  const start = state.pointDragStart || { local, dimensions: { ...state.dimensions } };
  const startLocal = start.piece ? toLocalAroundPiece(svgPosition, start.piece) : local;
  const delta = { x: local.x - start.local.x, y: local.y - start.local.y };
  const shape = augmentedShape(levels[state.levelIndex]);
  const parallelDirection = shape === "f" ? unit(0) : unit(state.degrees / 2);
  const diagonalDirection = unit(-state.degrees / 2);
  const projection = (point, direction) => point.x * direction.x + point.y * direction.y;
  if (kind === "quadUniform") {
    const startSize = start.quadDimensions?.width || state.quadDimensions.width;
    const rawDelta = ((startLocal.x - start.local.x) + (startLocal.y - start.local.y)) / 2;
    const next = constrainedQuadResizeValue(start, Math.max(60, startSize + rawDelta), "uniform");
    movePieceFromPointResize(start, (next - startSize) / 2, (next - startSize) / 2);
    state.quadDimensions = { width: next, height: next };
  } else if (kind === "quadWidth") {
    const startWidth = start.quadDimensions?.width || state.quadDimensions.width;
    const next = constrainedQuadResizeValue(start, Math.max(55, startWidth + startLocal.x - start.local.x), "width");
    if (start.quadVertices) {
      const scaleX = next / Math.max(1, startWidth);
      state.quadVertices = start.quadVertices.map(point => ({ x: point.x * scaleX, y: point.y }));
    } else movePieceFromPointResize(start, (next - startWidth) / 2, 0);
    state.quadDimensions.width = next;
  } else if (kind === "quadHeight") {
    const startHeight = start.quadDimensions?.height || state.quadDimensions.height;
    const next = constrainedQuadResizeValue(start, Math.max(55, startHeight + startLocal.y - start.local.y), "height");
    if (start.quadVertices) {
      const scaleY = next / Math.max(1, startHeight);
      state.quadVertices = start.quadVertices.map(point => ({ x: point.x, y: point.y * scaleY }));
    } else movePieceFromPointResize(start, 0, (next - startHeight) / 2);
    state.quadDimensions.height = next;
  } else if (kind.startsWith("quadVertex") && start.quadVertices) {
    const index = Number(kind.slice("quadVertex".length));
    const actualShape = state.category;
    // `toPieceLocal` already converts a mirrored handle back into the model's
    // original coordinate space. Using the raw start-piece coordinates here
    // would write the displayed (mirrored) point into the source geometry.
    const candidate = { x: Math.max(-180, Math.min(180, local.x)), y: Math.max(-160, Math.min(160, local.y)) };
    if (actualShape === "מקבילית") {
      state.quadVertices[index] = candidate;
      const [a, b, c] = state.quadVertices;
      state.quadVertices[3] = { x: a.x + c.x - b.x, y: a.y + c.y - b.y };
    } else if (actualShape === "טרפז") {
      const oppositeBaseY = index < 2 ? Math.min(state.quadVertices[2].y, state.quadVertices[3].y) : Math.max(state.quadVertices[0].y, state.quadVertices[1].y);
      const safeCandidate = index < 2
        ? { ...candidate, y: Math.min(candidate.y, oppositeBaseY - 30) }
        : { ...candidate, y: Math.max(candidate.y, oppositeBaseY + 30) };
      // Either base may be shorter and may overhang the perpendiculars of the
      // other base. Only preserve left/right order within the same base.
      const basePartner = index % 2 === 0 ? index + 1 : index - 1;
      if (index === 0 || index === 3) safeCandidate.x = Math.min(safeCandidate.x, state.quadVertices[basePartner].x - 30);
      else safeCandidate.x = Math.max(safeCandidate.x, state.quadVertices[basePartner].x + 30);
      state.quadVertices[index] = safeCandidate;
      state.quadVertices[basePartner] = { ...state.quadVertices[basePartner], y: safeCandidate.y };
    } else if (actualShape === "דלתון") {
      const axisX = (state.quadVertices[0].x + state.quadVertices[2].x) / 2;
      if (index === 0) {
        state.quadVertices[0] = { x: axisX, y: Math.min(candidate.y, state.quadVertices[1].y - 30) };
        state.quadVertices[2].x = axisX;
      } else if (index === 2) {
        state.quadVertices[2] = { x: axisX, y: Math.max(candidate.y, state.quadVertices[1].y + 30) };
        state.quadVertices[0].x = axisX;
      } else {
        const currentSide = state.quadVertices[1].x >= axisX ? 1 : -1;
        const halfWidth = Math.max(30, Math.abs(candidate.x - axisX));
        const middleY = Math.max(state.quadVertices[0].y + 30, Math.min(state.quadVertices[2].y - 30, candidate.y));
        state.quadVertices[1] = { x: axisX + currentSide * halfWidth, y: middleY };
        state.quadVertices[3] = { x: axisX - currentSide * halfWidth, y: middleY };
      }
    } else {
      state.quadVertices[index] = candidate;
    }
    const xs = state.quadVertices.map(point => point.x);
    const ys = state.quadVertices.map(point => point.y);
    state.quadDimensions.width = Math.max(...xs) - Math.min(...xs);
    state.quadDimensions.height = Math.max(...ys) - Math.min(...ys);
  } else if (kind === "arm") {
    state.dimensions.arm = Math.max(65, Math.min(220, start.dimensions.arm + projection(delta, parallelDirection)));
  } else if (kind === "cross") {
    state.dimensions.cross = Math.max(70, Math.min(620, start.dimensions.cross + projection(delta, diagonalDirection)));
  } else if (kind === "height") {
    const verticalFactor = Math.max(.18, Math.abs(diagonalDirection.y));
    const maximumCrossLength = Math.min(620, 240 / verticalFactor);
    const signedVerticalFactor = Math.abs(diagonalDirection.y) < .18 ? -.18 : diagonalDirection.y;
    state.dimensions.cross = Math.max(70, Math.min(maximumCrossLength, start.dimensions.cross + delta.y / signedVerticalFactor));
  } else if (kind === "gap") {
    const spineDirection = shape === "f" ? unit(state.degrees) : diagonalDirection;
    state.dimensions.gap = Math.max(55, Math.min(240, start.dimensions.gap - projection(delta, spineDirection)));
    state.dimensions.spine = Math.max(160, state.dimensions.gap + 70);
  } else if (kind === "triangleVertexA" || kind === "triangleVertexB") {
    const key = kind === "triangleVertexA" ? "a" : "b";
    const candidate = {
      x: Math.max(-300, Math.min(300, local.x)),
      y: Math.max(-260, Math.min(260, local.y))
    };
    if (Math.hypot(candidate.x, candidate.y) < 45) return;
    const previous = state.triangleVertices[key];
    state.triangleVertices[key] = candidate;
    const geometry = triangleGeometry();
    const level = levels[state.levelIndex];
    const choice = level.choices.find(item => item.id === state.choice);
    const bounds = angleBounds(activeChoiceType(level, choice));
    if (geometry.degrees < bounds.min || geometry.degrees > bounds.max) {
      state.triangleVertices[key] = previous;
      return;
    }
    state.degrees = geometry.degrees;
    updateAngleReadout();
  }
}

function toLocalAroundPiece(svgPosition, piece) {
  const dx = svgPosition.x - piece.x;
  const dy = svgPosition.y - piece.y;
  const rotation = -piece.rotation * Math.PI / 180;
  return {
    x: dx * Math.cos(rotation) - dy * Math.sin(rotation),
    y: dx * Math.sin(rotation) + dy * Math.cos(rotation)
  };
}

function movePieceFromPointResize(start, localX, localY) {
  if (!start.piece) return;
  const rotation = start.piece.rotation * Math.PI / 180;
  state.piece.x = start.piece.x + localX * Math.cos(rotation) - localY * Math.sin(rotation);
  state.piece.y = start.piece.y + localX * Math.sin(rotation) + localY * Math.cos(rotation);
}

function toPieceLocal(svgPosition) {
  const dx = svgPosition.x - state.piece.x;
  const dy = svgPosition.y - state.piece.y;
  const rotation = -state.piece.rotation * Math.PI / 180;
  const rotated = {
    x: dx * Math.cos(rotation) - dy * Math.sin(rotation),
    y: dx * Math.sin(rotation) + dy * Math.cos(rotation)
  };
  if (levels[state.levelIndex].phase === "quadrilateral" && state.piece.mirrored && quadrilateralCanFlip(state.category)) {
    return { x: -rotated.x, y: rotated.y };
  }
  if (state.category === "מתחלפות" && state.piece.mirrored) return zMirrorPoint(rotated);
  const mirrorCenterX = shapeMirrorCenterX(augmentedShape(levels[state.levelIndex]));
  return { x: state.piece.mirrored ? 2 * mirrorCenterX - rotated.x : rotated.x, y: rotated.y };
}

function pieceAnchorPosition() {
  // Quadrilaterals flip around their own center, so their placement anchor is
  // unchanged by mirroring. The generic angle anchor calculation would shift
  // them because an unrelated X-shaped tool center was being reused here.
  if (levels[state.levelIndex].phase === "quadrilateral") return { x: state.piece.x, y: state.piece.y };
  if (!state.piece.mirrored) return { x: state.piece.x, y: state.piece.y };
  const mirrorCenterX = shapeMirrorCenterX(augmentedShape(levels[state.levelIndex]));
  const localAnchorX = 2 * mirrorCenterX;
  const rotation = state.piece.rotation * Math.PI / 180;
  return {
    x: state.piece.x + localAnchorX * Math.cos(rotation),
    y: state.piece.y + localAnchorX * Math.sin(rotation)
  };
}

function equivalentAngleAnchors() {
  if (state.category !== "מתחלפות" && state.category !== "מתאימות") return [pieceAnchorPosition()];
  const localSecond = state.category === "מתחלפות"
    ? polar(state.dimensions.cross, -state.degrees / 2)
    : polar(state.dimensions.gap, state.degrees + 180);
  const shape = augmentedShape(levels[state.levelIndex]);
  const displayed = !state.piece.mirrored ? localSecond
    : shape === "z" ? zMirrorPoint(localSecond)
      : { x: 2 * shapeMirrorCenterX(shape) - localSecond.x, y: localSecond.y };
  const rotation = state.piece.rotation * Math.PI / 180;
  return [pieceAnchorPosition(), {
    x: state.piece.x + displayed.x * Math.cos(rotation) - displayed.y * Math.sin(rotation),
    y: state.piece.y + displayed.x * Math.sin(rotation) + displayed.y * Math.cos(rotation)
  }];
}

function closestAngleAnchor(target) {
  return equivalentAngleAnchors().reduce((best, anchor) =>
    Math.hypot(anchor.x - target.x, anchor.y - target.y) < Math.hypot(best.x - target.x, best.y - target.y) ? anchor : best
  );
}

function keepClosestAngleAnchorAt(target) {
  const anchor = closestAngleAnchor(target);
  state.piece.x += target.x - anchor.x;
  state.piece.y += target.y - anchor.y;
}

function parallelHeightError(level) {
  if (state.category !== "מתחלפות" && state.category !== "מתאימות") return 0;
  const targetDegrees = level.choices.find(choice => choice.id === level.correctChoice).degrees;
  const expected = 160 / Math.max(.01, Math.abs(Math.sin(targetDegrees * Math.PI / 180)));
  const actual = state.category === "מתחלפות" ? state.dimensions.cross : state.dimensions.gap;
  return Math.abs(actual - expected);
}

function keepPieceAnchorAt(fixedAnchor) {
  const movedAnchor = pieceAnchorPosition();
  state.piece.x += fixedAnchor.x - movedAnchor.x;
  state.piece.y += fixedAnchor.y - movedAnchor.y;
}

function setPieceRotation(nextRotation, fixedAnchor = pieceAnchorPosition()) {
  state.piece.rotation = normalizeAngle(nextRotation);
  keepPieceAnchorAt(fixedAnchor);
}

function rotate(delta) {
  if (!state.equipped || state.solved) return;
  setPieceRotation(state.piece.rotation + delta);
  renderPiece();
}

function toggleMirror() {
  if (!state.equipped || state.solved) return;
  if (levels[state.levelIndex].phase === "quadrilateral" && !quadrilateralCanFlip(state.category)) return;
  const fixedAnchor = pieceAnchorPosition();
  const wasMirrored = state.piece.mirrored;
  state.piece.mirrored = !state.piece.mirrored;
  if (state.category !== "מתחלפות") keepPieceAnchorAt(fixedAnchor);
  $("mirror-button").setAttribute("aria-pressed", String(state.piece.mirrored));
  feedback(t(state.piece.mirrored ? "mirrorOn" : "mirrorOff"), true);
  renderPiece();
  animateMirrorFlip(wasMirrored, state.piece.mirrored, fixedAnchor);
}

function angleBounds(type) {
  if (state.category === "צמודות") return { min: 5, max: 175 };
  if (type === "flexible") return { min: 15, max: 165 };
  if (type === "acute") return { min: 5, max: 85 };
  if (type === "right") return { min: 90, max: 90 };
  if (type === "flat") return { min: 180, max: 180 };
  return { min: 95, max: 175 };
}

function activeChoiceType(level, choice) {
  if (families["שוות"].includes(state.category)) return "flexible";
  if (primitiveTools.includes(state.category)) {
    return state.category === "חדה" ? "acute" : state.category === "ישרה" ? "right" : state.category === "שטוחה" ? "flat" : "obtuse";
  }
  if (level.phase !== "beginner") return choice.type;
  return choice.type;
}

function resizeAngle(delta) {
  if (!state.equipped || state.solved) return;
  const fixedAnchor = pieceAnchorPosition();
  const level = levels[state.levelIndex];
  const choice = level.choices.find(c => c.id === state.choice);
  const bounds = angleBounds(activeChoiceType(level, choice));
  const previousDegrees = state.degrees;
  const alternateGap = state.category === "מתחלפות"
    ? Math.abs(state.dimensions.cross * Math.sin(previousDegrees * Math.PI / 180))
    : null;
  const nextDegrees = Math.max(bounds.min, Math.min(bounds.max, state.degrees + delta));
  if (state.category === "צמודות") {
    const rays = state.adjacentRays ||= { a: -state.degrees, b: 0, opposite: 180 };
    const sweep = normalizeSignedAngle(rays.b - rays.a);
    const direction = sweep < 0 ? -1 : 1;
    state.adjacentRays = { ...rays, a: normalizeAngle(rays.b - direction * nextDegrees), opposite: normalizeAngle(rays.b + 180) };
  }
  if (state.category === "משולש" && state.triangleVertices) {
    const geometry = triangleGeometry();
    const lengthA = Math.hypot(geometry.a.x, geometry.a.y);
    const lengthB = Math.hypot(geometry.b.x, geometry.b.y);
    state.triangleVertices = {
      a: polar(lengthA, geometry.rotation - nextDegrees / 2),
      b: polar(lengthB, geometry.rotation + nextDegrees / 2)
    };
  }
  state.degrees = nextDegrees;
  if (state.category === "מתחלפות") {
    state.piece.rotation = normalizeAngle(state.piece.rotation + (previousDegrees - nextDegrees) / 2);
    state.dimensions.cross = Math.min(620, alternateGap / Math.max(.01, Math.sin(nextDegrees * Math.PI / 180)));
  }
  keepPieceAnchorAt(fixedAnchor);
  updateAngleReadout();
  renderPiece();
}

function updateAngleReadout() {
  const level = levels[state.levelIndex];
  const choice = level.choices.find(c => c.id === state.choice);
  if (!choice) return;
  $("angle-readout").textContent = `${categoryLabel(state.category)} • ${Math.round(state.degrees)}° • ${categoryLabel(classifyAngle(state.degrees))}`;
  const bounds = angleBounds(activeChoiceType(level, choice));
  $("angle-smaller").disabled = state.solved || state.degrees <= bounds.min;
  $("angle-larger").disabled = state.solved || state.degrees >= bounds.max;
}

function classifyAngle(degrees) {
  if (Math.abs(degrees - 180) < 1) return "שטוחה";
  if (degrees < 90) return "חדה";
  if (Math.abs(degrees - 90) < 1) return "ישרה";
  return "קהה";
}

function discardPiece() {
  if (!state.equipped || state.solved) return;
  playDiscardSound();
  touchPoints.clear();
  touchGesture = null;
  setGestureVisual();
  state.equipped = false;
  state.choice = null;
  state.degrees = 0;
  pieceLayer.replaceChildren();
  ["rotate-left", "rotate-right", "check-button", "angle-smaller", "angle-larger", "mirror-button", "discard-button"].forEach(id => $(id).disabled = true);
  $("mirror-button").setAttribute("aria-pressed", "false");
  $("angle-readout").textContent = t("placeAgain", { tool: categoryLabel(state.category) });
  feedback(t("discarded"), false);
}

function check() {
  if (!state.equipped) return;
  playCheckShot();
  const level = levels[state.levelIndex];
  const target = currentTarget(level);
  if (level.phase === "quadrilateral") { checkQuadrilateral(level); return; }
  if (state.category !== level.correctCategory) {
    feedback(t("wrongTool"), false);
    playMissSound();
    pulse(100);
    return;
  }
  const targetDegrees = level.choices.find(c => c.id === level.correctChoice).degrees;
  const placement = bestAnglePlacement(level, target);
  const anchor = placement.anchor;
  const distance = Math.hypot(anchor.x - target.x, anchor.y - target.y);
  const turn = toolRotationDistance(state.category, placement.rotation, target.rotation);
  const sizeDifference = Math.abs(placement.degrees - targetDegrees);
  const angleTolerance = isTouchInterface() ? 7 : 5;
  const heightTolerance = isTouchInterface() ? 24 : 16;
  const positionTolerance = isTouchInterface() ? Math.max(48, level.target.tolerance) : level.target.tolerance;
  const rotationTolerance = level.target.rotationTolerance + (isTouchInterface() ? 5 : 0);
  const mirrorMismatch = typeof level.requiredMirrored === "boolean" && state.piece.mirrored !== level.requiredMirrored;
  if (distance <= positionTolerance && turn <= rotationTolerance && sizeDifference <= angleTolerance && parallelHeightError(level) <= heightTolerance && !mirrorMismatch) {
    if (state.category === "משולש") {
      state.piece.x += target.x - placement.anchor.x;
      state.piece.y += target.y - placement.anchor.y;
    } else {
      resizeAngle(targetDegrees - state.degrees);
      state.piece.rotation = placementRotationForTarget(state.category, targetDegrees, target.rotation, state.piece.mirrored);
      keepClosestAngleAnchorAt(target);
    }
    state.snappedToTarget = true;
    state.solved = true;
    const baseXP = level.xpBase || 100;
    const firstChoiceBonus = state.firstChoiceCorrect ? Math.round(baseXP * .5) : 0;
    const earnedXP = baseXP + firstChoiceBonus;
    state.score += earnedXP;
    updatePlayerRun(level.exerciseNumber, earnedXP, state.firstChoiceCorrect);
    $("score").textContent = state.score;
    renderPiece();
    feedback(firstChoiceBonus
      ? t("correctBonus", { xp: baseXP, bonus: firstChoiceBonus })
      : t("correct", { xp: baseXP }), true);
    pulse([50, 40, 90]);
    continueAfterCorrectSpeech(state.category, nextLevel);
  } else if (distance > positionTolerance) {
    feedback(t("moveCloser"), false);
    playMissSound();
    pulse(80);
  } else if (mirrorMismatch) {
    feedback(t("mirrorNeeded"), false);
    playMissSound();
    pulse(80);
  } else if (turn > rotationTolerance) {
    feedback(t("rotateMore"), false);
    playMissSound();
    pulse(80);
  } else if (parallelHeightError(level) > heightTolerance) {
    feedback("המיקום והזווית נכונים. כוונו גם את המרחק בין הישרים המקבילים.", false);
    playMissSound();
    pulse(80);
  } else {
    feedback(t("angleNeeded", { target: Math.round(targetDegrees), current: Math.round(placement.degrees) }), false);
    playMissSound();
    pulse(80);
  }
}

function transformedQuadrilateralVertices(vertices, piece) {
  const rotation = piece.rotation * Math.PI / 180;
  const flipped = piece.mirrored && quadrilateralCanFlip(state.category) ? -1 : 1;
  return vertices.map(point => {
    const localX = point.x * flipped;
    const localY = point.y;
    return {
      x: piece.x + localX * Math.cos(rotation) - localY * Math.sin(rotation),
      y: piece.y + localX * Math.sin(rotation) + localY * Math.cos(rotation)
    };
  });
}

function quadrilateralRotationPeriod(shape) {
  if (shape === "ריבוע") return 90;
  if (shape === "מלבן" || shape === "מעוין" || shape === "מקבילית") return 180;
  return 360;
}

function closestQuadrilateralRotation(shape, current, target) {
  const period = quadrilateralRotationPeriod(shape);
  const candidates = Array.from({ length: 360 / period }, (_, index) => normalizeAngle(target + index * period));
  return candidates.reduce((best, candidate) => angleDistance(current, candidate) < angleDistance(current, best) ? candidate : best);
}

function quadrilateralRotationError(shape, current, target) {
  return angleDistance(current, closestQuadrilateralRotation(shape, current, target));
}

function quadrilateralVisualCenter() {
  const vertices = state.quadVertices || quadrilateralVertices(state.category, state.quadDimensions.width, state.quadDimensions.height);
  const transformed = transformedQuadrilateralVertices(vertices, state.piece);
  const center = transformed.reduce((sum, point) => ({ x: sum.x + point.x, y: sum.y + point.y }), { x: 0, y: 0 });
  center.x /= transformed.length;
  center.y /= transformed.length;
  return center;
}

function alignQuadrilateralCenterToTarget(level) {
  const center = quadrilateralVisualCenter();
  state.piece.x += level.target.x - center.x;
  state.piece.y += level.target.y - center.y;
}

function quadrilateralMatchError(level) {
  const pieceVertices = transformedQuadrilateralVertices(
    state.quadVertices || quadrilateralVertices(state.category, state.quadDimensions.width, state.quadDimensions.height),
    state.piece
  );
  const targetVertices = transformedQuadrilateralVertices(
    quadrilateralVertices(level.correctCategory, level.targetDimensions.width, level.targetDimensions.height),
    level.target
  );
  const centerPoints = points => {
    const center = points.reduce((sum, point) => ({ x: sum.x + point.x, y: sum.y + point.y }), { x: 0, y: 0 });
    center.x /= points.length;
    center.y /= points.length;
    return points.map(point => ({ x: point.x - center.x, y: point.y - center.y }));
  };
  const centeredPieceVertices = centerPoints(pieceVertices);
  const centeredTargetVertices = centerPoints(targetVertices);
  const orders = [];
  for (let shift = 0; shift < 4; shift += 1) {
    orders.push(centeredTargetVertices.map((_, index) => centeredTargetVertices[(index + shift) % 4]));
    orders.push(centeredTargetVertices.map((_, index) => centeredTargetVertices[(shift - index + 4) % 4]));
  }
  return Math.min(...orders.map(order => Math.max(...centeredPieceVertices.map((point, index) =>
    Math.hypot(point.x - order[index].x, point.y - order[index].y)
  ))));
}

function checkQuadrilateral(level) {
  if (!level.offeredValidNames?.includes(state.category)) {
    feedback("הבחירה אינה מתארת את הצורה הזו. נסו שם אחר.", false);
    playMissSound();
    pulse(100);
    return;
  }
  if (state.category === "טרפז" && trapezoidHasSecondParallelPair()) {
    feedback("זהו מקבילית: גם שתי השוקיים מקבילות. בטרפז צריך להיות בדיוק זוג אחד של צלעות מקבילות.", false);
    playMissSound();
    pulse(100);
    return;
  }
  const visualCenter = quadrilateralVisualCenter();
  const distance = Math.hypot(visualCenter.x - level.target.x, visualCenter.y - level.target.y);
  const shapeError = quadrilateralMatchError(level);
  const rotationError = quadrilateralRotationError(state.category, state.piece.rotation, level.target.rotation);
  const positionTolerance = isTouchInterface() ? Math.max(54, level.target.tolerance) : level.target.tolerance;
  const forgivingShape = level.correctCategory === "ריבוע" || state.category === "מקבילית" || state.category === "דלתון";
  const shapeTolerance = isTouchInterface() ? (forgivingShape ? 31 : 27) : 20;
  const rotationTolerance = isTouchInterface() ? (forgivingShape ? 12 : 10) : 7;
  if (distance > positionTolerance) {
    feedback("קרבו את מרכז הצורה למסגרת הכחולה.", false);
    playMissSound();
  } else if (rotationError > rotationTolerance || shapeError > shapeTolerance) {
    feedback("כוונו את הסיבוב והקודקודים עד שהצורה תשב על המסגרת.", false);
    playMissSound();
  }
  else {
    state.piece.rotation = closestQuadrilateralRotation(state.category, state.piece.rotation, level.target.rotation);
    alignQuadrilateralCenterToTarget(level);
    state.solved = true; state.score += level.xpBase; $("score").textContent = state.score;
    renderPiece();
    flashTargetSnap();
    feedback(`מצוין! זיהיתם וכיוונתם ${categoryLabel(state.category)}. +${level.xpBase} XP`, true);
    updateShapeControls(level);
    continueAfterCorrectSpeech(state.category, () => level.askWhatElse ? beginWhatElse(level) : nextLevel());
  }
}

function beginWhatElse(level) {
  state.followUp = true;
  state.followUpFound = [state.category];
  $("mission-title").textContent = "מה עוד?";
  $("mission-hint").textContent = "הצורה התקבעה. בחרו את השם החוקי הנוסף שנשאר.";
  $("angle-readout").textContent = "מה עוד מתאר את הצורה?";
  const selected = document.querySelector(`[data-category="${state.category}"]`);
  if (selected) { selected.disabled = true; selected.setAttribute("aria-pressed", "true"); }
}

function handleWhatElseChoice(level, button) {
  if (button.disabled) return;
  const value = button.dataset.category;
  if (!level.offeredValidNames.includes(value)) {
    feedback("השם הזה אינו מתאר את הצורה. נסו שוב.", false);
    playMissSound();
    return;
  }
  playCheckShot();
  state.followUpFound.push(value);
  speakSelection(value);
  button.disabled = true;
  button.setAttribute("aria-pressed", "true");
  const remaining = level.offeredValidNames.filter(name => !state.followUpFound.includes(name));
  if (remaining.length) {
    feedback(`נכון! גם ${value}. יש עוד ${remaining.length === 1 ? "אחד" : remaining.length}.`, true);
    $("mission-title").textContent = "מה עוד?";
  } else {
    feedback("מצוין — מצאתם את כל השמות החוקיים לצורה.", true);
    state.followUp = false;
    setTimeout(nextLevel, 1000);
  }
}

function nextLevel() {
  if (state.levelIndex === levels.length - 1) {
    feedback(t("complete", { score: state.score, count: levels.length }), true);
    $("mission-title").textContent = "MISSION COMPLETE — ANGLE MASTER";
    $("mission-hint").textContent = t("completeHint");
    ["rotate-left", "rotate-right", "check-button", "angle-smaller", "angle-larger", "mirror-button", "discard-button"].forEach(id => $(id).disabled = true);
    showStageCelebration(true);
    return;
  }
  const currentLevel = levels[state.levelIndex];
  if (currentLevel.exerciseNumber === currentLevel.exerciseCount && currentLevel.mode !== "master") {
    showStageCelebration(false);
    return;
  }
  state.levelIndex += 1;
  loadLevel();
}

function showStageCelebration(finalStage) {
  $("stage-transition-next").dataset.finalStage = String(finalStage);
  $("stage-transition-title").textContent = finalStage ? "ANGLE MASTER" : t("levelComplete");
  $("stage-transition-body").textContent = finalStage
    ? t("complete", { score: state.score, count: levels.length })
    : t("levelCompleteBody");
  $("stage-transition-next").textContent = finalStage ? t("understood") : t("nextLevel");
  $("stage-transition").hidden = false;
  pulse([55, 35, 55, 35, 110]);
  $("stage-transition-next").focus();
}

function advanceToNextStage() {
  $("stage-transition").hidden = true;
  if ($("stage-transition-next").dataset.finalStage === "true") return;
  state.levelIndex += 1;
  beginPlayerRun(courseSectionForLevel(levels[state.levelIndex]));
  loadLevel();
}

function showCourseMenu() {
  const currentSection = courseSectionForLevel(levels[state.levelIndex]);
  document.querySelectorAll("[data-course-start]").forEach(button => button.setAttribute("aria-current", String(button.dataset.courseStart === currentSection)));
  $("course-menu").hidden = false;
  document.querySelector('[data-course-start="quadrilaterals"]').focus();
}

function startCourseAt(section) {
  if (!activePlayer()) {
    $("course-menu").hidden = true;
    showPlayerMenu();
    return;
  }
  const indexBySection = {
    primitives: levels.findIndex(level => level.phase === "beginner"),
    equal: levels.findIndex(level => level.family === "שוות"),
    "180": levels.findIndex(level => level.family === "180°"),
    quadrilaterals: levels.findIndex(level => level.phase === "quadrilateral"),
    master: levels.findIndex(level => level.mode === "master")
  };
  const selectedIndex = indexBySection[section];
  if (!Number.isInteger(selectedIndex) || selectedIndex < 0) return;
  $("course-menu").hidden = true;
  $("stage-transition").hidden = true;
  state.levelIndex = selectedIndex;
  state.score = 0;
  $("score").textContent = "0";
  beginPlayerRun(section);
  loadLevel();
  updateTouchInterface(true);
}

function feedback(message, success) {
  $("feedback").textContent = message;
  $("feedback").className = `feedback ${success ? "success" : "error"}`;
}

function clearAdjustmentFeedback() {
  if (!$("feedback").classList.contains("error")) return;
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
}

let effectsAudioContext = null;

function activeEffectsContext() {
  if ($("sound-toggle").getAttribute("aria-pressed") !== "true") return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  effectsAudioContext ||= new AudioContextClass();
  effectsAudioContext.resume?.();
  return effectsAudioContext;
}

function noiseBurst(context, start, duration, volume, frequency) {
  const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let index = 0; index < samples.length; index += 1) samples[index] = Math.random() * 2 - 1;
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(frequency, start);
  filter.Q.setValueAtTime(.7, start);
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
  source.connect(filter).connect(gain).connect(context.destination);
  source.start(start);
  source.stop(start + duration);
}

function toneHit(context, start, { from, to = from, duration, volume, type = "sine" }) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(from, start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, to), start + duration);
  gain.gain.setValueAtTime(Math.max(.0001, volume), start);
  gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration);
}

function playEquipSound() {
  const context = activeEffectsContext();
  if (!context) return;
  const now = context.currentTime;
  // A compact magazine-seat and slide-rack sequence: mechanical, not melodic.
  noiseBurst(context, now, .022, .13, 2700);
  toneHit(context, now, { from: 190, to: 115, duration: .045, volume: .12, type: "triangle" });
  noiseBurst(context, now + .075, .065, .1, 3600);
  toneHit(context, now + .078, { from: 1250, to: 520, duration: .065, volume: .055, type: "sine" });
  noiseBurst(context, now + .155, .025, .12, 2300);
  toneHit(context, now + .155, { from: 240, to: 145, duration: .055, volume: .1, type: "triangle" });
}

function playDiscardSound() {
  const context = activeEffectsContext();
  if (!context) return;
  const now = context.currentTime;
  // Magazine release, short fall, then two asymmetric metal impacts.
  noiseBurst(context, now, .018, .105, 3100);
  toneHit(context, now, { from: 760, to: 390, duration: .035, volume: .07, type: "triangle" });
  toneHit(context, now + .085, { from: 310, to: 185, duration: .055, volume: .07, type: "triangle" });
  noiseBurst(context, now + .16, .028, .14, 2200);
  toneHit(context, now + .16, { from: 1180, to: 430, duration: .07, volume: .085, type: "sine" });
  noiseBurst(context, now + .245, .02, .075, 1750);
  toneHit(context, now + .245, { from: 720, to: 310, duration: .055, volume: .045, type: "sine" });
}

function playCheckShot() {
  const context = activeEffectsContext();
  if (!context) return;
  const now = context.currentTime;
  // Sharp transient, low body, and a restrained tail give the check real impact.
  noiseBurst(context, now, .035, .3, 1450);
  noiseBurst(context, now + .012, .12, .13, 620);
  toneHit(context, now, { from: 155, to: 42, duration: .18, volume: .24, type: "triangle" });
  toneHit(context, now + .018, { from: 92, to: 38, duration: .24, volume: .12, type: "sine" });
  noiseBurst(context, now + .095, .18, .04, 1050);
}

function playMissSound() {
  pieceLayer.classList.remove("miss-wiggle");
  window.requestAnimationFrame(() => pieceLayer.classList.add("miss-wiggle"));
  const context = activeEffectsContext();
  if (!context) return;
  const now = context.currentTime + .09;
  const gain = context.createGain();
  gain.gain.setValueAtTime(.0001, now);
  gain.gain.exponentialRampToValueAtTime(.105, now + .006);
  gain.gain.exponentialRampToValueAtTime(.0001, now + .19);
  gain.connect(context.destination);
  const high = context.createOscillator();
  high.type = "triangle";
  high.frequency.setValueAtTime(1450, now);
  high.frequency.exponentialRampToValueAtTime(330, now + .18);
  high.connect(gain);
  const sparkle = context.createOscillator();
  const sparkleGain = context.createGain();
  sparkle.type = "sine";
  sparkle.frequency.setValueAtTime(2100, now);
  sparkle.frequency.exponentialRampToValueAtTime(720, now + .1);
  sparkleGain.gain.setValueAtTime(.045, now);
  sparkleGain.gain.exponentialRampToValueAtTime(.0001, now + .105);
  sparkle.connect(sparkleGain).connect(context.destination);
  high.start(now);
  sparkle.start(now);
  high.stop(now + .2);
  sparkle.stop(now + .11);
}

pieceLayer.addEventListener("animationend", () => pieceLayer.classList.remove("miss-wiggle"));

function pulse(pattern) {
  if ($("sound-toggle").getAttribute("aria-pressed") === "true" && navigator.vibrate) navigator.vibrate(pattern);
}

function loadLevel() {
  const level = levels[state.levelIndex];
  document.documentElement.classList.toggle("master-mode", level.mode === "master");
  if (level.phase === "quadrilateral") preloadQuadrilateralSpeech();
  prepareQuadrilateralLevel(level);
  prepareDynamicLevel(level);
  prepareProLevel(level);
  touchPoints.clear();
  touchGesture = null;
  setGestureVisual();
  Object.assign(state, { category: null, firstChoiceMade: false, firstChoiceCorrect: false, choice: null, degrees: 0, equipped: false, solved: false, followUp: false, followUpFound: [], quadVertices: null, triangleVertices: null, adjacentRays: null, dragging: null });
  $("level-number").textContent = level.exerciseNumber;
  $("level-count").textContent = level.exerciseCount;
  updateCourseMenuButton(level);
  syncShareUrl(courseSectionForLevel(level));
  updatePlayerButton();
  $("mission-title").textContent = `${localizedStageName(level.stageName)} • ${level.exerciseNumber}/${level.exerciseCount}`;
  $("mission-hint").textContent = level.phase === "beginner"
    ? t("beginnerHint")
    : level.mode === "master"
      ? t("masterHint")
      : level.phase === "quadrilateral"
        ? "בחרו את המרובע המתאים, גררו למסגרת וכוונו רק בעזרת הפעולות שמתאימות לצורה."
        : t("advancedHint");
  $("arena-title").textContent = level.phase === "beginner" ? t("beginnerArena") : t("advancedArena");
  $("angle-readout").textContent = level.mode === "tutorial" ? t("tutorialMode") : level.mode === "master" ? t("masterMode") : t("practiceMode");
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  ["rotate-left", "rotate-right", "check-button", "angle-smaller", "angle-larger", "mirror-button", "discard-button"].forEach(id => $(id).disabled = true);
  updateShapeControls(level);
  $("mirror-button").setAttribute("aria-pressed", "false");
  renderChoices(level);
  renderScene(level);
  renderPiece();
}

function prepareQuadrilateralLevel(level) {
  if (level.phase !== "quadrilateral") return;
  level.scaffold = false;
  let shape = level.correctCategory;
  if (level.exerciseNumber > 3) {
    shape = quadrilateralTools[Math.floor(Math.random() * quadrilateralTools.length)];
    level.correctCategory = shape;
    level.target.x = 320 + Math.floor(Math.random() * 181);
    level.target.y = 145 + Math.floor(Math.random() * 121);
    level.target.rotation = -40 + Math.floor(Math.random() * 17) * 5;
    level.start.x = 105 + Math.floor(Math.random() * 81);
    level.start.y = 285 + Math.floor(Math.random() * 76);
  }
  if (shape === "ריבוע") {
    const side = 100 + Math.floor(Math.random() * 6) * 10;
    level.targetDimensions = { width: side, height: side };
  } else if (shape === "מלבן") {
    level.targetDimensions = {
      width: 140 + Math.floor(Math.random() * 5) * 10,
      height: 70 + Math.floor(Math.random() * 5) * 10
    };
  } else {
    level.targetDimensions = {
      width: 100 + Math.floor(Math.random() * 7) * 10,
      height: 90 + Math.floor(Math.random() * 7) * 10
    };
  }
  const validNames = validQuadrilateralNames(shape);
  const useTwoValidChoices = validNames.length > 1 && Math.random() < .5;
  const offeredValidNames = shuffle([...validNames]).slice(0, useTwoValidChoices ? validNames.length : 1);
  level.offeredValidNames = offeredValidNames;
  level.askWhatElse = useTwoValidChoices;
  level.disabledCategories = useTwoValidChoices
    ? validNames.filter(value => !offeredValidNames.includes(value))
    : quadrilateralTools.filter(value => !offeredValidNames.includes(value));
}

function prepareDynamicLevel(level) {
  if (level.scene !== "alternate" && level.scene !== "corresponding") return;
  const degrees = 40 + Math.floor(Math.random() * 21) * 5;
  const type = degrees < 90 ? "acute" : degrees === 90 ? "right" : "obtuse";
  level.choices = [{ id: "dynamic", label: `${degrees}°`, subtitle: classifyAngle(degrees), degrees, type }];
  level.correctChoice = "dynamic";
  level.target.x = 360;
  level.target.y = 280;
  level.target.rotation = level.scene === "alternate" ? normalizeAngle(-degrees / 2) : degrees / 2;
  level.hint = level.scene === "alternate"
    ? `בין שני ישרים מקבילים: מצאו את הזווית המתחלפת השווה ל־${degrees}°.`
    : `אותו מיקום בשני מפגשים: מצאו את הזווית המתאימה השווה ל־${degrees}°.`;
}

function prepareProLevel(level) {
  if (level.mode === "tutorial") {
    level.proRotation = 0;
    level.distractors = [];
    return;
  }
  const rotations = [-45, -30, -15, 0, 15, 30, 45, 90, 180, 270];
  level.proRotation = rotations[Math.floor(Math.random() * rotations.length)];
  if (level.mode !== "master") {
    level.distractors = [];
    return;
  }
  const target = level.target;
  const throughVertex = Array.from({ length: 1 }, () => {
    const angle = Math.random() * Math.PI;
    const halfLength = 120 + Math.random() * 100;
    return {
      x1: target.x - Math.cos(angle) * halfLength,
      y1: target.y - Math.sin(angle) * halfLength,
      x2: target.x + Math.cos(angle) * halfLength,
      y2: target.y + Math.sin(angle) * halfLength,
      className: "target-distractor"
    };
  });
  level.distractors = throughVertex;
}

svg.addEventListener("pointerdown", event => {
  if (state.dragging || state.solved || event.target.closest(".piece")) return;
  if (!state.category) {
    feedback(t("chooseFirst"), false);
    return;
  }
  const point = svgPoint(event);
  if (!state.equipped) placeSelected(point);
});
$("rotate-left").addEventListener("click", () => rotate(-5));
$("rotate-right").addEventListener("click", () => rotate(5));
$("angle-smaller").addEventListener("click", () => resizeAngle(-5));
$("angle-larger").addEventListener("click", () => resizeAngle(5));
$("shape-width-smaller").addEventListener("click", () => resizeQuadrilateral("width", -10));
$("shape-width-larger").addEventListener("click", () => resizeQuadrilateral("width", 10));
$("shape-height-smaller").addEventListener("click", () => resizeQuadrilateral("height", -10));
$("shape-height-larger").addEventListener("click", () => resizeQuadrilateral("height", 10));
$("mirror-button").addEventListener("click", toggleMirror);
$("discard-button").addEventListener("click", discardPiece);
$("check-button").addEventListener("click", check);
document.addEventListener("keydown", event => {
  if (event.key !== "Delete" || event.repeat) return;
  if (!$("touch-tutorial").hidden || !$("stage-transition").hidden || !$("course-menu").hidden) return;
  event.preventDefault();
  discardPiece();
});
$("sound-toggle").addEventListener("click", event => {
  const active = event.currentTarget.getAttribute("aria-pressed") === "true";
  event.currentTarget.setAttribute("aria-pressed", String(!active));
  event.currentTarget.textContent = active ? "🔇" : "🔊";
  event.currentTarget.setAttribute("aria-label", active ? t("soundOn") : t("soundOff"));
  if (active) {
    if (speechState.timer) clearTimeout(speechState.timer);
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    if (speechState.audio) {
      speechState.audio.pause();
      speechState.audio.currentTime = 0;
      speechState.audio = null;
    }
  } else {
    playRecordedSpeech("sound-on", "הקול פועל", "Sound is on.");
  }
});

if ("speechSynthesis" in window) {
  refreshVoices();
  window.speechSynthesis.addEventListener?.("voiceschanged", refreshVoices);
}

document.querySelectorAll("[data-language]").forEach(button => button.addEventListener("click", () => {
  state.language = button.dataset.language;
  try { localStorage.setItem("angleQuestLanguage", state.language); } catch { /* Language still changes for this session. */ }
  if (speechState.audio) {
    speechState.audio.pause();
    speechState.audio = null;
  }
  applyLanguage(true);
}));

$("mirror-help").addEventListener("click", showTouchTutorial);
$("touch-tutorial-close").addEventListener("click", closeTouchTutorial);
$("touch-tutorial-try").addEventListener("click", () => {
  document.querySelectorAll(".mirror-demo-shape, .tap-ring").forEach(element => {
    element.getAnimations?.().forEach(animation => {
      animation.cancel();
      animation.play();
    });
  });
});
$("stage-transition-next").addEventListener("click", advanceToNextStage);
$("course-menu-button").addEventListener("click", showCourseMenu);
document.querySelectorAll("[data-course-start]").forEach(button => button.addEventListener("click", () => startCourseAt(button.dataset.courseStart)));
$("player-menu-button").addEventListener("click", showPlayerMenu);
$("player-menu-close").addEventListener("click", closePlayerMenu);
$("player-form").addEventListener("submit", event => {
  event.preventDefault();
  createOrSelectPlayer($("player-name").value);
  $("player-name").value = "";
});
touchPointerQuery.addEventListener?.("change", () => updateTouchInterface(false));

$("level-count").textContent = "10";
updateTouchInterface(false);
applyLanguage(true);
const returningPlayerId = state.activePlayerId && playerStore.players[state.activePlayerId]
  ? state.activePlayerId
  : mostRecentPlayerId();
if (returningPlayerId) activatePlayer(returningPlayerId);
else showPlayerMenu();
updateTouchInterface(true);
