import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
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

        if(searchApi.pageNumber === 1) {
            Notify.success(`Hooray! We found ${data.totalHits} images.`);
        }

        if(searchApi.pageNumber > 1) {
            Notify.success(`Hooray! 40 more images uploaded`);
        }

        searchApi.incrementPage()

        
        refs.gallery.insertAdjacentHTML('beforeend', renderCardsMarkup(data.hits))
        gallery.refresh();
        
    } catch (error) {
        Notify.failure('Ooops, something went wrong...')
        console.log(error)
    }
}

function clearCardsMarkup() {
    refs.gallery.innerHTML = '';
}

const gallery = new simpleLightbox(".photo-card a", {
	captions: true,
	captionSelector: "img",
	captionType: "attr",
	captionsData: "alt",
	captionPosition: "bottom",
	captionDelay: 250,
});


// Inf scroll 

function checkPosition() {
    const height = document.body.offsetHeight
    const screenHeight = window.innerHeight
  
    const scrolled = window.scrollY

    const threshold = height - screenHeight / 4
  
    const position = scrolled + screenHeight
  
    if (position >= threshold) {
        fetchAndInsertImages()
    }
  }

(() => {
    window.addEventListener('scroll', throttle(checkPosition, 250))
    window.addEventListener('resize', throttle(checkPosition, 250))
})()