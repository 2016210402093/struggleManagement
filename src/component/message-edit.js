
import React from 'react';
import Search from './search.js'
import Message from './message.js'
import Edit from './edit-message.js'
import head from './head.js';
import { Modal } from 'antd';
import axios from 'axios'
import {url} from "../config";

const confirm = Modal.confirm;

class MessageEdit extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            inputValue: "",
            perNum: 5,
            data: []
        }
    }


    showDeleteConfirm = (infoId)=> {
        let that = this;
        confirm({
            title: '你想要删除此推送吗?',
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios.post(url+'info/deleteInfo',{
                    infoId: infoId
                }).then((r) => {
                    if(r.data.code === 1){
                        that.getAllSchoolInfo();
                    }
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    changeUserPagePerNum = (number, inputValue) =>{

        console.log(inputValue)

        this.setState({
            inputValue: inputValue,
            perNum: number,
        });

        if (inputValue.length === 0) {
            this.getAllSchoolInfo();
        }
        //模糊查询
        else {
            axios.post(url + 'info/queryByInfoTitle', {
                infoTitle: inputValue
            }).then((r) => {
                console.log(r);
                let data = [];
                for (let i = 0; i < r.data.length; ++i) {
                    data.push({
                        key: i,
                        infoId: r.data[i].INFO_ID,
                        title: r.data[i].INFO_TITLE,
                        description: r.data[i].INFO_SUBTITLE,
                        likeNum: r.data[i].LIKE_NUMBER,
                        imgUrl: 'http://47.102.199.210:9900/'+r.data[i].IMG_URL,
                        creationTime: r.data[i].CREATION_TIME,
                    });
                }
                this.setState({data: data});
            });
        }
    };

    componentDidMount() {
        // localStorage.setItem("selectedKeys", "7");
        // localStorage.setItem("openKeys", "sub2");
        this.getAllSchoolInfo();
    }

    getAllSchoolInfo= ()=>{
        axios.post(url+'info/infoList',{}).then((r) => {
            console.log(r);
            let data = [];
            for(let i=0; i<r.data.length; ++i){
                data.push({
                    key: i,
                    infoId: r.data[i].INFO_ID,
                    title: r.data[i].INFO_TITLE,
                    description: r.data[i].INFO_SUBTITLE,
                    likeNum: r.data[i].LIKE_NUMBER,
                    imgUrl: 'http://47.102.199.210:9900/'+r.data[i].IMG_URL,
                    creationTime: r.data[i].CREATION_TIME,
                });
            }
            this.setState({data: data});
        });
    };


    render(){
        return(
            <div>
               
                <Edit changeUserPagePerNum={this.changeUserPagePerNum}/>
                <Search changeUserPagePerNum = {this.changeUserPagePerNum}/>
                <Message perNum={this.state.perNum} infoList={this.state.data} showDeleteConfirm={this.showDeleteConfirm}/>
            </div>
        )
    }
}
export default MessageEdit;