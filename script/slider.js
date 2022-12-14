function navigation(slider) {
  let wrapper, dots, arrowLeft, arrowRight;

  function markup(remove) {
    wrapperMarkup(remove);
    dotMarkup(remove);
    arrowMarkup(remove);
  }

  function removeElement(elment) {
    elment.parentNode.removeChild(elment);
  }
  function createDiv(className) {
    var div = document.createElement("div");
    var classNames = className.split(" ");
    classNames.forEach((name) => div.classList.add(name));
    return div;
  }

  function arrowMarkup(remove) {
    if (remove) {
      removeElement(arrowLeft);
      removeElement(arrowRight);
      return;
    }
    arrowLeft = createDiv("arrow arrow--left");
    arrowLeft.addEventListener("click", () => slider.prev());
    arrowRight = createDiv("arrow arrow--right");
    arrowRight.addEventListener("click", () => slider.next());

    wrapper.appendChild(arrowLeft);
    wrapper.appendChild(arrowRight);
  }

  function wrapperMarkup(remove) {
    if (remove) {
      var parent = wrapper.parentNode;
      while (wrapper.firstChild)
        parent.insertBefore(wrapper.firstChild, wrapper);
      removeElement(wrapper);
      return;
    }
    wrapper = createDiv("navigation-wrapper");
    slider.container.parentNode.appendChild(wrapper);
    wrapper.appendChild(slider.container);
  }

  function dotMarkup(remove) {
    if (remove) {
      removeElement(dots);
      return;
    }
    dots = createDiv("dots");
    slider.track.details.slides.forEach((_e, idx) => {
      var dot = createDiv("dot");
      dot.addEventListener("click", () => slider.moveToIdx(idx));
      dots.appendChild(dot);
    });
    wrapper.appendChild(dots);
  }

  function updateClasses() {
    var slide = slider.track.details.rel;
    Array.from(dots.children).forEach(function (dot, idx) {
      idx === slide
        ? dot.classList.add("dot--active")
        : dot.classList.remove("dot--active");
    });
  }

  slider.on("created", () => {
    markup();
    updateClasses();
  });
  slider.on("optionsChanged", () => {
    markup(true);
    markup();
    updateClasses();
  });
  slider.on("slideChanged", () => {
    updateClasses();
  });
  slider.on("destroyed", () => {
    markup(true);
  });
}

let slidersTwo = document.querySelectorAll(".slider_size"),
  slidersThree = document.querySelectorAll(".slider_three"),
  slidersMobile = document.querySelectorAll(".slider_mobile");

slidersTwo.forEach((slider) => {
  let slider_two_items = new KeenSlider(
    slider,
    {
      loop: true,
      mode: "free-snap",
      slides: {
        perView: 2,
        spacing: 15,
      },
      breakpoints: {
        "(max-width: 1350px)": {
          mode: "snap",
          slides: {
            perView: 2,
            spacing: 25,
          },
        },
      },
    },
    [navigation]
  );
});

slidersThree.forEach((slider) => {
  let slider_three_items = new KeenSlider(
    slider,
    {
      loop: true,
      mode: "free-snap",
      slides: {
        perView: 3,
        spacing: 25,
      },
      breakpoints: {
        "(max-width: 1350px)": {
          mode: "snap",
          slides: {
            perView: 2,
            spacing: 25,
          },
        },
      },
    },
    [navigation]
  );
});

slidersMobile.forEach((slider) => {
  let slider_one_item = new KeenSlider(
    slider,
    {
      loop: true,
      mode: "snap",
      slides: {
        perView: 1,
        spacing: 15,
      },
    },
    [navigation]
  );
});
