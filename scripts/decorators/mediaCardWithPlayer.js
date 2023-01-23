function mediaCardWithPlayer(mediaCard) { 
    mediaCard.$img.addEventListener('click', () => {
        const Player = new PlayerModal(mediaCard._media);
        Player.render();        
    });
    mediaCard.$video.addEventListener('click', () => {
        const Player = new PlayerModal(mediaCard._media);
        Player.render();        
    });
    
    return mediaCard;
}