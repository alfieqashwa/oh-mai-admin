import { GlassDiv } from 'components/glassdiv';
import Layout from 'components/dashboardAdminLayout'

function Index(props) {
  return (
    <Layout title="Admin Home">
      <h3 className="text-N0">
        Home Admin Dashboard
      </h3>
    </Layout>
  );
}

Index.propTypes = {};

export default Index;
