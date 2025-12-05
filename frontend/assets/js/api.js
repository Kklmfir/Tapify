const BASE_URL = "http://localhost:3000/api";

async function fetchCommands() {
    const res = await fetch(`${BASE_URL}/commands`);
    return res.json();
}

async function runCommand(id) {
    const res = await fetch(`${BASE_URL}/commands/run/${id}`);
    return res.json();
}

async function createCommand(data) {
    await fetch(`${BASE_URL}/commands`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}
