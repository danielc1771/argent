import datetime
import requests
import pymongo
from bs4 import BeautifulSoup

uri = 'mongodb://admin:troy1234@ds151007.mlab.com:51007/argent'
client = pymongo.MongoClient(uri)
db = client['argent']

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0'}

items = [
    {
        'name': 'MSI GTX 1080',
        'url': 'https://www.amazon.com/MSI-GTX-1080-GAMING-8G/dp/B01HHBQBLG/ref=sr_1_8?keywords=gtx+1080&qid=1562900205&s=gateway&sr=8-8'
    },
    {
        'name': 'Corsair 16GB(2x8GB) DDR4 RAM',
        'url': 'https://www.amazon.com/Corsair-Vengeance-3000MHz-Desktop-Memory/dp/B0134EW7G8/ref=sr_1_3?keywords=ram&qid=1562900822&s=gateway&sr=8-3'
    }
]

prices = []

for item in items:
    request = requests.get(item['url'], headers)
    soup = BeautifulSoup(request.content, 'html.parser')
    price = soup.find(id='priceblock_ourprice').text[1:]
    prices.append({'name': item['name'], 'price': price,
                   'timestamp': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")})

for item in prices:
    db.items.insert_one({
        'item': item['name'],
        'price': item['price'],
        'timestamp': item['timestamp']
    })
