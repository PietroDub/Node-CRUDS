document.querySelectorAll("[data-quiz]").forEach((quiz) => {
  const key = JSON.parse(quiz.querySelector("[data-key]").textContent);
  const reasons = JSON.parse(quiz.querySelector("[data-reasons]").textContent);
  const feedback = quiz.querySelector("[data-feedback]");

  quiz.querySelector("[data-check]").addEventListener("click", () => {
    const names = Object.keys(key);
    let correct = 0;
    const missed = [];

    names.forEach((name) => {
      const chosen = quiz.querySelector(`input[name="${name}"]:checked`);
      const ok = chosen && chosen.value === key[name];
      quiz.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
        input.closest("label").style.fontWeight = "400";
      });
      if (ok) {
        correct += 1;
        chosen.closest("label").style.fontWeight = "700";
      } else if (chosen) {
        missed.push(reasons[name]);
      } else {
        missed.push(reasons[name]);
      }
    });

    feedback.classList.remove("ok", "bad");
    if (correct === names.length) {
      feedback.classList.add("ok");
      feedback.textContent = `${correct} de ${names.length}. A ordem ficou de pé.`;
    } else {
      feedback.classList.add("bad");
      feedback.textContent = `${correct} de ${names.length}. ${missed.join(" ")}`;
    }
  });
});
