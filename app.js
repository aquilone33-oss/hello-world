const puzzles = [
  {
    id: 1,
    answers: ["4"],
    hint: "3x + 2x − 5x = 0x, rimane solo 4.",
  },
  {
    id: 2,
    answers: ["3a+6", "3a + 6"],
    hint: "2(a + 3) = 2a + 6, poi aggiungi a.",
  },
  {
    id: 3,
    answers: ["8y-1", "8y - 1"],
    hint: "5y + 3y = 8y, -2 + 1 = -1.",
  },
  {
    id: 4,
    answers: ["6"],
    hint: "x² + 3x − 4 con x=2 => 4 + 6 − 4.",
  },
];

const solved = new Set();
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const finalMessage = document.getElementById("finalMessage");
const exitCode = document.getElementById("exitCode");

function normalize(value) {
  return value.replace(/\s+/g, "").toLowerCase();
}

function updateProgress() {
  const total = puzzles.length;
  const current = solved.size;
  const percent = Math.round((current / total) * 100);
  progressFill.style.width = `${percent}%`;
  progressText.textContent = `${current}/${total} porte aperte`;

  if (current === total) {
    finalMessage.textContent =
      "Complimenti! Hai trovato tutte le soluzioni: la porta finale è aperta.";
    exitCode.textContent = "ALFA";
  }
}

function setFeedback(id, message, type) {
  const feedback = document.getElementById(`feedback${id}`);
  feedback.textContent = message;
  feedback.classList.remove("success", "error");
  feedback.classList.add(type);
}

function checkAnswer(id) {
  const puzzle = puzzles.find((entry) => entry.id === id);
  const input = document.getElementById(`answer${id}`);
  const value = normalize(input.value);

  if (!value) {
    setFeedback(id, "Inserisci una risposta prima di sbloccare.", "error");
    return;
  }

  if (puzzle.answers.includes(value)) {
    setFeedback(id, "Porta sbloccata! Ottimo lavoro.", "success");
    solved.add(id);
    input.disabled = true;
  } else {
    setFeedback(id, `Non ancora. Suggerimento: ${puzzle.hint}`, "error");
  }

  updateProgress();
}

document.querySelectorAll("button[data-check]").forEach((button) => {
  const id = Number(button.dataset.check);
  button.addEventListener("click", () => checkAnswer(id));
});

updateProgress();
