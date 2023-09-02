import { Drawer, Input, Row, Col } from "antd";

import Contain from "./components/Contain";
import './App.css'

export default function App() {
  
  return (
    <>
      <Contain></Contain>
      {/* <Drawer open={open} title={'创建审批单'} onClose={()=>setOpen(false)}>
        
      </Drawer> */}
   </>
  )
}
// import React, { useState } from 'react';
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import { Button, Form, Input, Modal } from 'antd';
// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 4,
//     },
//   },
//   wrapperCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 20,
//     },
//   },
// };
// const formItemLayoutWithOutLabel = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 20,
//       offset: 4,
//     },
//   },
// };
// const App = () => {
//   const onFinish = (values) => {
//     console.log('Received values of form:', values);
//   };
//   const [open, setOpen] = useState(false)
//   const [plus, setPlus] = useState(()=>()=>{console.log("set a func"); return 'res'})
//   console.log("plus", plus())
//   return (
//     <>
//     <Form
//       name="dynamic_form_item"
//       {...formItemLayoutWithOutLabel}
//       onFinish={onFinish}
//       style={{
//         maxWidth: 600,
//       }}
//     >
//       <Form.List
//         name="names"
//         rules={[
//           {
//             validator: async (_, names) => {
//               if (!names || names.length < 2) {
//                 return Promise.reject(new Error('At least 2 passengers'));
//               }
//             },
//           },
//         ]}
//       >
//         {(fields, { add, remove, move }, { errors }) => (
//           <>
//             {fields.map((field, index) => (
//               <Form.Item key={field.key}>
//                 <Form.Item
//                   noStyle
//                 >
//                   <Input bordered={false} prefix={<MinusCircleOutlined className="dynamic-delete-button"
//                     onClick={() => remove(field.name)}/>}
//                     placeholder="passenger name"
//                     style={{
//                       width: '60%',
//                     }}
//                     suffix={<MinusCircleOutlined className="dynamic-delete-button"
//                     onClick={() => move(index)}/>}
//                   />
//                 </Form.Item>
//               </Form.Item>
//             ))}
//             <Form.Item>
//               <Button
//                 type="dashed"
//                 onClick={() => {setOpen(true);setPlus(()=>()=>{console.log("设置add函数"); return add})}}
//                 style={{
//                   width: '60%',
//                 }}
//                 icon={<PlusOutlined />}
//               >
//                 Add field
//               </Button>
//               <Form.ErrorList errors={errors} />
//             </Form.Item>
//           </>
//         )}
//       </Form.List>
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//     <Modal title='111' open={open} onCancel={()=>setOpen(false)}>
//       <Button onClick={plus()}>111</Button>
//     </Modal>
//     </>
//   );
// };
// export default App;
