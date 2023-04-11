import { Octokit } from "https://cdn.skypack.dev/octokit";
export const octokit = new Octokit({});
window.octokit = octokit; // for debugging

const getRepos = (username) => {
  const repoList = octokit
    .request(`GET /users/${username}/repos`)
    .then((response) => {
      console.log(response.data);
      // filter by repos that include topic 'sketches'
      const sketchRepos = response.data.filter((repo) =>
        repo.topics.includes("sketches")
      );
      console.log(sketchRepos);
    });
};
getRepos("klalicki");
