let estaInicializado = false
const conexiones = []
const MessageService = require('./MessageService')

class WebSocketService {
  static inicializar() {
    if (estaInicializado) {
      throw new Error('Ya estaba inicializado.')
    }
    const http = require('http')
    const WebSocketServer = require('websocket').server
    const server = http.createServer()
    server.listen(9898)

    const wsServer = new WebSocketServer({
      httpServer: server,
    })

    wsServer.on('request', async (request) => {
      const connection = request.accept(null, request.origin)
      console.log(`Connection from ${request.origin} accepted`)
      conexiones.push(connection)

      const mensajes = await MessageService.getInstance().list()
      const result = {
        wsType: 'chatsArray',
        payload: mensajes,
      }

      connection.sendUTF(JSON.stringify(result))

      connection.on('message', async (message) => {
        console.log('Received Message: ', message.utf8Data)
        // le agrego la fecha y lo vuelvo a mandar
        const objetoMensaje = JSON.parse(message.utf8Data)
        objetoMensaje.fechaYHora = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`

        await MessageService.getInstance().insert({
          email: objetoMensaje.email,
          type: objetoMensaje.type,
          fechaYHora: objetoMensaje.fechaYHora,
          body: objetoMensaje.body,
        })

        this.enviarDatos(objetoMensaje)
      })

      connection.on('close', () => {
        console.log('Client has disconnected')

        // El codigo siguiente es para eliminar una conexión de la lista, porque se desconectó el cliente, ya no necesito tenerlo
        const index = conexiones.indexOf(connection)
        conexiones.splice(index, 1)
      })
    })

    console.log('Web socket iniciado')
  }

  static enviarDatos(datos) {
    conexiones.forEach((connection) => {
      const datosEnString = JSON.stringify(datos)
      connection.sendUTF(datosEnString)
    })
  }
}

module.exports = WebSocketService
