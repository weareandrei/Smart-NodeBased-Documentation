const nodes = [
   {
      "id": "0",
      "type": "page",
      "title": "Amazon Integration",
      "attributes": {
         "lastUpdated": "01.10.2010"
      },
      "body": {},
      "children": [
         "1",
         "2",
         "3",
         "4"
      ]
   },
   {
      "id": "1",
      "type": "note",
      "title": "How to create integration",
      "attributes": {
         "lastUpdated": "01.10.2010"
      },
      "body": {
         "text": "1.\tSign-Up: To become an Amazon Associate, you need to sign up for the program through the Amazon Associates website. The process is straightforward, and you'll need to provide information about your website or other promotional methods.\n2.\tProduct Promotion: After approval, you can start promoting Amazon products on your website or other platforms. This can be done through text links, banner ads, or other creative methods provided by Amazon."
      }
   },
   {
      "id": "2",
      "type": "code snippet",
      "title": "How to create integration",
      "attributes": {
         "language": "Python"
      },
      "body": {
         "code": "print(\"Hello World\")\nreturn 0"
      }
   },
   {
      "id": "3",
      "type": "link",
      "linkURL": "https://affiliate-program.amazon.co.uk/",
      "attributes": {},
      "body": {
         "url": "https://affiliate-program.amazon.co.uk/"
      }
   },
   {
      "id": "4",
      "type": "page",
      "title": "Amazon API access",
      "attributes": {
         "lastUpdated": "18.11.2013"
      },
      "body": {},
      "children": [
         "5",
         "6"
      ]
   },
   {
      "id": "5",
      "type": "note",
      "title": "Accessing API",
      "attributes": {
         "lastUpdated": "01.10.2010"
      },
      "body": {
         "text": "Receive token in amazon by going to my.cabinet and then requesting the API key for your user ID specifically"
      }
   },
   {
      "id": "6",
      "type": "code snippet",
      "title": "How to use API key",
      "attributes": {
         "language": "JavaScript"
      },
      "body": {
         "code": "print(\"Hello World\")\nreturn 0"
      }
   }
]

const nodesSizes = [
   {id: '0', height: 400, width: 350},
   {id: '1', height: 400, width: 350},
   {id: '2', height: 400, width: 350},
   {id: '3', height: 400, width: 350},
   {id: '4', height: 400, width: 350},
   {id: '5', height: 400, width: 350},
   {id: '6', height: 400, width: 350}
]

module.exports = { nodes, nodesSizes }
