
import { ExpoPlanetNode } from "../entity/ExpoPlanetNode";
import { AppDataSource } from "../data-source";
export class ExpoPlanetInitialService {
    private expoRepo = AppDataSource.getRepository(ExpoPlanetNode);

    constructor() {
        this.expoRepo = AppDataSource.getRepository(ExpoPlanetNode);
    }

    async buildTerrestrialTree() {
        try {
            const root = new ExpoPlanetNode("Terrestrial");
            console.log("test1" + root.id)
            const definition = new ExpoPlanetNode("Definition");
            definition.addChild(new ExpoPlanetNode("Rocky planets"));
            definition.addChild(new ExpoPlanetNode("Similar to Earth, Venus, Mars, Mercury"));
            definition.addChild(new ExpoPlanetNode("Solid surfaces"));
            root.addChild(definition);
            console.log("test2" + root);
            const types = new ExpoPlanetNode("Types");
            const earthLike = new ExpoPlanetNode("Earth-like");
            earthLike.addChild(new ExpoPlanetNode("Similar size and mass to Earth"));
            earthLike.addChild(new ExpoPlanetNode("Potentially habitable"));
            types.addChild(earthLike);
            console.log("test3" + root);
            const superEarths = new ExpoPlanetNode("Super-Earths");
            superEarths.addChild(new ExpoPlanetNode("More massive than Earth"));
            superEarths.addChild(new ExpoPlanetNode("Up to 10 Earth masses"));
            types.addChild(superEarths);
            console.log("test4" + root);
            const miniNeptunes = new ExpoPlanetNode("Mini-Neptunes");
            miniNeptunes.addChild(new ExpoPlanetNode("Larger than Earth, smaller than Neptune"));
            miniNeptunes.addChild(new ExpoPlanetNode("May have thick atmospheres"));
            types.addChild(miniNeptunes);
            root.addChild(types);
            console.log("test5" + root);
            const formation = new ExpoPlanetNode("Formation");
            formation.addChild(new ExpoPlanetNode("Accretion of rocky materials"));
            formation.addChild(new ExpoPlanetNode("In inner regions of protoplanetary disks"));
            formation.addChild(new ExpoPlanetNode("Core formation"));
            root.addChild(formation);
            console.log("test6" + root);
            const composition = new ExpoPlanetNode("Composition");
            const crust = new ExpoPlanetNode("Crust");
            crust.addChild(new ExpoPlanetNode("Rocky materials (silicates)"));
            composition.addChild(crust);
            const mantle = new ExpoPlanetNode("Mantle");
            mantle.addChild(new ExpoPlanetNode("Silicate rocks"));
            mantle.addChild(new ExpoPlanetNode("Possible liquid layer"));
            composition.addChild(mantle);
            const core = new ExpoPlanetNode("Core");
            core.addChild(new ExpoPlanetNode("Dense metals (iron, nickel)"));
            composition.addChild(core);
            root.addChild(composition);

            const atmosphere = new ExpoPlanetNode("Atmosphere");
            atmosphere.addChild(new ExpoPlanetNode("Can vary widely"));
            atmosphere.addChild(new ExpoPlanetNode("Possible components: nitrogen, oxygen, carbon dioxide"));
            atmosphere.addChild(new ExpoPlanetNode("Some may lack atmosphere"));
            root.addChild(atmosphere);

            const detectionMethods = new ExpoPlanetNode("Detection Methods");
            const transitMethod = new ExpoPlanetNode("Transit Method");
            transitMethod.addChild(new ExpoPlanetNode("Planet passes in front of star"));
            transitMethod.addChild(new ExpoPlanetNode("Tiny dip in star's brightness"));
            detectionMethods.addChild(transitMethod);
            const radialVelocityMethod = new ExpoPlanetNode("Radial Velocity Method");
            radialVelocityMethod.addChild(new ExpoPlanetNode("Star's slight 'wobble'"));
            radialVelocityMethod.addChild(new ExpoPlanetNode("More challenging for smaller planets"));
            detectionMethods.addChild(radialVelocityMethod);
            root.addChild(detectionMethods);
            console.log(root.children.length);
            const saveNode = async (node: ExpoPlanetNode): Promise<ExpoPlanetNode> => {
                const savedNode = await this.expoRepo.save(node);
                if (node.children && node.children.length > 0) {
                    savedNode.children = await Promise.all(node.children.map(child => saveNode(child)));
                }
                return savedNode;
            };

            // Save the entire tree structure
            const savedRoot = await saveNode(root);
            return savedRoot;
        } catch (error) {
            console.error(error);
        }

    }
    async buildSuperEarthTree() {
        const root = new ExpoPlanetNode("Super-Earths");

        // 1. Definition
        const definition = new ExpoPlanetNode("Definition");
        definition.addChild(new ExpoPlanetNode("Planets more massive than Earth"));
        definition.addChild(new ExpoPlanetNode("Up to 10 Earth masses"));
        definition.addChild(new ExpoPlanetNode("Radius typically 1.25 to 2 times Earth's"));
        root.addChild(definition);

        // 2. Physical Characteristics
        const physicalCharacteristics = new ExpoPlanetNode("Physical Characteristics");
        physicalCharacteristics.addChild(new ExpoPlanetNode("Stronger gravity than Earth"));
        physicalCharacteristics.addChild(new ExpoPlanetNode("Potentially diverse compositions"));
        physicalCharacteristics.addChild(new ExpoPlanetNode("May retain thicker atmospheres"));
        root.addChild(physicalCharacteristics);

        // 3. Possible Compositions
        const compositions = new ExpoPlanetNode("Possible Compositions");
        compositions.addChild(new ExpoPlanetNode("Rocky (terrestrial)"));
        compositions.addChild(new ExpoPlanetNode("Ocean worlds"));
        compositions.addChild(new ExpoPlanetNode("Mini-gas giants"));
        root.addChild(compositions);

        // 4. Geological Features
        const geologicalFeatures = new ExpoPlanetNode("Geological Features");
        geologicalFeatures.addChild(new ExpoPlanetNode("Potential for plate tectonics"));
        geologicalFeatures.addChild(new ExpoPlanetNode("Could be more geologically active than Earth"));
        geologicalFeatures.addChild(new ExpoPlanetNode("Possible internal structure variations"));
        root.addChild(geologicalFeatures);

        // 5. Atmospheric Properties
        const atmosphericProperties = new ExpoPlanetNode("Atmospheric Properties");
        atmosphericProperties.addChild(new ExpoPlanetNode("Thicker atmospheres possible"));
        atmosphericProperties.addChild(new ExpoPlanetNode("Wide range of potential compositions"));
        atmosphericProperties.addChild(new ExpoPlanetNode("Greenhouse effect considerations"));
        root.addChild(atmosphericProperties);

        // 6. Habitability Factors
        const habitabilityFactors = new ExpoPlanetNode("Habitability Factors");
        habitabilityFactors.addChild(new ExpoPlanetNode("Potential for liquid water"));
        habitabilityFactors.addChild(new ExpoPlanetNode("Atmospheric composition crucial"));
        habitabilityFactors.addChild(new ExpoPlanetNode("Magnetic field strength may vary"));
        root.addChild(habitabilityFactors);

        // 7. Detection Methods
        const detectionMethods = new ExpoPlanetNode("Detection Methods");
        detectionMethods.addChild(new ExpoPlanetNode("Transit method"));
        detectionMethods.addChild(new ExpoPlanetNode("Radial velocity method"));
        detectionMethods.addChild(new ExpoPlanetNode("Direct imaging (rare)"));
        root.addChild(detectionMethods);
        const saveNode = async (node: ExpoPlanetNode): Promise<ExpoPlanetNode> => {
            const savedNode = await this.expoRepo.save(node);
            if (node.children && node.children.length > 0) {
                savedNode.children = await Promise.all(node.children.map(child => saveNode(child)));
            }
            return savedNode;
        };

        // Save the entire tree structure
        const savedRoot = await saveNode(root);
        return savedRoot;
    }

