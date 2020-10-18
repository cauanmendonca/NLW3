import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';

import { FiPlus } from 'react-icons/fi';

import Sidebar from '../components/Sidebar';

import '../styles/pages/create-orphanage.css';
import mapIcon from '../utils/mapIcon';

import {  LeafletMouseEvent } from 'leaflet';
import api from '../services/api';
import { useHistory } from 'react-router-dom';


export default function CreateOrphanage() {

  const history = useHistory();

	const [position,setPosition] = useState({ latitude: 0 , longitude: 0});
	const [name,setName] = useState('');
	const [about,setAbout] = useState('');
	const [instructions,setInstructions] = useState('');
	const [openingHours,setOpeningHours] = useState('');
	const [openOnWeekends,setOpenOnWeekends] = useState(true);
	const [images,setImages] = useState<File[]>([]);
	const [previewImages,setPreviewImages] = useState<string[]>([]);


	//Recebe uma função do leaflet aonde o latlng é o objeto com latidude e longitude
	function handleMapClick(event: LeafletMouseEvent){

		const { lat , lng} = event.latlng;

		setPosition({
			latitude: lat,
			longitude: lng,
		})
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const {latitude , longitude} = position;

    if(latitude === 0 && longitude === 0){
      return;
    }
    const data = new FormData();

    data.append('name',name);
    data.append('latitude',String(latitude));
    data.append('longitude',String(longitude));
    data.append('about',about);
    data.append('instructions',instructions);
    data.append('opening_hours',openingHours);
    data.append('open_on_weekends',String(openOnWeekends));
    images.forEach(image =>{
      data.append('images',image);
    })

    await api.post('orphanages',data);
    alert('Cadastrado com sucesso!');
    history.push('/app');
  }


	return (
		<div id="page-create-orphanage">

			<Sidebar />

			<main>
				<form onSubmit={handleSubmit} className="create-orphanage-form">
					<fieldset>
						<legend>Dados</legend>

						<Map 
							center={[ -27.2092052, -49.6401092 ]} 
							style={{ width: '100%', height: 280 }}
							zoom={15}
							onclick={handleMapClick}
							>

							<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

							{
								position.latitude !== 0 && (
									<Marker 
										interactive={false} 
										icon={mapIcon} 
										position={[position.latitude,position.longitude]}
									/>
								)
							}
						</Map>

						<div className="input-block">
							<label htmlFor="name">Nome</label>
							<input id="name" value={name} onChange={event => setName(event.target.value)}/>
						</div>

						<div className="input-block">
							<label htmlFor="about">
								Sobre <span>Máximo de 300 caracteres</span>
							</label>
							<textarea 
									id="about" value={about} maxLength={300} 
									onChange={event => setAbout(event.target.value)}/>
						</div>

						<div className="input-block">
							<label htmlFor="images">Fotos</label>

							<div className="images-container" >
                {
                  previewImages.map(image => {
                    return (
                        <img key={image} src={image} alt={image}/>  
                    )
                  })
                }

								<label htmlFor="image[]" className="new-image">
									<FiPlus size={24} color="#15b6d6" />
								</label>
							</div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>

						</div>
					</fieldset>

					<fieldset>
						<legend>Visitação</legend>

						<div className="input-block">
							<label htmlFor="instructions">Instruções</label>
							<textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)}/>
						</div>

						<div className="input-block">
							<label htmlFor="opening_hours">Horário das visitas</label>
							<input id="opening_hours" value={openingHours} onChange={event => setOpeningHours(event.target.value)}/>
						</div>

						<div className="input-block">
							<label htmlFor="open_on_weekends">Atende fim de semana</label>

							<div className="button-select">

								<button type="button" className={openOnWeekends ? 'active' :''} 
										onClick={event => setOpenOnWeekends(true)}>
									Sim
								</button>
								<button type="button" className={!openOnWeekends? 'active' : ''} 
										onClick={event => setOpenOnWeekends(false)}>
									Não
								</button>
							</div>
						</div>
					</fieldset>

					<button className="confirm-button" type="submit">
						Confirmar
					</button>
				</form>
			</main>
		</div>
	);
}