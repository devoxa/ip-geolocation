import { geolocateIp } from '../src/index'

const PROPERTY_MATCHER = {
  city: {
    name: expect.any(String),
  },
  location: {
    latitude: expect.any(Number),
    longitude: expect.any(Number),
  },
}

describe('ip-geolocation', () => {
  test('can geolocate ip address from the USA', async () => {
    expect(await geolocateIp('69.10.63.243')).toMatchSnapshot(PROPERTY_MATCHER)
  })

  test('can geolocate ip address from the UK', async () => {
    expect(await geolocateIp('217.138.196.20')).toMatchSnapshot(PROPERTY_MATCHER)
  })

  test('can geolocate ip address from Germany', async () => {
    expect(await geolocateIp('78.159.96.195')).toMatchSnapshot(PROPERTY_MATCHER)
  })

  test('can geolocate ip address from South Africa', async () => {
    expect(await geolocateIp('172.107.93.212')).toMatchSnapshot(PROPERTY_MATCHER)
  })

  test('fails gracefully for invalid or unresolvable ip addresses', async () => {
    expect(await geolocateIp('127.0.0.1')).toEqual(null)
    expect(await geolocateIp('foobar')).toEqual(null)
    expect(await geolocateIp('999.138.196.20')).toEqual(null)
    expect(await geolocateIp('')).toEqual(null)
  })
})
