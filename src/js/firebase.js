  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyCp30xQ0PrTeET_cyvp3MTQ4sdPXHplJTk",
    authDomain: "red-social-v2.firebaseapp.com",
    databaseURL: "https://red-social-v2.firebaseio.com",
    projectId: "red-social-v2",
    storageBucket: "red-social-v2.appspot.com",
    messagingSenderId: "239665734039"
  };
  firebase.initializeApp(config);



const authGoogle = () => {
  let provider = new firebase.auth.GoogleAuthProvider(); 
  autentication(provider)
}

const autentication = (provider) => {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    let token = result.credential.accessToken;
    console.log(token)
    let user = result.user;
    console.log(user)
    // ...
  }).catch(function(error) {
    let errorCode = error.code;
    console.log(errorCode)
    let errorMessage = error.message;
    console.log(errorMessage)
    let email = error.email;
    console.log(email)
    let credential = error.credential;
    console.log(credential)
    // ...
  });
}

$('#idgoogle').click(authGoogle);
