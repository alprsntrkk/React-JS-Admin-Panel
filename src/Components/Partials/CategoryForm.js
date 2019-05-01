import React from 'react';
import {Row,Col,Form,Button, FormText} from 'react-bootstrap';

class CategoryForm extends React.Component{

    constructor(props){
        super(props);
        this.state={
            errorMessage:''
        }
        this.addCategory=this.addCategory.bind(this);
    }
addCategory(event){
    event.preventDefault();
    const eklenen = document.getElementById("cat");
    if(eklenen.value==''||eklenen.value==null){
        this.setState({errorMessage:'Kategori adı boş geçilemez.'});
        return;
    }
    this.props.addCategory(eklenen.value);
}

    render(){
        return(
            <Row className="my-5">
                <Col md={3}>
                </Col>
                <Col md={6} className="mt-5">
                <Form id="frm">
  <Form.Group onSubmit={this.props.addCategory}>
    <Form.Label>Kategori Adı</Form.Label>
    <Form.Control placeholder="Kategori Adı" id="cat"/>
    <FormText style={{fontFamily:'sans-serif',color:'red'}}>{this.state.errorMessage}{this.props.updateErr}</FormText>
  </Form.Group>

  <Button variant="outline-dark" onClick={this.addCategory}>
    Kategori Ekle
  </Button>
</Form>
                
                </Col>
                <Col md={3}>
                </Col>
            </Row>  

    )
            
    }
}

export default CategoryForm;