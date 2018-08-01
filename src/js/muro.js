document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.sidenav');
  const instances = M.Sidenav.init(elems);

  // eventValidationTextArea();
  // mostrarPost();
  // printUserResult(userReturn);
});
const post = document.getElementById('crear-post');
const botonLogout = document.getElementById('logout');
const publicar = document.getElementById('btn-publicar');
const userReturn = JSON.parse(localStorage.getItem('resultado'));
const containerPost = document.getElementById('container-posts');

botonLogout.addEventListener('click', event => {
  firebase.auth().signOut().then(function () {
    console.log('El usuario ha salido');
    // location.href = '../views/view1.html';

    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
    alert('Ocurrio un problema');
  });
});
// Para la base de datos
let database = firebase.database().ref().child('post');

let hora = new Date().getTime();
let contadorId = 0;

const sendMessage = () => {
  let textArea = document.getElementById('mensaje');
  event.preventDefault();
  let date = `${new Date()}`;
  let userToPrint = {
    'id': contadorId,
    'idPerfil': userReturn.uid,
    'nombre': userReturn.displayName,
    'correo': userReturn.email,
    'foto': userReturn.photoURL,
    'mensaje': {
      'mensajeUid': userReturn.uid,
      'idPost': hora,
      'fecha': date,
      'like': 0,
      'textMessage': textArea.value
    }
  }
  database.push(userToPrint);
  contadorId++;
  textArea.value = ' ';
}

publicar.addEventListener('click', sendMessage);

const createStructure = (messages) => {
  console.log(messages);
  let template = `
  <div class="row">
  <div class="col s12">
    <div class="card black">
      <div class="card-content white-text">
        <span class="card-title">${messages.nombre}</span>
        <span class="fz-10 c-dorado">${messages.mensaje.fecha}</span>
        <p class="fz-16">${messages.mensaje.textMessage}</p>
        </div>
        <div class="card-action">
          <a href="#" data-editar="${messages.mensaje.idPost}">Editar</a>
          <a href="#" data-eliminar="${messages.mensaje.idPost}">Eliminar</a>
          <a href="#" class="right" data-like="${messages.mensaje.idPost}">
            <i class="material-icons">&#9825;</i>
            <span>${messages.mensaje.like}<span>
          </a>
        </div>
      </div>
    </div>
  </div>`;
  return template;
};


const readDB = () => {
  database.on('value', (snapshot) => {
    containerPost.innerHTML = ' ';
    const messReturn = snapshot.val();
    let template = '';
    for (key in messReturn) {
      // console.log(key, messReturn[key]);
      let finalTemplate = createStructure(messReturn[key]);
      // console.log(finalTemplate);
      containerPost.insertAdjacentHTML('afterbegin', finalTemplate);
    }
  });
};

readDB();


// validarDatosMensaje: (event) => {
//   const targetEvent = event.target.value.trim();
//   if (targetEvent.length > 0 && targetEvent.length < 141) {
//     return true;
//   } else {
//     return false;
//   }
// };


// error = () => {
//   alert('rellena todos los campos');
// };
