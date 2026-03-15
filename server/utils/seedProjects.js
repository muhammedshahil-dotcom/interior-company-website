import Project from "../models/Project.js";

const defaultProjects = [
  {
    title: "Serene Master Bedroom",
    image: "/assets/projects/bedroom1.jpeg",
    category: "Bedroom",
    description: "Layered linens, warm woods, and soft lighting for a calm retreat.",
  },
  {
    title: "Coastal Suite",
    image: "/assets/projects/bedroom2.jpeg",
    category: "Bedroom",
    description: "Light, airy bedroom with coastal textures and sculptural lighting.",
  },
  {
    title: "Bridal Elegance",
    image: "/assets/projects/bridal.jpeg",
    category: "Bridal Room",
    description: "Romantic palette with soft upholstery and graceful drapery details.",
  },
  {
    title: "Heritage Bridal Lounge",
    image: "/assets/projects/bridal1.jpeg",
    category: "Bridal Room",
    description: "Statement seating and layered textiles for a celebratory bridal suite.",
  },
  {
    title: "Minimal Chef's Kitchen",
    image: "/assets/projects/kitchen1.jpeg",
    category: "Kitchen",
    description: "Streamlined cabinetry with stone counters and integrated lighting.",
  },
  {
    title: "Warm Entertainer's Kitchen",
    image: "/assets/projects/kitchen2.jpeg",
    category: "Kitchen",
    description: "Open-plan kitchen with wood tones, metal accents, and ample storage.",
  },
  {
    title: "Modern Living Room",
    image: "/assets/projects/living room.jpeg",
    category: "Living Room",
    description: "Tailored seating, curated art, and balanced natural light.",
  },
  {
    title: "Garden View Lounge",
    image: "/assets/projects/project4.jpeg",
    category: "Living Room",
    description: "Indoor-outdoor living with greenery, neutral upholstery, and sculptural decor.",
  },
];

export async function seedProjects() {
  let inserted = 0;
  let updated = 0;
  for (const project of defaultProjects) {
    const res = await Project.updateOne(
      { title: project.title },
      { $set: project },
      { upsert: true }
    );
    if (res.upsertedCount) {
      inserted += 1;
    } else if (res.modifiedCount) {
      updated += 1;
    }
  }
  if (inserted > 0 || updated > 0) {
    console.log(`Seeded ${inserted} and refreshed ${updated} default projects`);
  }
}
