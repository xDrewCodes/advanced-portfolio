

// DYNAMIC AGE FOR MODAL

const birthday = '2005-07-09'
const ageReference = document.getElementsByClassName('age')[0]

function setAge() {

    let today = new Date()
    let dob = new Date( birthday )

    let age = today.getFullYear() - dob.getFullYear()
    let m = today.getMonth() - dob.getMonth()
    let d = today.getDate() - dob.getDate()

    if ( m < 0 || ( m == 0 && d <= 0 ) ) {
        age--
    }

    ageReference.innerHTML = age

}

setAge()


// JAVASCRIPT

