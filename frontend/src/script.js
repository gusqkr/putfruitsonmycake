export const Letter = () => {
    let selectedTheme = null;

  const items = document.querySelectorAll(".item");

  if (items.length > 0) {
    items.forEach(item => {
      item.addEventListener("click", () => {
        items.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        selectedTheme = item.dataset.theme;
      });
    });
  }
}