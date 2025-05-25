"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare, Users, BarChart3, Settings, Zap, Shield, Globe, CheckCircle, Bot, Smartphone, Monitor } from "lucide-react"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useTranslation } from "@/hooks/useTranslation"
import { I18nProvider } from '@/lib/i18n/context'
import Link from "next/link"

export default function Home() {
  const { t, isEnglish } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center h-16 justify-between">
          <div className="text-xl font-bold">
            <img src="../../ConversAI_logo2-removebg-preview.png" alt="ConversAI" style={{height: 50}}/>
          </div>
          <div className="flex gap-4 items-center">
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="outline">{t('login')}</Button>
            </Link>
            <Link href="/contact">
              <Button>{t('login.contactSales')}</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-5 text-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container mx-auto max-w-6xl grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            <img src="../../ConversAI_logo-nobg.png" alt="ConversAI" className="mb-5 mx-auto" style={{height: 300}}/>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed mt-20">
              {t('hero.subtitle')}
            </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="/login">
                <Button size="lg" className="mt-5 gap-2 px-8 py-4 text-lg">
                  {t('hero.cta.dashboard')} <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg mt-5">
                  {t('hero.cta.demo')}
                </Button>
              </Link>
            </div>
            
            {/* Channel Icons */}
            <div className="flex justify-center gap-8 items-center opacity-70">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mb-2">
                  <MessageSquare size={24} />
                </div>
                <span className="text-sm font-medium">WhatsApp</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white mb-2">
                  <MessageSquare size={24} />
                </div>
                <span className="text-sm font-medium">Messenger</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white mb-2">
                  <MessageSquare size={24} />
                </div>
                <span className="text-sm font-medium">Instagram</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white mb-2">
                  <Monitor size={24} />
                </div>
                <span className="text-sm font-medium">WebChat</span>
              </div>
            </div>

        </section>

        {/* Key Features */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">{t('features.title')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('features.subtitle')}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-8 border rounded-xl bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Bot className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('features.aiAgents.title')}</h3>
                <p className="text-gray-600">
                  {t('features.aiAgents.description')}
                </p>
              </div>

              <div className="p-8 border rounded-xl bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('features.omnichannel.title')}</h3>
                <p className="text-gray-600">
                  {t('features.omnichannel.description')}
                </p>
              </div>

              <div className="p-8 border rounded-xl bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="text-purple-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('features.analytics.title')}</h3>
                <p className="text-gray-600">
                  {t('features.analytics.description')}
                </p>
              </div>

              <div className="p-8 border rounded-xl bg-gradient-to-br from-orange-50 to-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="text-orange-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('features.clientManagement.title')}</h3>
                <p className="text-gray-600">
                  {t('features.clientManagement.description')}
                </p>
              </div>

              <div className="p-8 border rounded-xl bg-gradient-to-br from-red-50 to-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('features.automation.title')}</h3>
                <p className="text-gray-600">
                  {t('features.automation.description')}
                </p>
              </div>

              <div className="p-8 border rounded-xl bg-gradient-to-br from-teal-50 to-white hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="text-teal-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('features.customization.title')}</h3>
                <p className="text-gray-600">
                  {t('features.customization.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack - Benefits remain largely the same as they're descriptive */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                {isEnglish ? 'Cutting-Edge Technology' : 'Tecnología de Vanguardia'}
              </h2>
              <p className="text-xl text-gray-600">
                {isEnglish ? 'Built with the best technologies for maximum performance' : 'Construido con las mejores tecnologías para máximo rendimiento'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-1 gap-12 items-center">            
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-6">
                  {isEnglish ? 'Key Benefits' : 'Beneficios Clave'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Shield className="text-green-500 mt-1" size={18} />
                    <span>{isEnglish ? 'Enterprise security and data protection' : 'Seguridad empresarial y protección de datos'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="text-yellow-500 mt-1" size={18} />
                    <span>{isEnglish ? 'Instant responses 24/7' : 'Respuestas instantáneas 24/7'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <BarChart3 className="text-blue-500 mt-1" size={18} />
                    <span>{isEnglish ? 'Scalability for millions of conversations' : 'Escalabilidad para millones de conversaciones'}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="text-purple-500 mt-1" size={18} />
                    <span>{isEnglish ? 'Multi-language support and cultural customization' : 'Soporte multi-idioma y personalización cultural'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6">
              {isEnglish ? 'Ready to transform your customer service?' : '¿Listo para transformar tu atención al cliente?'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isEnglish 
                ? 'Join companies that are already automating their conversations and improving their customer experience'
                : 'Únete a empresas que ya están automatizando sus conversaciones y mejorando la experiencia de sus clientes'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                  {isEnglish ? 'Get Started Now' : 'Comenzar Ahora'}
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white bg-black text-white hover:bg-white hover:text-blue-600">
                  {isEnglish ? 'Talk to Sales' : 'Hablar con Ventas'}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="../../ConversAI_logo2-removebg-preview.png" alt="ConversAI" style={{height: 40}} className="mb-4"/>
              <p className="text-gray-600">
                {isEnglish 
                  ? 'Leading platform for AI conversation automation for modern businesses.'
                  : 'Plataforma líder en automatización de conversaciones con IA para empresas modernas.'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{isEnglish ? 'Product' : 'Producto'}</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">{isEnglish ? 'Features' : 'Características'}</Link></li>
                <li><Link href="#" className="hover:text-gray-900">{isEnglish ? 'Pricing' : 'Precios'}</Link></li>
                <li><Link href="#" className="hover:text-gray-900">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{isEnglish ? 'Company' : 'Empresa'}</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">{isEnglish ? 'About' : 'Nosotros'}</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Blog</Link></li>
                <li><Link href="#" className="hover:text-gray-900">{isEnglish ? 'Careers' : 'Carreras'}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{isEnglish ? 'Support' : 'Soporte'}</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">{isEnglish ? 'Documentation' : 'Documentación'}</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900">{isEnglish ? 'Contact' : 'Contacto'}</Link></li>
                <li><Link href="#" className="hover:text-gray-900">{isEnglish ? 'System Status' : 'Estado del Sistema'}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-gray-500">
            &copy; {new Date().getFullYear()} ConversAI. {isEnglish ? 'All rights reserved.' : 'Todos los derechos reservados.'}
          </div>
          </div>
          </footer>
          </div>)}