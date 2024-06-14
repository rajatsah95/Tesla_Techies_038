let container_ikbal = document.querySelector("#container-ikbal");
let articles = document.querySelector("#articles");
let articleTypeArray = ["Work", "React", "Web Development", "Entrepreneurship"];
let space = " ";
let page = 1; // Track the current page
let fetching = false; // To prevent multiple fetches
//////////////////////////////////////////////////FETCH DATA/////////////////////////////////////////////////////////////////////////
async function fetchData(page) {
  try {
    let res = await fetch(
      `https://tesla-techies-038-2.onrender.com/articles?_page=${page}`
    );
    if (!res.ok) throw new Error("Network response was not ok");
    let data = await res.json();
    console.log(`Fetched data for page ${page}:`, data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
////////////////////////////////////////////////////FETCH DATA FOR FILTERING///////////////////////////////////////////////////////////////
async function fetchDataForFilter() {
  try {
    let res = await fetch(`https://tesla-techies-038-2.onrender.com/articles`);
    if (!res.ok) throw new Error("Network response was not ok");
    let data = await res.json();
    console.log("inside fetchDataForFilter");
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function showData() {
  let newData = await fetchData(page);
  displayData(newData);
}
////////////////////////////////////////////////////DISPLAY DATA/////////////////////////////////////////////////////////////////////////
function displayData(newData) {
  console.log("Displaying data:", newData);
  newData.forEach((ele) => {
    let card = document.createElement("div");
    card.className = "card";

    let authorImage = document.createElement("img");
    authorImage.src = `${ele.authorImage}`;
    authorImage.className = "authorImage";

    let authorName = document.createElement("p");
    authorName.innerHTML = `${ele.authorName}`;

    let publicationName = document.createElement("p");
    publicationName.innerHTML = ` in  ${ele.publicationName}`;

    let articleDetails = document.createElement("p");
    articleDetails.className = "articleDetails";
    articleDetails.append(authorImage, authorName, publicationName);

    articleDetails.addEventListener('click', ()=>{
      window.location.href = `details.html?id=${saveBtn.dataset.articleId}`;
    } )

    let articleTitle = document.createElement("h2");
    articleTitle.innerHTML = `${ele.articleTitle}`;
    articleTitle.addEventListener('click', ()=>{
      window.location.href = `details.html?id=${saveBtn.dataset.articleId}`;
    } )

    let content = document.createElement("p");
    content.innerHTML = `${ele.content.substring(0, 115)}...`;

    content.addEventListener('click', ()=>{
      window.location.href = `details.html?id=${saveBtn.dataset.articleId}`;
    } )

    let interactionBar = document.createElement("div");
    interactionBar.id = "interactionBar";

    let claps = document.createElement("p");
    claps.innerHTML = `<i class="fa-solid fa-hands-clapping"></i>${ele.claps}`;

    let commentCounts = document.createElement("p");
    commentCounts.innerHTML = `<i class="fa-regular fa-comment"></i>${ele.commentCounts}`;

    let barleft = document.createElement("p");
    barleft.className = "barleft";
    let publicationDate = document.createElement("p");
    publicationDate.innerHTML = `${ele.publicationDate}`;

    barleft.append(publicationDate, claps, commentCounts);

    let barright = document.createElement("p");
    barright.className = "barright";
    let showLessBtn = document.createElement("button");
    showLessBtn.innerHTML = `<i class="fa-solid fa-circle-minus"></i>`;
    let saveBtn = document.createElement("button");
    saveBtn.innerHTML = `<i class="fa-regular fa-bookmark"></i>`;
      saveBtn.className = "save-button"
      saveBtn.dataset.articleId = ele.id; 
      saveBtn.addEventListener("click", bookmark);

    let moreBtn = document.createElement("button");
    moreBtn.innerHTML = `More`;

    barright.append(showLessBtn, saveBtn, moreBtn);
    interactionBar.append(barleft, barright);

    let articleType = document.createElement("button");
    articleType.innerHTML = `${ele.articleType}`;

    let contentBox = document.createElement("div");
    contentBox.className = "contentBox";
    contentBox.append(articleDetails, articleTitle, content, interactionBar);
   

    let articleImage = document.createElement("img");
    articleImage.src = `${ele.articleImage}`;
    articleImage.className = "articleImage";
    let articleImageDiv = document.createElement("div");
    articleImageDiv.append(articleImage);
    articleImageDiv.addEventListener('click', ()=>{
      window.location.href = `details.html?id=${saveBtn.dataset.articleId}`;
    } )

    let hr = document.createElement("hr");
    card.append(contentBox, articleImageDiv);
    // card.addEventListener('click', ()=>{
    //   window.location.href = `details.html?id=${saveBtn.dataset.articleId}`;

    // } )
    articles.append(card, hr);
  });
}

showData();
////////////////////////////////////////////////////FETCH USER DATA///To bookmark//////////////////////////////////////////////////////
const userId = 1; // Replace with actual user ID
  // localStorage.getItem("oggedUser") 
  console.log(userId)
const userEndpoint = `https://tesla-techies-038-2.onrender.com/users/${userId}`;

async function fetchUserData() {
  try {
    let res = await fetch(userEndpoint);
    if (!res.ok) throw new Error("Network response was not ok");
    let userData = await res.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
////////////////////////////////////////////////////FETCH USER DATA////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////bookmark function////////////////////////////////////////////////////////////////////
async function bookmark(event) {
  console.log("Save Button Clicked");
  let saveBtn = event.target.closest(".save-button");
  let articleId = saveBtn.dataset.articleId;
  console.log("Article ID:", articleId);

  let userData = await fetchUserData();
  if (!userData) return;

  // Ensure bookmarks array exists
  if (!userData.bookmarks) {
    userData.bookmarks = [];
  }

  // Add the article ID to the bookmarks array if it's not already there
  if (!userData.bookmarks.includes(articleId)) {
    userData.bookmarks.push(articleId);
  } else {
    console.log("Article already bookmarked");
    alert("Article already bookmarked")
    return;
  }

  // Update the user data on the server
  try {
    let res = await fetch(userEndpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bookmarks: userData.bookmarks })
    });

    if (!res.ok) throw new Error("Network response was not ok");

    console.log("Bookmark added successfully");
    alert("Article Bookmarked")
  } catch (error) {
    console.error("Error updating user data:", error);
  }
}

////////////////////////////////////////////////////bookmark function///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////FITER DATA BY TAGS///////////////////////////////////////////////////////
let tags_bar = document.querySelector("#tags-bar");

tags_bar.addEventListener("click", (event) => {
  console.log("different tag clicked");
  if (event.target.classList.contains("tags")) {
    filteredData(event);
  }
});

async function filteredData(event) {
  let buttonValue = event.target.innerHTML;
  console.log(buttonValue);
  if (buttonValue == "Following") {
    buttonValue = "Entrepreneurship";
  }
  if (buttonValue != "For you") {
    fetchDataForFilter();
    let data1 = await fetchDataForFilter();
    console.log("inside filtered data");
    let tagwiseData = data1.filter((ele) => ele.articleType == buttonValue);
    articles.innerHTML = "";
    displayData(tagwiseData);
  }
  if (buttonValue == "For you") {
    articles.innerHTML = "";
    showData();
  }
}
///////////////////////////////////////////////////////////FITER DATA BY TAGS///////////////////////////////////////////////////////

///////////////////////////////////////////////////////////INFINITE SCROLL//////////////////////////////////////////////////////////////////
window.addEventListener("scroll", handleScroll);

async function handleScroll() {
  if (fetching) return; // Prevent multiple fetches
  console.log("Scrolling..."); // Debugging: Check if the function is being called

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
    // Added buffer for better UX
    console.log("triggered");
    fetching = true;
    page++;
    let newData = await fetchData(page);
    if (newData.length > 0) {
      displayData(newData);
    } else {
      console.log("No more data to display");
      page = 1;
      // window.removeEventListener('scroll', handleScroll);
    }
    fetching = false;
  }
}
///////////////////////////////////////////////////////////INFINITE SCROLL/////////////////////////////////////////////////////////////////
