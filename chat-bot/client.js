const status = document.getElementById("status");
const message = document.getElementById("message");
const history = document.getElementById("history");
const sendBtn = document.getElementById("sendBtn");

const ws = new WebSocket('ws://localhost:3000');

function printMessage(text) {
    const li = document.createElement("li");

    li.innerHTML = text.data;
    history.appendChild(li);
    history.scrollTop = history.scrollHeight;
}

ws.onopen = () => {
    status.style.color = "#2FC264";
    status.innerHTML = "ONLINE";

};

ws.onclose = () => {
    status.style.color = "red";
    status.innerHTML = "DISCONNECTED";
};

ws.onmessage = response => {
    printMessage(response);
};

sendBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const li = document.createElement("li");

    li.style.textAlign = "right";
    li.style.color = "#2FC264";
    li.innerHTML = message.value;
    history.appendChild(li);

    ws.send(message.value);
    message.value = null;
    history.scrollTop = history.scrollHeight;
});