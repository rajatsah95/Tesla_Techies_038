
function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}


window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}




function showContent(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');

    // Remove active class from all list items
    const listItems = document.querySelectorAll('.navigation li');
    listItems.forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to the clicked list item
    const activeListItem = document.querySelector(`.navigation li[onclick="showContent('${sectionId}')"]`);
    activeListItem.classList.add('active');
}

// Show the first section by default
document.addEventListener('DOMContentLoaded', () => {
    showContent('your-lists');
});

// staff -------------------------------------

const recommended_topic=["React","Web development","Entrepreneurship", "Information","Javascript","Work","Database","Data analytics"]
let staff_picks = document.querySelector("#staff-picks");
let recommend_topic = document.querySelector("#recommend-topics");
async function fetchStaffData() {
    let res = await fetch('https://tesla-techies-038-2.onrender.com/articles');
    let data = await res.json();
    return data;
}

async function showStaffData() {
    let newData = await fetchStaffData();
    displayStaffData(newData);

    
        getdata(recommended_topic);
}

function displayStaffData(newData) {
    let clapsData= newData.filter(ele=>
        ele.claps >= 110
    )
    console.log(clapsData)
    let data2 = clapsData.slice(4, 7);
    data2.forEach((ele) => {
        let card = document.createElement("div");
        card.className = "card";

        let authorInfo = document.createElement("div");
        authorInfo.className = "author-info";

        let authorImage = document.createElement("img");
        authorImage.src = `${ele.authorImage}`;
        authorImage.className = "authorImage";

        let authorName = document.createElement("p");
        authorName.className = "authorName";
        authorName.innerHTML = `${ele.authorName}`;

        let publicationName = document.createElement("p");
        publicationName.className = "publicationName";
        publicationName.innerHTML = `in ${ele.publicationName}`;

        let articleDetails = document.createElement("div");
        articleDetails.className = "articleDetails";

        let articleTitle = document.createElement("p");
        articleTitle.className = "articleTitle";
        articleTitle.innerHTML = `<h2>${ele.articleTitle}</h2>`;

        

        authorInfo.append(authorImage, authorName, publicationName);
        articleDetails.append(articleTitle);

        card.append(authorInfo, articleDetails);
        card.addEventListener('click', ()=>{
            console.log('card clicked')
            window.location.href = `details.html?id=${ele.id}`;
          } )
        staff_picks.append(card); 
           
    });
}
function getdata(recommended_topic){
    
    recommended_topic.forEach((ele) =>{
        
        let btn1 = document.createElement("button")
        btn1.className="btn-1"
        btn1.textContent= `${ele}`;

        
        recommend_topic.append(btn1)
    })
}

showStaffData();