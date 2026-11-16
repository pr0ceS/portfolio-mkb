import { Home } from "./components/home";
import { getContributions } from "./lib/contributions";
import { getProjects } from "./lib/projects";
export default async function Page() {
  return <Home projects={getProjects()} contributions={await getContributions()} />;
}
