var DtBender = new Date(3017,05,19);
var dt = new Date();
var dtoptions = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
var BenderMsg = {id:'1001011110101', date: DtBender.toLocaleDateString('fr-FR', dtoptions) , who: "friend-with-a-SVAGina" , content :"t'es en avance gros naze, repasse plus tard"};
var Bender = {id:'1001011110101', name : 'Bender', img : "img/benderEstLeMeilleur.png", content :'looool'};
var TabMessages = [BenderMsg];
var TabContacts = [Bender];

function idExist(id) {	
	var response = false;
	for (var i in TabContacts) {		
		if (TabContacts[i].id == id) {response = true}
	}
	return response;
}
function getImgUrlById(id) {
	try {
	if(TabContacts[id].img == "") { 
		return 'img/ltrs/'+TabContacts[id].name.substring(0,1).toLowerCase()+'.png';} else { return TabContacts[id].img;}
	}
	catch(e) {
		//console.log(e);
	}
}
document.body.onload = function() {
	document.getElementById('Top-img').setAttribute('src', "https://mika.unrozah.fr/app/img/");
	for (var i in TabContacts) {
		var txtId = "'"+TabContacts[i].id+"'";
		document.getElementById('contacts').insertAdjacentHTML('afterbegin','<li id="tileContact" onclick="loadContactTop('+txtId+')"><img width="50" height="50" src="'+getImgUrlById(i)+'"><div class="info"><p class="phone">'+TabContacts[i].id+'</p><div class="user">'+TabContacts[i].name+'</div><div class="status">'+TabContacts[i].content.substring(0,Math.min(30,TabContacts[i].content.length))+'</div></div></li>');
	}
}
function listContacts() {
	document.getElementById('contacts').innerHTML ="";
	for (var i in TabContacts) {
		var txtId = "'"+TabContacts[i].id+"'";	
		document.getElementById('contacts').insertAdjacentHTML('afterbegin','<li id="tileContact" onclick="loadContactTop('+txtId+')"><img width="50" height="50" src="'+getImgUrlById(i)+'"><div class="info"><p class="phone">'+TabContacts[i].id+'</p><div class="user">'+TabContacts[i].name+'</div><div class="status">'+TabContacts[i].content.substring(0,Math.min(30,TabContacts[i].content.length))+'</div></div></li>');
	}
}
function isContactView(phone) {
	return (document.getElementById('Top-phone').innerHTML == phone);
}
function nbrMessagesById(id) {
	cpt = 0;
	for (var i in TabContacts) {		
		if (TabContacts[i].id == id) {cpt++;}
	}
	return cpt;
}
function getNameById(phone) {
	for (var i in TabContacts) {
		if (TabContacts[i].id == phone) { return TabContacts[i].name }
		
	}
}
function loadContactTop(phone) {
	document.getElementById('Top-name').innerText = "";
	document.getElementById('Top-name').innerText = getNameById(phone);
	document.getElementById('Top-phone').innerText = "";
	document.getElementById('Top-phone').innerText = phone;
	document.getElementById('messages').innerHTML = "";
	
	for (var i in TabMessages) {
		if (TabMessages[i].id == phone) {
			if (getImgUrlById(i)) {
				document.getElementById('Top-img').setAttribute("src", "");
				document.getElementById('Top-img').setAttribute("src",getImgUrlById(i));
			}
			document.getElementById('messages').insertAdjacentHTML('beforeend','<li class="'+TabMessages[i].who+'"><div class="head"><span class="name"></span><span class="time">'+TabMessages[i].date+'</span></div><div class="message">'+TabMessages[i].content+'</div></li>');
		}
	}
}
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
		document.getElementById('statusOn').style.display = "block";
		document.getElementById('statusOff').style.display = "none";
		ipcRenderer.send('uid', firebaseUser.uid);
	}else {
		document.getElementById('statusOn').style.display = "none";
		document.getElementById('statusOff').style.display = "block";
	}
});
	/* ---#####################-----UI----###################-----*/

var close = document.getElementById('close');
var minimize = document.getElementById('minimize');
var maximize = document.getElementById('maximize');
var txtSearch = document.getElementById('TxtSearch');

close.addEventListener('click', function() {
	win.close();
});
minimize.addEventListener('click', function() {
	win.minimize();
});
maximize.addEventListener('click', function() {
	win.isMaximized() ? win.unmaximize() : win.maximize();
});
/*	
txtSearch.onchange = function() {
	return TabContacts.filter((el) =>
    el.toLowerCase().indexOf(txtSearch.innerText.toLowerCase()) > -1
  );
	txtSearch.innerText;
}*/
/* ---#####################---reception--sms-----###################-----*/


ipcRenderer.on('newsms' , function(event , data){ 
	//si le numéro existe déjà dans la tableau des contacts
	if(!idExist(data.id)) {TabContacts.push(data)}
	//charge les contacts
	listContacts();
	var dtSms = new Date();
	//si on est déjà sur le contact
	if (isContactView(data.id)) {
		TabMessages.push({id: data.id ,date : dtSms.toLocaleDateString("fr-FR", dtoptions), who: "friend-with-a-SVAGina",content : data.content});
		document.getElementById('messages').insertAdjacentHTML('beforeend','<li class="friend-with-a-SVAGina"><div class="head"><span class="name"></span><span class="time">'+dtSms.toLocaleDateString("fr-FR",dtoptions)+'</span></div><div class="message">'+data.content+'</div></li>');
	} else {
		TabMessages.push({id: data.id ,date : dtSms.toLocaleDateString("fr-FR", dtoptions),who: "friend-with-a-SVAGina", content : data.content});
	}

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