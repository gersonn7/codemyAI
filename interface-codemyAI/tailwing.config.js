module.exports = {
  content: ['./src/**/*.{js,jsx}'], // ajuste se necessário
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'), // ⬅️ Adicione isso aqui
  ],
};
