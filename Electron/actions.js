const electron = require("electron");
const { ipcRenderer } = electron;

/* DOM variables */
var btn = document.getElementById("send");
var tf = document.querySelector("input");
var nome = document.getElementById("name");
var age = document.getElementById("age");
var number = document.getElementById("number");
var btAccept = document.getElementById("accept");
var btDecline = document.getElementById("decline");

btn.addEventListener("click", event => {
    ipcRenderer.send("socket:send", tf.value);
    tf.value = "";
    tf.focus();
});

btAccept.addEventListener("click", event => {
    ipcRenderer.send("socket:accept");
});

btDecline.addEventListener("click", event => {
    ipcRenderer.send("socket:decline");
});

ipcRenderer.on("received:data", (event, data) => {
    var dataArray = data.split(":");

    if (dataArray[0] === undefined || dataArray[0].trim() === "")
        nome.innerHTML = "";
    else nome.innerHTML = "Name: " + dataArray[0];

    if (dataArray[1] === undefined || dataArray[1].trim() === "")
        age.innerHTML = "";
    else age.innerHTML = "Age: " + dataArray[1];

    if (dataArray[2] === undefined || dataArray[2].trim() === "")
        number.innerHTML = "";
    else number.innerHTML = "Number: " + dataArray[2];
});