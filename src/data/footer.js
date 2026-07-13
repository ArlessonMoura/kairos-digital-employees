export const footer = {
  logo: 'Kairós',
  description: 'Seu próximo funcionário já está pronto para trabalhar. Contrate inteligência. Esqueça a burocracia.',
  links: {
    produto: [
      { label: 'Funcionários Digitais', href: '#employees' },
      { label: 'Como Funciona', href: '#how-it-works' },
      { label: 'Benefícios', href: '#benefits' },
      { label: 'Preços', href: '#cta' },
    ],
    empresa: [
      { label: 'Sobre', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Carreiras', href: '#' },
      { label: 'Contato', href: '#' },
    ],
    legal: [
      { label: 'Privacidade', href: '#' },
      { label: 'Termos', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  },
  socialLinks: [
    { icon: 'MessageCircle', href: '#', label: 'Twitter' },
    { icon: 'Link', href: '#', label: 'LinkedIn' },
    { icon: 'Mail', href: '#', label: 'Email' },
  ],
  copyright: (year) => `© ${year} Kairós. Todos os direitos reservados.`,
}
