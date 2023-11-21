import React from "react"
import PropTypes from "prop-types"

export default class NodeBody extends React.Component {

    static propTypes = {
        body: PropTypes.object.isRequired
    }

    static defaultProps = {
        body: {
            text: ""
        }
    }

    render = () =>
        this.renderMainNode(this.props.body)

    renderMainNode = (body) =>
        <div>{body.text}</div>
}