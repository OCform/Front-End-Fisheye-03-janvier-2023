class PhotograperApp {
    constructor() {
        this.$photographerHeader = document.querySelector('.photographer-header');
        this.$mediasWrapper = document.querySelector('.medias-wrapper');
        this.$label = document.querySelector('.medias-wrapper .cartouche');

        this.$totalLikes = 0;
    }

    async main() {
        this.params = new URLSearchParams(document.location.search);
        this.name = this.params.get("name");
        this.idPhotographer = parseInt(this.params.get("idPhotographer"));        
        this.city = this.params.get("city");
        this.country = this.params.get("country");
        this.tagline = this.params.get("tagline");
        this.price = this.params.get("price");
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
                    this.$totalLikes = this.$totalLikes + media.likes;                                                   
                    const Template = mediaCardWithPlayer(new MediaCard(media, this.WishlistSubject));
                    this.$mediasWrapper.appendChild(
                        Template.createMediaCard()
                    );
                }
            });
            const likes = `
                <span><div>${this.$totalLikes}</div> <em class="fa fa-heart" aria-hidden="true"></em></span>
                <div>${this.price}€/jour</div>
            `;
        this.$label.innerHTML = likes;
    }
}

const photographerApp = new PhotograperApp();
photographerApp.main();