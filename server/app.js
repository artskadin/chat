const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// Реагируем на действие "connection (подключился)" с клиентской,
// стороны, сохраняя пользователя в объект socket
io.on('connection', socket => {
    console.log(`User connected. ID is ${socket.id}`)
    
    // Реагируем на отключение пользователя
    socket.on('disconnect', () => {
        console.log('User disconnected')
    })

    // Получаем с клиентской стороны сообщение пользователя
    socket.on('SEND_MESSAGE', data => {
        
        // Пускаем полученное сообщение остальным пользователям
        io.emit('RECEIVE_MESSAGE', data)
    })

})

// Устанавливаем порт, на котором будет работать сервер
const PORT = 3001
server.listen(PORT, () =>{
    console.log(`Server has been started on port ${PORT}...`)
}) 