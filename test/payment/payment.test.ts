import { PaymentService } from '../../src/payment/payment'

describe("Payment service", () => {

  describe('Amount', () => {

    test('amount must be greater than 0', () => {

      expect(() => new PaymentService(0)).toThrow("Amount must be greater than 0")
      expect(() => new PaymentService(-1)).toThrow("Amount must be greater than 0")

    })

    test("amount must be a finite number", () => {

      expect(() => new PaymentService(NaN)).toThrow("Amount must be a finite number")
      expect(() => new PaymentService(Infinity)).toThrow('Amount must be a finite number')

    })

  })

  describe('Payment service methods', () => {

    let service: PaymentService

    beforeEach(() => {

      service = new PaymentService(100)

    })

    describe('Discount', () => {

      test("Apply discount just above 0%", () => {

        service.applyDiscount(0.01)

        expect(service.getAmount()).toBe(99.99)

      })

      test('100% discount changes the amount to 0', () => {

        service.applyDiscount(100)

        expect(service.getAmount()).toBe(0)

      })

      test("0% discount doesn't change the amount", () => {

        service.applyDiscount(0)

        expect(service.getAmount()).toBe(100)

      })

      test('each additional discount applies to the current amount', () => {

        service.applyDiscount(20)
        service.applyDiscount(50)

        expect(service.getAmount()).toBe(40)

      })

      test("discount greater than 100 doesn't change the amount", () => {

        service.applyDiscount(100.01)

        expect(service.getAmount()).toBe(100)
      })

      test("negative discount doesn't change the amount", () => {

        service.applyDiscount(-1)

        expect(service.getAmount()).toBe(100)

      })

      test("discount doesn't change the amount for completed payment", () => {

        service.pay()
        service.applyDiscount(50)

        expect(service.getAmount()).toBe(100)

      })

    })

    describe('Pay', () => {
      test('marking payment as completed returns true', () => {

        expect(service.pay()).toBeTruthy()
        expect(service.getIsPaid()).toBeTruthy()

      })

      test('marking payment as completed more than once returns false', () => {

        service.pay()

        expect(service.pay()).toBeFalsy()
        expect(service.getIsPaid()).toBeTruthy()

      })

    })

  })

})
