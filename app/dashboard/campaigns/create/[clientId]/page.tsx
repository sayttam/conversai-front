import type { Metadata } from "next"
import CreateCampaignForm from "@/components/create-campaign-form"

export const metadata: Metadata = {
  title: "Crear Campaña",
  description: "Crea una nueva campaña de marketing",
}

export default function CreateCampaignPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crear Nueva Campaña</h1>
          <p className="text-muted-foreground">Completa el formulario para crear una nueva campaña de marketing</p>
        </div>
        <CreateCampaignForm />
      </div>
    </div>
  )
}
