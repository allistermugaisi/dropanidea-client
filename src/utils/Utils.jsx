import moment from 'moment';

export const timeFromNow = (timestamp) =>
	moment(new Date(timestamp?.toDateString())).fromNow();
