const nodesSizes = require('../properties/nodesSizes.json')
const words = require('lodash/words')

export const determineNodeSizeAttributes = (node) => {
    switch (node.type) {
        case 'note':
            console.log('determineNodeSizeAttributes for ///note/// : ', node)
            return determineNoteSize(node)
        case 'page':
            return determinePageSize(node)
        case 'code snippet':
            return determineCodeSnippetSize(node)
        case 'link':
            return determineLinkSize(node)
        default:
            return {width: 'normal', bodyHeight: 'normal'}
    }
}

const determineNoteSize = (node) => {
    const textSize = determineTextSize(node.body.text)
    return {width: textSize, bodyHeight: textSize}
}

const determinePageSize = (node) => {
    const titleSize = node.title.length > 10 ? 'large' : 'normal'
    const isAttributesShown = Object.keys(node.attributes).length > 0 ? true : false

    return {width: titleSize, bodyHeight: isAttributesShown ? 'attributesOn' : 'attributesOff'}
}

const determineCodeSnippetSize = (node) => {
    // const textSize = determineTextSize(node.code.text)
    return {width: 'medium', bodyHeight: 'medium'}
}

const determineLinkSize = (node) => {
    return {width: 'normal', bodyHeight: 'imageOn'}
}

const determineTextSize = (text) => {
    if (text === undefined) {
        return 'small'
    }

    const wordsArray = words(text)

    if (wordsArray.length <= 10) {
        return 'small'
    } else if (wordsArray.length <= 30) {
        return 'medium'
    } else {
        return 'large'
    }
}
