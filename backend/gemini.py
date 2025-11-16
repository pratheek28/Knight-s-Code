from google import genai
from dotenv import load_dotenv
import os
from fastapi import FastAPI, Request, Body
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import re

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


stories = {
    "chapter1": "You, Arden Wick, wanderer and reluctant problem-solver, are invited to Duke Malveren's grand tournament feast. Mid-toast, torches dim… and the Duke slumps dead in his high-backed chair. Guards seal the keep, and everyone looks at you — the outsider.",
    "chapter2": "You inspect the Duke’s tonic vial with the castle alchemist. It’s labeled “Night’s Breath,” a deadly poison — but the contents are only water. Someone swapped ingredients and labels to stage the cause of death.",
    "chapter3": "Queen Regent Lysandra claims she was praying in her chambers. But servants whisper that she argued with the Duke earlier about altering his will. Lies branch from truth; emotion twists around motive.",
    "chapter4": "Prince Alistair says he was practicing sword drills alone. Yet pieces of his story repeat with small differences, as if he’s improvising. His movements during the night form a pattern — but not a convincing one.",
    "chapter5": "Commander Garran gives you a perfect, too-polished testimony, like a speech practiced in front of a mirror. His sentences feel stiff, his words overly formal — like a memorized string.",
    "chapter6": "You investigate the Treasury Vault. Only four people can access it — the Duke, the Prince, the Queen Regent, and Commander Garran. A chest the Duke withdrew earlier that night is missing. The lock shows no tampering.",
    "chapter7": "You search the royal archives. A scribe reveals the Duke recently rewrote his will — and the updated testament was removed from the official records. Only someone with high clearance could have pulled the scroll.",
    "chapter8": "Whispers swirl as nobles accuse each other. Each accusation raises suspicion — and every time one noble speaks against another, they worsen their own credibility. Suspicion spreads like fire because everyone touches it.",
    "chapter9": "You gather your clues into categories — forgery tools, wax seals, missing files, treasury access, coded notes. All vectors converge on one pattern: the Prince is connected to every category.",
    "chapter10": "At sunrise, you assemble the suspects. You have motive, access, forged documents, the fake vial, the treasury theft, and the coded guard rotation — every attribute points to the same noble.",
}



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
    strResponse = response.text
    
    result = {}

    # Extract passage
    passage_match = re.search(r"passage\s*:\s*(.*?)\s*q1\s*:", strResponse, re.DOTALL | re.IGNORECASE)
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
    return result
    # print(message)


def generate_coding(topic):
    print("Generating coding question... for topic:", topic)
    
    prompt = f"""Here is is/are the topic(s): {topic}
    
    Provide code that partly solves the question (when necessary), but still challenges the student to fix/edit it 
    regarding the topic(s). Should be a bit simple since it's for beginners to C++.
    
    have the question commented make sure the code does not have any 'std::' prefixes. instead use namespace std
    also don't use any input like cin.
    then, create simple test cases in a main function (it should call the function the student edits) 
    to make sure the code outputs correctly. Don't expect the student to type input, the tests should pass values directly.
    
    then, create the exact expected console output starting with the line "Exp:". Don't say anything except for the code first and then "Exp:" after that.

    """
    
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=prompt
    )
    text = response.text.strip()

    # Remove ```cpp at the start
    text = re.sub(r"^```cpp\s*", "", text)

    # Remove ``` anywhere before 'Exp:' (non-greedy)
    text = re.sub(r"```(?=\s*Exp:)", "", text)

    # Now split code and expected output
    if "Exp:" in text:
        code_part, expect_part = text.split("Exp:", 1)
    else:
        code_part = text
        expect_part = ""

    message = {
        "code": code_part.strip(),
        "expect": expect_part.strip()
    }
    
    return message
