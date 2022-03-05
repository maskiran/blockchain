import React from 'react'
import { Button, Form, Input, Space } from 'antd'
import Block from './block'

export default class BlockForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            miningStarted: false
        }
    }

    handleInputChange = (varName, inputFldName) => {
        this.setState({ [varName]: inputFldName.value })
    }

    mineBlock = (formData) => {
        this.setState({ miningStarted: true })
        var block = new Block(this.props.index, this.props.prevHash,
            formData.data, formData.difficulty)
        block.mineBlock()
        this.setState({ miningStarted: false })
        this.props.onSubmit(block)
    }

    render() {
        var values = {
            data: `sample data for ${this.props.index}`,
            difficulty: this.props.difficulty
        }
        var buttonDisabled = this.state.miningStarted ? true : false
        return <Form layout="vertical" onFinish={this.mineBlock} initialValues={values}>
            <Form.Item label="Difficulty" name="difficulty">
                <Input placeholder="Difficulty" />
            </Form.Item>
            <Form.Item label="Data" name="data">
                <Input.TextArea placeholder="Data" rows={5} />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button htmlType="submit" type="primary" size="middle"
                        disabled={buttonDisabled}>
                        Mine Block
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    }
}