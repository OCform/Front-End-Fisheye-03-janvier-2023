class SorterForm {
    constructor(Medias) {
        this.Medias = Medias;
        
        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('custom-select');
        this.$sorterFormWrapper = document.querySelector('.sorter-form-wrapper');
        
        this.$option = document.querySelector('#sorter-select option');
        
        this.$mediasWrapper = document.querySelector('.medias-wrapper');

        this.$TotaLL = document.querySelector('.total-likes');
        
        this.params = new URLSearchParams(document.location.search);
        this.idPhotographer = parseInt(this.params.get('idPhotographer'));
        
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
                    this.$totalLikes.push(media.likes);
                    this.$sumLikes = this.$totalLikes.reduce((partialSum, a) => partialSum + a, this.$sumLikes); 
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
                    this.$totalLikes.push(media.likes);
                    this.$sumLikes = this.$totalLikes.reduce((partialSum, a) => partialSum + a, this.$sumLikes);                   
                    const Template = mediaCardWithPlayer(new MediaCard(media));
                    this.$mediasWrapper.appendChild(
                        Template.createMediaCard()
                    );
                    
                }
            });
        }    
    }
    
    onUpDownChevron() {
        this.$wrapper
            .querySelector('#sorter-select')
            .addEventListener('click', () => {
                this.$wrapper
                    .querySelector('.chevron')
                    .classList.toggle('up');
        });

        if(this.$wrapper
            .querySelector('.chevron')
            .classList
            .contains('up')) {
            this.$wrapper
                .querySelector('.chevron')
                .classList.toggle('up');            
        }                  
    }

    onChangeSorter() {
        this.$wrapper
            .querySelector('#sorter-select')
            .addEventListener('change', e => {
                const sorter = e.target.value;
                this.sorterMedias(sorter);
            });            
    }

    clearMediasWrapper() {
        this.$mediasWrapper.innerHTML = '';        
    }

    render() {
        const sorterForm = `            
            <form action="#" method="POST" class="sorter-form">
                <label for="sorter-select">Trier par  </label>
                <select name="sorter-select" id="sorter-select">
                    <option value="POPULARITY" selected>Popularité&#8192&#8192&#8192&#8192 &#8192</option>                    
                    <option value="DATE">Date</option>
                    <option value="TITLE">Titre</option>
                </select>                                
            </form>
            <div class="chevron"><em class="fa fa-chevron-down"></em></div>
        `;
        
        this.$wrapper.innerHTML = sorterForm;        
        this.onChangeSorter();
        this.onUpDownChevron();

        this.$sorterFormWrapper.appendChild(this.$wrapper);        
    }
}