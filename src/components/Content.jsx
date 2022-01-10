import React from 'react';
import { useParams } from 'react-router-dom';

const Content = () => {
	let params = useParams();

	return (
		<div style={{ paddingTop: '150px' }}>
			<h2>Content Area {params.contentId}</h2>
		</div>
	);
};

export default Content;
