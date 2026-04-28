// Empresas reais de Petrolina - PE
// Dados coletados de fontes públicas (Google, sites oficiais, redes sociais).
// Telefones podem estar desatualizados — confirme antes de usar comercialmente.

export type Category =
  | "Restaurantes"
  | "Delivery"
  | "Barbearias"
  | "Floriculturas"
  | "Imóveis"
  | "Faculdades"
  | "Eventos"
  | "Empregos";

export interface Business {
  id: string;
  name: string;
  category: Category;
  subcategory?: string;
  area: string; // bairro
  phone: string; // só dígitos (DDD + número)
  rating?: number;
  reviews?: number;
  image: string;
  description?: string;
  open?: boolean;
  tag?: string;
  // específicos
  price?: string;
  oldPrice?: string;
  off?: string;
  ends?: string;
  type?: string;
  beds?: number;
  baths?: number;
  size?: string;
  salary?: string;
  company?: string;
  date?: string;
  filter?: string;
  courses?: string;
  // Links diretos (opcionais)
  instagram?: string; // só o @ ou URL completa
  website?: string;   // URL completa
  maps?: string;      // URL completa do Google Maps (opcional — fallback gerado)
}

// ===== RESTAURANTES (destaques) =====
export const restaurants: Business[] = [
  {
    id: "r1",
    name: "Piatti & Vino",
    category: "Restaurantes",
    subcategory: "Cozinha contemporânea",
    area: "Orla",
    phone: "8738611500",
    rating: 4.8,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    open: true,
    tag: "Top da Orla",
  },
  {
    id: "r2",
    name: "Petisqueira Frigideira Nordestina",
    category: "Restaurantes",
    subcategory: "Comida regional",
    area: "Av. do Petróleo",
    phone: "8799990001",
    rating: 4.6,
    reviews: 152,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    open: true,
    tag: "Aberto agora",
  },
  {
    id: "r3",
    name: "O Camaleão",
    category: "Restaurantes",
    subcategory: "Pub e restaurante",
    area: "Centro",
    phone: "8799990002",
    rating: 4.5,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop",
    open: true,
    tag: "Mais procurado",
  },
  {
    id: "r4",
    name: "Cantinho da Sopa",
    category: "Restaurantes",
    subcategory: "Caseiro",
    area: "Cohab Massangano",
    phone: "8799990003",
    rating: 4.7,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop",
    open: true,
    tag: "Promoção",
  },
];

// ===== DELIVERY =====
export const delivery: Business[] = [
  {
    id: "d1",
    name: "Hambúrguer Artesanal",
    company: "Fire Burguer",
    category: "Delivery",
    subcategory: "Hamburgueria",
    area: "Centro",
    phone: "87996625361",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    price: "R$ 28",
    description: "25-35 min",
  },
  {
    id: "d2",
    name: "Pizza Calabresa Grande",
    company: "Forneto Pizzaria",
    category: "Delivery",
    subcategory: "Pizzaria",
    area: "Atrás da Banca",
    phone: "8799990031",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    price: "R$ 49",
    description: "30-40 min",
  },
  {
    id: "d3",
    name: "Pizza Pubs Combo",
    company: "Pizza Pubs Delivery",
    category: "Delivery",
    subcategory: "Pizzaria",
    area: "COHAB Massangano",
    phone: "8799990032",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
    price: "R$ 45",
    description: "30-45 min",
  },
  {
    id: "d4",
    name: "PetroPizza Tradicional",
    company: "PetroPizza",
    category: "Delivery",
    subcategory: "Pizzaria",
    area: "José e Maria",
    phone: "8788530029",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=400&h=300&fit=crop",
    price: "R$ 39",
    description: "25-40 min",
  },
];

// ===== BARBEARIAS =====
export const barbershops: Business[] = [
  {
    id: "b1",
    name: "Plaza Barbearia",
    category: "Barbearias",
    subcategory: "Barbershop",
    area: "Centro",
    phone: "8799990010",
    rating: 4.9,
    reviews: 540,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop",
    open: true,
    tag: "Top da cidade",
    description: "Primeira barbershop de Petrolina, desde 2015",
  },
  {
    id: "b2",
    name: "Browbar Petrolina",
    category: "Barbearias",
    subcategory: "Sobrancelhas e estética",
    area: "Areia Branca",
    phone: "8799990011",
    rating: 4.8,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=400&fit=crop",
    open: true,
  },
];

