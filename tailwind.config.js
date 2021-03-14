const colors = require("tailwindcss/colors");

const JUDGE_COLORS = [
  "pink",
  "purple",
  "indigo",
  "blue",
  "green",
  "yellow",
  "red",
];

module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: colors.coolGray,
        blue: colors.lightBlue,
        red: colors.rose,
        pink: colors.fuchsia,
        actionColor: colors.indigo,
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-out ",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: " translateY(100px)" },
          "100%": { opacity: 1, transform: " translateY(0)" },
        },
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/forms")],
  purge: {
    // Filenames to scan for classes
    content: [
      "./src/**/*.html",
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./public/index.html",
    ],
    // Options passed to PurgeCSS
    options: {
      // Whitelist specific selectors by name
      safelist: [
        ...JUDGE_COLORS.reduce(
          (acc, color) => [
            ...acc,
            `bg-${color}-200`,
            `bg-${color}-400`,
            `bg-${color}-600`,
            `bg-${color}-900`,
          ],
          []
        ),
      ],
    },
  },
};
