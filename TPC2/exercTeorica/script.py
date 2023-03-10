import json

dataset = open("dataset-extra1.json", "r")

lines = json.load(dataset)

print(lines)

id_count = 0

for line in lines["pessoas"]:
    line["id"] = f"p{id_count}"
    id_count += 1

new_dataset = open("dataset-extra2.json", "w")

json.dump(lines, new_dataset, indent=4, ensure_ascii=False)

#for line in lines["pessoas"]:
#    json.dump(line, new_dataset, indent=4)