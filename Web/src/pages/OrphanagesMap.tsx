import React, { useEffect, useState } from 'react';
import api from '../services/api';

import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import mapMarkerImg from '../images/map-marker.svg';

import mapIcon from '../utils/mapIcon';

import '../styles/pages/orphanages-map.css';

interface Orphanage {
	id: number;
	latitude: number;
	longitude: number;
	name: string;
}

function OrphanagesMap() {
	const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]);

	//Primeiro parametro é qual ação executar
	//Segundo parametro é quando executar
	useEffect(() => {
		api.get('orphanages').then((response) => {
			setOrphanages(response.data);
		});
	}, []);

	return (
		<div id="page-map">
			<aside>
				<header>
					<img src={mapMarkerImg} alt="" />
					<h2>Escolha um orfanato no mapa</h2>
					<p>Muitas crianças estão esperando a sua visita :)</p>
				</header>

				<footer>
					<strong>Rio de Janeiro</strong>
					<span>Rio de Janeiro</span>
				</footer>
			</aside>

			<Map center={[ -22.8853539, -43.4933632 ]} zoom={15} style={{ width: '100%', height: '100%' }}>
				<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

				{orphanages.map((orphanage) => {
					return (
						<Marker
							position={[ orphanage.latitude, orphanage.longitude ]}
							icon={mapIcon}
							key={orphanage.id}
						>
							<Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
								{orphanage.name}
								<Link to={`/orphanages/${orphanage.id}`}>
									<FiArrowRight size={32} color="#fff" />
								</Link>
							</Popup>
						</Marker>
					);
				})}
			</Map>

			<Link to="/orphanages/create" className="create-orphanage">
				<FiPlus size={32} color="#fff" />
			</Link>
		</div>
	);
}

export default OrphanagesMap;
