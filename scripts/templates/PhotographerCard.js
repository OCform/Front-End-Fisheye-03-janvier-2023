class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer;
    }

    createPhotographerCard() {
        const $wrapper = document.createElement('article');
        $wrapper.classList.add('photographer-card-wrapper');

        const photographerCard = `
            <a href="/photographer.html?name=${this._photographer.name}&idPhotographer=${this._photographer.id}&city=${this._photographer.city}&country=${this._photographer.country}&tagline=${this._photographer.tagline}&price=${this._photographer.price}&portrait=${this._photographer.portrait}">
                <div class="photographer center">
                    <img
                        alt=""
                        src="${this._photographer.portrait}"
                    />
                </div>
                <h2 class="name center">${this._photographer.name}</h2>
            </a>
            <p class="location center">
                <span>${this._photographer.city}, ${this._photographer.country}</span>
            </p>
            <p class="tagline center">
                <span>${this._photographer.tagline}</span>
            </p>
            <p class="price center">
                <span>${this._photographer.price}€/jour</span>
            </p>
        `;
        
        $wrapper.innerHTML = photographerCard;
        return $wrapper;
    }
}