$('.collapsible').collapsible();

let name = document.getElementById('first_name');
let apellido = document.getElementById('last_name');
let email = document.getElementById('email');
let password = document.getElementById('password');
let botonRegistro = document.getElementById('boton_registro');
let email2 = document.getElementById('email2');
let password2 = document.getElementById('password2');
let botonLogin = document.getElementById('boton_entrar');
// let botonLogout = document.getElementById('logout');


// Nuevos usuarios
botonRegistro.addEventListener('click', event => {
  email = email.value;
  password = password.value;
  console.log(email, password);
  location.href = '../views/muro.html';
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    alert('Error: ' + errorMessage);
    // ...
  });
});

// logeados

botonLogin.addEventListener('click', event => {
  email = email2.value;
  password = password2.value;
  console.log(email, password);
  location.href = '../views/muro.html';
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here
    let errorCode = error.code;
    let errorMessage = error.message;
    alert('Error: ' + errorMessage);

    // ...
  });
});

// Boton de salir

// botonLogout.addEventListener('click', event => {
//       firebase.auth().signOut().then(function () {
//         console.log("El usuario ha salido")
//         // Sign-out successful.
//       }).catch(function (error) {
//         // An error happened.
//         alert("Ocurrio un problema")
//       })
// });
