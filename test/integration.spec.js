
const Factory = require("../index")

describe("MongodbTestHelper", () => {

  const config = {
    url: "mongodb://localhost:27017/schema_test",
    collections: [
      "users", "accounts"
    ]
  }

  const helper = Factory(config)
  

  describe("#insert", () => {
    
    context("without _id", () => {

      let user

      before(function*() {
        yield helper.clearDB()        
        user = yield helper.insert("users", { name: "luiz" })
      })


      it("shoulds _id has a objectId", () => {
        expect(user._id).to.match(/[a-z|0-9]{24}/)
      })

    })

    context("with _id provided", () => {
      let account

      before(function*() {
        yield helper.clearDB()                
        account = yield helper.insert("accounts", { _id: 123, name: "conta do luiz" })
      })

      it("shoulds _id has the _id provided", () => {
        expect(account._id).to.be.eqls(123)
      })
    })
  })

  describe("#removeAll", () => {
    let account
    
    before(function*() {
      yield helper.clearDB()
      account = yield helper.insert("accounts", { _id: 24, name: "xxx" })
      expect(account).to.be.eqls({ _id: 24, name: "xxx" })

      const res = yield helper.removeAll("accounts")
      accounts =  yield helper.find("accounts")
    })

    it("shoulds remove docs from collection", () => {
      expect(accounts).to.be.lengthOf(0)        
    })
  })
})