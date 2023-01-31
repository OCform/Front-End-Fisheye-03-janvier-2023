class PhotograperApp {
    constructor() {
        this.$photographerHeader = document.querySelector('.photographer-header');
        this.$mediasWrapper = document.querySelector('.medias-wrapper');
        this.$price = document.querySelector('.price');
        this.$TotaLL = document.querySelector('.total-likes');
        
        this.$totalLikes = [];
        this.$sumLikes = 0;
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
                <p class="photographer-location">${this.city}, ${this.country}</p>
                <p class="photographer-tagline">${this.tagline}</p>
            </div>
            <button type="button" class="contact-btn">Contactez-moi</button>
            <div class="photographer-portrait">
                <img src="${this.portrait}" alt="${this.name}"/>
            </div>
        `;
        this.$photographerHeader.innerHTML = photographerHeader;
        
        // Ici je récupère les medias de mon fichier photographers.json
        const mediasData = [await(await fetch('/data/photographers.json')).json()][0].media;

        const Contact = new ContactForm();
        Contact.render();

        const Sorter = new SorterForm(mediasData);
        Sorter.render();
        
        mediasData
            // Ici, je transforme mon tableau de données en un tableau de classe Factory
            .map(media => new PhotographerFactory(media, 'media'))
            .forEach(media => {                
                if(media.photographerId === this.idPhotographer) {
                    this.$totalLikes.push(media.likes);
                    this.$sumLikes = this.$totalLikes.reduce((partialSum, a) => partialSum + a, 0);                                                                     
                    const Template = mediaCardWithPlayer(new MediaCard(media));
                    this.$mediasWrapper.appendChild(
                        Template.createMediaCard()
                    );
                }
            });

        this.$price.innerHTML = `${this.price}€/jour`;
        this.$TotaLL.innerHTML = this.$sumLikes;
    }
}

const photographerApp = new PhotograperApp();
photographerApp.main();