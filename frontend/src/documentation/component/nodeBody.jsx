import React from "react"
import PropTypes from "prop-types"
// import { LinkPreview } from '@dhaiwat10/react-link-preview'
import Microlink from '@microlink/react'

export default class NodeBody extends React.Component {

    static propTypes = {
        body: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
        height: PropTypes.any.isRequired
    }

    static defaultProps = {
        body: {
            text: ""
        }
    }

    render = () => {
        switch (this.props.type) {
            case 'code snippet':
                return this.renderCodeBody(this.props.body, this.props.height)
            case 'link':
                return this.renderLinkBody(this.props.body, this.props.height)
            case 'note':
                return this.renderNoteBody(this.props.body, this.props.height)
            case 'current page':
                return this.renderPageBody(this.props.body, this.props.height)
            case 'page':
                return this.renderPageBody(this.props.body, this.props.height)
        }
    }

    renderCodeBody = (body, height) =>
        <code style={style.codeBody(height)}>
            {body.code}
        </code>

    renderLinkBody = (body, height) =>
        <div style={style.imageBody(height)}>
            <Microlink url={'https://stripe.com/gb'}/>
        </div>

    renderNoteBody = (body, height) =>
        <div style={style.noteBody(height)}>
            {body.text}
        </div>

    renderPageBody = (body, height) =>
        <div style={style.imageBody(height)}>
            attributes here...
        </div>
}

const nodeBody = (height) => ({
    background: '#fff',
    height: height+'px',
    padding: ' 6px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px'
})

const style = {
    codeBody: (height) => ({
        ...nodeBody(height),
        background: '#2B2D35',
        color: '#DDDDDD',
        fontSize: '13px'
    }),
    imageBody: (height) => ({
        ...nodeBody(height)
    }),
    noteBody: (height) => ({
        ...nodeBody(height),
        fontSize: '15px'
    })
}