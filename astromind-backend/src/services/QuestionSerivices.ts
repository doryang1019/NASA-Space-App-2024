import { Questions } from "../entity/Questions";
import { AppDataSource } from "../data-source";

export class QuestionService {
    private quesRepo = AppDataSource.getRepository(Questions);

    constructor() {
        this.quesRepo = AppDataSource.getRepository(Questions);
    }


    async initialQuestion() {
        const questions =[ {
            question: "What is an exoplanet?",
            options: [
              "A planet in our solar system",
              "A planet orbiting a star other than the Sun",
              "A dwarf planet",
              "A moon orbiting a planet"
            ],
            correctAnswer: 1
          },
          {
            question: "Which of these is NOT a type of exoplanet?",
            options: [
              "Hot Jupiter",
              "Super-Earth",
              "Micro-Neptune",
              "Dyson Sphere"
            ],
            correctAnswer: 3
          },
          {
            question: "What method has discovered the most exoplanets?",
            options: [
              "Direct imaging",
              "Radial velocity",
              "Transit method",
              "Gravitational microlensing"
            ],
            correctAnswer: 2
          }]

         questions.forEach(async(x) => {
            const buffer = new Questions();
            buffer.correctAnswer = x.correctAnswer;
            buffer.options = x.options;
            buffer.question = x.question;
            await this.quesRepo.save(buffer);
         })

         return 'OK';
    }

    async getAll() {
        try {
            const result = await this.quesRepo.find();
            return result;
        } catch (error) {

        }
    }
}