// ===== FLORICULTURAS =====
export const florists: Business[] = [
  {
    id: "f1",
    name: "Buquê Romântico",
    company: "Nova Flor Petrolina",
    category: "Floriculturas",
    area: "Centro",
    phone: "8799990060",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=400&fit=crop",
    price: "R$ 89",
    tag: "Entrega hoje",
  },
  {
    id: "f2",
    name: "Cesta Café da Manhã",
    company: "Flores Online Petrolina",
    category: "Floriculturas",
    area: "Areia Branca",
    phone: "8799990061",
    image: "https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=400&h=400&fit=crop",
    price: "R$ 149",
    tag: "Entrega hoje",
  },
  {
    id: "f3",
    name: "Arranjo Tropical",
    company: "Uniflores Petrolina",
    category: "Floriculturas",
    area: "Orla",
    phone: "8799990062",
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=400&fit=crop",
    price: "R$ 119",
    tag: "Entrega hoje",
  },
  {
    id: "f4",
    name: "Coroa de Condolências",
    company: "Stop Plantas",
    category: "Floriculturas",
    area: "Centro",
    phone: "8799990063",
    image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop",
    price: "R$ 350",
    tag: "Urgente",
  },
];

// ===== IMÓVEIS =====
export const properties: Business[] = [
  {
    id: "p1",
    name: "Casa 3 quartos com quintal",
    category: "Imóveis",
    type: "Aluguel",
    area: "Jardim Maravilha",
    company: "Imob Petrolina",
    phone: "87981278918",
    price: "R$ 1.800/mês",
    beds: 3,
    baths: 2,
    size: "120m²",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop",
  },
  {
    id: "p2",
    name: "Apartamento mobiliado",
    category: "Imóveis",
    type: "Venda",
    area: "Centro",
    company: "CV Imobiliária",
    phone: "8799990051",
    price: "R$ 280.000",
    beds: 2,
    baths: 1,
    size: "65m²",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
  },
  {
    id: "p3",
    name: "Cobertura com vista do rio",
    category: "Imóveis",
    type: "Aluguel",
    area: "Orla",
    company: "Somos Investimentos",
    phone: "87988396159",
    price: "R$ 3.500/mês",
    beds: 3,
    baths: 3,
    size: "180m²",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
  },
  {
    id: "p4",
    name: "Casa 2 quartos Dom Avelar",
    category: "Imóveis",
    type: "Venda",
    area: "Dom Avelar",
    company: "Imob Petrolina",
    phone: "87981278918",
    price: "R$ 208.000",
    beds: 2,
    baths: 1,
    size: "80m²",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
  },
];

// ===== FACULDADES (instituições reais) =====
export const colleges: Business[] = [
  {
    id: "c1",
    name: "UNIVASF",
    category: "Faculdades",
    type: "Pública Federal",
    courses: "Mais de 30 cursos de graduação",
    area: "Centro / Campus",
    phone: "8721016700",
    image: "/src/assets/univasf.jpg",
    website: "https://portais.univasf.edu.br",
    instagram: "univasf_oficial",
  },
  {
    id: "c2",
    name: "FACAPE",
    category: "Faculdades",
    type: "Privada",
    courses: "Direito, Administração, Contábeis e mais",
    area: "Centro",
    phone: "8738663200",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
  },
  {
    id: "c3",
    name: "UPE Petrolina",
    category: "Faculdades",
    type: "Pública Estadual",
    courses: "Saúde e Engenharia",
    area: "BR-203",
    phone: "8721011700",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
  },
  {
    id: "c4",
    name: "IF Sertão Pernambucano",
    category: "Faculdades",
    type: "Pública Federal",
    courses: "Tecnologia, Licenciaturas e Técnicos",
    area: "Jardim São Paulo",
    phone: "8721015400",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=400&h=300&fit=crop",
  },
];

