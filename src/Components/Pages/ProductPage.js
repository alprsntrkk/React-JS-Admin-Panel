import React from 'react';
import {Row,Col,Button,ListGroup} from 'react-bootstrap';
import axios from 'axios';
import '../../style/main.css';
import {Redirect} from 'react-router-dom';
import ProductUpdate from '../Partials/ProductUpdate';

class ProductPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Urunler:[],
            redirectAdd:false,
            redirectUpdate:false,
            updateID:-1
        }
        this.onClick=this.onClick.bind(this); 
        this.handleDelete=this.handleDelete.bind(this); 
        this.handleUpdate=this.handleUpdate.bind(this); 
    }
    onClick(){
        this.setState({redirectAdd: true});
    }
    handleDelete(e){
        const id=e.target.id;
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Methods': 'PUT'
            }
          };
          console.log(id);
        axios.delete('https://tektekereticaretapp.azurewebsites.net/api/Urunler/'+id,axiosConfig).then(res => {
            fetch('https://tektekereticaretapp.azurewebsites.net/api/Urunler').then(res => res.json()).then(data => this.setState({Urunler:data.results}));

        });

    }
    handleUpdate(e){
        this.setState({updateID:e.target.id});
        this.setState({redirectUpdate: true});
    }

    componentDidMount(){
        fetch('https://tektekereticaretapp.azurewebsites.net/api/Urunler').then(res => res.json()).then(data => this.setState({Urunler:data.results}));
    }

    
    render(){
        if(this.state.redirectUpdate){
            return(<Redirect to={{
                pathname: '/ProductUpdate',
                state: { id: this.state.updateID  }
              }}
              />)
        }
        if(this.state.redirectAdd){
            return(<Redirect to="/ProductAdd"/>)
        }
        const items=this.state.Urunler.map((elem,i)=>{
            return(
                
                <ListGroup.Item>
                  <div className="float-left"><b>{i+1}</b> . {elem.urunAdi}</div> 
                   <Button variant="outline-dark mr-3" className="float-right" id={elem.urunID} onClick={this.handleUpdate}>Düzenle</Button>
                   <Button variant="outline-dark mr-2" className="float-right" id={elem.urunID} onClick={this.handleDelete}>Kaldır</Button>
                   <span className="float-right mr-5"><b>{elem.urunFiyat} &#8378;</b></span>
                </ListGroup.Item>

            )
            
        })
        
        return(
            <Row>

                <Col md={2}>
                </Col>
                <Col md={8} className="text-center">
                <Button variant="outline-dark mt-2" onClick={this.onClick}>Ürün Ekle</Button>
                <ListGroup className="mt-3">
                {items}
                </ListGroup>
                </Col>
                <Col md={2}
                >
                </Col>
            </Row>
            
        )
    }
}


export default ProductPage;