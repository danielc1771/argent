import datetime
import requests
import pymongo
from bs4 import BeautifulSoup

uri = 'mongodb://admin:troy1234@ds151007.mlab.com:51007/argent'
client = pymongo.MongoClient(uri)
db = client['argent']


def get_price(s, item):
    print(item['url'])
    s.headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip',
        'DNT': '1',  # Do Not Track Request Header
        'Connection': 'close'
    }
    response = s.get(item['url'])
    soup = BeautifulSoup(response.text, 'lxml')
    try:
        price = soup.find(id='priceblock_ourprice').text[1:]
        name = soup.find(id='productTitle').text
        return {'category': item['category'], 'item': name.strip(), 'price': price, 'timestamp': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
    except Exception:
        return {'category': item['category'], 'item': 'error', 'price': 'error', 'timestamp': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}


prices = []
s = requests.Session()
items = db.items.find()
with requests.Session() as s:
    for item in items:
        prices.append(get_price(s, item))

db.prices.insert_many(prices)

print('Inserted ', len(prices), ' items...')
