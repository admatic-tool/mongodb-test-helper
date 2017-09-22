"use strict"

const co = require("co")
const mongodb = require("mongodb")
const Promise = require("bluebird")

const { ObjectID } = mongodb
const MongoClient = Promise.promisifyAll(mongodb.MongoClient)

module.exports = (config) => {

  return {
    config,

    _transformInsert: res => {
      return res.ops.map(o => { 
        debugger
        if(!o._id.split && isNaN(o._id))
        o._id = o._id.toString()
        return o  
      })
    },

    _getConnection: co.wrap(function*() {
      const { url } = this.config
      if(this.conn) {
        return this.conn
      } else {
        this.conn = yield MongoClient.connectAsync(url)
        return this.conn
      }
    }),

    clearDB: co.wrap(function*(){

      const conn = yield this._getConnection()
      const { collections } = this.config
      for (const collectionName of collections) {
        yield conn.collection(collectionName).remove({})
      }
      return Promise.resolve(true)
    }),

    removeAll: co.wrap(function*(collectionName) {
      const conn = yield this._getConnection()

      return conn.collection(collectionName)
                 .remove()
                 .then(() => true)
                 .catch(() => false)
    }),

    insert: co.wrap(function*(collectionName, documents) {
      const conn = yield this._getConnection()

      if (documents.map) {
        /* gen ObjectIds  */
        const docs = documents.map(doc => {
          if(!doc._id)
            doc._id = new ObjectID(doc._id)
          return doc
        })

        return conn
               .collection(collectionName)
               .insert(docs)
               .then(res => this._transformInsert(res))
               .catch(() => false)
               
      } else {

        const doc = documents

        /* gen ObjectId  */
        if(!doc._id)
          doc._id = new ObjectID(doc._id)

        return conn
               .collection(collectionName)
               .insert(doc)
               .then(res => this._transformInsert(res)[0] )
               .catch(() => false)
               
      }
    }),

    find: co.wrap(function*(collectionName, attrs) {

      const conn = yield this._getConnection()

      return conn.collection(collectionName)
                 .find(attrs)
                 .toArray()
    }),
  }
}