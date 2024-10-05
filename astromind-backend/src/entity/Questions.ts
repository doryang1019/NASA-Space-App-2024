import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeChildren, TreeParent } from "typeorm"

@Entity()
export class Questions {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    question: string;

    @Column('simple-array')
    options: string[];

    @Column()
    correctAnswer: number;
}


/**
 * {
      question: "What method has discovered the most exoplanets?",
      options: [
        "Direct imaging",
        "Radial velocity",
        "Transit method",
        "Gravitational microlensing"
      ],
      correctAnswer: 2
    }
 */
