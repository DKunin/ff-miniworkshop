const express = require('express')

const getProductsQuery = 'SELECT * FROM products'

class ProductsHandler {
  constructor (db, logger) {
    this.db = db
    this.logger = logger || console;
  }

  getRouter () {
    const router = express.Router()
    router.get('/', this.getProducts.bind(this))
    return router
  }

  getProducts (req, res) {
    this.logger.debug({reqId: req.id}, 'trying to get products from database')
    this.db.query(getProductsQuery)
      .then((products) => {
        this.logger.info('successfully fetched prodcuts')
        res.json(products)
      })
      .catch((err) => {
        this.logger.error(err)
        res.sendStatus(500)
      })
  }
}

module.exports = ProductsHandler
