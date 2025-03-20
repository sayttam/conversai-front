import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Bot, BrainCircuit, Key, MessageSquare, Save, Settings } from "lucide-react"

export default function AISettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">AI Settings</h1>
        <p className="text-muted-foreground">Configure your AI assistant and chatbot settings.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="models" className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4" />
            <span>Models</span>
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Chatbot</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span>API Keys</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General AI Settings</CardTitle>
              <CardDescription>Configure general AI behavior and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ai-enabled">Enable AI Features</Label>
                    <p className="text-sm text-muted-foreground">Turn on or off all AI features across the platform.</p>
                  </div>
                  <Switch id="ai-enabled" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label>AI Response Speed</Label>
                <p className="text-sm text-muted-foreground">
                  Adjust the balance between speed and quality of AI responses.
                </p>
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Faster</span>
                    <span>Balanced</span>
                    <span>Higher Quality</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={1} className="my-2" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Primary Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="data-collection">Data Collection</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow AI to learn from interactions to improve service.
                    </p>
                  </div>
                  <Switch id="data-collection" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics">AI Analytics</Label>
                    <p className="text-sm text-muted-foreground">Collect usage statistics to improve AI performance.</p>
                  </div>
                  <Switch id="analytics" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>AI Models Configuration</CardTitle>
              <CardDescription>Select and configure the AI models used in your application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="text-model">Text Generation Model</Label>
                <Select defaultValue="gpt-4o">
                  <SelectTrigger id="text-model">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                    <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                    <SelectItem value="llama-3">Llama 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Temperature</Label>
                <p className="text-sm text-muted-foreground">
                  Controls randomness: Lower values are more deterministic, higher values more creative.
                </p>
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Precise (0.1)</span>
                    <span>Balanced (0.5)</span>
                    <span>Creative (1.0)</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={1} className="my-2" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-tokens">Maximum Response Length</Label>
                <Input id="max-tokens" type="number" defaultValue="2048" />
                <p className="text-xs text-muted-foreground">Maximum number of tokens in AI responses.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="system-prompt">Default System Prompt</Label>
                <Textarea
                  id="system-prompt"
                  className="min-h-[100px]"
                  defaultValue="You are a helpful AI assistant for our marketing platform. Provide concise, accurate, and helpful responses to user queries."
                />
                <p className="text-xs text-muted-foreground">Instructions that define how the AI should behave.</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="streaming">Enable Streaming Responses</Label>
                    <p className="text-sm text-muted-foreground">Show AI responses as they're being generated.</p>
                  </div>
                  <Switch id="streaming" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Model Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="chatbot">
          <Card>
            <CardHeader>
              <CardTitle>Chatbot Configuration</CardTitle>
              <CardDescription>Customize your AI chatbot's behavior and appearance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="chatbot-name">Chatbot Name</Label>
                <Input id="chatbot-name" defaultValue="MarketingAssist" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcome-message">Welcome Message</Label>
                <Textarea
                  id="welcome-message"
                  className="min-h-[100px]"
                  defaultValue="👋 Hi there! I'm MarketingAssist, your AI marketing assistant. How can I help you today?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fallback-message">Fallback Message</Label>
                <Input
                  id="fallback-message"
                  defaultValue="I'm not sure I understand. Could you rephrase your question?"
                />
                <p className="text-xs text-muted-foreground">Message shown when the AI doesn't understand a query.</p>
              </div>

              <div className="space-y-2">
                <Label>Chat Widget Position</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="bottom-right" name="position" defaultChecked />
                    <Label htmlFor="bottom-right">Bottom Right</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="bottom-left" name="position" />
                    <Label htmlFor="bottom-left">Bottom Left</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-show">Auto-show Chat Widget</Label>
                    <p className="text-sm text-muted-foreground">Automatically open chat after 30 seconds on page.</p>
                  </div>
                  <Switch id="auto-show" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="save-history">Save Chat History</Label>
                    <p className="text-sm text-muted-foreground">Store chat conversations for future reference.</p>
                  </div>
                  <Switch id="save-history" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                Save Chatbot Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage API keys for AI service providers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <div className="flex">
                  <Input
                    id="openai-key"
                    type="password"
                    defaultValue="sk-••••••••••••••••••••••••••••••"
                    className="rounded-r-none"
                  />
                  <Button variant="outline" className="rounded-l-none">
                    Show
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Used for GPT models and embeddings.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="anthropic-key">Anthropic API Key</Label>
                <div className="flex">
                  <Input
                    id="anthropic-key"
                    type="password"
                    defaultValue="sk-ant-••••••••••••••••••••••••••••••"
                    className="rounded-r-none"
                  />
                  <Button variant="outline" className="rounded-l-none">
                    Show
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Used for Claude models.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pinecone-key">Pinecone API Key</Label>
                <div className="flex">
                  <Input
                    id="pinecone-key"
                    type="password"
                    defaultValue=""
                    placeholder="Enter Pinecone API key"
                    className="rounded-r-none"
                  />
                  <Button variant="outline" className="rounded-l-none">
                    Show
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Used for vector database and embeddings storage.</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="rate-limiting">Enable Rate Limiting</Label>
                    <p className="text-sm text-muted-foreground">Limit API calls to prevent excessive usage.</p>
                  </div>
                  <Switch id="rate-limiting" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly-budget">Monthly API Budget</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                    $
                  </span>
                  <Input id="monthly-budget" type="number" className="rounded-l-none" defaultValue="100" />
                </div>
                <p className="text-xs text-muted-foreground">Maximum monthly spending on AI API calls.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                Save API Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

