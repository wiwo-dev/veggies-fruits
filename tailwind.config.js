const primary = {
  1: "#fbfefb",
  2: "#f3fcf3",
  3: "#ebf9eb",
  4: "#dff3df",
  5: "#ceebcf",
  6: "#b7dfba",
  7: "#97cf9c",
  8: "#65ba75",
  9: "#46a758",
  10: "#3d9a50",
  11: "#297c3b",
  12: "#1b311e",
};

const primaryDark = {
  1: "#0d1912",
  2: "#0f1e13",
  3: "#132819",
  4: "#16301d",
  5: "#193921",
  6: "#1d4427",
  7: "#245530",
  8: "#2f6e3b",
  9: "#46a758",
  10: "#55b467",
  11: "#63c174",
  12: "#e5fbeb",
};

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary,
        primaryDark,
        sage: "#77817B",
      },
      fontFamily: {
        "abhaya-libre": ['"Abhaya+Libre"'],
      },
    },
  },
  plugins: [],
};
