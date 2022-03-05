import React from "react";
import 'antd/dist/antd.min.css';
import { Layout, Space, Divider, Typography, Avatar, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons"
import ObjectTable from 'react-antd-object-table'
import Block from "./block";
import BlockForm from "./block-form";

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedBlockIdx: -1,
            blockDetails: {},
            addBlockVisible: false
        }
        // add genesis block
        var blk = new Block(0, 0, "genesis")
        this.blocksList = [blk]
        // add few blocks
        var data = ["kiran", "kiran"]
        data.forEach(val => {
            blk = new Block(this.blocksList.length,
                this.blocksList[this.blocksList.length - 1].hash, val)
            blk.mineBlock()
            this.blocksList.push(blk)
        })
    }

    renderBlockChainItem = (idx, block) => {
        // render each item in the block chain
        var size = 60
        var shape = "circle"
        var baseBlockStyle = {
            backgroundColor: "#338833",
            fontWeight: "block",
            cursor: "pointer"
        }
        var displayText = block.hash.slice(-5)
        var blockStyle = { ...baseBlockStyle }
        if (idx === this.state.selectedBlockIdx) {
            blockStyle = { backgroundColor: "#333388" }
        }
        shape = "circle"
        if (idx === 0) {
            // genesis block
            shape = "square"
            blockStyle.backgroundColor = "#883333"
            displayText = "Genesis"
        }
        return <Space key={idx} size="small">
            <Avatar size={size} style={blockStyle} shape={shape}
                onClick={() => this.selectBlock(idx)}>
                {displayText}
            </Avatar>
            <ArrowRightOutlined style={{ fontSize: "1.5em" }} />
        </Space>
    }

    renderBlockChain = () => {
        var blocks = this.blocksList.map((blk, idx) => {
            return this.renderBlockChainItem(idx, blk)
        })
        blocks.push(<Avatar key="add" size={60} shape="square"
            style={{ cursor: "pointer", backgroundColor: "blue" }}
            onClick={this.prepareToShowAddBlockForm}>Add Block</Avatar>)
        return <Space size="small">{blocks}</Space>
    }

    selectBlock = (idx) => {
        if (idx === 0 || idx === this.state.selectedBlockIdx) {
            this.setState({ blockDetails: {}, selectedBlockIdx: -1 })
        } else {
            this.setState({ blockDetails: this.blocksList[idx], selectedBlockIdx: idx })
        }
    }

    prepareToShowAddBlockForm = () => {
        this.setState({ addBlockVisible: true, blockDetails: {} })
    }

    renderAddBlockForm = () => {
        if (!this.state.addBlockVisible) {
            return null
        }
        var lastBlk = this.blocksList[this.blocksList.length - 1]
        return <BlockForm prevHash={lastBlk.hash}
            index={this.blocksList.length}
            difficulty="1"
            onSubmit={this.addBlockToBlockChain} />
    }

    addBlockToBlockChain = (block) => {
        this.blocksList.push(block)
        this.setState({ addBlockVisible: false })
    }

    renderSelectedBlock = () => {
        if (!this.state.blockDetails.hash) {
            return null
        }
        var prevHash = this.state.blockDetails.prevHash
        prevHash = <>
            {prevHash.slice(0, -5)}
            <Typography.Text type="danger" strong>{prevHash.slice(-5)}
            </Typography.Text>
        </>
        return <>
            <Typography.Title level={3}>Selected Block Details</Typography.Title>
            <ObjectTable data={[
                { label: 'Time Stamp', value: new Date(this.state.blockDetails.timestamp).toISOString() },
                { label: 'Previous Hash', value: prevHash },
                { label: 'Data', value: this.state.blockDetails.data },
                { label: 'Hash', value: this.state.blockDetails.hash },
                { label: 'Nonce', value: this.state.blockDetails.nonce },
                { label: 'Difficulty', value: this.state.blockDetails.difficulty },
            ]}
            />
        </>
    }

    render() {
        return <Layout style={{ padding: "25px 25px", backgroundColor: "white" }}>
            <Layout.Content>
                <Typography.Title level={3}>Block Chain</Typography.Title>
                {this.renderBlockChain()}
                <Divider />
                {this.renderSelectedBlock()}
                {this.renderAddBlockForm()}
            </Layout.Content>
        </Layout>
    }
}
