// load categories
const loadCategories = ()=>{
    spinner(true);
    fetch(' https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category))
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
        li.onclick = ()=>{
            loadNews(category_id);
        }
        
    })
    spinner(false);
}

// load news 
const loadNews = (category_id)=>{
    spinner(true);
    fetch(` https://openapi.programming-hero.com/api/news/category/${category_id}`)
    .then(res => res.json())
    .then(data => displayNews(data.data))
}
loadNews('01')


// display news 
const displayNews = (news)=>{
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ' '
    news.forEach(singleNews =>{
        const{_id,author,image_url,title,total_view,details} = singleNews;
        console.log(singleNews)
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
                    <i onclick = "loadDetails('${_id}')" style= "cursor:pointer" class="fa-solid fa-2x fa-arrow-right"></i>
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
}


// display details on modal
const showDetails = (details)=>{
    console.log(details)
}


// spinner 
function spinner(isLoading){
    const loadingSpinner = document.getElementById('spinner');
    if(isLoading){
        loadingSpinner.classList.remove('d-none');
    }else{
        loadingSpinner.classList.add('d-none');
    }
}