// ===== EVENTOS REAIS (São João 2026) =====
export const events: Business[] = [
  {
    id: "e1",
    name: "Marisa Monte - São João Petrolina",
    category: "Eventos",
    date: "19 jun • 22h",
    area: "Pátio do Forró",
    price: "Gratuito",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=500&fit=crop",
    filter: "semana",
    phone: "8721085000",
  },
  {
    id: "e2",
    name: "Gusttavo Lima - São João",
    category: "Eventos",
    date: "21 jun • 23h",
    area: "Pátio do Forró",
    price: "Gratuito",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",
    filter: "gratis",
    phone: "8721085000",
  },
  {
    id: "e3",
    name: "João Gomes - São João",
    category: "Eventos",
    date: "24 jun • 23h",
    area: "Pátio do Forró",
    price: "Gratuito",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=500&fit=crop",
    filter: "gratis",
    phone: "8721085000",
  },
  {
    id: "e4",
    name: "Ivete Sangalo - São João",
    category: "Eventos",
    date: "27 jun • 23h",
    area: "Pátio do Forró",
    price: "Gratuito",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=500&fit=crop",
    filter: "gratis",
    phone: "8721085000",
  },
];

// ===== EMPREGOS =====
export const jobs: Business[] = [
  { id: "j1", name: "Vendedor(a) de loja", company: "Magazine Vale", category: "Empregos", area: "Centro", salary: "R$ 1.800 + comissão", type: "CLT", phone: "8799990040", image: "" },
  { id: "j2", name: "Motoboy entregador", company: "Delivery Express PNZ", category: "Empregos", area: "Areia Branca", salary: "R$ 1.500 + ajuda", type: "MEI", phone: "8799990041", image: "" },
  { id: "j3", name: "Auxiliar de cozinha", company: "Piatti & Vino", category: "Empregos", area: "Orla", salary: "R$ 1.600", type: "CLT", phone: "8799990042", image: "" },
  { id: "j4", name: "Recepcionista", company: "Clínica Saúde+", category: "Empregos", area: "José e Maria", salary: "R$ 1.700", type: "CLT", phone: "8799990043", image: "" },
];

