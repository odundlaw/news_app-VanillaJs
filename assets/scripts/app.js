const apiKey = "c6bd010579014504a22133730787e1f0";

const toggler = document.querySelector(".nav-toggler");
const sidebar = document.querySelector("sidebar");
const sidebarNav = sidebar.querySelector(".sidebar-navigations ul");

const newsTemplate = document.getElementById("news-template");

toggler.addEventListener(
  "click",
  function (e) {
    const sidebarBound = sidebar.getBoundingClientRect();
    const sidebarWidth = sidebar.offsetWidth;
    // console.log(sidebarBound);
    if (sidebarBound.left >= 0) {
      document.body.style.left = 0 + "px";
      sidebar.style.transform = "translateX(-300px)";
    } else {
      document.body.style.left = sidebarWidth + "px";
      sidebar.style.transform = "translateX(0)";
    }
  },
  false
);

sidebarNav.addEventListener("click", function () {
  document.body.style.left = 0 + "px";
  sidebar.style.transform = "translateX(-300px)";
});

const encodedParams = new URLSearchParams();
encodedParams.append("api-key", "f0281dd3-c081-47ca-894b-cc7c6c86ecae");
encodedParams.append("show-fields", "thumbnail");
encodedParams.append("page-size", 30);

/* const options = {
  method: "GET",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": "f0281dd3-c081-47ca-894b-cc7c6c86ecae",
    "X-RapidAPI-Host": "Guardianmikilior1V1.p.rapidapi.com",
  },
  body: encodedParams,
}; */

fetch(`https://content.guardianapis.com/search?${encodedParams}`)
  .then((response) => response.json())
  .then((data) => {
    const { results } = data.response;

    const bannerNews = results.slice(0, 1);
    getBannerNewResult(bannerNews);

    const bodyNews = results.slice(4, 30);

    console.log(results);
    const listElement = document.querySelector(".news-lists");

    for (let post of bodyNews) {
      const clonedNewstemplate = document.importNode(
        newsTemplate.content,
        true
      );
      const newsItem = clonedNewstemplate.querySelector("li");
      newsItem.querySelector("h2").textContent = post.webTitle;

      if (post.fields?.thumbnail) {
        newsItem.querySelector("img").src = post.fields.thumbnail;
      }

      listElement.append(newsItem);
    }
  })
  .catch((err) => console.error(err));

function getBannerNewResult(result) {
  const bannerNewsTemplate = document.getElementById("banner-news-template");
  const bannerNewsList = document.querySelector(".banner-news-list");
  const bannerNewsListHeadertext = document.querySelector(".banner h2");

  for (const newsItem of result) {
    const listItem = document.importNode(bannerNewsTemplate.content, true);
    listItem.querySelector("h2").textContent = newsItem.webTitle;

    if (newsItem.fields?.thumbnail) {
      listItem.querySelector("img").src = newsItem.fields.thumbnail;
    }

    bannerNewsListHeadertext.style.transform = "translateX(0)";

    bannerNewsList.append(listItem);
  }
}
