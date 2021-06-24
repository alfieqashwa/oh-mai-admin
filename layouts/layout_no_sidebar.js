import { SideBar } from 'components/sidebar'
import { useEffect, useState } from 'react';
import { isTokenExist } from 'utils/Auth';

export default function LayoutNoSidebar({ title, children }) {
  
  return (
    <>
      <main className="">
        {children}
      </main>
    </>
  );
}