    async buildNeptunian() {
        const root = new ExpoPlanetNode("Neptunian Exoplanets");

        // 1. Definition
        const definition = new ExpoPlanetNode("Definition");
        definition.addChild(new ExpoPlanetNode("Planets similar in size to Neptune"));
        definition.addChild(new ExpoPlanetNode("Mass range: typically 10-40 Earth masses"));
        definition.addChild(new ExpoPlanetNode("Radius range: about 2-6 Earth radii"));
        root.addChild(definition);

        // 2. Physical Characteristics
        const physicalCharacteristics = new ExpoPlanetNode("Physical Characteristics");
        physicalCharacteristics.addChild(new ExpoPlanetNode("Gaseous composition"));
        physicalCharacteristics.addChild(new ExpoPlanetNode("Lower density compared to terrestrial planets"));
        physicalCharacteristics.addChild(new ExpoPlanetNode("Likely no solid surface"));
        root.addChild(physicalCharacteristics);

        // 3. Composition
        const composition = new ExpoPlanetNode("Composition");
        composition.addChild(new ExpoPlanetNode("Hydrogen and helium-rich atmospheres"));
        composition.addChild(new ExpoPlanetNode("Possible rocky or icy core"));
        composition.addChild(new ExpoPlanetNode("Potential for water, ammonia, and methane layers"));
        root.addChild(composition);

        // 4. Atmospheric Properties
        const atmosphericProperties = new ExpoPlanetNode("Atmospheric Properties");
        atmosphericProperties.addChild(new ExpoPlanetNode("Thick, extended atmospheres"));
        atmosphericProperties.addChild(new ExpoPlanetNode("Complex weather patterns possible"));
        atmosphericProperties.addChild(new ExpoPlanetNode("Potential for strong winds and storms"));
        root.addChild(atmosphericProperties);

        // 5. Formation Theories
        const formationTheories = new ExpoPlanetNode("Formation Theories");
        formationTheories.addChild(new ExpoPlanetNode("Core accretion model"));
        formationTheories.addChild(new ExpoPlanetNode("Disk instability model"));
        formationTheories.addChild(new ExpoPlanetNode("Migration from outer to inner regions of solar systems"));
        root.addChild(formationTheories);

        // 6. Habitability Considerations
        const habitabilityConsiderations = new ExpoPlanetNode("Habitability Considerations");
        habitabilityConsiderations.addChild(new ExpoPlanetNode("Generally considered uninhabitable in Earth-like terms"));
        habitabilityConsiderations.addChild(new ExpoPlanetNode("Potential for habitable moons"));
        habitabilityConsiderations.addChild(new ExpoPlanetNode("Possible life in atmospheric layers (speculative)"));
        root.addChild(habitabilityConsiderations);

        // 7. Detection Methods
        const detectionMethods = new ExpoPlanetNode("Detection Methods");
        detectionMethods.addChild(new ExpoPlanetNode("Transit method"));
        detectionMethods.addChild(new ExpoPlanetNode("Radial velocity method"));
        detectionMethods.addChild(new ExpoPlanetNode("Direct imaging (rare)"));
        root.addChild(detectionMethods);
        const saveNode = async (node: ExpoPlanetNode): Promise<ExpoPlanetNode> => {
            const savedNode = await this.expoRepo.save(node);
            if (node.children && node.children.length > 0) {
                savedNode.children = await Promise.all(node.children.map(child => saveNode(child)));
            }
            return savedNode;
        };

        // Save the entire tree structure
        const savedRoot = await saveNode(root);
        return savedRoot;
    }

