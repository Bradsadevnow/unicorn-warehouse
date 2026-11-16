export const schoolName = "Cloverfield School";
export const schoolCareersPath = "/careers/school";

export const gradeBands = [
  { id: "elementary", grades: "K–5", name: "Elementary", line: "A love of learning takes root.", description: "Phonics, number games, messy art, and plenty of time outdoors. Teachers help children build confidence through small groups and hands-on projects.", visit: "Meet a classroom teacher, visit the playground, and stop by the reading nook." },
  { id: "middle", grades: "6–8", name: "Middle school", line: "Try something you’ve never tried.", description: "Students build things in the maker room, put on plays, and learn to work through disagreements with a trusted adviser nearby.", visit: "Meet a student guide, tour the maker room, and see a sample advisory schedule." },
  { id: "high", grades: "9–12", name: "High school", line: "Make something that matters to you.", description: "Choose electives, spend time on a long-term project, and get one-on-one help planning for college, trades, or whatever comes next.", visit: "Tour the studios, see a student capstone, and meet a graduation adviser." },
] as const;

export const schoolRoles = [
  { title: "Elementary Classroom Teacher", team: "Teaching & Learning", detail: "Lead a welcoming elementary classroom and work with a reading specialist to give each child time and support." },
  { title: "School Librarian", team: "Library & Creative Arts", detail: "Help students find books they’ll love, host reading groups, and keep the library open as a quiet place to land." },
  { title: "School Counselor", team: "Student & Family Support", detail: "Support students in one-on-one meetings and small groups, and help families connect with the school team." },
  { title: "Garden & Outdoor Learning Educator", team: "Outdoor Learning", detail: "Help students plant, tend, and harvest the school garden, with activities for all ages and ways to join in from the accessible paths and raised beds." },
] as const;
