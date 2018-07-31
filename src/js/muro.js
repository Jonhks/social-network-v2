document.addEventListener('DOMContentLoaded', function() {
  const elems = document.querySelectorAll('.sidenav');
  const instances = M.Sidenav.init(elems);

  // eventValidationTextArea();
  // mostrarPost();
  // printUserResult(userReturn);
});
const post = document.getElementById('drear-post');
const botonLogout = document.getElementById('logout');
const publicar = document.getElementById('btn-publicar');
const userReturn = JSON.parse(localStorage.getItem('resultado'))

botonLogout.addEventListener('click', event => {
      firebase.auth().signOut().then(function () {
        console.log("El usuario ha salido");
        location.href = "../views/view1.html"

        // Sign-out successful.
      }).catch(function (error) {
        // An error happened.
        alert("Ocurrio un problema")
      })
});
// Para la base de datos
let database = firebase.database();

let objDB = {
  usuarios: []
};
let hora = new Date().getTime();
let contadorId = 0;
publicar.addEventListener('click', event => {
  // para cuando ropas la bdd
  // posts:[]
  console.log(userReturn);
  event.preventDefault();
  let date = `${new Date()}`;
  let printUser = {
    'id': contadorId,
    'idPerfil': userReturn.uid,
    'nombre': userReturn.displayName,
    'correo': userReturn.email,
    'foto': userReturn.photoURL,
    'msj': {
      'idPost': hora,
      'fecha': date,
      'like': 0,
      'textMessage': document.getElementById('mensaje').value
    }
  }
  objDB.usuarios.unshift(user);
  contadorId++;
  document.getElementById('mensaje').value = ' ';
  crearJsonNuevoPost(objDB);
})

const crearJsonNuevoPost = (posts) => {
  database.ref('/').set(posts);
};

// validarDatosMensaje: (event) => {
//   const targetEvent = event.target.value.trim();
//   if (targetEvent.length > 0 && targetEvent.length < 141) {
//     return true;
//   } else {
//     return false;
//   }
// }
// };

// error = () => {
// alert('rellena todos los campos');
// };
