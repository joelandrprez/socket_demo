const COnectado = document.querySelector('#lblonline');
const Desconectado = document.querySelector('#lbloffline');
const msg = document.querySelector('#msg');
const btnEnviar = document.querySelector('#btnEnviar');



const socket = io();


socket.on('connect',() =>{
    console.log('conectado');
    Desconectado.style.display ='none';
    COnectado.style.display ='';


});
socket.on('disconnect',() =>{
    console.log('desconectado');
    Desconectado.style.display ='';
    COnectado.style.display ='none';
});

socket.on('enviar',(payload) =>{
    console.log(payload);
});


btnEnviar.addEventListener('click',()=>{
    const mensaje = msg.value
    const payload = {
        uid:'1232132',
        payload:{
            data:'data',
            enviar:'true'
        }
    }
    console.log(mensaje);
    socket.emit('enviar-mensaje',payload);
})