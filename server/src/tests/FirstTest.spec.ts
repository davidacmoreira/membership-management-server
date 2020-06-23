import { Test } from '@models/Test'

test('it should be ok', () => {
  const test = new Test()

  test.name = 'Test'

  expect(test.name).toEqual('Test')
})
