import React from 'react';
import {Row,Col,Button,ListGroup,Form} from 'react-bootstrap';
import axios from 'axios';
import {Redirect} from 'react-router-dom';



class DiscountOperations extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Urunler:[],
            willUpdate:[],
            checkSayisi: 0,
            errorMessage:"",
            isSucc:""
        }
        this.handleUpdate=this.handleUpdate.bind(this);
        this.handleCheck=this.handleCheck.bind(this);
        
    }
   

    componentDidMount(){
        fetch('https://tektekereticaretapp.azurewebsites.net/api/Urunler').then(res => res.json()).then(data => this.setState({Urunler:data.results}));
    }

    handleCheck(e){
        let cSayisi=this.state.checkSayisi;
            if(e.target.checked){
                var newArray = this.state.willUpdate.slice();    
                newArray.push(e.target.id);   
                this.setState({willUpdate:newArray});
                cSayisi++;
                this.setState({checkSayisi:cSayisi});
                
            }
        else{
            let list=this.state.willUpdate;
            let silinmis = list.filter(item => item !==e.target.id);
            this.setState({willUpdate:silinmis});
            cSayisi--;
            this.setState({checkSayisi:cSayisi});
        }
        console.log(this.state);
    }
    handleUpdate(){
        this.setState({isSucc:""})
        const indirimOrani=document.getElementById("discPercent").value;
        if(indirimOrani>100||indirimOrani<0||indirimOrani==null||indirimOrani==""){
            this.setState({errorMessage:"Girilen değeri kontrol edin."});
            return;
        }
        else if(this.state.checkSayisi<=0){
            this.setState({errorMessage:"Ürün seçmeyi unutmayınız."});
            return;
        }
        this.setState({errorMessage:""});
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Methods': 'PUT'
            }
          };
        
        const indirimList={
            idDizisi:this.state.willUpdate,
            indirimOrani:indirimOrani
        }
        axios.post("https://tektekereticaretapp.azurewebsites.net/api/Urunler/TopluUrunIndirim",indirimList,axiosConfig).then(asd=>{
            fetch('https://tektekereticaretapp.azurewebsites.net/api/Urunler').then(res => res.json()).then(data => this.setState({Urunler:data.results}))
    }).then(asd=>this.setState({isSucc:"İşlem başarılı."}));

    }

    
    render(){
        const items=this.state.Urunler.map((elem,i)=>{
            return(
                
                <ListGroup.Item>
                  <div className="float-left"><b>{i+1}</b> . {elem.urunAdi}</div> 

                   
                   <input type="checkbox" className="float-right" id={elem.urunID} onChange={this.handleCheck}></input>
                   <span className="float-right mr-5"><b>{elem.urunFiyat} &#8378;</b></span>

                </ListGroup.Item>

            )
            
        })
        
        return(
            <div>
            <Row>
                <Col md={4}>
                </Col>
                <Col md={4}>
                <Form className="text-center">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>İndirim Yüzdesi</Form.Label>
                    <Form.Control placeholder="%" id="discPercent" />
                    <Form.Text className="text-muted">
                    Değer 0 ile 100 arasında olmalıdır.(İndirim işaretlenen ürünlere uygulanacaktır.)<br/>
                    </Form.Text>
                    <h4 style={{color:"red"}}>
                    {this.state.errorMessage}
                    </h4>
                    <h4 style={{color:"green"}}>
                    {this.state.isSucc}
                    </h4>
                    
                </Form.Group>
                <Button variant="outline-dark" onClick={this.handleUpdate}>
                    Kaydet
                </Button>
                </Form>
                </Col>
                <Col md={4}>
                </Col>
            </Row>
            <Row>

                <Col md={2}>
                </Col>
                <Col md={8} className="text-center">
                <ListGroup className="mt-3">
                {items}
                </ListGroup>
                </Col>
                <Col md={2}
                >
                </Col>
            </Row>
            </div>
            
        )
    }
}

export default DiscountOperations;