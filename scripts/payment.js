if (!isLogin || isLogin === 'false') {
   document.getElementById('pay-now-button').disabled = true;
} else if (isLogin === 'true') {
   document.getElementById('pay-now-button').disabled = false;
}

let payNow = (event) => {
   event.preventDefault();
   alert('Hi your booking is successful!');
};
