export type ProjectItemType = Partial<{
  id: string;
  type:string,
  name: string;
  icon: string;
  templateId:string;
  updateTime: string;
  schema:Partial<{
    data:any,
    config:any
  }>
}>;

export type TemplateItemType=ProjectItemType&Partial<{
  desc:string,
  author:string,
  tags:string[]
}
>

export type TemplatesType={
  [key:string]:ProjectItemType[]
}