import React from "react";

const MsgConversations = ({ msg, getConversations }) => {
	return (
		<div className="adUserName selected" onClick={() => getConversations(msg)}>
			{msg.adHeader}
		</div>
	);
};
export default MsgConversations;
