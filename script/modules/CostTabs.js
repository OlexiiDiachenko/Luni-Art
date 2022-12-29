export function tabelCost() {
  let input = this.previousElementSibling;
  if (input.checked) {
    return;
  } else {
    let thisId = this.getAttribute("for"),
      activeBlock = document.querySelector(".size-cost-block.active");
    activeBlock.classList.remove("active");
    let newActiveBlock = document.querySelector(`.${thisId}-tabel`);
    newActiveBlock.classList.add("active");
  }
}

export function mobileTabelCost() {
  let input = this.previousElementSibling;
  if (input.checked) {
    return;
  } else {
    let thisId = this.getAttribute("data-for"),
      activeBlock = document.querySelector(".size-cost-block.active");
    activeBlock.classList.remove("active");
    let newActiveBlock = document.querySelector(`.${thisId}-tabel`);
    newActiveBlock.classList.add("active");
  }
}
