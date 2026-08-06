import { 
  CREATOR_NAME, 
  BUSINESS_EMAIL, 
  SOCIAL_LINKS, 
  STATS, 
  NAFYAD_INFO, 
  PACKAGES,
  CENTRAL_STATS
} from './portfolio-data';

import bybitLogo from '../assets/bybit.webp';
import ehudAiLogo from '../assets/EhudAI.webp';
import hawiLogo from '../assets/hawi.webp';
import huluPayLogo from '../assets/huluPay.webp';
import ebwLogo from '../assets/ebw.webp';
import auctionEthiopiaLogo from '../assets/auction_ethiopia.svg';
import arifGetLogo from '../assets/arifget.svg';
import linkPayLogo from '../assets/linkpay.webp';
import hulugramLogo from '../assets/hulugram.svg';

// Import new custom covers
import ehudAiCover from '../assets/covers/ehud-ai.webp';
import v22OspreyCover from '../assets/covers/V22-Osprey.webp';
import lazarusCover from '../assets/covers/lazarus.webp';
import telegramCover from '../assets/covers/telegram-premium.webp';
import satelliteCover from '../assets/covers/satellite.webp';
import astronautCover from '../assets/covers/astronaut.webp';
import cryptoStartCover from '../assets/covers/crypto-start.webp';
import bitcoinGerdCover from '../assets/covers/bitcoin-gerd.webp';
import harvestCover from '../assets/covers/gerd-pride.webp';

export { 
  CREATOR_NAME, 
  BUSINESS_EMAIL, 
  SOCIAL_LINKS, 
  STATS, 
  NAFYAD_INFO, 
  PACKAGES,
  CENTRAL_STATS
};

export interface Video {
  id: string;
  title: string;
  platform: 'tiktok' | 'youtube' | 'instagram' | 'facebook';
  category: 'tech' | 'space' | 'crypto';
  views: string;
  thumbnail: string;
  url: string;
  tags: string[];
}

export interface MetricBreakdownItem {
  label: string;
  value: string;
}

export interface Metric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  period?: string;
  platformDetails?: string;
  breakdown?: MetricBreakdownItem[];
  data: { name: string; value: number }[];
}

export interface Package {
  id: string;
  name: string;
  title?: string;
  videoCount?: string;
  priceLabel?: string;
  price: string;
  priceValue: number; // Numeric ETB value for conversion
  usdPrice: number; // Global USD rate
  usdPriceFormatted?: string; // Custom formatted USD rate for Option B
  originalPriceValue?: number; // Original ETB value for discount display
  originalUsdPrice?: number; // Original USD rate for discount display
  savings?: string;
  priceSuffix?: string;
  description: string;
  features: string[];
  idealFor: string;
  isHighlighted?: boolean;
  isCustomPricing?: boolean;
  isBlurred?: boolean;
}

export const NICHES = [
  {
    id: 'tech',
    title: 'TechTruth',
    subtitle: 'AI, Robotics & Local Trends',
    description: 'Exploring AI, robotics, helper bots, and general technology topics on both local and global scales.',
    metric: '94% Retention',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 'space',
    title: 'Spaceverse',
    subtitle: 'Aerospace & Satellites',
    description: 'Research-driven exploration of aerospace, satellites, and the future of space exploration.',
    metric: '4.2M Reach',
    color: 'from-purple-600 to-pink-500',
  },
  {
    id: 'crypto',
    title: 'Cryptospace',
    subtitle: 'Updates, News & People',
    description: 'Discussing new updates, key incidents, and the people shaping the blockchain and crypto world.',
    metric: 'Top 1% Engagement',
    color: 'from-amber-500 to-orange-400',
  },
];

