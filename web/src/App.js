import React, { Component } from 'react';
import api from './services/api';

export default class App extends Component {
  state = {
    arquivo: null,
  };

  setaImagem = async (e) => {
    // SÓMENTE O CAMINJO DA IMAGEM: e.target.value
    this.setState({ arquivo: e.target.files[0] });
  };

  enviaImagem = async () => {
    if (this.state.arquivo === null) {
      alert('Selecione uma imagem');
      return false;
    }

    const type = this.state.arquivo.type.split('/')[0].trim();
    if (type !== 'image') {
      alert('Selecione um arquivo do tipo imagem');
      return false;
    }

    // APENAS TEXTO: JSON, OU FORM-URL-ENCODED
    // ARQUIVOS: MULTIPART FORM DATA

    const formData = new FormData();
    formData.append('arquivo', this.state.arquivo);
    formData.append('nome', 'Mikael');
    //formData.append('cpf', this.state.cpf)

    const response = await api.post('/upload', formData);
    const res = response.data;

    console.log(res);
  };

  render() {
    return (
      <div className="App">
        <input type="file" onChange={this.setaImagem} />
        <br />
        <br />
        <br />
        <button onClick={this.enviaImagem}>Enviar Arquivo</button>
      </div>
    );
  }
}
