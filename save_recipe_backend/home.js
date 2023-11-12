const likeone = document.querySelector('.likeone');
const liketwo = document.querySelector('.liketwo');
const liket = document.querySelector('.liket');
var blurEnabled = false;
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');


const contentContainer = document.querySelector('.footer');
var addIngredientButton = document.getElementById('add-ingredient');
var ingredientList = document.getElementById('ingredient-list');
const blourthings = document.getElementsByClassName('blurkaro');
var ingredientCount = 0;


addIngredientButton.addEventListener('click', function() {
    ingredientCount++;
    var ingredientItem = document.createElement('div');
    ingredientItem.className = 'ingredient-item';
    ingredientItem.innerHTML = `
        <input type="checkbox" id="ingredient${ingredientCount}" name="ingredient" value="Ingredient">
        <input type="text" id="ingredientName${ingredientCount}" name="ingredientName" placeholder="Ingredient ${ingredientCount}">
        <button class="remove-ingredient-button" id="remove-ingredient${ingredientCount}">-</button>
    `;
    ingredientList.appendChild(ingredientItem);

    var removeIngredientButton = document.getElementById(`remove-ingredient${ingredientCount}`);
    removeIngredientButton.addEventListener('click', function() {
        ingredientList.removeChild(ingredientItem);
        ingredientCount--;
    });
});

// Add a submit event listener to the form
document.getElementById('filterForm').addEventListener('submit', function(event) {
    // Check if the required fields (hours and minutes) are filled out
    var hoursInput = document.getElementById('hours');
    var minutesInput = document.getElementById('minutes');

    if (!hoursInput.value || !minutesInput.value) {
        // Prevent the form from submitting
        event.preventDefault();
        // Display the "Please fill out this form" message
        alert('Please fill out this form');
    }
});

{ % comment %
}
filterButton.addEventListener('click', function() {
    console.log("filter-button is clicked");
    if (filterForm.classList.contains('active')) {
        filterForm.classList.remove('active');
    } else {
        filterForm.classList.add('active');
    }
}); { % endcomment %
}

// Function to handle clicks outside of the filter-for


likeone.onclick = function() {
    console.log('this is like one');
    likeone.style.backgroundColor = 'rgb(285, 66, 149)';
}
liketwo.onclick = function() {
    liketwo.style.backgroundColor = 'rgb(285, 66, 149)';
}
liket.onclick = function() {
    liket.style.backgroundColor = 'rgb(285, 66, 149)';
}

const searchForm = document.querySelector('#searchForm');
const searchTermInput = document.querySelector('#exampleInputEmail1');
const resultsList = document.querySelector('#results');
console.log(searchForm)


let cuisineType = "";
let mealType = "";
let ingredients = ["", "", ""];

function setCuisineType(e) {
    console.log(e);
    console.log(e.value);
    cuisineType = e.value;
}

function setMealType(e) {
    console.log(e);
    console.log(e.value);
    mealType = e.value;
}

async function applyForm(e) {
    filterForm.classList.remove('active');
    e.preventDefault();
    const ingredientInputs = document.querySelectorAll('input[name="ingredientName"]');
    const ingredientsArray = Array.from(ingredientInputs).map(input => input.value);
    console.log(ingredientsArray)
    const limit = 12;
    const searchValue = searchTermInput.value;
    console.log(searchValue)
    console.log(cuisineType)
    console.log(mealType)
    const finalSearchValue = searchValue + ' ' + cuisineType + ' ' + mealType + ' ' + ingredientsArray.join(' ');
    console.log(ingredientsArray + " is ")
    console.log(finalSearchValue)
    const response = await fetch(`https://api.edamam.com/search?q=${finalSearchValue}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=${limit}`);
    const data = await response.json();
    console.log(data.hits)
    const nik1 = data.hits
    const nik2 = nik1[0]
    console.log(nik2)
        //console.log(nik2.recipe)
        //console.log(nik2.recipe.cuisineType[0])
        //console.log(nik2.recipe.mealType[0])
    displayRecipes(data.hits);
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(searchTermInput.value)
    searchRecipes();
})

