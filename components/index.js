let container_ikbal = document.querySelector("#container-ikbal")
let articles = document.querySelector("#articles")
let artcicleTypeArray = ["Work", "React", "Web Development", "Entrepreneurship"];
let space = " "
async function fetchData(){
      let res = await fetch('http://localhost:3000/articles')
      let data = await res.json()
      return data
}

async function showData(){
    let newData = await fetchData()
    displayData(newData)
}
//////////////////////////////////////DISPLAY DATA/////////////////////////////////////////////////////////////////////
function displayData(newData){
  console.log(newData)
  newData.forEach(ele=> {
     let card = document.createElement("div")
     card.className = "card"
     let authorImage = document.createElement("img")
       authorImage.src = `${ele.authorImage}`
       authorImage.className = "authorImage"
     let authorName = document.createElement("p")
       authorName.innerHTML = `${ele.authorName} ̣${space}  `
     let publicationName = document.createElement("p")
     publicationName.innerHTML = ` in  ${ele.publicationName}`
     let articleDetails = document.createElement("p")
     articleDetails.className = "articleDetails"
       articleDetails.append(authorImage, authorName, publicationName)
     let articleTitle = document.createElement("image")
       articleTitle.innerHTML = `<h2>${ele.articleTitle}</h2>`
     let content = document.createElement("p")
        content.innerHTML = `${ele.content.substring(0, 115)}...`
     ////////////////////Interaction Bar start//////////////////////////////////////////////////////
          let interactionBar = document.createElement("div")
          interactionBar.id = "interactionBar"
          let claps = document.createElement("p")
          claps.innerHTML = ` <i class="fa-regular fa-comment"></i>${ele.claps}`
          let commentCounts = document.createElement("p")
          commentCounts.innerHTML =  `<i class="fa-solid fa-hands-clapping"></i>${ele.commentCounts}`
        
     let barleft = document.createElement("p")
     barleft.className = "barleft"
     let publicationDate = document.createElement("p")
        publicationDate.innerHTML = `${ele.publicationDate}    `
        barleft.append(publicationDate, claps, commentCounts)
        let barright = document.createElement("p")
        let showLessBtn = document.createElement("button"); showLessBtn.innerHTML = `<i class="fa-solid fa-circle-minus"></i>`
        let saveBtn = document.createElement("button"); saveBtn.innerHTML = `<i class="fa-regular fa-bookmark"></i>`
        let moreBtn = document.createElement("button"); moreBtn.innerHTML = `More`
     barright.append(showLessBtn, saveBtn, moreBtn)

     interactionBar.append(barleft, barright)
         let articleType = document.createElement("button")
         articleType.innerHTML = `${ele.articleType}`
     let contentBox =  document.createElement("div")
     contentBox.className = "contentBox"
     contentBox.append(articleDetails, articleTitle, content, interactionBar)
     ////////////////////Article Image start////////////////////////////////////////////////////////////////////////////
     let articleImage = document.createElement("img")
          articleImage.src = `${ele.articleImage}`
          articleImage.className = "articleImage"
          let articleImageDiv = document.createElement("div")
          articleImageDiv.append(articleImage)
    ////////////////////Article Image end/////////////////////////////////////////////////////////////////////////////
         let hr = document.createElement("hr")
     card.append(contentBox, articleImageDiv)
     articles.append(card, hr)
  }) 
}

showData()
//////////////////////////////////tags section function////////////////////////////////////////////////////////

let tags_bar = document.querySelector("#tags-bar")
console.log(tags_bar)
tags_bar.addEventListener('click', (event)=>{
  if (event.target.classList.contains('tags')) {
     filteredData(event);
  }
})
async function filteredData(event){
  let buttonValue = event.target.innerHTML
    console.log(buttonValue)
    if(buttonValue== "Following"){
      buttonValue = "Entrepreneurship"
    }
    if(buttonValue!= "For you"){
      let data1 = await fetchData()
      console.log("inside filtered data")
    let tagwiseData = data1.filter(ele=>
     ele.articleType == buttonValue
      )
      articles.innerHTML = ""
     displayData(tagwiseData)
    }
    if(buttonValue == "For you"){
      articles.innerHTML = ""
        showData()
    }
}

////////////////////////////////////SEARCHING START///////////////////////////////////////////////////////
////////////////////////////////////SEARCHING END///////////////////////////////////////////////////////

