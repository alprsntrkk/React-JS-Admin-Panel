import React from 'react';
import{
    Link
  } from 'react-router-dom';
import {Navbar,Nav,Dropdown,DropdownButton} from 'react-bootstrap';
class NavigationBar extends React.Component{
render(){
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand><i className="fas fa-motorcycle"></i></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
    <Link to="Category" className="ml-3">Kategori İşlemleri</Link>
    <Link to="Product" className="ml-5">Ürün İşlemleri</Link>
    <Link to="/DiscountOperations" className="ml-5">İndirim İşlemleri</Link>
    <Link to="AnnouncementPage" className="ml-5">Duyuru(Pop-Up) İşlemleri</Link>
    <Link to="Statistics" className="ml-5">İstatistikler</Link>
    <Link to="GuestCharts" className="ml-5">Ziyaretçi İstatistikleri</Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>  
)
}
}

export default NavigationBar;