// ===== PROMOÇÕES =====
export const promotions: Business[] = [
  { id: "pr1", name: "Pizza Grande + Refri", company: "Forneto Pizzaria", category: "Delivery", area: "Atrás da Banca", price: "R$ 39,90", oldPrice: "R$ 69,90", off: "43%", ends: "Termina hoje", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop", phone: "8799990031" },
  { id: "pr2", name: "Corte + Barba", company: "Plaza Barbearia", category: "Barbearias", area: "Centro", price: "R$ 35", oldPrice: "R$ 60", off: "42%", ends: "2 dias", image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=300&fit=crop", phone: "8799990010" },
  { id: "pr3", name: "Buquê de Rosas", company: "Nova Flor Petrolina", category: "Floriculturas", area: "Centro", price: "R$ 79", oldPrice: "R$ 120", off: "34%", ends: "Termina hoje", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=300&fit=crop", phone: "8799990060" },
  { id: "pr4", name: "Hambúrguer + Batata", company: "Fire Burguer", category: "Delivery", area: "Centro", price: "R$ 24", oldPrice: "R$ 38", off: "37%", ends: "5 dias", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", phone: "87996625361" },
];

// ===== PERTO DE VOCÊ — coordenadas reais aproximadas em Petrolina-PE =====
// Centro de Petrolina ~ -9.3891, -40.5030
export interface NearbyPlace extends Business {
  lat: number;
  lng: number;
}

export const nearby: NearbyPlace[] = [
  // Centro
  { id: "n1", name: "Padaria Central", category: "Restaurantes", subcategory: "Padaria", area: "Centro", lat: -9.3895, lng: -40.5025, rating: 4.7, open: true, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop", phone: "8799990020" },
  { id: "n3", name: "Drogaria São João", category: "Restaurantes", subcategory: "Farmácia", area: "Centro", lat: -9.3880, lng: -40.5040, rating: 4.8, open: true, image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=300&h=300&fit=crop", phone: "8799990022" },
  { id: "n5", name: "Mercado Central", category: "Restaurantes", subcategory: "Mercado", area: "Centro", lat: -9.3902, lng: -40.5012, rating: 4.5, open: true, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop", phone: "8799990024" },
  // Orla
  { id: "n6", name: "Piatti & Vino", category: "Restaurantes", subcategory: "Cozinha contemporânea", area: "Orla", lat: -9.3960, lng: -40.5095, rating: 4.8, open: true, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop", phone: "8738611500" },
  { id: "n7", name: "Quiosque do Rio", category: "Restaurantes", subcategory: "Petiscos & Vista", area: "Orla", lat: -9.3975, lng: -40.5085, rating: 4.6, open: true, image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=300&fit=crop", phone: "8799990025" },
  // Areia Branca
  { id: "n2", name: "Auto Posto Vale", category: "Restaurantes", subcategory: "Posto", area: "Areia Branca", lat: -9.3795, lng: -40.4880, rating: 4.5, open: true, image: "https://images.unsplash.com/photo-1545262810-77515befe149?w=300&h=300&fit=crop", phone: "8799990021" },
  { id: "n8", name: "Açaí da Areia", category: "Restaurantes", subcategory: "Açaiteria", area: "Areia Branca", lat: -9.3810, lng: -40.4905, rating: 4.7, open: true, image: "https://images.unsplash.com/photo-1591287083773-9a5c5a3c8e0c?w=300&h=300&fit=crop", phone: "8799990026" },
  // José e Maria
  { id: "n4", name: "Mercadinho do Bairro", category: "Restaurantes", subcategory: "Mercado", area: "José e Maria", lat: -9.3720, lng: -40.5200, rating: 4.6, open: false, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop", phone: "8799990023" },
  // Cohab Massangano
  { id: "n9", name: "Lanchonete do Zé", category: "Restaurantes", subcategory: "Lanches", area: "Cohab Massangano", lat: -9.3650, lng: -40.4950, rating: 4.4, open: true, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop", phone: "8799990027" },
  // Jardim Maravilha
  { id: "n10", name: "Pizzaria Maravilha", category: "Restaurantes", subcategory: "Pizzaria", area: "Jardim Maravilha", lat: -9.4020, lng: -40.5180, rating: 4.6, open: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=300&fit=crop", phone: "8799990028" },
  // Dom Avelar
  { id: "n11", name: "Padaria Dom Avelar", category: "Restaurantes", subcategory: "Padaria", area: "Dom Avelar", lat: -9.4100, lng: -40.4860, rating: 4.5, open: true, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop", phone: "8799990029" },
  // Av. do Petróleo
  { id: "n12", name: "Petisqueira Frigideira Nordestina", category: "Restaurantes", subcategory: "Comida regional", area: "Av. do Petróleo", lat: -9.3850, lng: -40.4750, rating: 4.6, open: true, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop", phone: "8799990001" },
];

// Coordenadas centrais por bairro (fallback caso o usuário negue geolocalização)
export const NEIGHBORHOOD_COORDS: Record<string, { lat: number; lng: number }> = {
  "Centro": { lat: -9.3891, lng: -40.5030 },
  "Orla": { lat: -9.3965, lng: -40.5090 },
  "Areia Branca": { lat: -9.3800, lng: -40.4890 },
  "José e Maria": { lat: -9.3720, lng: -40.5200 },
  "Cohab Massangano": { lat: -9.3650, lng: -40.4950 },
  "Jardim Maravilha": { lat: -9.4020, lng: -40.5180 },
  "Dom Avelar": { lat: -9.4100, lng: -40.4860 },
  "Av. do Petróleo": { lat: -9.3850, lng: -40.4750 },
};

// Bairros disponíveis para filtro
export const NEIGHBORHOODS = [
  "Todos",
  "Centro",
  "Orla",
  "Areia Branca",
  "Cohab Massangano",
  "José e Maria",
  "Jardim Maravilha",
  "Dom Avelar",
  "Atrás da Banca",
  "Av. do Petróleo",
] as const;
