import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getElemenstApi from './getElements';
import renderCardsMarkup from './renderMarkup';

const refs = {
    searchForm: document.getElementById('search-form'),
    gallery: document.querySelector('.gallery'),
}

// Init API class
const searchApi = new getElemenstApi()

// Add event on form submit
refs.searchForm.addEventListener('submit', onFormSubmit)
// Add event listener on image click
refs.gallery.addEventListener('click', onImageClick)

// Form submit function
function onFormSubmit(e) {
    // Disable default restart page
    e.preventDefault()
    // Clear markup
    clearCardsMarkup()
    // Take a search query
    const searchQuery = refs.searchForm.elements.searchQuery.value.trim()
    // Give value to search api query
    searchApi.query = searchQuery.trim();
    // Check on empty input
    if (searchQuery === '' || searchQuery === ' ') {
        Notify.failure('Please fill out the search field');
        return;
    }

    fetchAndInsertImages()
}

async function fetchAndInsertImages() {
    try {
        const data = await searchApi.getImages()
        if (data.hits.length === 0) {
            Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
        }

        if (searchApi.pageNumber === 1) {
            Notify.success(`Hooray! We found ${data.totalHits} images.`);
        }
        refs.gallery.insertAdjacentHTML('beforeend', renderCardsMarkup(data.hits))
    } catch (error) {
        Notify.failure('Ooops, something went wrong...')
    }
}

function onImageClick(e) {
    console.log(e.target)
}

function clearCardsMarkup() {
    refs.gallery.innerHTML = '';
}