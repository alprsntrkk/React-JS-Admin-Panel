import React from 'react';
import {Row,Col,Form,Button, FormText} from 'react-bootstrap';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class ProductAdd extends React.Component{
    constructor(props){
        super(props);
        this.state={
          Kategoriler:[],
            redirect:false,
            errorMessage:"",
            emptyError:""
        }
        this.onClick=this.onClick.bind(this);
    }
    componentDidMount(){
      fetch('https://tektekereticaretapp.azurewebsites.net/api/Kategori').then(res => res.json()).then(data => this.setState({Kategoriler:data.results}));
  }
  onClick(){
    const catAdi=document.getElementById("kategoriAd").value;
    const Cats=this.state.Kategoriler;
    let isError=true;
    let kategoriidd=0;
    for(let i=0;i<Cats.length;i++){
      if(Cats[i].kategoriAdi===catAdi){
        isError=false;
        kategoriidd=Cats[i].kategoriID;
      }
    }
    
    const ad=document.getElementById("urunAd").value;
    const aciklama=document.getElementById("urunAciklama").value;
    const stok=document.getElementById("stokMiktar").value;
    const foto=document.getElementById("fotoLink").value;
    const fiyat=document.getElementById("urunFiyat").value;
    if(ad==''||ad==null||aciklama==''||aciklama==null||stok==''||stok==null||foto==''||foto==null||fiyat==''||fiyat==null||catAdi==''||catAdi==null){
      this.setState({emptyError:"Eksik yada yanlış bilgi girdiniz."})
      this.setState({errorMessage:""});
      return;
    }
    this.setState({emptyError:""});
    if(isError){
      this.setState({errorMessage:"Böyle bir kategori yok."});
      return;
    }
    
    this.setState({errorMessage:""});

    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    const urun = {
      urunAdi:ad,
      urunAciklama:aciklama,
      stokMiktari:stok,
      urunFotograf:foto,
      urunFiyat:fiyat,
      kategoriID:kategoriidd
    }

    axios.post('https://tektekereticaretapp.azurewebsites.net/api/Urunler/',urun).then(res=>{
      if(res.status===200){
        this.setState({redirect:true});
      }
    });
  }
    render(){
      if(this.state.redirect){
        return(<Redirect to='/Product'/>)
      }
        return(
            <Row>
                <Col md={2}>
                </Col>
                
               <Col md={8}>
               <Form className="mt-3" onSubmit={this.onClick}>
                
                <Form.Group><Form.Group>
    <h4 className="text-center"style={{color:'red', fontFamily:'sans-serif'}}>{this.state.emptyError}</h4>
                    
    <Form.Label>Ürün Adı</Form.Label>
    <Form.Control placeholder="" id="urunAd"/>
  </Form.Group>
    <Form.Label>Ürün Fiyatı</Form.Label>
    <Form.Control placeholder="" type="number" id="urunFiyat"/>
  </Form.Group>
  <Form.Group>
    <Form.Label>Ürün Açıklaması</Form.Label>
    <Form.Control placeholder="" id="urunAciklama" />
  </Form.Group>
  <Form.Group>
    <Form.Label>Stok Miktarı</Form.Label>
    <Form.Control placeholder="" type="number" id="stokMiktar"/>
  </Form.Group>
  <Form.Group>
    <Form.Label>Ürün Fotoğrafı Linki</Form.Label>
    <Form.Control placeholder="" id="fotoLink"/>
  </Form.Group>
  <Form.Group>
    <Form.Label>Kategori Adı</Form.Label>
    <Form.Control placeholder="" id="kategoriAd"/>
    <FormText style={{color:'red'}}>{this.state.errorMessage}</FormText>
  </Form.Group>
  <Button variant="outline-dark" className="btn-block" onClick={this.onClick}>
    Kaydet
  </Button>
</Form>
                
               </Col>
                
                <Col md={2}>
                </Col>
            </Row>
            
        )
    }
}

export default ProductAdd;