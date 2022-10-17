## BackEnd for Expense Tracker

---

This backend is built using Express on top of Node JS and Mongoose is used for handling transactions with MongoDB Database.

> Features

1. User Authentication using JWT.

2. Category based expense tagging.

3. Soft delete of expenses.

4. Image upload and serve via static link for Profile.

> Packages

1. `bcryptjs`

   Used to encrypt the password before saving to database and for verification of credential while logging in.

2. `jsonwebtoken`

   Provides token based authorizationfor User

3. `Multer`

   Implemented for reading data from form-data in image format and saving it on Backend
