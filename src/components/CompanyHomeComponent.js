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

const CompanyHome = (props) => {
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
              <NavLink href="/addservice"><span class="fa fa-plus fa-lg"></span> Add Service</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/viewservice"><span class="fa fa-eye fa-lg"></span> View Service</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/checkusers"><span class="fa fa-users fa-lg"></span> Check Users</NavLink>
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

export default CompanyHome;