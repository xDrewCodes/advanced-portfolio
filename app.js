

/* DYNAMIC AGE */

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


/* EMAIL */

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


/* MODAL */

let modalOpen = false

function toggleModal() {

    if (!modalOpen) {
        for (let i = 0; i < shapes.length; i++) { shapes[i].style.translate = '0 0' }
        document.getElementsByTagName('body')[0].classList += ' modal--open'
        document.getElementsByClassName('modal')[0].style.zIndex = 3
        disableScroll()
    } else {
        document.getElementsByTagName('body')[0].classList.remove('modal--open')
        enableScroll()
        setTimeout(
            () => {
                document.getElementsByClassName('modal')[0].style.zIndex = -1
            }, 100
        )
    }

    modalOpen = !modalOpen

}





/* DARK MODE */

let darkToggle = false

function darkMode() {

    darkToggle = !darkToggle

    if (darkToggle) {
        document.body.classList += ' dark-mode'
    } else {
        document.body.classList.remove('dark-mode')
    }

}

darkMode()

/* RANDOMIZE SHAPE ROTATIONS */

let shapes = document.getElementsByClassName('shape')
let shapeSpeedRange = [4, 25]
let randDirection = true

function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}

shapeSpeedRange = range(shapeSpeedRange[0], shapeSpeedRange[1])

function randShapeRot() {

    for (let i = 0; i < shapes.length; i++) {

        let dur = shapeSpeedRange[Math.floor(Math.random() * shapeSpeedRange.length)]
        shapes[i].style.animationDuration = dur + 's'

        if (randDirection && Math.floor(Math.random() * 2) == 0) {
            shapes[i].style.animationDirection = 'reverse'
        }
    }
}

randShapeRot()


/* MOUSE INTERACT */

let scaleFactor = 30
let shapeLocs = [
    [10, 40],
    [25, 4],
    [-30, 35],
    [-45, 0],
    [-20, 15],
    [50, 1],
    [0, 0],
    [40, 20]
]

function moveShapes(event) {

    if (!modalOpen) {
        const x = event.clientX / scaleFactor
        const y = event.clientY / scaleFactor

        for (let i = 0; i < shapes.length; i++) {

            let chance = i % 4

            if (chance == 0) {
                shapes[i].style.translate = `${x}px ${y}px`
            } else if (chance == 1) {
                shapes[i].style.translate = `-${x}px ${y}px`
            } else if (chance == 2) {
                shapes[i].style.translate = `${x}px -${y}px`
            } else {
                shapes[i].style.translate = `-${x}px -${y}px`
            }

        }
    } else if (true) {

        var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

        if (window.innerHeight / 2 > scrollTop) {
            for (let i = 0; i < shapes.length; i++) {
                let top = shapeLocs[i][1] + scrollTop
                shapes[i].style.translate = shapeLocs[i][0] + 'px ' + top + 'px'
            }
        } else {
            for (let i = 0; i < shapes.length; i++) {
                shapes[i].style.translate = '0 -90000vh'
            }
        }
    }

}


/* SCROLL */

function disableScroll() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop

    window.onscroll = function () {
        window.scrollTo({ top: scrollTop, behavior: 'instant' })
    }

}

function enableScroll() {

    window.onscroll = function () { }

}