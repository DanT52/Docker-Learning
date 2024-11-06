from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import random
from random import randint, choice
import os

app = FastAPI()


# Configure CORS
allowed_origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,  # Use the environment variable
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/route")
async def get_route(difficulty: int = Query(50, ge=0, le=100)):
    # Generate route data based on difficulty

    # Calculate distance based on difficulty with non-linear scaling and random variation
    base_distance = 1  # base distance in miles
    max_distance = 100  # max distance in miles
    distance_variation = random.uniform(-5, 5)
    distance = base_distance + ((difficulty / 100) ** 2) * (max_distance - base_distance) + distance_variation
    distance = round(max(distance, 0.1), 1)  # Ensure distance is at least 0.1 miles

    # Calculate elevation gain with exponential scaling and random variation
    base_elevation = 0  # base elevation gain in feet
    max_elevation = 5000  # max elevation gain in feet
    elevation_variation = random.randint(-100, 100)
    elevation_gain = base_elevation + ((difficulty / 100) ** 2) * (max_elevation - base_elevation) + elevation_variation
    elevation_gain = int(max(elevation_gain, 0))  # Ensure elevation gain is at least 0

    # Calculate max_speed with specific conditions based on difficulty
    if difficulty <= 10:
        max_speed = random.uniform(4, 8)  # Max speed less than 8 mph
    elif difficulty < 100:
        # Linear scaling between 8 and 25 mph with random variation
        max_speed = 8 + ((difficulty - 10) / 89) * (25 - 8) + random.uniform(-2, 2)
    else:  # difficulty == 100
        max_speed = random.uniform(25, 50)  # For maximum difficulty, very high speeds

    max_speed = round(max(max_speed, 1), 1)  # Ensure max_speed is at least 1 mph

    # Determine traffic conditions based on difficulty
    if difficulty <= 10:
        traffic_options = ["Light", "Very Light", "Almost None"]
    elif difficulty <= 50:
        traffic_options = ["Moderate", "Light"]
    elif difficulty < 100:
        traffic_options = ["Heavy", "Moderate", "Unpredictable"]
    else:  # difficulty == 100
        traffic_options = ["Non-existent", "Alien spacecraft", "Dinosaurs", "Time travelers"]

    traffic = random.choice(traffic_options)

    # Determine terrain and locations with creative and outrageous options for high difficulties
    if difficulty <= 10:
        terrain_options = [
            "Flat park paths in Central Park",
            "Smooth urban streets in a quiet suburb",
            "Coastal boardwalks along a peaceful beach",
            "Easy trails around a calm lake"
        ]
    elif difficulty <= 50:
        terrain_options = [
            "Hilly park trails in the countryside",
            "Mixed urban and park paths in a bustling city",
            "Rural roads with some hills in a small town",
            "Forest trails with moderate elevation"
        ]
    elif difficulty < 100:
        terrain_options = [
            "Mountain trails with steep inclines",
            "Rocky terrains in a remote wilderness",
            "Steep hills in a hilly region",
            "Off-road paths through dense forests",
            "Desert dunes with challenging terrain"
        ]
    else:  # difficulty == 100
        terrain_options = [
            "Climbing active volcano slopes",
            "Navigating moon surface craters",
            "Underwater tunnels guarded by mermaids",
            "Interdimensional portals with shifting landscapes",
            "Quantum realms beyond human comprehension",
            "A racetrack around the rings of Saturn",
            "Chasing a tornado in Tornado Alley",
            "A path through the core of the Earth",
            "Scaling the heights of Mount Olympus"
        ]

    terrain = random.choice(terrain_options)

    # Return the route data
    return {
        "distance": distance,
        "terrain": terrain,
        "elevation_gain": elevation_gain,
        "max_speed": max_speed,
        "traffic": traffic
    }