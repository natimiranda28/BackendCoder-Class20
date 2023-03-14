const socket = require('socket.io')
const productManager = require('./ProductManager')

let io

const connectSocket = (httpServer) => {
	io = socket(httpServer)
	io.on('connection', async (socket) => {
		console.log('Nuevo cliente conectado!')
		const products = await productManager.getProducts()
		socket.emit('init-products', { products })
	})
}

const emitAddProduct = (newProduct) => {
	console.log(`Se ha agregado el producto: ${JSON.stringify(newProduct)}`)
	io.emit('add-product', newProduct)
}

module.exports = { connectSocket, emitAddProduct }
