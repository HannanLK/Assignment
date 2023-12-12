//when page loads, get reference to interactive elements
//Declaring DOM elements
const hotelForm = document.getElementById('booking_form');

//below is for the hotel booking
const userName = document.getElementById('user_name');
const userEmail = document.getElementById('user_email');
const userAddress = document.getElementById('user_address');
const userPhone = document.getElementById('user_phone');
const hotelLocation = document.getElementsByName('hotel');
const checkIN = document.getElementById('check_in');
const checkOUT = document.getElementById('check-out');


const singleRoom = document.getElementById("single_room");
const doubleRoom = document.getElementById("double_room");
const tripleRoom = document.getElementById("triple_room");

const adult_count_hotel = document.getElementById("adult_count_hotel");
const numKidHotel = document.getElementById("kid_count_hotel");

const extras = document.getElementsByName("extras");
const num_beds_extra = document.getElementById("num_beds");

const promo_code = document.getElementById("promo_code");

const live_hotel_cost = document.getElementById("live_hotel_cost");
const live_loyalty_points = document.getElementById("live_loyalty_points");

const hotel_output = document.getElementById("hotel_output");

const check_Loyalty_btn = document.getElementById("check_Loyalty");
const check_hotel_cost_btn = document.getElementById("check_hotel_cost");
const apply_favourites_btn = document.getElementById("apply_favourites");

let single_room_count;
let double_room_count;
let triple_room_count;

let kid_count;
let adult_count;
let num_beds;
let loyalty_points;
let hotel_cost;

let other_cost;

initialize();

//listen to user interactions
singleRoom.addEventListener("input", calculateHotelCost);
doubleRoom.addEventListener("input", calculateHotelCost);
tripleRoom.addEventListener("input", calculateHotelCost);

adult_count_hotel.addEventListener("input", calculateHotelCost)
numKidHotel.addEventListener("input", calculateHotelCost);
num_beds_extra.addEventListener("input", calculateHotelCost);

//buttons
check_hotel_cost_btn.addEventListener("click", checkHotelCost);
apply_favourites_btn.addEventListener("click", apply_favourites);
check_Loyalty_btn.addEventListener("click", check_Loyalty);

//function to initialize variables
function initialize() {
    single_room_count = 0;
    double_room_count = 0;
    triple_room_count = 0;

    kid_count = 0;
    adult_count=0;
    num_beds = 0;

    hotel_cost = 0;
    loyalty_points = 0;

    other_cost=0;
}

//Function to calculate hotel booking cost
function calculateHotelCost() {
    single_room_count = parseInt(singleRoom.value);
    double_room_count = parseInt(doubleRoom.value);
    triple_room_count = parseInt(tripleRoom.value);
    kid_count = parseInt(numKidHotel.value);
    adult_count = parseInt(adult_count_hotel.value)
    num_beds = parseInt(num_beds_extra.value);

    hotel_cost = single_room_count * 25000 + double_room_count * 35000 + triple_room_count * 40000;
    other_cost = kid_count * 5000 + num_beds *8000;
    hotel_cost+= other_cost;

    console.log(`Hotel Cost : ${hotel_cost}`)

    live_hotel_cost.innerText = hotel_cost;
}

//Function to check if the promo applied or not
function checkHotelCost() {
    hotel_output.innerText = "Rs. " + hotel_cost;

    //Output Paragraph
    document.getElementById('hotel_output').innerHTML = `Dear Valued Customer, Your Booking is confirmed! <br><br> Adults x ${adult_count} <br> Kids (above 5 yeaars) x ${kid_count}
    <br><br> Number of Single Rooms : ${single_room_count} | Double Rooms : ${double_room_count} | Triple Rooms : ${triple_room_count} <br><br> Extra Beds : ${num_beds}
    <br><br> Total Cost : ${hotel_cost} <br>`;

    if (promo_code.value == "Promo123") {
        hotel_cost -= hotel_cost * 0.05;
        hotel_output.innerText += `\nTotal After Promo Applied: ${hotel_cost}`;
        console.log("Promo Applied")
        console.log(`New Total : ${hotel_cost}`)
    }else{
        console.log("Promo Not Applied")
    }

}



