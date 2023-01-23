class SorterForm {
    constructor(Medias) {
        this.Medias = Medias;
        
        this.$wrapper = document.createElement('div');
        this.$sorterFormWrapper = document.querySelector('.sorter-form-wrapper');
        this.$mediasWrapper = document.querySelector('.medias-wrapper');

        this.$TotaLL = document.querySelector('.total-likes');
        
        this.params = new URLSearchParams(document.location.search);
        this.idPhotographer = parseInt(this.params.get("idPhotographer"));
        
        this.$totalLikes = [];
        this.$sumLikes = '';
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
                    // localStorage.clear();
                    this.$totalLikes.push(media.likes);
                    this.$sumLikes = this.$totalLikes.reduce((partialSum, a) => partialSum + a, 0); 
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
                    // localStorage.clear(); 
                    this.$totalLikes.push(media.likes);
                    this.$sumLikes = this.$totalLikes.reduce((partialSum, a) => partialSum + a, 0);                   
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
        console.log(localStorage.getItem('TotalL'));
        // if((this.$sumLikes > 0) && (parseInt(this.$TotaLL.innerHTML) < this.$sumLikes)) {
        //     this.$TotaLL.innerHTML = `${this.$sumLikes}`;
        // }        
        // localStorage.clear();
    }

    render() {
        this.$TotaLL.innerHTML = '';
        

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
        
        this.$wrapper.innerHTML = sorterForm;        
        this.onChangeSorter();

        this.$sorterFormWrapper.appendChild(this.$wrapper);        
    }
}