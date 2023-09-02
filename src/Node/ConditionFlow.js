import LogicFlow from "@logicflow/core";
import { Menu } from "@logicflow/extension";
import { DndPanel, SelectionSelect } from '@logicflow/extension';
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";
import { lfJson2Xml, lfXml2Json } from "@logicflow/extension";
import React from 'react'
import { saveAs } from "file-saver";
import { useEffect, useRef, useState } from "react";
import { Modal, Button, Table, Radio, Row, Col, Typography, Select } from "antd";
import { v4 as uuid } from "uuid";
import faqi from "../components/registerNode/registerFaQi";
import shenpi from "../components/registerNode/registerShenPi";
import chaosong from "../components/registerNode/registerChaoSong";
import space from "../components/registerNode/registerNode";
import conditionNode from "../components/registerNode/registerCondition";
import CustomEdge from '../components/registerEdge/NewEdge';
const { Title, Text } = Typography
const { Option } = Select
const columns = [
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '是否管理员',
    dataIndex: 'manage',
    key: 'manage',
  },
]
// 指定人表格数据
const data = [
  {
    key: '1',
    name: 'John Brown',
    manage: '管理员',
  },
  {
    key: '2',
    name: 'Jim Green',
    manage: '管理员',
  },
]
// 流程图数据
const data1 = {
  nodes: [
    {
      id: "3",
      type: "faqi",
      x: 200,
      y: 200,
      properties: {
        name: '发起人',
        faqi_type: '公司1',
      }
    // text: { x: 200, y: 200, value: '审批人' },
    },
    {
        id: "4",
        type: "space",
        x: 200,
        y: 300,
        text: { x: 200, y: 300, value: '流程结束' },
      },
  ],
  edges: [
    {
      id: "edge_id_1",
      sourceNodeId: "3",
      targetNodeId: "4",
      type: "polyline"
    },
    // {
    //   id: "edge_id_2",
    //   sourceNodeId: "4",
    //   targetNodeId: "5",
    //   type: "CustomEdge"
    // }
  ]
}
const value = ['人工审批', '自动通过', '自动拒绝', '指定人', '发起人主管', '发起人自选', '可编辑', '只读', '隐藏']
export default function ConditionFlow(props) {
  console.log(props)
  const refContainer = useRef();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [openFa, setOpenFa] = useState(false);  // 发起人
  const [openShen, setOpenShen] = useState(false);  // 审批人
  const [openChao, setOpenChao] = useState(false);  // 抄送人
  const [openId, setOpenId] = useState(0);  // 设置当前点击节点的id
  const [selectedName, setSelectedName] = useState([]);
  const [show, setShow] = useState(false)
  const [typeValue, setTypeValue] = useState(1)  // 设置审批类型单选框值
  const [shenValue, setShenValue] = useState(4)  // 设置审批人单选框值
  const [limitValue, setLimitValue] = useState(7)  // 设置表单操作权限单选框值
  const [faqiType, setFaqiType] = useState('in')  // 设置发起人类型
  const [faqiLimit, setFaqiLimit] = useState(7)  // 设置发起人操作权限
  const [mode, setMode] = useState('setFaqi');
  const [chaoValue, setChaoValue] = useState('主管理员');  // 设置抄送人
  const [disabled, setDisabled] = useState(false); // 设置单选框禁用

  useEffect(() => {
    window.logicflow = new LogicFlow({
      container: refContainer.current,
      plugins: [Menu, DndPanel, SelectionSelect],
      grid: true,
      width: 1000,
      height: 500,
    //   edgeType: 'CustomEdge',
      // stopScrollGraph: true,
    });
    LogicFlow.use(Menu);
    LogicFlow.use(DndPanel);
    LogicFlow.use(SelectionSelect);     
    window.logicflow.register(faqi);  // 注册自定义节点
    window.logicflow.register(shenpi);  // 注册自定义节点
    window.logicflow.register(chaosong);  // 注册自定义节点
    window.logicflow.register(space);  // 注册自定义节点
    window.logicflow.register(conditionNode);  // 注册自定义节点
    window.logicflow.register(CustomEdge); // 注册自定义边
    // window.logincflow.setDefaultEdgeType("CustomEdge");  // 设置默认线类型
    window.logicflow.extension.menu.setMenuConfig({
      edgeMenu: [
        {
          text: '发起人',
          callback(edge){
            // 点击添加发起人节点
            window.logicflow.addNode({
              id: uuid(),
              type: 'faqi',
              x: 300,
              y: 300,
              properties: {
                name: '发起人',
                faqi_type: '公司1',
              }
            })
          }
        },
        {
          text: '审批人',
          callback(edge){
            // 点击添加审批人节点
            window.logicflow.addNode({
              id: uuid(),
              type: 'shenpi',
              x: 400,
              y: 300,
              properties: {
                name: '审批人',
                shenpi: '发起人自选',
              }
            })
          }
        },
        {
          text: '抄送人',
          callback(edge){
            // 点击添加发起人节点
            window.logicflow.addNode({
              id: uuid(),
              type: 'chaosong',
              x: 500,
              y: 300,
              properties: {
                name: '抄送人',
                chaosong: '主管理员',
              }
            })
          }
        },
        {
            text: '删除',
            callback(edge){
                window.logicflow.deleteEdge(edge.id)
            }
        }
      ]
    })
    window.logicflow.extension.dndPanel.setPatternItems([
        // {
        //     label: '选区',
        //     className: "custom-selection",
        //     icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAOVJREFUOBGtVMENwzAIjKP++2026ETdpv10iy7WFbqFyyW6GBywLCv5gI+Dw2Bluj1znuSjhb99Gkn6QILDY2imo60p8nsnc9bEo3+QJ+AKHfMdZHnl78wyTnyHZD53Zzx73MRSgYvnqgCUHj6gwdck7Zsp1VOrz0Uz8NbKunzAW+Gu4fYW28bUYutYlzSa7B84Fh7d1kjLwhcSdYAYrdkMQVpsBr5XgDGuXwQfQr0y9zwLda+DUYXLaGKdd2ZTtvbolaO87pdo24hP7ov16N0zArH1ur3iwJpXxm+v7oAJNR4JEP8DoAuSFEkYH7cAAAAASUVORK5CYII=',
        //     callback: () => {
        //         window.logicflow.extension.selectionSelect.openSelectionSelect();
        //         window.logicflow.once('selection:selected', () => {
        //             window.logicflow.extension.selectionSelect.closeSelectionSelect();
        //       });
        //     }
        //   },
        {
          type: 'faqi',
        //   text: '发起人',
          label: '发起任务',
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==',
          className: 'important-node'
        },
        {
          type: 'shenpi',
        //   text: '审批人',
          label: '审批任务',
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==',
          className: 'important-node'
        },
        {
            type: 'chaosong',
            // text: '抄送人',
            label: '抄送任务',
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==',
            className: 'important-node'
        },
        {
            type: 'conditionNode',
            label: '条件节点',
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAA1BJREFUOBFtVE1IVUEYPXOf+tq40Y3vPcmFIdSjIorWoRG0ERWUgnb5FwVhYQSl72oUoZAboxKNFtWiwKRN0M+jpfSzqJAQclHo001tKkjl3emc8V69igP3znzfnO/M9zcDcKT67azmjYWTwl9Vn7Vumeqzj1DVb6cleQY4oAVnIOPb+mKAGxQmKI5CWNJ2aLPatxWa3aB9K7/fB+/Z0jUF6TmMlFLQqrkECWQzOZxYGjTlOl8eeKaIY5yHnFn486xBustDjWT6dG7pmjHOJd+33t0iitTPkK6tEvjxq4h2MozQ6WFSX/LkDUGfFwfhEZj1Auz/U4pyAi5Sznd7uKzznXeVHlI/Aywmk6j7fsUsEuCGADrWARXXwjxWQsUbIupDHJI7kF5dRktg0eN81IbiZXiTESic50iwS+t1oJgL83jAiBupLDCQqwziaWSoAFSeIR3P5Xv5az00wyIn35QRYTwdSYbz8pH8fxUUAtxnFvYmEmgI0wYXUXcCCSpeEVpXlsRhBnCEATxWylL9+EKCAYhe1NGstUa6356kS9NVvt3DU2fd+Wtbm/+lSbylJqsqkSm9CRhvoJVlvKPvF1RKY/FcPn5j4UfIMLn8D4UYb54BNsilTDXKnF4CfTobA0FpoW/LSp306wkXM+XaOJhZaFkcNM82ASNAWMrhrUbRfmyeI1FvRBTpN06WKxa9BK0o2E4Pd3zfBBEwPsv9sQBnmLVbLEIZ/Xe9LYwJu/Er17W6HYVBc7vmuk0xUQ+pqxdom5Fnp55SiytXLPYoMXNM4u4SNSCFWnrVIzKG3EGyMXo6n/BQOe+bX3FClY4PwydVhthOZ9NnS+ntiLh0fxtlUJHAuGaFoVmttpVMeum0p3WEXbcll94l1wM/gZ0Ccczop77VvN2I7TlsZCsuXf1WHvWEhjO8DPtyOVg2/mvK9QqboEth+7pD6NUQC1HN/TwvydGBARi9MZSzLE4b8Ru3XhX2PBxf8E1er2A6516o0w4sIA+lwURhAON82Kwe2iDAC1Watq4XHaGQ7skLcFOtI5lDxuM2gZe6WFIotPAhbaeYlU4to5cuarF1QrcZ/lwrLaCJl66JBocYZnrNlvm2+MBCTmUymPrYZVbjdlr/BxlMjmNmNI3SAAAAAElFTkSuQmCC',
          },
        {
          type: 'space',
          text: '流程结束',
          label: '结束节点',
          icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAA1BJREFUOBFtVE1IVUEYPXOf+tq40Y3vPcmFIdSjIorWoRG0ERWUgnb5FwVhYQSl72oUoZAboxKNFtWiwKRN0M+jpfSzqJAQclHo001tKkjl3emc8V69igP3znzfnO/M9zcDcKT67azmjYWTwl9Vn7Vumeqzj1DVb6cleQY4oAVnIOPb+mKAGxQmKI5CWNJ2aLPatxWa3aB9K7/fB+/Z0jUF6TmMlFLQqrkECWQzOZxYGjTlOl8eeKaIY5yHnFn486xBustDjWT6dG7pmjHOJd+33t0iitTPkK6tEvjxq4h2MozQ6WFSX/LkDUGfFwfhEZj1Auz/U4pyAi5Sznd7uKzznXeVHlI/Aywmk6j7fsUsEuCGADrWARXXwjxWQsUbIupDHJI7kF5dRktg0eN81IbiZXiTESic50iwS+t1oJgL83jAiBupLDCQqwziaWSoAFSeIR3P5Xv5az00wyIn35QRYTwdSYbz8pH8fxUUAtxnFvYmEmgI0wYXUXcCCSpeEVpXlsRhBnCEATxWylL9+EKCAYhe1NGstUa6356kS9NVvt3DU2fd+Wtbm/+lSbylJqsqkSm9CRhvoJVlvKPvF1RKY/FcPn5j4UfIMLn8D4UYb54BNsilTDXKnF4CfTobA0FpoW/LSp306wkXM+XaOJhZaFkcNM82ASNAWMrhrUbRfmyeI1FvRBTpN06WKxa9BK0o2E4Pd3zfBBEwPsv9sQBnmLVbLEIZ/Xe9LYwJu/Er17W6HYVBc7vmuk0xUQ+pqxdom5Fnp55SiytXLPYoMXNM4u4SNSCFWnrVIzKG3EGyMXo6n/BQOe+bX3FClY4PwydVhthOZ9NnS+ntiLh0fxtlUJHAuGaFoVmttpVMeum0p3WEXbcll94l1wM/gZ0Ccczop77VvN2I7TlsZCsuXf1WHvWEhjO8DPtyOVg2/mvK9QqboEth+7pD6NUQC1HN/TwvydGBARi9MZSzLE4b8Ru3XhX2PBxf8E1er2A6516o0w4sIA+lwURhAON82Kwe2iDAC1Watq4XHaGQ7skLcFOtI5lDxuM2gZe6WFIotPAhbaeYlU4to5cuarF1QrcZ/lwrLaCJl66JBocYZnrNlvm2+MBCTmUymPrYZVbjdlr/BxlMjmNmNI3SAAAAAElFTkSuQmCC',
        }
      ]);
    // 节点事件绑定
    window.logicflow.on("node:click", (e)=>{
      console.log(e)
      // 根据结点类型不同打开不同的弹窗
      if (e.data.type === 'faqi'){
        // 打开选择发起人弹窗
        setOpenFa(true)
        setOpenId(e.data.id)
      }
      else if (e.data.type === 'shenpi'){
        // 打开选择审批人弹窗
        setOpenShen(true)
        setOpenId(e.data.id)
      }
      else if (e.data.type === 'chaosong'){
        // 打开抄送人弹窗
        setOpenChao(true)
        setOpenId(e.data.id)
      }
    });
    window.logicflow.render(data1);

  }, []);

  const onSelectChange = (newSelectedRowKeys, e) => {
    // const selectedName = [...selectedName]
    console.log('selectedRowKeys changed: ', newSelectedRowKeys, e);
    setSelectedRowKeys(newSelectedRowKeys);
    if (newSelectedRowKeys.length === 0){
      setSelectedName([])
    }
    // console.log("length", e.length)
    for (let i in e){
      let key = e[i].key
      let name = e[i].name
      let value = {key, name}
      for (let j in selectedName){
        if (newSelectedRowKeys.indexOf(selectedName[j].key) < 0){
          // 如果还在
          selectedName.splice(selectedName[j].key-1, 1);
          setSelectedName(selectedName)
        }
      }
      if (!JSON.stringify(selectedName).includes(JSON.stringify(value))){
        //选中的数据放入数组  
        setSelectedName([...selectedName, value])
      }
    }
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const shenpiOk = () =>{
    setOpenShen(false)
    console.log(disabled)
    window.logicflow.getNodeModelById(openId).setProperties({
    'shenpi_name': selectedName.map(item => item.name),
    'shenpi_type': value[typeValue - 1],
    'shenpi': disabled ? null : value[shenValue - 1],
    'shenpi_limit': disabled ? null : value[limitValue - 1],
    });
    console.log("ddhewdwij", window.logicflow.getNodeModelById(openId).getProperties())
  }
  const faqiOk = () =>{
    setOpenFa(false)
    window.logicflow.getNodeModelById(openId).setProperties({
    'faqi_type': faqiType === 'in' ? '公司1' : '组织外成员',
    'faqi_limit': value[limitValue - 1],
    });
    console.log("ddhewdwij", window.logicflow.getNodeModelById(openId).getProperties())
  }
  const chaosongOk = () => {
    setOpenChao(false)
    window.logicflow.getNodeModelById(openId).setProperties({
      'chaosong': chaoValue,
    });
    console.log("ddhewdwij", window.logicflow.getNodeModelById(openId).getProperties())
  } 
  // 流程图下载为xml文件
  function download(filename, text) {
    // console.log(filename, text);
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
  
    element.style.display = "none";
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  const onClick = () => {
    const data = window.logicflow.getGraphData();
    const jsonData = JSON.stringify(data)
    sessionStorage.setItem('nodeData', jsonData)
    // console.log(data, typeof(data))
    // const blob = new Blob([JSON.stringify(data)]);
    // download("logicflow.json", data);
    // saveAs(blob, 'lf.json')
    props.show(false)
  }

  return (
    <>
      <div className="App" ref={refContainer}></div>
      {/* 发起人，设置为谁能发起 */}
      <Modal open={openFa} title='发起人' onCancel={()=>setOpenFa(false)} onOk={faqiOk}>
        <Radio.Group
          onChange={(e)=>setMode(e.target.value)}
          value={mode}
          style={{
            marginBottom: 8,
            textAlign: 'center'
          }}
        >
          <Radio.Button value="setFaqi">设置发起人</Radio.Button>
          <Radio.Button value="setLimit">表单操作权限</Radio.Button>
        </Radio.Group>
        {mode === 'setFaqi' ? <Col>
          <Text>发起人类型</Text>
          <Col>
            <Radio.Group onChange={(e)=>setFaqiType(e.target.value)} value={faqiType}>
              <Radio value="in">组织内成员</Radio>
              <Radio value="out">组织外成员</Radio>
            </Radio.Group>
          </Col> 
        </Col> : 
        <Col>
          <Radio.Group onChange={(e)=>setFaqiLimit(e.target.value)} value={faqiLimit}>
            <Radio value={7}>可编辑</Radio>
            <Radio value={8}>只读</Radio>
            <Radio value={9}>隐藏</Radio>
          </Radio.Group>
        </Col>
        }
        
      </Modal>
      {/* 审批人，设置为指定人或者通过发起人后台搜索为发起人的主管或者为发起人自选，在发起人页面可以自己选择审批人 */}
      <Modal open={openShen} title='审批人' onCancel={()=>setOpenShen(false)} onOk={shenpiOk} okText='确定' cancelText='取消'>
        <Title level={5}>
          审批类型
        </Title>
        <Radio.Group onChange={(e)=>{if(e.target.value === 2 || e.target.value === 3){setDisabled(true)}else{setDisabled(false)};setTypeValue(e.target.value)}} value={typeValue}>
          <Radio value={1}>人工审批</Radio>
          <Radio value={2}>自动通过</Radio>
          <Radio value={3}>自动拒绝</Radio>
        </Radio.Group>
        <Title level={5}>
          设置审批人
        </Title>
        <Radio.Group onChange={(e)=>setShenValue(e.target.value)} value={shenValue} disabled={disabled}>
          <Radio value={4} onClick={()=>{setShow(true)}}>指定人</Radio>
          <Radio value={5}>发起人的主管</Radio>
          <Radio value={6}>发起人自选</Radio>
        </Radio.Group>
        <Title level={5}>
          表单操作权限
        </Title>
        <Radio.Group onChange={(e)=>setLimitValue(e.target.value)} value={limitValue} disabled={disabled}>
          <Radio value={7}>可编辑</Radio>
          <Radio value={8}>只读</Radio>
          <Radio value={9}>隐藏</Radio>
        </Radio.Group>
          
          
          
        
      </Modal>
      {/* 抄送人，只能选择管理员 */}
      <Modal open={openChao} title='抄送人' onCancel={()=>setOpenChao(false)} onOk={chaosongOk}>
        <Title level={5}>
          设置抄送人
        </Title>
        <Select onChange={(value)=>{console.log(value);setChaoValue(value)}} mode="multiple" placeholder="选择抄送人" optionLabelProp="label" style={{width: '100%'}}>
          <Option value='指定成员' label='指定成员'>
            <Text onClick={()=>{setShow(true)}}>指定成员</Text>
          </Option>
          <Option value='负责人' label='负责人'>
            <Text>负责人</Text>
          </Option>
          <Option value='主管理员' label='主管理员'>
            <Text>主管理员</Text>
          </Option>
        </Select>
      </Modal>
      {/* 选择指定人 */}
      <Modal destroyOnClose open={show} title='选择指定人' onOk={()=>{setShow(false)}} onCancel={()=>setShow(false)} okText='确定' cancelText='取消'>
        <Table rowSelection={rowSelection}  columns={columns} dataSource={data}>
        </Table>

      </Modal>
      <Button id='jsXml' onClick={()=>onClick()}>保存</Button>
    </>
  )
}
