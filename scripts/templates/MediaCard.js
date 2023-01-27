class MediaCard {
    constructor(media) {
        this._media = media;
        this._likes = media.likes;
        
        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('media-card-wrapper');

        this.$img = document.createElement('img');
        this.$video = document.createElement('video');

        this.$TotaLL = document.querySelector('.total-likes');        
    }
    
    get media() {
        return this._media;
    }
    
    get likes() {
        return this._likes;
    }
    
    createMediaCard() {
        const mediaCard = document.createElement('div');
        this.$wrapper.appendChild(mediaCard);
        mediaCard.classList.add('media');
        mediaCard.classList.add('center');

        if(this._media.type === 'image') {           
            mediaCard.appendChild(this.$img);
            this.$img.classList.add('display');
            this.$img.setAttribute('id', `${this._media.id}`);
            this.$img.setAttribute('src', `${this._media.view}`);
            this.$img.setAttribute('alt', `${this._media.title}`);
        } else {           
            mediaCard.appendChild(this.$video);
            this.$video.classList.add('display');
            this.$video.setAttribute('id', `${this._media.id}`);
            this.$video.setAttribute('src', `${this.media.view}`);
            this.$video.setAttribute('title', `${this._media.title}`);
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
        
        titleLikesCenter.addEventListener('click', () => {
            if (likes.innerHTML == `${this._media.likes}`) {
                likes.innerHTML = this._media.likes + 1;
                this._likes = this._likes + 1;
                this.$TotaLL.innerHTML = parseInt(this.$TotaLL.innerHTML) + 1;
                localStorage.setItem('TotalL', parseInt(this.$TotaLL.innerHTML));             
                span.classList.add('liked');
            } else {
                likes.innerHTML = this._media.likes;
                this._likes = this._likes - 1;
                this.$TotaLL.innerHTML = parseInt(this.$TotaLL.innerHTML) - 1;
                localStorage.setItem('TotalL', parseInt(this.$TotaLL.innerHTML));
                span.classList.remove('liked');
            }            
        });
        
        return this.$wrapper;
    }
        
}