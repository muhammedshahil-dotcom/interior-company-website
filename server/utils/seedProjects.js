import Project from "../models/Project.js";

const defaultProjects = [
  // Bedroom (4)
  {
    title: "Serene Master Bedroom",
    image: "/assets/projects/bedroom3.jpeg",
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
    title: "Muted Loft Bedroom",
    image: "/assets/projects/bedroom7.jpeg",
    category: "Bedroom",
    description: "A pared-back loft bedroom with soft ambient lighting and tailored bedding.",
  },
  {
    title: "Structured Retreat Bedroom",
    image: "/assets/projects/bedroom6.jpeg",
    category: "Bedroom",
    description: "Crisp lines with warm wood accents and balanced bedside lighting.",
  },

  // Bridal Room (4)
  {
    title: "Bridal Elegance",
    image: "/assets/projects/bridal.jpeg",
    category: "Bridal Room",
    description: "Romantic palette with soft upholstery and graceful drapery details.",
  },
  {
    title: "Heritage Bridal Lounge",
    image: "/assets/projects/bridal5.jpeg",
    category: "Bridal Room",
    description: "Statement seating and layered textiles for a celebratory bridal suite.",
  },
  {
    title: "Rose Gold Bridal Suite",
    image: "/assets/projects/bridal3.jpeg",
    category: "Bridal Room",
    description: "Warm metallic accents with blush textiles for an intimate bridal setting.",
  },
  {
    title: "Garden Bridal Retreat",
    image: "/assets/projects/bridal4.jpeg",
    category: "Bridal Room",
    description: "Light-filled bridal room with layered sheers and botanical tones.",
  },

  // Kitchen (4)
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
    title: "Walnut Chef Kitchen",
    image: "/assets/projects/kitchen6.jpeg",
    category: "Kitchen",
    description: "Rich walnut cabinetry, stone surfaces, and task lighting for heavy use.",
  },
  {
    title: "Social Dining Kitchen",
    image: "/assets/projects/kitchen5.jpeg",
    category: "Kitchen",
    description: "Dining-forward kitchen layout with relaxed seating and ambient lighting.",
  },

  // Living Room (4)
  {
    title: "Modern Living Room",
    image: "/assets/projects/living room.jpeg",
    category: "Living Room",
    description: "Tailored seating, curated art, and balanced natural light.",
  },
  {
    title: "Garden View Lounge",
    image: "/assets/projects/dining.jpeg",
    category: "Living Room",
    description: "Indoor-outdoor living with greenery, neutral upholstery, and sculptural decor.",
  },
  {
    title: "Warm Gathering Living Room",
    image: "/assets/projects/livingroom4.jpg",
    category: "Living Room",
    description: "Plush seating and warm tones designed for conversation and connection.",
  },
  {
    title: "Sunlit Studio Lounge",
    image: "/assets/projects/livingroom3.jpg",
    category: "Living Room",
    description: "Open-plan lounge anchored by clean lines and natural textures.",
  },
];

export async function seedProjects() {
  let inserted = 0;
  let updated = 0;
  // Keep the collection constrained to these seed titles to avoid stale duplicates
  const allowedTitles = defaultProjects.map((p) => p.title);
  await Project.deleteMany({ title: { $nin: allowedTitles } });

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
