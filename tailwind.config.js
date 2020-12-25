module.exports = (isProd) => ({
  prefix: "",
  purge: {
    enabled: isProd,
    content: ["**/*.html", "**/*.ts"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      outline: {
        blue: "2px solid #6495ed",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
});
