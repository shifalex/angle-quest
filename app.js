const NS = "http://www.w3.org/2000/svg";

const families = {
  "שוות": ["מתאימות", "מתחלפות", "קודקודיות"],
  "180°": ["צמודות", "משולש"]
};
const primitiveTools = ["חדה", "ישרה", "שטוחה", "קהה"];

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
    start: { x: 120, y: 350, rotation: 0 },
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

const supportedLanguages = ["he", "en", "ru"];
const supportedCourseSections = ["primitives", "equal", "180", "master"];
const initialLinkSettings = (() => {
  try {
    const params = new URLSearchParams(window.location.search);
    const language = params.get("lang");
    const course = params.get("course");
    return {
      language: supportedLanguages.includes(language) ? language : null,
      course: supportedCourseSections.includes(course) ? course : null
    };
  } catch {
    return { language: null, course: null };
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
  piece: { x: 0, y: 0, rotation: 0, mirrored: false },
  dimensions: { arm: 112, cross: 112, gap: 92, spine: 132 },
  dragging: null,
  dragMoved: false,
  dragStartPointer: null,
  lastPieceTap: 0,
  pointDragStart: null,
  triangleVertices: null,
  dragOffset: { x: 0, y: 0 }
};

const speechState = { voices: [], utterance: null, timer: null, audio: null };
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
  "sound-on": "sound-on.mp3"
};

const categoryLabels = {
  he: { "חדה": "חדה", "ישרה": "ישרה", "שטוחה": "שטוחה", "קהה": "קהה", "מתאימות": "מתאימות", "מתחלפות": "מתחלפות", "קודקודיות": "קודקודיות", "צמודות": "צמודות", "משולש": "משולש" },
  en: { "חדה": "Acute", "ישרה": "Right", "שטוחה": "Straight", "קהה": "Obtuse", "מתאימות": "Corresponding", "מתחלפות": "Alternate", "קודקודיות": "Vertical", "צמודות": "Adjacent", "משולש": "Triangle" },
  ru: { "חדה": "Острый", "ישרה": "Прямой", "שטוחה": "Развёрнутый", "קהה": "Тупой", "מתאימות": "Соответственные", "מתחלפות": "Накрест лежащие", "קודקודיות": "Вертикальные", "צמודות": "Смежные", "משולש": "Треугольник" }
};

const uiText = {
  he: {
    appTitle: "משימת הזוויות", level: "שלב", currentMission: "משימה נוכחית", chooseToolEyebrow: "בחרו כלי", chooseTool: "בחרו כלי", placeAngle: "הניחו את הזווית", selectAngle: "בחרו זווית", toolbox: "ארגז הזוויות", primitives: "פרימיטיבים", equalFamily: "שוות", diagramTitle: "תרגיל זוויות", diagramDesc: "שרטוט גאומטרי עם זווית נתונה ומקום לזווית חסרה.", arenaTip: "גררו כדי להזיז • דאבל־קליק/טאפ בכל השרטוט: פליפ • ● זווית • ■ גובה/אורך", anglePlus: "+ זווית", angleMinus: "− זווית", check: "בדיקה", counterClockwise: "↶ נגד השעון", clockwise: "סיבוב ↷", mirror: "⇋ מראה", discard: "⌫ זריקה", footer: "נבנה ללמידה בתנועה: בוחרים, אוספים, מניחים ומגלים.", soundOff: "כיבוי הקראה", soundOn: "הפעלת הקראה",
    tutorialPrimitives: "טוטוריאל פרימיטיבים", tutorialEqual: "טוטוריאל זוויות שוות", tutorial180: "טוטוריאל 180°", practicePrimitives: "תרגול פרימיטיבים", practiceEqual: "תרגול זוויות שוות", practice180: "תרגול 180°", masterStage: "MASTER — הכול מעורבב",
    beginnerHint: "בחרו חדה, ישרה, שטוחה או קהה; אחר כך גררו את הזווית הנבחרת והניחו אותה על השרטוט.", advancedHint: "בחרו לפי שם את הכלי שמתאר את הקשר בשרטוט. הכלי יופיע מיד, ואז כוונו אותו למקום החסר.", masterHint: "הכול פתוח ומעורבב. התעלמו מקווי ההסחה — גם כשקו בצבע השאלה עובר דרך הקודקוד.", beginnerArena: "בחרו והניחו על הזווית", advancedArena: "גררו אל הזווית החסרה", tutorialMode: "TUTORIAL • בחרו כלי", practiceMode: "PRACTICE • בחרו כלי", masterMode: "MASTER • הכול פתוח",
    toolHidden: "הכלי הוסתר. לחצו על שם כדי להציג כלי.", augmented: "AUGMENTED: {tool}. אפשר לגרור, לכוון או לזרוק.", speechActive: "הקראה בעברית פועלת.", placeAgain: "{tool} • לחצו בשרטוט כדי להניח מחדש", discarded: "הכלי נזרק. לחצו בשרטוט כדי להניח כלי חדש.", chooseFirst: "בחרו קודם כלי מארגז הזוויות.", mirrorOn: "מצב מראה הופעל.", mirrorOff: "מצב מראה בוטל.", wrongTool: "הצורה שהנחתם אינה מתארת את הקשר שבשרטוט. זרקו אותה ובחרו כלי אחר.", correct: "פגיעה מדויקת! +{xp} XP", correctBonus: "פגיעה מדויקת! +{xp} XP ועוד +{bonus} בונוס לבחירה נכונה בניסיון הראשון!", moveCloser: "כמעט! מרכז הזווית צריך לשבת על הנקודה הכחולה.", rotateMore: "המיקום נכון. עכשיו סובבו עד שהשוקיים יישבו על השרטוט.", mirrorNeeded: "המיקום והסיבוב נכונים, אבל הצורה פונה לצד השני. עשו דאבל־קליק או דאבל־טאפ על הכלי.", angleNeeded: "המיקום והכיוון נכונים. היעד הוא {target}° וכרגע הכלי על {current}°.", complete: "המסלול הושלם! צברתם {score} XP ב־{count} משימות.", completeHint: "סיימתם שלוש רמות של 10 שאלות ועוד 10 משימות מאסטר מעורבבות.", touchTip: "גררו כדי להזיז • דאבל־טאפ: מראה • גררו את הידיות כדי לכוון", mirrorTutorialTitle: "מראה בדאבל־טאפ", mirrorTutorialBody: "הקישו פעמיים במהירות בכל מקום בשרטוט. הכלי יתהפך סביב המרכז שלו.", replayTutorial: "הציגו שוב", understood: "הבנתי", mirrorHelp: "הדרכת מראה"
  },
  en: {
    appTitle: "Angle Quest", level: "Level", currentMission: "Current mission", chooseToolEyebrow: "Choose your tool", chooseTool: "Choose a tool", placeAngle: "Place the angle", selectAngle: "Choose an angle", toolbox: "Angle toolbox", primitives: "Primitives", equalFamily: "Equal angles", diagramTitle: "Angle exercise", diagramDesc: "A geometric diagram with a given angle and a missing angle.", arenaTip: "Drag to move • Double-click/tap anywhere: flip • ● angle • ■ height/length", anglePlus: "+ Angle", angleMinus: "− Angle", check: "Check", counterClockwise: "↶ Counterclockwise", clockwise: "Rotate ↷", mirror: "⇋ Mirror", discard: "⌫ Discard", footer: "Built for learning in motion: choose, collect, place, discover.", soundOff: "Turn narration off", soundOn: "Turn narration on",
    tutorialPrimitives: "Primitives tutorial", tutorialEqual: "Equal angles tutorial", tutorial180: "180° tutorial", practicePrimitives: "Primitives practice", practiceEqual: "Equal angles practice", practice180: "180° practice", masterStage: "MASTER — everything mixed", beginnerHint: "Choose acute, right, straight, or obtuse; then drag the selected angle onto the diagram.", advancedHint: "Choose the named tool that describes the relationship, then align it with the missing angle.", masterHint: "Everything is open and mixed. Ignore distractor lines, including lines through the vertex in the diagram color.", beginnerArena: "Choose and place on the angle", advancedArena: "Drag to the missing angle", tutorialMode: "TUTORIAL • Choose a tool", practiceMode: "PRACTICE • Choose a tool", masterMode: "MASTER • Everything open",
    toolHidden: "Tool hidden. Press its name to show it again.", augmented: "AUGMENTED: {tool}. Drag, adjust, or discard it.", speechActive: "English narration is on.", placeAgain: "{tool} • Click the diagram to place again", discarded: "Tool discarded. Click the diagram to place a new tool.", chooseFirst: "Choose a tool from the angle toolbox first.", mirrorOn: "Mirror mode on.", mirrorOff: "Mirror mode off.", wrongTool: "This shape does not describe the relationship. Discard it and choose another tool.", correct: "Direct hit! +{xp} XP", correctBonus: "Direct hit! +{xp} XP and +{bonus} first-guess bonus!", moveCloser: "Almost! Place the angle center on the blue point.", rotateMore: "Position is correct. Rotate until the rays align with the diagram.", mirrorNeeded: "Position and rotation are correct, but the shape faces the other way. Double-click or double-tap it.", angleNeeded: "Position and direction are correct. Target: {target}°; tool: {current}°.", complete: "Course complete! You earned {score} XP in {count} missions.", completeHint: "You completed three 10-question levels and 10 mixed Master missions.", touchTip: "Drag to move • Double-tap: mirror • Drag handles to adjust", mirrorTutorialTitle: "Mirror with a double-tap", mirrorTutorialBody: "Tap twice quickly anywhere on the diagram. The tool flips around its center.", replayTutorial: "Replay", understood: "Got it", mirrorHelp: "Mirror tutorial"
  },
  ru: {
    appTitle: "Квест углов", level: "Уровень", currentMission: "Текущее задание", chooseToolEyebrow: "Выберите инструмент", chooseTool: "Выберите инструмент", placeAngle: "Разместите угол", selectAngle: "Выберите угол", toolbox: "Набор углов", primitives: "Примитивы", equalFamily: "Равные углы", diagramTitle: "Задание с углами", diagramDesc: "Геометрический чертёж с данным и недостающим углом.", arenaTip: "Тяните для перемещения • Двойной щелчок/тап: отражение • ● угол • ■ высота/длина", anglePlus: "+ Угол", angleMinus: "− Угол", check: "Проверить", counterClockwise: "↶ Против часовой", clockwise: "Поворот ↷", mirror: "⇋ Отразить", discard: "⌫ Удалить", footer: "Обучение в движении: выбирай, собирай, размещай, открывай.", soundOff: "Выключить озвучивание", soundOn: "Включить озвучивание",
    tutorialPrimitives: "Урок: примитивы", tutorialEqual: "Урок: равные углы", tutorial180: "Урок: 180°", practicePrimitives: "Практика: примитивы", practiceEqual: "Практика: равные углы", practice180: "Практика: 180°", masterStage: "МАСТЕР — всё вперемешку", beginnerHint: "Выберите острый, прямой, развёрнутый или тупой угол, затем перетащите его на чертёж.", advancedHint: "Выберите инструмент по названию отношения и совместите его с недостающим углом.", masterHint: "Все семейства перемешаны. Игнорируйте отвлекающие линии, даже проходящие через вершину.", beginnerArena: "Выберите и наложите угол", advancedArena: "Перетащите к недостающему углу", tutorialMode: "УРОК • Выберите инструмент", practiceMode: "ПРАКТИКА • Выберите инструмент", masterMode: "МАСТЕР • Всё открыто",
    toolHidden: "Инструмент скрыт. Нажмите его название, чтобы показать снова.", augmented: "AUGMENTED: {tool}. Перетаскивайте, настраивайте или удалите.", speechActive: "Русская озвучка включена.", placeAgain: "{tool} • Нажмите на чертёж, чтобы разместить снова", discarded: "Инструмент удалён. Нажмите на чертёж, чтобы разместить новый.", chooseFirst: "Сначала выберите инструмент.", mirrorOn: "Отражение включено.", mirrorOff: "Отражение выключено.", wrongTool: "Эта фигура не описывает отношение на чертеже. Удалите её и выберите другую.", correct: "Точно! +{xp} XP", correctBonus: "Точно! +{xp} XP и +{bonus} за первую верную догадку!", moveCloser: "Почти! Совместите центр угла с синей точкой.", rotateMore: "Позиция верна. Поверните лучи до совпадения с чертежом.", mirrorNeeded: "Позиция и поворот верны, но фигура направлена в другую сторону. Сделайте двойной щелчок или тап.", angleNeeded: "Позиция и направление верны. Цель: {target}°; инструмент: {current}°.", complete: "Маршрут завершён! Вы заработали {score} XP за {count} заданий.", completeHint: "Вы прошли три уровня по 10 вопросов и 10 смешанных заданий Мастера.", touchTip: "Тяните для перемещения • Двойной тап: отражение • Настройка за ручки", mirrorTutorialTitle: "Отражение двойным тапом", mirrorTutorialBody: "Быстро коснитесь чертежа два раза. Инструмент отразится вокруг своего центра.", replayTutorial: "Повторить", understood: "Понятно", mirrorHelp: "Урок отражения"
  }
};

Object.assign(uiText.he, {
  tutorialPrimitives: "פרימיטיבים", practicePrimitives: "פרימיטיבים", tutorialEqual: "זוויות שוות", practiceEqual: "זוויות שוות", tutorial180: "180°", practice180: "180°", tutorialMode: "בחרו כלי", practiceMode: "בחרו כלי",
  levelComplete: "הרמה הושלמה", levelCompleteBody: "סיימתם 10 שאלות. אפשר לעבור לרמה הבאה.", nextLevel: "לרמה הבאה", chooseLevel: "בחירת רמה", chooseStart: "מאיפה מתחילים?", chooseStartBody: "אפשר להתחיל מכל משפחה או לעבור ישר לשלב המעורבב.", startEqual: "זוויות שוות", startMaster: "MASTER — מעורבב", complete: "כל הכבוד! צברתם {score} XP.", completeHint: "סיימתם את כל הרמות.", player: "שחקן", whoPlays: "מי משחק?", localPlayerNote: "השם וההיסטוריה נשמרים רק בדפדפן הזה — בלי סיסמה ובלי חשבון.", playerName: "שם השחקן", addPlayer: "הוספה", recordsTitle: "השיאים וההתקדמות", recentGames: "משחקים אחרונים", notDone: "לא בוצע", inProgress: "בתהליך — {done}/10", completedStatus: "הושלם — שיא {xp} XP", noGames: "עדיין אין משחקים שמורים", close: "סגירה", firstTry: "ניחוש ראשון: {count}"
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
  if (level.mode === "master") return "master";
  if (level.family === "שוות") return "equal";
  if (level.family === "180°") return "180";
  return "primitives";
}

function courseSectionLabel(section) {
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
  if (section === "equal") return levels.findIndex(level => level.family === "שוות");
  if (section === "180") return levels.findIndex(level => level.family === "180°");
  if (section === "master") return levels.findIndex(level => level.mode === "master");
  return 0;
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
  document.querySelector(".loadout .eyebrow").textContent = t("chooseToolEyebrow").toUpperCase();
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
  return touchPointerQuery.matches || navigator.maxTouchPoints > 0;
}

function showTouchTutorial() {
  if (!isTouchInterface()) return;
  $("touch-tutorial").hidden = false;
  $("touch-tutorial-close").focus();
}

function closeTouchTutorial() {
  $("touch-tutorial").hidden = true;
  try { localStorage.setItem("angleQuestMirrorTutorialSeen", "true"); } catch { /* The tutorial can appear again next session. */ }
}

function updateTouchInterface(showFirstTutorial = false) {
  const active = isTouchInterface();
  document.documentElement.classList.toggle("touch-ui", active);
  $("arena-tip").textContent = t(active ? "touchTip" : "arenaTip");
  if (!active) $("touch-tutorial").hidden = true;
  if (active && showFirstTutorial) {
    let seen = false;
    try { seen = localStorage.getItem("angleQuestMirrorTutorialSeen") === "true"; } catch { /* Show the tutorial. */ }
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
    sceneLayer.append(svgEl("circle", { cx: center.x, cy: center.y, r: 6, class: "target-dot" }));
    renderDistractorLines(level);
    applyProSceneTransform(level);
    return;
  } else if (level.scene === "vertical") {
    line(sceneLayer, 100, 335, 630, 95);
    line(sceneLayer, 100, 95, 630, 335);
    label(sceneLayer, 431, 211, "48°", "given-label");
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
    line(sceneLayer, 95, 220, 635, 220);
    line(sceneLayer, 360, 220, 535, 30);
    label(sceneLayer, 289, 166, "125°", "given-label");
    label(sceneLayer, 80, 241, "A");
    label(sceneLayer, 650, 241, "B");
  } else if (level.scene === "triangle") {
    line(sceneLayer, 220, 365, 520, 365);
    line(sceneLayer, 220, 365, 342, 153);
    line(sceneLayer, 342, 153, 520, 365);
    label(sceneLayer, 255, 339, "60°", "given-label");
    label(sceneLayer, 481, 339, "50°", "given-label");
  }

  renderDistractorLines(level);
  const target = svgEl("g", { transform: `translate(${level.target.x} ${level.target.y}) rotate(${level.target.rotation})` });
  const degrees = level.choices.find(c => c.id === level.correctChoice).degrees;
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
  const isBeginner = level.phase === "beginner";
  const isMaster = level.mode === "master";
  const primitivesEnabled = isBeginner || isMaster;
  const advancedHidden = isBeginner && !isMaster;
  const primitiveSection = `<section class="tool-family"><h3 class="tool-family-title">${t("primitives")}</h3><div class="choice-grid">${shuffle([...primitiveTools]).map(value => `<button type="button" class="choice-button" data-category="${value}" aria-pressed="false" ${primitivesEnabled ? "" : "disabled"}>${categoryLabel(value)}</button>`).join("")}</div></section>`;
  const advancedSections = Object.entries(families).map(([family, tools]) => {
    const familyHidden = advancedHidden || (!isMaster && !isBeginner && family !== level.family);
    const familyLabel = family === "שוות" ? t("equalFamily") : "180°";
    return `<section class="tool-family ${familyHidden ? "tool-family-reserved" : ""}" ${familyHidden ? "aria-hidden=\"true\"" : ""}><h3 class="tool-family-title">${familyLabel}</h3><div class="choice-grid">${shuffle([...tools]).map(value => `<button type="button" class="choice-button" data-category="${value}" aria-pressed="false" ${familyHidden ? "disabled" : ""}>${categoryLabel(value)}</button>`).join("")}</div></section>`;
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
      speakSelection(state.category);
      return;
    }
    placeSelected({ x: level.start.x, y: level.start.y });
    speakSelection(state.category);
  }));
}

