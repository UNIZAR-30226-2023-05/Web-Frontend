import io from 'socket.io-client';

const token = localStorage.getItem('token');
const port = process.env.PORT || 4000;
const url = 'http://localhost:' + port;

const socket = io.connect(url, { auth: { token } });

export default socket;

