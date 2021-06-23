import { Header } from 'components/header';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

function Index(props) {

  useEffect(() => {
    // Cookies.set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMGU2ZjBkMjlhZWNkMDY2OWQyMWFlMiIsImZpcnN0X25hbWUiOiJBendhciIsImxhc3RfbmFtZSI6IkFrYmFyIiwiZW1haWwiOiJhendhci5ha2JhckBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiI2MGQxYzVkNWZiZDFmOTJmYjhjNDJlMDYiLCJpYXQiOjE2MjQzNjA0MDUsImV4cCI6MTYyNDk2NTIwNX0.11agT1_1pq63AQyx_3e-Mj9olu14RrAzSXP4G1d3iez")
  }, [])

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
