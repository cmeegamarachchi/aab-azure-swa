import type { BreadCrumbItem } from "@/components/SideNav/model"
import Layout from "../Layout"
import Welcome from "./Welcome"

const breadCrumbs: BreadCrumbItem[] = [
  {
    title: "Home",
    url: "/",
  }
];

const HomePage: React.FC = () => {
    return (
      <Layout titleToActivate="Home" breadcrumbs={breadCrumbs}>
        <Welcome />
      </Layout>
    );
  };

export default HomePage
