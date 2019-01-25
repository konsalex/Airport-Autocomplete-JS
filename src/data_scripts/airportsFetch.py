from urllib.request import urlopen
import json

fetched_airports = urlopen(
    'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat').read()

FETCH_URL = 'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat'

with urlopen(FETCH_URL) as f:
    response = f.read().decode('utf-8')

response_list = response.split('\n')
data = []

for row in response_list:
    if len(row.split(",")) != 14:
        continue
    values = row.split(",")
    # Check if IATA does not exist
    if (values[3] == "\\N" or len(values[3]) < 3):
        print ("I am skipping this IATA code")
        continue
    unique_airport = {}
    # If name contains International Replace it with Intl
    # And Remove Airport
    unique_airport["name"] = \
        values[1].replace('"', '')\
        .strip().replace("International", "Intl").replace("Airport", "")
    unique_airport["city"] = values[2].replace('"', '').strip()
    unique_airport["country"] = values[3].replace('"', '').strip()
    unique_airport["IATA"] = values[4].replace('"', '').strip()
    unique_airport["ICAO"] = values[5].replace('"', '').strip()
    unique_airport["lat"] = values[6].replace('"', '').strip()
    unique_airport["lon"] = values[7].replace('"', '').strip()
    unique_airport["timezone"] = values[9].replace('"', '').strip()
    data.append(unique_airport)


# Write the output to a JSON
with open('airports.json', 'w') as fp:
    json.dump(data, fp)
