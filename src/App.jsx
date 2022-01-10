import { Routes, Route } from 'react-router-dom';
import './App.css';
import {
	Login,
	Register,
	Welcome,
	Chat,
	Content,
	ContentLanding,
	ChatLanding,
	Messages,
	PageNotFound,
} from './components';
import { Landing } from './components/app';

// null   Anyone can access route
// true   only logged in users can access route
// false  logged in user can't access route

const App = () => {
	return (
		<Routes>
			<Route index path="/" element={<Welcome />} />
			<Route path="dashboard" element={<Landing />}>
				<Route index element={<ContentLanding />} />
				<Route path=":contentId" element={<Content />} />
			</Route>
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
			<Route path="chat/*" element={<Chat />}>
				<Route path=":chatId" element={<Messages />} />
			</Route>
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};

export default App;