export const VIDEOS: Video[] = [
  // TECH (Strategic selection from user links)
  {
    id: 'tech-1',
    title: 'EhudAl: Next-Gen Al Videos 📹',
    platform: 'tiktok',
    category: 'tech',
    views: '',
    thumbnail: ehudAiCover,
    url: 'https://www.tiktok.com/@nafyad_/video/7632959584352668945',
    tags: ['EhudAI', 'Innovation'],
  },
  {
    id: 'tech-2',
    title: 'V-22 Osprey 🚁 In Ethiopia Land',
    platform: 'tiktok',
    category: 'tech',
    views: '',
    thumbnail: v22OspreyCover,
    url: 'https://www.tiktok.com/@nafyad_/video/7600095832196549904',
    tags: ['Osprey', 'AirForce', 'Ethiopia'],
  },
  {
    id: 'tech-3',
    title: "Lazarus vs The World's Banks💰",
    platform: 'instagram',
    category: 'tech',
    views: '',
    thumbnail: lazarusCover,
    url: 'https://www.instagram.com/reels/DVVROatjZ6X/',
    tags: ['Banking', 'Lazarus'],
  },
  {
    id: 'tech-4',
    title: 'The Second Harvest🌱',
    platform: 'instagram',
    category: 'tech',
    views: '',
    thumbnail: harvestCover,
    url: 'https://www.instagram.com/reel/DaQgMMBNVQN/?igsh=OWNhODFrNWdkOTIz',
    tags: ['Digital Freedom', 'Production', 'Farming'],
  },
  // SPACE
  {
    id: 'space-1',
    title: 'Ethiopia Builds Satellites 🚀',
    platform: 'tiktok',
    category: 'space',
    views: '',
    thumbnail: satelliteCover,
    url: 'https://www.tiktok.com/@nafyad_/video/7632384538139757825',
    tags: ['Space', 'Ethiopia'],
  },
  {
    id: 'space-2',
    title: "Ethiopia's 1st Astronaut Candidate",
    platform: 'facebook',
    category: 'space',
    views: '',
    thumbnail: astronautCover,
    url: 'https://web.facebook.com/reel/2055975581646873',
    tags: ['Astronaut', 'Science'],
  },
  // CRYPTO
  {
    id: 'crypto-1',
    title: 'Start Small, Think Big 🌱',
    platform: 'tiktok',
    category: 'crypto',
    views: '',
    thumbnail: cryptoStartCover,
    url: 'https://www.tiktok.com/@nafyad_/video/7555062611889392907',
    tags: ['Strategy', 'Mindset'],
  },
  {
    id: 'crypto-2',
    title: "Bitcoin Built Ethiopia's Power, GERD",
    platform: 'tiktok',
    category: 'crypto',
    views: '',
    thumbnail: bitcoinGerdCover,
    url: 'https://www.tiktok.com/@nafyad_/video/7623670489700961553',
    tags: ['Bitcoin', 'GERD'],
  },
];

