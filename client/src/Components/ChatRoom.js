import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import io from 'socket.io-client'
import Messages from './Messages'

class ChatRoom extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            newMessage: ''
        }

        // Передаем сокету порт, на котором работает сервер
        this.socket = io('http://localhost:3001')
        this.setNewMessage = this.setNewMessage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Когда компонент будет смонтирован, то пользователь прослушает
    // событие RECEIVE_MESSAGE, получив сообщение, которое будет 
    // добавлено в массив сообщений
    componentDidMount() {
        this.socket.on('RECEIVE_MESSAGE', message => {
            message.key = JSON.stringify(message)
            this.setState({messages: [...this.state.messages, message]})
        })
    }

    // Устанавливаем новое значение сообщения пользователя
    setNewMessage(event) {
        this.setState({
            newMessage: event.target.value
        })
    }

    // При отправке формы мы пускаем событие SEND_MESSAGE на сервер,
    // посылая объект, который содержит имя пользователя, его сообщение и время отправления
    handleSubmit(event) {
        event.preventDefault()
        this.socket.emit('SEND_MESSAGE', {
            name: this.props.name,
            message: this.state.newMessage,
            timeStamp: function() {
                const date = new Date()
                return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            }()
        })

        // Обнуляем сообщения
        this.setState({
            newMessage: ''
        })
    }


    render() {
        return (
            <div>
                <Alert variant="primary">
                    <Alert.Heading>Keep in mind!</Alert.Heading>
                    <p>Not talking to a person who is worthy of a conversation 
                       means losing a person. And to speak with a person who is 
                       not worthy of a conversation is to lose words. The wise 
                       do not lose either people or words.
                    </p>
                </Alert>
                <Form inline onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    as="textarea"
                                    rows="1"
                                    cols="30"
                                    style={{resize: "none"}}
                                    id="message"
                                    label="Message"
                                    placeholder="Enter your message"
                                    onChange={this.setNewMessage}
                                    value={this.state.newMessage}
                                    autoComplete="off"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Button 
                                type="submit"
                                style={{width: 100}}
                            >
                                Send
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>

                <Messages messages={this.state.messages} />
            </div>
        )
    }
}

export default ChatRoom