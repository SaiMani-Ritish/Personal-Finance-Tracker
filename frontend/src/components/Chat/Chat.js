import * as React from 'react';
import ReactMarkdown from "react-markdown";
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { chatService } from '../../services/chatService';

// Chat component
const Chat = () => {
    const [inputText, setInputText] = React.useState('');
    const [result, setResult] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleTextChange = (e) => {
        setInputText(e.target.value);
    };

    // Handle chat submission and stream the response
    const handleSubmit = async () => {
        if (inputText.trim()) {
            setIsLoading(true);
            setResult(''); // Clear previous result

            try {
                const response = await chatService.chat({ question: inputText });

                const reader = response.body.getReader();
                const decoder = new TextDecoder();

                let done = false;
                let accumulatedResult = '';

                while (!done) {
                    const { value, done: readerDone } = await reader.read();
                    done = readerDone;

                    if (value) {
                        const chunk = decoder.decode(value, { stream: true });
                        const lines = chunk.split('\n');

                        // eslint-disable-next-line
                        lines.forEach((line) => {
                            if (line.startsWith('data:')) {
                                const data = line.replace('data: ', '').trim();

                                // Check for the end of the stream
                                if (data === '[DONE]') {
                                    setIsLoading(false);
                                    return;
                                }

                                try {
                                    // Parse JSON if it's not "[DONE]"
                                    const parsedData = JSON.parse(data);
                                    if (parsedData.response) {
                                        accumulatedResult += parsedData.response;
                                        setResult(accumulatedResult);
                                    }
                                } catch (err) {
                                    console.error('Error parsing JSON chunk:', err);
                                }
                            }
                        });
                    }
                }

                setIsLoading(false);
            } catch (error) {
                console.error('Error during streaming:', error);
                setIsLoading(false);
                setResult('An error occurred. Please try again.');
            }
        }
    };
    // Render the chat interface
    return (
        <Box className="chat-container" sx={{ width: '100%', height: '100%', padding: 10 }}>
            <TextField
                id="chat-input"
                label="Type a message"
                value={inputText}
                onChange={handleTextChange}
                sx={{ width: '100%', marginBottom: 2 }}
                disabled={isLoading}
            />
            <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>Send</Button>
            <Typography variant="body1" component="div" sx={{ marginTop: 2}}>
                <h3 sx={{ marginBottom: 2 }}>Response: {isLoading ? (
                    <CircularProgress size={15} sx = {{ marginLeft: 1 }}/>
                ) : ''} </h3>
                <ReactMarkdown>{result}</ReactMarkdown>
            </Typography>
        </Box>
    );
};

export default Chat;