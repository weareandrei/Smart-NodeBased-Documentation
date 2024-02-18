const {syncNodes} = require("../mongodb/post.js")


const run = async () => {
    const req = {
        body: {
            "documentationId": "6523592fd730e1f9120fbef6",
            "documentationChanges": {
                "create": [],
                "update": [
                    {
                        "id":"11",
                        "updates": [
                            {"type": "lock", "value": true}
                        ]
                    }
                ]
            }
        }
    }
    const res = {
        json: () => {console.log('json logged')}
    }
    await syncNodes(req, res)
}

run()
