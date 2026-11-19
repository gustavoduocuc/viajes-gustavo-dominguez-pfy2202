/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-accent)',
        'accent-strong': 'var(--color-accent-strong)',
        'accent-soft': 'var(--color-accent-soft)',
        danger: 'var(--color-danger)',
        'danger-soft': 'var(--color-danger-soft)',
        line: 'var(--color-line)',
        field: 'var(--color-field)',
        highlight: 'var(--color-highlight)',
      },
      backgroundImage: {
        'region-sudamerica': 'var(--gradient-region-sudamerica)',
        'region-caribe': 'var(--gradient-region-caribe)',
        'region-europa': 'var(--gradient-region-europa)',
        'region-asia': 'var(--gradient-region-asia)',
        'region-africa': 'var(--gradient-region-africa)',
        'region-neutral': 'var(--gradient-region-neutral)',
      },
      borderColor: {
        DEFAULT: 'var(--color-line)',
      },
      borderRadius: {
        card: 'var(--radius-card)',
        control: 'var(--radius-control)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        header: 'var(--shadow-header)',
        menu: 'var(--shadow-menu)',
        sticky: 'var(--shadow-sticky)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)',
      },
      maxWidth: {
        page: 'var(--size-page)',
        form: 'var(--size-form)',
        reading: 'var(--size-reading)',
      },
      spacing: {
        gutter: 'var(--space-gutter)',
        'gutter-wide': 'var(--space-gutter-wide)',
        section: 'var(--space-section)',
      },
    },
  },
  plugins: [],
}
