let url = new URLSearchParams(location.search);

//! To populate the HTML with new elements
let hotelList = (list) => {
   let hotelList = document.getElementById('hotel-list');

   //! loop because for each object after getting it from the API we have to populate new html elements
   list.forEach(hotel => {
      let hotelLink = document.createElement("a");
      hotelLink.setAttribute("href", `detail.html?id=` + hotel.result_object.location_id);
      hotelList.appendChild(hotelLink);

      let hotelContainer = document.createElement("div");
      hotelContainer.setAttribute("class", "hotel");
      hotelLink.appendChild(hotelContainer);
      hotelContainer.innerHTML = "<img src=" + hotel.result_object.photo.images.small.url + " alt='" + hotel.result_object.name + "' class='hotel-image-small'/>";

      let hotelDetails = document.createElement("div");
      hotelDetails.setAttribute("class", "hotel-name-rating");
      hotelContainer.appendChild(hotelDetails);

      hotelDetails.innerHTML = "<h3>" + hotel.result_object.name + "</h3>";
      hotelDetails.innerHTML += "<div id='rating'>" + hotel.result_object.rating + " <span class='fa fa-star checked'></span></div>";
      hotelDetails.innerHTML += "<p>" + hotel.result_object.address + "</p>";
   });
}

//! HTTP request
let sendHttpRequest = () => {
   let xhr = new XMLHttpRequest();

   xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
         let result = JSON.parse(this.responseText).data;

         let arr = [];
         list = result.filter((element) => element.result_type == "lodging");

         list.forEach((element) => {
            arr.push([element.result_object.name + "<br><a href=\"detail.html?id=" + element.result_object.location_id + "\">Book Hotel</a>", element.result_object.latitude, element.result_object.longitude]);
         });

         hotelList(list);


      }
   });

   xhr.open("GET", "https://travel-advisor.p.rapidapi.com/" + "locations/search?lang=en_US&limit=100&query=" + url.get('city'));
   xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
   xhr.setRequestHeader("x-rapidapi-key", "f148d6a224msh30084722911c119p1916c8jsn34e6d92e3af2");

   xhr.send();
}

sendHttpRequest();


