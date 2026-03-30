import { Badge } from "@/components/ui/badge"
import { Code, Layers, Zap } from "lucide-react"
import FeatureCard from "@/components/FeatureCard"

const Welcome = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] bg-gradient-to-b  flex flex-col items-center justify-center">
      <main className="max-w-4xl w-full space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to Your <span className="text-blue-600">React Starter Kit</span>
        </h1>

        <p className="text-xl text-center text-gray-600 max-w-2xl mx-auto">
          Jumpstart your development with this flexible starter kit.
          Built with Vite, React, Tailwind CSS, and shadcn/ui.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-yellow-500" />}
            title="Lightning Fast"
            description="Optimized for speed and performance right out of the box."
          />
          <FeatureCard
            icon={<Layers className="h-6 w-6 text-green-500" />}
            title="Modular Architecture"
            description="Built with SOLID principles for maintainable and scalable code."
          />
          <FeatureCard
            icon={<Code className="h-6 w-6 text-purple-500" />}
            title="Developer Friendly"
            description="Intuitive setup with comprehensive documentation and examples."
          />
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
          <Badge variant="secondary">shadcn/ui</Badge>
          <Badge variant="secondary">TypeScript</Badge>
        </div>
      </main>

      <footer className="mt-16 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} App Solve. Free and open source code.</p>
      </footer>
    </div>
  )
}

export default Welcome
