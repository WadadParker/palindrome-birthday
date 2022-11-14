var birthDate = document.querySelector("#birthdate");
var button = document.querySelector("#button");
var displayText = document.querySelector('#display-text');

button.addEventListener("click", clickHandler)

function clickHandler() {
    if (birthDate.value<1) {
        displayMessage("Please Enter the date");
    }
    else{
    var bdayStr = birthDate.value;
    var bDate = bdayStr.split('-');
    var date = {
        day: Number(bDate[2]),
        month: Number(bDate[1]),
        year: Number(bDate[0])
    }
    var dateStr = getDateAsString(date);
    var list= getDateInAllFormats(dateStr);
    var isPalindrome=false;
    for(let i=0;i<list.length;i++)
    {
        if(isStringPalindrome(list[i]))
        {
            isPalindrome=true;
            break;
        }
    }
    if(isPalindrome)
    {
        displayMessage("Your birthdate is a Palindrome");
    }
    else {
        checkPalindromeDate(date);
    }
}
}

function checkPalindromeDate(date)
{
    var [counter1, nextDate]= getNextPalindromeDate(date);
    var [counter2, prevDate]= getPreviousPalindromeDate(date);
    if(Number(counter1)<Number(counter2))
    {
        let days=(counter1===1?" Day":" Days");
        displayMessage("The nearest Date is " + nextDate.day + '-' + nextDate.month + '-' + nextDate.year + " You missed by " + counter1 + days);
    }
    else {
        let days=(counter2===1?" Day":" Days");
        displayMessage("The nearest Date is " + prevDate.day + '-' + prevDate.month + '-' + prevDate.year + " You missed by " + counter2 + days);
    }
}




function reverseString(str) {
    var listOfChars = str.split("");
    var reversedListOfChar = listOfChars.reverse();
    var reversedString = reversedListOfChar.join("");
    return reversedString;
}

function isStringPalindrome(str) {
    var reversedString = reverseString(str);
    return str === reversedString;
}

function getDateAsString(date) {
    var dateInStr = {
        day: "",
        month: "",
        year: ""
    };

    if (date.day < 10) {
        dateInStr.day = "0" + date.day;
    } else {
        dateInStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateInStr.month = "0" + date.month;
    } else {
        dateInStr.month = date.month.toString();
    }

    dateInStr.year = date.year.toString();
    return dateInStr;
}

function getDateInAllFormats(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function isLeapYear(year1)
{
    if(year1%400===0 || year1%4===0)
    {
        return true;
    }
    else if (year1%100===0)
    {
        return false;
    }

}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year,
    };
}

function getNextPalindromeDate(date) {
    var nextDate = getNextDate(date);
    var ctr = 0;

    while (1) {
        ctr++;
        var dateStr = getDateAsString(nextDate);
        var listNext = getDateInAllFormats(dateStr);

        for (let i = 0; i < listNext.length; i++) {
            if (isStringPalindrome(listNext[i])) {
                return [ctr, nextDate];
            }
        }
        nextDate = getNextDate(nextDate);
    }
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day === 0) {
        month--;

        if (month === 0) {
            month = 12;
            day = 31;
            year--;
        } else if (month === 2) {
            if (isLeapYear(year)) {
                day = 29;
            } else {
                day = 28;
            }
        } else {
            day = daysInMonth[month - 1];
        }
    }

    return {
        day: day,
        month: month,
        year: year,
    };
}

function getPreviousPalindromeDate(date) {
    var previousDate = getPreviousDate(date);
    var ctr = 0;

    while (1) {
        ctr++;
        var dateStr = getDateAsString(previousDate);
        var listPrev = getDateInAllFormats(dateStr);

        for (let i = 0; i < listPrev.length; i++) {
            if (isStringPalindrome(listPrev[i])) {
                return [ctr, previousDate];
            }
        }
        previousDate = getPreviousDate(previousDate);
    }
}


function displayMessage(text) {
    displayText.innerText = text;
}