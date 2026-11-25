export type Page = 'home' | 'services' | 'doctors' | 'women-child' | 'about'

export const pagePaths: Record<Page, string> = {
  home: '/',
  services: '/services',
  doctors: '/doctors',
  'women-child': '/women-child',
  about: '/about',
}
