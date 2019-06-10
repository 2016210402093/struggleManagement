
import React from 'react';
import { Table, Divider, Button,Icon, Modal, Radio, Input } from 'antd'
import Search from './search.js'
import './user-manage.css'
import {url} from "../config";
import axios from 'axios'

const confirm = Modal.confirm;


class FileManage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            columns: [
                {
                    title: '文件名称',
                    dataIndex: 'filename',
                    key: 'filename',
                    sorter: (a, b) => a.filename.length - b.filename.length,
                    sortDirections: ['descend'],
                    render: text => <span>
                        <Icon type="file-pdf" className='pdf'/><a>{text}</a>,
                    </span>
                    
                },
                {
                    title: '文件简介',
                    dataIndex: 'fileInfo',
                    key: 'fileInfo',
                },
                {
                    title: '文件类别',
                    dataIndex: 'category',
                    key: 'category',
                },
                {
                    title: '上传时间',
                    dataIndex: 'upload_time',
                    key: 'upload_time',
                },
                {
                    title: '操作',
                    dataIndex: 'operation',
                    key: 'operation',
                    render: (text,record) => (
                        <span>
                            <a onClick={() => window.open(record.fileUrl)} > 查看 </a>
                            <Divider type="vertical" />
                            <a onClick={() => this.showDeleteConfirm(record.fileId)} className='delete'> 删除 </a>
                        </span>)
                },
            ],
            data: [],


            inputValue: "",
            perNum: 5,
            visible: false,
            typeValue: 1,
            fileContent: "",
            file: {}
        }
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);

        console.log(this.state.file, this.state.fileContent, this.state.typeValue);
        let formData = new FormData();
        formData.append("type", String(this.state.typeValue));
        formData.append("fileContent", this.state.fileContent);
        formData.append("userId", localStorage.getItem("userId"));
        formData.append("file", this.state.file);
        fetch(url+'file/addFile', {
            method: 'POST',
            body: formData
        }).then(res => res.text()).then(result => {
            this.getAllFileInfo();
            this.setState({
                visible: false,
            });
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    onChangeRadio = e => {
        this.setState({
            typeValue: e.target.value,
        });
    };

    onChangeFile = e => {
        this.setState({
            file: e.target.files[0],
        });
    };

    onChangeFileContent = e => {
        this.setState({
            fileContent: e.target.value,
        });
    };


    showDeleteConfirm = (fileId)=> {
        let that = this;
        confirm({
            title: '你想要删除该文件吗?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                //删除
                axios.post(url+'file/deleteFile',{
                    fileId: fileId
                }).then((r) => {
                    if(r.data.code === 1){
                        that.getAllFileInfo();
                    }
                });

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    getAllFileInfo= ()=>{
        axios.post(url+'file/fileList',{}).then((r) => {
            console.log(r);
            let data = [];
            for(let i=0; i<r.data.length; ++i){
                let category = "";
                if(r.data[i].FILE_TYPE === 1){
                    category = "政治"
                }
                else if (r.data[i].FILE_TYPE === 2){
                    category = "英语"
                }
                else if (r.data[i].FILE_TYPE === 3){
                    category = "数学"
                }
                else if (r.data[i].FILE_TYPE === 4){
                    category = "专业课"
                }
                data.push({
                    key: i,
                    fileId: r.data[i].FILE_ID,
                    filename: r.data[i].FILE_NAME,
                    fileInfo: r.data[i].FILE_CONTENT,
                    upload_time: r.data[i].CREATION_TIME,
                    fileUrl: r.data[i].FILE_URL,
                    category: category
                });
            }
            this.setState({data: data});
        });
    };

    changeUserPagePerNum = (number, inputValue) =>{
        this.setState({
            inputValue: inputValue,
            perNum: number
        });

        if(inputValue.length === 0){
            this.getAllFileInfo();
        }
        //模糊查询
        else {
            axios.post(url+'file/queryByFileName',{
                fileName: inputValue
            }).then((r) => {
                console.log(r);
                let data = [];
                for(let i=0; i<r.data.length; ++i){
                    let category = "";
                    if(r.data[i].FILE_TYPE === '1'){
                        category = "政治"
                    }
                    else if (r.data[i].FILE_TYPE === '2'){
                        category = "英语"
                    }
                    else if (r.data[i].FILE_TYPE === '3'){
                        category = "数学"
                    }
                    else if (r.data[i].FILE_TYPE === '4'){
                        category = "专业课"
                    }
                    data.push({
                        key: i,
                        fileId: r.data[i].FILE_ID,
                        filename: r.data[i].FILE_NAME,
                        fileInfo: r.data[i].FILE_CONTENT,
                        upload_time: r.data[i].CREATION_TIME,
                        fileUrl: r.data[i].FILE_URL,
                        category: category
                    });
                }
                this.setState({data: data});
            });
        }
    };

    componentDidMount(){
        // localStorage.setItem("selectedKeys", "6");
        // localStorage.setItem("openKeys", "sub2");
        this.getAllFileInfo();
    }

    render(){
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        return(
            <div>
                <Search changeUserPagePerNum = {this.changeUserPagePerNum}/>
                <div className='userHead'>
                    <div>
                        文件列表
                    </div>
                    <div className='userBtns'>
                        <Button onClick={this.showModal} type="primary" icon="plus-circle" className='adduser'>上传</Button>
                    </div>
                </div>
                <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} pagination={{
                    pageSize: this.state.perNum
                }}/>

                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >

                    <Input style={{marginBottom: "20px", height:"40px"}} type={"file"} onChange = {this.onChangeFile}/>
                    <Input style={{marginBottom: "20px"}} placeholder="文件介绍" onChange = {this.onChangeFileContent}/>
                    <Radio.Group onChange={this.onChangeRadio} value={this.state.typeValue}>
                        <Radio value={1}>政治</Radio>
                        <Radio value={2}>英语</Radio>
                        <Radio value={3}>数学</Radio>
                        <Radio value={4}>专业课</Radio>
                    </Radio.Group>
                </Modal>

            </div>
        )
    }
}
export default FileManage;