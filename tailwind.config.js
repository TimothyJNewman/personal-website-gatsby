module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      textColor: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        blue: 'var(--color-text-blue)',
      },
      backgroundColor: {
        'primary-light': 'var(--color-bg-primary-light)',
        'primary-dark': 'var(--color-bg-primary-dark)',
        'secondary-light': 'var(--color-bg-secondary-light)',
        'secondary-dark': 'var(--color-bg-secondary-dark)',
        white: 'var(--color-bg-white)',
      },
    },
  },
  plugins: [],
};
