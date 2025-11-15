from google import genai
from fastapi import FastAPI, Request, Body
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
client = genai.Client()


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