function hideSelectedTool() {
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
    "משולש": "Triangle."
  };
  const spokenText = category === "משולש"
    ? "נבחר משולש"
    : primitiveTools.includes(category) ? `נבחרה זווית ${category}` : `נבחרו זוויות ${category}`;
  playRecordedSpeech(category, spokenText, englishNames[category]);
}

function playRecordedSpeech(key, hebrewFallback, englishFallback) {
  if ($("sound-toggle").getAttribute("aria-pressed") !== "true") return;
  const filename = recordedSpeechFiles[key];
  if (!filename) {
    speakText(hebrewFallback, englishFallback);
    return;
  }
  if (speechState.audio) {
    speechState.audio.pause();
    speechState.audio.currentTime = 0;
  }
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  const audio = new Audio(`audio/${state.language}/${filename}`);
  let usedFallback = false;
  const fallback = () => {
    if (usedFallback) return;
    usedFallback = true;
    speakText(hebrewFallback, englishFallback);
  };
  audio.volume = 1;
  audio.onerror = fallback;
  audio.onended = () => {
    if (speechState.audio === audio) speechState.audio = null;
  };
  speechState.audio = audio;
  audio.play().catch(fallback);
}

function refreshVoices() {
  if (!("speechSynthesis" in window)) return;
  speechState.voices = window.speechSynthesis.getVoices();
}