    async buildGasGiantTree() {
        const root = new ExpoPlanetNode("Gas Giant");

        // 1. Definition
        const definition = new ExpoPlanetNode("Definition");
        definition.addChild(new ExpoPlanetNode("Large planets"));
        definition.addChild(new ExpoPlanetNode("Mainly hydrogen and helium"));
        definition.addChild(new ExpoPlanetNode("Similar to Jupiter and Saturn"));
        root.addChild(definition);

        // 2. Types
        const types = new ExpoPlanetNode("Types");
        const hotJupiters = new ExpoPlanetNode("Hot Jupiters");
        hotJupiters.addChild(new ExpoPlanetNode("Close to star"));
        hotJupiters.addChild(new ExpoPlanetNode("Short orbital period"));
        hotJupiters.addChild(new ExpoPlanetNode("High surface temperature"));
        types.addChild(hotJupiters);

        const coldJupiters = new ExpoPlanetNode("Cold Jupiters");
        coldJupiters.addChild(new ExpoPlanetNode("Far from star"));
        coldJupiters.addChild(new ExpoPlanetNode("Longer orbital period"));
        coldJupiters.addChild(new ExpoPlanetNode("Lower surface temperature"));
        types.addChild(coldJupiters);

        const superJupiters = new ExpoPlanetNode("Super-Jupiters");
        superJupiters.addChild(new ExpoPlanetNode("More massive than Jupiter"));
        superJupiters.addChild(new ExpoPlanetNode("Can be several times Jupiter's size"));
        types.addChild(superJupiters);

        root.addChild(types);

        // 3. Formation and Migration
        const formationMigration = new ExpoPlanetNode("Formation and Migration");
        const formation = new ExpoPlanetNode("Formation");
        formation.addChild(new ExpoPlanetNode("In outer regions of planetary systems"));
        formation.addChild(new ExpoPlanetNode("Accumulation of gas around rocky/icy core"));
        formationMigration.addChild(formation);

        const migration = new ExpoPlanetNode("Migration");
        migration.addChild(new ExpoPlanetNode("Inward movement over time"));
        migration.addChild(new ExpoPlanetNode("Caused by interaction with protoplanetary disk"));
        formationMigration.addChild(migration);

        root.addChild(formationMigration);

        // 4. Atmosphere
        const atmosphere = new ExpoPlanetNode("Atmosphere");
        const composition = new ExpoPlanetNode("Composition");
        composition.addChild(new ExpoPlanetNode("Mostly hydrogen and helium"));
        composition.addChild(new ExpoPlanetNode("Can contain methane, ammonia, water vapor"));
        atmosphere.addChild(composition);

        const features = new ExpoPlanetNode("Features");
        features.addChild(new ExpoPlanetNode("Bands and zones"));
        features.addChild(new ExpoPlanetNode("Storm systems (like Jupiter's Great Red Spot)"));
        features.addChild(new ExpoPlanetNode("Extreme winds"));
        atmosphere.addChild(features);

        root.addChild(atmosphere);

        // 5. Detection Methods
        const detectionMethods = new ExpoPlanetNode("Detection Methods");
        const transitMethod = new ExpoPlanetNode("Transit Method");
        transitMethod.addChild(new ExpoPlanetNode("Planet passes in front of star"));
        transitMethod.addChild(new ExpoPlanetNode("Causes dip in star's brightness"));
        detectionMethods.addChild(transitMethod);

        const radialVelocityMethod = new ExpoPlanetNode("Radial Velocity Method");
        radialVelocityMethod.addChild(new ExpoPlanetNode("Star's \"wobble\" due to planet's gravity"));
        radialVelocityMethod.addChild(new ExpoPlanetNode("Measured through Doppler shift"));
        detectionMethods.addChild(radialVelocityMethod);

        root.addChild(detectionMethods);

        // 6. Notable Examples
        const notableExamples = new ExpoPlanetNode("Notable Examples");
        const pegasi51b = new ExpoPlanetNode("51 Pegasi b");
        pegasi51b.addChild(new ExpoPlanetNode("First exoplanet discovered (1995)"));
        pegasi51b.addChild(new ExpoPlanetNode("Hot Jupiter"));
        notableExamples.addChild(pegasi51b);

        const hd189733b = new ExpoPlanetNode("HD 189733 b");
        hd189733b.addChild(new ExpoPlanetNode("Known for deep blue color"));
        hd189733b.addChild(new ExpoPlanetNode("Well-studied atmosphere"));
        notableExamples.addChild(hd189733b);

        const wasp121b = new ExpoPlanetNode("WASP-121b");
        wasp121b.addChild(new ExpoPlanetNode("Ultra-hot Jupiter"));
        wasp121b.addChild(new ExpoPlanetNode("Atmosphere being stripped away"));
        notableExamples.addChild(wasp121b);

        root.addChild(notableExamples);

        const saveNode = async (node: ExpoPlanetNode): Promise<ExpoPlanetNode> => {
            const savedNode = await this.expoRepo.save(node);
            if (node.children && node.children.length > 0) {
                savedNode.children = await Promise.all(node.children.map(child => saveNode(child)));
            }
            return savedNode;
        };

        // Save the entire tree structure
        const savedRoot = await saveNode(root);
        return savedRoot;
    }

