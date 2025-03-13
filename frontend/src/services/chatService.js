const BASE_URL = 'http://localhost:8080/api';

// Chat service
export const chatService = {
    chat: async (questionData) => {
        const response = await fetch(`${BASE_URL}/chat/ask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionData),
        })
        return response;
    },
};
