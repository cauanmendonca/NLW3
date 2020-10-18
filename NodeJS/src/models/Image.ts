import { Entity , Column, PrimaryGeneratedColumn , ManyToOne, JoinColumn} from 'typeorm';
import Orphanage from './Orpahanage';

@Entity('images')
export default class OrphImageanage {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Orphanage, orphanage => orphanage.images)
    @JoinColumn({name:'orphanage_id'})
    orphanage: Orphanage;
}