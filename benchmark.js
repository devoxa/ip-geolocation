// Test script to make sure that speed and garbage collection is as expected
// > yarn build
// > node scripts/postinstall.js
// > node --expose-gc benchmark.js

const { geolocateIp } = require('./dist/src/index')

function printMemoryUsage() {
  const used = process.memoryUsage().rss / 1024 / 1024
  console.log(`Memory usage: ${Math.round(used * 100) / 100} MB`)
}

async function main() {
  printMemoryUsage()

  console.time('geolocateIp')
  await geolocateIp('217.138.196.20')
  console.timeEnd('geolocateIp')
  printMemoryUsage()

  console.time('geolocateIp')
  await geolocateIp('217.138.196.20')
  console.timeEnd('geolocateIp')
  printMemoryUsage()

  console.time('geolocateIp')
  await geolocateIp('217.138.196.20')
  console.timeEnd('geolocateIp')
  printMemoryUsage()

  global.gc()
  setTimeout(() => printMemoryUsage(), 1000)
}

main()
