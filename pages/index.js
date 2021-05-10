import { Header } from 'components/header';

function Index(props) {
  return (
    <>
      <Header title="Home" />
      <div className="grid h-screen place-items-center">
        <h1>Home Page</h1>
      </div>
    </>
  );
}

Index.propTypes = {};

export default Index;
