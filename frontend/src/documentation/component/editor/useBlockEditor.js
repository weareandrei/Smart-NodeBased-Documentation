import { useContext, useEffect, useMemo, useState } from 'react'

import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import initialContent from "./initialContent"
import {ExtensionKit} from "./extensions/extentionKit";

// import { EditorContext } from '../context/EditorContext'
// import { userColors, userNames } from '../lib/constants'
// import { randomElement } from '../lib/utils'

export const useBlockEditor = ({content}) => {
    const editor = useEditor(
        {
            content: content,
            autofocus: true,
            // onCreate: ({ editor }) => {
            //     editor.commands.setContent("Hello world")
            // },
            extensions: [
                StarterKit,
                ...ExtensionKit({}),
            ],
            editorProps: {
                attributes: {
                    autocomplete: 'off',
                    autocorrect: 'off',
                    autocapitalize: 'off',
                    class: 'min-h-full',
                },
            },
        }
    )
    const characterCount = editor?.storage.characterCount || { characters: () => 0, words: () => 0 }

    window.editor = editor

    return { editor, characterCount }
}
