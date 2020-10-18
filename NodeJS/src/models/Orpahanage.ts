import { Entity , Column, PrimaryGeneratedColumn , OneToMany , JoinColumn} from 'typeorm';
import Images from './Image';


@Entity('orphanages')
export default class Orphanage {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;
    
    @Column()
    open_on_weekends: boolean;

    //Primeiro parametro é o tipo do retorno
    //Segundo parametro é o campo que retorna o relacionamento inverso(orfanato)
    //Habilita em cascade inserir ou atualizar as imagens quando altera ou cria um orfanato
    @OneToMany(() => Images ,image => image.orphanage, {
        cascade: ['insert','update']
    })
    @JoinColumn({ name: 'orphanage_id'}) // Nome do relacionamento
    images: Images[];
}