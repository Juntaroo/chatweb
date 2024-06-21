const socket = io();

//Obtengo los elementos de el romulario
const form = document.getElementById('form');
const input = document.getElementById('input');
const usuario = document.getElementById('usuario');
const mensajes = document.getElementById('mensajes')


//Si la persona clickea enviar, verifica si tiene contenido el input y lo envia al servidor
//Despues, vuelve a poner el valor en blanco
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (usuario.value && input.value) {
        const message = {
            user: usuario.value,
            text: input.value
        };
        socket.emit('chat message', message);
        input.value = '';
    } else{
        alert("Debe completar los campos para enviar los mensajes")
    }
});

//Envia el mensaje en forma de li en HTML
//Va agregando los mensajes y pone un window,scroll para que el usuario no necesite scrollear para ver el último mensaje
socket.on('chat message', function(msg) {
    var text = document.createElement('li');
    text.textContent = `${msg.user}: ${msg.text}`;
    mensajes.appendChild(text);
    window.scrollTo(0, document.body.scrollHeight);
});