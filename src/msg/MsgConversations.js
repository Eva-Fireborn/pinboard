import React from "react";

const MsgConversations =  ({ads}) => {
  console.log('vad är ads?', ads);

  let mappedAds = ads.map((a, i) => (
    <div key={i}>{a}</div>
  ))
    return(
      <aside>
        <div className="adUserName selected">
          <div>
          {mappedAds}
          </div>
          <div className="arrow"></div>

        </div>
      </aside>
    );
};
export default MsgConversations;
