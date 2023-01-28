class User {
    constructor(data) {
        if (User.exists) {
            return User.instance;
        } else if (data && data.firstName && data.lastName && data.email && data.message) {
            // Si firstName, lastName, email et message sont définis au moment de l'instanciation

            // J'initialise les propriétés firstName, lastName, email et message
            this._firstName = data.firstName;
            this._lastName = data.lastName;
            this._email = data.email;
            this._message = data.message;

            // Je les sauvegarde en Local Storage
            this.saveToLocalStorage();

            // Je "lock" l'objet
            User.instance = this;
            User.exists = true;
            return this;
        }
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get email() {
        return this._email;
    }

    get message() {
        return this._message;
    }

    get user() {        
        // Vérifie si firstName, lastName, email et message existent soit au sein de la classe, soit en LocalStorage
        const firstName = this._firstName || localStorage.getItem('firstName');
        const lastName = this._lastName || localStorage.getItem('lastName');
        const email = this._email || localStorage.getItem('email');
        const message = this._message || localStorage.getItem('message');

        
        
        // Si oui, alors je réinstancie : on a besoin de ce bout de code une fois que l'application a été quittée.
        if (firstName && lastName && email && message) {
            const user = new User({
                firstName,
                lastName,
                email,
                message
            });
            console.log(user);
            localStorage.clear();
        }

        // Sinon, ça veut dire que la classe n'a pas été instancié.
        if (!firstName && !lastName && !email && !message) {
            return null;
        }

        // Ici, je retourne le user
        return {
            firstName: firstName,
            lastName: lastName,
            email: email,
            message: message
        };  
    }

    saveToLocalStorage() {
        localStorage.setItem('firstName', this._firstName);
        localStorage.setItem('lastName', this._lastName);
        localStorage.setItem('email', this._email);
        localStorage.setItem('message', this._message);
    }
}
