import React from 'react'
import { useState } from 'react';
import { Row, Col, Input, Typography, Button, Drawer, Divider, Radio, Form, Modal} from 'antd'
import { ReconciliationTwoTone,
         RightOutlined, 
         MinusCircleFilled, 
         PlusCircleFilled, 
         UpOutlined,
         EditOutlined,
         FieldBinaryOutlined,
         SnippetsOutlined,
         CalendarOutlined,
         InfoCircleOutlined,
         PictureOutlined,
         LinkOutlined,
         AccountBookOutlined,
         DeploymentUnitOutlined,
        } from '@ant-design/icons'
import BaseNode from '../Node/BaseNode';
import ConditionFlow from '../Node/ConditionFlow';
const { Text } = Typography;
// const steps = [
//     {
//       title: '基础设置',
//       content: 'First-content',
//     },
//     {
//       title: '流程设计',
//       content: 'Second-content',
//     },
//     {
//       title: 'Last',
//       content: 'Last-content',
//     },
//   ];
export default function NewOA() {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);  // 流程弹窗
    const [showModal, setShowModal] = useState(false);  // 分组弹窗
    const [modalValue, setModalValue] = useState(''); // 分组弹窗选中的值
    const [plus, setPlus] = useState(()=>()=>{console.log('set a func'); return 'res'})
    const [mode, setMode] = useState('simple');
    const [value, setValue] = useState([]);  // 设置输入框的默认值

    const handleModeChange = (e) => {
        setMode(e.target.value)
    }
    const onFinish = (value) => {
      // 保存表单
      console.log("value", value)
    }
    const setModal = (value) => {
      setShow(value)
    }
  return (
    <>
    <Form style={{width: 300}} onFinish={onFinish}>
        <Form.Item style={{marginTop: 10}} name='name'>
            <Row>
                <Col>
                    <ReconciliationTwoTone style={{marginTop: 9}} />
                </Col>
                <Col>
                    <Input placeholder="请输入审批单名称" bordered={false} />
                </Col>
            </Row>
        </Form.Item>
        {/* 添加字段 */}
        <Form.Item style={{marginTop: 30}}>
            <Text type="secondary">字段设置</Text> 
            <Form.Item style={{marginTop: 10}}>
                <Input defaultValue={'单行输入框'} style={{width: 200}} bordered={false}/>文本输入<RightOutlined style={{margin: '8px 0 0 0'}}/>
                <Divider style={{margin: 0}}/>
            </Form.Item>
            <Form.List name='names'
                    rules={[
                          {
                            validator: async (_, names) => {
                              if (!names || names.length < 1) {
                                return Promise.reject(new Error('At least 2 passengers'));
                              }
                            },
                          },
                        ]}
            >
                
            {(fields, { add, remove, move }, { errors }) => (
          <>
            {fields.map((field, index) => (
              
              <Form.Item key={field.key}>
                <Form.Item
                  noStyle
                >
                  <Input defaultValue={value[field.name]} prefix={<MinusCircleFilled style={{color: 'red', margin: '5px 5px 0 5px'}} onClick={()=>{remove(field.name)}}/>} style={{width: 200}} bordered={false}/>{value[field.key]}<RightOutlined style={{margin: '8px 0 0 0'}}/>
                  <Divider style={{margin: 0}}/>
                </Form.Item>
              </Form.Item>
            ))}
            <Form.Item>
                <Button type='text' onClick={() => {setOpen(true);setPlus(()=>{console.log("设置add函数"); return add})}}
                 style={{marginTop: 5, width: 200, textAlign: 'left'}} icon={<PlusCircleFilled style={{color: 'green'}}/>} block >添加字段</Button>
                <Divider style={{margin: 0}}/>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}    
            </Form.List>
            
        </Form.Item>
        <Form.Item style={{marginTop: 40}}>
        <Button type='text' style={{marginTop: 5,  textAlign: 'left'}} onClick={()=>setShow(true)} block>流程设计<RightOutlined style={{marginLeft: 170}}/></Button>
        </Form.Item> 
        <Form.Item style={{marginTop: 40}} name='choice'>
          <Button type='text' style={{marginTop: 5,  textAlign: 'left'}} onClick={()=>setShowModal(true)} block>选择分组<Text style={{marginLeft: modalValue===''? 170 : 110}}>{modalValue}<RightOutlined/></Text></Button>
        </Form.Item>    
        <Form.Item>
          <Button type='primary' htmlType='submit'>保存</Button>
        </Form.Item>
    </Form>
    <Drawer title='添加字段' open={open} placement={'bottom'} closeIcon={<UpOutlined />} onClose={()=>setOpen(false)}>
    <div  style={{margin: '0 0 10px 0'}}>
        <Text type="secondary">基础字段</Text>
    </div>
    <Row>
        <EditOutlined style={{marginTop: 8, color: 'blue'}}/><Button type='text' style={{marginLeft: 10}} onClick={(e)=>{setValue([...value, e.target.outerText]);plus();setOpen(false)}}>文本输入</Button>
    </Row>
    <Divider style={{margin: 0}}/>
    <Row>
        <FieldBinaryOutlined style={{marginTop: 8, color: 'blue'}}/><Button type='text' style={{marginLeft: 10}} onClick={(e)=>{setValue([...value, e.target.outerText]);plus();setOpen(false)}}>数字输入</Button>
    </Row>
    <Divider style={{margin: 0}}/>
    <Row>
        <SnippetsOutlined style={{marginTop: 8, color: 'blue'}}/><Button type='text' style={{marginLeft: 10}} onClick={(e)=>{setValue([...value, e.target.outerText]);plus();setOpen(false)}}>单选框</Button>
    </Row>
    <Divider style={{margin: 0}}/>
    <Row>
        <CalendarOutlined style={{marginTop: 8, color: 'blue'}}/><Button type='text' style={{marginLeft: 10}} onClick={(e)=>{setValue([...value, e.target.outerText]);plus();setOpen(false)}}>日期</Button>
    </Row>
    <Divider style={{margin: 0}}/>
    <Row>
        <InfoCircleOutlined style={{marginTop: 8, color: 'blue'}}/><Button type='text' style={{marginLeft: 10}} onClick={(e)=>{setValue([...value, e.target.outerText]);plus();setOpen(false)}}>说明文字</Button>
    </Row>
    <Divider style={{margin: 0}}/>
    <Row>
        <PictureOutlined style={{marginTop: 8, color: 'blue'}}/><Button type='text' style={{marginLeft: 10}} onClick={(e)=>{setValue([...value, e.target.outerText]);plus();setOpen(false)}}>图片</Button>
    </Row>
    <Divider style={{margin: 0}}/>
    <Row>
        <LinkOutlined style={{marginTop: 8, color: 'blue'}}/><Button type='text' style={{marginLeft: 10}} onClick={(e)=>{setValue([...value, e.target.outerText]);plus();setOpen(false)}}>附件</Button>
    </Row> 
    <Divider style={{margin: 0}}/>  
    <div  style={{margin: '10px 0'}}>
        <Text type="secondary">高级字段</Text>
    </div>
    <Row>
        <AccountBookOutlined style={{marginTop: 8, color: 'blue'}}/><Button type='text' style={{marginLeft: 10}} onClick={(e)=>{setValue(e.target.outerText);plus();setOpen(false)}}>金额</Button>
    </Row>
    <Divider style={{margin: 0}}/> 
    <Row>
        <DeploymentUnitOutlined style={{marginTop: 8, color: 'blue'}}/><Button type='text' style={{marginLeft: 10}} onClick={(e)=>{setValue(e.target.outerText);plus();setOpen(false)}}>部门</Button>
    </Row>
    </Drawer>
    <Drawer title='流程设置' open={show} onClose={()=>setShow(false)} width='55%'>
    <Radio.Group
        onChange={handleModeChange}
        value={mode}
        style={{
            marginBottom: 8,
            textAlign: 'center'
        }}
    >
        <Radio.Button value="simple">简单流程</Radio.Button>
        <Radio.Button value="condition">条件流程</Radio.Button>
    </Radio.Group>
      {mode==='simple' ? 
                        <>
                          <BaseNode show={(value)=>setModal(value)}/>
                          <Button onClick={()=>setShow(false)}>取消</Button>
                        </>
                        :
                        <>
                          <ConditionFlow show={(value)=>setModal(value)}/>
                          <Button onClick={()=>setShow(false)}>取消</Button>
                        </>}
    </Drawer>
    <Modal title='选择分组' open={showModal} onCancel={()=>setShowModal(false)} onOk={()=>{setShowModal(false)}}>
        <Row>
          <Button type='text' onClick={(e)=>{setModalValue(e.target.outerText); setShowModal(false)}}>假勤管理</Button>
        </Row>
        <Row>
          <Button type='text' onClick={(e)=>{setModalValue(e.target.outerText); setShowModal(false)}}>人事管理</Button>
        </Row>
        <Row>
          <Button type='text' onClick={(e)=>{setModalValue(e.target.outerText); setShowModal(false)}}>智能财务</Button>
        </Row>
        <Row>
          <Button type='text' onClick={(e)=>{setModalValue(e.target.outerText); setShowModal(false)}}>行政管理</Button>
        </Row>
        <Row>
          <Button type='text' onClick={(e)=>{setModalValue(e.target.outerText); setShowModal(false)}}>业务管理</Button>
        </Row>
        
    </Modal>
</>
  )
}
