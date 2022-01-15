import React from 'react';
import { ChatRoute, SidebarChat } from './index';
import '../public/css/SidebarChat.css';

const ChatSection = () => {
	return (
		<>
			{/* Desktop View */}
			<section className="section-desktop">
				<SidebarChat />
				<ChatRoute />
			</section>
		</>
	);
};

export default ChatSection;
