const birthDate = document.querySelector("#birthDate");
const checkButton = document.querySelector("#checkButton");
const output1 = document.querySelector("#output-1");
const output2 = document.querySelector("#output-2");

checkButton.addEventListener("click",function(){
    let bdayStr = birthDate.value;

    if(bdayStr!=""){
        let listOfDates = bdayStr.split("-");

        let date = {
            day: Number(listOfDates[2]),
            month: Number(listOfDates[1]),
            year: Number(listOfDates[0])
        }
        // console.log(date)

        let isPalindrome = allPalindromeCheck(date);

        // console.log(isPalindrome)

        if(isPalindrome){
            output1.innerText = "Yay! your birthday is a palindrome"
            output2.innerText = ""
        }else{
            let [nextCntr, nextDate] = getNextPalindrome(date);
            let [previousCntr, previousDate] = getPreviousPalindrome(date);
    
            output1.innerText = `The next palindrome birthday is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${nextCntr} days!`;
            output2.innerText = `The previous palindrome birthday was ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed it by ${previousCntr} days!`;
    }
    }else{
        output1.innerText = "Please Input a valid date"
    }    
})

function strReverse(str){
    return str.split("").reverse().join("");
}

function isPalindrome(str){
    let reversedString = strReverse(str);
    return str === reversedString;
}

function dateToString(date){
    const dateStr = {
        day:"",
        month:"",
        year:""
    }
    
    if(date.day <10){
        dateStr.day = "0" + date.day;
    }else{
        dateStr.day = date.day.toString();
    }

    if(date.month <10){
        dateStr.month = "0" + date.month;
    }else{
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr
   
}

function dateFormats(date){
     const strDate = dateToString(date);

    const ddmmyyyy = strDate.day + strDate.month + strDate.year;
    const mmddyyyy =  strDate.month + strDate.day + strDate.year;
    const yyyymmdd =   strDate.year + strDate.month + strDate.day;
    const ddmmyy = strDate.day + strDate.month + strDate.year.slice(-2);
    const mmddyy = strDate.month + strDate.day + strDate.year.slice(-2);
    const yymmdd = strDate.year.slice(-2)+strDate.month + strDate.day;

    return [ ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function allPalindromeCheck(date){
    const arrayOfDates = dateFormats(date);
    
    let flag = false;

    for(let i=0; i< arrayOfDates.length;i++){
        if (isPalindrome(arrayOfDates[i])){
            flag = true;
            break;
        }
    }

    return flag;
    
}

function isLeapYear(year){
    if(year%400 === 0){
        return true;
    }
    if(year%100 === 0){
        return false;
    }
    if(year%4 === 0){
        return true;
    }
    
    return false;
    
}

function getNextDate(date){
    let day = date.day+1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30,  31, 31, 30, 31, 30, 31];

    if( month === 2){
        if(isLeapYear(year)){
            if(day >29){
                day = 1;
                month++;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++;
            }
        }   
    } else{
        if(day > daysInMonth[month-1]){
            day =1;
            month++
        }
    }
    
    if(month >12){
        month =1;
        year++
    }

    return {
        day:day,
        month: month,
        year: year
    }

}

function getNextPalindrome(date){
    let cntr =0;
    let nextDate = getNextDate(date);

    while(1){
        cntr++;

        var Palindrome = allPalindromeCheck(nextDate);

        if(Palindrome){
            break;
        }
        nextDate = getNextDate(nextDate);
        
    }
    // console.log([cntr, nextDate])
    return [cntr, nextDate]
    
}

function getPreviousDate(date){
    let day = date.day-1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // let monthCheck = [1,2,3,4,5,6,7,8,9,10,11,12];

    if( month === 2){
        if(isLeapYear(year)){
            if(day<1){
                day = 29;
                month--;
            }
        }
        else{
            if(day<1){
                day = 28;
                month--;
            }
        }   
    } else{
         if(day < 1 ){
             day = daysInMonth[month-1];
             month--;
            }
    }
    
    if( month < 1){
        month = 12;
        year--;
    }

    return {
        day:day,
        month: month,
        year: year
    }
   
}

function getPreviousPalindrome(date){
    let cntr =0;
    let previousDate = getPreviousDate(date);

    while(1){
        cntr++; 

        var isPalindrome = allPalindromeCheck(previousDate);

        if(isPalindrome){
            break;
        }
        previousDate = getPreviousDate(previousDate)
    }

    return [cntr, previousDate]
}

    //   let date={
    //        day:20,
    //         month:08,
    //         year:2021
    //       }

    // console.log(getPreviousPalindrome(date))
    // console.log(getPreviousDate(date))
    //  console.log(getNextPalindrome(date))
    //  console.log(getNextDate(date))


// console.log(isPalindrome("20200202"))