"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Link2, Mail, MapPin, Phone, Save, User } from "lucide-react"

interface UserData {
  name: string
  email: string
  profilePicture?: string
  phone?: string
  location?: string
  bio?: string
  position?: string
  linkedin?: string
  firstName?: string
  lastName?: string
  username?: string
  language?: string
  timezone?: string
  theme?: string
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    position: "",
    linkedin: "",
    firstName: "",
    lastName: "",
    username: "",
    language: "en",
    timezone: "pst",
    theme: "system"
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const loadUserData = () => {
      const user = localStorage.getItem("user")
      if (user) {
        const parsedUserData = JSON.parse(user)
        setUserData(parsedUserData)
        
        // Separar nombre completo en first y last name si no están separados
        const nameParts = parsedUserData.name?.split(' ') || ['']
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || ''
        
        setFormData({
          name: parsedUserData.name || "",
          email: parsedUserData.email || "",
          phone: parsedUserData.phone || "",
          location: parsedUserData.location || "",
          bio: parsedUserData.bio || "",
          position: parsedUserData.position || "",
          linkedin: parsedUserData.linkedin || "",
          firstName: parsedUserData.firstName || firstName,
          lastName: parsedUserData.lastName || lastName,
          username: parsedUserData.username || parsedUserData.email?.split('@')[0] || "",
          language: parsedUserData.language || "en",
          timezone: parsedUserData.timezone || "pst",
          theme: parsedUserData.theme || "system"
        })
      }
    }

    loadUserData()

    // Escuchar cambios en localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user") {
        loadUserData()
      }
    }

    const handleCustomStorageChange = () => {
      loadUserData()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("userDataChanged", handleCustomStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("userDataChanged", handleCustomStorageChange)
    }
  }, [])

  const handleInputChange = (field: keyof UserData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSavePersonalInfo = () => {
    if (!userData) return
    
    const updatedUserData = {
      ...userData,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      bio: formData.bio,
    }
    
    localStorage.setItem("user", JSON.stringify(updatedUserData))
    setUserData(updatedUserData)
    window.dispatchEvent(new Event("userDataChanged"))
    
    // Aquí podrías hacer una llamada a la API para guardar en el servidor
    console.log("Saving personal info:", updatedUserData)
  }

  const handleSavePreferences = () => {
    if (!userData) return
    
    const updatedUserData = {
      ...userData,
      language: formData.language,
      timezone: formData.timezone,
      theme: formData.theme,
    }
    
    localStorage.setItem("user", JSON.stringify(updatedUserData))
    setUserData(updatedUserData)
    window.dispatchEvent(new Event("userDataChanged"))
    
    console.log("Saving preferences:", updatedUserData)
  }

  const getInitials = () => {
    if (!userData?.name) return 'U'
    return userData.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  if (!isMounted || !userData) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userData.profilePicture} alt="Profile picture" />
                  <AvatarFallback style={{ 
                    background: 'linear-gradient(135deg, #00BFFF, #6A00CD)',
                    color: '#fff',
                    fontSize: '1.5rem'
                  }}>
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background"
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Change profile picture</span>
                </Button>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {userData.position || formData.position || "User"}
                </p>
              </div>
              <Separator />
              <div className="grid w-full gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{userData.email}</span>
                </div>
                {(userData.phone || formData.phone) && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{userData.phone || formData.phone}</span>
                  </div>
                )}
                {(userData.location || formData.location) && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{userData.location || formData.location}</span>
                  </div>
                )}
                {(userData.linkedin || formData.linkedin) && (
                  <div className="flex items-center gap-2 text-sm">
                    <Link2 className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{userData.linkedin || formData.linkedin}</span>
                  </div>
                )}
              </div>
              <Separator />
              <Button className="w-full" variant="outline">
                <Camera className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="account">Account Settings</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input 
                        id="first-name" 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input 
                        id="last-name" 
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Enter your location"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                      className="min-h-[120px]"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSavePersonalInfo}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account settings and security.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" placeholder="Enter current password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" placeholder="Enter new password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Update Account
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize your dashboard experience.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      value={formData.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      value={formData.timezone}
                      onChange={(e) => handleInputChange('timezone', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="pst">Pacific Time (PST)</option>
                      <option value="est">Eastern Time (EST)</option>
                      <option value="gmt">Greenwich Mean Time (GMT)</option>
                      <option value="cet">Central European Time (CET)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <select
                      id="theme"
                      value={formData.theme}
                      onChange={(e) => handleInputChange('theme', e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSavePreferences}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}