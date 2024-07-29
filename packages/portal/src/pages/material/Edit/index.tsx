import { Modal, Input, Upload, Select } from 'antd';
import { FC, useEffect, useState } from 'react';
import { imgFileToBase64 } from '@/utils';
import styles from './index.module.less';
import { TemplateItemType } from '@/pages/project/type';
import { getProjectTypes } from '@/pages/project/constant';
import TagEdit from './tag';

type EditPropsType = {
  editRecord: TemplateItemType;
  onSave: (data?: TemplateItemType) => void;
};

const Edit: FC<EditPropsType> = ({ editRecord, onSave }) => {
  const [data, setData] = useState<TemplateItemType>();
  useEffect(() => {
    setData(editRecord);
  }, [editRecord]);
  const beforeUpload = async (file: File) => {
    const result = (await imgFileToBase64(file)) as string;
    setData({
      ...data,
      icon: result,
    });
    return false;
  };
  return (
      <Modal
        open={Boolean(editRecord)}
        title={`${editRecord?.id ? '编辑' : '新建'}模板`}
        onCancel={() => onSave()}
        onOk={() => {
          onSave(data);
        }}
      >
        <div className={styles.edit}>
          <div className={styles.row}>
            <div className={styles.label}>类型：</div>
            <div className={styles.value}>
              <Select
                options={getProjectTypes().map(item => ({
                  label: item.title,
                  value: item.key
                }))}
                style={{ width: "100%" }}
                placeholder="请选择模板类型"
                value={data?.type}
                onChange={(e) => {
                  setData({
                    ...data,
                    type: e
                  });
                }}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>名称：</div>
            <div className={styles.value}>
              <Input
                placeholder="请输入模板名称"
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
            <div className={styles.label}>描述：</div>
            <div className={styles.value}>
              <Input.TextArea
                placeholder="请输入模板描述"
                value={data?.desc}
                onChange={(e) => {
                  setData({
                    ...data,
                    desc: e.target.value,
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
          <div className={styles.row}>
            <div className={styles.label}>标记：</div>
            <div className={styles.value}>
              <TagEdit
                value={data?.tags || []}
                onChange={(e: string[]) => {
                  setData({
                    ...data,
                    tags: e,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
  );
};
export default Edit;
