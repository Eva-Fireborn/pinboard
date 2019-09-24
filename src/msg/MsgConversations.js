import React from "react";

const MsgConversations =  ({messageHistory}) => {

    return(
      <aside>
        <div className="adUserName selected">
          <img src={require('../img/tempProfile.jpg')} alt="profile img" className="profile" />
          <div>
            Magical unicorn user
          </div>
          <div className="arrow"></div>
        </div>
        <div className="adUserName">
          <img src={require('../img/tempProfile.jpg')} alt="profile img" className="profile" />
          <div>
            Unicorn lover
          </div>
        </div>
        <div className="adUserName">
          <img src={require('../img/tempProfile.jpg')} alt="profile img" className="profile" />
          <div>
            Horse
          </div>
        </div>
      </aside>
    );
};
export default MsgConversations;
