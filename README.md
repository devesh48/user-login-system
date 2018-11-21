# User Login System

## Completely built on nodeJs
---

## Description of project

It will take user input credentials using jade built forms and submit it to nodeJs service.
NodeJs service will be connected to MongoDB through local host server and send data to mongoDB using models.
Before sending to data to MongoDB, Password field will be encrypted using Bcrypt module. Therefore Data base will be having encrypted password.

---

**Modules use**  
* Bcrypt
* Passport
* Multer
* Mongodb

---

## Module description :

**Bcrypt**
Used to encrypt password. TO use Bcrypt we need to install python, visual studio redistributable. Below is the code for Bcrypt

```
bcrypt.hash(newUser.password,10,function(err,hash){
        if (err)throw err;
        //Set Hashed password
        newUser.password = hash;
        //Create User
        newUser.save(callback);
    });    
```

**Multer** : This is used to add file content to body in request.

**MongoDb** : This is the Database that is used to store data.

**Passport**
It is used to check and verify user input passport.
If password entered in correct then redirect user to home page else redirect back to login page.
For documentation refer "http://www.passportjs.org/"
Below is the code use for passport
```

upadate code here.

```
