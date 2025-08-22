export const PERMISSIONS:any = {
    ADMIN: "ADMIN.GRANTED",
    BASIC: "BASIC.PUBLIC",
    MANAGE_PRODUCT: {
      PRODUCT: {
        CREATE:"MANAGE_PRODUCT.PRODUCT.CREATE",
        UPDATE:"MANAGE_PRODUCT.PRODUCT.UPDATE",
        DELETE:"MANAGE_PRODUCT.PRODUCT.DELETE",
      },
      PRODUCT_TYPE: {
        CREATE:"MANAGE_PRODUCT.PRODUCT_TYPE.CREATE",
        UPDATE:"MANAGE_PRODUCT.PRODUCT_TYPE.UPDATE",
        DELETE:"MANAGE_PRODUCT.PRODUCT_TYPE.DELETE",
      }
    },
    SYSTEM: {
      ROLE: {
        CREATE:"SYSTEM.ROLE.CREATE",
        UPDATE:"SYSTEM.ROLE.UPDATE",
        DELETE:"SYSTEM.ROLE.DELETE",
      },
      USER: {
        CREATE:"MANAGE_PRODUCT.USER.CREATE",
        UPDATE:"MANAGE_PRODUCT.USER.UPDATE",
        DELETE:"MANAGE_PRODUCT.USER.DELETE",
      }
    }
  }


export const LIST_DATA_PERMISION = [
  {
    id: 1,
    name: "MANAGE_PRODUCT", 
    isParent:true, 
    value:"MANAGE_PRODUCT"
  },
  { 
    id:2, 
    name:"Product", 
    isParent:false, 
    value:"PRODUCT", 
    parentValue:"MANAGE_PRODUCT",
    isCreate:true,
    isUpdate:false,
    isDelete:true,
  },
  { 
    id:3, 
    name:"Product Type", 
    isParent:false, 
    value:"PRODUCT_TYPE", 
    parentValue:"MANAGE_PRODUCT",
    isCreate:false,
    isUpdate:false,
    isDelete:true,
  },
   {
    id: 4,
    name: "SYSTEM", 
    isParent:true, 
    value:"SYSTEM",
  },
  { 
    id:5, 
    name:"SYSTEM_ROLE", 
    isParent:false, 
    value:"ROLE", 
    parentValue:"SYSTEM"
  },
  { 
    id:6, 
    name:"SYSTEM_USER", 
    isParent:false, 
    value:"USER", 
    parentValue:"SYSTEM"
  },


]