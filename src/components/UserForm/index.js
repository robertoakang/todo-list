import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';

function UserForm({ properties }) {
	const [inputedValues, setInputedValues] = useState({});

	const { title, fields, link, handle } = properties;

	function handleChange(valueField, field) {
		if (field) {
			const obj = {};
			obj[field] = valueField;
			setInputedValues((value) => ({ ...value, ...obj }));
		}
	}

	async function handleForm(event) {
		event.preventDefault();
		handle(inputedValues);
	}

	return (
		<Container
			component="main"
			maxWidth="xs"
			sx={{
				bgcolor: 'white',
				boxShadow: '0 5px 10px 0 rgb(0 0 0 / 10%)',
				borderRadius: '10px',
			}}
		>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingTop: 3,
					paddingBottom: 5,
				}}
			>
				<Typography component="h1" variant="h5">
					{title}
				</Typography>
				<Box component="form" onSubmit={handleForm} validate sx={{ mt: 1 }}>
					{Object.entries(fields).map(([field, value]) => {
						const {
							autoComplete,
							autoFocus,
							id,
							inputType,
							label,
							name,
							required,
							type,
						} = value;

						switch (inputType) {
							case 'TextField':
								return (
									<TextField
										margin="normal"
										required={required}
										fullWidth
										id={id}
										label={label}
										name={name}
										autoComplete={autoComplete}
										autoFocus={autoFocus}
										type={type}
										onChange={(e) => handleChange(e.target.value, id)}
										key={`textfield-${id + field}`}
									/>
								);
							case 'Button':
								return (
									<Button
										type={type}
										fullWidth
										variant="contained"
										sx={{ mt: 3, mb: 2 }}
										key={`button-${id + field}`}
									>
										{label}
									</Button>
								);
							default:
								return <div />;
						}
					})}
					{link ? (
						<Grid container justifyContent="center">
							<Grid item>
								<Link href={link.route} variant="body2">
									{link.text}
								</Link>
							</Grid>
						</Grid>
					) : null}
				</Box>
			</Box>
		</Container>
	);
}

UserForm.propTypes = {
	properties: PropTypes.shape({
		title: PropTypes.string.isRequired,
		fields: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				required: PropTypes.string.boolean,
				id: PropTypes.string,
				label: PropTypes.string,
				autoComplete: PropTypes.string,
				autoFocus: PropTypes.string.boolean,
				type: PropTypes.string,
				inputType: PropTypes.string,
			})
		).isRequired,
		link: PropTypes.string,
		handle: PropTypes.func.isRequired,
	}),
};

UserForm.defaultProps = {
	properties: {},
};

export default UserForm;
