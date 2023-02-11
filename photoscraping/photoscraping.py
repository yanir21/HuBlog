import requests
from bs4 import BeautifulSoup
from datetime import datetime
import pymongo
from bson.objectid import ObjectId
from dotenv.main import load_dotenv
import os

ADMIN_ID = 'GsVWsdtACjeLGEITCFEQof3D9Kw1'
load_dotenv()
MONGO_USERNAME=os.environ['MONGO_USERNAME']
MONGO_PASSWORD=os.environ['MONGO_PASSWORD']

MONGO_URI = f"mongodb+srv://{MONGO_USERNAME}:{MONGO_PASSWORD}@yanir-toar.0tfcqu7.mongodb.net/hublog?retryWrites=true&w=majority"

client = pymongo.MongoClient(MONGO_URI)
db = client['hublog']
collection = db['photos']

response = requests.get('https://www.pbs.org/wnet/nature/group/mammals/') 

html = response.content

soup = BeautifulSoup(html, 'html.parser')

image_tags = soup.find_all('img')

nowdatetime = datetime.utcnow().replace(microsecond=0)
tags = ['website', 'animal']


for image_tag in image_tags:
    image_url = image_tag['src']
    print(image_url)
    if(image_url!='https://www.facebook.com/tr?id=262767591103921&ev=PageView&noscript=1' and image_url!='https://www.pbs.org/wnet/nature/wp-content/themes/nature-2014/libs/images/logo.png'):
        collection.insert_one({'author': ADMIN_ID, 'date': nowdatetime, 'caption': "From Website", 'tags': tags, 'imageUrl': image_url})

client.close()
