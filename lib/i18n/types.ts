// lib/i18n/types.ts
export type Locale = 'es' | 'en';

export interface TranslationKeys {
  // Navigation
  dashboard: string;
  campaigns: string;
  clients: string;
  settings: string;
  login: string;
  logout: string;
  
  // Home page
  'hero.title': string;
  'hero.subtitle': string;
  'hero.cta.dashboard': string;
  'hero.cta.demo': string;
  'features.title': string;
  'features.subtitle': string;
  'features.aiAgents.title': string;
  'features.aiAgents.description': string;
  'features.omnichannel.title': string;
  'features.omnichannel.description': string;
  'features.analytics.title': string;
  'features.analytics.description': string;
  'features.clientManagement.title': string;
  'features.clientManagement.description': string;
  'features.automation.title': string;
  'features.automation.description': string;
  'features.customization.title': string;
  'features.customization.description': string;
  
  // Dashboard
  'dashboard.welcome': string;
  'dashboard.totalConversations': string;
  'dashboard.assignedClients': string;
  'dashboard.activeCampaigns': string;
  'dashboard.userInfo': string;
  'dashboard.recentActivity': string;
  'dashboard.campaignPerformance': string;
  
  // Login
  'login.title': string;
  'login.subtitle': string;
  'login.email': string;
  'login.password': string;
  'login.rememberMe': string;
  'login.forgotPassword': string;
  'login.submit': string;
  'login.needDemo': string;
  'login.contactSales': string;
  
  // Common
  name: string;
  role: string;
  email: string;
  profile: string;
  loading: string;
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  create: string;
  search: string;
  filter: string;
  'common.fromLastWeek': string;
  'common.fromLastMonth': string;
}







