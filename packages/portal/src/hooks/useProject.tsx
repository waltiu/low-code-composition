import { useEffect, useState } from 'react';
import { ProjectItemType } from '../pages/project/type';

const CACHE_KEY = 'wl_projects';

const getCacheKey=(type:string)=>{
  return `${CACHE_KEY}_${type}`
}

type useProjectsType = (type:string) => [ProjectItemType[], (data: ProjectItemType[]) => void];

export const getCacheData = (type:string,id: string) => {
  const cachePages = localStorage.getItem(getCacheKey(type));
  if (cachePages) {
    return JSON.parse(cachePages).find((item: ProjectItemType) => item.id === id);
  } else {
    return null;
  }
};

// export const updateCacheData = (id: string, partialData: ProjectItemType) => {
//   const cachePages = localStorage.getItem(CACHE_KEY) as string;
//   const projects = cachePages ? JSON.parse(cachePages) : [];
//   const oldIndex = projects.findIndex((item: ProjectItemType) => item.id === id);
//   projects[oldIndex] = {
//     ...(projects[oldIndex] || {}),
//     ...(partialData || {}),
//   };
//   localStorage.setItem(CACHE_KEY, JSON.stringify(projects));
// };

const usePages: useProjectsType = (type) => {
  const cacheKey=getCacheKey(type)
  const [projects, setProjects] = useState<ProjectItemType[]>([]);
  const changePages = (data: ProjectItemType[]) => {
    localStorage.setItem(cacheKey, JSON.stringify(data));
    setProjects(data);
  };
  useEffect(() => {
    const cachePages = localStorage.getItem(cacheKey);
    if (cachePages) {
      setProjects(JSON.parse(cachePages));
    }else{
      setProjects([])
    }
  }, [type]);
  return [projects, changePages] as any;
};

export default usePages;
