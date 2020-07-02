import { geolocateIp, loadDatabase, GeolocateIpResult } from '../src/index'

// Round the location for tests, since the exact numbers change between datasets
function roundLocation(result: GeolocateIpResult | null) {
  if (result) {
    result.location.latitude = Math.round(result.location.latitude)
    result.location.longitude = Math.round(result.location.longitude)
  }

  return result
}

describe('ip-geolocation', () => {
  it('errors if the database does not exist', async () => {
    let error

    try {
      await loadDatabase('foo.mmdb')
    } catch (err) {
      error = err
    }

    expect(error).toMatchSnapshot()
  })

  it('can geolocate ip address from the USA', async () => {
    expect(roundLocation(await geolocateIp('69.10.63.243'))).toMatchSnapshot()
  })

  it('can geolocate ip address from the UK', async () => {
    expect(roundLocation(await geolocateIp('217.138.196.20'))).toMatchSnapshot()
  })

  it('can geolocate ip address from Germany', async () => {
    expect(roundLocation(await geolocateIp('78.159.96.195'))).toMatchSnapshot()
  })

  it('can geolocate ip address from South Africa', async () => {
    expect(roundLocation(await geolocateIp('172.107.93.212'))).toMatchSnapshot()
  })

  it('fails gracefully for invalid or unresolvable ip addresses', async () => {
    expect(await geolocateIp('127.0.0.1')).toEqual(null)
    expect(await geolocateIp('foobar')).toEqual(null)
    expect(await geolocateIp('999.138.196.20')).toEqual(null)
    expect(await geolocateIp('')).toEqual(null)
  })
})
