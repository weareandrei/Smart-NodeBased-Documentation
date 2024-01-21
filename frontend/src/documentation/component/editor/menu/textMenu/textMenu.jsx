import React from 'react'

// import { Icon } from '@/components/ui/Icon'
// import { Toolbar } from '@/components/ui/Toolbar'
import { useTextmenuCommands } from './hooks/useTextmenuCommands'
import { useTextmenuStates } from './hooks/useTextmenuStates'
import { BubbleMenu } from '@tiptap/react'
// import { memo } from 'react'
// import * as Popover from '@radix-ui/react-popover'
// import { Surface } from '@/components/ui/Surface'
// import { ColorPicker } from '@/components/panels'
// import { FontFamilyPicker } from './components/fontFamilyPicker'
// import { FontSizePicker } from './components/fontSizePicker'
import { useTextmenuContentTypes } from './hooks/useTextmenuContentTypes'
// import { ContentTypePicker } from './components/contentTypePicker'
// import { AIDropdown } from './components/AIDropdown'
// import { EditLinkPopover } from './components/editLinkPopover'

// We memorize the button so each button is not rerendered
// on every editor state change
// const MemoButton = memo(Toolbar.Button)
// const MemoColorPicker = memo(ColorPicker)
// const MemoFontFamilyPicker = memo(FontFamilyPicker)
// const MemoFontSizePicker = memo(FontSizePicker)
// const MemoContentTypePicker = memo(ContentTypePicker)

export const TextMenu = ({ editor }) => {
  const commands = useTextmenuCommands(editor)
  const states = useTextmenuStates(editor)
  const blockOptions = useTextmenuContentTypes(editor)

  return (
    <BubbleMenu
      tippyOptions={{ popperOptions: { placement: 'top-start' } }}
      editor={editor}
      pluginKey="textMenu"
      shouldShow={states.shouldShow}
      updateDelay={100}
    >
      <div>button 1</div>
      <div>button 2</div>
    </BubbleMenu>
  )
}
