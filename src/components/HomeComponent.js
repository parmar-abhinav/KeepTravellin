import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const Home = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">KeepTravellin'</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/destination"><span class="fa fa-map-marker fa-lg"></span> Destination</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/maketrip"><span class="fa fa-plane fa-lg"></span> MakeTrip</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/wishlist"><span class="fa fa-star fa-lg"></span> WishList</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/addstory"><span class="fa fa-plus fa-lg"></span> AddStory</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/stories"><span class="fa fa-history fa-lg"></span> Stories</NavLink>
            </NavItem>
            
          </Nav>

          <UncontrolledDropdown navbar>
              <DropdownToggle nav>
              <i class="fa fa-user fa-lg"  aria-hidden="true"></i>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink href="/profile">My Profile</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/editprofile">Edit Profile</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={props.logoutUser}>
                  <NavLink>Logout</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Home;