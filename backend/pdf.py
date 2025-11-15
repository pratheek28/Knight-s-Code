from pypdf import PdfReader

reader = PdfReader("Alton_Qian_Resume.pdf")

curr = ""

for page in reader.pages:
    curr += page.extract_text()


print(curr)