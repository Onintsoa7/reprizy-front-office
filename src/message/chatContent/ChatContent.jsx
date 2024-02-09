import { Component, useState, useRef, useEffect, useContext } from "react";
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import { ActiveConversationContext } from "../MessageContext/ActiveConversationProvider";
import { manualPost } from "../../axios_utils";
function ChatContent({mess}) {
  const {activeConversation}=useContext(ActiveConversationContext);
  const [messages, setMessages] = useState([]);
  const [envoi,setEnvoi]=useState("");
  const [loading,setLoading]=useState(true);
  const [receiver,setReceiver]=useState(null);
  var user=JSON.parse(localStorage.getItem("user"));
  const messagesEndRef = useRef(null);
  const [sending,setSending]=useState(false);
  
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (mess) {
      try {
        const parsedMessages = activeConversation;
        console.log(activeConversation);
        setMessages(parsedMessages.messages);
        setReceiver(
          parsedMessages.utilisateurs[0]==user.id ? parsedMessages.utilisateurs[1] : parsedMessages.utilisateurs[0]
        );
        setLoading(false);
      } catch (error) {
        console.error("Failed to parse mess: ", error);
      }
    }
  }, [activeConversation]);
  
  const sendMessage = () => {
    var iduser = receiver.id;
    var convId = activeConversation.id;
    var message = envoi;
    const data = new FormData();
    data.append("iduser", iduser);
    data.append("idconversation", convId);
    data.append("message", message);
  
    setSending(true);
  
    manualPost(data, 'https://repr-izy-production.up.railway.app/api/v1/Conversations/newMessage')
      .then((response) => {
        setMessages(prevMessages => [...prevMessages, response.data.data[0]]);
        setEnvoi("");
        setSending(false);
      });
  };

  const onStateChange = (e) => {
    setEnvoi(e.target.value);
  };

  return (
    <div className="main__chatcontent">
      <div className="content__body">
        {loading ? null : 
        <div className="chat__items">
          {messages.map((item,index) =>(
              <ChatItem
              animationDelay={index + 2}
              key={item.id}
              user={item.sender.id==user.id ? "me" : "other"}
              msg={item.message}
              image={"/logo.png"}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        }
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button>
          <input
            type="text"
            placeholder="Type a message here"
            onChange={onStateChange}
            value={envoi}
          />
          <button className="btnSendMsg" id="sendMsgBtn" onClick={sendMessage}>
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatContent