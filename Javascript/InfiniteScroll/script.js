const count = 10;
const apiKey = 'G0pKNtwcuD1f768kIGrDG3U8fqjsVKF_st9ikuJg60U'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const laoderElement = document.getElementById('loader');
const imageContainer = document.getElementById('image-container');
let photosData , ready = false, imagesLoaded = 0 , totalImages = 0;

// IMAGE LOADER FUNCTION
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        laoderElement.hidden = true;
        ready = true;
    }
}

// This is a very good way to set attributes and make sure that we are not repeating ourselves
// Following the DRY Principle.
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosData.length;
    photosData.forEach(element => {
        const anchorElement = document.createElement('a');
        const imageElement = document.createElement('img');
        setAttributes(anchorElement, {
            href: element.links.html,
            target: '_blank'
        })

        setAttributes(imageElement, {
            alt: element.alt_description,
            src: element.urls.regular
        });
        imageElement.addEventListener("load", imageLoaded);
        anchorElement.appendChild(imageElement);
        imageContainer.appendChild(anchorElement);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosData = await response.json();
        displayPhotos();
    } catch (error) {
    }
}

// checking to see if scrolling near the bottom of the page, we need to load more photos.
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// running the function here
getPhotos();


