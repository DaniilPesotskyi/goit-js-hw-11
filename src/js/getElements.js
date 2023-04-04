import axios from 'axios';

export default class getElementsAPI {
    #BASE_URL = 'https://pixabay.com/';
    #API_KEY = '35032978-dd517b2e1f79f34a9f05731b1';
    #searchParams = new URLSearchParams({
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
      });

    #searchQuery = '';
    #pageNumber = 1;

    async getImages() {
        const response = await axios.get(`${this.#BASE_URL}api/?key=${this.#API_KEY}&q=${this.#searchQuery}&${this.#searchParams}&page=${this.#pageNumber}`)
        return response.data
    }

    set query(newQuery) {
        this.#searchQuery = newQuery
    }

    get pageNumber() {
        return this.#pageNumber
    }

    incrementPage() {
        this.#pageNumber += 1
    }

    reset() {
        this.#pageNumber = 1
    }
}