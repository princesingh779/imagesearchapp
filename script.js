const accessKey = "OhLsxfyLjO6Qtk-Kq0_DrOMc3Kcxt4NzOCWNYjQzdfY";

const formEl = document.querySelector('form');
const inputEl = document.getElementById("search-input");
const searchResult = document.querySelector(".Search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;
async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
    

    const results = data.results;
    
    if (page === 1) {
        searchResult.innerHTML = "";
    }
    
    results.map((result) => {
        const ImageWrapper = document.createElement("div");
        ImageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        ImageWrapper.appendChild(image);
        ImageWrapper.appendChild(imageLink);
        searchResult.appendChild(ImageWrapper);
    });
    page++;

    if (page > 1) {
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});
showMore.addEventListener("click", () => {
  
    searchImages();
});