//Function to save data in local storage
function apply_favourites() {
    const favourites = {
        userName : userName.value,
        userAddress : userAddress.value,
        userPhone : userPhone.value,
        hotelLocation : hotelLocation.value,
        checkIN : checkIN.value,

        single_room_count : parseInt(singleRoom.value),
        double_room_count : parseInt(doubleRoom.value),
        triple_room_count : parseInt(tripleRoom.value),
        kid_count : parseInt(numKidHotel.value),
        num_beds : parseInt(num_beds_extra.value),

        loyalty_points : parseInt(loyalty_points.value),

        //for adventure

        numLocalAdults : parseInt(num_local_adults.value),
        numLocalKids : parseInt(num_local_kids.value),
        numForeignAdults : parseInt(num_foreign_adults.value),
        numForeignKids : parseInt(num_foreign_kids.value),
    }

    localStorage.setItem('favourites', JSON.stringify(favourites));
    console.log(localStorage);
}

//Function to check loyalty points
function check_Loyalty() {
    let rooms = single_room_count + double_room_count + triple_room_count;

    if (rooms >= 3) {
        loyalty_points = rooms * 20;
        console.log(`Loyalty Points Earned : ${loyalty_points}`)
    }

    live_loyalty_points.innerText = loyalty_points;
}

// function BookNowButton(){
//     calculateHotelCost();
// }

function BookNowButton(){
    calculateHotelCost();

    // Highlight-background class is given in css
    hotel_output.classList.toggle('highlight-background');
}

// Function to calculate adventure cost *****************************************************************************************
function calculateAdventureCost() {
    const numLocalAdults = parseInt(document.getElementById('num_local_adults').value);
    const numLocalKids = parseInt(document.getElementById('num_local_kids').value);
    const numForeignAdults = parseInt(document.getElementById('num_foreign_adults').value);
    const numForeignKids = parseInt(document.getElementById('num_foreign_kids').value);
    const guidePreference = document.querySelector('input[name="guide_selection"]:checked');
  
    let totalAdults=0;
    let totalChildren=0;
    let totalCost = 0;
    totalAdults = numForeignAdults + numLocalAdults;
    totalChildren= numLocalKids + numForeignKids;

    // Cost for diving for locals and foreigners
    totalCost += numLocalAdults * 5000;
    totalCost += numLocalKids * 2000;
    totalCost += numForeignAdults * 10000;
    totalCost += numForeignKids * 5000;

    // totalCost = numLocalAdults * 5000 + numLocalKids * 2000 + numForeignAdults * 10000 + numForeignKids * 5000;
    console.log(`Total Cost : ${totalCost}`)
  
    // Additional cost for guide preference
    if (guidePreference) {
      if (guidePreference.value == 'With Guide') {
        totalCost += numLocalAdults * 1000;
        totalCost += numLocalKids * 500;
        totalCost += numForeignAdults * 1000;
        totalCost += numForeignKids * 500;

        // if (numLocalAdults > 0) {
        //     totalCost += 1000; // Add adult guide cost
        // }
        // if (numLocalKids > 0) {
        //     totalCost += 500; // Add kid guide cost
        // }
        // if (numForeignAdults > 0) {
        //     totalCost += 1000; // Add adult guide cost
        // }
        // if (numForeignKids > 0) {
        //     totalCost += 500; // Add kid guide cost
        // }

        console.log(`Guide selected | Total cost would be : ${totalCost}`)
      }
    }

    // Display the calculated cost
    document.getElementById('output_adventure').textContent = `Your Adventure (Diving) Cost is: ${totalCost} LKR`;

    document.getElementById('adv_result').innerHTML = `Your Diving Adventure is Reserved! <br><br> Total Number of Adults : ${totalAdults} 
    <br> Total Number of Children : ${totalChildren} <br> Guide Selection : ${guidePreference.value} <br><br> Total Adventure Cost : ${totalCost} <br>`;
}

function reserveAdventure(){
    calculateAdventureCost();

    adv_result.classList.toggle('highlight-background');

}


 