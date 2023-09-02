import React from 'react';
import { Layout, Space, Menu, theme } from 'antd';
import NewOA from './NewOA';
import routes from '../routes/routes';
import { NavLink, useRoutes } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu, Item } = Menu
function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem('OA审批', 'sub1', null, [
      getItem('创建空白审批', '1'),
      getItem('流程表单', '2'),
    ])
  ];
export default function Contain() {
  const element = useRoutes(routes)
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            
            <Menu
              mode="inline"
              // defaultSelectedKeys={['1']}
              // defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
              }}
            >
              {routes.map((sub, index)=> {
                {console.log(sub.label)}
                  return (
                    sub.label===undefined ? null : <SubMenu 
                      title={sub.label}
                      key={sub.key}
                      icon={sub.icon}
                      children={
                      sub.children && sub.children.map((menuItem, menuIndex)=>{
                        if (menuItem.label === '职员管理' && sessionStorage.getItem('isManage') === '1'){
                          return null
                        }else{
                        return(
                          <Item index={menuIndex} key={menuItem.key}>
                            <NavLink to={menuItem.path}>{menuItem.label}</NavLink>
                          </Item>
                      
                      )}})}>
                </SubMenu>
              )})}
            </Menu>
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            {element}
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};