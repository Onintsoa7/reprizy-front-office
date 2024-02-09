import { Component, useState, useRef, useEffect, useContext } from "react";
import './chatbody.css'
import ChatList from '../chatList/ChatList'
import ChatContent from '../chatContent/ChatContent'
import UserProfil from '../userProfil/UserProfil'
import { get } from '../../axios_utils';
import { ActiveConversationContext } from "../MessageContext/ActiveConversationProvider";

function ChatBody() {
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messages,setMessages]=useState([]);
  const {activeConversation,setActiveConversation}=useContext(ActiveConversationContext);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [conv] = await Promise.all([
          get('https://repr-izy-production.up.railway.app/api/v1/Conversations'),
        ]);
        setConversation(conv.data.data[0]);
        if (conv.data.data[0][0]!=null) {
          setMessages(conv.data.data[0][0]);
          setActiveConversation(conv.data.data[0][0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="__main">
      <div className="main__chatbody">
        <ChatList conv={conversation} loading={loading}/>
        {loading ? null : 
          <ChatContent mess={messages!=null ? JSON.stringify(messages) : JSON.stringify([])}/>
        }
      </div>
    </div>
  );
}

export default ChatBody;
