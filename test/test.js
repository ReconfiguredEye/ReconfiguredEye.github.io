const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'WHATAREYOUDOINGHERE'.split('');
const letterObjects = letters.map((letter) => ({
    text: letter,
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
    fontSize: 150 + Math.random() * 20,
    gradient: createGradient()
}));

function createGradient() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#000000'); // dark color
    gradient.addColorStop(1, '#ffffff'); // light color
    return gradient;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    letterObjects.forEach((letter) => {
        ctx.font = `${letter.fontSize}px Arial`;
        ctx.fillStyle = letter.gradient;
        ctx.globalAlpha = 0.7; // adds transparency for a layered look
        ctx.fillText(letter.text, letter.x, letter.y);

        // Update position
        letter.x += letter.dx;
        letter.y += letter.dy;

        // Bounce off walls
        if (letter.x < 0 || letter.x > canvas.width - letter.fontSize) letter.dx *= -1;
        if (letter.y < letter.fontSize || letter.y > canvas.height) letter.dy *= -1;
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
