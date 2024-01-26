import {
    Underline,
    Document,
} from '.'

import SlashCommand from "./slashCommand/slashCommand"

export const ExtensionKit = ({ provider, userId, userName = 'user' }) => [
    Document,
    Underline,
    SlashCommand
]