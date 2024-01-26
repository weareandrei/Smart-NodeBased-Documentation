import {
    Underline,
    Document,
} from '.'

import SlashCommand from "./slashCommand/SlashCommand"

export const ExtensionKit = ({ provider, userId, userName = 'user' }) => [
    Document,
    Underline,
    SlashCommand
]