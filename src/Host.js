import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Host extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.isData = this.isData.bind(this);
        this.onOpened = this.onOpened.bind(this);

        this.state = {
            modal: false,
            data: {},
            status: 'loading...'
        };
    }

    toggle() {
        
        this.setState({
            modal: !this.state.modal
        });
        this.onOpened();
    }

    isData() {
        return this.state.data.name
    }

    hasData(data){
        return data.name
    }

    onOpened() {
        if (!this.isData()) {
            fetch(`http://10.30.233.104:8000/api/system/${this.props.host}`)
                .then(res => res.json().then(json => {
                    if(this.hasData(json)){
                        this.setState({
                            data: json
                        })
                    } else {
                        this.setState({status: 'Not available'})
                    }
                })
                )
                .catch(err => console.log(err))
                
        }
    }

    render() {
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
        const d = this.state.data;
        return (

            <div>
                <Button color="link" className="text-white" id={'popover-' + this.props.host} onClick={this.toggle} title="See details">
                    {this.props.host}
                </Button>
                <Modal centered={true} size="md" isOpen={this.state.modal} toggle={this.toggle}
                    className="dark" external={externalCloseBtn}>
                    <ModalHeader>{this.props.host}</ModalHeader>
                    <ModalBody>

                        {this.isData() ?
                            (<div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-4">Model:</div>
                                    <div className="col-md-8 ml-auto text-nowrap font-weight-bold">{d.model}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">Version:</div>
                                    <div className="col-md-8 ml-auto text-nowrap font-weight-bold">{d.version}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">Serial No:</div>
                                    <div className="col-md-8 ml-auto text-nowrap font-weight-bold">{d.serialno}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">Up Time:</div>
                                    <div className="col-md-8 ml-auto text-nowrap font-weight-bold">{d.uptime}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">Type:</div>
                                    <div className="col-md-8 ml-auto text-nowrap font-weight-bold">{d.type}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">Time Zone:</div>
                                    <div className="col-md-8 ml-auto text-nowrap font-weight-bold">{d.time_zone}</div>
                                </div>
                                
                            </div>)
                            :
                            (<b>{this.state.status}</b>)
                        }

                    </ModalBody>
                    <ModalFooter>
                        {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
                        <Button color="secondary" onClick={this.toggle}>OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}