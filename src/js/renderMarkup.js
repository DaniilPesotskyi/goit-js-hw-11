function renderCardsMarkup(data) {
    return data.map(({webformatURL,largeImageURL, tags, likes, views, comments, downloads}) => `
        <a href="${largeImageURL}" onclick="event.preventDefault()" class="photo-card">
            <img class="card-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes: ${likes}</b>
                </p>
                <p class="info-item">
                    <b>Views: ${views}</b>
                </p>
                <p class="info-item">
                    <b>Comments: ${comments}</b>
                </p>
                <p class="info-item">
                    <b>Downloads: ${downloads}</b>
                </p>
            </div>
        </a>`
    ).join('')
}

export default renderCardsMarkup;