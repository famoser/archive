import requests
import json
import lxml.html
import os.path
import jsonpickle
import sys


def save():
    global dictionary
    'normalize'
    normalized = []
    for key in sorted(dictionary):
        normalized.append(dictionary[key])

    str = jsonpickle.encode(normalized)

    with open(resultFile, 'w') as outfile:
        outfile.write(str)


class Entry:
    url = None
    name = None


resultFile = "data.json"

dictionary = {}

if os.path.isfile(resultFile):
    with open(resultFile, 'r') as outfile:
        content = json.load(outfile)
        for entry in content:
            newObj = Entry()
            newObj.url = entry["url"]
            newObj.name = entry["name"]
            dictionary[entry["url"]] = newObj
        print("read out " + str(len(content)) + " cached entries")

duplicationCount = 0
i = 1000
while i > 0:
    try:
        response = requests.get("https://www.discuvver.com/jump2.php")
        if response.url not in dictionary:
            print("new page " + response.url)
            newObj = Entry()
            newObj.url = response.url

            with open('temp.html', 'w') as outfile:
                outfile.write(response.content.decode())

            t = lxml.html.parse("temp.html")
            newObj.name = t.find(".//title").text
            dictionary[response.url] = newObj

            save()
            duplicationCount = 0
        else:
            print("duplicated page " + response.url)
            duplicationCount += 1
            if duplicationCount > 20:
                break
    except KeyboardInterrupt:
        print("Stopping capture")
    except ConnectionError:
        print("Connection error")
        break
    except:
        print("Unexpected error:", sys.exc_info()[0])
    i -= 1