async function searchRecipes() {
    const limit = 12;
    const searchValue = searchTermInput.value;
    console.log(searchValue)
    console.log(cuisineType)
    console.log(mealType)
    const finalSearchValue = searchValue + ' ' + cuisineType + ' ' + mealType + ' ' + ingredients[0] + ' ' + ingredients[1] + ' ' + ingredients[2];
    console.log(finalSearchValue)
    const response = await fetch(`https://api.edamam.com/search?q=${finalSearchValue}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=${limit}`);
    const data = await response.json();
    console.log(data.hits)
    const nik1 = data.hits
    const nik2 = nik1[0]
    console.log(nik2)
        //console.log(nik2.recipe)
        //console.log(nik2.recipe.cuisineType[0])
        //console.log(nik2.recipe.mealType[0])
    displayRecipes(data.hits);
}

function displayRecipes(recipes) {
    console.log("nik")
    let html = '';
    recipes.forEach((recipe) => {
        console.log(recipe.recipe.image)
        html += `
            <div class="ncard col-lg-3 col-md-4 col-sm-6 col-xs-12 border my-5 m-1">
                {% csrf_token %}
            <figure class="figure">
                <img src="${recipe.recipe.image}"
                    class="image img-fluid rounded-5" alt="${recipe.recipe.label}">
            </figure>


            <div class="second row mt-2">

                <div class="chef col-lg-6 d-flex justify-content-start">
                    <div class="chefname">
                        <div>-By abcdefghijk</div>
                        <div class="line"></div>
                        <div class="text-end">LA</div>
                    </div>

                    {% comment %} <img class="chefimage m-auto" src="image.png" alt="chefimage"> {% endcomment %}
                </div>

                <div class="recipe col-lg-6 col-sm-12 d-flex justify-content-lg-end">

                    <div class="chefname">
                        <div class="row">
                            <span class="fs-10 fw-bolder recipename">
                                ${recipe.recipe.label}
                            </span>
                        </div>

                        <div class="fs-6 fw-bolder">
                            <span style="color: blue;">4.5</span>
                            <span style="color: orange;">rating</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="third row d-flex justify-content-between mt-2">
                <div class="col-lg-6 col-sm-12 justify-content-lg-start">
                    ${recipe.recipe.cuisineType}, ${recipe.recipe.mealType}
                </div>
                <div class="col-lg-6 col-sm-12 justify-content-lg-end text-end">
                    20 min
                </div>
            </div>

            <div class="line"></div>

            <br>

            <div class="fourth d-flex justify-content-between">
                <div class="lss like likeone mx-auto">
                    <button class="btn btn-transparent btn-sm " name="like" id="like">
                        <i class="fa-solid fa-heart"></i>
                        Like
                    </button>
                </div>
                <div class="lss share mx-auto">
                    <button class="btn btn-transparent btn-sm" name="share" id="share">
                        <i class="fa-sharp fa-solid fa-share-nodes"></i>
                        Share
                    </button>
                </div>
                <div class="lss save mx-auto">
                    <button class="btn btn-transparent btn-sm save" name="save" id="save">
                        <i class="fa-solid fa-floppy-disk"></i>
                        Save
                    </button>
                </div>
            </div>

            <div class="fifth cook d-flex justify-content-center mx-auto mt-3 mb-1">
                <button class="btn btn-transparent btn-sm" onclick="window.open('${recipe.recipe.url}', '_blank')"; name="cook" id="cook">
                    <div class="fs-4">
                        cook
                    </div>
                </button>
            </div>
        </div>
            
            `
    });
    resultsList.innerHTML = html;
    mealType = "";
    ingredients = ["", "", ""];
    cuisineType = "";
    finalSearchValue = "";
    searchValue = "";

}

