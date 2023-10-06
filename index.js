function createEmployeeRecord(employeeAttributes) {
    let employeeRecord = {};
    employeeRecord["firstName"] = employeeAttributes[0]
    employeeRecord["familyName"] = employeeAttributes[1]
    employeeRecord["title"] = employeeAttributes[2]
    employeeRecord["payPerHour"] = employeeAttributes[3]
    employeeRecord["timeInEvents"] = []
    employeeRecord["timeOutEvents"] = []
    return employeeRecord;
}

function createEmployeeRecords(arrays) {
    return arrays.map(array => createEmployeeRecord(array));
}

function createTimeInEvent(timeIn) {
    let dateTime = timeIn.split(" ");
    this["timeInEvents"].push({
    "type": "TimeIn",
    "hour": parseInt(dateTime[1]),
    "date": dateTime[0]
    });
    return this;
}

function createTimeOutEvent(timeOut) {
    let dateTime = timeOut.split(" ");
    this["timeOutEvents"].push({
    "type": "TimeOut",
    "hour": parseInt(dateTime[1]),
    "date": dateTime[0]
    });
    return this;
}

function hoursWorkedOnDate(date) {
    let timeInEvent = this.timeInEvents.find(event => event.date === date);
    let timeOutEvent = this.timeOutEvents.find(event => event.date === date);

    if (timeInEvent && timeOutEvent) {
        let timeInMinutes = parseInt(timeInEvent.hour);
        let timeOutMinutes = parseInt(timeOutEvent.hour);
        let hoursWorked = (timeOutMinutes - timeInMinutes) / 100;
        return hoursWorked;
    }
    {
        return 0
    }
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function findEmployeeByFirstName(collection, firstNameString) {
    for (let employee of collection) {
      if (employee.firstName === firstNameString) {
        return employee;
      }
    }
    return undefined;
  }

  function calculatePayroll(employeeRecords) { 
    return employeeRecords.reduce((totalPayRoll, employee) => {
        let employeeWages = allWagesFor.call(employee); 
        return totalPayRoll + employeeWages;
    }, 0);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

