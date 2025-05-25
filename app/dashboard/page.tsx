"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, MessageSquare, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation";
import { isUserValidated } from "@/lib/validate-login"
import { useTranslation } from "@/hooks/useTranslation"
import { useEffect, useState } from "react"

interface User {
  id: string
  name: string
  role: string
  email: string
  clientsAssigned: string[]
  account: string
}

interface Campaign {
  _id: string
  id: string
  name: string
  client: string
  startDate: string
  endDate: string
  status: "active" | "scheduled" | "ended" | "archived"
  performance: number
  type: string
  instructions: string
  tasks: string[]
  created_at: string
  campaignId: string
  campaignName: string
  clientId: string
}

export default function DashboardPage() {
  const router = useRouter();
  const { t, isEnglish } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [userJson, setUserJson] = useState<User | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const storageUser = JSON.parse(localStorage.getItem('user') || 'null');
        const token = localStorage.getItem('accessToken');

        const responseUser = await fetch('/api/user/email/' + storageUser.email, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token || '',
          },
          credentials: 'include'
        });

        const dataUser = await responseUser.json();

        if (!responseUser.ok) {
          console.error('Failed to fetch user:', dataUser);
          return;
        }

        setUser(dataUser.user);

        const campaignPromises = (dataUser.user.clientsAssigned as string[]).map(client =>
          fetch('/api/campaigns/' + client, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token || '',
            },
            credentials: 'include'
          }).then(res => res.json())
        );

        const campaignsResponses = await Promise.all(campaignPromises);

        const campaignsData = campaignsResponses
          .filter(response => response && response.campaigns)
          .flatMap(response => response.campaigns);

        setCampaigns(campaignsData);

      } catch (err) {
        console.error('Error fetching campaigns:', err);
      }
    };

    getCampaigns();
  }, []);

  useEffect(() => {
    async function checkValidation() {
      try {
        const isValidated = await isUserValidated();
        if (!isValidated) {
          router.push("/login");
          return;
        }

        // Acceder a localStorage solo en el cliente
        const userString = localStorage.getItem("user");
        if (userString) {
          try {
            const parsedUser: User = JSON.parse(userString);
            setUserJson(parsedUser);
          } catch (parseError) {
            console.error("Error parsing user data:", parseError);
            router.push("/login");
            return;
          }
        } else {
          router.push("/login");
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error("Error validating user:", error);
        router.push("/login");
      }
    }

    checkValidation();
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">{t('loading')}</div>;
  }

  if (!userJson) {
    return <div className="flex justify-center items-center h-screen">
      {isEnglish ? 'User not found' : 'Usuario no encontrado'}
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t('dashboard')}</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {t('dashboard.welcome')} {userJson.name}
          </span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('dashboard.totalConversations')}</p>
                <p className="text-3xl font-bold">1,547</p>
              </div>
              <div className="rounded-full p-2 bg-primary/10 globe">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">+12%</span>
              <span className="ml-1">{t('common.fromLastWeek')}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('dashboard.assignedClients')}</p>
                <p className="text-3xl font-bold">
                  {userJson.clientsAssigned?.length || 0}
                </p>
              </div>
              <div className="rounded-full p-2 bg-primary/10 globe">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500 font-medium">+2</span>
              <span className="ml-1">{t('common.fromLastMonth')}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t('dashboard.activeCampaigns')}</p>
                <p className="text-3xl font-bold">{campaigns.length}</p>
              </div>
              <div className="rounded-full p-2 bg-primary/10 globe">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
              <span className="text-red-500 font-medium">-1</span>
              <span className="ml-1">{t('common.fromLastWeek')}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
            <CardDescription>
              {isEnglish
                ? 'Latest client interactions and system events'
                : 'Últimas interacciones de clientes y eventos del sistema'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {isEnglish ? 'New campaign created' : 'Nueva campaña creada'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isEnglish ? 'Client: Acme Inc. • Campaign: Summer Promo' : 'Cliente: Acme Inc. • Campaña: Promo Verano'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(Date.now() - i * 3600000).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('dashboard.campaignPerformance')}</CardTitle>
            <CardDescription>
              {isEnglish
                ? 'Top performing active campaigns'
                : 'Campañas activas con mejor rendimiento'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: isEnglish ? "Spring Promotion" : "Promoción Primavera", client: "Globex Corp", score: 98 },
                { name: isEnglish ? "Product Launch" : "Lanzamiento Producto", client: "Stark Industries", score: 92 },
                { name: isEnglish ? "Holiday Special" : "Especial Fiestas", client: "Wayne Enterprises", score: 87 },
                { name: isEnglish ? "Customer Survey" : "Encuesta Cliente", client: "Acme Inc", score: 85 },
                { name: isEnglish ? "Feedback Collection" : "Recolección Feedback", client: "Umbrella Corp", score: 80 },
              ].map((campaign, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{campaign.name}</p>
                    <p className="text-sm text-muted-foreground">{campaign.client}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative h-2 w-20 rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${campaign.score > 90
                          ? "bg-green-500"
                          : campaign.score > 80
                            ? "bg-yellow-500"
                            : "bg-red-500"
                          }`}
                        style={{ width: `${campaign.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{campaign.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


      </div>
      {/* User Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.userInfo')}</CardTitle>
          <CardDescription>
            {isEnglish ? 'Your current account details' : 'Detalles de tu cuenta actual'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-small text-muted-foreground">{t('name')}</p>
              <p className="text-lg font-semibold">{userJson.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t('role')}</p>
              <p className="text-lg font-semibold capitalize">{userJson.role}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t('email')}</p>
              <p className="text-lg font-semibold">{userJson.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {isEnglish ? 'Clients Assigned' : 'Clientes Asignados'}
              </p>
              <p className="text-lg font-semibold">
                {userJson.clientsAssigned?.length || 0} {isEnglish ? 'clients' : 'clientes'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}