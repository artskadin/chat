import React from 'react'
import ChatName from './ChatName'
import ChatRoom from './ChatRoom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Chat extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: null
        }
        
        // Задаем методу контекст через bind
        this.handleSubmitName = this.handleSubmitName.bind(this)
    }

    // Меняем внутреннее состояние name
    handleSubmitName(name) {
        this.setState({
            name: name
        })
    }

    render() {
        return(
            // Если первое значение true, то вернется второе, иначе первое
            // В компонент ChatName передаем callback "handleSubmitName" как свойство
            <Container fluid>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        {!this.state.name && <ChatName handleSubmitName={this.handleSubmitName} />}
                        {this.state.name && <ChatRoom name={this.state.name} />}
                    </Col>
                </Row>
            </Container>
        )
    }

}

export default Chat