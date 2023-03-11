
# Endpoint ของ backend

- user จะถูกสร้างขึ้นเองเมื่อทำการสร้าง transaction
- total, avaliable ของ product จะ update เมื่อสร้าง product item, สร้าง transaction และเมื่อทำการคืนของ
- frequency ของ product จะเพิ่มขึ้นเมื่อสร้าง transaction
- transaction ใน field deadline ใช้ format  yyyy-mm-dd
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
        "id": "640b3e7bd7a3bbf3e18c10a6",
        "name": "Lab A"
    },
    {
        "id": "640b3e7cd7a3bbf3e18c10a7",
        "name": "Lab B"
    },
    {
        "id": "640b3e7cd7a3bbf3e18c10a8",
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
    "id": "640b418f6a5d432b9d0e6b90",
    "name": "test roop"
}
```

DELETE /lab/:id
```json
// response
{
    "id": "640b418f6a5d432b9d0e6b90",
    "name": "test roop"
}
```

# Source

[to Top](#Endpoint-ของ-backend)

GET /source
```json
// response
{
    "id": "640b418f6a5d432b9d0e6b90",
    "name": "test roop"
}
```

POST /source
```json
// request
{
	"name": "test roop"
}

// response
{
    "id": "640b418f6a5d432b9d0e6b90",
    "name": "test roop"
}
```

DELETE /source/:id
```json
// response
{
    "id": "640b418f6a5d432b9d0e6b90",
    "name": "test roop"
}
```

# Products

[to Top](#Endpoint-ของ-backend)

GET /product
```json
// response
[
    {
        "id": "640b3e7cd7a3bbf3e18c10ac",
        "name": "Oscilloscope",
        "frequency": 0,
        "total": 0,
        "available": 0
    },
    {
        "id": "640b3e7cd7a3bbf3e18c10ad",
        "name": "Telescope",
        "frequency": 0,
        "total": 0,
        "available": 0
    }
]
```

GET /product/id/:id
```json
// response
{
    "id": "640b3e7cd7a3bbf3e18c10ac",
    "name": "Calculator",
    "frequency": 0,
    "total": 0,
    "available": 0
}
```

POST /product
```json
// request
{
	"name": "Rasbery"
}

// response
{
    "id": 3,
    "name": "Rasbery",
    "frequency": 0,
    "total": 0,
    "available": 0
}
```

DELETE /product/1
```json
// response
{
    "id": 1,
    "name": "Calculator",
    "frequency": 0,
    "total": 0,
    "available": 0
}
```

# User

[to Top](#Endpoint-ของ-backend)

GET /user
```json
// response
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


GET /user/id/:id
```json
// response
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
}
```

