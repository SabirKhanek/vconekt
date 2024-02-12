import React, { createContext, useContext, useEffect, useState } from "react";

export enum RESOURCE_STATUS {
  LOADED,
  FAILED,
  LOADING,
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
        { name: resourceName, status: RESOURCE_STATUS.LOADING },
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
    console.log("hi");
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
        loadingCount,
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}
