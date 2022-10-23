const accordion = {}

 accordion.accordionItemHeader = document.querySelectorAll(".accordionItemHeader");
 accordion.accordionItemHeader.forEach(header => {
   
   header.addEventListener("click", (event) => {
     header.classList.toggle("active");
   
     const accordionItemBody = header.nextElementSibling;

     if (header.classList.contains("active")) {    
       accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";  
     } else {
       accordionItemBody.style.maxHeight = 0;
     }
   });
 });