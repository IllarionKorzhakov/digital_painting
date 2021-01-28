let GlobDB = {}


function create_element(name, message, data) {
	let block = document.getElementById("database-peach-studio-list-comment")
	html = "<li><span class='database-name'>" + name + "</span><span class='database-message'>"+ message + "</span><span class='database-data'>"+ data +"</span></li>"
	block.innerHTML += html
}
function initDB() {
	document.getElementById("database-peach-studio-list-comment").innerHTML = "<li hidden>Коментарии</li>"
	firebase.database().ref('/').once('value').then((db) => {
  		try {
  			GlobDB.length = db.val().length
  		} catch {
  			GlobDB.length = 0
  		}
  		read(db.val())

  // ...
});
}
function read(data) {
	for (var i = 0; i <= data.length-1; i++) {
		let dt = data[i]
		create_element(dt.name, dt.message, dt.data)
	}
}
function send() {
	var now = new Date();
	let name = document.getElementById("database-peach-studio-name-enter").value
	let email = document.getElementById("database-peach-studio-email-or-phone-enter").value
	let message = document.getElementById("database-peach-studio-message-enter").value
	let Dbdate = ['Январь', "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
	let data = now.getDate() + " "+Dbdate[now.getMonth()] + " "+now.getFullYear() + " год"
	if (name != "" && email != "" && message != "") {
		firebase.database().ref('/' + GlobDB.length).set({
		name:name,
		message:message,
		data:data,
		email:email
    
  });
	initDB()
} else {
	alert("Необходимо заполнить все поля.")
}
}
	