export type Specialist = {
  name: string;
  role: string;
  phone: string;
  tel: string;
};

export type Service = {
  id: "exterior" | "interior" | "correction" | "ceramic";
  name: string;
  price: string;
  description: string;
  details: string[];
  priceNotes?: string[];
};

export const businessProfile = {
  name: "C&C Detailing",
  legalName: "Collins Custom Detailing LLC",
  location: "Channahon, Illinois",
  email: "candcdetailing25@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61574139886965",
  collin: {
    name: "Collin",
    role: "Exterior specialist",
    phone: "815-922-1593",
    tel: "8159221593"
  } satisfies Specialist,
  caleb: {
    name: "Caleb",
    role: "Interior specialist",
    phone: "815-409-5501",
    tel: "8154095501"
  } satisfies Specialist
};

export const services: Service[] = [
  {
    id: "exterior",
    name: "Exterior Detail",
    price: "From $150",
    description: "A thorough hand wash and refresh with short-term paint protection.",
    details: ["Hand wash and spray wax", "Wheels and wheel wells", "Windows and trim", "Door jambs"],
    priceNotes: ["Hand wax +$50", "Engine bay +$60", "Headlight restoration +$30 each"]
  },
  {
    id: "interior",
    name: "Interior Restoration",
    price: "From $180",
    description: "Maintenance cleaning or a deeper restoration based on vehicle condition.",
    details: ["Comprehensive vacuum", "Floor mat cleaning", "Surface cleaning", "Spot stain removal"],
    priceNotes: ["Basic interior cleaning $180", "Full interior restoration $225+ based on condition"]
  },
  {
    id: "correction",
    name: "Paint Correction",
    price: "From $600",
    description: "Two-step correction for swirl marks, light scratches, dullness, and lost gloss.",
    details: ["Paint decontamination", "Two-step paint correction", "Wax sealant", "Wheels, trim, and glass"],
    priceNotes: ["Sedan or small SUV $600", "Large SUV, van, or truck $800", "Wet sanding is an additional charge"]
  },
  {
    id: "ceramic",
    name: "Ceramic Coating",
    price: "From $900",
    description: "Long-term protection for easier maintenance and a deeper finish.",
    details: ["Full exterior detail", "Paint decontamination", "Two-step paint correction", "Paint and rim coating"],
    priceNotes: ["Sedan or small SUV $900", "Large SUV, van, or truck $1,100", "Window coating +$100", "Trim coating +$100"]
  }
];

export const serviceNotes = [
  "Almost every service can be performed separately.",
  "Full headliners and truck beds are not included unless specified.",
  "Interior photos are especially helpful when scheduling.",
  "Mileage fees may apply for mobile service.",
  "Services are available by appointment only."
];

export const workIncludes = {
  exterior: ["Hand wash", "Wheels and wheel wells", "Paint decontamination", "Machine polish"],
  interior: ["Steam cleaning", "Carpet and seat shampooing", "Surface cleaning", "Odor neutralization"],
  protection: ["Spray wax", "Wax sealant", "Ceramic coating", "Rim coating"]
};

export const testimonial =
  "I would highly recommend Collin for the great job he did detailing my car. I have a 2022 Tucson & I felt like I drove away in a brand-new car. His work is meticulous; every crevice of car cleaned to perfection!";
