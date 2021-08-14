(function() {
    let slidePosition = 0;
    const slides = document.getElementsByClassName('carousel_item');
    const totalSlides = slides.length;
    console.log(totalSlides);
    
    const prevButton = document.getElementById('carousel__button-prev');
    const nextButton = document.getElementById('carousel__button-next');
    
    prevButton.addEventListener(('click'), () => {
        console.log('Previous clicked.')
    });
    
    nextButton.addEventListener(('click'), () => {
        slides[slidePosition % slides.length].classList.add('carousel_item-hidden');
        slides[slidePosition % slides.length].classList.remove('carousel_item-visible');
        slides[++slidePosition % slides.length].classList.add('carousel_item-visible');
    });
    
    prevButton.addEventListener(('click'), () => {
        slides[slidePosition % slides.length].classList.add('carousel_item-hidden');
        slides[slidePosition % slides.length].classList.remove('carousel_item-visible');
        if (slidePosition === 0) {
            slidePosition = totalSlides - 1;
        } else {
            slidePosition--;
        }
        slides[slidePosition % slides.length].classList.add('carousel_item-visible');
    
    });
})();
