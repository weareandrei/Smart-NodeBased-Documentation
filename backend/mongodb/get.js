const loadDocumentation = async (req, res) => {
    const documentationId = req.query.documentationId;

    const documentation = {
        "_id": {
            "$oid": "6523592fd730e1f9120fbef6"
        },
        "doc": {
            "title": "Sample Project",
            "children": [
                {
                    "title": "Sample Node 1",
                    "type": "Type 1"
                },
                {
                    "title": "Sample Node 2",
                    "type": "Type 2",
                    "children": [
                        {
                            "title": "Sample Node 3",
                            "type": "Type 1"
                        }
                    ]
                }
            ]
        }
    }
    res.json(documentation);
}


module.exports = {
    loadDocumentation,
};
