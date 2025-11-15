import os
from astrapy import DataAPIClient, Database
from fastapi import FastAPI, Request

endpoint = os.environ.get("API_ENDPOINT")
token = os.environ.get("APPLICATION_TOKEN")

if not token or not endpoint:
    raise RuntimeError(
        "Environment variables API_ENDPOINT and APPLICATION_TOKEN must be defined"
    )

# Create an instance of the `DataAPIClient` class
client = DataAPIClient()

# Get the database specified by your endpoint and provide the token
db = client.get_database(endpoint, token=token)

print(f"Connected to database {database.info().name}")

#1 email


#2 chapter


# users = db.get_table("users")
# chapters = db.get_table("chapters")

@app.post("/pdf")
async def pdf(request: Request):
    data = await request.json()
    
    chapter = data.get("chapter")
    t1 = data.get("t1")
    t2 = data.get("t2")
    
    if (not chapter) or (not t1) or (not t2):
        message = {
            "message": "Error: Missing fields"
        }
        return JSONResponse(content=message, status_code=422)
    
    chapters = db.get_table("chapters")
    
    chapterData = {
        "chapter": chapter,
        "t1": t1,
        "t2": t2
    }
    
    chapters.insert(chapterData)
    
    message = {
        "message": "Success"
    }
    
    return JSONResponse(content=message)


@app.post("/users")
async def users(request: Request):
    data = request.json()
    
    email = data.get("email")
    chapter = data.get("chapter")
    question = data.get("question")
    
    if (not email) or (not chapter) or (not question):
        message = {
            "message": "Error: Missing Fields"
        }
        return JSONResponse(content=message, status_code=422)
    
    users = db.get_table("users")
    
    userData = {
        "email": email,
        "chapter": chapter,
        "question": question
    }
    
    users.insert(userData)
    
    message = {
        "message": "Success"
    }
    
    return JSONResponse(content=message)


# users.insert({"id": 1, "name": "John Doe"})
# chapters.insert({"id": 1, "name": "Chapter 1"})

