
const addBookmarkButton = document.querySelector('#add-bookmark');
const closeModalButton = document.querySelector('.close-icon');
const dialogModal = document.querySelector('#modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteName = document.getElementById('website-name');
const websiteURL = document.getElementById('website-url');
const bookmarkContainer = document.getElementById('bookmarks-container');
const itemContainer = document.getElementsByClassName('items')[0];

const bookmarkTemplate = `
<i class="fas fa-times-circle" id="delete-bookmark" title="Delete Bookmark" onclick="deleteBookmark('{{websiteURL}}')"></i>
<div class="name">
    <img src="https://www.google.com/s2/u/0/favicons?domain={{websiteURL}}" alt="favicon">
    <a class="item-link" href="{{websiteURL}}" target="_blank">{{websiteName}}</a>
</div>
`;

let bookMarks = localStorage.getItem('bookmarks') === null ? [] : JSON.parse(localStorage.getItem('bookmarks'));

function deleteBookmark(url) {
    // remove from the bookmarks and then render bookmark
    bookMarks.forEach((bookmark, index) => {
        if (bookmark.url === url) bookMarks.splice(index, 1);
    });
    bookMarks.length > 0 ? localStorage.setItem('bookmarks', bookMarks) : localStorage.removeItem('bookmarks');
    // Re-populate the DOM
    bookmarkContainer.getElementsByClassName('items')[0].innerHTML = '';
    bookMarks.forEach(bookmark => renderBookMark(bookmark));
}

// This is a helper method to render the bookmark
function renderBookMark(bookMark) {
    let bookMarkHTML = bookmarkTemplate.replace(new RegExp("{{websiteURL}}", 'g'), bookMark.url);
    bookMarkHTML = bookMarkHTML.replace(new RegExp('{{websiteName}}', 'g'), bookMark.name);
    let itemDIV = document.createElement('div');
    itemDIV.classList.add('item');
    itemDIV.innerHTML = bookMarkHTML;
    itemContainer.appendChild(itemDIV);
}

// Show modal
function showModal() {
    dialogModal.classList.add('show-modal');
    websiteName.focus();
}

addBookmarkButton.addEventListener('click', showModal);

// Hide modal
closeModalButton.addEventListener('click', (e) => {
    dialogModal.classList.remove('show-modal');
})

// Hide the modal by clicking anywhere outside of it.
window.addEventListener('click', (e) => e.target === dialogModal ? dialogModal.classList.remove('show-modal') : false)

// Validata Form
function validate(nameValue, urlValue) {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
        alert('please provide values for both fields');
        return false;
    }
    if (!urlValue.match(regex)) {
        alert('Please provide a valid web address');
        return false;
    }
    // Valid
    return true;
}

function addBookMark(nameValue, urlValue) {
    let bookmark = {
        name: nameValue,
        url: urlValue
    }
    bookMarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookMarks));
    bookmarkForm.reset();
    websiteName.focus();
    renderBookMark(bookmark);
}



function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteName.value;
    let urlValue = websiteURL.value;
    if (!urlValue.includes('http://') && !urlValue.includes('https://')) {
        urlValue = `https://${urlValue}`
    }
    if (!validate(nameValue, urlValue)) {
        return false;
    }
    addBookMark(nameValue, urlValue);
}

// First time render the previous bookmarks
bookMarks.forEach(bookmark => renderBookMark(bookmark));

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark);
