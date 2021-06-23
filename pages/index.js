import { Header } from 'components/header';
import Cookies from 'js-cookie';
import router from 'next/router';
import { useEffect } from 'react';
import { isTokenExist } from 'utils/Auth';

function Index(props) {
  useEffect(() => {
    if (isTokenExist()) {
      router.push("/analytics/summary")
    } else {
      router.push("/login")
    }
  }, [])

  return (
    <>
      <Header title="Home" />
      <div className="grid h-screen place-items-center">
        <h1>Welcome</h1>
      </div>
    </>
  );
}

Index.propTypes = {};

export default Index;
