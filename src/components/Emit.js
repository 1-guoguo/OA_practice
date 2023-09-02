import React, { useState } from 'react'
import { Button, Row, message, Form, Input, Divider } from 'antd'

export default function Emit() {
    const [status, setStatus] = useState('提交审批单')
    const [show, setShow] = useState()
    const [formLimit, setFormLimit] = useState()  // 表单操作权限
    const onShenPiClick = () => {
        // 先判断提交的单子是什么类型，从后台找出该单子的流程数据
        // 点击之后开始处理流程
        // 首先读入json数据或者json文件
        const {edges, nodes} = JSON.parse(sessionStorage.getItem('nodeData'))
        console.log("flow", edges, nodes)
        // 简单流程
        // 设置一个变量记录目标结点Id，初始值为0
        var targetId;
        // var targetNode = new Object()
        for (let i in nodes){
            if (nodes[i]['properties']['name'] === '发起人'){
                // 将进行下一流程
                // 进行流程判断
                // 首先找到该结点对应的边，然后找到目标结点，通过id进行判断
                var sourceId = nodes[i]["id"]
                for (let j in edges){
                    if (sourceId === edges[j]["sourceNodeId"]){
                        // 得到目标结点
                        targetId = edges[j]["targetNodeId"]
                    }
                }
            }
        }
        // 根据得到的目标节点Id找到node
        for (let i in nodes){
            if(nodes[i]["id"] === targetId){
                const targetNode = nodes[i]
                console.log(targetNode)
                const properties = targetNode["properties"]
                // 获得目标节点的属性名称， 如果是审批节点，再根据条件进行限定
                if ( properties["name"] === '审批人'){
                    // 如果审批类型是人工审批，就提交给下一级；如果是自动审批，就定时1min后提示审批通过
                    if (properties["shenpi_type"] === '人工审批' ){
                        // 通过shenpi来决定传送给哪个人
                        message.success(`审批单已经提交给${properties['shenpi']}`)
                        setStatus('审批中...')
                        setShow(true)
                        setFormLimit(properties["shenpi_limit"])
                    }
                    else if (properties["shenpi_type"] === '自动通过'){
                        // 定时
                        setTimeout(()=>{
                            message.success("审批已通过")
                            setStatus('审批通过')
                        }, 500)
                        setShow(false)
                        // 审批单抄送给抄送人
                    }
                    else{
                        // 定时
                        setTimeout(()=>{
                            message.error("已拒绝")
                            setStatus('已拒绝')
                        }, 500)
                        // 审批单抄送给抄送人
                        setShow(false)

                    }
                }

            }
        }


    }
    // 下一级审批，审批单过来的时候，处理该流程的节点
    const onClick = (value) => {
        // 首先根据发起人名字和流程类型找到所属流程, 只有人工审批的单子才会传过来
        // 这里假设只有一个流程
        const {edges, nodes} = JSON.parse(sessionStorage.getItem('nodeData'))
        console.log("flow", edges, nodes)
        // 找到节点名字为“审批人”的
        var targetId
        for (let i in nodes){
            if (nodes[i]["properties"]["name"] === '审批人') {
                // 填写审批意见并返回给发起人
                console.log("审批结果: ", value)
                setStatus(value['result'])
                // 记录节点id，找到下一节点
                const sourceId = nodes[i]["id"]
                for (let j in edges){
                    if (edges[j]["sourceNodeId"] === sourceId){
                        targetId = edges[j]["targetNodeId"]
                    }
                }
            }
        }
        // 如果下一个节点是抄送人
        // 根据得到的目标节点Id找到node
        for (let i in nodes){
            if(nodes[i]["id"] === targetId){
                const targetNode = nodes[i]
                console.log(targetNode)
                if (nodes[i]["properties"]["name"] === "抄送人"){
                    setShow(false)
                    message.success('抄送人已查看')
                }
            }
        }
        
    }
    // 作为抄送人收到审批单
    const cc = () => {
        message.success('抄送人已查看')
    }
    const { edges, nodes} = JSON.parse(sessionStorage.getItem('nodeData'))
    // 使用邻接表构建映射关系
    const flowMap = new Object()
    const quene = []
    // 根据类型判断
    const judgeType = (node, type, condition) => {
        if (type === 'faqi'){
            console.log("发起人已经发起审批")
            for (let i in flowMap[node]){
                quene.push(flowMap[node][i])
            }
        }
        if (type === 'shenpi'){
            for (let i in nodes){
                if (node === nodes[i]["id"]){
                    console.log(nodes[i]["properties"]['shenpi_type'])
                }
            }
            console.log("审批人已处理")
            for (let i in flowMap[node]){
                quene.push(flowMap[node][i])
            }
        }
        if (type === 'chaosong'){
            console.log("抄送人已查看")
            for (let i in flowMap[node]){
                quene.push(flowMap[node][i])
            }
        }
        if (type === 'space'){
            console.log("流程结束")
        }
        if (type === 'conditionNode'){
            for (let inx in edges){
                if (node === edges[inx]["sourceNodeId"]){
                    // 得到分支上的文字
                    var text
                    if (condition > 3){
                        text = '是'
                    }else if(condition < 3) {
                        text = '不是'
                    }
                    if (text === edges[inx]["text"]["value"]){
                        // 执行左边分支
                        // 将左边分支的目标id放入队列
                        console.log("woshi 1")
                        console.log(edges[inx]["targetNodeId"])
                        quene.push(edges[inx]["targetNodeId"])
                    }
                    else if (text === edges[inx]["text"]["value"]){
                        // 执行右边分支
                        // 将右边分支的目标id放入队列
                        console.log("woshi 2")
                        console.log(edges[inx]["targetNodeId"])
                        quene.push(edges[inx]["targetNodeId"])
                    }
            }
        }     
    }
}
    const judgeType2 = (node, type, param) => {
    if (type === 'faqi'){
        console.log("发起人已经发起审批")
        for (let i in flowMap[node]){
            quene.push(flowMap[node][i])
        }
    }
    if (type === 'shenpi'){
        
        for (let i in nodes){
            if (node === nodes[i]["id"]){
                if (nodes[i]["properties"]['shenpi_type'] === '自动拒绝'){
                    param.refuse = param.refuse + 1
                }
                console.log(nodes[i]["properties"]['shenpi_type'])
            }
        }
        console.log("审批人已处理")
        for (let i in flowMap[node]){
            if (!quene.includes(flowMap[node][i])){
                quene.push(flowMap[node][i])
            }
            
        }
    }
    if (type === 'chaosong'){
        console.log("抄送人已查看")
        for (let i in flowMap[node]){
            quene.push(flowMap[node][i])
        }
    }
    if (type === 'conditionNode'){
        for (let inx in edges){
            if (node === edges[inx]["sourceNodeId"]){
                // 得到分支上的文字
                var text
                if (param.refuse > 0){
                    text = '是'
                }else{
                    text = '否'
                }
                if (text === edges[inx]["text"]["value"]){
                    // 执行左边分支
                    // 将左边分支的目标id放入队列
                    console.log(`有${param.refuse}个审核人拒绝`)
                    quene.push(edges[inx]["targetNodeId"])
                }
                else if (text === edges[inx]["text"]["value"]){
                    // 执行右边分支
                    // 将右边分支的目标id放入队列
                    console.log("审核通过")
                    quene.push(edges[inx]["targetNodeId"])
                }
        }
    }     
}
}
    // 复杂流程
    const flow  = (value) => {
        for (let i in nodes){
            const sourceId = nodes[i]["id"]
            // console.log("sourceId", sourceId)
            const targetId = new Array()
            for (let j in edges) {
                if (sourceId === edges[j]["sourceNodeId"]){
                    targetId.push(edges[j]["targetNodeId"])
                }
            }
            flowMap[sourceId] = targetId
            // console.log("targetId", targetId)
        }
        console.log("flowMap", flowMap)
        // 找到入度为0的作为根节点
        var rootNode;
        for (let index in flowMap){
            // 遍历后边的邻接点，
            const node = index
            var num = 0
            for ( let ind in flowMap){
                if (flowMap[ind].includes(node)){
                    // console.log("sdsfsf:", `${node}`)
                    num = num + 1
                }
            }
            if (num === 0){
                rootNode = node
                break
            }
        }
        console.log(rootNode)
        // 已经有了根节点id，开始执行根节点
        // 根节点的邻接点加入搜索队列
        quene.push(rootNode)
        console.log("quene", quene)
        let param = {
            refuse: 0
        }
        const masked = new Int32Array()  // 记录节点是否已经被访问
        // console.log("masked", masked)
        while (quene.length !== 0){
            let vNode = quene.shift()  // 出队操作
            if (masked[vNode] === 1){
                // 意味着该结点被访问过了，图中形成了回路，停止循环并提示
                message.warning('流程中出现错误，请管理员检查后重新申请')
                break
            }else{
                masked[vNode] = 1  // 结点被访问
            }
            // console.log("######maks", masked)
            // 遍历结点对象，检查结点类型
            let nodeType
            for (let inx in nodes){
                // 根据结点id得到结点类型
                if (vNode === nodes[inx]["id"]){
                    nodeType = nodes[inx]["type"]
                    break
                }
            }
            if (value){
                judgeType(vNode, nodeType, value['condition'])
            }else{
                
                judgeType2(vNode, nodeType, param)
            }
            console.log(quene)
            
        }
        console.log("流程结束")
        console.log("quene", quene)
    }
  return (
    <>
    <div>
        发起审批
        <Row>
            <Button onClick={onShenPiClick}>{status}</Button>
        </Row>
        <Row>
        {show ? 
                <>
                    <Form onFinish={onClick}>
                    表单操作权限：{formLimit}
                        <Form.Item label='审批结果' name='result'>
                            <Input></Input>
                        </Form.Item>
                        <Button type='primary' htmlType='submit'>提交审批结果</Button>
                    </Form>
                    
                </>
              : 
                <Button onClick={cc}>抄送人</Button>}
        </Row>
        
    </div>
    <Divider />
    <div>
        复杂流程
        <Form onFinish={flow}>
                        <Form.Item label='请假天数' name='condition'>
                            <Input></Input>
                        </Form.Item>
                        <Button type='primary' htmlType='submit'>发起审批</Button>
                    </Form>
        {/* <Button onClick={flow}>执行</Button> */}
    </div>
    <Divider />
    <div>
        并行审核
        <Button onClick={()=>{flow()}}>提交审核</Button>
    </div>
    </>
  )
}
