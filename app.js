

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
        stopDrifting()
        setTimeout(
            () => {
                for ( let i = 0; i < shapes.length; i++ ) { 
                    document.getElementsByClassName('shape')[i].style.transition = 'none'
                 }
            }, 750
        )

    } else {
        document.getElementsByTagName('body')[0].classList.remove('modal--open')
        
        for ( let i = 0; i < shapes.length; i++ ) {
            document.getElementsByClassName('shape')[i].style.transition = 'all 0.6s cubic-bezier(.31, .74, 0, .99)'
        }
        enableScroll()
        startDrifting()
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
let shapeSpeedRange = [9, 20]
let randDirection = true

function range(start, end) {
    var ans = []
    for (let i = start; i <= end; i++) {
        ans.push(i)
    }
    return ans
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












let driftTimeout
let drifting = false
let previousDriftDirections = Array(shapes.length).fill({ x: 0, y: 0 })
let initialPositions = Array.from(shapes).map(shape => {
    const currentTranslate = shape.style.translate.split(' ')
    return {
        x: parseFloat(currentTranslate[0]) || 0,
        y: parseFloat(currentTranslate[1]) || 0
    }
})

function startDrifting() {
    drifting = true
    driftShapes()
}

function stopDrifting() {
    drifting = false
}

let increasedBiasFactor = 1
let biasFactorTimeout



function driftShapes() {
    if (!drifting) return

    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight

    for (let i = 0; i < shapes.length; i++) {
        const biasFactor = increasedBiasFactor
        let directionChangeBiasFactor = 2

        const randomX = (Math.random() - 0.5) * 0.1 + previousDriftDirections[i].x
        const randomY = (Math.random() - 0.5) * 0.1 + previousDriftDirections[i].y
        const currentTranslate = shapes[i].style.translate.split(' ')
        const currentX = parseFloat(currentTranslate[0]) || 0
        const currentY = parseFloat(currentTranslate[1]) || 0

        let biasedX = randomX
        let biasedY = randomY


        let shapeTransl = shapes[i].style.translate.split('px').toString()

        let distTop = shapeTransl.split(',')[1]
        let distLeft = shapeTransl.split(',')[0]

        distTop = shapes[i].offsetTop + parseInt(distTop)
        distLeft = shapes[i].offsetLeft + parseInt(distLeft)

        if (distLeft < 0 || distLeft > screenWidth - shapes[i].offsetWidth) {
            biasedX = -biasedX
        }
        if (distTop < 0 || distTop > screenHeight - shapes[i].offsetHeight) {
            biasedY = -biasedY
        }

        shapes[i].style.translate = `${currentX + biasedX}px ${currentY + biasedY}px`

        previousDriftDirections[i] = { x: biasedX, y: biasedY }
    }

    requestAnimationFrame(driftShapes)
}

document.addEventListener('mousemove', moveShapes)
startDrifting()











/* MOUSE INTERACT */

let scaleFactor = 100
let shapeSpread = 10
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

    if (modalOpen) {

        for (let i = 0; i < shapes.length; i++) {

            let shape = shapes[i]
            let shapeLoc = shapeLocs[i]

            let x = event.clientX - window.innerWidth / 2
            let y = event.clientY - window.innerHeight / 2

            let xMove = x*2 / scaleFactor
            let yMove = y*2 / scaleFactor

            shape.style.translate = `${shapeLoc[0] + xMove }px ${shapeLoc[1] + yMove}px`

        }

    } else {

        
        increasedBiasFactor = 0.01
        
        clearTimeout(biasFactorTimeout)
        biasFactorTimeout = setTimeout(() => {
            increasedBiasFactor = 1
        }, 100)
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