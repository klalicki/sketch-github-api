import { Octokit } from "https://cdn.skypack.dev/octokit";
export const octokit = new Octokit({});
window.octokit = octokit; // for debugging

// gets all repos from a user, and filters them by ones that contain a specific topic.
// adds the filtered repos to the DOM
const getRepos = (username, topicFilter) => {
  const repoList = octokit
    .request(`GET /users/${username}/repos`)
    .then((response) => {
      // filter by repos that include the topic that was passed in as a parameter
      const targetRepos = response.data.filter((repo) => {
        if (!topicFilter) {
          return true;
        } else {
          return repo.topics.includes(topicFilter);
        }
      });
      console.log(targetRepos);
      const cleanedTargetRepos = [];

      // get rid of properties we don't need
      targetRepos.forEach((repo) => {
        const { name, description, html_url, homepage } = repo;
        cleanedTargetRepos.push({ name, description, html_url, homepage });
      });
      const sketchListElem = document.querySelector(".sketch-list");
      //clear the sketch list
      sketchListElem.innerHTML = "";
      // generate a DOM element for each repo
      cleanedTargetRepos.forEach((repo) => {
        const newElem = document.createElement("article");
        const header = document.createElement("h3");
        header.innerText = repo.name;
        const description = document.createElement("p");
        description.innerText = repo.description;
        const repoLink = document.createElement("a");
        const linkContainer = document.createElement("div");
        repoLink.innerText = "View Repo";
        repoLink.href = repo.html_url;
        linkContainer.appendChild(repoLink);
        if (repo.homepage) {
          const sketchLink = document.createElement("a");
          sketchLink.innerText = "View Sketch";
          sketchLink.href = repo.homepage;
          linkContainer.appendChild(sketchLink);
        }

        newElem.appendChild(header);
        newElem.appendChild(description);
        newElem.appendChild(linkContainer);

        sketchListElem.appendChild(newElem);
      });
    });
};
// getRepos("klalicki");

const handleFormSubmit = (e) => {
  e.preventDefault();
  const username = document.querySelector("#username").value;
  const topicFilter = document.querySelector("#topics").value;
  console.log(username, topicFilter);
  getRepos(username, topicFilter);
};
document.querySelector("#submit").addEventListener("click", handleFormSubmit);
