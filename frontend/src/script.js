export const Letter = () => {
    let selectedTheme = null;

  const items = document.querySelectorAll(".item");
  const goLetterBtn = document.getElementById("goLetter");

  if (items.length > 0) {
    items.forEach(item => {
      item.addEventListener("click", () => {
        items.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        selectedTheme = item.dataset.theme;
      });
    });
  }

  if (goLetterBtn) {
    goLetterBtn.addEventListener("click", () => {
      if (!selectedTheme) {
        alert("디자인을 선택해주세요!");
        return;
      }

      window.location.href = `letter.html?theme=${selectedTheme}`;
    });
  }

  const letterTextarea = document.querySelector(".letter-input");
  const count = document.querySelector(".count");

  if (letterTextarea && count) {
    letterTextarea.addEventListener("input", () => {
      count.textContent = `${letterTextarea.value.length} / 850`;
    });
  }
}
