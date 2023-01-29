class ContactForm {
    constructor() {
        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('content-form');
        this.$wrapper.setAttribute('tabindex', '-1');
        this.$wrapper.setAttribute('role', 'dialog');
        this.$wrapper.setAttribute('aria-label', 'contact');
        this.$modalWrapper = document.querySelector('.modal-contact');
    }   

    onOpenFormBtn() {
        const buttonContact = document.querySelector("body > main > div.photographer-header > button");

        buttonContact
            .addEventListener('click', () => {
                this.$modalWrapper.style.display = "block";
            });
    }

    focusableModal() {
        // Focusable elements inside modal
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const modal = document.querySelector('#contact'); // Modal id

        const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // First element inside modal
        const focusableContent = modal.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1]; // Last element inside modal


        document.addEventListener('keydown', (e) => {
            let isTabPressed = e.key === 'Tab' || e.code === 'Tab';

            if (!isTabPressed) {
                return;
            }

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus(); // Focus Last element
                    e.preventDefault();
                }
            } else { // if tab key is pressed
                if (document.activeElement === lastFocusableElement) { // Focus first element after pressing tab
                    firstFocusableElement.focus(); // Focus first element
                    e.preventDefault();
                }
            }
        });
        firstFocusableElement.focus();
    }

    onCloseFormBtn() {
        const buttonCloseFormContact = this.$modalWrapper.querySelector('div > form > header > button > img');
        const buttonReset = this.$modalWrapper.querySelector('form');
        buttonCloseFormContact
            .addEventListener('click', () => {
                this.$modalWrapper.style.display = "none";
                buttonReset.reset();
            });
    }

    onSubmitForm() {
        this.$wrapper
            .querySelector('form')
            .addEventListener('submit', (e) => {
                e.preventDefault();              

                const firstNameInputValue = this
                    .$wrapper
                    .querySelector('#firstname')
                    .value;

                const lastNameInputValue = this
                    .$wrapper
                    .querySelector('#lastname')
                    .value;

                const emailInputValue = this
                    .$wrapper
                    .querySelector('#email')
                    .value;

                const messageInputValue = this
                    .$wrapper
                    .querySelector('#message')
                    .value;

                const isNumber = (num) => {
                    const re = (/\d+/gm);
                    return re.test(num);
                };

                // check if the string has special characters
                const isCharSpe = (specialChar) => {
                    const re = (/[^a-zA-Z0-9 ]+$/gm);
                    return re.test(specialChar);
                };

                // check if a field isn't empty
                const isRequired = value => value === '' ? false : true;
                
                // check numbers characters between min and max 
                const isBetween = (length, min, max) => length < min || length > max ? true : false;

                // check if the mail has valid
                const isEmailValid = (email) => {
                    const re = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/);
                    return re.test(email);
                };

                const checkFirstName = () => {
                    let valid = false;
                    const min = 3, max = 25;

                    if(isNumber(firstNameInputValue) || isBetween(firstNameInputValue.length, min, max) || isCharSpe(firstNameInputValue)) {
                        if(document.querySelector("#firstname")) document.querySelector("#firstname").style.border = '5px solid red';
                    } else {
                        if(document.querySelector("#firstname")) document.querySelector("#firstname").style.border = '5px solid green';
                        valid = true;
                    }
                    return valid;
                };
                
                const checkLastName = () => {
                    let valid = false;
                    const min = 3, max = 25;

                    if(isNumber(lastNameInputValue) || isBetween(lastNameInputValue.length, min, max) || isCharSpe(lastNameInputValue)) {
                        document.querySelector("#lastname").style.border = '5px solid red';
                    } else {
                        document.querySelector("#lastname").style.border = '5px solid green';
                        valid = true;
                    }
                    return valid;
                };

                const checkEmail = () => {
                    let valid = false;
                    const email = emailInputValue;
                
                    if (!isRequired(email)) {
                        document.querySelector("#email").style.border = '5px solid red';
                    } else if (!isEmailValid(email)) {
                        document.querySelector("#email").style.border = '5px solid red';
                    } else {
                        document.querySelector("#email").style.border = '5px solid green';
                        valid = true;
                    }
                    return valid;
                };

                const checkMessage = () => {
                    let valid = false;
                    const min = 5, max = 250;

                    if(isBetween(messageInputValue.length, min, max)) {
                        document.querySelector("#message").style.border = '5px solid red';
                    } else {
                        document.querySelector("#firstname").style.border = '5px solid green';
                        valid = true;
                    }
                    return valid;
                };

                if((checkFirstName() == '') && 
                    (checkLastName() == '') && 
                    (checkEmail() == '') && 
                    (checkMessage() == '')) {
                        const user = new User({
                            firstName: 'Alfred',
                            lastName: 'DURAND',
                            email: 'alfred.durand@labanque.fr',
                            message: 'Hello World! '
                        });
                        if (user.user) {
                            this.$modalWrapper.classList.remove('modal-on');
                            this.$modalWrapper.innerHTML = "";
                        }
                    console.log('Empty contact form!');
                }
                
                if(checkFirstName() && 
                    checkLastName() && 
                    checkEmail() && 
                    checkMessage()) {                        
                    const user = new User({
                        firstName: firstNameInputValue,
                        lastName: lastNameInputValue,
                        email: emailInputValue,
                        message: messageInputValue
                    });
                    if (user.user) {
                        this.$modalWrapper.classList.remove('modal-on');
                        this.$modalWrapper.innerHTML = "";
                    }
                }                               
        });
    }

    shouldDisplayForm() {
        const user = new User();
        return !user.user;
    }

    createForm() {
        this.params = new URLSearchParams(document.location.search);
        this.name = this.params.get("name");

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        // <div class="form-group">
        //     <label for=""></label>
        //     <input type="email" class="form-control" name="" id="" aria-describedby="emailHelpId" placeholder="">
        //     <small id="emailHelpId" class="form-text text-muted">Help text</small>
        // </div>

        const form = ` 
            <form action="#" method="POST" id="contact">
                <header>
                    <h1>Contactez-moi<br>${this.name}</h1>
                    <button type="reset" class="close" aria-label="contact">
                        <img src="assets/icons/close.svg" alt="Close Contact form"/>
                    </button>
                </header>

                <div class="form-group">
                    <label class="form-label" for="firstname">Prénom </label>
                    <input id="firstname" name="firstname" type="text" autofocus>
                </div>
                <div class="form-group">
                    <label class="form-label" for="lastname">Nom </label>
                    <input id="lastname" name="lastname" type="text" autofocus>
                </div>
                <div class="form-group">
                    <label class="form-label" for="email">Email </label>
                    <input id="email" name="email" type="email" autofocus>
                </div>
                <div class="form-group">                    
                    <label class="form-label" for="message">Votre message </label>
                    <textarea id="message" name="message" autofocus rows="5" cols="33"></textarea>
                </div>
                <button class="submit-btn" type="submit">Envoyer</button>
            </form>
        `;
        this.$wrapper.innerHTML = form;

        this.$modalWrapper.classList.add('modal-on');
        this.$modalWrapper.appendChild(this.$wrapper);
    }
    
    render() {
        if (this.shouldDisplayForm()) {
            this.onOpenFormBtn();
            this.createForm();
            this.focusableModal();
            this.onSubmitForm();
            this.onCloseFormBtn();
        }
    }
}