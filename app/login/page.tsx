"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { useTranslation } from "@/hooks/useTranslation"
import Link from "next/link"
import { isUserValidated } from "@/lib/validate-login"
import Spinner from "@/components/ui/loading-spinner"

export default function LoginPage() {
  const router = useRouter()
  const { t, isEnglish } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)

   useEffect(() => {
      async function checkValidation() {
        setIsLoading(true)
        const isValidated = await isUserValidated();
        if (isValidated) {
          setTimeout(() => {setIsLoading(false)}, 5000)
          //router.push("/dashboard");
        }
        setIsLoading(false)
      }
      checkValidation();
    }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
  
        if (newAttempts >= 5) {
          setError(isEnglish ? "Too many failed attempts. Please try again later." : "Demasiados intentos fallidos. Inténtalo de nuevo más tarde.");
        } else {
          setError(data.message || (isEnglish ? "Invalid email or password" : "Email o contraseña inválidos"));
        }
        return;
      }
      
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('account', data.user.account);
      localStorage.setItem('user', JSON.stringify(data.user));

      router.push("/dashboard");
      
    } catch (err) {
      setError(isEnglish ? "An error occurred during login" : "Ocurrió un error durante el inicio de sesión");
      console.error(err);
    } finally {
      setIsLoading(false)
    }
  }

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        // Si no hay refresh token, redirigir al login
        router.push('/login');
        return null;
      }
  
      const response = await fetch('/api/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken })
      });
  
      if (!response.ok) {
        // Si el refresh token no es válido, limpiar y redirigir
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        router.push('/login');
        return null;
      }
  
      const data = await response.json();
      console.log(data);
      localStorage.setItem('accessToken', data.accessToken);
      return data.accessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  };

  const authFetch = async (url: string, options: RequestInit = {}) => {
    let accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      accessToken = await refreshToken();
      if (!accessToken) return null;
    }
    
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`
    };
    
    try {
      const response = await fetch(url, {
        ...options,
        headers
      });
      
      // Si obtenemos un 403 (token expirado), intentar refrescar
      if (response.status === 403) {
        const newToken = await refreshToken();
        if (!newToken) return null;
        
        // Reintentar con el nuevo token
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${newToken}`
          }
        });
      }
      
      return response;
    } catch (error) {
      console.error('Error in authFetch:', error);
      return null;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 loginBackground">
      {/* Language Switcher - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      
      <div className="w-full max-w-md loginCard">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">{t('login.title')}</CardTitle>
            <img
              src="../../ConversAI_logo1.png"
              alt="ConversAI"
              className="mb-6"
              style={{ display: "flex", margin: "auto", padding: "auto", height: 50 }}
            />
            <CardDescription className="text-center">{t('login.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('login.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('login.password')}</Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    {t('login.forgotPassword')}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t('login.rememberMe')}
                </Label>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Spinner /> : t('login.submit')}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              {t('login.needDemo')}{" "}
              <Link href="/contact" className="text-primary hover:underline">
                {t('login.contactSales')}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}