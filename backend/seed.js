const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Scholarship = require("./models/Scholarship");
const Mentor = require("./models/Mentor");
const CommunityPost = require("./models/CommunityPost");
dotenv.config();

const scholarships = [
  // GOVERNMENT - ALL INDIA
  {
    title: "PM Yasasvi Entrance Test (MSJ&E)",
    provider: "Ministry of Social Justice & Empowerment",
    amount: "₹75,000 - ₹1,25,000/year",
    category: "OBC",
    maxIncome: 250000,
    state: "All India",
    field: "Class 9-12",
    link: "https://yet.nta.ac.in/",
    deadline: new Date("2026-08-31"),
  },
  {
    title: "AICTE Pragati Scholarship for Girls",
    provider: "AICTE",
    amount: "₹50,000/year",
    category: "All",
    maxIncome: 800000,
    state: "All India",
    field: "Engineering/Diploma",
    link: "https://www.aicte-india.org/schemes/students-development-schemes",
    deadline: new Date("2026-10-31"),
  },
  {
    title: "National Means Cum Merit Scholarship (NMMS)",
    provider: "Department of School Education",
    amount: "₹12,000/year",
    category: "All",
    maxIncome: 350000,
    state: "All India",
    field: "School (Class 9-12)",
    link: "https://scholarships.gov.in/",
    deadline: new Date("2026-11-30"),
  },
  {
    title: "Post-Matric Scholarship for SC Students",
    provider: "Ministry of Social Justice",
    amount: "Full Tuition Fee + Maintenance",
    category: "SC",
    maxIncome: 250000,
    state: "All India",
    field: "Higher Education",
    link: "https://scholarships.gov.in/",
    deadline: new Date("2026-12-31"),
  },

  // PRIVATE / CORPORATE
  {
    title: "Reliance Foundation Undergraduate Scholarship",
    provider: "Reliance Foundation",
    amount: "Up to ₹2,00,000",
    category: "All",
    maxIncome: 1500000,
    state: "All India",
    field: "All Degree Courses",
    link: "https://www.reliancefoundation.org/",
    deadline: new Date("2026-10-07"),
  },
  {
    title: "HDFC Bank Parivartan ECSS Programme",
    provider: "HDFC Bank",
    amount: "Up to ₹75,000",
    category: "All",
    maxIncome: 250000,
    state: "All India",
    field: "School/UG/PG",
    link: "https://www.hdfcbank.com/personal/about-us/corporate-social-responsibility",
    deadline: new Date("2026-09-30"),
  },
  {
    title: "Tata Capital Pankh Scholarship",
    provider: "Tata Capital",
    amount: "Up to ₹50,000",
    category: "All",
    maxIncome: 250000,
    state: "All India",
    field: "Class 11-Graduation",
    link: "https://www.tatacapital.com/corporate-social-responsibility.html",
    deadline: new Date("2026-09-15"),
  },
  {
    title: "Infosys Foundation STEM Stars Scholarship",
    provider: "Infosys Foundation",
    amount: "₹1,00,000/year",
    category: "All",
    maxIncome: 800000,
    state: "All India",
    field: "STEM (Female Students)",
    link: "https://www.infosys.com/infosys-foundation/beyond-business/education/stem-stars.html",
    deadline: new Date("2026-09-30"),
  },

  // STATE SPECIFIC
  {
    title: "Rajarshi Chhatrapati Shahu Maharaj Fee Reimbursement",
    provider: "DTE Maharashtra",
    amount: "50% - 100% Tuition Fee",
    category: "Open/EBC/OBC",
    maxIncome: 800000,
    state: "Maharashtra",
    field: "Higher Education",
    link: "https://mahadbt.maharashtra.gov.in/",
    deadline: new Date("2026-03-31"),
  },
  {
    title: "Swami Vivekananda Merit-cum-Means (SVMCM)",
    provider: "West Bengal Government",
    amount: "₹12,000 - ₹60,000/year",
    category: "All",
    maxIncome: 250000,
    state: "West Bengal",
    field: "Class 11 to PG",
    link: "https://svmcm.wbhed.gov.in/",
    deadline: new Date("2026-11-30"),
  },
  {
    title: "Mukhyamantri Yuva Swavalamban Yojana (MYSY)",
    provider: "Gujarat Government",
    amount: "Up to ₹2,00,000",
    category: "All",
    maxIncome: 600000,
    state: "Gujarat",
    field: "Degree/Diploma",
    link: "https://mysy.guj.nic.in/",
    deadline: new Date("2026-01-31"),
  },
  {
    title: "Karnataka Vidyasiri (Food & Accommodation)",
    provider: "Backward Classes Welfare Dept, Karnataka",
    amount: "₹15,000/year",
    category: "OBC/SC/ST",
    maxIncome: 200000,
    state: "Karnataka",
    field: "Graduation",
    link: "https://ssp.postmatric.karnataka.gov.in/",
    deadline: new Date("2026-10-15"),
  },
  {
    title: "Tamil Nadu Post-Matric SC/ST Scholarship",
    provider: "Adi Dravidar Welfare Dept",
    amount: "Compulsory Fees + Maintenance",
    category: "SC/ST",
    maxIncome: 250000,
    state: "Tamil Nadu",
    field: "Higher Education",
    link: "https://www.tn.gov.in/scheme/data_view/44052",
    deadline: new Date("2026-03-31"),
  },
  {
    title: "Dr. Ambedkar Medhavi Chattervriti Yojana",
    provider: "Haryana Government",
    amount: "₹8,000 - ₹12,000",
    category: "SC/BC",
    maxIncome: 400000,
    state: "Haryana",
    field: "Class 10/12/UG",
    link: "https://haryanascbc.gov.in/",
    deadline: new Date("2026-01-15"),
  },

  // SPECIAL INTEREST / FOUNDATIONS
  {
    title: "Sitaram Jindal Foundation Scholarship",
    provider: "Sitaram Jindal Foundation",
    amount: "₹6,000 - ₹30,000/year",
    category: "All",
    maxIncome: 400000,
    state: "All India",
    field: "Class 11 to PG",
    link: "https://www.sitaramjindalfoundation.org/scholarships-for-ug-pg-courses.php",
    deadline: new Date("2026-12-31"),
  },
  {
    title: "LIC Golden Jubilee Scholarship",
    provider: "Life Insurance Corporation of India",
    amount: "₹20,000/year",
    category: "All",
    maxIncome: 250000,
    state: "All India",
    field: "UG/Diploma",
    link: "https://licindia.in/web/guest/golden-jubilee-foundation",
    deadline: new Date("2026-09-30"),
  },
  {
    title: "FAEA Scholarship (Foundation for Academic Excellence)",
    provider: "BHEL/TATA Policy Research",
    amount: "Full Tuition + Hostel",
    category: "SC/ST/BPL",
    maxIncome: 200000,
    state: "All India",
    field: "Undergraduate",
    link: "http://www.faeaindia.org/",
    deadline: new Date("2026-06-30"),
  },
  {
    title: "GyanDhan Scholarship",
    provider: "GyanDhan",
    amount: "₹1,00,000 (One time)",
    category: "All",
    maxIncome: 1000000,
    state: "All India",
    field: "Postgraduate (India/Abroad)",
    link: "https://www.gyandhan.com/scholarships/gd-scholarship",
    deadline: new Date("2026-08-31"),
  },
  {
    title: "Kotak Kanya Scholarship",
    provider: "Kotak Mahindra Group",
    amount: "₹1,50,000/year",
    category: "All",
    maxIncome: 600000,
    state: "All India",
    field: "Professional UG (Girls)",
    link: "https://www.kotak.com/en/about-us/csr.html",
    deadline: new Date("2026-09-30"),
  },
  {
    title: "ONGC Scholarship for SC/ST Students",
    provider: "ONGC Foundation",
    amount: "₹48,000/year",
    category: "SC/ST",
    maxIncome: 450000,
    state: "All India",
    field: "Engg/MBBS/MBA",
    link: "https://www.ongcscholar.org/",
    deadline: new Date("2026-10-31"),
  }
];

