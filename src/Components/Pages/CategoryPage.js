import React from 'react';
import {Row,Col,Form,Button,ListGroup,Modal} from 'react-bootstrap';
import CategoryForm from '../Partials/CategoryForm';
import axios from 'axios';
class CategoryPage extends React.Component{
constructor(props){
    super(props);
    this.state={
        Kategoriler:[],
        updating:-1,
        show:false,
        updateErr:""
    }
    this.addCategory=this.addCategory.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUpdate=this.handleUpdate.bind(this);
    
}

handleClose() {
  this.setState({ show: false });
  }

  handleShow(e) {
    this.setState({show: true});
    this.setState({updating: e.target.id});
  }

componentDidMount(){
    fetch('https://tektekereticaretapp.azurewebsites.net/api/Kategori').then(res => res.json()).then(data => this.setState({Kategoriler:data.results}));
}
addCategory(name){
  const category={
    kategoriAdi: name,
    satilmaMiktari: 0
  }
  const cats=this.state.Kategoriler;
  for(let i=0;i<cats.length;i++){
    if(cats[i].kategoriAdi==name){
      this.setState({updateErr:"Aynı isimde başka bir kategori olmadığından emin olun."})
      return;
    }
  }
  console.log(category);
  if(name==''||name==null){
    alert('Kategori Adı Boş Geçilemez.');
    return;
  }
let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};
axios.post('https://tektekereticaretapp.azurewebsites.net/api/Kategori', category, axiosConfig)
.then((res) => {
  console.log("RESPONSE RECEIVED: ", res);
})
.catch((err) => {
  console.log("AXIOS ERROR: ", err);
}).then(() =>fetch('https://tektekereticaretapp.azurewebsites.net/api/Kategori').then(res => res.json()).then(data => this.setState({Kategoriler:data.results})));
} 
onClick=(e)=>{
  this.setState({updateErr:""});
  const kategoriID=e.target.id;
let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
  }
};
axios.delete('https://tektekereticaretapp.azurewebsites.net/api/Kategori/'+kategoriID+'/',kategoriID,axiosConfig)
.then((res) => {
  
},(error)=>{
    alert("Kategoriye kayıtlı ürünler var.Kategori silinemez.");
    return;
})
.then(() =>fetch('https://tektekereticaretapp.azurewebsites.net/api/Kategori').then(res => res.json())
.then(data => this.setState({Kategoriler:data.results})));
}

handleUpdate(e){
  e.preventDefault();
  let updatedCategory={};
  let catId=this.state.updating;
  let dizi= this.state.Kategoriler;
  let catName=document.getElementById('updateInp').value;
  for(let i=0;i<dizi.length;i++){
    if(dizi[i].kategoriAdi==catName){
      this.setState({updateErr:"Aynı isimde başka bir kategori olmadığından emin olun."})
      return;
    }
    if(dizi[i].kategoriID==catId){
      updatedCategory={
        id: dizi[i].kategoriID,
        katAdi: catName,
    }

    }
    this.setState({show:false});
    fetch('https://tektekereticaretapp.azurewebsites.net/api/Kategori').then(res => res.json()).then(data => this.setState({Kategoriler:data.results}));

  }
  
  console.log(updatedCategory);
  let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'PUT'
    }
  };
  axios.put('https://tektekereticaretapp.azurewebsites.net/api/Kategori/'+updatedCategory.id+'/'+updatedCategory.katAdi+'/',updatedCategory,axiosConfig).then(res=>{
console.log('gg');
  }).then(res => fetch('https://tektekereticaretapp.azurewebsites.net/api/Kategori').then(res => res.json()).then(data => this.setState({Kategoriler:data.results}))).then(asd=>{
    this.setState({updateErr:""});
  });
}

    render(){
        const items=this.state.Kategoriler.map((elem,i)=>{
            return(
                <ListGroup.Item key={i}><b>{i+1}</b> . {elem.kategoriAdi}   
                 <Button variant="outline-dark" className="mr-4 float-right" onClick={this.handleShow} id={elem.kategoriID}>Düzenle</Button>
                 <Button variant="outline-dark" className="float-right mr-3" onClick={this.onClick} id={elem.kategoriID}>Sil</Button>
                 </ListGroup.Item>
            )
        })
        return(
            <div>
            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
          </Modal.Header>
            <Modal.Body>
          <Form onSubmit={this.handleUpdate}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Yeni Ad</Form.Label>
    <Form.Control placeholder="Kategori Adı" id="updateInp" />
    <Form.Text className="text-muted">
      {this.state.updateErr}
    </Form.Text>
  </Form.Group>
  <Button variant="dark" onClick={this.handleUpdate}>
    Kaydet
  </Button>
</Form>
          </Modal.Body>
            </Modal>            
            <CategoryForm addCategory={this.addCategory} updateErr={this.state.updateErr}/>
            <Row className="my-5">
            <Col md={3}>
            </Col>
            <Col md={6} className="mt-5">
            <ListGroup className="mr-auto">
                {items}
            </ListGroup>
            </Col>
            <Col md={3}>
            </Col>
        </Row>
        </div>
        )
    }
}


export default CategoryPage;