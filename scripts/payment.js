let url = new URLSearchParams(location.search);

//! HTTP request
let sendHttpRequest = () => {
   let xhr = new XMLHttpRequest();

   xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
         let result = JSON.parse(this.responseText).data[0];

         let toDate = new Date(url.get('toDate'));
         let fromDate = new Date(url.get('fromDate'));
         let days = (toDate - fromDate) / (24 * 60 * 60 * 1000);

         document.getElementById("hotel-image").src = result.photo.images.large.url;
         document.getElementById("hotel-name").innerText = result.name;
         document.getElementById("ranking").innerHTML = "<b>" + result.ranking + "</b>";
         document.getElementById("address").innerText = result.address;
         document.getElementById("name").innerHTML = "<strong class='heading'>Name:</strong>&nbsp;" + url.get('name');
         document.getElementById("adult").innerHTML = "<strong class='heading'>Number of Adults:</strong>&nbsp;" + url.get('adult');
         document.getElementById("from-date").innerHTML = "<strong class='heading'>Check-in Date:</strong>&nbsp;" + url.get('fromDate');
         document.getElementById("to-date").innerHTML = "<strong class='heading'>Check-out Date:</strong>&nbsp;" + url.get('toDate');
         document.getElementById("tariff").innerHTML = "<strong class='heading'>Tariff Breakdown:</strong>&nbsp;Rs.1000 x " + url.get('adult') + " Adults x " + days + " Nights";
         document.getElementById("amount").innerHTML = "<strong class='heading'>Total Amount:</strong>&nbsp;" + url.get('price');

      }
   });

   xhr.open("GET", "https://travel-advisor.p.rapidapi.com/" + "hotels/get-details?lang=en_US&location_id=" + url.get('id'));
   xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
   xhr.setRequestHeader("x-rapidapi-key", "f148d6a224msh30084722911c119p1916c8jsn34e6d92e3af2");

   xhr.send();
}

sendHttpRequest();

if (!isLogin || isLogin === 'false') {
   document.getElementById('pay-now-button').disabled = true;
} else if (isLogin === 'true') {
   document.getElementById('pay-now-button').disabled = false;
}

let payNow = (event) => {
   event.preventDefault();
   alert('Hi your booking is successful!');
};