GET /user/borrowing
- show คนที่ยืมของทั้งหมด
```json
// response
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

GET /user/borrowing/:id
- show คนที่ยืมของ by id
```json
// response
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
        "id": 1,
        "serial_no": "t1",
        "broken_status": false,
        "source_id": 3,
        "lab_id": 2,
        "products_id": 2,
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
            }
        ],
        "lab": {
            "id": 2,
            "name": "lab2"
        },
        "source": {
            "id": 3,
            "name": "personal"
        },
        "products": {
            "id": 2,
            "name": "Telescope",
            "frequency": 3,
            "total": 2,
            "available": 0
        }
    },
    {
        "id": 2,
        "serial_no": "t2",
        "broken_status": false,
        "source_id": 3,
        "lab_id": 2,
        "products_id": 2,
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
        ],
        "lab": {
            "id": 2,
            "name": "lab2"
        },
        "source": {
            "id": 3,
            "name": "personal"
        },
        "products": {
            "id": 2,
            "name": "Telescope",
            "frequency": 3,
            "total": 2,
            "available": 0
        }
    }
]
```


GET /productItem/id/:id
```json
// response
{
    "id": 2,
    "serial_no": "t2",
    "broken_status": false,
    "source_id": 3,
    "lab_id": 2,
    "products_id": 2,
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
    ],
    "lab": {
        "id": 2,
        "name": "lab2"
    },
    "source": {
        "id": 3,
        "name": "personal"
    },
    "products": {
        "id": 2,
        "name": "Telescope",
        "frequency": 3,
        "total": 2,
        "available": 0
    }
}
```

GET /productItem/products/:id
- show product item โดยใช้ id ของ product
```json
// response
[
    {
        "id": 1,
        "serial_no": "t1",
        "broken_status": false,
        "source_id": 3,
        "lab_id": 2,
        "products_id": 2,
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
            }
        ],
        "lab": {
            "id": 2,
            "name": "lab2"
        },
        "source": {
            "id": 3,
            "name": "personal"
        },
        "products": {
            "id": 2,
            "name": "Telescope",
            "frequency": 3,
            "total": 2,
            "available": 0
        }
    },
    {
        "id": 2,
        "serial_no": "t2",
        "broken_status": false,
        "source_id": 3,
        "lab_id": 2,
        "products_id": 2,
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
        ],
        "lab": {
            "id": 2,
            "name": "lab2"
        },
        "source": {
            "id": 3,
            "name": "personal"
        },
        "products": {
            "id": 2,
            "name": "Telescope",
            "frequency": 3,
            "total": 2,
            "available": 0
        }
    }
]
```

GET /productItem/available/:id
-  show product item ที่สามารถยืมได้ โดยใช้ id ของ product
```json
// response
[
    {
        "id": 2,
        "serial_no": "t2",
        "broken_status": false,
        "source_id": 3,
        "lab_id": 2,
        "products_id": 2,
        "transactions": [
            {
                "id": 2,
                "productItems_id": "t2",
                "status": true,
                "start_date": "2023-03-10T17:30:24.902Z",
                "end_date": "2023-03-10T17:30:40.418Z",
                "deadline": "2023-09-11T00:00:00.000Z",
                "location": "ตึก81",
                "user_id": 1
            },
            {
                "id": 3,
                "productItems_id": "t2",
                "status": true,
                "start_date": "2023-03-10T17:30:59.511Z",
                "end_date": "2023-03-10T17:36:43.836Z",
                "deadline": "2023-09-11T00:00:00.000Z",
                "location": "ตึก81",
                "user_id": 2
            }
        ],
        "lab": {
            "id": 2,
            "name": "lab2"
        },
        "source": {
            "id": 3,
            "name": "personal"
        },
        "products": {
            "id": 2,
            "name": "Telescope",
            "frequency": 3,
            "total": 2,
            "available": 1
        }
    }
]
```

POST /productItem
```json
// request
{

	"serial_no": "t3",
	"source_id": 3,
	"lab_id": 2,
	"products_id": 2
}

