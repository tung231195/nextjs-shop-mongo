const   BASE_URL = 'http://localhost:3001'
export default{
  AUTH: {
    INDEX: `${BASE_URL}/api/auth/login`,
    MePoint:`${BASE_URL}/api/auth/me`
  },
  USER: {
    INDEX:'users'
  },
  CITY: {
    INDEX:'city'
  },
  CATALOG:{
    PRODUCT_TYPE:{INDEX:'product-types'},
    PRODUCT: {INDEX:'products'},
    PRODUCT_PUBLIC:{INDEX: `${BASE_URL}/api/products`}
  },
  SYSTEM: {
    ORDER:{
      INDEX: 'orders',
      DILEVERY: {INDEX:'delivery-type'},
      PAYMENT: {INDEX:'payment-type'}
    }
  },
  Checkout: {
    ORDER:{
      INDEX: 'orders',
    }
  }
}