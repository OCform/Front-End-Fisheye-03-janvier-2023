class SorterForm {
    constructor(Medias) {
        this.Medias = Medias;

        this.$wrapper = document.createElement('div')
        this.$sorterFormWrapper = document.querySelector('.sorter-form-wrapper');
        this.$mediasWrapper = document.querySelector('.medias-wrapper');
    }

    async sorter(sorterMedias) {
        this.clearMediasWrapper();

        if (!!sorter) {
            // Vous pourrez supprimer cette ligne
            const sortedData = await RatingSorterApi.sorter(this.Medias, sorter);

            const SortedMedias = sortedData.data: 

            SortedMedias.forEach(Media => {
                const Template = new MediaCard(Media);
                this.$mediasWrapper.appendChild(Template.createMediaCard());
            });
        } else {
            this.Medias.forEach(Media => {
                const Template = new MediaCard(Media);
                this.$mediasWrapper.appendChild(Template.createMediaCard());
            })
        }
    }

    onChangeSorter() {
        this.$wrapper
            .querySelector('form')
            .addEventListener('change', e => {
                const sorter = e.target.value
                this.sorterMedias(sorter)
            })
    }

    clearMediasWrapper() {
        this.$moviesWrapper.innerHTML = ""
    }

    render() {
        const sorterForm = `
            <form action="#" method="POST" class="sorter-form">
                <label for="sorter-select">Triez par date de sortie : </label>
                <select name="sorter-select" id="sorter-select">
                    <option value="POP">Popularité</option>
                    <option value="DAT">Date</option>
                    <option value="ALP">Titre</option>
                </select>
            </form>
        `

        this.$wrapper.innerHTML = sorterForm
        this.onChangeSorter()

        this.$sorterFormWrapper.appendChild(this.$wrapper)
    }
}