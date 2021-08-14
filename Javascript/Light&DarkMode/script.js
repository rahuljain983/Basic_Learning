const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

let savedTheme = localStorage.getItem('theme');
const defaultTheme = savedTheme !== null ? savedTheme : 'light';


const themeObject = {
    'dark': {
        'nav': {
            'backgroundColor': 'rgb(0 0 0 / 50%)'
        },
        'textbox': {
            'backgroundColor': 'rgb(255 255 255 / 50%)'
        },
        'image1': {
            'src': 'img/undraw_proud_coder_dark.svg'
        },
        'image2': {
            'src': 'img/undraw_conceptual_idea_dark.svg'
        },
        'image3': {
            'src': 'img/undraw_feeling_proud_dark.svg'
        },
        'toggleIconSpan': {
            'textContent': 'Dark Mode'
        },
        'toggleDisplayIcon': {
            'addClass': 'fa-moon',
            'removeClass': 'fa-sun'
        }
    },
    'light': {
        'nav': {
            'backgroundColor': 'rgb(255 255 255 / 50%)'
        },
        'textbox': {
            'backgroundColor': 'rgb(0 0 0 / 50%)'
        },
        'image1': {
            'src': 'img/undraw_proud_coder_light.svg'
        },
        'image2': {
            'src': 'img/undraw_conceptual_idea_light.svg'
        },
        'image3': {
            'src': 'img/undraw_feeling_proud_light.svg'
        },
        'toggleIconSpan': {
            'textContent': 'Light Mode'
        },
        'toggleDisplayIcon': {
            'addClass': 'fa-sun',
            'removeClass': 'fa-moon'
        }
    }
}

function setTheme(selectedTheme) {
    nav.style.backgroundColor = themeObject[selectedTheme].nav.backgroundColor;
    textBox.style.backgroundColor = themeObject[selectedTheme].textbox.backgroundColor;
    toggleIcon.children[0].textContent = themeObject[selectedTheme].toggleIconSpan.textContent;
    toggleIcon.children[1].classList.replace(themeObject[selectedTheme].toggleDisplayIcon.removeClass, themeObject[selectedTheme].toggleDisplayIcon.addClass);
    image1.src = themeObject[selectedTheme].image1.src;
    image2.src = themeObject[selectedTheme].image2.src;
    image3.src = themeObject[selectedTheme].image3.src;
}


function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        setTheme('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        setTheme('light');
    }
}

toggleSwitch.addEventListener("change", switchTheme);
if (defaultTheme) {
    document.documentElement.setAttribute('data-theme', defaultTheme);

    if (defaultTheme === 'dark') {
        toggleSwitch.checked = true;
        setTheme('dark');
    }
}

