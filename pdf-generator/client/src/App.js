import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

import './App.css';

class App extends Component {
  state = {
    name: '',
    Companyname: '',
    Ceoname: '',
    
  }

  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

  createAndDownloadPdf = () => {
    axios.post('/create-pdf', this.state)
      .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'certificate.pdf');
      })
  }

  render() {
    return (
      <div className="App">
        <h1>Download your certificate</h1>
        <input type="text" placeholder="Name" name="name" onChange={this.handleChange}/>
        <input type="text" placeholder="Company Name" name="Companyname" onChange={this.handleChange} />
        <input type="text" placeholder="Ceo name" name="Ceoname" onChange={this.handleChange} />
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
      </div>
    );
  }
}

export default App;