class PhotograperApp {
    constructor() {
        this.$photographerHeader = document.querySelector('.photographer-header');
        this.$mediasWrapper = document.querySelector('.medias-wrapper');

        // Medias array
        this.$Medias = [];
    }

    async main() {

        this.params = new URLSearchParams(document.location.search);
        this.name = this.params.get("name");
        this.idPhotographer = parseInt(this.params.get("idPhotographer"));        
        this.city = this.params.get("city");
        this.country = this.params.get("country");
        this.tagline = this.params.get("tagline");
        this.portrait = this.params.get("portrait");

        const photographerHeader = `
            <div class="photographer-cartridge">
                <h1><div class="photographer-name">${this.name}</div></h1>
                <div class="photographer-location">${this.city}, ${this.country}</div>
                <div class="photographer-tagline">${this.tagline}</div>
            </div>
            <button type="button" class="contact-button" onclick="displayModal()">Contactez-moi</button>
            <div class="photographer-portrait">
                <img src="${this.portrait}" alt="${this.name}"/>
            </div>
        `;
        this.$photographerHeader.innerHTML = photographerHeader;

        // Ici je récupère les medias de mon fichier photographers.json
        const mediasData = [await(await fetch('/data/photographers.json')).json()][0].media;
        
        mediasData
            // Ici, je transforme mon tableau de données en un tableau de classe Factory
            .map(media => new PhotographerFactory(media, 'media'))
            .forEach(media => {
                if(media.photographerId === this.idPhotographer) {
                    this.$Medias.push(media);
                    const Template = mediaCardWithPlayer(new MediaCard(media));
                    this.$mediasWrapper.appendChild(
                        Template.createMediaCard()
                    );
                }
            });
    }
}

const photographerApp = new PhotograperApp();
photographerApp.main();