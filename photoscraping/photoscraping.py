import requests
from bs4 import BeautifulSoup
from datetime import datetime
import pymongo
from bson.objectid import ObjectId
from dotenv.main import load_dotenv
import os

# `mongodb+srv://${username}:${password}@yanir-toar.0tfcqu7.mongodb.net/hublog?retryWrites=true&w=majority`
ADMIN_ID = '63a71ae30ec0c6f16f01ffee'
load_dotenv()
MONGO_USERNAME=os.environ['MONGO_USERNAME']
MONGO_PASSWORD=os.environ['MONGO_PASSWORD']

MONGO_URI = f"mongodb+srv://{MONGO_USERNAME}:{MONGO_PASSWORD}@yanir-toar.0tfcqu7.mongodb.net/hublog?retryWrites=true&w=majority"

# Set up a connection to the MongoDB database
client = pymongo.MongoClient(MONGO_URI)
db = client['hublog']
collection = db['photos']

# Send an HTTP request to the URL and retrieve the HTML content
#response = requests.get('https://www.pbs.org/wnet/nature/funkiest-monkeys-funkiest-monkeys-photos/12446/')
response = requests.get('https://www.pbs.org/wnet/nature/group/mammals/') 

html = response.content

# Parse the HTML content with BeautifulSoup
soup = BeautifulSoup(html, 'html.parser')

# Find all the image tags
image_tags = soup.find_all('img')

nowdatetime = datetime.today().replace(microsecond=0)
tags = ['website', 'animal']


# Iterate over the image tags and extract the URL of each image
for image_tag in image_tags:
 #   print(image_tag)
    image_url = image_tag['src']
    # Insert the image URL into the MongoDB collection
    print(image_url)
    collection.insert_one({'author': ObjectId(ADMIN_ID), 'date': nowdatetime, 'caption': "From Website", 'tags': tags, 'url': image_url})

# Close the connection to the database
client.close()