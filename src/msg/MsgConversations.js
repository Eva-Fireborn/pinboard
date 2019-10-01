import React from "react";

const MsgConversations = ({ msg, showConversations }) => {
	return (
		<div className="adUserName selected" onClick={() => showConversations(msg)}>
			{msg.adHeader}
		</div>
	);
};
export default MsgConversations;
