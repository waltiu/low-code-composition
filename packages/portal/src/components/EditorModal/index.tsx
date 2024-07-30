import { Button, Drawer, Space } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';
import { TemplateItemType } from '@/pages/project/type';
import EditorConstructor from '../EditorConstructor';


type EditPropsType = {
    editRecord: TemplateItemType;
    onSave: (data?: TemplateItemType) => void;
};

const EditorModal: FC<EditPropsType> = ({ editRecord, onSave }) => {
    const [data, setData] = useState<TemplateItemType>();
    const editorRef = useRef<any>()

    useEffect(() => {
        setData(editRecord);
    }, [editRecord]);

    const onOk = async (isClose?: boolean) => {
        if (isClose) {
            onSave()
            return
        }
        const data = await editorRef.current.getData()
        onSave({
            ...editRecord,
            schema: {
                ...(editRecord.schema || {}),
                data
            }
        })
    }
    
    return (
        <Drawer
            destroyOnClose
            onClose={() => onOk(true)}
            open={Boolean(editRecord)}
            title="编辑"
            closeIcon={false}
            footer={<div style={{ display: "flex", justifyContent: "right" }}>
                <Space>
                    <Button onClick={() => onOk(true)}>取消</Button>
                    <Button type="primary" onClick={() => onOk()}>保存</Button>
                </Space>
            </div>}
            width={"80vw"}
        >
            <EditorConstructor type={data?.type as string} id={(data?.id || data?.templateId) as string} ref={editorRef} />
        </Drawer>
    );
};
export default EditorModal;
