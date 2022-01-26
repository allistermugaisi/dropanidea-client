import React, { useState } from 'react';
import {
	Table,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	TablePagination,
} from '@mui/material';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
// 	table: {
// 		whiteSpace: 'nowrap',
// 		marginTop: theme.spacing(3),
// 		'& thead th': {
// 			fontWeight: '400',
// 			fontSize: '1rem',
// 			color: '#641bff',
// 			whiteSpace: 'nowrap',
// 			backgroundColor: '#fff',
// 			zIndex: -4,
// 		},
// 		'& tbody td': {
// 			fontWeight: '300',
// 		},
// 		'& tbody tr:hover': {
// 			backgroundColor: '#f9fafc',
// 		},
// 	},
// 	pagination: {
// 		overflow: 'hidden',
// 	},
// }));

export default function useTable(records, columns, search) {
	// const classes = useStyles();

	const pages = [5, 10, 25];
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState();

	const TblContainer = (props) => <Table size="small">{props.children}</Table>;

	const TblHead = () => {
		const handleSortRequest = (property) => {
			const isAsc = orderBy === property && order === 'asc';
			setOrder(isAsc ? 'desc' : 'asc');
			setOrderBy(property);
		};

		return (
			<TableHead>
				<TableRow>
					{columns?.map((column) => {
						return (
							<TableCell
								key={column.id}
								sortDirection={orderBy === column.id ? order : false}
							>
								<TableSortLabel
									active={orderBy === column.id}
									direction={orderBy === column.id ? order : 'asc'}
									onClick={() => {
										handleSortRequest(column.id);
									}}
								>
									{column.label}
								</TableSortLabel>
							</TableCell>
						);
					})}
				</TableRow>
			</TableHead>
		);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const TblPagination = () => (
		<TablePagination
			component="div"
			page={page}
			rowsPerPageOptions={pages}
			rowsPerPage={rowsPerPage}
			count={records.length}
			onChangePage={handleChangePage}
			onChangeRowsPerPage={handleChangeRowsPerPage}
		/>
	);

	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}

	function getComparator(order, orderBy) {
		return order === 'desc'
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy);
	}

	function stableSort(array, comparator) {
		const stabilizedThis = array.map((el, index) => [el, index]);
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0]);
			if (order !== 0) return order;
			return a[1] - b[1];
		});
		return stabilizedThis.map((el) => el[0]);
	}

	const recordsAfterPagingAndSorting = () => {
		return stableSort(search.fn(records), getComparator(order, orderBy)).slice(
			page * rowsPerPage,
			(page + 1) * rowsPerPage
		);
	};

	return {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPagingAndSorting,
	};
}
