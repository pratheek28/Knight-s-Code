from google import genai
from dotenv import load_dotenv
import os
from fastapi import FastAPI, Request, Body
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


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
    You are a world class college professor teaching C++. Here is is/are the topic(s): {totTopic}
    First, create a lesson of the topics (make sure it is easy to comprehend, and use examples/analogies when 
    appropriate to help the student understand the topic(s)). Just jump right into the lesson, no filler words before. Limit 
    the lesson to 150 words or less.
    Then, generate 3 multiple choice questions based on these topic(s). The questions should be challenging but not too difficult. 
    The questions should be clear and concise. The questions should be in markdown format. The questions should have 3 options 
    in the following format: 
    
    q1:question1 
        c1: choice1 
        c2: choice2 
        c3: choice3
        a: answer
    
    and so on. the a should be the answer choice to the mcq.
    """
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=prompt
    )
    message = {
        "question": response.text
    }
    # return JSONResponse(content=message)
    print(message)


def generate_coding(topic):
    print("lol")
    prompt = f"""Here is is/are the topic(s): {topic}
    Generate a coding question based on the topic(s). The question should be challenging but not too difficult. 
    The question should be clear and concise. The question should not require more than 50 lines.
    
    Provide code that partly solves the question (when necessary), but still challenges the student to fix/edit it 
    regarding the topic(s).
    
    seperate the question and the code with a line of dashes.
    
    then, create 20 test cases in a main function (it should call the function the student edits) 
    to make sure the code runs correctly. 
    
    then, create the expected console output starting with the line "Expected Output:".
    """
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=prompt
    )
    message = {
        "question": response.text
    }
    # return JSONResponse(content=message)
    print(message)