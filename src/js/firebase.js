// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCp30xQ0PrTeET_cyvp3MTQ4sdPXHplJTk',
  authDomain: 'red-social-v2.firebaseapp.com',
  databaseURL: 'https://red-social-v2.firebaseio.com',
  projectId: 'red-social-v2',
  storageBucket: 'red-social-v2.appspot.com',
  messagingSenderId: '239665734039'
};
firebase.initializeApp(config);


const authGoogle = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  autentication(provider);
};
const authFacebook = () => {
  let provider = new firebase.auth.FacebookAuthProvider();
  autentication(provider);
};

const autentication = (provider) => {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    let token = result.credential.accessToken;
    console.log(token);
    let user = result.user;
    console.log(user);
    localStorage.setItem('resultado', JSON.stringify(user));
    location.href = '../views/muro.html';
    // ...
  }).catch(function(error) {
    let errorCode = error.code;
    console.log(errorCode);
    let errorMessage = error.message;
    console.log(errorMessage);
    let email = error.email;
    console.log(email);
    let credential = error.credential;
    console.log(credential);
    // ...
  });
};

$('#idgoogle').click(authGoogle);
$('#idface').click(authFacebook);

  
const observer = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...

    }
  });
};
  
observer();


// obtener al ususario

let user = firebase.auth().currentUser;

if (user !== null) {
  user.providerData.forEach(function(profile) {
    console.log('Sign-in provider: ' + profile.providerId);
    console.log('  Provider-specific UID: ' + profile.uid);
    console.log('  Name: ' + profile.displayName);
    console.log('  Email: ' + profile.email);
    console.log('  Photo URL: ' + profile.photoURL);
  });
}


// Para update de usuario


// user.updateProfile({
//   displayName: "Jane Q. User",
//   photoURL: "https://example.com/jane-q-user/profile.jpg"
// }).then(function() {
//   // Update successful.
// }).catch(function(error) {
//   // An error happened.
// });