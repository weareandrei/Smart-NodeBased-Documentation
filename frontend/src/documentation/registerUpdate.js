const buildNodeUpdateObject = (update) => {
    switch (update.type) {
        case 'position':
            if (update.dragging === true || update.autoLayout === true) {
                return {
                    id: update.id,
                    update: {
                        type: 'position',
                        value: update.position
                    }
                }
            } else { return undefined }
        case 'lock':
            return {
                id: update.id,
                update: {
                    type: 'lock',
                    value: true
                }
            }
        case 'unlock':
            return {
                id: update.id,
                update: {
                    type: 'lock',
                    value: false
                }
            }
        case 'content':
            return {
                id: update.id,
                update: {
                    type: 'content',
                    value: update.content
                }
            }
        case 'title':
            return {
                id: update.id,
                update: {
                    type: 'title',
                    value: update.title
                }
            }
        case 'type':
            return {
                id: update.id,
                update: {
                    type: 'type',
                    value: update.typeName
                }
            }
        default:
            return undefined
    }
}

module.exports = { buildNodeUpdateObject }