import React, { Component } from 'react';
import './App.css';

import { Container, Table } from 'reactstrap';

import { FaTimes, FaCheck } from "react-icons/fa";

class App extends Component {
  
    constructor() {
      super();
      this.state = {
        data: []
      }
    }

  componentWillMount() {
    fetch("http://localhost:8000/status")
      .then(res => res.json().then(json =>
      this.setState({data: Object.keys(json).map(key =>
      {
        let arr = json[key];
        return {
          host: key,
          sms: arr.includes('sms'),
          ssh: arr.includes('ssh'),
          http: arr.includes('http'),
          https: arr.includes('https')
        }
      })})))
      .catch(err => console.log(err));

      
  }

  render() {
    let green = <FaCheck color="green" />;
    let red = <FaTimes color="red" />;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">DDR Status</h1>
        </header>
        <Container>
          <Table striped dark hover>
            <thead>
              <tr>
                <th>#</th>
                <th>DDR Host</th>
                <th>SMS</th>
                <th>SSH</th>
                <th>HTTP</th>
                <th>HTTPS</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((d, i) =>
              <tr key={d.host}>
                <th scope="row">{i+1}</th>
                <td >{d.host}</td>
                <td>{d.sms ? green  : red}</td>
                <td>{d.ssh ? green  : red}</td>
                <td>{d.http ? green  : red}</td>
                <td>{d.https ? green  : red}</td>
              </tr>
              )}
              
            </tbody>
          </Table>
        </Container>
      </div>

    );
  }
}

export default App;
