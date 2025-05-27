import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate newsletter subscription
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: "Thank you for subscribing!",
      description: "You'll be the first to know about new arrivals and exclusive collections.",
    })
    
    setEmail("")
    setIsLoading(false)
  }

  return (
    <section className="py-20 bg-foreground">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h3 className="text-3xl lg:text-4xl font-light text-background mb-6">Stay Updated</h3>
        <p className="text-background/80 font-light mb-8 max-w-2xl mx-auto">
          Be the first to know about new arrivals and exclusive collections
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input 
            type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-background/10 border-background/20 text-background placeholder-background/60 focus:border-background/40"
            required
          />
          <Button 
            type="submit"
            disabled={isLoading}
            className="bg-background text-foreground hover:bg-background/90 font-light"
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  )
}
