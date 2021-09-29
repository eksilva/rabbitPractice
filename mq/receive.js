// import amqp 
const amqp = require('amqplib/callback_api')

// open connection to channel and declare queue we want to consume message from
amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
        throw error0
    }

    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1
        }

        const queue = 'hello'

        channel.assertQueue(queue, {
            durable: false
        })

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C.", queue)

        channel.consume(queue, (msg) => {
            console.log(" [x] Received %s",msg.content.toString())
        }, {
            noAck: true
        })
    })
})