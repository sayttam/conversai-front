"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Loader2, PlusCircle, X } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

// Tipo para los clientes
type Client = {
  _id: string
  name: string
}

const campaignFormSchema = z.object({
  clientId: z.string({
    required_error: "Por favor selecciona un cliente",
  }),
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres",
  }),
  type: z.enum(["whatsapp", "facebook", "instagram", "chat"], {
    required_error: "Por favor selecciona un tipo",
  }),
  instructions: z.string().min(10, {
    message: "Las instrucciones deben tener al menos 10 caracteres",
  }),
  tasks: z.array(z.string()).min(1, {
    message: "Debes agregar al menos una tarea",
  }),
  status: z.enum(["active", "inactive", "scheduled", "archived"], {
    required_error: "Por favor selecciona un estado",
  }),
  startDate: z.date({
    required_error: "La fecha de inicio es requerida",
  }),
  endDate: z
    .date({
      required_error: "La fecha de fin es requerida",
    })
    .optional(),
})

type CampaignFormValues = z.infer<typeof campaignFormSchema>

export default function CreateCampaignForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [isLoadingClients, setIsLoadingClients] = useState(true)
  const [newTask, setNewTask] = useState("")

  // Cargar clientes
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const user = localStorage.getItem("user")
        const userData = user ? JSON.parse(user) : null
        if (!userData) {
          throw new Error("No se encontró información del usuario")
        }
        setClients([{
          _id: "67e1c8aaae3d180bc82afda8",
          name: "Umbrella Corp",
        }])
      } catch (error) {
        console.error("Error:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los clientes. Por favor, intenta nuevamente.",
          variant: "destructive",
        })
      } finally {
        setIsLoadingClients(false)
      }
    }
    

    fetchClients()
  }, [])

  const defaultValues: Partial<CampaignFormValues> = {
    name: "",
    instructions: "",
    status: "inactive",
    type: "whatsapp",
    tasks: [],
    startDate: new Date(),
  }

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues,
  })

  const tasks = form.watch("tasks") || []

  const addTask = () => {
    if (newTask.trim() !== "") {
      form.setValue("tasks", [...tasks, newTask.trim()])
      setNewTask("")
    }
  }

  const removeTask = (index: number) => {
    const updatedTasks = [...tasks]
    updatedTasks.splice(index, 1)
    form.setValue("tasks", updatedTasks)
  }

  async function onSubmit(data: CampaignFormValues) {
    setIsSubmitting(true)
    try {
      const response = await fetch(`http://localhost:5000/api/campaigns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Asumiendo que guardas el token en localStorage
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Error al crear la campaña")
      }

      const result = await response.json()

      toast({
        title: "Campaña creada",
        description: "La campaña ha sido creada exitosamente",
      })

      router.push("/campaigns")
      router.refresh()
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Hubo un error al crear la campaña. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="clientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoadingClients ? (
                      <div className="flex items-center justify-center p-2">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Cargando clientes...
                      </div>
                    ) : clients.length > 0 ? (
                      clients.map((client) => (
                        <SelectItem key={client._id} value={client._id}>
                          {client.name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="p-2 text-center text-sm text-muted-foreground">No hay clientes disponibles</div>
                    )}
                  </SelectContent>
                </Select>
                <FormDescription>Selecciona el cliente para esta campaña</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la campaña</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de la campaña" {...field} />
                </FormControl>
                <FormDescription>Ingresa un nombre descriptivo para tu campaña</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de campaña</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="chat">Chat</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Selecciona el tipo de campaña que deseas crear</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Activa</SelectItem>
                    <SelectItem value="inactive">Inactiva</SelectItem>
                    <SelectItem value="scheduled">Programada</SelectItem>
                    <SelectItem value="archived">Archivada</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Define el estado inicial de la campaña</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de inicio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                      >
                        {field.value ? format(field.value, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormDescription>Fecha en la que comenzará la campaña</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de finalización (opcional)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                      >
                        {field.value ? format(field.value, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={(date) => date < form.getValues("startDate") || date < new Date("1900-01-01")}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Fecha en la que finalizará la campaña (opcional)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instrucciones</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe las instrucciones para esta campaña"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Proporciona instrucciones detalladas para la ejecución de la campaña</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tasks"
          render={() => (
            <FormItem>
              <FormLabel>Tareas</FormLabel>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Agregar nueva tarea"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addTask()
                    }
                  }}
                />
                <Button type="button" onClick={addTask} size="sm">
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {tasks.length > 0 ? (
                  tasks.map((task, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {task}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0"
                        onClick={() => removeTask(index)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No hay tareas agregadas</p>
                )}
              </div>
              <FormDescription>Agrega las tareas específicas que se deben realizar en esta campaña</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/campaigns")}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Crear Campaña
          </Button>
        </div>
      </form>
    </Form>
  )
}
