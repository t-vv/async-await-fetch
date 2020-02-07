// Import stylesheets
import './style.css';
import getTopNews from "./get-data-news.js";
import getGovData from "./get-data-gov.js";

const fetchingStuff = (() => {
  const _setName = () => {
    const fetchedDiv = document.getElementById("fetchedData");

    const insertLoader = () => {
      fetchedDiv.insertAdjacentHTML(
        "afterbegin",
        `<div class="lds-dual-ring"></div>`
      );
      fetchedDiv.classList.add("loading-opacity");
    };
    const removeLoader = () => {
      fetchedDiv.getElementsByClassName("lds-dual-ring")[0].remove();
      fetchedDiv.classList.remove("loading-opacity");
    };

    new getGovData().getStories().then(ids => {
      //console.log(ids.data[0]);
      const fetchedDiv = document.getElementById("fetchedData");
      ids.data.map((i) => {

        fetchedDiv.insertAdjacentHTML(
          "beforeend",
          `<div class="article">
            <h3>${i[9]}</h3>
            <div><strong>phone:</strong> <a href="tel:${i[10]}">${
            i[10]
          }</a></div>
            <div><a href="${i[11]}" target="_blank" aria-describedby="link-new-window">${i[11]}</a></div>
            <div><strong>street address:</strong></div>
            <div>${i[12]}</div>
            <div>${i[13]} ${i[14]} ${~~i[15] == 0 ? "" : ~~i[15]}</div>
          </div>
        `
        );
      });
      removeLoader();

      //enable news fetch
      fetchedDiv.insertAdjacentHTML(
        "beforebegin",
        `<button id="getnews">Fetch news articles</button>`
      );
      const cta = document.getElementById("getnews");
      cta.addEventListener("click", () => {
        insertLoader();
        hackerNews();
        cta.remove();
      });
    });

    const hackerNews = () => {
      new getTopNews().getStories().then(data => {
        const fetchedDiv = document.getElementById("fetchedData");
        data.map((yoObj) => {
          fetchedDiv.insertAdjacentHTML(
            "afterbegin",
            `<div class="article">
                <h3>${yoObj.title}</h3>
                <div>Author: ${yoObj.by}</div>
                <div><a href="${yoObj.url}" target="_blank" aria-describedby="link-new-window">${yoObj.url}</a></div>
              </div>
            `
          );
        });
        removeLoader();
        fetchedDiv.insertAdjacentHTML(
        "beforebegin",
        `<h2 class="hacker-news">Hacker News Today</h2>`
      );
      });
    };
  }

  return {
    init: _setName
  };
})();

fetchingStuff.init();