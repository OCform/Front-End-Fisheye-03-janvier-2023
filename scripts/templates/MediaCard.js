class MediaCard {
    constructor(media) {
        this._media = media;
        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('media-card-wrapper');
    }

    createMediaCard() {
        if(this._media.type === 'image') {
            const mediaCard = `
                <div class="media center">
                    <img class="display" id="${this._media.id}"
                        alt="${this._media.title}"
                        src="${this._media.view}"
                    />
                </div>
                <div class="title-likes center">
                    <h3>${this._media.title}</h3>            
                    <span>
                        <div class="likes">${this._media.likes} </div>
                        <em class="fa fa-heart" aria-hidden="true"></em>
                    </span>
                </div>
            `;
            
            this.$wrapper.innerHTML = mediaCard;
        } else {
            const mediaCard = `            
                <div class="media center">
                    <video class="display" id="${this._media.id}"
                        alt="${this._media.title}"
                        src="${this._media.view}"
                    ></video>
                </div>
                <div class="title-likes center">
                    <h3>${this._media.title}</h3>            
                    <span>
                        <div class="likes">${this._media.likes}</div>
                        <em class="fa fa-heart" aria-hidden="true"></em>
                    </span>
                </div>
            `;
            
            this.$wrapper.innerHTML = mediaCard;
        }
        return (this.$wrapper);
    }
}