import { SideBar } from 'components/sidebar'

export default function Layout({ title, children }) {
  return (
    <>
      <SideBar />
      <main className="ml-[252px]">
        {children}
      </main>
    </>
  );
}