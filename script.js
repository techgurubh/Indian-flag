const canvas = document.getElementById('flagCanvas');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('hoist-btn');
const container = document.getElementById('flag-container');
const foldedView = document.getElementById('folded-view');

let time = 0;
const width = 180;
const height = 120;
const segments = 60; 

function drawFlag() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const segmentWidth = width / segments;
    let chakraX = 0, chakraY = 0, chakraRadius = 0;

    for (let i = 0; i < segments; i++) {
        const x = i * segmentWidth;
        // anchorFactor makes the flag move more at the end and stay still at the pole
        const anchorFactor = Math.pow(i / segments, 1.3);
        const wave = Math.sin(i * 0.15 - time * 0.15) * 10 * anchorFactor;
        
        const drawY = 140 + wave;

        // Draw Saffron, White, and Green strips
        ctx.fillStyle = "#FF9933";
        ctx.fillRect(x, drawY, segmentWidth + 1, height / 3);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(x, drawY + height / 3, segmentWidth + 1, height / 3);
        ctx.fillStyle = "#128807";
        ctx.fillRect(x, drawY + (2 * height) / 3, segmentWidth + 1, height / 3);
        
        // Add shading for realism
        ctx.fillStyle = `rgba(0,0,0,${Math.sin(i * 0.15 - time * 0.15) * 0.05})`;
        ctx.fillRect(x, drawY, segmentWidth + 1, height);

        // Store coordinates for the Chakra
        if (i === Math.floor(segments / 2)) {
            chakraX = x;
            chakraY = drawY + height / 2;
            chakraRadius = height / 7.5; 
        }
    }

    if (chakraX > 0) drawChakra(chakraX, chakraY, chakraRadius);
    time += 0.8;
    requestAnimationFrame(drawFlag);
}

function drawChakra(x, y, radius) {
    ctx.save();
    ctx.strokeStyle = "#000080";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw 24 spokes
    ctx.lineWidth = 0.7;
    for (let i = 0; i < 24; i++) {
        const angle = (i * 15) * (Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
        ctx.stroke();
    }
    ctx.restore();
}

btn.addEventListener('click', () => {
    btn.disabled = true;
    btn.innerText = "HOISTING...";
    
    // Move the container up the pole
    container.style.bottom = "370px";

    setTimeout(() => {
        foldedView.style.display = "none";
        canvas.style.display = "block";
        btn.innerText = "JAI HIND";
        drawFlag();
    }, 4000);
});

