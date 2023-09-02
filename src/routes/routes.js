import { Navigate } from "react-router-dom";
import NewOA from "../pages/NewOA";
import Emit from "../pages/Emit";

export default [
    {
        label: 'OA审批',
        key: 'oa',
        children: [
            {
                label: '创建空白审批',
                key: 'create',
                path: '/create',
                element: <NewOA />
            },
        ]
    },
    {
        label: '流程面板',
        key: 'pane',
        children: [
            {
                label: '发起审批',
                key: 'emit',
                path: '/emit',
                element: <Emit />
            },
        ]
    },
    {
            path: '*',
            element: <Navigate to='/'/>
    }
    
]