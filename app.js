

// DYNAMIC AGE FOR MODAL

const birthday = '2005-07-09'
const ageReference = document.getElementsByClassName('age')[0]

function setAge() {

    let today = new Date()
    let dob = new Date(birthday)

    let age = today.getFullYear() - dob.getFullYear()
    let m = today.getMonth() - dob.getMonth()
    let d = today.getDate() - dob.getDate()

    if (m < 0 || (m == 0 && d <= 0)) {
        age--
    }

    ageReference.innerHTML = age

}

setAge()


// EMAIL FUNCTIONALITY FOR MODAL

function contact(event) {

    let loading = document.getElementsByClassName('modal__overlay--loading')[0]
    let sent = document.getElementsByClassName('modal__overlay--sent')[0]
    let error = document.getElementsByClassName('modal__overlay--error')[0]

    loading.style.display = 'flex'

    let templateParams = {
        user_name: document.getElementsByClassName('modal__form--name')[0].value,
        user_email: document.getElementsByClassName('modal__form--email')[0].value,
        message: document.getElementsByClassName('modal__form--message')[0].value
    }

    event.preventDefault()
    emailjs.send(
        'service_zld5ibs',
        'template_k56ugjk',
        templateParams
    ).then(
        () => {
            loading.style.display = 'none'
            sent.style.display = 'flex'
        }
    ).catch(
        () => {
            loading.style.display = 'none'
            error.style.display = 'flex'
        }
    )

}


// SHOW FUNCTIONALITY FOR MODAL

let modalOpen = false

function toggleModal() {

    if (!modalOpen) {
        document.getElementsByTagName('body')[0].classList += ' modal--open'
        document.getElementsByClassName('modal')[0].style.zIndex = 3
    } else {
        document.getElementsByTagName('body')[0].classList.remove('modal--open')
        setTimeout(
            () => {
                document.getElementsByClassName('modal')[0].style.zIndex = -1
            }, 100
        )
    }

    modalOpen = !modalOpen

}





// DARK MODE

let darkToggle = false

function darkMode() {

    darkToggle = !darkToggle

    if (darkToggle) {
        document.body.classList += ' dark-mode'
    } else {
        document.body.classList.remove('dark-mode')
    }

}