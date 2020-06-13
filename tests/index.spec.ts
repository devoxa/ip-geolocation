import { geolocateIp } from '../src/index'

describe('ip-geolocation', () => {
  it('can geolocate ip address from the USA', async () => {
    expect(await geolocateIp('69.10.63.243')).toMatchSnapshot()
  })

  it('can geolocate ip address from the UK', async () => {
    expect(await geolocateIp('217.138.196.20')).toMatchSnapshot()
  })

  it('can geolocate ip address from Germany', async () => {
    expect(await geolocateIp('78.159.96.195')).toMatchSnapshot()
  })

  it('can geolocate ip address from South Africa', async () => {
    expect(await geolocateIp('172.107.93.212')).toMatchSnapshot()
  })

  it('fails gracefully for invalid or unresolvable ip addresses', async () => {
    expect(await geolocateIp('127.0.0.1')).toEqual(null)
    expect(await geolocateIp('foobar')).toEqual(null)
    expect(await geolocateIp('999.138.196.20')).toEqual(null)
    expect(await geolocateIp('')).toEqual(null)
  })
})
