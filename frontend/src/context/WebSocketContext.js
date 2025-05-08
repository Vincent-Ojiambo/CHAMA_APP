import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = io('http://localhost:5000');
    
    ws.on('connect', () => {
      console.log('WebSocket connected');
    });

    ws.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    setSocket(ws);

    return () => {
      if (ws) {
        ws.disconnect();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const socket = React.useContext(WebSocketContext);
  if (!socket) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return socket;
};
