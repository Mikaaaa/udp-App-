(function() {
	

const { remote } = require('electron');
const {ipcRenderer} = require('electron');
var win = remote.getCurrentWindow();

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA4EcvqDsZe4TS_3Q1JX-8CxO20v2BDJ-E",
    authDomain: "udptest-4c355.firebaseapp.com",
    databaseURL: "https://udptest-4c355.firebaseio.com",
    projectId: "udptest-4c355",
    storageBucket: "",
    messagingSenderId: "188051169711"
  };
firebase.initializeApp(config);
//get elements
const txtEmail = document.getElementById('email');
const txtPassword = document.getElementById('password');
const BtnLogin = document.getElementById('login');
const BtnsignIn = document.getElementById('signIn');
const txtError = document.getElementsByClassName('error');
const BtnLogout = document.getElementById('logout');


//Add login event
BtnLogin.addEventListener('click', e => {
	const email = txtEmail.value;
	const password = txtPassword.value;
	const auth = firebase.auth();
	//sign in
	const promise = auth.signInWithEmailAndPassword(email, password);
	promise.catch(e => txtError.innerText = e.message);
});
BtnLogout.addEventListener('click', e => {
	firebase.auth().signOut();
});
BtnsignIn.onclick = function() {
	const email = txtEmail.value;
	const password = txtPassword.value;
	const auth = firebase.auth();
	auth.createUserWithEmailAndPassword(email, password);
};
firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser) {
		console.log("login ok, send to main..");
		ipcRenderer.send('uid', firebaseUser.uid);
	}else {
		txtError.innerText = 'not logged in';
	}
});
	/* ---#####################-----UI----###################-----*/

var close = document.getElementById('close');
var minimize = document.getElementById('minimize');
var maximize = document.getElementById('maximize');

close.addEventListener('click', function() {
	win.close();
});
minimize.addEventListener('click', function() {
	win.minimize();
});
maximize.addEventListener('click', function() {
	win.isMaximized() ? win.unmaximize() : win.maximize();
});


/*---#####################----modal----##############################----*/
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("connect");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("fermer");

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
})()