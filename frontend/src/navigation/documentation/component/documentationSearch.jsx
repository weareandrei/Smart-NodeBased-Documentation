import React from 'react';
import PropTypes from 'prop-types';
import { TextField, createTheme, ThemeProvider } from '@mui/material';

export default class DocumentationSearch extends React.Component {
    static propTypes = {};

    render = () => {
        const theme = createTheme({
            components: {
                MuiTextField: {
                    styleOverrides: {
                        root: {
                            '& label.Mui-focused': {
                                color: '#938EA6', // Placeholder color when focused
                            },
                            '& label.Mui-root': {
                                color: '#938EA6', // Placeholder color when focused
                            },
                            '& label.Mui': {
                                color: '#938EA6', // Placeholder color when focused
                            },

                            '& .MuiInput-underline:after': {
                                borderBottomColor: '#938EA6', // Bottom border color when focused
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#DFDFDF', // Border color
                                },
                                // '&.Mui-focused fieldset': {
                                //     borderColor: '#552CF6', // Border color when focused
                                // },
                                '& .MuiInputBase-root': {
                                    color: 'white',
                                },
                            },
                        },
                    },
                },
                MuiInputLabel: {
                    styleOverrides: {
                        root: {
                            color: '#938EA6', // Change this to the desired label color
                        },
                    },
                },
            },
        });

        return (
            <ThemeProvider theme={theme}>
                <div style={style.mainContainer}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        size="small"
                    />
                </div>
            </ThemeProvider>
        );
    };
}

const style = {
    mainContainer: {
        width: '100%',
        fontSize: '12px',
        marginTop: '15px',
    }
}
