from google import genai
from dotenv import load_dotenv
import os
from fastapi import FastAPI, Request, Body
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
load_dotenv()

client = genai.Client(api_key="AIzaSyBYfWImgEp82cQsXTRaRdZ5lzQ85wldnas")


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/merlin")
async def ask_merlin(payload: dict = Body(...)):
    code = payload.get("code", "")
    error = payload.get("error", "")
    prompt = f"""You are a teaching assistant for college-level students learning C++. Here is their code and the error they are encountering:
    Code: {code}
    Error: {error}
    Don't give the answer directly. Instead, briefly guide them through the problem with hints and questions to help them understand and solve it on their own. Keep it short and sweet. use markdown to be clear
    """
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=prompt
    )
    message = {
        "hint": response.text
    }
    return JSONResponse(content=message)


def generate_mcq(topic, *args):
    print("lol")
    totTopic = topic + '\n'
    
    for arg in args:
        totTopic += arg + '\n'
    
    prompt = f"""
    You are a world class college teaching assistant for C++. Here is is/are the topic(s): {totTopic}
    First, create a lesson of the topics (make sure it is easy to comprehend, and use examples/analogies when 
    appropriate to help the student understand the topic(s)). Just jump right into the lesson, no filler words before. Limit 
    the lesson to 150 words or less.
    Then, generate 3 multiple choice questions based on these topic(s). The questions should be challenging but not too difficult. 
    The questions should be clear and concise. The questions should be in markdown format. The questions should have 3 options. 
    The total format should be like the following: 
    
    passage: passage
    q1: question1 
        c1: choice1 
        c2: choice2 
        c3: choice3
        a: answer
    
    and so on. the a should be the answer choice to the mcq.
    """
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=prompt
    )
    
    result = {}

    # Extract passage
    passage_match = re.search(r"passage:\s*(.*?)\s*q1:", strResponse, re.DOTALL | re.IGNORECASE)
    if passage_match:
        result["passage"] = passage_match.group(1).strip()
    else:
        result["passage"] = ""

    # Extract questions
    for i in range(1, 4):
        # Match q1, q2, q3 along with their c1/c2/c3/a
        pattern = (
            rf"q{i}:\s*(.*?)\s*c1:\s*(.*?)\s*c2:\s*(.*?)\s*c3:\s*(.*?)\s*a:\s*(.*?)\s*(?=q{i+1}:|$)"
        )
        match = re.search(pattern, strResponse, re.DOTALL | re.IGNORECASE)
        if match:
            result[f"q{i}"] = {
                "q": match.group(1).strip(),
                "c1": match.group(2).strip(),
                "c2": match.group(3).strip(),
                "c3": match.group(4).strip(),
                "a": match.group(5).strip(),
            }
        else:
            result[f"q{i}"] = {"q": "", "c1": "", "c2": "", "c3": "", "a": ""}
    
    # message = {
    #     "question": response.text
    # }
    return JSONResponse(content=result)
    # print(message)


def generate_coding(topic):
    print("lol")
    prompt = f"""Here is is/are the topic(s): {topic}
    Generate a coding question based on the topic(s). The question should be challenging but not too difficult. 
    The question should be in comments at the top of the boiler plate code. 
    The question should be clear and concise. The entire code should not require more than 100 lines.
    
    Provide code that partly solves the question (when necessary), but still challenges the student to fix/edit it 
    regarding the topic(s).
    
    seperate the question and the code with a line of dashes.
    
    then, create 5 test cases in a main function (it should call the function the student edits) 
    to make sure the code runs correctly. 
    
    then, create the expected console output starting with the line "Exp:". Don't say anything except for the code first and then "Exp:" after that
    """
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=prompt
    )
    message = {
        "question": response.text
    }
    return JSONResponse(content=message)
    print(message)