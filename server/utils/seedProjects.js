import Project from "../models/Project.js";

const defaultProjects = [
  {
    title: "Serene Master Bedroom",
    image: "/assets/projects/bedroom1.jpg",
    category: "Bedroom",
    description: "Layered linens, warm woods, and soft lighting for a calm retreat.",
  },
  {
    title: "Coastal Suite",
    image: "/assets/projects/bedroom2.jpg",
    category: "Bedroom",
    description: "Light, airy bedroom with coastal textures and sculptural lighting.",
  },
  {
    title: "Bridal Elegance",
    image: "/assets/projects/bridal.jpg",
    category: "Bridal Room",
    description: "Romantic palette with soft upholstery and graceful drapery details.",
  },
  {
    title: "Heritage Bridal Lounge",
    image: "/assets/projects/bridal1.jpg",
    category: "Bridal Room",
    description: "Statement seating and layered textiles for a celebratory bridal suite.",
  },
  {
    title: "Minimal Chef's Kitchen",
    image: "/assets/projects/kitchen1.jpg",
    category: "Kitchen",
    description: "Streamlined cabinetry with stone counters and integrated lighting.",
  },
  {
    title: "Warm Entertainer's Kitchen",
    image: "/assets/projects/kitchen2.jpg",
    category: "Kitchen",
    description: "Open-plan kitchen with wood tones, metal accents, and ample storage.",
  },
  {
    title: "Modern Living Room",
    image: "/assets/projects/livingroom.jpg",
    category: "Living Room",
    description: "Tailored seating, curated art, and balanced natural light.",
  },
  {
    title: "Garden View Lounge",
    image: "/assets/projects/project4.jpg",
    category: "Living Room",
    description: "Indoor-outdoor living with greenery, neutral upholstery, and sculptural decor.",
  },
];

export async function seedProjects() {
  let inserted = 0;
  for (const project of defaultProjects) {
    const exists = await Project.findOne({ title: project.title });
    if (!exists) {
      await Project.create(project);
      inserted += 1;
    }
  }
  if (inserted > 0) {
    console.log(`Seeded ${inserted} default projects`);
  }
}
