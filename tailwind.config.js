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
        'white-overlay': 'var(--color-bg-white-overlay)',
        'std-primary': 'var(--color-text-primary-std)',
        'std-secondary': 'var(--color-text-secondary-std)',
        error: 'var(--errorcolorbackground)',
        'error-border': 'var(--errorcolor)',
        success: 'var(--successcolorbackground)',
        'success-border': 'var(--successcolor)',
      },
      textColor: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        'std-primary': 'var(--color-text-primary-std)',
        'std-secondary': 'var(--color-text-secondary-std)',
        dategray: 'var(--color-dategrey)',
      },
      backgroundColor: {
        'primary-lighter': 'var(--color-bg-primary-lighter)',
        'primary-light': 'var(--color-bg-primary-light)',
        'primary-dark': 'var(--color-bg-primary-dark)',
        'secondary-light': 'var(--color-bg-secondary-light)',
        'secondary-dark': 'var(--color-bg-secondary-dark)',
        white: 'var(--color-bg-white)',
      },
      fontFamily: {
        serif: ['source-serif-pro', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s both ease-in',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }
    },
  },
  plugins: [],
};
