'use client'

import { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, ArrowRight, TrendingUp, Zap, Car } from 'lucide-react'

export default function SkateRoutePlanner() {
  const [difficulty, setDifficulty] = useState(50)
  const [routeData, setRouteData] = useState(null)

  const handleSliderChange = (value: number[]) => {
    setDifficulty(value[0])
  }

  const generateRoute = async () => {
    try {
      const response = await fetch(`http://localhost:8000/route?difficulty=${difficulty}`)
      if (response.ok) {
        const data = await response.json()
        setRouteData(data)
      } else {
        console.error("Failed to fetch route data")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800">Skate Route Planner</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Plan Your Skate Adventure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button className="w-full text-lg" variant="outline">
              <MapPin className="mr-2 h-5 w-5" />
              Today's Route
            </Button>

            <div className="space-y-2">
              <label htmlFor="difficulty" className="text-sm font-medium">
                Difficulty: {difficulty}%
              </label>
              <Slider
                id="difficulty"
                min={0}
                max={100}
                step={1}
                value={[difficulty]}
                onValueChange={handleSliderChange}
              />
            </div>

            <Button className="w-full text-lg" onClick={generateRoute}>
              Go
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>

        {routeData && (
          <Card className="w-full max-w-md mx-auto mt-8">
            <CardHeader>
              <CardTitle>Your Skate Route</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-blue-500" />
                <span>Distance: {routeData.distance} miles</span>
              </div>
              <div className="flex items-center">
                <ArrowRight className="mr-2 h-5 w-5 text-green-500" />
                <span>Terrain: {routeData.terrain}</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-orange-500" />
                <span>Elevation Gain: {routeData.elevation_gain} ft</span>
              </div>
              <div className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                <span>Max Potential Speed: {routeData.max_speed} mph</span>
              </div>
              <div className="flex items-center">
                <Car className="mr-2 h-5 w-5 text-red-500" />
                <span>Traffic: {routeData.traffic}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="bg-white shadow-md py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2024 Skate Route Planner. Roll safely!
        </div>
      </footer>
    </div>
  )
}
