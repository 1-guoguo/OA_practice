// base.js节点宽度
import { RectNode, RectNodeModel, h } from "@logicflow/core";
import { BaseNodeModel } from "@logicflow/core";
const NODE_WIDTH = 200 // 节点宽度
const NODE_HEIGHT = 28 // 节点高度
const NEXT_X_DISTANCE = 200  // 新增加的节点位置
const NEXT_Y_DISTANCE = 100
class BaseModel extends RectNodeModel {
    // 设置model形状属性
    setAttributes() {
        this.text.editable = false  // 禁止节点文本编辑
        this.width = 80;
        this.height = 20;
        this.radius = 10
        this.virtual = true
        this.sourceRules.push({
            message: '结束结点只能连入，不能连出',
            validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
              if (sourceNode){
                return false
              }
            }
          })
    }
    setHeight(val) {
        this.height = val
    }
    getNodeStyle() {
        const style = super.getNodeStyle();
        style.stroke = '#FFFFFF'
        style.strokeDasharray = "none";
        style.fillOpacity = 0
        return style
    }
    getDefaultAnchor() {
        const { id, x, y, width, height } = this
        const anchors = []
        anchors.push({
          x, 
          y: y - height / 2,
          id: `${id}_incomming`,
          edgeAddable: false,
          type: 'incomming'
        })
        anchors.push({
          x,
          y: y + height / 2,
          id: `${id}_outgoing`,
          type: 'outgoing'
        })
        return anchors
    }
    
}

class BaseView extends RectNode {
}

export default {
  type: "space",
  view: BaseView,
  model: BaseModel,
};