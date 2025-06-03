export interface NavItem {
  title: string;
  href: string;
  dropdown?: {
    title: string;
    href: string;
    dropdown?: {
      title: string;
      href: string;
    }[];
  }[];
}

export const navItems: NavItem[] = [
  {
    title: 'Jewelry',
    href: '/jewelry',
    dropdown: [
      { title: 'Collections',
        href: '/products/category1',
        dropdown: [
            { title: 'Les Classiques', href: '/collections/les-classiques' },
            { title: 'Mon Secret', href: '/collections/mon-secret' },
            { title: 'Caravelles', href: '/collections/caravelles' },
            { title: 'Petits Coeurs', href: '/collections/petits-coeurs' },
            { title: 'Les Mignonnes', href: '/collections/les-mignonnes' },
            { title: 'View All', href: '/collections' },
        ]
      },
      { 
        title: 'Categories', 
        href: '/products/category2', 
        dropdown: [
          { title: 'Bracelets', href: '/collections/bracelets' },
          { title: 'Rings', href: '/collections/rings' },
          { title: 'Earrings', href: '/collections/earrings' },
          { title: 'Necklaces', href: '/collections/necklaces' },
          { title: 'View All', href: '/collections' },
        ] 
      },
      { title: 'High Jewelry', href: '/pages/high-jewelry' },
      { title: 'Lookbooks', href: '/lookbooks' },
      { title: 'Crown', href: '/crown' },
    ],
  },
  {
    title: 'Home & Accessories',
    href: '/home-and-accessories',
  },
  {
    title: 'Gifts',
    href: '/gifts',
    dropdown: [
      { title: 'For Her', href: '/collections/for-her' },
      { title: 'For Him', href: '/collections/for-him' },
      { title: 'Gift Card', href: '/collections/gift-card' },
    ],
  },
  {
    title: 'Wedding',
    href: '/wedding',
    dropdown: [
      { title: 'Engagement', href: '/collections/engagement' },
      { title: 'Wedding Bands', href: '/collections/wedding-bands' },
      { title: 'Bride & Groom', href: '/collections/bride-and-groom' },
    ],
  },
  {
    title: 'About us',
    href: '/about-us',
    dropdown: [
        { title: 'The Company', href: '/about-us/the-company' },
        { title: 'Milestones', href: '/about-us/milestones' },
        { title: 'Our Pearls', href: '/about-us/our-pearls' },
      ],
  },
  {
    title: 'Education',
    href: '/education',
    dropdown: [
        { title: 'Know Your Pearls', href: '/education/know-your-pearls' },
        { title: 'Pearls 101', href: '/education/pearls-101' },
        { title: 'The History of Pearls', href: '/education/the-history-of-pearls' },
      ],
  },
  {
    title: 'Sustainability',
    href: '/sustainability',
  },
  {
    title: 'Contact',
    href: '/contact',
    dropdown: [
        { title: 'Get in Touch', href: '/contact/get-in-touch' },
        { title: 'Book an Appointment', href: '/contact/book-an-appointment' },
        { title: 'Careers', href: '/contact/careers' },
      ],
  },
]; 