const filterButton = document.getElementById('filter-button');
const filterForm = document.getElementById('filter-form');

document.addEventListener('click', function(event) {
    // Check if the click event did not occur within the filter-form
    if (filterButton.contains(event.target)) {
        if (filterForm.classList.contains('active')) {
            filterForm.classList.remove('active');
        } else {
            console.log("ha adi le loda")
            filterForm.classList.add('active');
        }
    } else if (!filterForm.contains(event.target) && filterForm.classList.contains('active')) {
        filterForm.classList.remove('active');
        contentContainer.style.backdropFilter = 'none';
    }
});


{ % comment %
}
try to save { % endcomment %
}

const recipeCardsContainer = document.getElementById('results');
recipeCardsContainer.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('save')) {
        console.log("hello in save my darlng")
        const recipeCard = clickedElement.closest('.ncard');
        const recipeData = extractRecipeData(recipeCard);
        console.log(recipeData);
        /*const csrfToken = document.querySelector('input[name=csrfmiddlewaretoken]').value;
         
         // Send recipeData to the backend using AJAX
         const xhr = new XMLHttpRequest();   
         xhr.open('POST', '/save_recipe');
         xhr.setRequestHeader('Content-Type', 'application/json');
         xhr.setRequestHeader('X-CSRFToken', csrfToken);
         xhr.onload = () => {
             if (xhr.status >= 200 && xhr.status < 300) {
                 console.log('Recipe saved successfully');
             } else {
                 console.error('Error saving recipe:', xhr.statusText);
             }
         };
         xhr.send(JSON.stringify(recipeData));
         */
        var url = "/home/?" + recipeData;
        console.log("url iis " + url)
        window.location.href = url;
    }
});

function extractRecipeData(recipeCard) {

    const recipeImage = recipeCard.querySelector('.image').src;
    const recipeencodedImage = btoa(recipeImage);
    const recipeLabel = recipeCard.querySelector('.recipename').textContent;
    //const chefName = recipeCard.querySelector('.chefname div:first-child').textContent;
    const cuisineType = recipeCard.querySelector('.third div:first-child').textContent.split(', ')[0];
    const mealType = recipeCard.querySelector('.third div:first-child').textContent.split(', ')[1];
    const preparationTime = recipeCard.querySelector('.third div:last-child').textContent;
    //const recipeURL = recipeCard.querySelector('.cook button').getAttribute('href');;
    const recipeURL = recipeCard.querySelector('.fifth .btn').getAttribute('onclick').match(/'([^']+)'/)[1];
    //const ecuisineType = encodeURIComponent(cuisineType);
    //const emealType = encodeURIComponent(mealType);
    //const epreparationTime = encodeURIComponent(preparationTime);
    //const erecipeURL = encodeURIComponent(recipeURL);
    //const erecipeLabel = encodeURIComponent(recipeLabel);

    console.log(recipeencodedImage + "    ....in the extractRecipeData")
    const stri = "param1=" + recipeencodedImage + "&param2=" + recipeLabel.trim() + "&param3=" + cuisineType.trim() + "&param4=" + mealType.trim() + "&param5=" + preparationTime.trim() + "&param6=" + recipeURL;
    return stri;
}

document.addEventListener("DOMContentLoaded", function() {
    var messages = document.getElementById("notification");
    if (messages) {
        var message = messages.innerText.trim();
        if (message !== "") {
            showNotification(message);
        }
    }
});

// Function to show a notification
function showNotification(message) {
    var notification = document.getElementById("notification");
    notification.style.display = "block"; { % comment %
    }
    notification.innerHTML = `<ul class="messages">${message}</ul><button id="close-notification" onclick="closeNotification()">Close</button>`; { % endcomment %
    }

    // Hide the notification after 5 seconds
    setTimeout(function() {
        notification.style.display = "none";
    }, 50000);
}

// Function to close the notification
function closeNotification() {
    var notification = document.getElementById("notification");
    if (notification) {
        notification.style.display = "none";
    }
}