# i dont know python so excuse the terrible humanslop ive presented in front of you today

import csv
import json

#fucking excel
f = open("splashes.csv", "rt", encoding="utf-8-sig")
r = csv.DictReader(f)
texts = []

for row in r:
    texts.append({ "text": row["text"], "css": row["css"], "isSleepDepr": row["text"] == "TRUE" })

f.close();

with open("splashes.json", "w") as out:
    json.dump(texts, out);
