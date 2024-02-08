import { Component, useState, useRef, useEffect, useContext } from "react";
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import { ActiveConversationContext } from "../MessageContext/ActiveConversationProvider";
function ChatContent({mess}) {
  const {activeConversation}=useContext(ActiveConversationContext);
  const [messages, setMessages] = useState([]);
  const [loading,setLoading]=useState(true);
  var user=JSON.parse(localStorage.getItem("user"));
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (mess) {
      try {
        const parsedMessages = activeConversation;
        console.log(activeConversation);
        setMessages(parsedMessages);
        setLoading(false);
      } catch (error) {
        console.error("Failed to parse mess: ", error);
      }
    }
  }, [activeConversation]);

  // useEffect(() => {
  //   setMessages(JSON.parse(mess.mess));
  //     const handleKeyPress = (e) => {
  //       if (e.key === "Enter") {
  //         if (messages !== "") {
  //           setChatItms((prevChatItms) => [
  //             ...prevChatItms,
  //             {
  //               key: prevChatItms.length + 1,
  //               type: "",
  //               msg: messages,
  //               image:
  //                 "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
  //             },
  //           ]);
  //           setMessages("");
  //           // scrollToBottom();
  //         }
  //       }
  //   };

  //   window.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, [messages]);

  // const onStateChange = (e) => {
  //   setMessages(e.target.value);
  // };

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar
              isOnline="active"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
            />
            <p style={{color:'white'}}>Tim Hover</p>
          </div>
        </div>

        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg">
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="content__body">
        {loading ? null : 
        <div className="chat__items">
          {messages.messages.map((item,index) =>(
              <ChatItem
              animationDelay={index + 2}
              key={item.id}
              user={item.sender.id==user.id ? "me" : "other"}
              msg={item.message}
              // image={itm.image}
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
            // onChange={onStateChange}
            // value={messages}
          />
          <button className="btnSendMsg" id="sendMsgBtn">
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatContent