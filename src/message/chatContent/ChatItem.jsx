import React from 'react'
import Avatar from '../chatList/Avatar'
function ChatItem({image,msg,user}) {
  return (
   
        <div
          style={{ animationDelay: `0.4s` }}
          className={`chat__item ${user ? user : ""}`}
        >
          <div className="chat__item__content">
            <div className="chat__msg">{msg}</div>
            <div className="chat__meta">
              <span></span>
              <span></span>
            </div>
          </div>
          <Avatar isOnline="active" image={image} />
        </div>
  )
}

export default ChatItem