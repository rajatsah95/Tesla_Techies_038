let container_ikbal = document.querySelector("#container-ikbal")
let space = " "
async function fetchData(){
      let res = await fetch('http://localhost:3000/articles')
      let data = await res.json()
      return data
}

async function showData(){
    let newData = await fetchData()
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
           content.innerHTML = `${ele.content.substring(0, 30)}...`

        ////////////////////Interaction Bar start///////////////\

             let interactionBar = document.createElement("div")
             interactionBar.id = "interactionBar"
             let claps = document.createElement("p")
            //  let comments = document.createElement("p")
            
        let barleft = document.createElement("p")
           barleft.innerHTML = `${ele.publicationDate} ${space} ${space} ${space}     <i class="fa-solid fa-hands-clapping"></i>${344}    <i class="fa-regular fa-comment"></i>${9}`

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
        ////////////////////Article Image start///////////////
        let articleImage = document.createElement("img")
             articleImage.src = `${ele.articleImage}`
             articleImage.className = "articleImage"
             let articleImageDiv = document.createElement("div")
             articleImageDiv.append(articleImage)
          ////////////////////Article Image end///////////////
            let hr = document.createElement("hr")
        card.append(contentBox, articleImageDiv)
        container_ikbal.append(card, hr)
     })
   
}

showData()