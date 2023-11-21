import React from "react"
import PropTypes from "prop-types"
// import { LinkPreview } from '@dhaiwat10/react-link-preview'
import Microlink from '@microlink/react'

export default class NodeBody extends React.Component {

    static propTypes = {
        body: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired
    }

    static defaultProps = {
        body: {
            text: ""
        }
    }

    render = () => {

        switch (this.props.type) {
            case 'code snippet':
                return this.renderCodeBody(this.props.body)
            case 'link':
                return this.renderLinkBody(this.props.body)
            case 'note':
                return this.renderNoteBody(this.props.body)
        }
    }

    renderCodeBody = (body) =>
        <code style={style.codeBody}>
            {body.code}
        </code>

    renderLinkBody = (body) =>
        <div style={style.imageBody}>
            <Microlink url={'https://stripe.com/gb'}/>
        </div>

    renderNoteBody = (body) =>
        <div style={style.noteBody}>
            {body.text}
        </div>
}

const nodeBody = {
    background: '#fff',
    height: 'fit-content',
    padding: ' 6px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px'
}

const style = {
    codeBody: {
        ...nodeBody,
        background: '#2B2D35',
        color: '#DDDDDD',
        fontSize: '13px'
    },
    imageBody: {
        ...nodeBody,
    },
    noteBody: {
        ...nodeBody,
        fontSize: '15px'
    }
}