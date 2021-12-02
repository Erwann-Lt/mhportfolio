import React from 'react';
import { Link } from 'react-router-dom';

import './styles/mainnav.css'

class MainNav extends React.Component {

    render() { 
        return (  
            <div className="nav-home only-desktop" style={{marginTop:'-250px'}}>
                    <ul>
                        <li className={`${this.props.gray}`}>
                            <a 
                            href='https://www.shopify.fr/' 
                            rel='noopener noreferrer' 
                            target='_blank'>
                            Boutique
                            </a>
                            <Link to="/contact">Contact</Link>
                            <Link to="/bio">Bio</Link>
                            <Link className="last-link" to="/artworks-list">Tableaux</Link>
                        </li>
                    </ul>
                </div>
        );
    }
}
 
export default MainNav;