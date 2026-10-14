"use strict";

const principles = [
  {
    id: "proximity", name: "Proximity", icon: "••",
    definition: "Objects close to one another tend to be perceived as belonging together.",
    student: "When things are near each other, your brain often puts them in the same group.",
    example: "Three groups of dots are easier to see when each group's dots are close together. In a form, a label placed near its field reads as a pair.",
    withText: "Three clear groups: each set of dots is close together, with a larger gap between groups.",
    withoutText: "The dots are evenly spaced, so the three groups are less obvious.",
    purpose: "Use spacing to show which content belongs together and help people scan relationships.",
    notApplied: "Related items may be mistaken for separate groups, or unrelated items may seem connected."
  },
  {
    id: "similarity", name: "Similarity", icon: "◉",
    definition: "Objects that share visual features, such as color, size, or shape, tend to be perceived as related.",
    student: "If things look alike, your brain often puts them on the same team.",
    example: "Buttons with the same color and shape can signal that they have the same importance or function.",
    withText: "Matching colors make the objects read as a group.",
    withoutText: "Mixed colors interrupt the visual pattern and make the grouping less obvious.",
    purpose: "Use consistent styling to help people recognize items that share a role or category.",
    notApplied: "A category may be harder to identify when its members look inconsistent."
  },
  {
    id: "closure", name: "Closure", icon: "◌",
    definition: "People tend to perceive a complete, recognizable form even when parts of its outline are missing.",
    student: "Your brain fills in some gaps when it can still recognize the shape.",
    example: "A partly open progress ring can still be recognized as a circular indicator.",
    withText: "The incomplete outline is still recognizable as a circle.",
    withoutText: "Larger fragments make the intended shape harder to recognize.",
    purpose: "A simple, partial form can communicate a familiar shape without drawing every edge.",
    notApplied: "When too much is missing, the viewer may not recognize what the fragments represent."
  },
  {
    id: "continuity", name: "Continuity", icon: "⌁",
    definition: "The eye tends to follow smooth, continuous lines and paths.",
    student: "Your eyes naturally follow a smooth path more easily than a path that keeps jumping.",
    example: "A checkout progress path connects steps so shoppers can follow the order of a process.",
    withText: "Dots follow a smooth path that guides the eye.",
    withoutText: "The interrupted zigzag path makes the visual direction less clear.",
    purpose: "Use alignment and flow to guide attention through related steps or content.",
    notApplied: "An irregular path may interrupt scanning or make a sequence harder to follow."
  },
  {
    id: "figure-ground", name: "Figure–Ground", icon: "◐",
    definition: "Visual perception separates a focal object (the figure) from its surrounding background.",
    student: "Your brain picks out what to look at and treats the rest as the background.",
    example: "A high-contrast dialog stands apart from the page behind it so its message is easy to read.",
    withText: "Strong contrast helps the foreground shape stand out from its background.",
    withoutText: "Low contrast makes the same foreground shape blend into the background.",
    purpose: "Make important content visually distinct from its surroundings.",
    notApplied: "Low contrast can make important information harder to locate or read."
  },
  {
    id: "symmetry", name: "Symmetry", icon: "◈",
    definition: "Balanced or mirrored elements tend to be perceived as related and organized into a whole.",
    student: "Matching shapes on either side of a center often feel balanced and connected.",
    example: "A balanced account summary uses aligned pairs of labels and values that are easy to scan.",
    withText: "The shapes mirror around a center line, creating a balanced arrangement.",
    withoutText: "The same shapes are unevenly placed, weakening the balanced relationship.",
    purpose: "Create a sense of order and make paired or mirrored content easier to compare.",
    notApplied: "Uneven arrangements can feel less stable or make comparisons harder."
  },
  {
    id: "common-region", name: "Common Region", icon: "▣",
    definition: "Elements inside the same bounded area tend to be perceived as belonging together.",
    student: "A shared box or card tells you that the items inside it are related.",
    example: "A shipping address card groups the recipient's name, street, and delivery details.",
    withText: "The shared border encloses the objects as one group.",
    withoutText: "The same objects have no shared boundary, so the grouping is less explicit.",
    purpose: "Use a shared container to distinguish a group from nearby content.",
    notApplied: "Related details can blend into surrounding content or appear unrelated."
  },
  {
    id: "common-fate", name: "Common Fate", icon: "↗",
    definition: "Objects moving in the same direction at the same time tend to be perceived as related.",
    student: "When things move together, your brain often assumes they belong together.",
    example: "Selected files that move together during a drag action communicate that they form one group.",
    withText: "The objects move in the same direction, suggesting a shared group.",
    withoutText: "The objects move in different directions, suggesting separate movement.",
    purpose: "Use coordinated movement to reveal which elements are linked or changing together.",
    notApplied: "A relationship that depends on movement may be less apparent when items move independently."
  },
  {
    id: "connectedness", name: "Connectedness", icon: "⌘",
    definition: "Elements joined by a visible line or link tend to be perceived as related.",
    student: "A line connecting two things makes their relationship easy to see.",
    example: "Lines in a relationship map connect a person to related events or records.",
    withText: "Lines visibly connect the nodes and show their relationships.",
    withoutText: "The same nodes appear without connecting lines, so the relationships are less explicit.",
    purpose: "Make relationships clear even when related objects are separated by space.",
    notApplied: "Viewers may not know which items or points are related."
  },
  {
    id: "pragnanz", name: "Prägnanz (Simplicity)", icon: "○",
    definition: "When possible, people tend to organize visual information into its simplest, most stable form.",
    student: "Your brain often prefers the cleanest, easiest pattern it can make from what it sees.",
    example: "A simple icon can be quicker to recognize than a detailed illustration of the same action.",
    withText: "A simple geometric form is easy to recognize.",
    withoutText: "Extra lines make the same basic form needlessly complex.",
    purpose: "Keep shapes and arrangements clear enough to recognize quickly.",
    notApplied: "Unnecessary visual detail can compete with the main form and slow recognition."
  }
];

