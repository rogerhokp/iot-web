// @flow weak
import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import moment from 'moment';

type Props = {
    temperature: number,
    mh: number,
    craetedAt: string,
    style: {
        row: any,
        cell: any,
        time: any,
        icon: any,
        iconCol: any,
        timeCol: any
    }
};

export default class Row extends React.Component {
    props: Props;


    constructor(props: Props) {
        super(props);
    }

    render() {

        const createdAt = moment(this.props.craetedAt);

        const hour = createdAt.hours();

        let lensStyle = Object.assign(
            {},
            this.props.style.cell,
            { color: '#FF3333', paddingLeft: 0, paddingRight: 0 }
        );

        lensStyle.color = '#00FF80';//normal


        let icon = <i className="material-icons">brightness_5</i>; //morning
        if (hour > 12 && hour < 18) {
            icon = <i className="material-icons">wb_sunny</i>;//afternoon
        } else if (hour >= 18 || hour <= 6) {
            icon = <i className="material-icons">brightness_2</i>;//night
        }

        const style = this.props.style;

        return (
            <TableRow style={style.row}>
                <TableRowColumn style={style.iconCol} >{icon}</TableRowColumn>
                <TableRowColumn style={style.timeCol} >
                    <div>{createdAt.fromNow()}</div>
                    <div style={style.time}>{createdAt.format('lll')}</div>
                </TableRowColumn>
                <TableRowColumn style={Object.assign({}, style.cell, { padding: '10px 0 10px 10px' })} >
                    {this.props.temperature}
                </TableRowColumn>
                <TableRowColumn style={Object.assign({}, style.cell, { padding: '10px 0 10px 10px' })} >
                    {this.props.mh}
                </TableRowColumn>
 
            </TableRow>
        )
    }
}