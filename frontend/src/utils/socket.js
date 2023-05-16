import io from 'socket.io-client';

const token = localStorage.getItem('token');
const port = process.env.PORT || 32021;
const url = 'http://169.51.206.12:' + port;

const socket = io.connect(url, { auth: { token } });

export default socket;

