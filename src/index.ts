import mmdbReader, { Reader } from 'maxmind'
import fs from 'fs'
import path from 'path'

export interface GeolocateIpResult {
  continent: { code: string; name: string }
  country: { code: string; name: string; isInEuropeanUnion: boolean }
  subdivision: { name: string }
  city: { name: string }
  location: { latitude: number; longitude: number }
}

let reader: Reader<any>
const DB_FILE_PATH = path.join(__dirname, 'dbip-city-lite.mmdb')

export async function loadDatabase(dbFilePath: string = DB_FILE_PATH) {
  if (reader) {
    return
  }

  const dbFileExists = await fileExists(dbFilePath)
  if (!dbFileExists) {
    throw new Error(`Database file at ${dbFilePath} does not exist`)
  }

  reader = await mmdbReader.open(dbFilePath)
}

function fileExists(path: string) {
  return new Promise((resolve) => fs.access(path, fs.constants.F_OK, (err) => resolve(!err)))
}

export async function geolocateIp(ip: string): Promise<GeolocateIpResult | null> {
  await loadDatabase()

  const result = reader.get(ip)

  if (!result) {
    return null
  }

  return {
    continent: {
      code: result.continent.code,
      name: result.continent.names.en,
    },
    country: {
      code: result.country.iso_code,
      name: result.country.names.en,
      isInEuropeanUnion: result.country.is_in_european_union,
    },
    subdivision: {
      name: result.subdivisions[0].names.en,
    },
    city: {
      name: result.city.names.en,
    },
    location: {
      latitude: result.location.latitude,
      longitude: result.location.longitude,
    },
  }
}