const mentors = [
  { 
    name: 'Dr. Arvinder Singh', 
    role: 'STEM & Research Expert', 
    bio: 'Former Fulbright Scholar, specialized in PhD applications.', 
    sessions: 45, 
    rating: 4.9, 
    avatar: 'Arvinder',
    availability: ['Sat 10:00 AM', 'Sat 2:00 PM', 'Sun 11:00 AM'],
    meetingLink: 'https://meet.google.com/abc-defg-hij'
    
  },
  { 
    name: 'Priya Sharma', 
    role: 'Study Abroad Specialist', 
    bio: 'Helped 50+ students secure Erasmus Mundus scholarships.', 
    sessions: 112, 
    rating: 4.8, 
    avatar: 'Priya',
    availability: ['Mon 6:00 PM', 'Wed 6:00 PM', 'Fri 6:00 PM'],
    meetingLink: 'https://meet.google.com/pqr-stuv-wxy'
  },
  { 
    name: 'Rahul Varma', 
    role: 'MahaDBT Expert', 
    bio: 'Expert in state-level portal navigation and documentation.', 
    sessions: 89, 
    rating: 4.7, 
    avatar: 'Rahul',
    availability: ['Sat 11:00 AM', 'Sun 10:00 AM'],
    meetingLink: 'https://meet.google.com/mno-pjkl-qrs'
  },
  { 
    name: 'Ananya Iyer', 
    role: 'Arts & Design Mentor', 
    bio: 'Secured scholarships for Design globally.', 
    sessions: 34, 
    rating: 4.9, 
    avatar: 'Ananya',
    availability: ['Tue 5:00 PM', 'Thu 5:00 PM'],
    meetingLink: 'https://meet.google.com/des-ign-art'
  },
  { 
    name: 'Siddharth Mehra', 
    role: 'Corporate Scholarship Mentor', 
    bio: 'Previous winner of Reliance and HDFC scholarships.', 
    sessions: 67, 
    rating: 4.6, 
    avatar: 'Siddharth',
    availability: ['Sat 4:00 PM', 'Sun 4:00 PM'],
    meetingLink: 'https://meet.google.com/corp-fund-win'
  },
  { 
    name: 'Fatima Sheikh', 
    role: 'Women in Tech Lead', 
    bio: 'Mentor for Adobe and Google WTM scholarships.', 
    sessions: 156, 
    rating: 5.0, 
    avatar: 'Fatima',
    availability: ['Wed 7:00 PM', 'Sat 10:00 AM', 'Sun 12:00 PM'],
    meetingLink: 'https://meet.google.com/wit-tech-edu'
  },
  { 
    name: 'Karthik Raja', 
    role: 'Sports Excellence Coach', 
    bio: 'Consultant for sports-quota based educational grants.', 
    sessions: 22, 
    rating: 4.5, 
    avatar: 'Karthik',
    availability: ['Mon 7:00 AM', 'Fri 7:00 AM'],
    meetingLink: 'https://meet.google.com/spr-ts-grnt'
  },
  { 
    name: 'Meera Deshmukh', 
    role: 'Medical Grant Specialist', 
    bio: 'Specialist in TATA Trusts medical grants.', 
    sessions: 91, 
    rating: 4.8, 
    avatar: 'Meera',
    availability: ['Sat 9:00 AM', 'Sun 9:00 AM'],
    meetingLink: 'https://meet.google.com/med-tata-aid'
  },
  { 
    name: 'Amitabh Das', 
    role: 'EWS/NGO Consultant', 
    bio: 'Works with NGOs to secure basic education funding.', 
    sessions: 210, 
    rating: 4.9, 
    avatar: 'Amitabh',
    availability: ['Mon-Fri 8:00 PM'],
    meetingLink: 'https://meet.google.com/ews-ngo-help'
  },
  { 
    name: 'Sneha Kapoor', 
    role: 'MBA Strategy Expert', 
    bio: 'GMAT/CAT scholarship strategy expert.', 
    sessions: 120, 
    rating: 4.7, 
    avatar: 'Sneha',
    availability: ['Sat 3:00 PM', 'Sun 5:00 PM'],
    meetingLink: 'https://meet.google.com/mba-strat-aid'
  }
];
 

