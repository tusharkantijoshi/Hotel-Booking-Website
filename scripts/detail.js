let url = new URLSearchParams(location.search);

//! function for price rate per day/person
let updatePrice = () => {
   let adult = document.getElementById("adult");
   let totalPrice = document.getElementById("price");
   let toDate = document.getElementById("toDate");
   let fromDate = document.getElementById("fromDate");

   let toDateValue = new Date(toDate.value);
   let fromDateValue = new Date(fromDate.value);

   toDate.min = fromDate.value;

   let days = (toDateValue - fromDateValue) / (24 * 60 * 60 * 1000);

   if (adult.value && toDate.value && fromDate.value)
      totalPrice.value = "Rs. " + parseInt(adult.value) * 1000 * days;
   else
      totalPrice.value = "Rs.0";
}

//! HTTP request
let sendHttpRequestHotel = () => {
   let xhr = new XMLHttpRequest();

   xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {

         let result = JSON.parse(this.responseText).data[0];

         document.getElementById("hotel-name").innerText = result.name;

         let amenities = result.amenities;
         let i = 0;
         for (; i < Math.min(amenities.length, 10); i++) {
            let liElement = document.createElement("li");
            liElement.innerText = amenities[i].name;
            document.getElementById("amenities").appendChild(liElement);
         }

         let descriptionPara = document.createElement("h6");
         descriptionPara.innerHTML = result.description;
         document.getElementById("description").appendChild(descriptionPara);

         let rating = parseInt(result.rating);
         for (i = 1; i <= rating; i++) {
            document.getElementById(i).classList.add("checked");
         }
      }
      loaderOFF();

   });

   xhr.open("GET", "https://travel-advisor.p.rapidapi.com/" + "hotels/get-details?lang=en_US&location_id=" + url.get('id'));
   xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
   xhr.setRequestHeader("x-rapidapi-key", "f148d6a224msh30084722911c119p1916c8jsn34e6d92e3af2");

   xhr.send();
}


let sendHttpRequestPhoto = () => {
   let xhr = new XMLHttpRequest();

   xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
         let carouselParentElement = document.getElementById("carousel-parent");
         let result = JSON.parse(this.responseText).data;
         let size = Math.min(result.length, 5);
         let i = 0;
         for (; i < size; i++) {
            let div = document.createElement("div");
            div.classList.add("carousel-item");
            if (i == 0)
               div.classList.add("active");
            let image = document.createElement("img");
            image.setAttribute("class", "carousel-image");
            image.classList.add("d-block");
            image.classList.add("w-100");
            image.src = result[i].images.large.url;
            div.appendChild(image);
            carouselParentElement.appendChild(div);
         }
         LoaderOFF();
      }
   });
   xhr.open("GET", "https://travel-advisor.p.rapidapi.com/" + "photos/list?lang=en_US&location_id=" + url.get('id'));
   xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
   xhr.setRequestHeader("x-rapidapi-key", "f148d6a224msh30084722911c119p1916c8jsn34e6d92e3af2");

   xhr.send();
}

let idElement = document.getElementById("id");
idElement.value = url.get('id');

sendHttpRequestHotel();
sendHttpRequestPhoto();