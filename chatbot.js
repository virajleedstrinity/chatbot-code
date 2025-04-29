document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const chatBox = document.getElementById('chat-box');
  const languageSelect = document.getElementById('language-select');
  const userInput = document.getElementById('user-input');

  // Handles sending user messages and displaying responses
  function sendMessage() {
    const message = userInput.value; // Get the user's input
    if (message.trim() !== "") { // Check if input is not empty
      appendMessage('You', message); // Display user's message
      userInput.value = ''; // Clear input field

      const selectedLanguage = languageSelect.value; // Get selected language
      const response = getResponseInLanguage(selectedLanguage, message); // Get bot's response
      appendMessage('Bot', response); // Display bot's response
    }
  }

  // Appends a message to the chat box
  function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    messageElement.className = sender === 'You' ? 'user-message' : 'bot-message';
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the newest message
  }

  // Returns appropriate responses for user questions based on the selected language
  function getResponseInLanguage(language, userMessage) {
    // Legal guidance responses
    const legalResponses = {
      en: {
        "what is legal aid": "Legal aid helps people who can't afford legal representation. Learn more at https://www.gov.uk/legal-aid.",
        "how do i apply for legal aid": "You can apply for legal aid through your local legal office or online at https://www.gov.uk/apply-for-legal-aid.",
        "what are tenants' rights": "Tenants have the right to a safe living environment and protection against unfair eviction. Visit https://england.shelter.org.uk."
      },
      es: {
        "qué es la asistencia legal": "La asistencia legal ayuda a quienes no pueden pagar representación legal. Más información en https://www.gov.uk/legal-aid.",
        "cómo solicito asistencia legal": "Puedes solicitarla en tu oficina legal local o en https://www.gov.uk/apply-for-legal-aid.",
        "cuáles son los derechos de los inquilinos": "Los inquilinos tienen derecho a un entorno seguro y una protección contra el desalojo injusto. Visite https://spain.shelter.org.uk."
      },
      fr: {
        "qu'est-ce que l'aide juridique": "L'aide juridique aide ceux qui ne peuvent pas se permettre une représentation. Plus d'infos sur https://www.gov.uk/legal-aid.",
        "comment puis-je demander une aide juridique": "Vous pouvez demander une aide juridique en contactant votre bureau local ou en ligne sur https://www.gov.uk/apply-for-legal-aid.",
        "quels sont les droits des locataires": "Les locataires ont le droit à un environnement sûr et à une protection contre les expulsions abusives. Visitez https://france.shelter.org.uk."
      }
    };

    const defaultResponses = {
      en: "Hello! How can I assist you?",
      es: "¡Hola! ¿Cómo puedo ayudarte?",
      fr: "Bonjour ! Comment puis-je vous aider?"
    };

    // Normalize the user's input
    userMessage = userMessage.toLowerCase().trim();

    // Debugging logs
    console.log("Selected Language:", language);
    console.log("User Input:", userMessage);

    // Check for matching responses in the selected language
    const responses = legalResponses[language] || legalResponses['en']; // Fallback to English if language not supported
    const response = responses[userMessage] || defaultResponses[language];
    
    console.log("Response Found:", response); // Debug log
    return response; // Return matched or default response
  }

  // Attach event listener to the Send button
  const sendButton = document.querySelector('button');
  sendButton.addEventListener('click', sendMessage);
});
