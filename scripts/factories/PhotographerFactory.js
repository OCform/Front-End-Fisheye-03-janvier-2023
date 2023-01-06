class PhotographerFactory {
    constructor(data, type) {
        // Si le type correspond à l'API photographe, alors retourne ce formatage
        if (type === 'photographe') {
            return new PhotographerModel(data);
        // Sinon retourne celui-ci de formatage
        } else if (type === 'media') {
            return new MediaModel(data);
        // La bonne pratique est de retourner un message d'erreur si le format n'est pas reconnu
        } else {
            throw new Error('Type de format inconnu au bataillon !');
        }
    }
}