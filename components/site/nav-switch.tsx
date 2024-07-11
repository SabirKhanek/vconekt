'use client';
import { createContext, useContext, useState } from 'react';

const navContext = createContext({
  isNavOpened: false,
  switchNav: (val: boolean) => {
    val;
  }
});

export default function NavSwitchProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [isNavOpened, setNavOpened] = useState<boolean>(false);
  const switchNav = (val: boolean) => {
    if (val !== isNavOpened) setNavOpened(val);
  };

  return (
    <navContext.Provider value={{ isNavOpened, switchNav }}>
      <>{children}</>
    </navContext.Provider>
  );
}

export function useNavSwitch() {
  return useContext(navContext);
}
