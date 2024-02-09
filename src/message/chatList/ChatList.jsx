import React, { useState, useEffect, useContext } from 'react';
import './chatList.css';
import ChatListItems from './ChatListeItem';
import { get } from '../../axios_utils';
import { ActiveConversationContext } from '../MessageContext/ActiveConversationProvider';

function ChatList({ conv, loading }) {
  const { setActiveConversation } = useContext(ActiveConversationContext);
  var user = JSON.parse(localStorage.getItem("user"));

  const handleClick = (conversation) => {
    setActiveConversation(conversation);
    console.log("clicked");
  };

  return (
    <div className="main__chatlist">
      <div className="chatlist__heading">
        <h2 style={{ color: 'white' }}>Messages</h2>
        <button className="btn-nobg">
          <i className="fa fa-ellipsis-h"></i>
        </button>
      </div>
      <div className="chatlist__search">
        <div className="search_wrap">
          <input type="text" placeholder="Chercher quelqu'un" required />
          <button className="search-btn">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div className="chatlist__items">
        {loading ? (
          <p>Loading...</p>
        ) : (
          conv.map((item, index) => (
            <ChatListItems
              name={
                item.utilisateurs[0].id === user.id ?  
                item.utilisateurs[1].nom + ' ' + item.utilisateurs[1].prenom :
                item.utilisateurs[0].nom + ' ' + item.utilisateurs[0].prenom
              }
              key={item.id}
              animationDelay={index +  1}
              last={item.messages.length >  0 ? JSON.stringify(item.messages[item.messages.length -  1]) : null}
              image={''}
              onClick={() => handleClick(item)} // Corrected line: pass a function that calls handleClick
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ChatList;