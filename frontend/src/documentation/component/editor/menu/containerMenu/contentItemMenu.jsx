
/*
* This code is unfinished. It needs some MUI added to it to replace radix ui, and some other UI components.
* Cannot be used right now, contains pro (paid) features like DragHandle.
* Will be developed later if required, when project has more money
*/

import { useEffect, useState } from 'react'

// import { Icon } from '@/components/ui/Icon'
// import { Toolbar } from '@/components/ui/Toolbar'
// import DragHandle from '@tiptap-pro/extension-drag-handle-react'

// import * as Popover from '@radix-ui/react-popover'
// import { Surface } from '@/components/ui/Surface'
// import { DropdownButton } from '@/components/ui/Dropdown'
// import useContentItemActions from './hook/useContentItemActions'
// import { useData } from './hook/useData'

export const ContentItemMenu = ({ editor }) => {
    // const [menuOpen, setMenuOpen] = useState(false)
    // const data = useData()
    // const actions = useContentItemActions(editor, data.currentNode, data.currentNodePos)
    //
    // useEffect(() => {
    //     if (menuOpen) {
    //         editor.commands.setMeta('lockDragHandle', true)
    //     } else {
    //         editor.commands.setMeta('lockDragHandle', false)
    //     }
    // }, [editor, menuOpen])
    //
    // return (
    //     <DragHandle
    //         pluginKey="ContentItemMenu"
    //         editor={editor}
    //         onNodeChange={data.handleNodeChange}
    //         tippyOptions={{
    //             offset: [-2, 16],
    //             zIndex: 99,
    //         }}
    //     >
    //         <div className="flex items-center gap-0.5">
    //             <Toolbar.Button onClick={actions.handleAdd}>
    //                 <Icon name="Plus" />
    //             </Toolbar.Button>
    //             <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
    //                 <Popover.Trigger asChild>
    //                     <Toolbar.Button>
    //                         <Icon name="GripVertical" />
    //                     </Toolbar.Button>
    //                 </Popover.Trigger>
    //                 <Popover.Content side="bottom" align="start" sideOffset={8}>
    //                     <Surface className="p-2 flex flex-col min-w-[16rem]">
    //                         <Popover.Close>
    //                             <DropdownButton onClick={actions.resetTextFormatting}>
    //                                 <Icon name="RemoveFormatting" />
    //                                 Clear formatting
    //                             </DropdownButton>
    //                         </Popover.Close>
    //                         <Popover.Close>
    //                             <DropdownButton onClick={actions.copyNodeToClipboard}>
    //                                 <Icon name="Clipboard" />
    //                                 Copy to clipboard
    //                             </DropdownButton>
    //                         </Popover.Close>
    //                         <Popover.Close>
    //                             <DropdownButton onClick={actions.duplicateNode}>
    //                                 <Icon name="Copy" />
    //                                 Duplicate
    //                             </DropdownButton>
    //                         </Popover.Close>
    //                         <Toolbar.Divider horizontal />
    //                         <Popover.Close>
    //                             <DropdownButton
    //                                 onClick={actions.deleteNode}
    //                                 className="text-red-500 bg-red-500 dark:text-red-500 hover:bg-red-500 dark:hover:text-red-500 dark:hover:bg-red-500 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-20"
    //                             >
    //                                 <Icon name="Trash2" />
    //                                 Delete
    //                             </DropdownButton>
    //                         </Popover.Close>
    //                     </Surface>
    //                 </Popover.Content>
    //             </Popover.Root>
    //         </div>
    //     </DragHandle>
    // )
}
