import React from 'react';

import "../styles/pages/orphanages-map.css";

import mapMarkerImg from '../images/map-marker.svg';

import {FiPlus} from 'react-icons/fi'

import {Link} from 'react-router-dom';

import {Map,TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

//Para acessar uma variável ambiente é preciso colocar
// ${process.env.NOMEVAR}

function OrphanagesMap(){
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt=""/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Rio de Janeiro</strong>
                    <span>Rio de Janeiro</span>
                </footer>
            </aside>

            <Map 
                center={[-22.8853539,-43.4933632]}
                zoom={15}
                style={{ width: '100%',height:'100%'}}
            >   
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    );
}

export default OrphanagesMap;