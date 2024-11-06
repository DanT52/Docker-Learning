from fastapi import FastAPI, Query
from random import randint, choice

app = FastAPI()

@app.get("/route")
async def get_route(difficulty: int = Query(50, ge=0, le=100)):
    # Generate route data based on difficulty
    distance = round(2 + difficulty * 0.1, 1)  # miles
    elevation_gain = randint(50, 200) if difficulty > 50 else randint(10, 50)
    max_speed = randint(10, 20) + int(difficulty * 0.1)
    traffic = choice(["Light", "Moderate", "Heavy"])
    terrain = choice(["Mixed urban and park paths", "Park trails", "Urban streets"])

    return {
        "distance": distance,
        "terrain": terrain,
        "elevation_gain": elevation_gain,
        "max_speed": max_speed,
        "traffic": traffic
    }
