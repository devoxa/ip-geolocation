const fs = require('fs')
const https = require('https')
const path = require('path')
const zlib = require('zlib')

const folder = process.argv[2] || 'dist/src'

const DOWNLOAD_LINK = 'https://download.db-ip.com/free/dbip-city-lite-YYYY-MM.mmdb.gz'
const DOWNLOAD_PATH = path.join(__dirname, '..', folder)
const DOWNLOAD_PATH_VERSION = path.join(DOWNLOAD_PATH, 'version.json')
const DOWNLOAD_PATH_MMDB = path.join(DOWNLOAD_PATH, 'dbip-city-lite.mmdb')

run()

async function run() {
  const date = new Date()

  // Try to download the latest version of the last 3 months
  for (let i = 0; i !== 3; i++) {
    date.setMonth(date.getMonth() - i)

    try {
      await downloadForDate(date)
    } catch (err) {
      console.warn(err)
    }
  }

  console.error('Failed downloading DBIP City Lite database')
  process.exit(1)
}

async function downloadForDate(date) {
  const version = buildVersionStringForDate(date)

  if (versionExists(version)) {
    console.log(`Skipped download because database for ${version} already exists`)
    process.exit(0)
  }

  console.log(`Downloading DBIP City Lite database for ${version}...`)
  fs.mkdirSync(DOWNLOAD_PATH, { recursive: true })
  const downloadUrl = buildDownloadUrl(version)
  await downloadToFile(downloadUrl, DOWNLOAD_PATH_MMDB)

  console.log(`Writing version file for ${version}...`)
  fs.writeFileSync(DOWNLOAD_PATH_VERSION, JSON.stringify({ version }), 'utf-8')

  process.exit(0)
}

function buildVersionStringForDate(date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1 + '').padStart(2, '0')}`
}

function versionExists(version) {
  if (!fs.existsSync(DOWNLOAD_PATH_MMDB)) {
    return false
  }

  try {
    const versionJson = JSON.parse(fs.readFileSync(DOWNLOAD_PATH_VERSION, 'utf-8'))
    return versionJson.version === version
  } catch (err) {
    return false
  }
}

function buildDownloadUrl(version) {
  return DOWNLOAD_LINK.replace('YYYY-MM', version)
}

function downloadToFile(url, path) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 400) {
        return reject(`${url} responded with ${response.statusCode}`)
      }

      // Pipe the response into `gunzip` to inflate the gzip compression, and then
      // into the file write stream, and resolve once we are done.
      const writeStream = fs.createWriteStream(path)
      writeStream.on('finish', () => resolve())

      response.pipe(zlib.createGunzip()).pipe(writeStream)
    })
  })
}
