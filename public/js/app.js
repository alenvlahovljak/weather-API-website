/*
fetch("http://puzzle.mead.io/puzzle").then((repsonse)=>{
    repsonse.json().then((data)=>{
        console.log(data);
    });
});
*/

//Challenge
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-1"); 
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const location = search.value;
    messageOne.innerHTML = "Loading...";
    messageTwo.textContent = "";
    
    fetch("/weather?address=" + location).then((response)=>{
        response.json().then((data)=>{
            if(data.err){
                messageOne.innerHTML = "";
                return messageTwo.textContent = data.err;
            }
            messageOne.innerHTML = "";
            messageOne.innerHTML = data.location + "<br>" + data.forecast;
        });
    });

});