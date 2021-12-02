import React from 'react';

import Header from '../components/Header';
import MainNav from '../components/MainNav';
import BioImg from '../img/bio.jpg';

import './styles/bio.css';

class Bio extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header gray="gray-nav" />

        <div className="d-flex-bio">
          <div className="width-100 responsive-fw">
            <div className="d-flex flex-wrap">
              <div className="row-l">
                <div className="img-bio">
                  <img className="img-bio" src={BioImg} alt="Artist img bio" />
                </div>
                <h1 className="title-bio">_Bio</h1>
                <div className="only-responsive-bio">
                  <div className="bio-data">
                    <span>Naissance: 1985</span>
                    <br />
                    <span>Résidence: Bretagne</span>
                    <br />
                   
                  </div>
                </div>
              </div>
              <div className="row-r">
                <div className="justify-end only-desktop-bio">
                  <div className="bio-data">
                  <span>Naissance: 1985</span>
                    <br />
                    <span>Résidence: Bretagne</span>
                    <br />
                  </div>
                </div>
                <div>
                  <p className="bio-text">
                    J'ai vécu une grande partie de ma vie en région Parisienne,
                    au sein d'un quartier froid et gris.
                    Cependant j'ai toujours été attiré par le dessin et la peinture.
                    Ce n'est qu'en arrivant en Bretagne bien plus tard que j'ai enfin
                    pu laisser libre cours à ma passion.
                  </p>
                  <p>
                   J'aime dessiner ou peindre des choses qui me sont chères.
                   Car pour bien faire son travail il faut d'abord l'aimer.
                   Je suis tout à fait preneur de vos différentes suggestions d'ailleurs :).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <MainNav gray="gray" />
        </div>
      </React.Fragment>
    );
  }
}

export default Bio;
