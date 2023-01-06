function mediaCardWithPlayer(mediaCard) { 
    
    mediaCard.$wrapper.addEventListener('click', () => {
        const Player = new PlayerModal(mediaCard._media);
        Player.render();        
    });
    
    return mediaCard;
}