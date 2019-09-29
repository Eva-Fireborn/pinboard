import React from "react";

const MsgConversations = ({ ads, getConversations }) => {
	return (
		<div className="adUserName selected" onClick={() => getConversations(ads)}>
			{ads.adHeader}
		</div>
	);
};
export default MsgConversations;
