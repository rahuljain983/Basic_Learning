const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const navigationElements = [...document.getElementsByClassName('overlay')[0].getElementsByTagName('li')];
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');

function toggleNav(e) {
    // Toggle our Menu bar 
    menuBars.classList.toggle('change');
    // Toggle our menu.
    // we are just using this class to identify whether we need to show the menu or not.
    overlay.classList.toggle('overlay-active');

    if (overlay.classList.contains('overlay-active')) {
        // overlay.classList.add('overlay-slide-right');
        // overlay.classList.remove('overlay-slide-left');

        overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
        navigationElements.forEach((element, index) => {
            // element.classList.remove(`slide-out-${index + 1}`);
            // element.classList.add(`slide-in-${index + 1}`);

            element.classList.replace(`slide-out-${index + 1}`, `slide-in-${index + 1}`);
        });
        // nav1.classList.remove('slide-out-1');
        // nav1.classList.add('slide-in-1');
        // nav2.classList.remove('slide-out-2')
        // nav2.classList.add('slide-in-2');
        // nav3.classList.remove('slide-out-3');
        // nav3.classList.add('slide-in-3');
        // nav4.classList.remove('slide-out-4');
        // nav4.classList.add('slide-in-4');
        // nav5.classList.remove('slide-out-5');
        // nav5.classList.add('slide-in-5');
    } else {
        overlay.classList.add('overlay-slide-left');
        overlay.classList.remove('overlay-slide-right');
        navigationElements.forEach((element, index) => {
            // element.classList.remove(`slide-in-${index + 1}`);
            // element.classList.add(`slide-out-${index + 1}`);

            element.classList.replace(`slide-in-${index + 1}`, `slide-out-${index + 1}`);
        });

        // nav1.classList.add('slide-out-1')
        // nav1.classList.remove('slide-in-1');
        // nav2.classList.add('slide-out-2');
        // nav2.classList.remove('slide-in-2');
        // nav3.classList.add('slide-out-3');
        // nav3.classList.remove('slide-in-3');
        // nav4.classList.add('slide-out-4');
        // nav4.classList.remove('slide-in-4');
        // nav5.classList.add('slide-out-5');
        // nav5.classList.remove('slide-in-5');
    }
}

menuBars.addEventListener('click', toggleNav);

[...document.getElementsByClassName('overlay')[0].getElementsByTagName('li')]
    .forEach(element => element.addEventListener('click', toggleNav));

// nav1.addEventListener('click', toggleNav);
// nav2.addEventListener('click', toggleNav);
// nav3.addEventListener('click', toggleNav);
// nav4.addEventListener('click', toggleNav);
// nav5.addEventListener('click', toggleNav);