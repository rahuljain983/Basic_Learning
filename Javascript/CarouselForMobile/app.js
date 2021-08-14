const slider = document.querySelector('.slider-container'),
    slides = Array.from(document.querySelectorAll('.slide'));

let isDragging = false,
    startPosition = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationId = 0,
    currentIndex = 0

slides.forEach((slide, index) => {
    const slideImage = slide.querySelector('img');
    slideImage.addEventListener('dragstart', (e) => e.preventDefault());

    // Touch events
    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd);
    slide.addEventListener('touchmove', touchMove);

    // Mouse events
    slide.addEventListener('mousedown', touchStart(index));
    slide.addEventListener('mouseup', touchEnd);
    slide.addEventListener('mouseleave', touchEnd);
    slide.addEventListener('mousemove', touchMove);
});

// disable context menu
window.oncontextmenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

function getXPosition(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    if (isDragging) {
        slider.style.transform = `translateX(${currentTranslate}px)`
        requestAnimationFrame(animation);
    }
}

function touchStart(index) {
    return function (event) {
        currentIndex = index;
        startPosition = getXPosition(event);
        isDragging = true;
        animationId = requestAnimationFrame(animation);
        slider.classList.add('grabbing');
    }
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationId);
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentIndex < slides.length - 1) {
        currentIndex++;
    }
    if (movedBy > 100 && currentIndex > 0) {
        currentIndex--;
    }
    setPositionByIndex();
    slider.classList.remove('grabbing');
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate;
    slider.style.transform = `translateX(${currentTranslate}px)`
}


function touchMove(e) {
    if (isDragging) {
        const currentPosition = getXPosition(e);
        currentTranslate = prevTranslate + currentPosition - startPosition;
    }
}

