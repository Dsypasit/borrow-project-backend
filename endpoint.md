# Endpoint ของ backend

- id ของ MongoDB จะเป็น String ส่วน id ของ PostgreSQL จะเป็น int
- user จะถูกสร้างขึ้นเองเมื่อทำการสร้าง transaction
- total, avaliable ของ product จะ update เมื่อสร้าง product item, สร้าง transaction และเมื่อทำการคืนของ
- frequency ของ product จะเพิ่มขึ้นเมื่อสร้าง transaction
- transaction ใน field deadline ใช้ format yyyy-mm-dd
- status ของ transaction คือ การยืม-คืน โดย default คือ false

- [Lab](#Lab)
- [Source](#Source)
- [User](#User)
- [Products](#Products)
- [ProductItem](#ProductItem)
- [Transaction](#Transaction)

...ขาดตรงไหนบอกได้ครับ และแน่นอนว่ามันยังไม่เสร็จ รออัพเดทครับ

# Lab

[to Top](#Endpoint-ของ-backend)

GET /lab

```json
// response
[
  {
    "id": "640da1de64efbf2f7ba69c5f",
    "name": "Lab A"
  },
  {
    "id": "640da1de64efbf2f7ba69c60",
    "name": "Lab B"
  },
  {
    "id": "640da1de64efbf2f7ba69c61",
    "name": "Lab C"
  }
]
```

POST /lab

```json
// request
{
    "name": "test roop"
}

// response
{
    "id": "640db2e9860ba9a4c65768b0",
    "name": "test roop"
}
```

DELETE /lab/:id

```json
// response
{
  "id": "640db2e9860ba9a4c65768b0",
  "name": "test roop"
}
```

# Source

[to Top](#Endpoint-ของ-backend)

GET /source

```json
// response
[
  {
    "id": "640da1de64efbf2f7ba69c62",
    "name": "center"
  },
  {
    "id": "640da1de64efbf2f7ba69c63",
    "name": "department"
  },
  {
    "id": "640da1de64efbf2f7ba69c64",
    "name": "personal"
  }
]
```

POST /source

```json
// request
{
	"name": "test roop"
}

// response
{
    "id": "640db38b860ba9a4c65768b2",
    "name": "test roop"
}
```

DELETE /source/:id

```json
// response
{
  "id": "640db38b860ba9a4c65768b2",
  "name": "test roop"
}
```

# Products

[to Top](#Endpoint-ของ-backend)

GET /products

```json
// response
[
  {
    "id": "640da1de64efbf2f7ba69c65",
    "name": "Calculator",
    "description": null,
    "usageFrequency": 0,
    "totalAmount": 1,
    "availableAmount": 0,
    "image": null
  },
  {
    "id": "640da1de64efbf2f7ba69c66",
    "name": "Telescope",
    "description": null,
    "usageFrequency": 0,
    "totalAmount": 0,
    "availableAmount": 0,
    "image": null
  }
]
```

GET /products/:id

```json
// response
{
  "id": "640da1de64efbf2f7ba69c66",
  "name": "Telescope",
  "description": null,
  "usageFrequency": 0,
  "totalAmount": 0,
  "availableAmount": 0,
  "image": null
}
```

POST /products

```json
// request
{
	"name": "Rasbery"
}

// response
{
    "id": "640db415860ba9a4c65768b4",
    "name": "Rasbery",
    "description": null,
    "usageFrequency": 0,
    "totalAmount": 0,
    "availableAmount": 0,
    "image": null
}
```

DELETE /products/:id

```json
// response
{
  "id": "640db415860ba9a4c65768b4",
  "name": "Rasbery",
  "description": null,
  "usageFrequency": 0,
  "totalAmount": 0,
  "availableAmount": 0,
  "image": null
}
```

# User

[to Top](#Endpoint-ของ-backend)

GET /user

```json
// response Postgres
[
  {
    "id": 1,
    "role": null,
    "email": "ong@email.com",
    "username": null,
    "phone": "023173404",
    "transactions": [
      {
        "id": 1,
        "productItems_id": "t1",
        "status": false,
        "start_date": "2023-03-10T17:22:59.285Z",
        "end_date": null,
        "deadline": "2023-09-11T00:00:00.000Z",
        "location": "ตึก81",
        "user_id": 1
      },
      {
        "id": 2,
        "productItems_id": "t2",
        "status": true,
        "start_date": "2023-03-10T17:30:24.902Z",
        "end_date": "2023-03-10T17:30:40.418Z",
        "deadline": "2023-09-11T00:00:00.000Z",
        "location": "ตึก81",
        "user_id": 1
      }
    ]
  },
  {
    "id": 2,
    "role": null,
    "email": "ong2@email.com",
    "username": null,
    "phone": "023173404",
    "transactions": [
      {
        "id": 3,
        "productItems_id": "t2",
        "status": false,
        "start_date": "2023-03-10T17:30:59.511Z",
        "end_date": null,
        "deadline": "2023-09-11T00:00:00.000Z",
        "location": "ตึก81",
        "user_id": 2
      }
    ]
  }
]
```

```json
// response MongoDB
[
  {
    "id": "640dae36c691d3db6d4936a2",
    "email": "ong@email.com",
    "username": "onginwza",
    "phoneNumber": "023173404",
    "transactions": [
      {
        "id": "640dae36c691d3db6d4936a3",
        "isReturn": false,
        "startDate": "2023-03-12T10:49:26.344Z",
        "endDate": "2023-09-13T00:00:00.000Z",
        "updateDate": "2023-03-12T10:49:26.344Z",
        "deadline": "2023-09-11T00:00:00.000Z",
        "location": "ตึก81",
        "serialNumberRef": "test2",
        "userId": "640dae36c691d3db6d4936a2"
      }
    ]
  }
]
```

GET /user/id/:id

```json
// response
{
  "id": "640dae36c691d3db6d4936a2",
  "email": "ong@email.com",
  "username": "onginwza",
  "phoneNumber": "023173404",
  "transactions": [
    {
      "id": "640dae36c691d3db6d4936a3",
      "isReturn": false,
      "startDate": "2023-03-12T10:49:26.344Z",
      "endDate": "2023-09-13T00:00:00.000Z",
      "updateDate": "2023-03-12T10:49:26.344Z",
      "deadline": "2023-09-11T00:00:00.000Z",
      "location": "ตึก81",
      "serialNumberRef": "test2",
      "userId": "640dae36c691d3db6d4936a2"
    }
  ]
}
```

GET /user/borrowing

- show คนที่ยืมของทั้งหมด

```json
// response
[
  {
    "id": "640dae36c691d3db6d4936a2",
    "email": "ong@email.com",
    "username": "onginwza",
    "phoneNumber": "023173404",
    "transactions": [
      {
        "id": "640dae36c691d3db6d4936a3",
        "isReturn": false,
        "startDate": "2023-03-12T10:49:26.344Z",
        "endDate": "2023-09-13T00:00:00.000Z",
        "updateDate": "2023-03-12T10:49:26.344Z",
        "deadline": "2023-09-11T00:00:00.000Z",
        "location": "ตึก81",
        "serialNumberRef": "test2",
        "userId": "640dae36c691d3db6d4936a2"
      }
    ]
  }
]
```

GET /user/borrowing/:id

- show คนที่ยืมของ by id

```json
// response
{
  "id": "640dae36c691d3db6d4936a2",
  "email": "ong@email.com",
  "username": "onginwza",
  "phoneNumber": "023173404",
  "transactions": [
    {
      "id": "640dae36c691d3db6d4936a3",
      "isReturn": false,
      "startDate": "2023-03-12T10:49:26.344Z",
      "endDate": "2023-09-13T00:00:00.000Z",
      "updateDate": "2023-03-12T10:49:26.344Z",
      "deadline": "2023-09-11T00:00:00.000Z",
      "location": "ตึก81",
      "serialNumberRef": "test2",
      "userId": "640dae36c691d3db6d4936a2"
    }
  ]
}
```

# ProductItem

[to Top](#Endpoint-ของ-backend)

GET /productItem

```json
// response
[
  {
    "id": "640dadc7c691d3db6d49369f",
    "serialNumber": "test2",
    "isBroken": false,
    "roomId": "640da1de64efbf2f7ba69c5f",
    "sourceId": "640da1de64efbf2f7ba69c62",
    "productId": "640da1de64efbf2f7ba69c65",
    "transactions": [
      {
        "id": "640dae36c691d3db6d4936a3",
        "isReturn": false,
        "startDate": "2023-03-12T10:49:26.344Z",
        "endDate": "2023-09-13T00:00:00.000Z",
        "updateDate": "2023-03-12T10:49:26.344Z",
        "deadline": "2023-09-11T00:00:00.000Z",
        "location": "ตึก81",
        "serialNumberRef": "test2",
        "userId": "640dae36c691d3db6d4936a2"
      }
    ],
    "room": {
      "id": "640da1de64efbf2f7ba69c5f",
      "name": "Lab A"
    },
    "source": {
      "id": "640da1de64efbf2f7ba69c62",
      "name": "center"
    },
    "product": {
      "id": "640da1de64efbf2f7ba69c65",
      "name": "Calculator",
      "description": null,
      "usageFrequency": 0,
      "totalAmount": 1,
      "availableAmount": 0,
      "image": null
    }
  }
]
```

GET /productItem/id/:id

```json
// response
{
  "id": "640dadc7c691d3db6d49369f",
  "serialNumber": "test2",
  "isBroken": false,
  "roomId": "640da1de64efbf2f7ba69c5f",
  "sourceId": "640da1de64efbf2f7ba69c62",
  "productId": "640da1de64efbf2f7ba69c65",
  "transactions": [
    {
      "id": "640dae36c691d3db6d4936a3",
      "isReturn": false,
      "startDate": "2023-03-12T10:49:26.344Z",
      "endDate": "2023-09-13T00:00:00.000Z",
      "updateDate": "2023-03-12T10:49:26.344Z",
      "deadline": "2023-09-11T00:00:00.000Z",
      "location": "ตึก81",
      "serialNumberRef": "test2",
      "userId": "640dae36c691d3db6d4936a2"
    }
  ],
  "room": {
    "id": "640da1de64efbf2f7ba69c5f",
    "name": "Lab A"
  },
  "source": {
    "id": "640da1de64efbf2f7ba69c62",
    "name": "center"
  },
  "product": {
    "id": "640da1de64efbf2f7ba69c65",
    "name": "Calculator",
    "description": null,
    "usageFrequency": 0,
    "totalAmount": 1,
    "availableAmount": 0,
    "image": null
  }
}
```

GET /productItem/products/:id

- show product item โดยใช้ id ของ product

```json
// response
[
  {
    "id": "640dadc7c691d3db6d49369f",
    "serialNumber": "test2",
    "isBroken": false,
    "roomId": "640da1de64efbf2f7ba69c5f",
    "sourceId": "640da1de64efbf2f7ba69c62",
    "productId": "640da1de64efbf2f7ba69c65",
    "transactions": [
      {
        "id": "640dae36c691d3db6d4936a3",
        "isReturn": false,
        "startDate": "2023-03-12T10:49:26.344Z",
        "endDate": "2023-09-13T00:00:00.000Z",
        "updateDate": "2023-03-12T10:49:26.344Z",
        "deadline": "2023-09-11T00:00:00.000Z",
        "location": "ตึก81",
        "serialNumberRef": "test2",
        "userId": "640dae36c691d3db6d4936a2"
      }
    ],
    "room": {
      "id": "640da1de64efbf2f7ba69c5f",
      "name": "Lab A"
    },
    "source": {
      "id": "640da1de64efbf2f7ba69c62",
      "name": "center"
    },
    "product": {
      "id": "640da1de64efbf2f7ba69c65",
      "name": "Calculator",
      "description": null,
      "usageFrequency": 0,
      "totalAmount": 1,
      "availableAmount": 0,
      "image": null
    }
  }
]
```

GET /productItem/products/available/:id

- show product item ที่สามารถยืมได้ โดยใช้ id ของ products

```json
// response
[
  {
    "id": "640db683860ba9a4c65768b8",
    "serialNumber": "test4444",
    "isBroken": false,
    "roomId": "640da1de64efbf2f7ba69c60",
    "sourceId": "640da1de64efbf2f7ba69c62",
    "productId": "640da1de64efbf2f7ba69c66",
    "transactions": [],
    "room": {
      "id": "640da1de64efbf2f7ba69c60",
      "name": "Lab B"
    },
    "source": {
      "id": "640da1de64efbf2f7ba69c62",
      "name": "center"
    },
    "product": {
      "id": "640da1de64efbf2f7ba69c66",
      "name": "Telescope",
      "description": null,
      "usageFrequency": 0,
      "totalAmount": 1,
      "availableAmount": 1,
      "image": null
    }
  }
]
```

POST /productItem

```json
// request
{
    "serialNumber": "test4444",
    "sourceId": "640da1de64efbf2f7ba69c62",
    "roomId": "640da1de64efbf2f7ba69c60",
    "productId": "640da1de64efbf2f7ba69c66"
}

// response
{
    "id": "640db683860ba9a4c65768b8",
    "serialNumber": "test4444",
    "isBroken": false,
    "roomId": "640da1de64efbf2f7ba69c60",
    "sourceId": "640da1de64efbf2f7ba69c62",
    "productId": "640da1de64efbf2f7ba69c66",
    "transactions": [],
    "room": {
        "id": "640da1de64efbf2f7ba69c60",
        "name": "Lab B"
    },
    "source": {
        "id": "640da1de64efbf2f7ba69c62",
        "name": "center"
    },
    "product": {
        "id": "640da1de64efbf2f7ba69c66",
        "name": "Telescope",
        "description": null,
        "usageFrequency": 0,
        "totalAmount": 0,
        "availableAmount": 0,
        "image": null
    }
}
```

DELETE /productItem/:id

```json
// response
{
  "id": "640db683860ba9a4c65768b8",
  "serialNumber": "test4444",
  "isBroken": false,
  "roomId": "640da1de64efbf2f7ba69c60",
  "sourceId": "640da1de64efbf2f7ba69c62",
  "productId": "640da1de64efbf2f7ba69c66"
}
```

# Transaction

[to Top](#Endpoint-ของ-backend)

GET /transaction

```json
// response
[
  {
    "id": "640dae36c691d3db6d4936a3",
    "isReturn": false,
    "startDate": "2023-03-12T10:49:26.344Z",
    "endDate": "2023-09-13T00:00:00.000Z",
    "updateDate": "2023-03-12T10:49:26.344Z",
    "deadline": "2023-09-11T00:00:00.000Z",
    "location": "ตึก81",
    "serialNumberRef": "test2",
    "userId": "640dae36c691d3db6d4936a2",
    "user": {
      "id": "640dae36c691d3db6d4936a2",
      "email": "ong@email.com",
      "username": "onginwza",
      "phoneNumber": "023173404"
    },
    "productItem": {
      "id": "640dadc7c691d3db6d49369f",
      "serialNumber": "test2",
      "isBroken": false,
      "roomId": "640da1de64efbf2f7ba69c5f",
      "sourceId": "640da1de64efbf2f7ba69c62",
      "productId": "640da1de64efbf2f7ba69c65",
      "room": {
        "id": "640da1de64efbf2f7ba69c5f",
        "name": "Lab A"
      },
      "product": {
        "id": "640da1de64efbf2f7ba69c65",
        "name": "Calculator",
        "description": null,
        "usageFrequency": 0,
        "totalAmount": 1,
        "availableAmount": 0,
        "image": null
      },
      "source": {
        "id": "640da1de64efbf2f7ba69c62",
        "name": "center"
      }
    }
  }
]
```

GET /transaction/id/:id

```json
// response
{
  "id": "640dae36c691d3db6d4936a3",
  "isReturn": false,
  "startDate": "2023-03-12T10:49:26.344Z",
  "endDate": "2023-09-13T00:00:00.000Z",
  "updateDate": "2023-03-12T10:49:26.344Z",
  "deadline": "2023-09-11T00:00:00.000Z",
  "location": "ตึก81",
  "serialNumberRef": "test2",
  "userId": "640dae36c691d3db6d4936a2",
  "user": {
    "id": "640dae36c691d3db6d4936a2",
    "email": "ong@email.com",
    "username": "onginwza",
    "phoneNumber": "023173404"
  },
  "productItem": {
    "id": "640dadc7c691d3db6d49369f",
    "serialNumber": "test2",
    "isBroken": false,
    "roomId": "640da1de64efbf2f7ba69c5f",
    "sourceId": "640da1de64efbf2f7ba69c62",
    "productId": "640da1de64efbf2f7ba69c65",
    "room": {
      "id": "640da1de64efbf2f7ba69c5f",
      "name": "Lab A"
    },
    "product": {
      "id": "640da1de64efbf2f7ba69c65",
      "name": "Calculator",
      "description": null,
      "usageFrequency": 0,
      "totalAmount": 1,
      "availableAmount": 0,
      "image": null
    },
    "source": {
      "id": "640da1de64efbf2f7ba69c62",
      "name": "center"
    }
  }
}
```

GET /transaction/borrowing

- show ธุรกรรมที่ทำการยืมอยู่ทั้งหมด

```json
// response
[
  {
    "id": "640dae36c691d3db6d4936a3",
    "isReturn": false,
    "startDate": "2023-03-12T10:49:26.344Z",
    "endDate": "2023-09-13T00:00:00.000Z",
    "updateDate": "2023-03-12T10:49:26.344Z",
    "deadline": "2023-09-11T00:00:00.000Z",
    "location": "ตึก81",
    "serialNumberRef": "test2",
    "userId": "640dae36c691d3db6d4936a2",
    "user": {
      "id": "640dae36c691d3db6d4936a2",
      "email": "ong@email.com",
      "username": "onginwza",
      "phoneNumber": "023173404"
    },
    "productItem": {
      "id": "640dadc7c691d3db6d49369f",
      "serialNumber": "test2",
      "isBroken": false,
      "roomId": "640da1de64efbf2f7ba69c5f",
      "sourceId": "640da1de64efbf2f7ba69c62",
      "productId": "640da1de64efbf2f7ba69c65",
      "room": {
        "id": "640da1de64efbf2f7ba69c5f",
        "name": "Lab A"
      },
      "product": {
        "id": "640da1de64efbf2f7ba69c65",
        "name": "Calculator",
        "description": null,
        "usageFrequency": 0,
        "totalAmount": 1,
        "availableAmount": 0,
        "image": null
      },
      "source": {
        "id": "640da1de64efbf2f7ba69c62",
        "name": "center"
      }
    }
  }
]
```

POST /transaction

```json
// request
{
    "email": "ong3@email.com",
    "phoneNumber": "023173404",
    "location": "ตึก81",
    "deadline": "2023-09-11",
    "serialNumberRef": "test4444",
    "username": "onginwzaaaa"
}

// response
{
    "id": "640db878860ba9a4c65768bc",
    "isReturn": false,
    "startDate": "2023-03-12T11:33:12.675Z",
    "endDate": null,
    "updateDate": "2023-03-12T11:33:12.675Z",
    "deadline": "2023-09-11T00:00:00.000Z",
    "location": "ตึก81",
    "serialNumberRef": "test4444",
    "userId": "640db878860ba9a4c65768bb",
    "user": {
        "id": "640db878860ba9a4c65768bb",
        "email": "ong3@email.com",
        "username": "onginwzaaaa",
        "phoneNumber": "023173404"
    },
    "productItem": {
        "id": "640db84f860ba9a4c65768ba",
        "serialNumber": "test4444",
        "isBroken": false,
        "roomId": "640da1de64efbf2f7ba69c60",
        "sourceId": "640da1de64efbf2f7ba69c62",
        "productId": "640da1de64efbf2f7ba69c66",
        "room": {
            "id": "640da1de64efbf2f7ba69c60",
            "name": "Lab B"
        },
        "product": {
            "id": "640da1de64efbf2f7ba69c66",
            "name": "Telescope",
            "description": null,
            "usageFrequency": 0,
            "totalAmount": 1,
            "availableAmount": 1,
            "image": null
        },
        "source": {
            "id": "640da1de64efbf2f7ba69c62",
            "name": "center"
        }
    }
}
```

PUT /transaction/status/:id

- update การยืม, คืน

```json
// request
{
	"status": true
}

// response
{
    "id": "640db878860ba9a4c65768bc",
    "isReturn": true,
    "startDate": "2023-03-12T11:33:12.675Z",
    "endDate": "2023-03-12T11:33:31.260Z",
    "updateDate": "2023-03-12T11:33:31.262Z",
    "deadline": "2023-09-11T00:00:00.000Z",
    "location": "ตึก81",
    "serialNumberRef": "test4444",
    "userId": "640db878860ba9a4c65768bb",
    "productItem": {
        "id": "640db84f860ba9a4c65768ba",
        "serialNumber": "test4444",
        "isBroken": false,
        "roomId": "640da1de64efbf2f7ba69c60",
        "sourceId": "640da1de64efbf2f7ba69c62",
        "productId": "640da1de64efbf2f7ba69c66"
    }
}
```
