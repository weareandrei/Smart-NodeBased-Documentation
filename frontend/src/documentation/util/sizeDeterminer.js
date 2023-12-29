import get from "lodash/get";

const nodesSizes = require('../properties/nodesSizes.json')
const words = require('lodash/words')

export const NODE_CONST_WIDTH = 350

export const calculateNodeSize = (node) => {
    const headerHeight = 48
    let attributesHeight = 0
    let bodyHeight = 0

    switch (node.type) {
        case 'page': {
            attributesHeight = calculateHeightBasedOnAttributes(get(node, 'attributes', []))
            bodyHeight = calculateHeightBasedOnBodyText(get(node, 'body.text', ''))
            break
        } case 'current page': {
            attributesHeight = calculateHeightBasedOnAttributes(get(node, 'attributes', []))
            bodyHeight = calculateHeightBasedOnBodyText(get(node, 'body.text', ''))
            break
        } case 'note': {
            attributesHeight = calculateHeightBasedOnAttributes(get(node, 'attributes', []))
            bodyHeight = calculateHeightBasedOnBodyText(get(node, 'body.text', ''))
            break
        } case 'code snippet': {
            bodyHeight = calculateHeightBasedOnBodyCode(get(node, 'body.code', ''))
            break
        } case 'link': {
            bodyHeight = calculateHeightBasedOnLink()
            break
        }
    }

    return {
        headerHeight,
        attributesHeight,
        bodyHeight
    }
}

const calculateHeightBasedOnAttributes = (attributes) => {
    return Object.keys(attributes).length * 48 // px
}

const calculateHeightBasedOnBodyText = (bodyText) => {
    const wordsArray = words(bodyText)
    const containerHeight =  wordsArray.length * 5 // px
    return containerHeight > 350 ? 350 : containerHeight
}

const calculateHeightBasedOnBodyCode = (bodyCode) => {
    const wordsArray = words(bodyCode)
    const containerHeight =  wordsArray.length * 27 // px
    return containerHeight > 350 ? 350 : containerHeight
}

const calculateHeightBasedOnLink = () => {
    return 130 // px
}

export const determineNodeSizeAttributes = (node) => {
    switch (node.type) {
        case 'note':
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
