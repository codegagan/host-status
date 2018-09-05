import React, { Component } from 'react';
import './App.css';

import { Container, Table } from 'reactstrap';
import logo from './logo.svg';

import { FaTimes, FaCheck } from "react-icons/fa";

import Host from "./Host";

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: []
    }
    
  }

  componentWillMount() {
    fetch("http://10.30.233.104:8000/api/status")
      .then(res => res.json().then(json =>
        this.setState({
          data: Object.keys(json).map(key => {
            let arr = json[key];
            return {
              host: key,
              sms: arr.includes('sms'),
              ssh: arr.includes('ssh'),
              http: arr.includes('http'),
              https: arr.includes('https'),
              version: arr.find(x => x.includes('Data Domain OS'))
            }
          })
        })))
      .catch(err => console.log(err));


  }

  render() {
    let green = <FaCheck color="green" />;
    let red = <FaTimes color="red" />;

    return (
      <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">DDR Status</h1>
        </header>
        <Container>
          <Table striped dark>
            <thead>
              <tr>
                <th>#</th>
                <th>DDR Host</th>
                <th>SMS</th>
                <th>SSH</th>
                <th>HTTP</th>
                <th>HTTPS</th>
                <th>OS version</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((d, i) =>
                <tr key={d.host}>
                  <th scope="row">{i + 1}</th>
                  <td>
                   <Host key={d.host} host={d.host}></Host>
                  </td>
                  <td>{d.sms ? green : red}</td>
                  <td>{d.ssh ? green : red}</td>
                  <td><a href={`http://${d.host}`} target="_blank"> {d.http ? green : red}</a></td>
                  <td><a href={`https://${d.host}`} target="_blank">{d.https ? green : red}</a></td>
                  <td>{d.version}</td>
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
