import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {Row,Col,Button,ListGroup} from 'react-bootstrap';



export default class ChartPage extends PureComponent {
  constructor(props){
    super(props);
    this.state={
      Urunler:[],
      Tutar:0
    }
    this.bugun=this.bugun.bind(this);
    this.hafta=this.hafta.bind(this);
    this.toplam=this.toplam.bind(this);
    this.hesapla=this.hesapla.bind(this);
    this.urunSatilmaMiktari=this.urunSatilmaMiktari.bind(this);
  }
  componentDidMount(){
    fetch('https://tektekereticaretapp.azurewebsites.net/api/Urunler/ToplmSatilanGetir/').then(res => res.json()).then(data => this.setState({Urunler:data.results})).then(res=> this.hesapla());
}
hesapla(){
  let toplam=0;
  let list=this.state.Urunler;
  for(let i=0;i<list.length;i++){
    toplam=toplam+list[i].urunFiyat;
  }
  this.setState({Tutar:toplam});
}
bugun(){
  fetch('https://tektekereticaretapp.azurewebsites.net/api/Urunler/GunlukSatilanGetir').then(res => res.json()).then(data => this.setState({Urunler:data.results})).then(res=>this.hesapla());
}
hafta(){
  fetch('https://tektekereticaretapp.azurewebsites.net/api/Urunler/HaftalikSatilanGetir').then(res => res.json()).then(data => this.setState({Urunler:data.results})).then(res=>this.hesapla());
}
toplam(){
  fetch('https://tektekereticaretapp.azurewebsites.net/api/Urunler/ToplmSatilanGetir').then(res => res.json()).then(data => this.setState({Urunler:data.results})).then(res=>this.hesapla());
}
urunSatilmaMiktari(){
  fetch('https://tektekereticaretapp.azurewebsites.net/api/Urunler/').then(res => res.json()).then(data => this.setState({Urunler:data.results})).then(res=>this.hesapla());
}

  render() {
    const items=this.state.Urunler.map((elem,i)=>{
      if(elem.satilmaMiktari!=null){
        return(
          
          <ListGroup.Item>
            <div className="float-left"><b>{i+1}</b> . {elem.urunAdi}</div> 
             <span className="float-right mr-5"><b>{elem.urunFiyat} &#8378;</b></span>
             <span className="float-right mr-5"><b>Satılma Miktarı:</b>{elem.satilmaMiktari} </span>
          </ListGroup.Item>

      )

      }
      else{
        return(
          <ListGroup.Item>
            <div className="float-left"><b>{i+1}</b> . {elem.urunAdi}</div> 
             <span className="float-right mr-5"><b>{elem.urunFiyat} &#8378;</b></span>
          </ListGroup.Item>

        )
      }
      
    })
    return (
      <Row className="mt-3">

      <Col md={2}>
      </Col>
      <Col md={8} className="text-center">
      <Button variant="outline-dark" className="mx-2" onClick={this.bugun}>Bu Gün</Button>
      <Button variant="outline-dark" className="mx-2" onClick={this.hafta}>Bu Hafta</Button>
      <Button variant="outline-dark" className="mx-2" onClick={this.toplam}>Toplam</Button>
      <Button variant="outline-dark" className="mx-2" onClick={this.urunSatilmaMiktari}>Ürüne Göre</Button>
      <br/>
      <h1 style={{fontFamily:"sans-serif"}}><span style={{color:"grey"}}>Tutar: {this.state.Tutar} </span><b style={{color:"green"}}>&#8378;</b></h1>
      <ListGroup className="mt-3">
      {items}
      </ListGroup>
      </Col>
      <Col md={2}
      >
      </Col>
  </Row>
      
    );
  }
}
