// base.js节点宽度
import { RectNode, RectNodeModel, h } from "@logicflow/core";
const NODE_WIDTH = 200 // 节点宽度
const NODE_HEIGHT = 28 // 节点高度
const NEXT_X_DISTANCE = 200  // 新增加的节点位置
const NEXT_Y_DISTANCE = 100
class BaseModel extends RectNodeModel {
    // 设置model形状属性
    setAttributes() {
        this.text.editable = false  // 禁止节点文本编辑
        this.width = NODE_WIDTH;
        this.height = NODE_HEIGHT + 13 * 2;
        this.radius = 10
        this.sourceRules.push({
            message: '只允许从右边的锚点连出',
            validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
              return targetAnchor.type === 'incomming'
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
        style.stroke = '#6A5ACD'
        return style
    }
    // getAnchorLineStyle(anchorInfo) {
    //   const style = super.getAnchorLineStyle();
    //   style.stroke = "red";
    //   return style;
    // }  
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
    addNode(node, nextY = 0) {
        const isDeep = nextY !== 0
        const nodeModel = this.graphModel.getNodeModelById(node.sourceId)
        const leftTopX = node.x + NEXT_X_DISTANCE - 50 - 10
        const leftTopY = node.y + nextY - 40 - 8
        const rightBottomX = node.x + NEXT_X_DISTANCE + 50 + 10
        const rightBottomY = node.y + nextY + 40 + 8
        const existElements = this.graphModel.getAreaElement(
          this.getHtmlPoint([leftTopX, leftTopY]),
          this.getHtmlPoint([rightBottomX, rightBottomY])
        )
        if (existElements.length) {
          this.addNode(node, nextY + NEXT_Y_DISTANCE)
          return
        }
        const newNode = this.graphModel.addNode({
          type: node.type,
          x: node.x + NEXT_X_DISTANCE,
          y: node.y + nextY,
          properties: node.properties
        })
        let startPoint
        let endPoint
        if (isDeep) {
          startPoint = {
            x: node.x,
            y: node.y + nodeModel.height / 2
          }
          endPoint = {
            x: newNode.x - newNode.width / 2,
            y: newNode.y
          }
        }
        this.graphModel.addEdge({
          sourceNodeId: node.sourceId,
          targetNodeId: newNode.id,
          startPoint,
          endPoint
        })
        this.graphModel.selectElementById(newNode.id)
        this.graphModel.showContextMenu(newNode)
    }
}

class BaseView extends RectNode {
    getLabelShape() {
        const { model } = this.props;
        const { x, y, width, height, properties } = model;
        const style = model.getNodeStyle();
        const { chaosong } = properties
        return h('g', {}, [
        h(
            "svg",
          {
            x: x - width / 2 + 5,
            y: y - height / 2 + 5,
            width: 25,
            height: 25,
            viewBox: "0 0 1274 1024"
          },
          [
            h("path", {
              fill: style.stroke,
              d:
                "M235.328 210.24a32 32 0 0 1 42.88 1.365333l2.218667 2.389334 234.666666 277.333333a32 32 0 0 1 1.877334 38.890667l-1.877334 2.453333-234.666666 277.333333a32 32 0 0 1-50.837334-38.741333l1.984-2.602667L448.746667 512l-217.173334-256.661333a32 32 0 0 1 1.365334-42.88l2.389333-2.218667z"
            }),
            h("path", {
              fill: style.stroke,
              d:
                "M512.661333 210.24a32 32 0 0 1 42.88 1.365333l2.218667 2.389334 234.666667 277.333333a32 32 0 0 1 1.877333 38.890667l-1.877333 2.453333-234.666667 277.333333a32 32 0 0 1-50.837333-38.741333l1.984-2.602667L726.08 512l-217.173333-256.64a32 32 0 0 1 1.365333-42.88l2.389333-2.218667z"
            })
          ]
        ),
        h(
            'text',
            {
                x: x - width / 2 + 23,
                y: y - height / 2 + 23,
                width: 25,
                height: 25,
                viewBox: "0 0 1274 1024",
                fill: style.stroke
            },
            ['抄送人']
        ),
        h(
            'text',
            {
                x: x - width / 2 + 5,
                y: y - height / 2 + 45,
                width: 25,
                height: 25,
                viewBox: "0 0 1274 1024",
                fill: style.stroke
            },
            [chaosong]
        ),
        h(
            "svg",
            {
                x: x - width / 2 + 155,
                y: y - height / 2 + 28,
                width: 25,
                height: 25,
                viewBox: "0 0 1274 1024"
            },
            [
                h("path", {
                    fill: style.stroke,
                    d:
                        "M361.386667 278.613333a32 32 0 0 1 42.816-47.445333l2.432 2.197333 256 256a32 32 0 0 1 2.197333 42.837334l-2.197333 2.432-256 256a32 32 0 0 1-47.466667-42.837334l2.197333-2.432L594.773333 512l-233.386666-233.386667z"
                    }),
          ]
        ),
    ]);
    }
    getShape() {
        const { model } = this.props;
        const { x, y, width, height, radius, properties } = model;
        const style = model.getNodeStyle();
        return h("g", {}, [
          h("rect", {
            ...style,
            x: x - width / 2,
            y: y - height / 2,
            rx: radius,
            ry: radius,
            width,
            height
          }),
          this.getLabelShape()
        ]);
    }
}

export default {
  type: "chaosong",
  view: BaseView,
  model: BaseModel,
};