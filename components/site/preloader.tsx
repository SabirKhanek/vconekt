import React, { createContext, useContext, useEffect, useState } from 'react';

export enum RESOURCE_STATUS {
  LOADED,
  FAILED,
  LOADING
}

interface Resource {
  name: string;
  status: RESOURCE_STATUS;
}

export interface PreloaderControl {
  isLoaded: boolean;
  updateStatus: (resourceName: string, status: RESOURCE_STATUS) => boolean;
  registerResource: (resourceName: string) => void;
  resources: Resource[];
  loadingCount: number;
}

const PreloaderContext = createContext({} as PreloaderControl);

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const registerResource = (resourceName: string) => {
    if (!resources.some((res) => res.name === resourceName)) {
      setResources((prevResources) => [
        ...prevResources,
        { name: resourceName, status: RESOURCE_STATUS.LOADING }
      ]);
    }
  };
  const [loadingCount, setLoadingCount] = useState(0);

  const updateStatus = (resourceName: string, status: RESOURCE_STATUS) => {
    setResources((prevResources) => {
      const updatedResources = prevResources.map((res) =>
        res.name === resourceName ? { ...res, status } : res
      );
      return updatedResources;
    });
    return true;
  };

  useEffect(() => {
    const loadingCount = resources.filter(
      (res) => res.status === RESOURCE_STATUS.LOADING
    ).length;
    setLoadingCount(loadingCount);

    if (loadingCount === 0 && !isLoaded) setIsLoaded(true);
    if (loadingCount > 0 && isLoaded) setIsLoaded(false);
  }, [resources, isLoaded]);

  return (
    <PreloaderContext.Provider
      value={{
        isLoaded,
        registerResource,
        updateStatus,
        resources,
        loadingCount
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function Preloader({ ...props }) {
  // const [progress, setProgress] = useState(0);
  // const preloader = usePreloader();
  // const progresLineRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   setProgress(
  //     (preloader.resources.length - preloader.loadingCount) /
  //       preloader.resources.length
  //   );
  // }, [preloader.loadingCount, preloader.resources]);

  // useEffect(() => {
  //   if (!preloader.isLoaded) {
  //     document.getElementsByTagName('body')[0].classList.add('no-scrollbar');
  //   } else {
  //     document.getElementsByTagName('body')[0].classList.remove('no-scrollbar');
  //   }
  // }, [preloader.isLoaded]);

  // useGSAP(() => {
  //   // console.log(progress);
  //   gsap.to(progresLineRef.current, {
  //     width: `${progress * 100}%`
  //   });
  // }, [progress]);
  // return !preloader.isLoaded ? (
  //   <div {...props} className={`fixed z-[15] h-screen w-screen bg-black`}>
  //     <div
  //       className="relative z-50  h-1 w-0 bg-primary"
  //       id="progress_line"
  //       ref={progresLineRef}
  //     ></div>
  //   </div>
  // ) : null;
  return <></>;
}
