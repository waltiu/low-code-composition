import { FileTextOutlined, ProjectOutlined, WindowsOutlined } from '@ant-design/icons';

export const PROJECT_TYPE_PAGE = '1'; // 页面
export const PROJECT_TYPE_SITE = '2'; // 站点
export const PROJECT_TYPE_FLOW = '4'; // 流程图
export const PROJECT_TYPE_BI = '5'; // bi大屏
export const PROJECT_TYPE_EXCEL = '3'; // 报表


export const getProjectInfoByType=(type:string)=>{
  const projects=getProjectTypes()
  return projects.find(item=>item.key===type)
}


export const getProjectTypes = () => {
  return [
    {
      label: "页面管理",
      title:"页面",
      icon:  <ProjectOutlined />,
      key: PROJECT_TYPE_PAGE,
    },
    {
      label: "报表管理",
      title:"报表",
      icon:<FileTextOutlined />,
      key: PROJECT_TYPE_EXCEL,
    },
    {
      label: "流程管理",
      title:"流程",
      icon:<FileTextOutlined />,
      key: PROJECT_TYPE_FLOW,
    },
    {
      label: "BI大屏",
      title:"大屏",
      icon:<FileTextOutlined />,
      key: PROJECT_TYPE_BI,
    }
  ]
};