export const METRICS: Metric[] = [
  {
    label: CENTRAL_STATS.tiktok.label,
    value: `${(CENTRAL_STATS.tiktok.total / 1000).toFixed(1)}K Followers`,
    change: CENTRAL_STATS.tiktok.changeLabel,
    isPositive: true,
    period: '1 Year',
    platformDetails: `${CENTRAL_STATS.tiktok.total.toLocaleString()} total TikTok followers (${CENTRAL_STATS.tiktok.changeLabel} over 1 year, starting from ${(CENTRAL_STATS.tiktok.total - CENTRAL_STATS.tiktok.gained).toLocaleString()}).`,
    data: [
      { name: 'Aug 25', value: 49500 },
      { name: 'Sep 25', value: 54000 },
      { name: 'Oct 25', value: 59500 },
      { name: 'Nov 25', value: 65000 },
      { name: 'Dec 25', value: 67500 },
      { name: 'Jan 26', value: 72000 },
      { name: 'Feb 26', value: 79500 },
      { name: 'Mar 26', value: 84000 },
      { name: 'Apr 26', value: 86500 },
      { name: 'May 26', value: 89000 },
      { name: 'Jun 26', value: 91500 },
      { name: 'Jul 26', value: CENTRAL_STATS.tiktok.total },
    ],
  },
  {
    label: CENTRAL_STATS.meta.label,
    value: `${(CENTRAL_STATS.meta.total / 1000).toFixed(1)}K Followers`,
    change: CENTRAL_STATS.meta.changeLabel,
    isPositive: true,
    period: '1 Year',
    platformDetails: `Combined Meta audience: ${(CENTRAL_STATS.meta.facebook / 1000).toFixed(1)}K Facebook followers + ${(CENTRAL_STATS.meta.instagram / 1000).toFixed(1)}K Instagram followers.`,
    data: [
      { name: 'Aug 25', value: 4100 },
      { name: 'Sep 25', value: 4300 },
      { name: 'Oct 25', value: 4600 },
      { name: 'Nov 25', value: 5000 },
      { name: 'Dec 25', value: 15300 },
      { name: 'Jan 26', value: 37300 },
      { name: 'Feb 26', value: 50300 },
      { name: 'Mar 26', value: 55800 },
      { name: 'Apr 26', value: 58500 },
      { name: 'May 26', value: 60100 },
      { name: 'Jun 26', value: 61200 },
      { name: 'Jul 26', value: CENTRAL_STATS.meta.total },
    ],
  },
  {
    label: CENTRAL_STATS.youtube.label,
    value: `${(CENTRAL_STATS.youtube.total / 1000).toFixed(1)}K Subscribers`,
    change: CENTRAL_STATS.youtube.changeLabel,
    isPositive: true,
    period: '1 Year',
    platformDetails: `${CENTRAL_STATS.youtube.total.toLocaleString()} total YouTube subscribers with ${CENTRAL_STATS.youtube.changeLabel} over 12 months.`,
    data: [
      { name: 'Aug 25', value: 39438 },
      { name: 'Sep 25', value: 39437 },
      { name: 'Oct 25', value: 39467 },
      { name: 'Nov 25', value: 39488 },
      { name: 'Dec 25', value: 39523 },
      { name: 'Jan 26', value: 45594 },
      { name: 'Feb 26', value: 47116 },
      { name: 'Mar 26', value: 47373 },
      { name: 'Apr 26', value: 49195 },
      { name: 'May 26', value: 49238 },
      { name: 'Jun 26', value: 49250 },
      { name: 'Jul 26', value: CENTRAL_STATS.youtube.total },
    ],
  },
];

export const BRANDS = [
  { name: 'ArifGet', logo: arifGetLogo },
  { name: 'Bybit', logo: bybitLogo },
  { name: 'Ehud AI', logo: ehudAiLogo },
  { name: 'Auction Ethiopia', logo: auctionEthiopiaLogo },
  { name: 'Hawi Solutions', logo: hawiLogo },
  { name: 'HuluPay', logo: huluPayLogo },
  { name: 'LinkPay', logo: linkPayLogo },
  { name: 'Hulugram', logo: hulugramLogo },
  { name: 'EBW', logo: ebwLogo },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Hawi T.',
    role: 'CEO, Hawi Tech',
    text: "Nafyad's ability to translate complex software concepts into engaging visual narratives is unmatched. He didn't just showcase our product; he explained our vision.",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: 't2',
    name: 'Daniel S.',
    role: 'Co-founder, Ehud AI',
    text: "Working with NafTech changed how we perceive content. The retention rates on our campaign were double what we saw with traditional marketing agencies.",
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    id: 't3',
    name: 'Sarah K.',
    role: 'Marketing Director, HuluPay',
    text: 'Sharp, technical, and aesthetically superior. Nafyad understands the intersection of finance and technology like no other creator in the region.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
  },
];

export const FAQS = [
  {
    question: 'What is your typical turnaround time?',
    answer: 'For a single video, turnaround is typically 3-5 business days. For larger campaigns, we work on a 2-4 week production cycle depending on complexity.'
  },
  {
    question: 'Do you offer whitelisting rights?',
    answer: 'Yes, whitelisting and usage rights for paid social ads are available as an add-on for Single & Mini Campaign, and included by default in our Premium packages.'
  },
  {
    question: 'Can you handle hardware product photography?',
    answer: 'Absolutely. We have a dedicated studio setup specifically for high-fidelity macro hardware reviews and tech "B-Roll" sequences.'
  },
  {
    question: 'How do you measure campaign success?',
    answer: 'We provide detailed performance logs after 30 days, including engagement rates, viral coefficient, and link-click conversion metrics.'
  }
];
