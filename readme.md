# fakebook api - document 


## .env guide

PORT=8899

DATABASE_URL="mysql://u:pw@localhost:3306/**cc18_fakebook**"

JWT_SECRET

## service path

|method |path |authen | params | query | body |
|:----- |:--- |:----  |:------ |:----- |:---- |
|post|/auth/register|-|-|-|{ identity,firstName, lastName, password, confirmPassword }
|post|/auth/login|-|-|-|{ identity, password }
|get|/auth/me|-|-|-|-|

