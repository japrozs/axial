const bios: string[] = [
    "¯\\_(ツ)_/¯",
    "Learning Python 🐍",
    "Working on a unicorn startup 🚀",
    "Learning TypeScript 🔵",
    "Hello World!",
    "Working at FAANG",
    "Freelancing",
    "DSA for life! 😁",
];

export const bioGenerator = () => {
    return bios[Math.floor(Math.random() * bios.length)];
};
