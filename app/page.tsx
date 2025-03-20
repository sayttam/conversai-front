"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"


export default function Home() {
 
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center h-16 justify-between">
          <div className="text-xl font-bold">AI Chatbot Admin</div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/contact">
              <Button>Contact Sales</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-24 px-4 text-center bg-gradient-to-b from-white to-gray-100">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-5xl font-bold tracking-tight mb-6">AI-Powered Chatbot Management Platform</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Complete admin dashboard for managing chatbots, campaigns, and client interactions using advanced AI
              technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="gap-2">
                  Access Dashboard <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline">
                  Request Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg  bg-gradient-to-b from-white to-gray-100 opacity-80">
                <h3 className="text-xl font-semibold mb-2">Campaign Management</h3>
                <p className="text-gray-600">
                  Create, modify, and track campaigns with detailed analytics and insights.
                </p>
              </div>
              <div className="p-6 border rounded-lg  bg-gradient-to-b from-white to-gray-100 opacity-80">
                <h3 className="text-xl font-semibold mb-2">Client Administration</h3>
                <p className="text-gray-600">
                  Manage client accounts, roles, and permissions with a secure multi-tenant architecture.
                </p>
              </div>
              <div className="p-6 border rounded-lg  bg-gradient-to-b from-white to-gray-100 opacity-80">
                <h3 className="text-xl font-semibold mb-2">AI Configuration</h3>
                <p className="text-gray-600">
                  Customize chatbot behavior, training, and responses for each client and campaign.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-8  bg-gradient-to-b from-white to-gray-100 opacity-80">
        <div className="container text-center text-gray-500">
          &copy; {new Date().getFullYear()} AI Chatbot Admin. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

