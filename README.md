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
  //{ _id: 59c470298b1c642db095c462", name: "luiz" } 
  
  
  // insert multiple itens in collection
  yield helper.insert("users", [
    { name: "luiz" },
    { name: "ludmila" },
    { name: "margareth" },
  ])

  /*
    [
      { _id: 59c470298b1c642db095c462", name: "luiz" },
      { _id: "59c470548b1c642db095c463" , name: "ludmila" },
      { _id: "59c470558b1c642db095c464" , name: "margareth" }
    ]
  */

  // provide your own _id
  yield helper.insert("users", { _id: 123, name: "luiz" })

  /*
    [
      { _id: '123', name: "luiz" },
    ]
  */


  // retreine
  yield helper.find("users", { name: /l/ })
})

```