    async getParent() {
        try {
            const rootNodes = await this.expoRepo
                .createQueryBuilder('node')
                .leftJoinAndSelect('node.parent', 'parent')
                .where('node.parent IS NULL')
                .getMany();
            return rootNodes;
        } catch (error) {
            console.error(error);
        }
    }

    async getAllChild(id: string) {
        try {
            const root = await this.expoRepo.findOneOrFail({
                where: { id },
                relations: ['children'],
            });
            console.log(root);
            const node = {
                id: id,
                name: root.name,
                children: []
            };


            if (root.children && root.children.length > 0) {
                node.children = await Promise.all(
                    root.children.map(async (child) => {
                        return this.getAllChild(child.id);
                    })
                );
            }
            return node;
        } catch (error) {
            console.error("error log", error);
        }

    }

    async getTree() {
        return await this.expoRepo.findOne({ where: { name: "Gas Giant Exoplanets" } });
    }

    async display() {
        const root = await this.getTree();
        if (root) {
            this.printNode(root);
        } else {
            console.log("Tree not found");
        }
    }

    private printNode(node: ExpoPlanetNode, depth: number = 0) {
        console.log("  ".repeat(depth) + "- " + node.name);
        if (node.children) {
            for (const child of node.children) {
                this.printNode(child, depth + 1);
            }
        }
    }
}
