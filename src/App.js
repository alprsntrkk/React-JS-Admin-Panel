import React from 'react';
import LogInPage from './Components/Pages/LogInPage';
import PanelPage from './Components/Pages/PanelPage';
import{
    BrowserRouter as Router,
    Route
  } from 'react-router-dom';
import {Container} from 'react-bootstrap';

class App extends React.Component{
    render(){
        return(
            <Router>
            <Container bsPrefix >
                <Route exact path="/" component={LogInPage}/>
                <Route exact path="/Panel" component={PanelPage}/>

            </Container>
            </Router>
            
            
            
        )
    }
}

export default App;