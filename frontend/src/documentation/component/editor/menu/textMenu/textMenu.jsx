import React from 'react'
import {useTextMenuCommands} from './hooks/useTextMenuCommands'
import {useTextMenuStates} from './hooks/useTextMenuStates'
import { BubbleMenu } from '@tiptap/react'
import { useTextMenuContentTypes } from './hooks/useTextMenuContentTypes'
import IconButton from "@mui/material/IconButton"

import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import {Paper, Popper} from "@mui/material"

export const TextMenu = ({ editor }) => {
    const commands = useTextMenuCommands(editor)
    const states = useTextMenuStates(editor)

    return (
        <BubbleMenu
              tippyOptions={{ popperOptions: {
                  strategy: 'fixed',
                  modifiers: [
                    {
                      name: 'flip',
                      enabled: true
                    },
                    {
                      name: 'preventOverflow',
                      options: {
                        altAxis: true,
                        tether: false,
                      },
                    },
                  ]
                },
                  interactive: true,
                  // appendTo: () => "parent"
              }}
              editor={editor}
              pluginKey="textMenu"
              shouldShow={states.shouldShow}>

              <Paper style={style.toolBarWrapper}>
                  <IconButton style={style.iconButton}
                              active={states.isBold}
                              onClick={commands.onBold}>
                      <FormatBoldIcon/>
                  </IconButton>
                  <IconButton style={style.iconButton}
                              active={states.isItalic}
                              onClick={commands.onItalic}>
                      <FormatItalicIcon />
                  </IconButton>
                  <IconButton style={style.iconButton}
                              active={states.isUnderline}
                              onClick={commands.onUnderline}>
                      <FormatUnderlinedIcon />
                  </IconButton>
              </Paper>
          </BubbleMenu>
    )
}

const style = {
  toolBarWrapper: {
    display: 'flex',
    justifyContent: 'start',
    background: '#fff',
    height: 'auto',
    width: 'auto',
    padding: '5px',
    // boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
    border: '1px #DFDFDF solid',
    borderRadius: '15px'
  },
  iconButton: {
    width: '27px',
    borderRadius: '5px',
    padding: '0px'
  }
}
