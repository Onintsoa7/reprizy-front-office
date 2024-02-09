import React, { createContext, useState, useContext } from 'react';

// Create a context for the active conversation
const ActiveConversationContext = createContext();

// Create a provider component for the context
const ActiveConversationProvider = ({ children }) => {
  const [activeConversation, setActiveConversation] = useState(null);

  return (
    <ActiveConversationContext.Provider value={{ activeConversation, setActiveConversation }}>
      {children}
    </ActiveConversationContext.Provider>
  );
};

export { ActiveConversationContext, ActiveConversationProvider };