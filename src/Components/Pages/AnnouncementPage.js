import React from 'react'
import {Row,Col,Form,Button} from 'react-bootstrap'
import { Z_BLOCK } from 'zlib';
import Axios from 'axios';

class AnnouncementPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            errorMesage:"",
            duyuru:""
        }
        this.duyuruYap=this.duyuruYap.bind(this)
        this.onChange=this.onChange.bind(this)
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
        console.log(this.state.duyuru)
    }
    duyuruYap(){
        const duyuru=this.state.duyuru;
        if(duyuru==null||duyuru==""){
            this.setState({errorMesage:"İçerik boş geçilemez."})
            return
        }
        this.setState({errorMesage:""})
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
        Axios.post("https://tektekereticaretapp.azurewebsites.net/api/Yorum/DuyuruYap/"+duyuru,duyuru,axiosConfig)
    }
    render(){
        return(
            <Row className="mt-5">
                <Col md={2}>
                </Col>
                <Col md={8}>
                <Form onSubmit={this.duyuruYap}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label><h4 style={{fontFamily:"Palatino Linotype"}}><b>Duyuru İçeriği</b></h4></Form.Label>
                <Form.Control as="textarea" rows="6" name="duyuru" onChange={this.onChange}/>
                <Form.Text className="text-muted">
                {}
                </Form.Text>
            </Form.Group>
            <Button variant="dark" onClick={this.duyuruYap} block={true}>
                Duyuruyu Paylaş
            </Button>
            </Form>
                </Col>
                <Col md={2}>
                </Col>
            </Row>
        )
    }
}

export default AnnouncementPage;