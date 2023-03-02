const loadMeal = (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

    fetch(url)
        .then(response => response.json())
        .then(data => loadMealData(data.meals
        ));
}

const loadMealData = (meals) => {
    console.log(meals);

    //Container Element
    const mealContainer = document.getElementById('mealContainer');
    mealContainer.innerText = '';

    meals.forEach(meal => {
        const priceStr = meal.idMeal;
        const priceNum = parseFloat(priceStr);
        const price = (((priceNum * 333) % 769));



        console.log(typeof (priceNum));
        // create child for element
        const item = document.createElement('div')
        item.classList.add('col')

        //Set content of the child
        item.innerHTML = `
        <div class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name: ${meal.strMeal}</h5>
                    
                    <h6 class="card-title">Category: ${meal.strCategory}</h6>
                    <p class="card-text">Enjoy our expertly crafted dishes, made with only the freshest ingredients, and savor a truly unforgettable dining experience.</p>

                    <div class="d-flex justify-content-between">
                        <button type="button" class="btn btn-outline-primary fw-bold">${price} Taka</button>

                        <button onclick="loadMealDetail(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetails">
                        Order Now
                        </button>
                        
                    </div>

                </div>
        </div>
        `
        // Append the child to main div
        mealContainer.appendChild(item)

    })

}
const getButton = () => {
    // const searchData = document.getElementById('searchText').value;
    // const searchText = searchData.value;
    // searchData.value = '';
    // loadMeal(searchText)
    // // return searchText;

    const searchText = document.getElementById('searchText').value;
    console.log(searchText);
    loadMeal(searchText)
}

const loadMealDetail = (idMeal) => {
    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(response => response.json())
        .then(dataIDMeal => displayMealDetails(dataIDMeal.meals[0]));
}

const displayMealDetails = (meal) => {
    console.log(meal)

    document.getElementById('mealDetailsLabel').innerText = meal.strMeal;

    const modalBody = document.getElementById('modalBodyId');
    modalBody.innerHTML = `
    <h4 class="text-start mt-3 text-primary"> ${meal.strArea} food</h4>
    <img class="img-fluid w-75" src="${meal.strMealThumb}" alt="">
    
    `
}

loadMeal('chicken')