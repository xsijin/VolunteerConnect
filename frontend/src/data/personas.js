import chanImage from "@/assets/chan.png";
import nurulImage from "@/assets/nurul.png";
import arjunImage from "@/assets/arjun.png";
import liImage from "@/assets/li.png";
import ahmedImage from "@/assets/ahmed.png";

export const personaData = [
  {
    id: 1,
    name: "Mr. Chan Wei",
    gender: "Male",
    age: 76,
    background: "Retired school teacher, widowed two years ago.",
    personality: "Intellectual, reserved, values independence.",
    issues:
      "Struggling with the loneliness after his wife's death, finds solace in reading and gardening.",
    trainingFocus:
      "Empathy, conversation about loss, engaging in intellectually stimulating discussions.",
    image: chanImage,
    language: ["English", "Mandarin"],
  },
  {
    id: 2,
    name: "Ms. Nurul Binti Jamal",
    gender: "Female",
    age: 82,
    background:
      "Retired librarian, never married, active in community charities.",
    personality: "Independent, sharp-witted, enjoys debates and discussions.",
    issues: "Struggling with early-stage dementia, becoming forgetful.",
    trainingFocus:
      "Patience, clarity in communication, reassurance, and gentle reminders.",
    image: nurulImage,
    language: ["English", "Malay"],
  },
  {
    id: 3,
    name: "Mr. Arjun Pillai",
    gender: "Male",
    age: 79,
    background:
      "Retired factory worker, passionate about Indian history and culture.",
    personality:
      "Proud, somewhat stern, but appreciates respectful engagement.",
    issues:
      "Frustrated with his increasing physical limitations and dependency.",
    trainingFocus:
      "Maintaining dignity, adapting communication to respect pride, facilitating independence.",
    image: arjunImage,
    language: ["English", "Tamil"],
  },
  {
    id: 4,
    gender: "Female",
    name: "Mrs. Li Xin Ling",
    age: 85,
    background: "Former nurse, emigrated from China, lives with her daughter.",
    personality: "Warm, sociable, loves cooking and sharing stories.",
    issues:
      "Experiences bouts of depression and misses her cultural community.",
    trainingFocus:
      "Cultural sensitivity, active listening, offering emotional support.",
    image: liImage,
    language: ["Hokkien", "Mandarin", "Teochew", "Cantonese"],
  },
  {
    id: 5,
    name: "Mr. Ahmed bin Abdullah",
    gender: "Male",
    age: 70,
    background: "Retired engineer, recently diagnosed with diabetes.",
    personality: "Practical, detail-oriented, struggles with accepting help.",
    issues: "Navigating new dietary restrictions and health regime.",
    trainingFocus:
      "Providing informational support, encouraging self-care, empathy in health discussions.",
    image: ahmedImage,
    language: ["English", "Malay", "Singlish"],
  },
];
