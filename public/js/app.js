console.log('Client side javascript file is loaded!');
 
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
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    fetch("http://localhost:3000/weather?address=" + location).then((response)=>{
        response.json().then((data)=>{
            if(data.err){
                messageOne.textContent = "";
                return messageTwo.textContent = data.err;
            }
            messageOne.textContent = "";
            messageOne.textContent = data.location + "\n" + data.forecast;
        });
    });

});