const posts = [
  {
    author: 'Neha Gupta',
    role: 'Student',
    title: 'Got the HDFC Badhte Kadam Scholarship! Here is the process.',
    content: 'The interview was mostly about my future goals and family background. Make sure your income certificate is the latest one (FY 2025-26).',
    type: 'success',
    likes: 245,
    comments: 45
  },
  {
    author: 'Arjun Das',
    role: 'Applicant',
    title: 'Problem with MahaDBT Aadhaar Seeding',
    content: 'My bank status is showing "Not Seeded" on the portal even though it is active. Has anyone solved this without visiting the bank?',
    type: 'question',
    likes: 34,
    comments: 12
  },
  {
    author: 'Siddharth M.',
    role: 'Mentor',
    title: 'Reminder: NSP OTR Registration is now mandatory!',
    content: 'Don\'t wait for the last date. The One-Time Registration (OTR) on the National Scholarship Portal takes time for Aadhaar verification.',
    type: 'news',
    likes: 567,
    comments: 89
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding...");

    await Scholarship.deleteMany({});
    await Mentor.deleteMany({});
    await CommunityPost.deleteMany({});
    console.log("Database cleared.");

    await Scholarship.insertMany(scholarships);
    await Mentor.insertMany(mentors);
    await CommunityPost.insertMany(posts);
    
    console.log(`Successfully Seeded:`);
    console.log(`- ${scholarships.length} Real Scholarships`);
    console.log(`- ${mentors.length} Verified Mentors`);
    console.log(`- ${posts.length} Community Posts`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

seedDB();