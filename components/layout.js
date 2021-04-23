import { SideBar } from 'components/sidebar'

export default function Layout({ title, children }) {
  return (
    <>
      <SideBar />
      <main className="md:ml-[252px] -mr-4 ml-4 bg-N450">
        {children}
      </main>
    </>
  );
}