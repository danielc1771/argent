import datetime
import requests
import pymongo
from bs4 import BeautifulSoup

uri = 'mongodb://admin:troy1234@ds151007.mlab.com:51007/argent'
client = pymongo.MongoClient(uri)
db = client['argent']
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:68.0) Gecko/20100101 Firefox/68.0'
}
categories = []
categories_url = 'https://www.amazon.com/Best-Sellers/zgbs/ref=zg_bs_unv_la_0_la_1'
request = requests.get(categories_url, headers=headers)
soup = BeautifulSoup(request.content, 'html.parser')
categories_list = soup.find('ul', id='zg_browseRoot')
for li in categories_list.findAll('li'):
    tag = li.find('a')
    if tag != None:
        categories.append({'category': tag.text, 'url': tag['href']})

for category in categories:
    # db.categories.insert_one({
    #     'category': category['category'],
    #     'url': category['url'],
    #     'timestamp': datetime.datetime.now()
    # })
    print(categories)
print('Inserted ', len(categories), ' items...')
