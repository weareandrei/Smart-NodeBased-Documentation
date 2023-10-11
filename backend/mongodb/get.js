const loadDocumentation = async (req, res) => {
    const documentationId = req.query.documentationId;

    const documentation = {
        "_id": {
            "$oid": "6523592fd730e1f9120fbef6"
        },
        "doc": [
            {
                "title": "Design",
                "children": [
                    {
                        "title": "IOS",
                        "type": "Type 1"
                    },
                    {
                        "title": "PC Version",
                        "type": "Type 2",
                        "children": [
                            {
                                "title": "Sample Node 3",
                                "type": "Type 1"
                            }
                        ]
                    }
                ]
            },

            {
                "title": "Programming",
                "children": [
                    {
                        "title": "Backend",
                        "type": "Type 1",
                        "children": [
                            {
                                "title": "Some function 1",
                                "type": "Type 1"
                            },
                            {
                                "title": "Some function 2",
                                "type": "Type 1"
                            }
                        ]
                    },
                    {
                        "title": "Frontend",
                        "type": "Type 2",
                        "children": [
                            {
                                "title": "Navigation Component",
                                "type": "Type 1"
                            },
                            {
                                "title": "Component Definitions",
                                "type": "Type 2",
                                "children": [
                                    {
                                        "title": "Colours",
                                        "type": "Type 5",
                                    },
                                    {
                                        "title": "Font Sizes",
                                        "type": "Type 4",
                                    },
                                    {
                                        "title": "Buttons",
                                        "type": "Type 4",
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
    res.json(documentation);
}


module.exports = {
    loadDocumentation,
};
