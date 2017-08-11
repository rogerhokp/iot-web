// @flow 
import React from 'react';
import Row from './row.jsx';
import style from './style.jsx';

type Props = {
    temperature: number,
    mh: number,
    craetedAt: string
};

export default class StyledRow extends React.Component {
    props: Props;


    render() {
        // this.test() * 2;
        return <Row
            temperature={this.props.temperature}
            mh={this.props.mh}
            craetedAt={this.props.craetedAt}
            style={{
                row: style.rowStyle,
                cell: style.cellStyle,
                time: style.timeStyle,
                icon: style.iconStyle,
                iconCol: style.iconColStyle,
                timeCol: style.timeColStyle
            }} ></Row>
    }

    // test() {
    //     if (true) {
    //         return '';
    //     }
    //     return null;
    // }
}