import React from "react";

const MsgConversations =  ({ads, onClickGetConversations}) => {

  //<div className="arrow"></div>
    return(

      <div className="adUserName selected" onClick= {() => onClickGetConversations(ads)}>
        {ads.adHeader}
        </div>
    );
};
export default MsgConversations;
