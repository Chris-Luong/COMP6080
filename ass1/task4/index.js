// let infoForm = document.forms.details;

const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const DOB = document.querySelector('#DOB');
const cheese = document.querySelector('#cheese');

// infoForm.addEventListener('blur', (event) => {
//     event.preventDefault();

const formValidation = () => {
    console.log('firstName', firstName.value);
    console.log('lastName', lastName.value);
    console.log('DOB', DOB.value);

    let result = `Hello my name is ${firstName} ${lastName}, you are
     ${DOB} years old,`

    document.querySelector('textOutput').innerHTML = result
}

firstName.addEventListener('blur', formValidation);
lastName.addEventListener('blur', formValidation);

    // let reg = /[0-9]{2}/[0-9]{2}/[0-9]{4}/
    // reg = new RegExp('[0-9]{2}/[0-9]{2}/[0-9]{4}')
    
    // // if (firstName.length < 3 || firstName.length > 50) {
    // //     error
    // // } else if (lastName.length < 3 || lastName.length > 50) {
    // //     error
    // // }
    // let result = `Hello my name is ${firstName} ${lastName}, you are
    // ${DOB} years old, your favourite cheese is ${cheese} and you've 
    // lived in no cities.`

    // document.getElementById('textOutput').textContent = result;

    // alert(`${firstName} ${lastName} ${DOB} ${cheese}`)
// });

// const firstName = document.getElementById('firstName');

// const handler = (event) => {
//     console.log(event.key);
// }

// firstName.addEventListener



// const cities = document.getElementById('cities');

// cities.addEventListener('click', (event) => {
//     // event.preventDefault();
// });