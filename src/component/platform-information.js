import React from 'react';
import { Input} from 'antd';
import './platform-imformation.css'
const { TextArea } = Input;

class Information extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        // localStorage.setItem("selectedKeys", "8");
        // localStorage.setItem("openKeys", "sub2");
    }

    render() {
        return (
            <div className='information-g'>
                <div>平台名称：<span>考研学习网站</span></div>
                <div>成立时间：<span>2019.5.2</span></div>
                <div>联系人：<span>cjm xwy zzh</span></div>
                <div>
                    联系电话：<Input disabled placeholder='15990020548' />
                </div>
                <div>
                    所在区域：<Input disabled placeholder='浙江杭州' />
                </div>
                <div>详细地址：<TextArea  disabled rows={4} placeholder='杭州师范大学仓前校区勤园' /></div>
            </div>
        )

    }

}
export default Information 