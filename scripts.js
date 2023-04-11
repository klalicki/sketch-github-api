import { Octokit } from "https://cdn.skypack.dev/octokit";
export const octokit = new Octokit({});
window.octokit = octokit; // for debugging

// gets all repos from a user, and filters them by ones that contain a specific topic.
// adds the filtered repos to the DOM
const getRepos = (username, topicFilter) => {
  const repoList = octokit
    .request(`GET /users/${username}/repos`)
    .then((response) => {
      console.log(response.data);
      // filter by repos that include topic 'sketches'
      const targetRepos = response.data.filter((repo) => {
        if (!topicFilter) {
          return true;
        } else {
          return repo.topics.includes(topicFilter);
        }
      });
      console.log(targetRepos);
      const cleanedTargetRepos = [];
      targetRepos.forEach((repo) => {
        const { name, description, html_url, homepage } = repo;
        cleanedTargetRepos.push({ name, description, html_url, homepage });
      });
      const sketchListElem = document.querySelector(".sketch-list");
      cleanedTargetRepos.forEach((repo) => {
        const newElem = document.createElement("article");
        const header = document.createElement("h3");
        header.innerText = repo.name;
        const description = document.createElement("p");
        description.innerText = repo.description;
        const repoLink = document.createElement("a");
        repoLink.innerText = "View Repo";
        repoLink.href = repo.html_url;
        const sketchLink = document.createElement("a");
        sketchLink.innerText = "View Sketch";
        sketchLink.href = repo.homepage;
        newElem.appendChild(header);
        newElem.appendChild(description);
        newElem.appendChild(repoLink);
        newElem.appendChild(sketchLink);
        sketchListElem.appendChild(newElem);
      });
    });
};
getRepos("klalicki");
