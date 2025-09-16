document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.getElementById("chat-message");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const typingIndicator = document.getElementById("typing");

    const botResponse = {
        hello: "Hello! How can I assist you today?",
        "how are you": "I'm doing fine, thank you for asking.",
        "what can you do": "I can chat with you and answer your questions.",
        "your name": "My name is Se3Do)-, I'm a chatbot.",
        hi: "Hi, how can I help you!",
        bye: "Goodbye! Have a great day!",
        default: "Sorry, I don't understand that. Please try something else."
    };

    // Function to format time
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.classList.add(isUser ? "user-message" : "bot-message");

        if (!isUser) {
            const avatar = document.createElement("img");
            avatar.src = "Chatbot.jpg"; 
            avatar.alt = "Bot Avatar";
            avatar.classList.add("avatar");
            messageDiv.appendChild(avatar);
        }

        const messageText = document.createElement("p");
        messageText.textContent = message;
        messageDiv.appendChild(messageText);

        // Add timestamp
        const timeSpan = document.createElement("span");
        timeSpan.classList.add("timestamp");
        timeSpan.textContent = getCurrentTime();
        messageDiv.appendChild(timeSpan);

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // auto-scroll
    }

    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        for (const [key, value] of Object.entries(botResponse)) {
            if (lowerCaseMessage.includes(key)) {
                return value;
            }
        }
        return botResponse.default;
    }

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, true);
            userInput.value = "";

            // Show typing indicator
            typingIndicator.style.display = "block";

            setTimeout(() => {
                typingIndicator.style.display = "none";
                const botMessage = getBotResponse(userMessage);
                addMessage(botMessage, false);
            }, 1000);
        }
    }

    sendBtn.addEventListener("click", sendMessage);

    userInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
