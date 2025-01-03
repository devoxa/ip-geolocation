import fs from 'fs/promises'
import { Reader } from 'mmdb-lib'
import path from 'path'

interface MmdbResult {
  continent: { code: string; names: { en: string } }
  country: { iso_code: string; names: { en: string }; is_in_european_union: boolean }
  subdivisions: Array<{ names: { en: string } }>
  city: { names: { en: string } }
  location: { latitude: number; longitude: number }
}

export interface GeolocateIpResult {
  continent: { code: string; name: string }
  country: { code: string; name: string; isInEuropeanUnion: boolean }
  subdivision: { name: string }
  city: { name: string }
  location: { latitude: number; longitude: number }
}

const DB_FILE_PATH = path.join(__dirname, 'dbip-city-lite.mmdb')

export async function geolocateIp(ip: string): Promise<GeolocateIpResult | null> {
  const databaseBuffer = await fs.readFile(DB_FILE_PATH)

  const reader = new Reader(databaseBuffer)
  const result = reader.get(ip) as MmdbResult | null

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
