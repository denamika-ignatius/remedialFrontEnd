import React,{Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
     } from 'reactstrap';
import { Link } from 'react-router-dom';

class Header extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
   
    render(){
        return(
        <div>
             <Navbar color="light" light expand="md">
             <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="/movieslist"><NavLink>Movies list</NavLink></Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/catagorylist"><NavLink>Category List</NavLink></Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/movcatlist"><NavLink>Connection List</NavLink></Link>
                    </NavItem>
                </Nav>
            </Collapse>
            </Navbar>
        </div>
        )
    }
}

export default Header;