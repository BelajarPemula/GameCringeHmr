let score = 0;

// Fungsi register
function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const errorDiv = document.getElementById("register-error");

    errorDiv.innerText = ""; // Reset pesan kesalahan

    if (!username || !password) {
        errorDiv.innerText = "Username dan Password tidak boleh kosong!";
        return;
    }

    if (localStorage.getItem(username)) {
        errorDiv.innerText = "Username sudah terdaftar! Silakan gunakan username lain.";
        return;
    }

    localStorage.setItem(username, JSON.stringify({ password: password, score: 0 }));
    alert("Registrasi berhasil! Silakan login.");
}

// Fungsi login
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const errorDiv = document.getElementById("login-error");

    errorDiv.innerText = ""; // Reset pesan kesalahan

    const user = JSON.parse(localStorage.getItem(username));

    if (!user || user.password !== password) {
        errorDiv.innerText = "Username atau password salah!";
        return;
    }

    alert("Login berhasil!");
    document.getElementById("auth").style.display = "none";
    document.getElementById("game").style.display = "block";

    score = user.score || 0;
    document.getElementById("score").innerText = score;

    localStorage.setItem("currentUser", username);
    moveCoin();
}


// Fungsi menangkap koin
function catchCoin() {
    score += 10;
    document.getElementById("score").innerText = score;

    const currentUser = localStorage.getItem("currentUser");
    const user = JSON.parse(localStorage.getItem(currentUser));
    user.score = score;

    localStorage.setItem(currentUser, JSON.stringify(user));

    moveCoin();
}

// Fungsi memindahkan koin secara acak
function moveCoin() {
    const coin = document.getElementById("coin");
    const game = document.getElementById("game");

    const maxX = game.clientWidth - coin.clientWidth;
    const maxY = game.clientHeight - coin.clientHeight;

    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    coin.style.left = `${x}px`;
    coin.style.top = `${y}px`;
}

// Fungsi logout
function logout() {
    localStorage.removeItem("currentUser");
    document.getElementById("auth").style.display = "block";
    document.getElementById("game").style.display = "none";
}

// Mendapatkan elemen overlay
const chatOverlay = document.getElementById("chat-overlay");

let isDragging = false;
let offsetX, offsetY;

// Mulai drag saat mouse ditekan
chatOverlay.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - chatOverlay.getBoundingClientRect().left;
    offsetY = e.clientY - chatOverlay.getBoundingClientRect().top;
    document.body.style.userSelect = "none"; // Mencegah teks dipilih saat dragging
});

// Drag overlay saat mouse bergerak
document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        chatOverlay.style.left = `${e.clientX - offsetX}px`;
        chatOverlay.style.top = `${e.clientY - offsetY}px`;
    }
});

// Hentikan drag saat mouse dilepas
document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "auto";
});


// Chat functionality
function sendMessage() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();

    if (message === "") return;

    // Tampilkan pesan di chat
    displayMessage("You", message);
    input.value = "";
    
const chatOverlay = document.getElementById("chat-overlay");

let isDragging = false;
let offsetX, offsetY;

// Fungsi untuk mulai dragging
chatOverlay.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - chatOverlay.getBoundingClientRect().left;
    offsetY = e.clientY - chatOverlay.getBoundingClientRect().top;
    document.body.style.userSelect = "none"; // Mencegah teks dipilih saat dragging
});

// Fungsi untuk menggerakkan overlay saat mouse bergerak
document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        chatOverlay.style.left = `${e.clientX - offsetX}px`;
        chatOverlay.style.top = `${e.clientY - offsetY}px`;
    }
});

// Fungsi untuk menghentikan dragging saat mouse dilepas
document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "auto";
});


// Memanggil fungsi ini untuk menyembunyikan overlay saat pertama kali dimuat
window.onload = function() {
    document.getElementById("chat-overlay").style.display = "none"; // Sembunyikan overlay pada awal
};


    // (Opsional) Simulasi balasan bot
    setTimeout(() => {
        displayMessage("Bot", "Terimakasih kak sudah ingin bermain game buatan aku walau cuman bikin ngebosenin hehe");
    }, 1000);
}

function displayMessage(sender, message) {
    const chatMessages = document.getElementById("chat-messages");
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    
    // Scroll ke bawah setiap kali ada pesan baru
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

