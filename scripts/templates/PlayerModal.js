class PlayerModal {
    constructor(media) {
        this._media = media;

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('player-wrapper');

        this.$modalWrapper = document.querySelector('.modal');

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
            let title = med.getAttribute('alt');
            
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
        let player;        
        if(this._media.type === 'image') {
            player = `
                <div class="player">                                     
                    <img
                        src="${this._media.view}"
                        alt="${this._media.title}"                        
                    />
                    <h3>${this._media.title}</h3>
                    <button class="close-btn">&times;</button>
                    <button class="prev-btn">&#10094;</button>
                    <button class="next-btn">&#10095;</button>                    
                </div>
            `;
        } else {
            player = `
                <div class="player"> 
                    <video controls>
                        <source src="${this._media.view}">                        
                    </video> 
                    <h3>${this._media.title}</h3>
                    <button class="close-btn">&times;</button>
                    <button class="prev-btn">&#10094;</button>
                    <button class="next-btn">&#10095;</button>                   
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
