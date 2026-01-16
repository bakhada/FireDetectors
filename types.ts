
export type Language = 'en' | 'de';

export interface LocalizedString {
  en: string;
  de: string;
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedString;
  imageUrl: string;
  affiliateLink: string;
  price: string;
  priceNumeric: number;
  category: 'Smoke Detector' | 'Heat Detector' | 'Accessories' | 'Sets' | 'Gas Detector';
  description: LocalizedString;
  specs: LocalizedString[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Comparison {
  id: string;
  productA: Product;
  productB: Product;
  verdict: LocalizedString;
  prosA: LocalizedString[];
  prosB: LocalizedString[];
}

export interface Article {
  id: string;
  slug: string;
  title: LocalizedString;
  summary: LocalizedString;
  content: LocalizedString;
  author: string;
  date: string;
  readTime: LocalizedString;
  imageUrl: string;
}

export type ViewType = 'home' | 'products' | 'product-details' | 'article-details' | 'blog';
