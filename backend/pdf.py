from pypdf import PdfReader

def extract_text(file):
    reader = PdfReader(file)

    curr = ""

    for page in reader.pages:
        curr += page.extract_text(extraction_mode="layout")
        
    return curr

def parse(file):
    text = extract_text(file)
    
    lines = text.splitlines()
    
    data = {}
    currChapter = ""
    
    for line in lines:
        line = line.strip()
        
        if line.startswith("Ch"):
            currChapter = line
            data[currChapter] = []
        elif line.startswith("T"):
            if currChapter:
                data[currChapter].append(line[4:])
    
    return data

print(parse("CS10A_Topics.pdf"))