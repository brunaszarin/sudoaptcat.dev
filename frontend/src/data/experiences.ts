export interface Experience {
  id: string
  company: string
  role: string
  location: string
  period: string
  description: string
  technologies: string[]
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'serasa',
    company: 'Serasa Experian',
    role: 'Fullstack Developer',
    location: 'Blumenau',
    period: 'Oct 2024 – present',
    description:
      'Modernized Teleport, a core insurance quotation and policy platform, rebuilding a legacy Delphi system into a scalable Next.js application and integrating REST APIs with major insurance providers.',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind',
      'Java',
      'Spring Boot',
      'React Query',
      'AWS',
      'Datadog',
    ],
  },
  {
    id: 'herrlog',
    company: 'Herrlog Solutions',
    role: 'Fullstack Developer',
    location: 'São Paulo',
    period: 'May 2023 – Oct 2024',
    description:
      'Evolved a multi-tenant logistics ERP for fleet and transport operations, refactoring a legacy React frontend and optimizing high-volume data flows for enterprise clients.',
    technologies: [
      'React',
      'TypeScript',
      'Redux',
      'React Query',
      'C#',
      '.NET 9',
      'Azure',
      'Docker',
      'RabbitMQ',
    ],
  },
  {
    id: 'larroude',
    company: 'Larroudé Inc.',
    role: 'Fullstack & Shopify Developer',
    location: 'New York',
    period: 'Apr 2022 – May 2023',
    description:
      'Designed microservices and REST/GraphQL APIs for an e-commerce platform, built Shopify integrations that boosted online sales, and optimized AWS infrastructure with IaC.',
    technologies: [
      'Java',
      'Python',
      'Node.js',
      'React',
      'AWS',
      'Terraform',
      'Kubernetes',
      'BigQuery',
      'Shopify',
      'Kafka',
    ],
  },
  {
    id: 'inciclo',
    company: 'Inciclo',
    role: 'Fullstack & Shopify Developer',
    location: 'California',
    period: 'May 2020 – Apr 2022',
    description:
      'Built reliable integrations between Shopify, ERP (Tiny) and custom checkout (Yampi), plus internal dashboards that drove conversion and improved Core Web Vitals.',
    technologies: [
      'Node.js',
      'JavaScript',
      'Liquid',
      'Shopify API',
      'TailwindCSS',
    ],
  },
  {
    id: 'cupcode',
    company: 'Cupcode',
    role: 'Fullstack & Shopify Developer',
    location: 'Paraná',
    period: 'Feb 2019 – May 2020',
    description:
      'Developed and maintained WordPress sites and e-commerce platforms across diverse sectors, building responsive interfaces and integrations that improved SEO and engagement.',
    technologies: [
      'WordPress',
      'Shopify',
      'HTML5',
      'CSS3',
      'Sass',
      'JavaScript',
      'TypeScript',
      'Angular',
      'React',
      'Liquid',
    ],
  },
]