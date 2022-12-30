export const setBlocks = (animatedElements, locationsArr) => {
  for (let i = 0; i < animatedElements.length; i++) {
    let child = animatedElements[i];
    let childLocation = child.getBoundingClientRect().top;

    if (childLocation !== 0) {
      locationsArr[i] = childLocation;
    }
  }
};

export const setAnimation = (locationsArr, distance, elements) => {
  window.onscroll = () => {
    for (let number in locationsArr) {
      if (scrollY > locationsArr[number] - distance) {
        let animation = elements[number].getAttribute("data-animation");
        elements[number].classList.add(animation);
      }
    }
  };
};
