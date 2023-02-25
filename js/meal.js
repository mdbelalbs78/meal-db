const loadMeals = (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
  console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals))
}

const displayMeals = meals => {
  // console.log(meals);
  const mealsContainer = document.getElementById('meals-container');
  mealsContainer.innerText = '';
  meals.forEach(meal => {
    console.log(meal);
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('col')
    mealDiv.innerHTML = `
        <div class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick = "loadMealsDetail2(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetails">
  Details
</button>
        </div>
      </div>
        `;
    mealsContainer.appendChild(mealDiv)
  })

}

const seachMeal = () => {
  const searchText = document.getElementById('search-filed').value;
  console.log(searchText);
  loadMeals(searchText)
}

const loadMealsDetails = idMeal => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
    .catch(error => {
      console.log(error)
    })
}
// async await 
const loadMealsDetail2 = async (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`

  try{
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0]);
  }
  catch(error){
     console.log(error);
  }
 
}

const displayMealDetails = meal => {
  document.getElementById('mealDetailsLabel').innerText = meal.strMeal;
  const mealDetails = document.getElementById('mealDetailsLBody');
  mealDetails.innerHTML = `
        <img class="img-fluid" src="${meal.strMealThumb}"></img>
     `
}


loadMeals('fish');