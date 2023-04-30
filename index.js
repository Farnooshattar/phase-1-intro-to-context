// Your code here
const csvData = [
  ["Thor", "Odinsson", "Electrical Engineer", 45],
  ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
  ["Natalia", "Romanov", "CEO", 150],
  ["Darcey", "Lewis", "Intern", 15],
  ["Jarvis", "Stark", "CIO", 125],
  ["Anthony", "Stark", "Angel Investor", 300]
]
const csvTimesIn = [
  ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
  ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
  ["Natalia", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1300"]],
  ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
  ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
  ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
]
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
function createEmployeeRecords(csvData) {
    return csvData.map(function (employee) {
    return {
    //console.log(employee)
    //createEmployeeRecord(employee)
     firstName: employee[0],
     familyName: employee[1],
     title: employee[2],
     payPerHour: employee[3],
     timeInEvents: [],
     timeOutEvents: []
    }
    })
    }
    //createEmployeeRecords(csvData)
function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
    })
    return employee
    }
    
function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
    })
    return employee
    }
    
function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(function (e) {
    return e.date === date
    })
    
    const timeOutEvent = employee.timeOutEvents.find(function (e) {
    return e.date === date
    })
    
    return (timeOutEvent.hour - timeInEvent.hour) / 100
    }
    
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date)
    return hoursWorked * employee.payPerHour
    }
    
function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(function (e) {
    return e.date
    })
    
    const payable = datesWorked.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    
    return payable
    }
    
function calculatePayroll(employees) {
    return employees.reduce(function (memo, employee) {
    return memo + allWagesFor(employee)
    }, 0)
    }
