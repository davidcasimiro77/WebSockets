const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;
const server = new WebSocket.Server({ port: PORT }, () => {
    console.log(`Server started on port ${PORT}`);
});

const usersToSend = [];
const users = [];
const helps = [];

function sendMessage(message) {
    usersToSend.forEach((user) => {
        user.ws.send(JSON.stringify(message));
    });
}

// function sendMessageToRingTheBell(message) {
//     usersToSend.forEach((user) => {
//         if (user.username == message.helped) {
//             user.ws.send(JSON.stringify(message));
//             return;
//         }

//     });
// }

server.on('connection', (ws, incoming_request) => {
    const u = { username: incoming_request.url.split("=")[1] };
    ws.username = u.username
    const userRef = { ws };
    usersToSend.push(userRef);
    users.push(u);
    console.log("create")
    console.log(users)

    sendMessage({
        users,
        helps
    });

    ws.on('message', (message) => {
        console.log(message);
        try {
            const data = JSON.parse(message);

            // Checking if the message is a valid one
            if (typeof data.type !== 'string') {
                console.error('Invalid message');
                return;
            }

            switch (data.type) {
                case "ask for help":
                    helps.push({
                        helper: data.helper,
                        helped: data.helped,
                        timestamp: data.timestamp
                    });
                    break;
                case "next please":
                    for (let i = 0; i < helps.length; i++) {
                        if (helps[i].helper == data.helper && helps[i].helped == data.helped) {
                            helps.splice(i, 1);
                            break;
                        }
                    }
                    break;
                // case "ringing the bell":
                //     sendMessageToRingTheBell({
                //         helper: data.helper,
                //         helped: data.helped,
                //         type: "ringing the bell"
                //     });
                //     return;
            }

            sendMessage({
                users,
                helps
            });
        } catch (e) {
            console.error('Error passing message!', e)
        }
    });

    ws.on('close', (code, reason) => {
        for (let i = 0; i < users.length; i++) {
            console.log(users[i]);
            if (users[i].username === ws.username) {
                users.splice(i, 1);
                usersToSend.splice(i, 1);
                break;
            }
        }
        console.log("final")
        console.log(users);
    });
});