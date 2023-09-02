import React from "react";
import ReactDOM from "react-dom/client";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { BaseEdgeModel, LineEdge, h } from "@logicflow/core";
// import { PolylineEdge, PolylineEdgeModel } from "@logicflow/core";
import { v4 as uuid } from "uuid";
import './NewEdge.css'

const DEFAULT_WIDTH = 48;
const DEFAULT_HEIGHT = 32;

class CustomEdgeModel extends BaseEdgeModel {
  getTextStyle() {
    const style = super.getTextStyle();
    style.color = "#3451F1";
    style.fontSize = 18;
    // style.strokeWidth = 100;
    // style.background.fill = "#F2F131";
    return style;
  }
  getEdgeStyle() {
    const edgeStyle = super.getEdgeStyle();
    
    //可以自己设置线的显示样式，甚至隐藏掉原本的线，自己用react绘制
    edgeStyle.strokeDasharray = "none";
    edgeStyle.stroke = "#DDDFE3";
    return edgeStyle;
  }
 createId() {
  return 'edge_id_' + Math.round(Math.random()*80+2);
 }
}

const CustomLine = () => {
  return (
    <Button type="primary" shape="circle"
     icon={<PlusCircleOutlined />} 
     />

  )
};

class CustomEdgeView extends LineEdge {
  getEdge() {
    const { model } = this.props;
    console.log("mde",model)
    const {
      customWidth = DEFAULT_WIDTH,
      customHeight = DEFAULT_HEIGHT
    } = model.getProperties();
    const id = model.id;
    const edgeStyle = model.getEdgeStyle();
    const { startPoint, endPoint, arrowConfig } = model;
    const lineData = {
      x1: startPoint.x,
      y1: startPoint.y,
      x2: endPoint.x,
      y2: endPoint.y
    };
    const positionData = {
      x: (startPoint.x + endPoint.x - customWidth) / 2,
      y: (startPoint.y + endPoint.y - customHeight) / 2,
      width: customWidth,
      height: customHeight
    };
    const wrapperStyle = {
      width: customWidth,
      height: customHeight,
    //   float: 'center'
    };

    setTimeout(() => {
        ReactDOM.createRoot(document.querySelector("#" + id)).render(<CustomLine />);
    //   ReactDOM.render(<CustomLine />, document.querySelector("#" + id));
    }, 0);
    return h("g", {}, [
      h("line", { ...lineData, ...edgeStyle, ...arrowConfig }),
      h("foreignObject", { ...positionData }, [
        h("div", {
          id,
          style: wrapperStyle,
          className: "lf-custom-edge-wrapper"
        })
      ])
    ]);
  }
  getAppend() {
    return h("g", {}, []);
  }
}

export default {
  type: "CustomEdge",
  view: CustomEdgeView,
  model: CustomEdgeModel
};