MongoDbTestHelper
===

install
```shell
$ npm install mongodb-test-helper --save-dev 
```

how use:
```javascript

const Factory = require("mongodb-test-helper")

const config = {
  url: "mongodb://localhost:27017/schema_test",
  collections: [
    "users", "accounts"
  ]
}

const helper = Factory(config)

co(function*() {

  // clear DB
  yield helper.clearDB()

  // insert one item in collection 
  yield helper.insert("users", { name: "luiz" })

  // insert multiple itens in collection
  yield helper.insert("users", [
    { name: "luiz" },
    { name: "ludmila" },
    { name: "margareth" },
  ])

  // provide your own _id
  yield helper.insert("users", { _id: 123, name: "luiz" })

  // retreine
  yield helper.find("users", { name: /l/ })
})

```