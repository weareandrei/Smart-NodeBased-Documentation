/* eslint-disable max-lines */
import React from 'react'
import PropTypes from "prop-types"
import MinNodeNav from "./minNodeNav"
import Typography from "@mui/material/Typography";

export default class RecentNodesList extends React.Component {

    static propTypes = {
    }

    render = () =>
        <div style={style.mainContainer}>
            <Typography style={{color: '#938EA6', fontSize: '16px', fontWeight: 500}}>Recent</Typography>
            <div style={style.miniNodesContainer}>
                <MinNodeNav/>
                <MinNodeNav/>
                <MinNodeNav/>
            </div>
        </div>

}

const style = {
    mainContainer: {
        width: '100%',
        marginTop: '30px'
    },
    miniNodesContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        marginTop: '10px'
    }
}
