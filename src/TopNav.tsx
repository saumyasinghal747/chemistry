import React, { useState }  from 'react';
import {
    Navbar, //NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Collapse,
    Dropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu
} from "shards-react";
import {
    Link
} from "react-router-dom";
export default function TopNav() {
    const [collapseOpen, setCollapseOpen] = useState(false);
    const toggleNavbar  =  ()=>{setCollapseOpen(!collapseOpen);}
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = ()=>{setDropdownOpen(!dropdownOpen);}
    return (
        <Navbar  type="dark" theme="primary" expand="md">

                <Link to="/" className="navbar-brand">Saumya's Chemistry Toolbox</Link>

            <NavbarToggler onClick={toggleNavbar}/>
            <Collapse open={collapseOpen} navbar>
                <Nav navbar>
                    <NavItem>
                            <Link className="nav-link active" to="/calculators/specific-heat">
                                Specific Heat
                            </Link>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/calculators/physics/range">
                            Projectile Range
                        </NavLink>
                    </NavItem>
                    <Dropdown
                        open={dropdownOpen}
                        toggle={toggleDropdown}
                    >
                        <DropdownToggle nav caret>
                            Dropdown
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Action</DropdownItem>
                            <DropdownItem>Another action</DropdownItem>
                            <DropdownItem>Something else here</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Nav>
            </Collapse>
        </Navbar>

    )
}