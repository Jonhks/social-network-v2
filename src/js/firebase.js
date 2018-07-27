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
  const authFacebook = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    autentication(provider)
  }

  const autentication = (provider) => {
    firebase.auth().signInWithPopup(provider).then(function (result) {
      let token = result.credential.accessToken;
      console.log(token)
      let user = result.user;
      console.log(URLSearchParams)
      // ...
    }).catch(function (error) {
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
  $('#idface').click(authFacebook);


//   window.fbAsyncInit = function () {
//     FB.init({
//       appId: '{your-app-id}',
//       cookie: true,
//       xfbml: true,
//       version: '{api-version}'
//     });

//     FB.AppEvents.logPageView();


//   (function (d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) {
//       return;
//     }
//     js = d.createElement(s);
//     js.id = id;
//     js.src = "https://connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
//   }(document, 'script', 'facebook-jssdk'));

//   FB.getLoginStatus(function (response) {
//     statusChangeCallback(response);
//     console.log(response)
//   });
// };
