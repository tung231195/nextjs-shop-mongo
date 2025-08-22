export const ListMenu = [
  {
    id:'dashboard',
    title: 'DAShBOARD',
    icon:'icon-daskboard',
    path:'/'
  },
  {
    id:'manager_product',
    title:"MANAGER PRODUCT",
    icon: '',
    path: '/products',
    childrens: 
    [
      {
          id:'catalog-product',
          title: 'Catalog Products',
          icon:'icon-daskboard',
          path:'/products/list',
      },
      {
          id:'catalog-categories',
          title: 'Catalog Categories',
          icon:'icon-daskboard',
          path:'/products/categories',
      },
    ]
  },
  {
    id:'system',
    title: 'Systems',
    icon:'icon-daskboard',
    path:'/systems',
    childrens: [
      {
          id:'users',
          title: 'Users',
          icon:'icon-daskboard',
          path:'/systems/users',
          childrens: [
                {
                    id:'users1',
                    title: 'Users1',
                    icon:'icon-daskboard',
                    path:'/systems/users',
                },
                {
                    id:'roles1',
                    title: 'Roles12',
                    icon:'icon-daskboard',
                    path:'/systems/roles',
                                childrens: [
                          {
                              id:'users12',
                              title: 'Users1',
                              icon:'icon-daskboard',
                              path:'/systems/users',
                          },
                          {
                              id:'roles12',
                              title: 'Roles12',
                              icon:'icon-daskboard',
                              path:'/systems/roles',
                          }
              ]
                }
              ]
      },
      {
          id:'roles',
          title: 'Roles',
          icon:'icon-daskboard',
          path:'/systems/roles',
      }
    ]
  }
]