// response
{
    "id": 3,
    "serial_no": "t3",
    "broken_status": false,
    "source_id": 3,
    "lab_id": 2,
    "products_id": 2,
    "transactions": [],
    "lab": {
        "id": 2,
        "name": "lab2"
    },
    "source": {
        "id": 3,
        "name": "personal"
    },
    "products": {
        "id": 2,
        "name": "Telescope",
        "frequency": 3,
        "total": 2,
        "available": 1
    }
}
```

DELETE /productItem/:id
```json
// response
{
    "id": 3,
    "serial_no": "t3",
    "broken_status": false,
    "source_id": 3,
    "lab_id": 2,
    "products_id": 2
}
```

# Transaction

[to Top](#Endpoint-ของ-backend)

GET /transaction
```json
// response
[
    {
        "id": 1,
        "productItems_id": "t1",
        "status": false,
        "start_date": "2023-03-10T17:22:59.285Z",
        "end_date": null,
        "deadline": "2023-09-11T00:00:00.000Z",
        "location": "ตึก81",
        "user_id": 1,
        "user": {
            "id": 1,
            "role": null,
            "email": "ong@email.com",
            "username": null,
            "phone": "023173404"
        },
        "productItems": {
            "id": 1,
            "serial_no": "t1",
            "broken_status": false,
            "source_id": 3,
            "lab_id": 2,
            "products_id": 2,
            "lab": {
                "id": 2,
                "name": "lab2"
            },
            "products": {
                "id": 2,
                "name": "Telescope",
                "frequency": 3,
                "total": 2,
                "available": 2
            },
            "source": {
                "id": 3,
                "name": "personal"
            }
        }
    },
    {
        "id": 2,
        "productItems_id": "t2",
        "status": true,
        "start_date": "2023-03-10T17:30:24.902Z",
        "end_date": "2023-03-10T17:30:40.418Z",
        "deadline": "2023-09-11T00:00:00.000Z",
        "location": "ตึก81",
        "user_id": 1,
        "user": {
            "id": 1,
            "role": null,
            "email": "ong@email.com",
            "username": null,
            "phone": "023173404"
        },
        "productItems": {
            "id": 2,
            "serial_no": "t2",
            "broken_status": false,
            "source_id": 3,
            "lab_id": 2,
            "products_id": 2,
            "lab": {
                "id": 2,
                "name": "lab2"
            },
            "products": {
                "id": 2,
                "name": "Telescope",
                "frequency": 3,
                "total": 2,
                "available": 2
            },
            "source": {
                "id": 3,
                "name": "personal"
            }
        }
    },
    {
        "id": 3,
        "productItems_id": "t2",
        "status": true,
        "start_date": "2023-03-10T17:30:59.511Z",
        "end_date": "2023-03-10T17:36:43.836Z",
        "deadline": "2023-09-11T00:00:00.000Z",
        "location": "ตึก81",
        "user_id": 2,
        "user": {
            "id": 2,
            "role": null,
            "email": "ong2@email.com",
            "username": null,
            "phone": "023173404"
        },
        "productItems": {
            "id": 2,
            "serial_no": "t2",
            "broken_status": false,
            "source_id": 3,
            "lab_id": 2,
            "products_id": 2,
            "lab": {
                "id": 2,
                "name": "lab2"
            },
            "products": {
                "id": 2,
                "name": "Telescope",
                "frequency": 3,
                "total": 2,
                "available": 2
            },
            "source": {
                "id": 3,
                "name": "personal"
            }
        }
    }
]
```

GET /transaction/id/:id
```json
// response
{
    "id": 3,
    "productItems_id": "t2",
    "status": true,
    "start_date": "2023-03-10T17:30:59.511Z",
    "end_date": "2023-03-10T17:36:43.836Z",
    "deadline": "2023-09-11T00:00:00.000Z",
    "location": "ตึก81",
    "user_id": 2,
    "user": {
        "id": 2,
        "role": null,
        "email": "ong2@email.com",
        "username": null,
        "phone": "023173404"
    },
    "productItems": {
        "id": 2,
        "serial_no": "t2",
        "broken_status": false,
        "source_id": 3,
        "lab_id": 2,
        "products_id": 2,
        "lab": {
            "id": 2,
            "name": "lab2"
        },
        "products": {
            "id": 2,
            "name": "Telescope",
            "frequency": 3,
            "total": 2,
            "available": 2
        },
        "source": {
            "id": 3,
            "name": "personal"
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
        "id": 1,
        "productItems_id": "t1",
        "status": false,
        "start_date": "2023-03-10T17:22:59.285Z",
        "end_date": null,
        "deadline": "2023-09-11T00:00:00.000Z",
        "location": "ตึก81",
        "user_id": 1,
        "user": {
            "id": 1,
            "role": null,
            "email": "ong@email.com",
            "username": null,
            "phone": "023173404"
        },
        "productItems": {
            "id": 1,
            "serial_no": "t1",
            "broken_status": false,
            "source_id": 3,
            "lab_id": 2,
            "products_id": 2,
            "lab": {
                "id": 2,
                "name": "lab2"
            },
            "products": {
                "id": 2,
                "name": "Telescope",
                "frequency": 3,
                "total": 2,
                "available": 2
            },
            "source": {
                "id": 3,
                "name": "personal"
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
	"phone": "023173404",
	"location": "ตึก81",
	"deadline": "2023-09-11",
	"product_item_id": "t2"
}

// response
{
    "id": 4,
    "productItems_id": "t2",
    "status": false,
    "start_date": "2023-03-10T17:43:21.801Z",
    "end_date": null,
    "deadline": "2023-09-11T00:00:00.000Z",
    "location": "ตึก81",
    "user_id": 3,
    "user": {
        "id": 3,
        "role": null,
        "email": "ong3@email.com",
        "username": null,
        "phone": "023173404"
    },
    "productItems": {
        "id": 2,
        "serial_no": "t2",
        "broken_status": false,
        "source_id": 3,
        "lab_id": 2,
        "products_id": 2,
        "lab": {
            "id": 2,
            "name": "lab2"
        },
        "products": {
            "id": 2,
            "name": "Telescope",
            "frequency": 3,
            "total": 2,
            "available": 2
        },
        "source": {
            "id": 3,
            "name": "personal"
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
    "id": 4,
    "productItems_id": "t2",
    "status": true,
    "start_date": "2023-03-10T17:43:21.801Z",
    "end_date": "2023-03-10T17:44:16.134Z",
    "deadline": "2023-09-11T00:00:00.000Z",
    "location": "ตึก81",
    "user_id": 3,
    "productItems": {
        "id": 2,
        "serial_no": "t2",
        "broken_status": false,
        "source_id": 3,
        "lab_id": 2,
        "products_id": 2
    }
}
```

