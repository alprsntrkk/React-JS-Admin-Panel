import React from 'react'
import axios from 'axios'
import {Row,Col,Button,ListGroup} from 'react-bootstrap';


class GuestCharts extends React.Component{
    constructor(props){
        super(props)
        this.state={
            ziyaretcibilgi:[]
        }
        this.gunlukZiyaretci=this.gunlukZiyaretci.bind(this);
        this.haftalikZiyaretci=this.haftalikZiyaretci.bind(this);
        this.aylikZiyaretci=this.aylikZiyaretci.bind(this);
    }
    gunlukZiyaretci(){
        fetch('https://tektekereticaretapp.azurewebsites.net/api/Ziyaretci/GunlukZiyaretci/').then(res => res.json()).then(data => this.setState({ziyaretcibilgi:data.results}));
    }
    haftalikZiyaretci(){
        fetch('https://tektekereticaretapp.azurewebsites.net/api/Ziyaretci/HaftalikZiyaretci/').then(res => res.json()).then(data => this.setState({ziyaretcibilgi:data.results}));
    }
    aylikZiyaretci(){
        fetch('https://tektekereticaretapp.azurewebsites.net/api/Ziyaretci/ToplamZiyaretci/').then(res => res.json()).then(data => this.setState({ziyaretcibilgi:data.results}));
    }
    render () {
        const ziyaretci=(
            <ListGroup.Item className="float-left">
        <div><b>Bugün erişen toplam ziyaretçi sayısı: </b>  {this.state.ziyaretcibilgi}</div> 
      </ListGroup.Item>
        )
        return(
            <Row className="mt-3">

      <Col md={2}>
      </Col>
      <Col md={8} className="text-center">
      <Button variant="outline-dark" className="mx-2" onClick={this.gunlukZiyaretci}>Bu Gün</Button>
      <Button variant="outline-dark" className="mx-2" onClick={this.aylikZiyaretci}>Bu Hafta</Button>
      <Button variant="outline-dark" className="mx-2" onClick={this.aylikZiyaretci}>Toplam</Button>
      <br/>
      
      <ListGroup className="mt-3">
      {ziyaretci}
      </ListGroup>
      </Col>
      <Col md={2}
      >
      </Col>
  </Row>
        )
    }
}

export default GuestCharts;