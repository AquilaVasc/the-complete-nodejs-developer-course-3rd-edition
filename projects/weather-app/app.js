console.log('Starting');

setTimeout(() => {
  console.log('After 2 seconds');
}, 2000);

setTimeout(() => {
  console.log('After 0 seconds');
}, 0);

console.log('Stopping');