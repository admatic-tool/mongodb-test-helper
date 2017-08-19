
const Factory = require("../index")

describe("MongodbTestHelper", () => {

  const config = {
    url: "mongodb://localhost:27017/schema_test",
    collections: [
      "users", "accounts"
    ]
  }

  const helper = Factory(config)
  
  before(function*() {
    yield helper.clearDB()
  })

  describe("#insertInCollection", () => {
    
    context("without _id", () => {
      let users

      before(function*() {
        yield helper.insert("users", { name: "luiz" })

        users = yield helper.find("users", { name: "luiz" })
      })

      it("shoulds user has inserted", () => {
        expect(users).to.be.not.empty
      })

      it("shoulds one user has inserted", () => {
        expect(users).to.be.lengthOf(1)
      })

      it("shoulds _id has a objectId", () => {
        users.forEach(user => {
          expect(user._id).to.match(/[a-z|0-9]{24}/)
        })
      })

    })

    context("with _id provided", () => {
      let accounts

      before(function*() {
        yield helper.insert("accounts", { _id: 123, name: "conta do luiz" })

        accounts = yield helper.find("accounts", { name: /luiz/ })
      })

      it("shoulds accounts has inserted", () => {
        expect(accounts).to.be.not.empty
      })

      it("shoulds one accounts has inserted", () => {
        expect(accounts).to.be.lengthOf(1)
      })

      it("shoulds _id has the _id provided", () => {
        accounts.forEach(account => {
          expect(account._id).to.be.eqls(123)
        })
      })

    })
  })
})