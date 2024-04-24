document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('squareCanvas');
    const ctx = canvas.getContext('2d');
    let startX, startY, endX, endY;
    let highScore = localStorage.getItem('highScore') || 0;

    function drawSquare(startX, startY, endX, endY) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const size = Math.min(Math.abs(endX - startX), Math.abs(endY - startY));
        ctx.beginPath();
        ctx.rect(startX, startY, Math.sign(endX - startX) * size, Math.sign(endY - startY) * size);
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    function calculatePerfectness() {
        const size = Math.min(Math.abs(endX - startX), Math.abs(endY - startY));
        let perfectness = Math.round((size / 200) * 100); // Normalize size to a percentage (0-100)
        // Adjust perfectness score to be maximum 199 with a very rare chance of being 200
        perfectness = Math.min(perfectness, 199);
        if (perfectness === 199 && Math.random() < 0.00001) { // 1 in 100000 chance for perfectness to be 200
            perfectness = 200;
        }
        return perfectness;
    }

    function displayPerfectness() {
        const perfectness = calculatePerfectness();
        document.getElementById('perfectnessScore').innerText = `Perfectness: ${perfectness}%`;
        if (perfectness > highScore) {
            highScore = perfectness;
            localStorage.setItem('highScore', highScore);
            document.getElementById('highScore').innerText = `Highscore: ${highScore}%`;
        }
    }

    canvas.addEventListener('mousedown', function (e) {
        startX = e.offsetX;
        startY = e.offsetY;
    });

    canvas.addEventListener('mouseup', function (e) {
        endX = e.offsetX;
        endY = e.offsetY;
        drawSquare(startX, startY, endX, endY);
        displayPerfectness();
    });

    canvas.addEventListener('mousemove', function (e) {
        if (e.buttons !== 1) return; // Exit if mouse button is not pressed
        endX = e.offsetX;
        endY = e.offsetY;
        drawSquare(startX, startY, endX, endY);
    });

    // Initialize highscore display
    document.getElementById('highScore').innerText = `Highscore: ${highScore}%`;
});
