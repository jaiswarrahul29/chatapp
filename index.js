//-------------------------------------------------------------------- Your web app's Firebase configuration--------------------------------------------------------------------------------------------

var firebaseConfig = {
    apiKey: "AIzaSyA1VdTh_6R38aXjkc0_ah_BF01JsxGeL0Y",
    authDomain: "react-chatapp-c6128.firebaseapp.com",
    projectId: "react-chatapp-c6128",
    storageBucket: "react-chatapp-c6128.appspot.com",
    messagingSenderId: "194504506729",
    appId: "1:194504506729:web:697c8dd9d16e99a77a51f8",
    measurementId: "G-YV5R1DTVFW"
};
//  --------------------------------------------------------------------Initialize Firebase --------------------------------------------------------------------------------------------
firebase.initializeApp(firebaseConfig);

// ------------------------------------------------------------------------onstate change --------------------------------------------------------------------------------------------
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        var user = firebase.auth().currentUser;
        var emailVerified = user.emailVerified;

        if (emailVerified) {
            document.getElementById('chat-area').style.display = "block";
            document.getElementById('login-area').style.display = "none";
            document.getElementById('signout-btn').style.display = "block";
        }
    } else {
        // No user is signed in.
        document.getElementById('chat-area').style.display = "none";
        document.getElementById('login-area').style.display = "block";
        document.getElementById('signout-btn').style.display = "none";

    }
});

// ---------------------------------------------------------------------------login using email and password--------------------------------------------------------------------------------------------

function signIn(){
    // signIn btn and loader
    var signInBtn = document.getElementById('signInBtn');
    var signInLoader = document.getElementById('signInLoader');
    // signUp btn and loader
    var signUpBtn = document.getElementById('signUpBtn');
    var signUpLoader = document.getElementById('signUpLoader');
    //set button nonvisible and loader visible
    signInBtn.style.display="none";
    signInLoader.style.display="block";

    // get user credential
    const useremail = document.getElementById('email').value;
    const userpassword = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(useremail, userpassword)
        .then((userCredential) => {
            //set comment-text to null value
            document.getElementById('comment-text').innerHTML = "";
            // Signed in
            var user = firebase.auth().currentUser;
            var emailVerified = user.emailVerified;
            if (emailVerified){
                document.getElementById('chat-area').style.display = "block";
                document.getElementById('login-area').style.display = "none";
                document.getElementById('signout-btn').style.display = "block";
            }
            else{
                document.getElementById('comment-text').innerHTML = "Verify your email address!!!"
                //set button visible and loader nonvisible
                signInBtn.style.display = "block";
                signInLoader.style.display = "none";
            }

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            document.getElementById('comment-text').innerHTML =errorMessage;
            //set button visible and loader nonvisible
            signInBtn.style.display = "block";
            signInLoader.style.display = "none";
        });

        // reset the input field 
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';

        
    }

//------------------------------------------------------------------creating account using email and password--------------------------------------------------------------------------------------------

    function signUp(){

        // signIn btn and loader
        var signInBtn = document.getElementById('signInBtn');
        var signInLoader = document.getElementById('signInLoader');
        // signUp btn and loader
        var signUpBtn = document.getElementById('signUpBtn');
        var signUpLoader = document.getElementById('signUpLoader');

        //set button nonvisible and loader visible
        signUpBtn.style.display = "none";
        signUpLoader.style.display = "block";


        // get user credential
        const useremail = document.getElementById('email').value;
        const userpassword = document.getElementById('password').value;

        firebase.auth().createUserWithEmailAndPassword(useremail, userpassword)
            .then((userCredential) => {
                // Signed in 

                //set comment-text to null value
                document.getElementById('comment-text').innerHTML = " ";

                 // sending verifcation mail to the user
                 var user = userCredential.user;
                 user.sendEmailVerification().then(function () {
                     // Email sent.
                     document.getElementById('comment-text').innerHTML = "Verification link send to your email address...check asap!!!"
                 }).catch(function (error) {
                     // An error happened.
                 });

                //set button visible and loader non visible
                signUpBtn.style.display = "block";
                signUpLoader.style.display = "none";
            
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                document.getElementById('comment-text').innerHTML = errorMessage;

                //set button visible and loader non visible
                signUpBtn.style.display = "block";
                signUpLoader.style.display = "none";
                // ..
            });
        
            // reset the input field 
            document.getElementById('email').value='';
            document.getElementById('password').value='';
        
    }


// ------------------------------------------------------------signInWithGoogle function --------------------------------------------------------------------------------------------

function signInWithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...

            if(user){
                document.getElementById('chat-area').style.display="block";
                document.getElementById('login-area').style.display = "none";
                document.getElementById('signout-btn').style.display="block";


            }
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

    }

    //---------------------------------------------signout function --------------------------------------------------------------------------------------------

    var signOut = document.getElementById('signout-btn');

     function signout(){
        firebase.auth().signOut()
             .then(function () {
                 // Sign-out successful.

                 // signIn btn and loader
                 var signInBtn = document.getElementById('signInBtn');
                 var signInLoader = document.getElementById('signInLoader');
                 // signUp btn and loader
                 var signUpBtn = document.getElementById('signUpBtn');
                 var signUpLoader = document.getElementById('signUpLoader');

                 signInBtn.style.display = "block";
                 signUpBtn.style.display = "block";
                 signInLoader.style.display = "none";
                 signUpLoader.style.display = "none";


                 //set comment-text to null value
                 document.getElementById('comment-text').innerHTML = " ";
                 
                 
             }).catch(function (error) {
                 // An error happened.
             });
     }

    //---------------------------------------getting person details function  -------------------------------------------------------------------
    

//---------------------------------------------- sendbutton function ---------------------------------------------------------------
    function sendMessage() {

        // getting username and email
        // getting name of the user
        var user = firebase.auth().currentUser;

        if (user != null) {
            var myName = user.displayName;
            var useremailaddress = user.email;

            // if display name is null
            if (myName == null) {

                if (localStorage.getItem("profile") != null) {
                    myName = localStorage.getItem("profile");
                }
                else {
                    const name = prompt("EnterFull Name");
                    localStorage.setItem("profile", name);
                }
            }   
        }
        var username = myName;
        // get message from input 
        var message = document.getElementById("message").value;

        // get date and time 
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes()
        var dateTime = date + ' at ' + time;

        //  save in database using realtimedb
        if(username!=null && message!=""){
            firebase.database().ref("message").push().set({
                "sender": username,
                "message": message,
                "dateTime": dateTime,
                "email": useremailaddress
            })
        }
        else{
            console.log("enter message agian")
        }
            
        
        // after submit clear the input field
        document.getElementById("message").value='';

        // scroll to bottom 
        document.getElementById('chat-area').scrollTo(0, 500000);

        return false;

    }

//---------------------------------------listen for a incoming message--------------------------------------------------------------------------

firebase.database().ref("message").on("child_added", function (snapshot) {
    var html = "";
    html += "<li>";

    html += "<h3>";
    html += snapshot.val().sender;
    html += "</h3>";

    html += "<h2>";
    html += snapshot.val().message;
    html += "</h2>";

    html += "<h6>";
    html += snapshot.val().dateTime;
    html += "</h6>";

    html += "</li>"

    document.getElementById("messages-list").innerHTML += html;
});


//---------------------------------------------onkeyup to display sent button------------------------------------------------------------------------

function keyup(){
    const sendbtn = document.getElementById('sendBtn');
    const mess = document.getElementById('message').value;

    
    if(mess.length > 0){
        sendbtn.style.display = "block";
    }
    else{
        sendbtn.style.display = "none";
    }
    
}

//----------------------------------------------------dark/light mode js here-------------------------------------------------------

function setTheme(){
    const themeName = "dark";
    localStorage.setItem("theme", themeName);

    var loader = document.getElementById('webLoader');

    loader.style.display="none";
}

function changeTheme(){
    var themeStatus= localStorage.getItem("theme");
    var sunbtn = document.getElementById('sun');
    var moonbtn = document.getElementById('moon');
    var mainarea = document.querySelector('.main');
    var nav = document.querySelector('.main .chat nav');
    var chatarea = document.querySelector('.main .chat .chat-area');
    var loginarea = document.querySelector('.chat .login .login-area');

    if(themeStatus=="light")
    {
        mainarea.classList.add('light-mode')
        nav.classList.add('light-mode')
        chatarea.classList.add('light-mode')
        loginarea.classList.add('light-mode')
    }
    else{
        mainarea.classList.remove('light-mode')
        nav.classList.remove('light-mode')
        chatarea.classList.remove('light-mode')
        loginarea.classList.remove('light-mode')
    }
}
function sun(){

    var sunbtn = document.getElementById('sun');
    var moonbtn = document.getElementById('moon');
    
    sunbtn.style.display="none";
    moonbtn.style.display = "block";
    
    const themeName = "light";
    localStorage.setItem("theme", themeName);
    changeTheme();
}

function moon() {
    var sunbtn = document.getElementById('sun');
    var moonbtn = document.getElementById('moon');
    
    sunbtn.style.display = "block";
    moonbtn.style.display = "none";
    
    const themeName = "dark";
    localStorage.setItem("theme", themeName);
    changeTheme();
}