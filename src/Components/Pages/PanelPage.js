import React from 'react';
import NavBar from '../NavBar/NavigationBar';
import CategoryPage from './CategoryPage';
import ChartPage from './ChartPage';
import Welcome from 'react-welcome-page';
import PanelMain from '../Partials/PanelMain';
import ProductPage from './ProductPage';
import ProductAdd from '../Partials/ProductAdd';
import DiscountOperations from './DiscountOperations';
import AnnouncementPage from './AnnouncementPage'
import{
    BrowserRouter as Router,
    Route
  } from 'react-router-dom';
import ProductUpdate from '../Partials/ProductUpdate';
import GuestCharts from '../Partials/GuestCharts';

class PanelPage extends React.Component{
    render(){
        return(
            <Router>
                <Welcome
        loopDuration={1100}
        data={[
        {
        image: require('../../images/deneme.png'), 
        imageAnimation: 'flipInX',
        textAnimation: 'bounce',
        backgroundColor: 'grey',
        textColor: '#002134'
        },
        {
        image: require('../../images/deneme2.png'),
        backgroundColor: '#a9bad2'
        },       
    ]}
/>

                <NavBar/>
                <Route exact path='/Panel' component={PanelMain} />
                <Route exact path='/Category' component={CategoryPage}/>
                <Route exact path='/Product' component={ProductPage} />
                <Route exact path='/Statistics' component={ChartPage}/>
                <Route exact path='/ProductAdd' component={ProductAdd}/>
                <Route exact path='/ProductUpdate' component={ProductUpdate}/>
                <Route exact path='/DiscountOperations' component={DiscountOperations}/>
                <Route exact path='/AnnouncementPage' component={AnnouncementPage}/>
                <Route exact path='/GuestCharts' component={GuestCharts}/>
            </Router>
        )
    }
}

export default PanelPage;