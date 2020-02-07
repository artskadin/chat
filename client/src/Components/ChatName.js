import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'


class ChatName extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: null
        }

        // задаем методам контекст через bind
        this.setName = this.setName.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Берем из формы имя пользователя и кладем в свойство name,
    // меняя внутренее состояние через this.setState
    setName(event) {
        this.setState({
            name: event.target.value
        })
    }

    // 
    handleSubmit(event) {
        // Отменяем действие браузера 
        event.preventDefault()
        // Как только форма отправляется, мы передаем имя пользователя
        // компоненту-родителю Chat
        this.props.handleSubmitName(this.state.name)
    }

    render() {
        return (
            <Jumbotron fluid>
                <Container>
                    <h1>Welcome to my simple chat</h1>
                    <p>
                    Just write your username, choose a room and start chatting!
                    </p>
                    <br />
                    <Form inline onSubmit={this.handleSubmit}>
                        <Container>
                            <Row>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control 
                                        id="name"
                                        type="text" 
                                        label="name"
                                        placeholder="Enter your username" 
                                        onChange={this.setName}
                                        autoComplete="off"
                                        style={{width: 250}}/>
                                </Form.Group> 
                            </Row>
                            <br />
                            <Row>
                                <Button 
                                    style={{width: 100}} 
                                    variant="primary" 
                                    type="submit">Enter</Button>
                            </Row>
                        </Container>
                    </Form>
                </Container>
            </Jumbotron>
        )
    }
}

export default ChatName