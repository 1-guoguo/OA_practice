// base.js节点宽度
import { DiamondNode, DiamondNodeModel, h } from "@logicflow/core";
const NODE_WIDTH = 200 // 节点宽度
const NODE_HEIGHT = 28 // 节点高度
const NEXT_X_DISTANCE = 200  // 新增加的节点位置
const NEXT_Y_DISTANCE = 100
class BaseModel extends DiamondNodeModel {
    // 设置model形状属性
    setAttributes() {
        this.rx = 50
        this.ry = 50
        this.sourceRules.push({
            message: '只允许从左右边的锚点连出',
            validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
              
              return targetAnchor.type === 'incomming'
            }
          })
        this.sourceRules.push({
            message: '只允许从左右边的锚点连出',
            validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
              return sourceAnchor.type === 'outgoing'
            }
          })
        this.sourceRules.push({
            message: '不允许自身出现回路',
            validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
              // return sourceAnchor.id.split('-')[0] !== targetAnchor.id.split('-')[0]
              return sourceNode !== targetNode
            }
          })

    }
    setHeight(val) {
        this.height = val
    }
    getNodeStyle() {
        const style = super.getNodeStyle();
        style.stroke = '#B0E0E6'
        return style
    }
    getDefaultAnchor() {
        const { id, x, y, width, height } = this
        const anchors = []
        // 左
        anchors.push({
          x: x - width / 2,
          y,
          id: `${id}_outgoing`,
          type: 'outgoing'
        })
        // 右
        anchors.push({
          x: x + width / 2,
          y,
          id: `${id}_outgoing`,
          type: 'outgoing'
        })
        // 上
        anchors.push({
          x: x - width / 10 + 10,
          y: y - height / 2,
          id: `${id}_incomming`,
          edgeAddable: false,
          type: 'incomming'
        })
        // 下
        anchors.push({
          x: x - width / 10 + 10,
          y: y + height / 2,
          id: `${id}_outgoing`,
          type: 'outgoing'
        })
        return anchors
      }
    
}

class BaseView extends DiamondNode {
    
}

export default {
  type: "conditionNode",
  view: BaseView,
  model: BaseModel,
};