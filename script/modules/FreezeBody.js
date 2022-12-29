export const setBody = (body) => {
  body.style.top = -scrollY;
  body.classList.add("noscroll");
};

export const openBody = (body) => {
  body.classList.remove("noscroll");
};
