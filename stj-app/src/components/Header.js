import React from 'react';

const Header = (props) => {

    const moveNav = props.moveNav;


    return (
        <nav className="navbar navbar-expand-sm  navbar-custom " >
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" onClick={moveNav} href="#">Side</a>
                </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                <li className="nav-item ">
                    <a className="nav-link" href="#">Home</a>
                </li>


            </ul>
        </nav>
    );
}

export default Header;