document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.getElementById('text');
    const messages = ["So you want to know more..", "Okay the..", "Hmm.. where to begin?"];
    let messageIndex = 0;

    function displayNextMessage() {
        textElement.textContent = messages[messageIndex];
        messageIndex = (messageIndex + 1) % messages.length;
    }

    setInterval(displayNextMessage, 4000); // Change text every 3 seconds
    displayNextMessage(); // Initial call to display the first message
});
