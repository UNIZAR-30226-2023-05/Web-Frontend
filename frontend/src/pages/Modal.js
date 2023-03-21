import React, { Component } from 'react'
import Portal from './Portal'

export default class Modal extends Component {
  render() {

    // Toggle y active son el estado del modal, si esta abierto o no, hacer 
    // toggle del active para que se abra o no
    const { children, toggle, active } = this.props;

    return (
        // Se quiere renderizar todo en el portal
      <Portal>
        {active && (
            <div style={style.wrapper}>
                 <div style={style.window}></div>
                    <button style={style.closeBtn} onClick={toggle}>Jugar</button>
                    <div>{children}</div>
            </div>
        )}

      </Portal>
    )
  }
}

const style = {
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        heitht: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    window: {
        position: 'relative',
        background: '#fff',
        borderRadius: 5,
        padding: 15,
        boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
        zIndex: 10,
        minWidth: 320,
   
      },
    closeBtn:{
        position: 'absolute',
        top: 0,
        right: 0,
    }  
};
