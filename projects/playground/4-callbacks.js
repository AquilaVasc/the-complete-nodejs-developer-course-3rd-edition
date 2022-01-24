// const names = ['Andrew', 'Jen', 'Jess', 'Aquila'];

// const shortNames = names.filter((name) => {
//   return name.length <=4
// });

// const geocode = (address, callback) => {
//   const data = {
//     latitude: 0,
//     longitude: 0,
//   }

//   setTimeout(() => {
//     callback(data)
//   }, 2000);
// }

// const weather = (data) =>{
//   console.log(`Running call for lat: ${data.latitude} and long: ${data.longitude}`);
// }

// geocode('Philadelphia', weather);

const add = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  },2000);
}

add(1, 4, (sum) => {
  console.log(sum) // Should print: 5
})