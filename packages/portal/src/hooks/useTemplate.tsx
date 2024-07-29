import { useEffect, useState } from 'react';
import { TemplateItemType, TemplatesType } from '../pages/project/type';
import { mockData } from './mock'

const CACHE_KEY = 'wl_templates';


type useTemplatesType = () => [TemplatesType, (data: TemplatesType) => void];

export const getCacheData = (type:string,id?: string) => {
  const cachePages = localStorage.getItem(CACHE_KEY);
  if(!id){
    return JSON.parse(cachePages as string)?.[type]||[]
  }
  if (cachePages) {
    return (JSON.parse(cachePages)[type]||[]).find((item: TemplateItemType) => item.id === id);
  } else {
    return null;
  }
};

const useTemplates: useTemplatesType = () => {
    const [templates, setTemplates] = useState<TemplatesType>({});
    const changeTemplates = (data: TemplatesType) => {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        setTemplates(data);
    };
    useEffect(() => {
        const cachePages = localStorage.getItem(CACHE_KEY);
        if (cachePages) {
            setTemplates(JSON.parse(cachePages));
        } else {
            changeTemplates(mockData)
        }
    }, []);
    return [templates, changeTemplates] as any;
};

export default useTemplates;
