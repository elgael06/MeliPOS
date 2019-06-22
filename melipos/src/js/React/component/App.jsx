import React, { Component } from "react"; //Importamos react


export default class Saludo extends Component {
  constructor(props){
    super(props)
    this.state ={
      mensage:"React Funcionando..."
    }
  }
  render() {
    let {mensage} = this.state;
    return <h1>{mensage}</h1>;
  }
}
