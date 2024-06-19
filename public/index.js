const socket = io();

//Obtengo los elementos de el romulario
var form = document.getElementById('form');
var input = document.getElementById('input');
var mensajes = document.getElementById('mensajes')

//Si la persona clickea enviar, verifica si tiene contenido el input y lo envia al servidor
//Despues, vuelve a poner el valor en blanco
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
})

//Envia el mensaje en forma de li en HTML
//Va agregando los mensajes y pone un window,scroll para que el usuario no necesite scrollear para ver el último mensaje
socket.on('chat message', function(msg) {
    var text = document.createElement('li');
    text.textContent = msg;
    mensajes.appendChild(text);
    window.scrollTo(0, document.body.scrollHeight);
});