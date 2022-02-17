# Uitdaging!

# Author

This software packet has been developed by **Geordi Jean-Luc Collette** (**G0x209C**)


# Used software

This folder contains both a backend server and a front-end package.

The front-end is build with the following core tools:
> - vue3 (3.2.29)
> - vuex (4.0.2)
> - vue-router (4.0.12)
> - vue3-cookies (1.0.6)
> - bootstrap (5)
> - sails.io.js (1.2.1)

The backend is build upon the following:
> - Sails.JS (1.5.2)
> - Waterline ORM (included with Sails.JS)
> - UUID (8.3.2)

---
# Installation/Usage
### To install the dependencies for both backend and frontend, run:
```
sudo npm i -g sails
npm run install
```

### To run the server:
```
npm run server
```

### To run the client:
```
npm run client
```

### To run both at the same time using concurrently:
First run:
 ```
 sudo npm i -g concurrently
 ``` 
Then run:
```
npm run start
```