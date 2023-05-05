import io from 'socket.io-client';

const token = localStorage.getItem('token');
console.log('token de socket.js');
console.log(token);
const port = process.env.PORT || 3000;
const url = 'http://localhost:' + port;

const socket = io.connect(url, { auth: { token } });

export default socket;

