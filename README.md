# 组件制作审批流程
注意事项：那就是初始化 LogicFlow 实例的时候，传入的参数 container, 必须要 dom 上存在这个节点，不然会报错
在react中使用useRef钩子函数
const refContainer = useRef();
const logicflow = new LogicFlow({
      container: refContainer.current,  // 指定container
      grid: true,
      width: 1000,
      height: 500,
    });
const data = {
    node: [
        {
            id: 3， // id唯一
            type: 'rect'， // 结点形状：长方形等
            x: 200，  // 坐标
            y: 300，
            text: { x: 200, y: 200, value: "审批人" },  // 节点默认文本
            properties: {
                isPass: true
            }  // 在审批流业务场景中，节点是否通过标志，通过为绿色
        }
    ],
    edges: [
        {
            sourceNodeId: "3",  //  起始结点
            targetNodeId: "4",  //  结束结点
            type: "bezier"      //  线段类型，有"line"、"ployline"、"bezier"
        }
    ]
}
logicflow.render(data)  // 将数据渲染到画布上

type:用户节点或者连线的类型，这个类型也可以是自己定义的

# Node节点
基础节点类型
    矩形：`rect` 
    圆形: `circle`
    椭圆: `ellipse`
    多边形: `polygon`
    菱形: `diamond`
    文本: `text`
    HTML: `html`
## 自定义节点
### 基于继承
继承内置节点，使用面向对象的重写机制，重写节点样式相关方法
外观属性表示控制着节点边框、颜色这类偏外观的属性
形状属性表示节点的宽width、高height，矩形的圆角radius, 圆形的半径r, 多边形的顶点points等这些控制着节点最终形状的属性。需要在setAttributes方法或initNodeData方法中进行。
需要一个更加复杂的节点时，可以使用 LogicFlow 提供的自定义节点view的方式。
# 事件
`on`方法进行事件监听。`lf.on("node:click,edge:click", (data)=>{})`