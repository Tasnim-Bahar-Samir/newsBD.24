const loadCategories = ()=>{
    fetch(' https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.data.news_category))
}
loadCategories()
const displayCategories = (categories)=>{
    const categoriesContainer = document.getElementById('categories');
    categories.forEach(category =>{
        const{category_id, category_name} = category;
        const li = document.createElement('li');
        li.innerText = category_name;
        categoriesContainer.appendChild(li)
    })
}