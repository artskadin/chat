import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Messages extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
            {this.props.messages.map(message => {
                return (
                    <div key={message.key}>
                        <br />
                        <br />
                        <Row>
                            <Col md={8}>
                                <p style={{fontWeight: 600}}>{message.name}</p>
                            </Col>
                            <Col md={4}>
                                <p>{message.timeStamp}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={9}>
                                <p>{message.message}</p>
                            </Col>
                        </Row>
                        <hr />
                    </div>
                )
            })}
      </Container>
    )
  }
}

export default Messages