// 自定义节点并注册
import { RectNode, RectNodeModel } from "@logicflow/core";

class UserTaskModel extends RectNodeModel {
    // 自定义节点的样式属性和形状属性
    getNodeStyle() {
        const style = super.getNodeStyle();
        // 对不同的状态显示不同的颜色
        const properties = this.properties;
        // properties.statu是一个自定义的业务属性，基于业务属性的状态，进行样式控制
        if (properties.statu === "pass") {
            style.stroke = "green";
        } else if (properties.statu === "reject") {
            style.stroke = "red";
        } else {
            style.stroke = "rgb(24, 125, 255)";
        }
        // style.stroke = "blue";  // 边框颜色
        // style.strokeDasharray = "3 3";
        return style;
    }
    initNodeData(data) {
        super.initNodeData(data);
        this.width = 200;
        this.height = 80;
        this.radius = 50;
      }
}

class UserTaskView extends RectNode {
}

export default {
    type: "UserTask",
    view: UserTaskView,
    model: UserTaskModel,
}
