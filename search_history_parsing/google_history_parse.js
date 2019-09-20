const month = 2628000000000 //month in epoch time

let allBrowHist = require("./BrowserHistory.json") // converts json file to js object
let googSearch = allBrowHist['Browser History'].filter(d => d.title.includes(" - Google Search")) //filters out everything that isnt a google search

let endTime = allBrowHist['Browser History'][0].time_usec // last browser data epoch time recorded
let startTime = endTime - month // calculates the time cutoff for the data we care about
let googSearchMonth = googSearch.filter(d => d.time_usec >= startTime) // returns data from only the past month

let allTermsArr = [] // will be an array of terms as items, any search term with mult spaces will be split by " " and appended as its own unique term

let numSearches = googSearchMonth.length // total number of google searches i made in the last month
for(var i = 0; i < 997; i++) {
    searchString = (googSearchMonth[i].title).slice(0,-16) // chops off the " - Google Search" from every title
    searchArr = searchString.split(" ")                    // splits search term into its individual words
    for(var j = 0; j < searchArr.length; j++){             // pushes each word into the array of all terms, forming a complete array of all words I have searched
        allTermsArr.push(searchArr[j])
    }
}

let uniqAllTermsArr = allTermsArr.filter((v,i) => allTermsArr.indexOf(v) === i) // array of all unique search terms (words)

let SearchTermFreq = { //object of key value pairs. key=search term, value=frequency

}

//fill SearchTermFreq object, initialize all to zero
for (i = 0; i < uniqAllTermsArr.length; i++) {
    SearchTermFreq[uniqAllTermsArr[i]] = 0
}

//Iterate through all search terms, incrementing the value (freq) associated with that key (search term) in SearchTermFreq
for (i = 0; i < allTermsArr.length; i++) {
    SearchTermFreq[allTermsArr[i]] += 1
}

console.log(SearchTermFreq)

// console.log(numSearches)

// console.log("startTime:")
// console.log(startTime)

// console.log("endTime:")
// console.log(endTime)