const mainPrinciples = principles.slice(0, 7);
const principleById = Object.fromEntries(principles.map((principle) => [principle.id, principle]));
const principleList = document.getElementById("principle-list");
const advancedList = document.getElementById("advanced-list");
const principleChoice = document.getElementById("principle-choice");
const examples = document.getElementById("examples");
let currentPrinciple = "proximity";
let currentMode = "compare";

function makeSvg(content, label, viewBox = "0 0 420 190") {
  return `<svg viewBox="${viewBox}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
}

function renderVisual(id, withPrinciple) {
  const p = principleById[id];
  let drawing = "";
  let label = `${p.name}: ${withPrinciple ? p.withText : p.withoutText}`;
  const accent = "var(--accent)";
  const green = "var(--green)";
  const orange = "var(--orange)";
  const line = "var(--line)";
  const page = "var(--page)";
  const surface = "var(--surface)";

  if (id === "proximity") {
    const points = withPrinciple
      ? [[72,61],[92,61],[72,81],[92,81],[200,61],[220,61],[200,81],[220,81],[328,61],[348,61],[328,81],[348,81]]
      : [[52,57],[110,57],[168,57],[226,57],[284,57],[342,57],[52,119],[110,119],[168,119],[226,119],[284,119],[342,119]];
    drawing = points.map(([x,y], index) => `<circle cx="${x}" cy="${y}" r="8" fill="${index % 4 === 0 ? orange : accent}"/>`).join("");
  } else if (id === "similarity") {
    const positions = [105,165,225,285];
    drawing = positions.map((x, index) => `<circle cx="${x}" cy="90" r="15" fill="${withPrinciple ? (index < 2 ? accent : orange) : [accent,orange,accent,orange][index]}"/>`).join("");
  } else if (id === "closure") {
    drawing = withPrinciple
      ? `<path d="M 145 95 A 65 65 0 1 1 252 143" fill="none" stroke="${accent}" stroke-width="9" stroke-linecap="round" stroke-dasharray="345 70"/>`
      : `<path d="M145 65 L165 47 M194 31 L218 31 M251 44 L266 65 M276 94 L271 116 M251 146 L231 159 M197 163 L178 156 M150 143 L135 122 M128 94 L135 73" fill="none" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>`;
  } else if (id === "continuity") {
    const points = withPrinciple
      ? [[45,139],[98,111],[151,86],[204,75],[257,81],[310,103],[365,134]]
      : [[45,139],[98,76],[151,124],[204,55],[257,121],[310,72],[365,134]];
    drawing = `<polyline points="${points.map(([x,y])=>`${x},${y}`).join(" ")}" fill="none" stroke="${withPrinciple ? accent : line}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`
      + points.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="7" fill="${i === 3 ? orange : green}"/>`).join("");
  } else if (id === "figure-ground") {
    drawing = `<rect x="69" y="30" width="282" height="130" rx="12" fill="${withPrinciple ? accent : "#a7aaba"}"/><circle cx="210" cy="95" r="42" fill="${withPrinciple ? page : "#b0b2bc"}"/><circle cx="210" cy="95" r="7" fill="${withPrinciple ? orange : "#a7aaba"}"/>`;
  } else if (id === "symmetry") {
    drawing = `<line x1="210" y1="28" x2="210" y2="162" stroke="${line}" stroke-dasharray="4 5"/>`;
    drawing += withPrinciple
      ? `<path d="M200 95 C135 29 77 48 91 95 C77 142 135 161 200 95Z M220 95 C285 29 343 48 329 95 C343 142 285 161 220 95Z" fill="${accent}"/><circle cx="210" cy="95" r="9" fill="${orange}"/>`
      : `<path d="M200 95 C128 43 74 48 87 95 C77 143 135 157 200 95Z" fill="${accent}"/><path d="M220 95 C274 44 335 60 321 95 C347 138 278 163 220 95Z" fill="${orange}"/>`;
  } else if (id === "common-region") {
    if (withPrinciple) drawing += `<rect x="101" y="41" width="218" height="108" rx="12" fill="none" stroke="${accent}" stroke-width="3"/>`;
    drawing += `<circle cx="156" cy="94" r="16" fill="${accent}"/><rect x="194" y="78" width="32" height="32" rx="5" fill="${orange}"/><circle cx="264" cy="94" r="16" fill="${accent}"/>`;
  } else if (id === "common-fate") {
    const positions = [[105,64],[210,64],[315,64],[105,124],[210,124],[315,124]];
    const directions = withPrinciple ? ["right","right","right","right","right","right"] : ["right","left","up","down","left","up"];
    const rotate = { right: 0, down: 90, left: 180, up: 270 };
    drawing = positions.map(([x,y], i) => {
      const color = i % 2 ? orange : accent;
      const motion = withPrinciple ? "moving" : `moving moving-${directions[i]}`;
      return `<g class="${motion}"><circle cx="${x}" cy="${y}" r="10" fill="${color}"/><path d="M${x+14} ${y} l 13 -7 v 14 z" transform="rotate(${rotate[directions[i]]} ${x+20} ${y})" fill="${color}"/></g>`;
    }).join("");
  } else if (id === "connectedness") {
    const points = [[105,56],[210,95],[315,56],[130,142],[290,142]];
    if (withPrinciple) drawing = [[0,1],[1,2],[1,3],[1,4]].map(([a,b]) => `<line x1="${points[a][0]}" y1="${points[a][1]}" x2="${points[b][0]}" y2="${points[b][1]}" stroke="${line}" stroke-width="4"/>`).join("");
    drawing += points.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="14" fill="${i === 1 ? orange : accent}" stroke="${surface}" stroke-width="3"/>`).join("");
  } else {
    if (withPrinciple) drawing = `<circle cx="210" cy="95" r="54" fill="${accent}"/>`;
    else {
      const points = Array.from({length: 48}, (_,i) => {
        const angle = i * Math.PI / 24;
        const radius = i % 2 === 0 ? 66 : 31;
        return `${210 + Math.cos(angle) * radius},${95 + Math.sin(angle) * radius}`;
      }).join(" ");
      drawing = `<polygon points="${points}" fill="${accent}"/>`
        + Array.from({length: 12}, (_,i) => `<circle cx="${210 + Math.cos(i * Math.PI / 6) * 48}" cy="${95 + Math.sin(i * Math.PI / 6) * 48}" r="4" fill="${surface}"/>`).join("");
    }
  }
  return makeSvg(drawing, label);
}

function renderCard(principle, index) {
  return `<article class="card">
    <div class="card-top"><span>${String(index + 1).padStart(2, "0")}</span><span aria-hidden="true">${principle.icon}</span></div>
    <h3>${principle.name}</h3><p>${principle.definition}</p>
    <p class="card-example"><strong>Example:</strong> ${principle.example}</p>
    <button type="button" data-learn="${principle.id}">Explore comparison →</button>
  </article>`;
}

function populatePrinciples() {
  principleList.innerHTML = mainPrinciples.map(renderCard).join("");
  advancedList.innerHTML = principles.slice(7).map((p, i) => renderCard(p, i + 7)).join("");
  principleChoice.innerHTML = principles.map(p => `<option value="${p.id}">${p.name}</option>`).join("");
  document.getElementById("compare-choice").innerHTML = mainPrinciples.map(p => `<option value="${p.id}">${p.name}</option>`).join("");
}

function makeExample(principle, withPrinciple) {
  const title = withPrinciple ? "WITH Principle" : "WITHOUT Principle";
  const tag = withPrinciple ? "clear grouping" : "weaker cue";
  const fateButton = principle.id === "common-fate"
    ? `<button class="button-reset fate-control" type="button" aria-pressed="false">Pause movement</button>` : "";
  return `<article class="example">
    <div class="example-head"><h3>${title}</h3><span class="example-tag">${tag}</span>${fateButton}</div>
    <div class="visual${principle.id === "common-fate" ? " fate-visual" : ""}">${renderVisual(principle.id, withPrinciple)}</div>
    <p class="example-copy">${withPrinciple ? principle.withText : `${principle.withoutText} Other Gestalt principles may still be present.`}</p>
  </article>`;
}

function wireFateControls(container) {
  container.querySelectorAll(".fate-control").forEach(button => {
    button.addEventListener("click", () => {
      const visual = button.closest(".example").querySelector(".visual");
      const paused = visual.classList.toggle("is-paused");
      button.textContent = paused ? "Start movement" : "Pause movement";
      button.setAttribute("aria-pressed", String(paused));
    });
  });
}

function makeExplanation(principle) {
  return `<article class="explain-card"><h3>What to notice</h3><p>${principle.withText} In the contrast, ${principle.withoutText.toLowerCase()}</p></article>
    <article class="explain-card"><h3>Why the WITH version works</h3><p>${principle.purpose}</p></article>
    <article class="explain-card"><h3>What becomes harder</h3><p>${principle.notApplied}</p></article>
    <article class="explain-card"><h3>Definition</h3><p>${principle.definition}</p></article>
    <article class="explain-card"><h3>In simple English</h3><p>${principle.student}</p></article>
    <article class="explain-card"><h3>Real-world example</h3><p>${principle.example}</p></article>`;
}

function showComparison() {
  const principle = principleById[currentPrinciple];
  const modes = currentMode === "compare" ? [true, false] : [currentMode === "with"];
  examples.classList.toggle("single", modes.length === 1);
  examples.innerHTML = modes.map(mode => makeExample(principle, mode)).join("");
  wireFateControls(examples);
  document.getElementById("lab-status").textContent = currentMode === "compare"
    ? `Comparing ${principle.name}: the basic information stays the same while one visual relationship changes.`
    : `Showing the ${currentMode === "with" ? "WITH" : "WITHOUT"} ${principle.name} example.`;
  document.querySelectorAll(".mode-button").forEach(button => {
    const active = button.dataset.mode === currentMode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.getElementById("explanation").innerHTML = makeExplanation(principle);
}

function showCompareSection() {
  const principle = principleById[document.getElementById("compare-choice").value];
  const container = document.getElementById("compare-examples");
  container.innerHTML = [true, false].map(mode => makeExample(principle, mode)).join("");
  wireFateControls(container);
  document.getElementById("compare-explanation").innerHTML = `
    <article class="compare-note"><h3>What changed?</h3><p>${principle.withText} ${principle.withoutText} The same visual information is organized differently.</p></article>
    <article class="compare-note"><h3>Why does it matter in UI/UX?</h3><p>${principle.example} Clear visual relationships help people interpret a screen and find related information.</p></article>`;
}

principleList.addEventListener("click", handleCardClick);
advancedList.addEventListener("click", handleCardClick);
function handleCardClick(event) {
  const button = event.target.closest("[data-learn]");
  if (!button) return;
  currentPrinciple = button.dataset.learn;
  principleChoice.value = currentPrinciple;
  currentMode = "compare";
  showComparison();
  document.getElementById("lab").scrollIntoView({ behavior: "smooth" });
}

principleChoice.addEventListener("change", () => {
  currentPrinciple = principleChoice.value;
  currentMode = "compare";
  showComparison();
});
document.querySelectorAll(".mode-button").forEach(button => button.addEventListener("click", () => {
  currentMode = button.dataset.mode;
  showComparison();
}));
document.getElementById("reset-lab").addEventListener("click", () => {
  currentPrinciple = "proximity";
  currentMode = "compare";
  principleChoice.value = currentPrinciple;
  showComparison();
});
document.getElementById("compare-choice").addEventListener("change", showCompareSection);

const questions = [
  { principle: "proximity", prompt: "Which principle is demonstrated by these three close groups of dots?", why: "Nearby dots are perceived as groups because elements close together tend to belong together." },
  { principle: "similarity", prompt: "Which principle helps you group objects that share a visual style?", why: "Similarity links elements that share features such as color, size, or shape." },
  { principle: "closure", prompt: "Which principle helps you recognize this incomplete outline?", why: "Closure is the tendency to mentally complete a recognizable shape with missing parts." },
  { principle: "continuity", prompt: "Which principle guides your eye along a smooth visual path?", why: "Continuity describes how the eye tends to follow smooth lines and sequences." },
  { principle: "figure-ground", prompt: "Which principle separates the foreground shape from its background?", why: "Figure–Ground is how we distinguish a focal figure from the background around it." },
  { principle: "symmetry", prompt: "Which principle is demonstrated by balanced, mirrored forms?", why: "Symmetry makes balanced and mirrored elements feel like a coherent whole." },
  { principle: "common-region", prompt: "Which principle groups items enclosed by the same border?", why: "Common Region groups elements that share an enclosing area." },
  { principle: "proximity", prompt: "A designer places related controls close together. Which principle is at work?", why: "Proximity makes nearby items feel related and helps people identify pairs or groups." },
  { principle: "similarity", prompt: "All primary action buttons use the same color. Which principle does this use?", why: "Similarity groups items that share a visual feature, such as consistent button styling." },
  { principle: "common-region", prompt: "A card encloses a heading and its related details. Which principle is most directly used?", why: "Common Region uses a shared boundary to show that enclosed items belong together." }
];
let quizDeck = [];
let questionIndex = 0;
let answered = 0;
let correct = 0;
let questionLocked = false;

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function updateScore() {
  const percent = answered ? Math.round(correct / answered * 100) : 0;
  document.getElementById("score-percentage").textContent = `${percent}%`;
  document.getElementById("score-answered").textContent = answered;
  document.getElementById("score-correct").textContent = correct;
  document.getElementById("score-incorrect").textContent = answered - correct;
  document.querySelector(".score-track").setAttribute("aria-valuenow", percent);
  document.getElementById("score-fill").style.width = `${percent}%`;
  document.getElementById("recommendation").textContent = answered === 0
    ? "Answer a question for a learning recommendation."
    : percent >= 80
      ? "Great work. Try applying the principles to a screen you use every day."
      : percent >= 50
        ? "Good progress. Revisit the comparisons for any principles you want to strengthen."
        : "Keep exploring. Compare the examples in the lab, then try another round.";
}

function showQuestion() {
  questionLocked = false;
  const content = document.getElementById("quiz-content");
  if (questionIndex >= quizDeck.length) {
    document.getElementById("question-number").textContent = "Round complete";
    document.getElementById("quiz-progress").textContent = `${quizDeck.length} of ${quizDeck.length}`;
    content.innerHTML = `<h3 class="quiz-question">You completed this question set.</h3><p class="quiz-feedback">The questions will be shuffled when you restart.</p><div class="quiz-actions"><button type="button" class="button button-primary" id="quiz-restart">Restart Quiz</button></div>`;
    content.querySelector("#quiz-restart").addEventListener("click", startQuiz);
    return;
  }
  const question = quizDeck[questionIndex];
  const choices = shuffle(mainPrinciples);
  document.getElementById("question-number").textContent = `Question ${questionIndex + 1}`;
  document.getElementById("quiz-progress").textContent = `${questionIndex + 1} of ${quizDeck.length}`;
  content.innerHTML = `<h3 class="quiz-question">Which Gestalt principle is demonstrated here?</h3>
    <div class="quiz-visual">${renderVisual(question.principle, true)}</div>
    <p class="quiz-prompt">${question.prompt}</p>
    <fieldset class="answer-list"><legend class="visually-hidden">Choose a Gestalt principle</legend>
      ${choices.map(p => `<label class="answer-option"><input type="radio" name="quiz-answer" value="${p.id}"><span>${p.name}</span></label>`).join("")}
    </fieldset>
    <p id="quiz-feedback" class="quiz-feedback" aria-live="polite"></p>
    <div class="quiz-actions"><button type="button" class="button button-primary" id="check-answer">Check answer</button><button type="button" class="button secondary" id="next-question" hidden>Next Question</button><button type="button" class="button secondary" id="restart-current">Restart Quiz</button></div>`;
  content.querySelector("#check-answer").addEventListener("click", checkAnswer);
  content.querySelector("#next-question").addEventListener("click", () => { questionIndex++; showQuestion(); });
  content.querySelector("#restart-current").addEventListener("click", startQuiz);
}

function checkAnswer() {
  if (questionLocked) return;
  const selected = document.querySelector('input[name="quiz-answer"]:checked');
  const feedback = document.getElementById("quiz-feedback");
  if (!selected) {
    feedback.textContent = "Choose an answer before checking.";
    return;
  }
  questionLocked = true;
  answered++;
  const question = quizDeck[questionIndex];
  const isCorrect = selected.value === question.principle;
  if (isCorrect) correct++;
  const answerName = principleById[question.principle].name;
  feedback.textContent = `${isCorrect ? "Correct! " : `Not quite—the answer is ${answerName}. `}${question.why}`;
  feedback.className = `quiz-feedback ${isCorrect ? "correct" : "incorrect"}`;
  document.querySelectorAll('input[name="quiz-answer"]').forEach(input => { input.disabled = true; });
  document.getElementById("check-answer").disabled = true;
  document.getElementById("next-question").hidden = false;
  updateScore();
}

function startQuiz() {
  quizDeck = shuffle(questions);
  questionIndex = 0;
  answered = 0;
  correct = 0;
  updateScore();
  showQuestion();
}

const checklistQuestions = [
  "Are related items grouped closely?",
  "Are similar items visually consistent?",
  "Can incomplete forms still be recognized?",
  "Do visual paths guide the eyes naturally?",
  "Is the main content distinguishable from the background?",
  "Is the layout visually balanced?",
  "Are related items enclosed in a common region when appropriate?"
];

function renderChecklist() {
  const form = document.getElementById("checklist-form");
  form.innerHTML = checklistQuestions.map((question, index) => `<fieldset class="check-row">
    <legend>${question}</legend><div class="check-options">
      ${[["yes","Yes"],["no","No"],["unsure","Not Sure"]].map(([value,label]) => `<label class="check-option"><input type="radio" name="check-${index}" value="${value}" aria-label="${label}: ${question}"><span>${label}</span></label>`).join("")}
    </div></fieldset>`).join("");
  form.addEventListener("change", updateChecklist);
}

function updateChecklist() {
  const selections = checklistQuestions.map((_,i) => document.querySelector(`input[name="check-${i}"]:checked`));
  const count = selections.filter(Boolean).length;
  const result = document.getElementById("checklist-result");
  if (count < checklistQuestions.length) {
    const remaining = checklistQuestions.length - count;
    result.innerHTML = `<strong>${count} of ${checklistQuestions.length} reviewed</strong><p>${remaining} ${remaining === 1 ? "item remains" : "items remain"}. Choose an answer for each item to see your reflection.</p>`;
    return;
  }
  const yesCount = selections.filter(item => item.value === "yes").length;
  const noCount = selections.filter(item => item.value === "no").length;
  const unsureCount = selections.filter(item => item.value === "unsure").length;
  const reflection = yesCount >= 6
    ? "Many helpful visual relationships are present. Check that the hierarchy supports the most important task."
    : yesCount >= 3
      ? "Some visual relationships are working well. Review the No and Not Sure answers and test one change at a time."
      : "There may be opportunities to strengthen grouping, clarity, and balance. Try changing one principle at a time.";
  result.innerHTML = `<strong>${yesCount} Yes · ${noCount} No · ${unsureCount} Not Sure</strong><p>${reflection} This is a learning aid, not a scientifically validated psychological measurement.</p>`;
}

document.getElementById("checklist-reset").addEventListener("click", () => {
  document.getElementById("checklist-form").reset();
  updateChecklist();
});

function setupTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const label = document.getElementById("theme-label");
  const icon = toggle.querySelector("span");
  const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const setTheme = dark => {
    root.dataset.theme = dark ? "dark" : "light";
    toggle.setAttribute("aria-pressed", String(dark));
    label.textContent = dark ? "Light mode" : "Dark mode";
    icon.textContent = dark ? "☼" : "◐";
  };
  setTheme(systemDark);
  toggle.addEventListener("click", () => setTheme(root.dataset.theme !== "dark"));
}

populatePrinciples();
renderChecklist();
showComparison();
showCompareSection();
startQuiz();
setupTheme();
