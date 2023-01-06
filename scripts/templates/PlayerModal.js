class PlayerModal {
    constructor(media) {
        this.media = media;

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('player-wrapper');

        this.$modalWrapper = document.querySelector('.modal'); 

        this.Medias = new PhotograperApp();
        this.Medias.main();
    }

    onCloseButton() {
        this.$wrapper
            .querySelector('.close-btn')
            .addEventListener('click', () => {
                this.$modalWrapper.classList.remove('modal-on');
                this.$wrapper.innerHTML = "";
                this.$modalWrapper.removeChild(this.$wrapper);
            });
    }

    onPrevButton() {        
        this.$wrapper
            .querySelector('.prev-btn')
            .addEventListener('click', () => {                              
                console.log([this.Medias.$Medias].findIndex(item => item === this._media));
            });
    }

    onNextButton() {
        this.$wrapper
            .querySelector('.next-btn')
            .addEventListener('click', () => {
                const currentIndex = [this.Medias.$Medias].findIndex(item => item === this.media); 
                console.log(currentIndex);
            });
    }

    createPlayer() {
        let player;        
        if(this.media.type === 'image') {
            player = `
                <div class="player">                                     
                    <img
                        src="${this.media.view}"
                        alt="${this.media.title}"                        
                    />
                    <h3>${this.media.title}</h3>
                    <button class="close-btn">Fermer</button>
                    <button class="prev-btn">Precedent</button>
                    <button class="next-btn">Suivant</button>                    
                </div>
            `;
        } else {
            player = `
                <div class="player">                    
                    <video controls>
                        <source 
                            src="${this.media.view}"  
                            type="video/mp4">                                                        
                        </source>
                        C'est la vidéo titrée ${this.media.title}. 
                        La \source n'est pas disponible ou votre navigateur ne supporte pas la balise video !
                    </video>
                    <h3>${this.media.title}</h3>
                    <button class="close-btn">Fermer la fenêtre</button>
                    <button class="prev-btn">Precedent</button>
                    <button class="next-btn">Suivant</button>                   
                </div>
            `;
        }
        
        this.$wrapper.innerHTML = player;

        this.$modalWrapper.classList.add('modal-on');
        this.$modalWrapper.appendChild(this.$wrapper);

        this.onCloseButton();
        this.onPrevButton();
        this.onNextButton();
    }

    render() {        
        this.createPlayer();
    }
}
