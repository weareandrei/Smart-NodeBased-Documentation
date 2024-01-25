import React, {useRef} from 'react'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import {EditorContent, EditorProvider, PureEditorContent, useCurrentEditor} from '@tiptap/react'
import { Extension } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import {useBlockEditor} from "./useBlockEditor"
// import {ContentItemMenu} from "./menu/containerMenu/contentItemMenu"
import {TextMenu} from "./menu/textMenu/textMenu"
import Button from "@mui/material/Button";

// const extensions = [
//     Color.configure({ types: [TextStyle.name, ListItem.name] }),
//     TextStyle.configure({ types: [ListItem.name] }),
//     StarterKit.configure({
//         bulletList: {
//             keepMarks: true,
//             keepAttributes: false,
//         },
//         orderedList: {
//             keepMarks: true,
//             keepAttributes: false,
//         },
//     }),
// ]

const createStoreChangesExtention = (nodeId, registerNodeUpdate) => Extension.create({
    onUpdate({ editor }) {
        const content = editor.getHTML()
        registerNodeUpdate({id: nodeId, type: 'content', content: content})
    }
})

const BlockTextEditor = ({content, nodeId, registerNodeUpdate}) => {

    const menuContainerRef = useRef(null)
    const editorRef = useRef<PureEditorContent | null>(null)

    const storeChangesExtention = createStoreChangesExtention(nodeId, registerNodeUpdate)
    const { editor, characterCount } = useBlockEditor({content, storeChangesExtention})

    // const displayedUsers = users.slice(0, 3)

    if (!editor) {
        return null
    }

    return (
        <>
            <div className="flex h-full" ref={menuContainerRef}>
                <div className="relative flex flex-col flex-1 h-full overflow-hidden">
                    <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
                    {/*<ContentItemMenu editor={editor} />*/}
                    {/*<LinkMenu editor={editor} appendTo={menuContainerRef} />*/}
                    <TextMenu editor={editor} />
                    {/*<ColumnsMenu editor={editor} appendTo={menuContainerRef} />*/}
                    {/*<TableRowMenu editor={editor} appendTo={menuContainerRef} />*/}
                    {/*<TableColumnMenu editor={editor} appendTo={menuContainerRef} />*/}
                    {/*<ImageBlockMenu editor={editor} appendTo={menuContainerRef} />*/}
                </div>
            </div>
        </>
    )
}

BlockTextEditor.defaultProps = {
    content: ""
}

export default BlockTextEditor