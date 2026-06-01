
const users = [
  { id: "111111111111", status: "seeded",   bank: "State Bank of India",      name: "Aarav Patel" },
  { id: "222222222222", status: "unseeded",  bank: null,                       name: "Priya Sharma" },
  { id: "333333333333", status: "seeded",   bank: "HDFC Bank",                name: "Rohan Gupta" },
  { id: "444444444444", status: "seeded",   bank: "Punjab National Bank",     name: "Amit Kumar" },
  { id: "555555555555", status: "seeded",   bank: "Axis Bank",                name: "Sneha Reddy" },
  { id: "666666666666", status: "unseeded",  bank: null,                       name: "Vikram Singh" },
  { id: "777777777777", status: "seeded",   bank: "India Post Payments Bank", name: "Anjali Desai" },
  { id: "888888888888", status: "seeded",   bank: "ICICI Bank",               name: "Karan Mehta" },
  { id: "999999999999", status: "seeded",   bank: "Bank of Baroda",           name: "Neha Joshi" },
  { id: "121212121212", status: "unseeded",  bank: null,                       name: "Rahul Verma" },
  { id: "131313131313", status: "seeded",   bank: "Canara Bank",              name: "Meera Iyer" },
  { id: "141414141414", status: "seeded",   bank: "Union Bank of India",      name: "Suresh Nair" },
  { id: "151515151515", status: "unseeded",  bank: null,                       name: "Deepa Menon" },
  { id: "161616161616", status: "seeded",   bank: "Kotak Mahindra Bank",      name: "Arjun Bose" },
  { id: "171717171717", status: "seeded",   bank: "Bank of India",            name: "Kavita Rao" },
  { id: "181818181818", status: "unseeded",  bank: null,                       name: "Mohit Sharma" },
  { id: "191919191919", status: "seeded",   bank: "Indian Bank",              name: "Sunita Das" },
  { id: "202020202020", status: "seeded",   bank: "Yes Bank",                 name: "Varun Malhotra" },
  { id: "212121212121", status: "unseeded",  bank: null,                       name: "Pooja Pillai" },
  { id: "232323232323", status: "seeded",   bank: "Federal Bank",             name: "Aditya Shetty" },
  { id: "242424242424", status: "seeded",   bank: "Bandhan Bank",             name: "Ritu Agarwal" },
  { id: "252525252525", status: "unseeded",  bank: null,                       name: "Sanjay Tiwari" },
];
export const checkDBTStatus = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundUser = users.find(user => user.id === id);
      if (foundUser) {
        resolve(foundUser);
      } else {
        reject(new Error("Aadhaar number not found in the NPCI mapper registry."));
      }
    }, 2000); 
  });
};