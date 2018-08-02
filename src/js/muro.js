document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.sidenav');
  const instances = M.Sidenav.init(elems);

  // eventValidationTextArea();
  // changeImg();
  printUserResult();
});
const post = document.getElementById('crear-post');
const botonLogout = document.getElementById('logout');
const publicar = document.getElementById('btn-publicar');
const userReturn = JSON.parse(localStorage.getItem('resultado'));
const containerPost = document.getElementById('container-posts');
const textArea = document.getElementById('mensaje');

botonLogout.addEventListener('click', event => {
  firebase.auth().signOut().then(function () {
    console.log('El usuario ha salido');
    location.assign('../views/view1.html');
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
  textArea.value = '';
}

publicar.addEventListener('click', sendMessage);

const createStructure = (messages) => {
  // console.log(messages);
  let template = `
  <div class="row">
  <div class="col s12">
    <div class="card black">
      <div class="card-content white-text">
        <span class="card-title namemes"><i>${messages.nombre}</i></span>
        <p class="fz-16">${messages.mensaje.textMessage}</p>
        <hr>
        <p class="fz-10 c-dorado">${messages.mensaje.fecha}</p>
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

let btnsModal = document.querySelectorAll('.action-modal');
// let modalButton = document.getElementById('modal');
runModal = () => {
  let paraModal = document.getElementById('para-modal');
  console.log('hola');
  let newModal = `<div id="modal1" class="modal bodynew">
  <div class="modal-content">
  <a id="imagen-usuario" href="#user"><img class="circle" src="${userReturn.photoURL}" width="50%"></a>
    <h5 class="whithe"> ${userReturn.displayName}</h5class>
    <p class="whithe">  ${userReturn.email}</p>
  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-close waves-effect waves-green btn-flat ">Cerrar</a>
  </div>
</div>`;
  paraModal.innerHTML = newModal;
  $('.modal').modal();
};
for (var i = 0; i < btnsModal.length; i++) {
  btnsModal[i].addEventListener('click', runModal);
}

const printUserResult = () => {
  let printName = document.querySelectorAll('.name');
  let printEmail = document.getElementById('correo');
  let printImage = document.getElementById('imagen-usuario2');
  let nameResult = userReturn.displayName;
  let emailResult = userReturn.email;
  let imageReturn = userReturn.photoURL;

  for (let i = 0; i < printName.length; i++) {
    printName[i].innerHTML = nameResult;
    printImage.src = imageReturn;
  }
  printEmail.innerHTML = emailResult;
};

window.onload = changeImg = () => {
  let printImageDesktop = document.getElementById('imagen-usuario');
  let imageReturnDesktop = userReturn.photoURL;
  printImageDesktop.src = imageReturnDesktop;


}

// validarDatosMensaje = (event) => {
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

const botonValidator = () => {
  let vacio = mensaje.value.trim();
  if (vacio.length > 0 && vacio.length < 141) {
    publicar.disabled = false;
  }else{
    publicar.disabled = true;
  } 
}

mensaje.addEventListener('keyup', botonValidator)
