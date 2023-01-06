class IndexApp {
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographers-wrapper');
    }

    async main() {
        // Ici je récupère les photographes de mon photographers.json
        const photographersData = [await(await fetch('/data/photographers.json')).json()][0].photographers;
        
        photographersData
            // Ici, je transforme mon tableau de données en un tableau de classe Factory
            .map(photographe => new PhotographerFactory(photographe, 'photographe'))
            .forEach(photographe => {
                const Template = new PhotographerCard(photographe);
                this.$photographersWrapper.appendChild(
                    Template.createPhotographerCard()
                );
            });
    }
}

const indexApp = new IndexApp();
indexApp.main();