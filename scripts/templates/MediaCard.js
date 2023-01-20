class MediaCard {
    constructor(media) {
        this._media = media;

        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('media-card-wrapper');        
    }
    
    get media() {
        return this._media;
    }
    
    createMediaCard() {
        const mediaCard = document.createElement('div');
        this.$wrapper.appendChild(mediaCard);
        mediaCard.classList.add('media');
        mediaCard.classList.add('center');

        if(this._media.type === 'image') {            
            const img = document.createElement('img');
            mediaCard.appendChild(img);
            img.classList.add('display');
            img.setAttribute('id', `${this._media.id}`);
            img.setAttribute('src', `${this._media.view}`);
            img.setAttribute('alt', `${this._media.title}`);
        } else {            
            const video = document.createElement('video');
            mediaCard.appendChild(video);
            video.classList.add('display');
            video.setAttribute('id', `${this._media.id}`);
            video.setAttribute('src', `${this._media.view}`);
            video.setAttribute('alt', `${this._media.title}`);
        }

        const titleLikesCenter = document.createElement('div');
        this.$wrapper.appendChild(titleLikesCenter);
        titleLikesCenter.classList.add('title-likes');
        titleLikesCenter.classList.add('center');

        const h3 = document.createElement('h3');
        titleLikesCenter.appendChild(h3);
        h3.innerHTML = `${this._media.title}`;

        const span = document.createElement('span');
        titleLikesCenter.appendChild(span);

        const likes = document.createElement('div');
        span.appendChild(likes);
        likes.classList.add('likes');
        likes.innerHTML = `${this._media.likes}`;

        const faHeart = document.createElement('em');
        span.appendChild(faHeart);
        faHeart.classList.add('fa');
        faHeart.classList.add('fa-heart');
        faHeart.setAttribute('aria-hidden', 'true');
        // faHeart.setAttribute('onclick', `${this.fn}`);
        
        faHeart.addEventListener('click', () => {            
            if (likes.innerHTML == `${this._media.likes}`) {
                likes.innerHTML = `${this._media.likes}` + 1;
            } else {
                likes.innerHTML = `${this._media.likes}`;
            }
        });

        return this.$wrapper;
    }
        
}