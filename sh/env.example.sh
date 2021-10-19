# Config app environment variable
export NODE_ENV=development
export PORT=8888

# URL of the Mongo DB
export MONGODB_URI="mongodb://127.0.0.1:27017/my_node_boilerplate"
# export MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.wqu70.mongodb.net/<database_name>?retryWrites=true&w=majority"


# JWT
# JWT secret key
export JWT_SECRET=123123
# Number of minutes after which an access token expires
export JWT_ACCESS_EXPIRATION_MINUTES= 30
# Number of days after which a refresh token expires
export JWT_REFRESH_EXPIRATION_DAYS=30
# Number of minutes after which a reset password token expires
export JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10
# Number of minutes after which a verify email token expires
export JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=10


# SMTP configuration options for the email service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
export SMTP_HOST=email-server
export SMTP_PORT=587
export SMTP_USERNAME=email-server-username
export SMTP_PASSWORD=email-server-password
export FROM_EMAIL=support@yourapp.com