function speakText(text, englishFallback = text) {
  if ($("sound-toggle").getAttribute("aria-pressed") !== "true") return;
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    feedback("הדפדפן הזה אינו תומך בהקראה קולית.", false);
    return;
  }
  refreshVoices();
  if (speechState.timer) {
    clearTimeout(speechState.timer);
    speechState.timer = null;
  }
  if (window.speechSynthesis.speaking || window.speechSynthesis.pending) window.speechSynthesis.cancel();
  if (window.speechSynthesis.paused) window.speechSynthesis.resume();
  const hebrewVoice = speechState.voices.find(voice => voice.lang?.toLowerCase().startsWith("he") && voice.localService);
  const englishVoice = speechState.voices.find(voice => voice.lang?.toLowerCase().startsWith("en-us") && voice.localService)
    || speechState.voices.find(voice => voice.lang?.toLowerCase().startsWith("en") && voice.localService)
    || speechState.voices.find(voice => voice.lang?.toLowerCase().startsWith("en"));
  const selectedVoice = hebrewVoice || englishVoice;
  const message = new SpeechSynthesisUtterance(hebrewVoice ? text : englishFallback);
  let started = false;
  message.lang = selectedVoice?.lang || (hebrewVoice ? "he-IL" : "en-US");
  message.rate = .92;
  message.pitch = 1.05;
  message.volume = 1;
  if (selectedVoice) message.voice = selectedVoice;
  message.onstart = () => {
    started = true;
    if (speechState.timer) clearTimeout(speechState.timer);
    speechState.timer = null;
    const voiceName = message.voice?.name || "קול ברירת המחדל של הדפדפן";
    feedback(`מנוע ההקראה התחיל (${voiceName}).`, true);
  };
  message.onend = () => {
    if (speechState.timer) clearTimeout(speechState.timer);
    speechState.timer = null;
    speechState.utterance = null;
  };
  message.onerror = event => {
    if (speechState.timer) clearTimeout(speechState.timer);
    speechState.timer = null;
    if (event.error !== "canceled" && event.error !== "interrupted") feedback(`שגיאת הקראה: ${event.error || "לא ידועה"}.`, false);
  };
  speechState.utterance = message;
  window.speechSynthesis.speak(message);
  if (window.speechSynthesis.paused) window.speechSynthesis.resume();
  speechState.timer = setTimeout(() => {
    if (!started && speechState.utterance === message) feedback("מנוע ההקראה לא התחיל. הצפצוף יעזור לבדוק אם הבעיה היא רק בקול העברי.", false);
  }, 1200);
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
  state.choice = level.correctChoice;
  const selectedAngle = level.choices.find(c => c.id === state.choice);
  state.degrees = defaultDegreesForTool(state.category, selectedAngle.degrees);
  state.equipped = true;
  state.piece = {
    x: point.x,
    y: point.y,
    rotation: defaultPlacementRotation(state.category, target.rotation, state.degrees),
    mirrored: false
  };
  state.dimensions = { arm: 112, cross: 112, gap: 92, spine: 132 };
  state.triangleVertices = state.category === "משולש"
    ? { a: polar(112, -state.degrees / 2), b: polar(112, state.degrees / 2) }
    : null;
  updateAngleReadout();
  ["rotate-left", "rotate-right", "check-button", "angle-smaller", "angle-larger", "mirror-button", "discard-button"].forEach(id => $(id).disabled = false);
  $("mirror-button").setAttribute("aria-pressed", String(state.piece.mirrored));
  feedback(t("augmented", { tool: categoryLabel(state.category) }), true);
  renderPiece();
  pulse(45);
}

