import json

custom_names = {}
with open('./Greek_names.csv', 'r') as f:
    lines = f.readlines()

for line in lines:
    k, v = line.split(';')
    custom_names[v.strip()] = k

with open('./airports.json') as f:
    data = json.loads(f.read())

for IATA, Custom_Name in custom_names.items():
    for i in range(len(data)):
        if IATA in data[i]['IATA']:
            data[i]['greek_name'] = Custom_Name
            break

with open('airportsWithCustomLanguages.json', 'w') as fp:
    json.dump(data, fp, ensure_ascii=False)
