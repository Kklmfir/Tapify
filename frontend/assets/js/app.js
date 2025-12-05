async function loadCommands() {
    const commands = await fetchCommands();
    
    const list = document.getElementById("commands-list");
    list.innerHTML = "";

    commands.forEach(cmd => {
        const btn = document.createElement("button");
        btn.textContent = cmd.name;
        btn.onclick = () => {
            runCommand(cmd.id);
            alert("Perintah dijalankan: " + cmd.name);
        };
        list.appendChild(btn);
    });
}

async function addCustomCommand() {
    const name = document.getElementById("cmd-name").value;
    const type = document.getElementById("cmd-type").value;

    await createCommand({
        name,
        actionType: type,
        payload: {}
    });

    loadCommands();
}

window.onload = () => loadCommands();