function defaultDegreesForTool(category, targetDegrees) {
  const primitiveDegrees = { "חדה": 45, "ישרה": 90, "שטוחה": 180, "קהה": 125 };
  if (primitiveDegrees[category]) return primitiveDegrees[category];
  if (category === "מתחלפות") return 65;
  if (category === "מתאימות") return 90;
  return targetDegrees;
}

function defaultPlacementRotation(category, targetRotation, degrees) {
  if (primitiveTools.includes(category)) return 0;
  if (category === "מתאימות") return 0;
  return normalizeAngle(targetRotation - toolMarkerRotation(category, degrees));
}

function renderPiece() {
  pieceLayer.replaceChildren();
  if (!state.equipped) return;
  const level = levels[state.levelIndex];
  const choice = level.choices.find(c => c.id === state.choice);
  const shape = augmentedShape(level);
  const mirrorCenterX = shapeMirrorCenterX(shape);
  const isSupplementaryTool = families["180°"].includes(state.category);
  const group = svgEl("g", {
    class: `piece${isSupplementaryTool ? " piece-180" : ""}`,
    transform: `translate(${state.piece.x} ${state.piece.y}) rotate(${state.piece.rotation})`,
    "aria-label": `זווית ${Math.round(state.degrees)} מעלות`
  });
  const content = svgEl("g", {
    class: "piece-content",
    transform: mirrorScaleTransform(mirrorCenterX, state.piece.mirrored ? -1 : 1)
  });
  const rayLength = 88;
  const aAngle = shape === "f" || shape === "primitive" ? 0 : -state.degrees / 2;
  const bAngle = shape === "f" ? state.degrees : shape === "primitive" ? -state.degrees : state.degrees / 2;
  const a = polar(rayLength, aAngle);
  const b = polar(rayLength, bAngle);
  let equalMarker = null;
  let primaryMarkerRotation = 0;

  if (shape === "z") {
    equalMarker = renderZShape(content);
  } else if (shape === "f") {
    const markers = renderFShape(content);
    primaryMarkerRotation = markers.primaryRotation;
    equalMarker = markers.equalMarker;
  } else if (shape === "adjacent2") {
    renderAdjacentTwoShape(content, a, b);
  } else if (shape === "triangle") {
    primaryMarkerRotation = triangleGeometry().rotation;
    renderTriangleShape(content, a, b);
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
  group.addEventListener("pointerdown", startMove);

  const angleHandles = shape === "triangle" ? [] : [
    { point: a, side: -1, label: "כיוון הזרוע הראשונה" },
    { point: b, side: 1, label: "כיוון הזרוע השנייה" }
  ];
  angleHandles.forEach(({ point, side, label: handleLabel }) => {
    const hit = svgEl("circle", {
      cx: point.x,
      cy: point.y,
      r: 24,
      class: "size-handle-hit",
      role: "button",
      "aria-label": handleLabel
    });
    const visible = svgEl("circle", { cx: point.x, cy: point.y, r: 10, class: "size-handle" });
    hit.addEventListener("pointerdown", event => startResize(event, side));
    visible.addEventListener("pointerdown", event => startResize(event, side));
    content.append(hit, visible);
  });

  const handleGroup = svgEl("g", { transform: "translate(0 -92)" });
  handleGroup.append(svgEl("line", { x1: 0, y1: 12, x2: 0, y2: 77, class: "rotate-handle-line" }));
  const handle = svgEl("circle", { cx: 0, cy: 0, r: 13, class: "rotate-handle" });
  handleGroup.append(handle);
  handle.addEventListener("pointerdown", startRotate);
  content.append(handleGroup);
  group.append(content);
  pieceLayer.append(group);
  addPieceDragArea(content);
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
    const padding = 14;
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

function animateMirrorFlip(fromMirrored, toMirrored) {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const content = pieceLayer.querySelector(".piece-content");
  if (!content) return;
  const centerX = shapeMirrorCenterX(augmentedShape(levels[state.levelIndex]));
  const startScale = fromMirrored ? -1 : 1;
  const endScale = toMirrored ? -1 : 1;
  content.setAttribute("transform", mirrorScaleTransform(centerX, startScale));
  const startedAt = performance.now();
  const duration = 320;
  const frame = now => {
    const progress = Math.min(1, (now - startedAt) / duration);
    const eased = progress < .5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    const scale = startScale + (endScale - startScale) * eased;
    content.setAttribute("transform", mirrorScaleTransform(centerX, scale));
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
  if (shape === "z") {
    const diagonal = unit(-state.degrees / 2);
    const parallel = unit(state.degrees / 2);
    const jointX = diagonal.x * state.dimensions.cross;
    const lowerEndX = parallel.x * state.dimensions.arm;
    const upperEndX = jointX - parallel.x * state.dimensions.arm;
    const values = [0, jointX, lowerEndX, upperEndX];
    return (Math.min(...values) + Math.max(...values)) / 2;
  }
  if (shape === "f") {
    const spine = unit(state.degrees);
    const topJointX = -spine.x * state.dimensions.gap;
    const spineEndX = spine.x * (state.dimensions.spine - state.dimensions.gap);
    const middleEndX = state.dimensions.arm;
    const topEndX = topJointX + state.dimensions.arm;
    const values = [0, topJointX, spineEndX, middleEndX, topEndX];
    return (Math.min(...values) + Math.max(...values)) / 2;
  }
  if (shape === "triangle" && state.triangleVertices) {
    const values = [0, state.triangleVertices.a.x, state.triangleVertices.b.x];
    return (Math.min(...values) + Math.max(...values)) / 2;
  }
  return 0;
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

function toolMarkerRotation(category, degrees) {
  if (primitiveTools.includes(category)) return -degrees / 2;
  if (category === "משולש") return triangleGeometry().rotation;
  return category === "מתאימות" ? degrees / 2 : 0;
}

function effectiveToolRotation(category, degrees, piece = state.piece) {
  const markerRotation = toolMarkerRotation(category, degrees);
  const mirroredMarkerRotation = piece.mirrored ? 180 - markerRotation : markerRotation;
  return normalizeAngle(piece.rotation + mirroredMarkerRotation);
}

function placementRotationForTarget(category, degrees, targetRotation, mirrored) {
  const markerRotation = toolMarkerRotation(category, degrees);
  const mirroredMarkerRotation = mirrored ? 180 - markerRotation : markerRotation;
  return normalizeAngle(targetRotation - mirroredMarkerRotation);
}

function renderAngleMarker(group, marker) {
  const markerGroup = svgEl("g", { transform: `translate(${marker.x} ${marker.y}) rotate(${marker.rotation})` });
  markerGroup.append(svgEl("path", { d: sectorPath(state.degrees, 54), class: "piece-arc" }));
  markerGroup.append(svgEl("path", { d: arcPath(state.degrees, 40), class: "piece-arc" }));
  group.append(markerGroup);
}

function renderAdjacentTwoShape(group, a, b) {
  group.append(svgEl("line", { x1: -b.x, y1: -b.y, x2: b.x, y2: b.y, class: "piece-rays" }));
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
  group.append(svgEl("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: "piece-opposite" }));
  addPointHandle(group, a, "triangleVertexA", "שינוי הקודקוד הראשון של המשולש", "קודקוד");
  addPointHandle(group, b, "triangleVertexB", "שינוי הקודקוד השני של המשולש", "קודקוד");
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
  [hit, visible].forEach(handle => handle.addEventListener("pointerdown", event => startPointResize(event, kind)));
  const labelOffset = kind === "gap" || kind === "height" ? -22 : 24;
  const textLabel = svgEl("text", { x: point.x, y: point.y + labelOffset, class: "handle-label" }, handleLabel(visibleLabel));
  group.append(hit, visible, textLabel);
}

function renderZShape(group) {
  const diagonalDirection = unit(-state.degrees / 2);
  const parallelDirection = unit(state.degrees / 2);
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
  const upperMid = { x: (upperEnd.x + joint.x) / 2, y: (upperEnd.y + joint.y) / 2 };
  group.append(svgEl("line", { x1: upperEnd.x, y1: upperEnd.y, x2: joint.x, y2: joint.y, class: "piece-rays" }));
  group.append(svgEl("line", { x1: joint.x, y1: joint.y, x2: 0, y2: 0, class: "piece-opposite" }));
  group.append(svgEl("line", { x1: 0, y1: 0, x2: lowerEnd.x, y2: lowerEnd.y, class: "piece-rays" }));
  addPointHandle(group, lowerEnd, "arm", "שינוי אורך הישרים המקבילים", "אורך");
  addPointHandle(group, upperMid, "height", "שינוי הגובה של צורת Z", "גובה");
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
  addPointHandle(group, middleEnd, "arm", "שינוי אורך הזרועות המקבילות", "אורך");
  addPointHandle(group, topEnd, "gap", "הגבהה או הנמכה של הזרוע העליונה", "גובה");
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
  const p = svgPoint(event);
  state.dragging = "move";
  state.dragMoved = false;
  state.dragStartPointer = { x: event.clientX, y: event.clientY };
  state.dragOffset = { x: p.x - state.piece.x, y: p.y - state.piece.y };
  svg.setPointerCapture(event.pointerId);
}

function startRotate(event) {
  event.stopPropagation();
  event.preventDefault();
  state.dragging = "rotate";
  svg.setPointerCapture(event.pointerId);
}

function startResize(event, side) {
  event.stopPropagation();
  event.preventDefault();
  state.dragging = `resize:${side}`;
  svg.setPointerCapture(event.pointerId);
}

function startPointResize(event, kind) {
  event.stopPropagation();
  event.preventDefault();
  const local = toPieceLocal(svgPoint(event));
  state.pointDragStart = {
    local,
    dimensions: { ...state.dimensions },
    triangleVertices: state.triangleVertices ? {
      a: { ...state.triangleVertices.a },
      b: { ...state.triangleVertices.b }
    } : null
  };
  state.dragging = `point:${kind}`;
  svg.setPointerCapture(event.pointerId);
}

svg.addEventListener("pointermove", event => {
  if (!state.dragging || state.solved) return;
  const p = svgPoint(event);
  if (state.dragging === "move") {
    if (state.dragStartPointer && Math.hypot(event.clientX - state.dragStartPointer.x, event.clientY - state.dragStartPointer.y) > 8) state.dragMoved = true;
    state.piece.x = Math.max(25, Math.min(695, p.x - state.dragOffset.x));
    state.piece.y = Math.max(25, Math.min(405, p.y - state.dragOffset.y));
  } else if (state.dragging === "rotate") {
    state.piece.rotation = normalizeAngle(Math.atan2(p.y - state.piece.y, p.x - state.piece.x) * 180 / Math.PI + 90);
  } else if (state.dragging.startsWith("resize:")) {
    const level = levels[state.levelIndex];
    const choice = level.choices.find(c => c.id === state.choice);
    const bounds = angleBounds(activeChoiceType(level, choice), level.lockAngleType === true);
    const local = toPieceLocal(p);
    const relativeAngle = Math.atan2(local.y, local.x) * 180 / Math.PI;
    const hasFixedHorizontalBase = state.category === "מתאימות" || primitiveTools.includes(state.category);
    const requestedDegrees = hasFixedHorizontalBase ? Math.abs(normalizeSignedAngle(relativeAngle)) : Math.abs(relativeAngle) * 2;
    state.degrees = Math.max(bounds.min, Math.min(bounds.max, requestedDegrees));
    updateAngleReadout();
  } else if (state.dragging.startsWith("point:")) {
    resizeShapePoint(state.dragging.slice(6), p);
  }
  renderPiece();
});

svg.addEventListener("pointerup", event => {
  const completedGesture = state.dragging;
  if (completedGesture === "move" && !state.dragMoved) registerMirrorTap();
  else if (!completedGesture && state.equipped) registerMirrorTap();
  if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
  state.dragging = null;
  state.dragStartPointer = null;
  state.pointDragStart = null;
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

function resizeShapePoint(kind, svgPosition) {
  const local = toPieceLocal(svgPosition);
  const start = state.pointDragStart || { local, dimensions: { ...state.dimensions } };
  const delta = { x: local.x - start.local.x, y: local.y - start.local.y };
  const shape = augmentedShape(levels[state.levelIndex]);
  const parallelDirection = shape === "f" ? unit(0) : unit(state.degrees / 2);
  const diagonalDirection = unit(-state.degrees / 2);
  const projection = (point, direction) => point.x * direction.x + point.y * direction.y;
  if (kind === "arm") {
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
    if (geometry.degrees < 15 || geometry.degrees > 165) {
      state.triangleVertices[key] = previous;
      return;
    }
    state.degrees = geometry.degrees;
    updateAngleReadout();
  }
}

function toPieceLocal(svgPosition) {
  const dx = svgPosition.x - state.piece.x;
  const dy = svgPosition.y - state.piece.y;
  const rotation = -state.piece.rotation * Math.PI / 180;
  const rotated = {
    x: dx * Math.cos(rotation) - dy * Math.sin(rotation),
    y: dx * Math.sin(rotation) + dy * Math.cos(rotation)
  };
  const mirrorCenterX = shapeMirrorCenterX(augmentedShape(levels[state.levelIndex]));
  return { x: state.piece.mirrored ? 2 * mirrorCenterX - rotated.x : rotated.x, y: rotated.y };
}

function pieceAnchorPosition() {
  if (!state.piece.mirrored) return { x: state.piece.x, y: state.piece.y };
  const mirrorCenterX = shapeMirrorCenterX(augmentedShape(levels[state.levelIndex]));
  const localAnchorX = 2 * mirrorCenterX;
  const rotation = state.piece.rotation * Math.PI / 180;
  return {
    x: state.piece.x + localAnchorX * Math.cos(rotation),
    y: state.piece.y + localAnchorX * Math.sin(rotation)
  };
}

function rotate(delta) {
  if (!state.equipped || state.solved) return;
  state.piece.rotation = normalizeAngle(state.piece.rotation + delta);
  renderPiece();
}

function toggleMirror() {
  if (!state.equipped || state.solved) return;
  const wasMirrored = state.piece.mirrored;
  state.piece.mirrored = !state.piece.mirrored;
  $("mirror-button").setAttribute("aria-pressed", String(state.piece.mirrored));
  feedback(t(state.piece.mirrored ? "mirrorOn" : "mirrorOff"), true);
  renderPiece();
  animateMirrorFlip(wasMirrored, state.piece.mirrored);
}

function angleBounds(type, locked = false) {
  if (!locked) return { min: 15, max: 165 };
  if (type === "acute") return { min: 15, max: 80 };
  if (type === "right") return { min: 90, max: 90 };
  if (type === "flat") return { min: 180, max: 180 };
  return { min: 95, max: 165 };
}

function activeChoiceType(level, choice) {
  if (level.phase !== "beginner") return choice.type;
  return state.category === "חדה" ? "acute" : state.category === "ישרה" ? "right" : state.category === "שטוחה" ? "flat" : "obtuse";
}

function resizeAngle(delta) {
  if (!state.equipped || state.solved) return;
  const level = levels[state.levelIndex];
  const choice = level.choices.find(c => c.id === state.choice);
  const bounds = angleBounds(activeChoiceType(level, choice), level.lockAngleType === true);
  const nextDegrees = Math.max(bounds.min, Math.min(bounds.max, state.degrees + delta));
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
  updateAngleReadout();
  renderPiece();
}

function updateAngleReadout() {
  const level = levels[state.levelIndex];
  const choice = level.choices.find(c => c.id === state.choice);
  if (!choice) return;
  $("angle-readout").textContent = `${categoryLabel(state.category)} • ${Math.round(state.degrees)}° • ${categoryLabel(classifyAngle(state.degrees))}`;
  const bounds = angleBounds(activeChoiceType(level, choice), level.lockAngleType === true);
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
  const level = levels[state.levelIndex];
  const target = currentTarget(level);
  if (state.category !== level.correctCategory) {
    feedback(t("wrongTool"), false);
    pulse(100);
    return;
  }
  const targetDegrees = level.choices.find(c => c.id === level.correctChoice).degrees;
  const anchor = pieceAnchorPosition();
  const distance = Math.hypot(anchor.x - target.x, anchor.y - target.y);
  const effectiveRotation = effectiveToolRotation(state.category, state.degrees);
  const turn = angleDistance(effectiveRotation, target.rotation);
  const sizeDifference = Math.abs(state.degrees - targetDegrees);
  const angleTolerance = 5;
  if (distance <= level.target.tolerance && turn <= level.target.rotationTolerance && sizeDifference <= angleTolerance) {
    state.piece = {
      x: target.x,
      y: target.y,
      rotation: placementRotationForTarget(state.category, state.degrees, target.rotation, state.piece.mirrored),
      mirrored: state.piece.mirrored
    };
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
    speakSelection(level.correctCategory);
    const narrationEnabled = $("sound-toggle").getAttribute("aria-pressed") === "true";
    setTimeout(nextLevel, narrationEnabled ? 1900 : 1100);
  } else if (distance > level.target.tolerance) {
    feedback(t("moveCloser"), false);
    pulse(80);
  } else if (turn > level.target.rotationTolerance) {
    feedback(t("rotateMore"), false);
    pulse(80);
  } else {
    feedback(t("angleNeeded", { target: Math.round(targetDegrees), current: Math.round(state.degrees) }), false);
    pulse(80);
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
  document.querySelector('[data-course-start="primitives"]').focus();
}

function startCourseAt(section) {
  if (!activePlayer()) {
    $("course-menu").hidden = true;
    showPlayerMenu();
    return;
  }
  const indexBySection = {
    primitives: 0,
    equal: levels.findIndex(level => level.family === "שוות"),
    "180": levels.findIndex(level => level.family === "180°"),
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

function pulse(pattern) {
  if ($("sound-toggle").getAttribute("aria-pressed") === "true" && navigator.vibrate) navigator.vibrate(pattern);
}

function loadLevel() {
  const level = levels[state.levelIndex];
  prepareDynamicLevel(level);
  prepareProLevel(level);
  Object.assign(state, { category: null, firstChoiceMade: false, firstChoiceCorrect: false, choice: null, degrees: 0, equipped: false, solved: false, dragging: null });
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
      : t("advancedHint");
  $("arena-title").textContent = level.phase === "beginner" ? t("beginnerArena") : t("advancedArena");
  $("angle-readout").textContent = level.mode === "tutorial" ? t("tutorialMode") : level.mode === "master" ? t("masterMode") : t("practiceMode");
  $("feedback").textContent = "";
  $("feedback").className = "feedback";
  ["rotate-left", "rotate-right", "check-button", "angle-smaller", "angle-larger", "mirror-button", "discard-button"].forEach(id => $(id).disabled = true);
  $("mirror-button").setAttribute("aria-pressed", "false");
  renderChoices(level);
  renderScene(level);
  renderPiece();
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
