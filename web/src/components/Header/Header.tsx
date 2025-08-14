"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "../../../components/ui/button"
import { Moon, Sun } from "lucide-react"

function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <header className="relative px-4 py-6 md:px-8 md:py-8">
        <div className="flex flex-col items-center space-y-2 md:space-y-3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-accent via-chart-2 to-chart-3 bg-clip-text text-transparent text-center">
            AI Heroes
          </h1>
          <p className="text-sm md:text-base text-muted-foreground text-center max-w-md">
            Advanced AI-powered character battle analysis and insights
          </p>
        </div>
        <div className="absolute top-4 right-4 md:top-6 md:right-8">
          <Button variant="outline" size="sm" className="flex items-center gap-2 text-xs md:text-sm bg-transparent">
            <Moon className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Theme</span>
          </Button>
        </div>
      </header>
    )
  }

  return (
    <header className="relative px-4 py-6 md:px-8 md:py-8">
      <div className="flex flex-col items-center space-y-2 md:space-y-3">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-accent via-chart-2 to-chart-3 bg-clip-text text-transparent text-center">
          AI Heroes
        </h1>
        <p className="text-sm md:text-base text-muted-foreground text-center max-w-md">
          Advanced AI-powered character battle analysis and insights
        </p>
      </div>

      <div className="absolute top-4 right-4 md:top-6 md:right-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="flex items-center gap-2 text-xs md:text-sm"
        >
          {theme === "light" ? (
            <>
              <Moon className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Dark</span>
            </>
          ) : (
            <>
              <Sun className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Light</span>
            </>
          )}
        </Button>
      </div>
    </header>
  )
}

export default Header
