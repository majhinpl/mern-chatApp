const socket = io();

const clientsTotal = document.getElementById("client-total");

const msgContainer = document.getElementById("message-container");

const nameInput = document.getElementById("name-input");

const msgForm = document.getElementById("message-form");

const msgInput = document.getElementById("message-input");

msgForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMsg();
});

socket.on("clients-total", (data) => {
  clientsTotal.innerText = `Total Clients: ${data}`;
});

function sendMsg() {
  console.log(msgInput.value);

  const data = {
    name: nameInput.value,
    message: msgInput.value,
    dateTime: new Date(),
  };
}
