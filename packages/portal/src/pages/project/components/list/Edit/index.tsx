import { Modal, Input, Upload, Select } from 'antd';
import { FC, useEffect, useState } from 'react';
import { imgFileToBase64 } from '@/utils';
import styles from './index.module.less';
import { ProjectItemType, TemplateItemType } from '@/pages/project/type';
import { getCacheData } from '@/hooks/useTemplate';

type EditPropsType = {
  editRecord: ProjectItemType;
  label?:string;
  type?:string;
  onSave: (data?: ProjectItemType) => void;
};

const Edit: FC<EditPropsType> = ({ type,label,editRecord, onSave }) => {
  const [data, setData] = useState<ProjectItemType>();
  const [templates,setTemplates]=useState<TemplateItemType[]>([])

  useEffect(() => {
    setData(editRecord);
  }, [editRecord]);


  useEffect(()=>{
    const result=getCacheData(type as string)
    setTemplates(result.map(item=>({
      ...item,
      label:item.name,
      value:item.id,
    })))
  },[type])

  const beforeUpload = async (file: File) => {
    const result = (await imgFileToBase64(file)) as string;
    setData({
      ...data,
      icon: result,
    });
    return false;
  };

  return (
    <div>
      <Modal
        open={Boolean(editRecord)}
        title={`${editRecord?.id ? '编辑' : '新建'}${label}`}
        onCancel={() => onSave()}
        onOk={() => {
          onSave(data);
        }}
      >
        <div className={styles.edit}>
          <div className={styles.row}>
            <div className={styles.label}>名称：</div>
            <div className={styles.value}>
              <Input
                placeholder={`请输入${label}名称：`}
                value={data?.name}
                onChange={(e) => {
                  setData({
                    ...data,
                    name: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>模板选择：</div>
            <div className={styles.value}>
              <Select
                style={{width:"100%"}}
                placeholder={`请选择模板：`}
                options={templates}
                value={data?.templateId}
                onChange={(e) => {
                  const templateData=templates.find((item)=>item.id===e)
                  setData({
                    ...data,
                    templateId: e,
                    schema:templateData?.schema
                  });
                }}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>封面：</div>
            <div className={styles.value}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
              >
                {data?.icon ? (
                  <img src={data.icon} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  '上传封面'
                )}
              </Upload>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Edit;
