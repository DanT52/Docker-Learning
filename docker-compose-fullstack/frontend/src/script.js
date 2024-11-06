document.getElementById('go-button').addEventListener('click', async function(event) {
    event.preventDefault();
    const difficulty = document.getElementById('difficulty-slider').value;
    const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/route?difficulty=${difficulty}`);
    const data = await response.json();

    document.getElementById('route-info').classList.remove('hidden');
    document.getElementById('distance').textContent = `Distance: ${data.distance} miles`;
    document.getElementById('terrain').textContent = `Terrain: ${data.terrain}`;
    document.getElementById('elevation_gain').textContent = `Elevation Gain: ${data.elevation_gain} ft`;
    document.getElementById('max_speed').textContent = `Max Potential Speed: ${data.max_speed} mph`;
    document.getElementById('traffic').textContent = `Traffic: ${data.traffic}`;
});

document.getElementById('difficulty-slider').addEventListener('input', function() {
    document.getElementById('slider-label').textContent = `Difficulty: ${this.value}%`;
});