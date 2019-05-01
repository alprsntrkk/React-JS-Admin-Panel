import React from 'react';
import {Row,Col,Form,Button,FormText} from 'react-bootstrap';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class ProductUpdate extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Urun:[],
            Kategori:[],
            Kategoriler:[],
            emptyError:"",
            errorMessage:"",
            urunID: 0,
            urunAdi:"",
            urunAciklama:"",
            stokMiktari:0,
            urunFotograf:"",
            urunFiyat: 0,
            kategoriID: 0,
            kategoriAdi:"",
            redirect: false,
            id: -1
        }
        this.onClick=this.onClick.bind(this);
        this.onChange=this.onChange.bind(this);
        this.set=this.set.bind(this);
    }
    componentDidMount(){
        fetch('https://tektekereticaretapp.azurewebsites.net/api/Urunler/'+this.props.location.state.id).then(res => res.json()).then(data => {
            this.setState({Urun:data.results});
            
                fetch('https://tektekereticaretapp.azurewebsites.net/api/Kategori/').then(res => res.json()).then(data => {
            this.setState({Kategoriler:data.results});
        })
                
        fetch('https://tektekereticaretapp.azurewebsites.net/api/Kategori/'+this.state.Urun.kategoriID).then(res=> res.json()).then(data => {
            this.setState({Kategori:data.results})}).then(res=>{
                this.set();
            });
        
        });
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state);
    }
    set(){
        console.log("calıstı.");
        this.setState({urunID:this.state.Urun.urunID});
        this.setState({urunAdi:this.state.Urun.urunAdi});
        this.setState({urunAciklama:this.state.Urun.urunAciklama});
        this.setState({stokMiktari:this.state.Urun.stokMiktari});
        this.setState({urunFotograf:this.state.Urun.urunFotograf});
        this.setState({urunFiyat:this.state.Urun.urunFiyat});
        this.setState({kategoriID:this.state.Urun.kategoriID});
        this.setState({kategoriAdi:this.state.Kategori.kategoriAdi});
        console.log(this.state.Kategori);
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
      urunID:this.state.urunID,
      urunAdi:this.state.urunAdi,
      urunAciklama:this.state.urunAciklama,
      stokMiktari:this.state.stokMiktari,
      urunFotograf:this.state.urunFotograf,
      urunFiyat:this.state.urunFiyat,
      eklemeTarihi:this.state.Urun.eklemeTarihi,
      kategoriID:this.state.kategoriID
    }

    axios.put('https://tektekereticaretapp.azurewebsites.net/api/Urunler/',urun,axiosConfig).then(res=>{
      if(res.status===200){
        this.setState({redirect:true});
      }
    });
        
    }
    render(){
      if(this.state.redirect){
        return(<Redirect to="/Product"/>)
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
    <Form.Control placeholder="" id="urunAd" name="urunAdi" value={this.state.urunAdi} onChange={this.onChange}/>
  </Form.Group>
    <Form.Label>Ürün Fiyatı</Form.Label>
    <Form.Control placeholder="" type="number" id="urunFiyat" name="urunFiyat" value={this.state.urunFiyat} onChange={this.onChange}/>
  </Form.Group>
  <Form.Group>
    <Form.Label>Ürün Açıklaması</Form.Label>
    <Form.Control placeholder="" id="urunAciklama" name="urunAciklama" value={this.state.urunAciklama} onChange={this.onChange} />
  </Form.Group>
  <Form.Group>
    <Form.Label>Stok Miktarı</Form.Label>
    <Form.Control placeholder="" type="number" id="stokMiktar" name="stokMiktari" value={this.state.stokMiktari} onChange={this.onChange}/>
  </Form.Group>
  <Form.Group>
    <Form.Label>Ürün Fotoğrafı Linki</Form.Label>
    <Form.Control placeholder="" id="fotoLink" name="urunFotograf" value={this.state.urunFotograf} onChange={this.onChange}/>
  </Form.Group>
  <Form.Group>
    <Form.Label>Kategori Adı</Form.Label>
    <Form.Control placeholder="" id="kategoriAd" name="kategoriAdi" value={this.state.kategoriAdi} onChange={this.onChange}/>
    <FormText style={{color:'red'}}>{this.state.errorMessage}</FormText>
  </Form.Group>
  <Button variant="outline-dark" className="btn-block" onClick={this.onClick}>
    Submit
  </Button>
</Form>
                
               </Col>
                
                <Col md={2}>
                </Col>
            </Row>
        )
    }
}
export default ProductUpdate;