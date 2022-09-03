// load categories
const loadCategories = ()=>{
    fetch(' https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category))
    .catch(error => showError(error,'categories'))
}
loadCategories();

// display Categories
const displayCategories = (categories)=>{
    const categoriesContainer = document.getElementById('categories');
    categories.forEach(category =>{
        const{category_id, category_name} = category;
        const li = document.createElement('li');

        li.innerText = category_name;
        categoriesContainer.appendChild(li);
        li.onclick = (e)=>{
            document.querySelector('.active').classList.remove('active');
               e.target.className = 'active';
            loadNews(category_id,category_name);
        }
        
    })
    
}

// load news 
const loadNews = (category_id,category_name)=>{
    spinner(true);
    fetch(` https://openapi.programming-hero.com/api/news/category/${category_id}`)
    .then(res => res.json())
    .then(data => displayNews(data.data,category_name))
    .catch(error => showError(error,'news-container'))
}



// display news 
const displayNews = (news,category_name)=>{
    const newsContainer = document.getElementById('news-container');
    const newsCount = document.getElementById('news-count');
    if(news.length > 0){
        newsCount.innerText = `${news.length} news found for category ${category_name}.`;
    }else{
        newsCount.innerText = `No news found for category ${category_name}`;
    }

    newsContainer.innerHTML = ' '
    news.sort((a, b) => b.total_view - a.total_view);
    news.forEach(singleNews =>{
        const{_id,author,image_url,title,details,total_view} = singleNews;
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.classList.add('mb-3')
        newsDiv.innerHTML = `
            <div class="row g-0">
            <div class="col-md-4 h-md-100">
            <img src="${image_url}" class="img-fluid h-100 rounded-start" alt="...">
            </div>  
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${details.slice(0,200)}...</p>
                <div class="card-text "><small class="text-muted d-flex justify-content-between align-items-center">
                    <div>
                    <img style= "width:30px" class= "rounded-circle" src="${author.img}"    
                       <p> ${author.name? author.name:'No name found'}</p>
                       <p> ${author.published_date? author.published_date:'No date found'}</p>
                    </div>
                    <div><i class="fa-solid fa-eye me-1"></i>${total_view? total_view: 'no view found'} </div>
                    <div onclick = "loadDetails('${_id}')" style=   "cursor:pointer"  class = "d-flex align-items-center gap-1" data-bs-toggle="modal" data-bs-target="#newsModal">
                        <span>See Details</span><i class="fa-solid fa-2x fa-arrow-right"></i>
                    </div>
                </small></div>
            </div>
            </div>
        </div>
        `
    newsContainer.appendChild(newsDiv);
    })
    spinner(false);
}


// load details 
const loadDetails = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(res => res.json())
    .then(data => showDetails(data.data[0]))
    .catch(error => showError(error,'newsModalLabel'))
}


// display details on modal
const showDetails = (details)=>{
   console.log(details)
    const{title,thumbnail_url,author,rating} = details;
    document.getElementById('newsModalLabel').innerText = `News Title:${title?title : 'no title found'}`;
    const thumbnailImg = document.getElementById('thumbnail-img');
    thumbnailImg.src = thumbnail_url;
    const detailsContainer = document.getElementById('details');
    detailsContainer.innerHTML = `
        <p>Author Name: ${author.name? author.name: 'no name found'}</p>
        <p>Rating Badge: ${rating.badge? rating.badge : 'no badge found'}</p>
        <p>Rating Number: ${rating.number? rating.number : 'no number found'}</p>
    `

}


// spinner 
function spinner(isLoading,id){
    const loadingSpinner = document.getElementById('spinner');
    if(isLoading){
        loadingSpinner.classList.remove('d-none');
    }else{
        loadingSpinner.classList.add('d-none');
    }
}

//error msg
const showError = (msg,id)=>{
    const msgField = document.getElementById(id);
    msgField.classList.add('text-danger')
    msgField.innerText = `
    404 Not found
    ${msg} 
    `
}