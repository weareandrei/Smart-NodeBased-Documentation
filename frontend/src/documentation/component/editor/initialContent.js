const initialContent = {
    type: 'doc',
    content: [
        {
            type: 'heading',
            attrs: {
                textAlign: 'left',
                level: 1,
            },
            content: [
                {
                    type: 'emoji',
                    attrs: {
                        name: 'fire',
                    },
                },
                {
                    type: 'text',
                    text: ' Next.js + Tiptap Block Editor Template 12',
                },
            ],
        },
        {
            type: 'paragraph',
            attrs: {
                class: null,
                textAlign: 'left',
            },
            content: [
                {
                    type: 'text',
                    text: 'Welcome to our React Block Editor Template built on top of ',
                },
                {
                    type: 'text',
                    marks: [
                        {
                            type: 'link',
                            attrs: {
                                href: 'https://tiptap.dev/',
                                target: '_blank',
                                class: null,
                            },
                        },
                    ],
                    text: 'Tiptap',
                },
                {
                    type: 'text',
                    text: ', ',
                },
                {
                    type: 'text',
                    marks: [
                        {
                            type: 'link',
                            attrs: {
                                href: 'https://nextjs.org/',
                                target: '_blank',
                                class: null,
                            },
                        },
                    ],
                    text: 'Next.js',
                },
                {
                    type: 'text',
                    text: ' and ',
                },
                {
                    type: 'text',
                    marks: [
                        {
                            type: 'link',
                            attrs: {
                                href: 'https://tailwindcss.com/',
                                target: '_blank',
                                class: null,
                            },
                        },
                    ],
                    text: 'Tailwind',
                },
                {
                    type: 'text',
                    text: '. This project can be a good starting point for your own implementation of a block editor.',
                },
            ],
        }
    ]
}

export default initialContent