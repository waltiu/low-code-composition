import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];
const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
};
export const getMenus = () => {
  return [
    getItem('项目管理', '/project', <PieChartOutlined />),
    getItem('模板管理', '/material', <DesktopOutlined />),

  ];
};
