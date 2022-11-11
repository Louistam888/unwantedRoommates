const photos = {}

photos.track = document.querySelector(".track"); 
photos.slides = Array.from(photos.track.children)

photos.nextButton = document.querySelector(".carouselButtonRight");
photos.prevButton = document.querySelector(".carouselButtonLeft");
photos.carouselNav = document.querySelector(".carouselNav");
// console.log(Array.from(photos.carouselNav.children))

photos.dotsArray = Array.from(photos.carouselNav.children);

photos.slideWidth = photos.slides[0].getBoundingClientRect().width;

photos.setSlidePosition = (slide, index) => {
  slide.style.left = photos.slideWidth * index + "px";
}

photos.slides.forEach(photos.setSlidePosition);

photos.moveToSlide = (track, currentSlide, targetSlide) => {
  photos.track.style.transform = 'translateX(-'+ targetSlide.style.left +')'
  currentSlide.classList.remove("currentSlide")
  targetSlide.classList.add("currentSlide")
}

photos.updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("currentSlide");
  targetDot.classList.add("currentSlide");
}

photos.hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    photos.prevButton.classList.add("isHidden");
    photos.nextButton.classList.remove("isHidden")
  } else if (targetIndex === slides.length - 1) {
    photos.prevButton.classList.remove("isHidden");
    photos.nextButton.classList.add("isHidden")
  } else {
    photos.prevButton.classList.remove("isHidden");
    photos.nextButton.classList.remove("isHidden");
  }
}

photos.events = () => {

  photos.prevButton.addEventListener("click", (event)=> {
    const currentSlide = photos.track.querySelector(".currentSlide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = photos.carouselNav.querySelector(".currentSlide");
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = photos.slides.findIndex(slide => slide === prevSlide);

    photos.moveToSlide(photos.track, currentSlide, prevSlide);
    photos.updateDots(currentDot, prevDot);
    photos.hideShowArrows(photos.slides, photos.prevButton, photos.nextButton, prevIndex);
  })

  photos.nextButton.addEventListener("click", (event)=> {
    const currentSlide = photos.track.querySelector(".currentSlide");
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = photos.carouselNav.querySelector(".currentSlide");
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = photos.slides.findIndex(slide => slide === nextSlide);

    photos.moveToSlide(photos.track,currentSlide,nextSlide);
    photos.updateDots(currentDot, nextDot);
    photos.hideShowArrows(photos.slides, photos.prevButton, photos.nextButton, nextIndex);
  });

  photos.carouselNav.addEventListener("click", (event)=> {
    const targetDot = event.target.closest("button");

    const currentSlide = photos.track.querySelector(".currentSlide");
    const currentDot = photos.carouselNav.querySelector(".currentSlide");
    const targetIndex = dotsArray.findIndex(dot => dot === targetDot) 
    const targetSlide = photos.slides[targetIndex];

    photos.moveToSlide(photos.track, currentSlide, targetSlide)
    photos.updateDots(currentDot, targetDot);
    photos.hideShowArrows(photos.slides, photos.prevButton, photos.nextButton, targetIndex);
  });
}

photos.init = () => {
  photos.events();
}

photos.init();

