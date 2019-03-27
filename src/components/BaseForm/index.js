import React, { Component } from 'react'
import { Form, Select, Button, DatePicker } from 'antd';

import moment from 'moment';



const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY/MM';

const FormItem = Form.Item;
const Option = Select.Option;


class FilterForm extends Component {

    handleReSet = () => {
        this.props.form.resetFields()
    }
    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    render() {
        const { getFieldDecorator } = this.props.form
        let formList = this.props.formList
        return (

            <Form layout="inline">


                {
                    formList.map((item) => {


                        if (item.type == "SELECT") {

                            let select =
                                <FormItem key={item.id} label={item.label} >
                                    {

                                        getFieldDecorator(item.field, {
                                            initialValue: item.initialValue
                                        })(

                                            <Select placeholder={item.placeholder} style={{ width: item.width }}>
                                                {
                                                    item.optionValues.map((optionItem) => {
                                                        return <Option key={optionItem.key} value={optionItem.key}>{optionItem.value}</Option>
                                                    })
                                                }
                                            </Select>
                                        )
                                    }
                                </FormItem>

                            return select
                        } else if (item.type == "TIME") {
                            let time = <div key={item.id} style={{display:"inline"}}>
                                <FormItem  >
                                    {
                                        getFieldDecorator("start_time", {
                                    
                                      
                                        })(
                                            <DatePicker placeholder={item.startPlaceholder} format={dateFormat}/>
                                        )
                                    }
                                </FormItem>

                                <FormItem >
                                    {
                                        getFieldDecorator("end_time",{
                                
                                            
                                        })(
                                            <DatePicker placeholder={item.endPlaceholder} format={dateFormat}/>
                                        )
                                    }
                                </FormItem>
                            </div>
                            return time
                        }
                    })
                }
                <FormItem >
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.handleReSet}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
export default Form.create()(FilterForm)