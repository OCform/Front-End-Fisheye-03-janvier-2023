class SorterForm {
    constructor(Medias) {
        this.Medias = Medias;

        this.$wrapper = document.createElement('div');
        this.$sorterFormWrapper = document.querySelector('.sorter-form-wrapper');
        this.$mediasWrapper = document.querySelector('.medias-wrapper');  
        this.$label = document.createElement('div');
        this.$label.classList.add('cartouche');
        this.$mediasWrapper.appendChild(this.$label);
        
        this.$totalLikes = 0;

        this.params = new URLSearchParams(document.location.search);
        this.name = this.params.get("name");
        this.idPhotographer = parseInt(this.params.get("idPhotographer"));        
        this.city = this.params.get("city");
        this.country = this.params.get("country");
        this.tagline = this.params.get("tagline");
        this.price = this.params.get("price");
        this.portrait = this.params.get("portrait");
    }

    async sorterMedias(sorter) {                
        
        this.clearMediasWrapper();

        if (!!sorter) {            
            const sortedData = await(RatingSorterApi.sorter(this.Medias, sorter));
            
            const SortedMedias = sortedData.data;
            
            SortedMedias
            // Ici, je transforme mon tableau de données en un tableau de classe Factory
            .map(media => new PhotographerFactory(media, 'media'))
            .forEach(media => {                
                if(media.photographerId === this.idPhotographer) {                      
                    this.$totalLikes = this.$totalLikes + media.likes;                                                   
                    const Template = mediaCardWithPlayer(new MediaCard(media));
                    this.$mediasWrapper.appendChild(
                        Template.createMediaCard()
                    );
                }
            });
        } else {
            this.Medias.map(media => new PhotographerFactory(media, 'media'))
            .forEach(media => {                
                if(media.photographerId === this.idPhotographer) {                      
                    this.$totalLikes = this.$totalLikes + media.likes;                                                   
                    const Template = mediaCardWithPlayer(new MediaCard(media));
                    this.$mediasWrapper.appendChild(
                        Template.createMediaCard()
                    );
                }
            });
        }
    }

    onChangeSorter() {
        this.$wrapper
            .querySelector('form')
            .addEventListener('change', e => {
                const sorter = e.target.value;
                this.sorterMedias(sorter);
            });
    }

    clearMediasWrapper() {
        this.$mediasWrapper.innerHTML = "";
    }

    render() {
        console.log(this.$label);
        const likes = `
            <span><div>${this.$totalLikes}</div> <em class="fa fa-heart" aria-hidden="true"></em></span>
            <div>${this.price}€/jour</div>
        `;
        const sorterForm = `
            <form action="#" method="POST" class="sorter-form">
                <label for="sorter-select">Trier par  </label>
                <select name="sorter-select" id="sorter-select">
                    <option value="POPULARITY">Popularité</option>
                    <option value="DATE">Date</option>
                    <option value="TITLE">Titre</option>
                </select>
            </form>
        `;
        
        this.$label.innerHTML = likes;
        this.$wrapper.innerHTML = sorterForm;        
        this.onChangeSorter();

        this.$sorterFormWrapper.appendChild(this.$wrapper);
    }
}