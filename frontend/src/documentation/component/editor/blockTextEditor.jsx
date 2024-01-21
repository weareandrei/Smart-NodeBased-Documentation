import React, {useRef} from 'react'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import {EditorContent, EditorProvider, PureEditorContent, useCurrentEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {useBlockEditor} from "./useBlockEditor"
// import {ContentItemMenu} from "./menu/containerMenu/contentItemMenu"
import {TextMenu} from "./menu/textMenu/textMenu"

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

const BlockTextEditor = ({content}) => {

    const menuContainerRef = useRef(null)
    const editorRef = useRef<PureEditorContent | null>(null)

    console.log('beginning to creating useBlockEditor()')
    const { editor, characterCount } = useBlockEditor({content})

    console.log('finished creating useBlockEditor()')

    // const displayedUsers = users.slice(0, 3)

    if (!editor) {
        return null
    }

    console.log('editor', editor)

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