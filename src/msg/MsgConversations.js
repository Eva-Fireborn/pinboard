import React from "react";

const MsgConversations = ({ msg, showConversations }) => {
	return (
		<div className="msgRoom" onClick={() => showConversations(msg)}>
			<h3>{msg.adHeader}</h3>
		</div>
	);
};
export default MsgConversations;
