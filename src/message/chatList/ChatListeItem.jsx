import { useContext } from 'react';
import Avatar from './Avatar';
import './chatList.css';
import { ActiveConversationContext } from '../MessageContext/ActiveConversationProvider';

function ChatListItems({ name, animationDelay, isOnline, image, active,last,onClick }) {
  
  var lastMessage="Pas encore de message";
  var lastMessageClass="";
  var user=JSON.parse(localStorage.getItem("user"));
  if (last!=null) {
    last=JSON.parse(last);
    if (last.sender.id==user.id) {
      lastMessage="Vous: "+last.message;
    } else {
      lastMessage=last.message;
      lastMessageClass="font-bold";
    }
  } 
  const selectChat = (e) => {
    for (let i = 0; i < e.currentTarget.parentNode.children.length; i++) {
      e.currentTarget.parentNode.children[i].classList.remove('active');
    }
    e.currentTarget.classList.add('active');
  };

  return (
    <div
      style={{ animationDelay: `0.${animationDelay}s` }}
      onClick={onClick}
      className={`chatlist__item ${active ? 'active' : ''}`}
    >
      <Avatar
        image={image ? image : 'http://placehold.it/80x80'}
        isOnline={isOnline}
      />

      <div className="userMeta">
        <p className='username'>{name}</p>
        <span className={"activeTime "+lastMessageClass}>{last!=null ? lastMessage : "Pas de encore de message"}</span>
      </div>
    </div>
  );
}


export default ChatListItems;
