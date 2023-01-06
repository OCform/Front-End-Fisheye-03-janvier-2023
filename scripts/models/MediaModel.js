class MediaModel {
    constructor(media) {
        this._media = media;
        this._id = media.id;
        this._photographerId = media.photographerId;
        this._title = media.title;
        this._view = media.image? media.image : media.video;
        this._type = media.image ? 'image' : 'video';        
		this._likes = media.likes;
        this._date = media.date;
        this._price = media.price;
    }
    
    get media() {
        return this._media;
    }

    get id() {
        return this._id;
    }

    get photographerId() {
        return this._photographerId;
    }

    get title() {
        return this._title;
    }
    
    get view() {
        return `/assets/photographers/${this._view}`;
    }
    
    get type() {
        return this._type;
    }

    get likes() {
        return this._likes;
    }
    
    get date() {
        return this._date;
    }
    
    get price() {
        return this._price;
    }
}