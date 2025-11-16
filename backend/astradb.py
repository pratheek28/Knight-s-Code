import os
import pdf
import io
import gemini
from astrapy import DataAPIClient, Database
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import File, UploadFile

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

# print(f"Connected to database {database.info().name}")

# users = db.get_table("users")
# chapters = db.get_table("chapters")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/pdf")
async def upload_pdf(file: UploadFile = File(...)):
    data = await file.read()
    file_like = io.BytesIO(data)
    
    print(file_like)
    
    parsed = pdf.parse(file_like)
    
    if (not parsed):
        message = {
            "message": "Error: Missing fields"
        }
        return JSONResponse(content=message, status_code=422)
    
    chapters = db.get_table("chapters")
    
    for chapter, topic in parsed.items():
        number = chapter[2:3]
        if chapter[3:4] == "0":
            number = chapter[2:4]
        chapterData = {
            "chapternumber": int(number),
            "chapter": str(chapter[5:]),
            "t1": str(topic[0]),
            "t2": str(topic[1])
        }
        
        chapters.insert_one(chapterData)
    
    
    message = {
        "message": "Success"
    }
    
    return JSONResponse(content=message)


@app.post("/users")
async def users(request: Request):
    data = await request.json()
    
    email = data.get("email")
    chapter = 1
    question = 1
    
    if (not email):
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
    
    users.insert_one(userData)
    
    message = {
        "message": "Success"
    }
    
    return JSONResponse(content=message)

@app.post("/getStudentInfo")
async def getStudentInfo(request: Request):
    data = await request.json()
    email = data.get("email")
    
    print("Email received:", email)

    users = db.get_table("users")

    userData = users.find_one({"email": email})

    print("User data retrieved:", userData)

    if not userData:
        message = {
            "message": "Error: User not found"
        }
        return JSONResponse(content=message, status_code=404)
    
    print(userData)
    return JSONResponse(content=dict(userData))
    
@app.post("/question")
async def question(request: Request):
    body = await request.json()  # <-- parse JSON body

    chapter = body.get("chapter")
    question = body.get("question") 

    
    if (not question) or (not chapter):
        message = {
            "message": "Error: Missing Fields"
        }
        return JSONResponse(content=message, status_code=422)
    
    chapters = db.get_table("chapters")
    
    chapterData = chapters.find_one({"chapternumber": int(chapter)})
    
    intquestion = int(question)
    
    if intquestion == 1:
        # print(chapterData["chapter"], chapterData["t1"], chapterData["t2"], "\n")
        return JSONResponse(content=gemini.generate_mcq(chapterData["chapter"]+" "+chapterData["t1"], chapterData["chapter"]+" "+chapterData["t2"]))
    elif intquestion == 2:
        # print(chapterData["chapter"], chapterData["t1"], "\n")
        return JSONResponse(content=gemini.generate_coding(chapterData["chapter"]+" "+chapterData["t1"]))
    elif intquestion == 3:
        # print(chapterData["chapter"], chapterData["t2"], "\n")
        return JSONResponse(content=gemini.generate_coding(chapterData["chapter"]+" "+chapterData["t2"]))
    
    message = {
        "message": "Success"
    }
    
    return JSONResponse(content=message)


# users.insert({"id": 1, "name": "John Doe"})
# chapters.insert({"id": 1, "name": "Chapter 1"})

# def pdfTest(file):
#     # data = await file.read()
    
#     print(file)
    
#     parsed = pdf.parse(file)
    
#     # if (not parsed):
#     #     message = {
#     #         "message": "Error: Missing fields"
#     #     }
#     #     return JSONResponse(content=message, status_code=422)
    
#     chapters = db.get_table("chapters")
    
#     for chapter, topic in parsed.items():
#         number = chapter[2:3]
        
#         chapterData = {
#             "chapternumber": int(number),
#             "chapter": str(chapter[5:]),
#             "t1": str(topic[0]),
#             "t2": str(topic[1])
#         }
        
#         chapters.insert_one(chapterData)

# pdfTest("CS10A_Topics.pdf")


def getQuestion(chapter, question):
    # data = request.json()
    
    # chapter = data.get("chapter")
    # question = data.get("question")
    
    # if (not question) or (not chapter):
    #     message = {
    #         "message": "Error: Missing Fields"
    #     }
    #     return JSONResponse(content=message, status_code=422)
    
    chapters = db.get_table("chapters")
    
    chapterData = chapters.find_one({"chapternumber": int(chapter)})
    
    intquestion = int(question)
    
    if intquestion == 1:
        print(chapterData["chapter"], chapterData["t1"], chapterData["t2"], "\n")
        response = gemini.generate_mcq(chapterData["t1"], chapterData["t2"])
    elif intquestion == 2:
        print(chapterData["chapter"], chapterData["t1"], "\n")
        response = gemini.generate_coding(chapterData["t1"])
    elif intquestion == 3:
        print(chapterData["chapter"], chapterData["t2"], "\n")
        response = gemini.generate_coding(chapterData["t2"])
        
    # message = {
    #     "message": "Success"
    # }
    
    return JSONResponse(content=response)
    
#getQuestion(2, 1)
# getQuestion(2, 1)
 