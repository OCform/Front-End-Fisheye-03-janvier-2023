class PlayerModal {
    constructor(media) {
        this._media = media;

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('player-wrapper');

        this.$modalWrapper = document.querySelector('.modal-lightbox');

        this.$media = document.querySelectorAll(".medias-wrapper > .media-card-wrapper > .media.center > .display");
        this.currentIndex= 1;
        this.mediaSrc = [];
    }

    onSrc() {
        // get medias src
        this.$media.forEach((med, i) => {
            let type = med.tagName === 'IMG' ? 'image' : 'video';         
            let id = parseInt(med.getAttribute('id')); 
            let view = med.getAttribute('src');
            let title;
            if(med.tagName === 'IMG') {
                title = med.getAttribute('alt');
            } else if(med.tagName === 'VIDEO') {
                title = med.getAttribute('title');
            } else {
                title = '';
            }
            
            this.mediaSrc.push({type:type, id:id, view:view, title:title});
            
            if(this.mediaSrc.length > this.$media.length) {
                this.mediaSrc.pop();
            }
        });        
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
                this.currentIndex = this.mediaSrc.findIndex(item => item.id === this._media.id);
                if(this.currentIndex <= 0) {this.currentIndex = this.mediaSrc.length;}
                this._media = this.mediaSrc[this.currentIndex - 1];                 
                this.render();
            });
    }

    onNextButton() {
        this.$wrapper
            .querySelector('.next-btn')
            .addEventListener('click', () => {
                this.currentIndex = this.mediaSrc.findIndex(item => (item.id === this._media.id));
                if(this.currentIndex >= this.mediaSrc.length-1) {this.currentIndex = -1;}
                this._media = this.mediaSrc[this.currentIndex + 1]; 
                this.render();              
            });
    }

    createPlayer() {
        console.log(this.mediaSrc.filter(item => (this._media.id === item.id)));
        console.log(this.mediaSrc.find(item => (this._media.id === item.id)));
        
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        let player;
                
        if(this._media.type === 'image') {
            player = `
                <div class="player">                                     
                    <img
                        src="${this._media.view}"
                        alt="${this._media.title}"                        
                    >
                    <h3>${this._media.title}</h3>
                    <button name="close" class="close-btn" type="button">&times;</button>
                    <button name="previous" class="prev-btn" type="button">&#10094;</button>
                    <button name="next" class="next-btn" type="button">&#10095;</button>                    
                </div>
            `;
        } else {
            player = `
                <div class="player"> 
                    <video controls>
                        <source src="${this._media.view}" 
                        title="${this._media.title}"
                    >                        
                    </video> 
                    <h3>${this._media.title}</h3>
                    <button name="close" class="close-btn" type="button">&times;</button>
                    <button name="previous" class="prev-btn" type="button">&#10094;</button>
                    <button name="next" class="next-btn" type="button">&#10095;</button>                   
                </div>
            `;
        }        

        this.$wrapper.innerHTML = player;

        this.$modalWrapper.classList.add('modal-on');
        this.$modalWrapper.appendChild(this.$wrapper);

        this.onSrc();
        this.onCloseButton();
        this.onPrevButton();
        this.onNextButton();
    }

    render() {        
        this.createPlayer();
    }
}
