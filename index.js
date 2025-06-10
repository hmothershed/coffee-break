const images = [
    './assets/image-content/cup-1.png',
    './assets/image-content/cup-2.png',
    './assets/image-content/cup-3.png',
    './assets/image-content/cup-4.png',
    './assets/image-content/cup-5.png',
    './assets/image-content/cup-6.png',
    './assets/image-content/cup-7.png'
];

const imageContent = document.querySelector('.image-content'); // image container
const mainButton = document.getElementById('main-button'); // image switch button
const finalMessage = document.querySelector('.final-message'); // final message 
const restartButton = document.getElementById('restart-button'); // restart button
const shrinkIcon = document.getElementById('shrink-icon');
const closeIcon = document.getElementById('close-icon');
const container = document.querySelector('.container');
const openButton = document.getElementById('open-button');


closeIcon.addEventListener('click', () => {
    container.style.display = 'none';
    openButton.style.display = 'inline-block';
});
shrinkIcon.addEventListener('click', () => {
    container.classList.toggle('shrunk');
    const isShrunk = container.classList.contains('shrunk');
    shrinkIcon.title = isShrunk ? 'Expand' : 'Shrink';
});
openButton.addEventListener('click', () => {
    container.style.display = 'block';
    openButton.style.display = 'none';
});


let currentIndex = 0;
let holdInterval;

function updateImage() {
    imageContent.style.opacity = 0;
    const img = new Image();
    img.src = images[currentIndex];
    img.onload = () => {
        imageContent.style.backgroundImage = `url('${images[currentIndex]}')`;
        imageContent.style.opacity = 1;
    };
}

updateImage();


function startFilling() {
    if (currentIndex >= images.length - 1) return;

    holdInterval = setInterval(() => {
        if(currentIndex < images.length - 1){
            currentIndex++;
            updateImage();
        }

        if (currentIndex === images.length - 1) {
            clearInterval(holdInterval);
            mainButton.style.display = 'none';
            finalMessage.style.display = 'block';
            document.getElementById('restart-button').style.display = 'inline-block'; // Show restart
        }
    }, 500);   // image changes every 0.5s while holding the button
}

function stopFilling() {
    clearInterval(holdInterval);
}

function restartAnimation() {
    currentIndex = 0;
    updateImage();
    mainButton.style.display = 'inline-block';
    finalMessage.style.display = 'none';
    restartButton.style.display = 'none';
}

restartButton.addEventListener('click', restartAnimation);
mainButton.addEventListener('mousedown', startFilling);
mainButton.addEventListener('mouseup', stopFilling);
mainButton.addEventListener('mouseleave', stopFilling);     // prevent stuck hold
mainButton.addEventListener('touchstart', startFilling);
mainButton.addEventListener('touchend', stopFilling);
