"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bioGenerator = void 0;
const bios = [
    "¯\\_(ツ)_/¯",
    "Learning Python 🐍",
    "Working on a unicorn startup 🚀",
    "Learning TypeScript 🔵",
    "Hello World!",
    "Working at FAANG",
    "Freelancing",
    "DSA for life! 😁",
];
const bioGenerator = () => {
    return bios[Math.floor(Math.random() * bios.length)];
};
exports.bioGenerator = bioGenerator;
//# sourceMappingURL=bio.js.map