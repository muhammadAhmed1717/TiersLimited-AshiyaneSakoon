const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
const day = currentDate.getDate();
const hours = currentDate.getHours() % 12 || 12;
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const ampm = currentDate.getHours() >= 12 ? "PM" : "AM";
const date = `${day}-${month}-${year}`;
const time = `${hours}:${minutes}:${seconds} ${ampm}`;

module.exports={date,time};