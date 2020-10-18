import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Orphanage from '../models/Orpahanage';
import OrphanageView from '../view/orphanages_view';

import * as Yup from 'yup';

export default {

    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.status(200).json(OrphanageView.renderMany(orphanages));

    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.status(200).json(OrphanageView.render(orphanage));

    },

    async create(request: Request, response: Response) {

        //Desestruturar o request
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;

        //Recebe o repositório do tipo Orphanage
        const orphanagesRepository = getRepository(Orphanage);

        //Recebe as imagens através do multer forçando que é um array do multer
        const requestImages = request.files as Express.Multer.File[];

        //Lista com os paths das imagens
        const images = requestImages.map(
            image => {
                return { path: image.filename }
            }
        )

        //Objeto com mesma formatação do orphanage 
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            latitude: Yup.number().required('Latitude obrigatória'),
            longitude: Yup.number().required('Longitude obrigatório'),
            about: Yup.string().max(300).required('Campo Sobre é obrigatório'),
            instructions: Yup.string().required('Instruções é obrigatório'),
            opening_hours: Yup.string().required('Horário de abertura é obrigatório'),
            open_on_weekends: Yup.boolean().required('Informar se abre nos fins de semana é obrigatório'),
            images: Yup.array(
                Yup.object().shape({
                    patch: Yup.string().required('Uma imagem é Obrigatória')
                })
            )
        });

        //Não parar a verificação após o primeiro erro
        //para que possa ser mostrados todos os erros
        await schema.validate(data, { 
            abortEarly: false
        });

        //Insere o objeto anterior que contém os atributos já preenchidos 
        const orphanage = orphanagesRepository.create(data);

        //Assincronamente aguarda o save desse objeto orphanageno banco
        await orphanagesRepository.save(orphanage);

        //No final ele envia o objeto com o status
        return response.status(201).json(orphanage)
    }


};