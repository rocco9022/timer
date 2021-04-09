import React, {useState, useEffect, useRef, Component} from 'react';
import './Timer.css'
import swal from 'sweetalert'




const Timer = () => {

 
  

  const [segundos, setSegundos]= useState(0)
  const [activo, setActivo]= useState(false)
  const [tipo, setTipo]= useState('Counter')
  const myRef= useRef(null)
  const [flag, setFlag]= useState(false)

  

  function toggle(){
    if (tipo === 'Countdown' && !flag){agregaSegundos()}
    setActivo(!activo)
    swal ({
      title: "GO! GO!",
      timer: 500
    })
  }

  function reset(){
    document.getElementById("input")
    setSegundos(0)
    setFlag(false)
    setActivo(false)
    
    
     
  }

  function cambioTipo(){
    if (tipo === 'Counter'){setTipo('Countdown')}
    if (tipo === 'Countdown'){setTipo('Counter')}
  }

  function agregaSegundos(){
    let ref= myRef.current.value
    setFlag(true)
    if (ref < 0){ref = 0}
    setSegundos(ref)
  }
  
  useEffect(() => {
    let intervalo= null
   
    if (activo && tipo === 'Counter'){
      intervalo= setInterval(() =>{
      setSegundos(segundos => segundos +1)
      }, 1000)
    }
    if (activo && tipo === 'Countdown'){
      if (segundos === -1){clearInterval(intervalo)}
      else {
      intervalo= setInterval(() =>{
      setSegundos(segundos => segundos-1)
      }, 1000)
      }
    }
    if (!activo && segundos !== 0 && tipo === 'Counter'){
      clearInterval(intervalo)
    }
    if (segundos === -1 && tipo === 'Countdown'){
      reset()
      clearInterval(intervalo)
  
    if (segundos === -1 && 'Countdown'){
      swal({
        title: 'Countdown',
        text: 'Ended',
        timer: 1500
      })
    }
      reset()
      
    }
  
    

    return () => clearInterval(intervalo)
  }, [activo, segundos, tipo])

  /* La funcion de arriba, va a establecer la variable intervalo
  en null para arrancar. >> Si esta apretado el boton de Start
  (activo = true) y si esta configurado para Counter, que llame
  a la funcion setInterval para que cada 1000ms le sume uno
  a el estado segundos. >> Si se toca el boton de pausa 
  (activo = false), los segundos son mas que 0 y el tipo esta
  en Counter, que pare la funcion setInterval (llamando a 
  clearInterval. Todo esto va a pasar si el estado activo, 
  segundos o tipo son cambiados (simil componentDidChange)
  Y cuando uno se vaya de el componente 
  (simil componentWillUnmount), va a parar el setInterval*/

  

  return (
    <div className="app">
      <div className="time">
        {segundos}s
      </div>
      <div className="row">
        <button className="button-primary" onClick= {toggle}>
          {activo ? 'Pausa':'Start'}
        </button>
        <button className="button-secondary" onClick={reset}>
          Reset
        </button>
      </div>
      <button className="button" onClick={cambioTipo}>
        {tipo}
      </button>
      {tipo === 'Countdown' && <input id="input" type="number" ref={myRef} placeholder="Ingresa Segundos" autoComplete="off"/>}
    </div>
  );
};

export default Timer;
