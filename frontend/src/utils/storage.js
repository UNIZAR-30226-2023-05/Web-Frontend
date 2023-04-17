/*const storage = {

    get (key) {
        const value = localstorage.getItem (key);
        if (value) {
            return null;
        }
        return JSON.parse (value);
    },
    
    set (key, value) {
        localStorage.setItem (key, JSON.stringify (value))
    },
    
    remove (key) {
        localStorage.removeItem (key);
    },
    
    clear ( ) {
        localStorage.clear ( );
    },    
};
    

    
    export const login = ({ usuario, contrasena}) => {
    
    return client.post /'/login', contrasena).then (response => {
    
    storage.set (‘auth’, response.accessToken);
    
    });
    
    };*/