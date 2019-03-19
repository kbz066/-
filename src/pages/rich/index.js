import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


export default class RichText extends Component {


    state = {
        showModal:false,
        editorState: EditorState.createEmpty(),
    }


    handleClearContent = () => {
        this.setState({
            editorState: EditorState.createEmpty(),
        })
    }

    handleGetText = () => {
        this.setState({
            showModal:true,
        })
    }
    onEditorStateChange=(editorState)=>{

        this.setState({
            editorState
        })
    }
    onContentStateChange=(editorContent)=>{
       // console.log(editorContent)
    }

    render() {

        const { editorState } = this.state;
        return (
            <div>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText} style={{marginLeft:10}}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                    
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onContentStateChange={this.onContentStateChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                    {/* <textarea
                        disabled
                        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    /> */}
                    {/* {
                        console.log("objgetCurrentContent     ", editorState.getCurrentContent())
                    } */}
                </Card>
       
                <Modal
                        title="内容"
                        visible={this.state.showModal}
                        footer={null}
                        onCancel={
                            () => {
                                this.setState({
                                    showModal: false
                                })
                            }
                        }
                    >
                        {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    </Modal>
            </div>

        );
    }
}