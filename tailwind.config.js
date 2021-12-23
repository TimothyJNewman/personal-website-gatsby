module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'primary-lighter': 'var(--color-bg-primary-lighter)',
        'primary-light': 'var(--color-bg-primary-light)',
        'primary-dark': 'var(--color-bg-primary-dark)',
        'secondary-light': 'var(--color-bg-secondary-light)',
        'secondary-dark': 'var(--color-bg-secondary-dark)',
        white: 'var(--color-bg-white)',
        'std-primary': 'var(--color-text-primary-std)',
        'std-secondary': 'var(--color-text-secondary-std)',
        dategray: 'var(--color-dategrey)',
      },
      textColor: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        blue: 'var(--color-text-blue)',
        'std-primary': 'var(--color-text-primary-std)',
        'std-secondary': 'var(--color-text-secondary-std)',
      },
      backgroundColor: {
        'primary-lighter': 'var(--color-bg-primary-lighter)',
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
