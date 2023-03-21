import React, { Component } from 'react'
import ReactDOM from 'react-dom/client';

// Se escoge el elemento del portal
const portalRoot = document.getElementById('portal');

// Solo es funcional
export default class Portal extends Component {
  
    // Constructor
    constructor(){
        super();
        this.el = document.createElement('div');
    }

    // Cuando se crea el componente, añadirmos al div del portal este hijo
    componentDidMount = () => {
        portalRoot.appendChild(this.el);
    }
  
    // Cuando el componente se elimina
    componentWillUnmount = () => {
        portalRoot.removeChild(this.el);
    }

    render() {
        // Contenido que esta dentro del componente
        const { children } = this.props;

        return ReactDOM.createPortal(children, this.el);
  }
}
