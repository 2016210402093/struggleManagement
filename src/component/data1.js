import React from 'react';
import './data1.css'
class Data extends React.Component {
    mapContent = (list) => {
        return (
            list.map((item, index) => {
                return (
                    <li key={index}>
                        <div className='content_1'>{item.content}</div>
                        <div className='data_1'>{item.number}</div>
                    </li>
                )
            })
        )
    };
    render() {
        let title = this.props.title, subtitle = this.props.subtitle, list = this.props.list;
        return (
            <div className='global'>
                <div className='subtitle'>
                    <div className='left-icons'></div>
                    <div className='sub-name'>{title}</div>
                </div>
                <div className='g-data'>
                    <div className='gray-head'>
                        <ul className='cont'>
                            <li><a>{subtitle}</a></li>
                        </ul>
                    </div>
                    <div className='body-content'>
                        <ul>
                            {this.mapContent(list)}
                        </ul>
                    </div>
                    <div className='notice'>
                        本页根据昨日数据来计算，而非实时数据。
                    </div>
                </div>
            </div>
        )

    }
}
export default Data;