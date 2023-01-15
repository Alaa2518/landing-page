/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 *  
 * JS Standard: ESlint
 *  
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
// this globale varibles ul is the ul on the page and sectionsList is all sections on the page 

let ul, sectionList; 

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
* @description return all sections on the page
* @param {void} 
* @returns {list} sections on the page list
*/
function getSections(){
    // get all sections on the page and return it.
    return  document.querySelectorAll("section");
    
}

/**
* @description return ul on the page
* @param {void} 
* @returns {list} first ul on the page to add lists
*/

function getUl(){
    // get first ul element on the page header
    return document.querySelector("ul");
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


/**
* @description create all link lists and add them to ul on the navbar
* @param {list}  all sections on the landing page 
* @param {string} ul on the landing page 
* @returns {void} 
*/

function createList(sections,ul){
        // loop on all sections 
        for(let section of sections ){
            let li = document.createElement('li'); // create list element
            let a = document.createElement('a'); // create anchor element 
            a.innerHTML = section.getAttribute("data-nav"); // add text on the  anchor element 
            // a.href = "#"+section.id; // this add href attrebute 
            a.id = "link-"+section.id; // this adding id value 
            a.classList.add("menu__link"); // this add class name to evrey anchor 
            li.appendChild(a); 
            ul.appendChild(li);
            
        }
        
}


// Add class 'active' to section when near top of viewport


/**
* @description add class your-active-class to the section on the top of the page  and remove it if scroll 
* @param {void}  
* @returns {void} 
*/

function makeActive(){
    
    for (const section of sectionList) {
        const box = section.getBoundingClientRect();
        //Find a value that works best, but 150 seems to be a good start.
        const VALUE = 150;
        
        if (box.top <= VALUE && box.bottom >= VALUE) {
        //apply active state on current section and corresponding Nav link
        section.classList.add("your-active-class");
        
        } else {
        //Remove active state from other section and corresponding Nav link
        section.classList.remove("your-active-class");
        
        }
    }
}

// Scroll to anchor ID using scrollTO event


/**
* @description add class your-active-class to the section after clicked the link and remove it from the others 
* @param {string}  link id 
* @returns {void} 
*/

function scrollToEvent(id){
    
    id =id.split('link-').join(""); // this line to split anchor id to be as section id 
    for (const section of sectionList) {
        if (section.id===id){ 
            section.scrollIntoView({ behavior: 'smooth' }); // whene the user click on anchor go to the section smoothly 
            section.classList.add("your-active-class"); // add class `your-active-class` to the section user wante it on the screen  
            
        }
        else{
            section.classList.remove("your-active-class"); // remove class `your-active-class` from other sections 
        }
        
    }
    
    
}

/**
* @description add class active to the anchor after clicked the on it  and remove this calss from the others  
* @param {string}  anchor id 
* @returns {void} 
*/

function highlights(id){

    let anchors = document.getElementsByTagName('a'); // get all anchors on the page 

    for(const anchor of anchors){ // loop on evry anchor on this  page 
        
        if(anchor.id ===id) 
        
        anchor.classList.add("active"); // add `active` class to anchor to highlight it 
        else
        anchor.classList.remove("active"); // remove `active ` class from the others anchors 
        

    }

    

}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
sectionList =getSections() ; // declar sectionList using function getSection()
ul =getUl() ; // declar ul using function getUl()
createList(sectionList,ul); // this fuction to add anchors list and add it to ul on the header
// Scroll to section on link click
document.addEventListener("click",function(e){
        // check if user clicked on the anchor element or not 
        if (e.target.className==='menu__link') {
            scrollToEvent(e.target.id); // send anchor id to fucntion scrollToEvent()
            highlights(e.target.id) // send anchor id to fucntion highlights()
            setTimeout(()=>{highlights(0);},3000); // this line to remove highlights on the anchor element after 3S
        }
    });
// Set sections as active
document.addEventListener("scroll",  function() { makeActive();}); // this avent to add your-active-classs to on screen section

