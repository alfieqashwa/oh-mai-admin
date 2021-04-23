import { SideBar } from 'components/sidebar'

export default function Layout({ title, children }) {
  return (
    <>
      <SideBar />
      <main className="md:ml-[252px]">
        {children}
      </main>
    </>
  );
}