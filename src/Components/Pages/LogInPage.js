import React from 'react';
import {Redirect} from 'react-router-dom';
import {Button,Form,Container,Row,Col} from 'react-bootstrap';
import '../../style/main.css';
import { withTheme } from 'styled-components';

class LogInPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            redirect: false,
            errormessage: ""
        }
        this.giris=this.giris.bind(this);
        this.onChange=this.onChange.bind(this);
    }
        giris(e){
            e.preventDefault();
            const pusername=this.state.username;
            const ppasword = this.state.password;
            const link='https://tektekereticaretapp.azurewebsites.net/api/Admin/GirisYap/'+pusername+'/'+ppasword+'/'
            fetch(link)
            .then((response) => response.json()).then((data)=>{
                console.log(data);
                console.log(data.results);
                if(data.results==0||data.results==null){
                    this.setState({errormessage: "Kullanıcı adı ya da şifre hatalı."})
                }
                else {
                    this.setState({redirect:true});
                }
            });
        }
        onChange(e){
            this.setState({ [e.target.name] :e.target.value});
            console.log(this.state);
        }
    render(){
        if(this.state.redirect){
            return(
                <Redirect to={"/Panel"}/>
            )
        }
        return(
            <Container fluid>
                <Row id="logIn" className="justify-content-md-center">
                    <Col md={6}>
                    <Form id="frm">
  <Form.Group controlId="formBasicEmail" onSubmit={this.giris}>
    <Form.Label style={{color:'white'}}>Kullanıcı Adı</Form.Label>
    <Form.Control onChange={this.onChange} name="username" placeholder="Kullanıcı Adı" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label style={{color:'white'}}>Şifre</Form.Label>
    <Form.Control name="password" onChange={this.onChange} type="password" placeholder="Şifre" />
    <Form.Text className="text-muted" id="err">
    <div style={{color:'black'}}>{this.state.errormessage}</div>
    </Form.Text>
  </Form.Group>
  
  <Button variant="dark" type="submit" onClick={this.giris}>
    Giriş Yap
  </Button>
</Form>
                    </Col>
                </Row>
            </Container>
            
            
        )
    }
}

export default LogInPage;