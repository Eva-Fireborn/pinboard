import React from "react";

const MsgConversations =  ({ads, onClickGetConversations}) => {
  console.log('vad är ads?', ads);

  //{ mappedAds }
  //<div className="arrow"></div>
    return(

      <div className="adUserName selected" onClick= {() => onClickGetConversations(ads)}>
        {ads.adHeader}
        </div>
    );
};
export default MsgConversations;
