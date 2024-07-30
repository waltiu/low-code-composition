import { FC, useState } from 'react';
import { Button, Input, Empty, message, Dropdown, MenuProps } from 'antd';
import styles from './index.module.less';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ProjectItemType, TemplateItemType } from '../../type';
import Edit from './Edit';
import { generateUUID } from '@/utils';
import useProject from '../../../../hooks/useProject';
import Logo from '@/layouts/logo.png';
import { getProjectInfoByType } from '../../constant';
import EditorModal from '@/components/EditorModal';

type ProjectTemplatePropsType = {
  type: string
}

const ProjectTemplate: FC<ProjectTemplatePropsType> = ({ type }) => {
  const label = getProjectInfoByType(type)?.title
  const [projects, setProjects] = useProject(type);
  const [editRecord, setEditRecord] = useState<ProjectItemType | null>(null);
  const [editorRecord, setEditorRecord] = useState<TemplateItemType | null>(null)

  const onSave = (data?: ProjectItemType) => {
    const newPages = [...projects];
    if (data) {
      const updateTime = new Date().toLocaleString();
      if (data.id) {
        const oldIndex = projects.findIndex((item) => item.id === data.id);
        newPages[oldIndex] = {
          ...data,
          updateTime,
        };
      } else {
        const id = generateUUID();
        newPages.push({
          ...data,
          id,
          type,
          updateTime,
        });
      }
      setProjects(newPages);
      setEditRecord(null);
    } else {
      setEditRecord(null);
    }
  };

  const onSaveTemplateSchema = (data?: TemplateItemType) => {
    if (data) {
      const newList = [...projects]
      const oldIndex = newList.findIndex(item => item.id === data.id)
      newList[oldIndex] = data
      setProjects(newList)
      setEditorRecord(null)
      message.success("保存成功！")

    } else {
      setEditorRecord(null)
    }
  }
 const  getRenderItems=(pageItem:any)=>{
   return [
      {
        key: 'preview',
        label: (
          <span onClick={(e)=>{
            window.open(`/preview?id=${pageItem.id}&type=${pageItem.type}`)
            e.stopPropagation()
          }}>预览</span>
        )
      }
    ];
  }
  return (
    <div className={styles.projects}>
      <div className={styles.header}>
        <Input
          className={styles.search}
          addonBefore={<SearchOutlined />}
          placeholder={`搜索${label}名称`}
        />
        <Button
          className={styles.add}
          type="primary"
          onClick={() => {
            setEditRecord({});
          }}
        >
          <PlusOutlined />
          新建{label}
        </Button>
      </div>
      {projects.length > 0 ? (
        <div className={styles.list}>
          {projects.map((pageItem) => (
            <div
              key={pageItem.id}
              onClick={() => setEditorRecord(pageItem)}
              className={styles['page-item']}
            >
              <div className={styles.oper}>
                <Dropdown menu={{
                  items:getRenderItems(pageItem)
                }} placement="bottomLeft" arrow>
                  <span onClick={(e)=>e.stopPropagation()}>
                    ...
                  </span>
                </Dropdown>
              </div>
              <div className={styles.name}>{pageItem.name}</div>
              <img src={pageItem.icon || Logo} className={styles.icon} />
              <div className={styles.time}>{pageItem.updateTime}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <Empty description={`还没创建${label}呢，点击右上角开始创建一个吧！`} />
        </div>
      )}
      <Edit editRecord={editRecord as ProjectItemType} onSave={onSave} label={label} type={type} />
      <EditorModal editRecord={editorRecord as TemplateItemType} onSave={onSaveTemplateSchema} />
    </div>
  );
};
export default ProjectTemplate;
