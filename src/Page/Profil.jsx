import React, { useEffect, useState } from 'react'
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { Image } from 'primereact/image';
import { get } from "../axios_utils"
import Url from '../Url';
import { Link } from 'react-router-dom';

import "./profil.css"
function Profil() {
  const [dataClient, setDataClient] = useState([]);
  const [annonce, setAnnonce] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataClient(JSON.parse(localStorage.getItem('user')));
        const [response] = await Promise.all([
          get(Url + "Annonces/myAnnonces")
        ]);
        // console.log(Url + "Annonces/client/" + dataClient.id);
        // console.log(response.data.data[0]);
        setAnnonce(response.data.data[0]);
      } catch (error) {
        console.error("donnee pas arriver" + error);
      }
    }
    fetchData();
    
  }, []);
  // console.log(dataClient.id);
  // console.log(Url);
  console.log(annonce);
  // console.log("annonce :" + annonce);
  return (
    <div className='card'>
      <div className="card_inner">
        <div className="user-profil">
          <div className="image-container">
            <Image className='sary circular-image' src={dataClient.image} alt="loading.." preview />
            <br />
            <h2>{dataClient.prenom} {dataClient.nom}</h2>
            <hr className='ligne' />

          </div>
          <br />
          <div className="detail_user">
            <div className="text">
              {/* <p style={{color:'black'}}>CIN: {dataClient.cin}</p> */}
              <p style={{ color: 'black' }}>Vente :{dataClient.vente || " Aucune vente reussie"}</p>
              <p style={{ color: 'black' }}>Annonce :{dataClient.annonce || " Aucune annonce publie"}</p>

            </div>
          </div>

        </div>
      </div>
      <div className="card_inner2">
          <h2>Listes des annonces</h2>
          <div className="place_annonce">
    <div className="annonce-container">
        {annonce.map((item, index) => (
          
            <div className="annonce" key={index}>
              
                <div className="image">
                    <img src={item.images[0]} style={{width:'100px',height:'100px'}} alt="" />
                </div>
                <div className="description">
                <h2><Link to={'/Detail/' + item.id}>{item.libelle}</Link></h2>
                  <p style={{fontSize:'12 pt'}}>Etat : {item.etatVehicule.nom}</p>
                  <br />
                  <p style={{fontSize:'8pt'}}>
                  Prix : {item.prix} Ar {item.etatAnnonce === 10 ? 'Valider' : (item.etatAnnonce === 0 ? 'validation en attente' : (item.etatAnnonce === 20 ? 'vendue' : 'valider'))}
                  </p>

                </div>
            </div>
        ))}
    </div>
</div>
      </div>
    </div>
  )
}

export default Profil
