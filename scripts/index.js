//! view more function
let viewMore = () => {
   let viewMoreButton = document.getElementById("view-more-button");
   if (viewMoreButton.innerText == "View More") {
      document.getElementById("view-more-city-cards").style.display = "block";
      viewMoreButton.innerText = "View Less";
   }
   else {
      document.getElementById("view-more-city-cards").style.display = "none";
      viewMoreButton.innerText = "View More";
   }
}

loaderOFF();