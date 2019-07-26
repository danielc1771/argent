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

categories = db.categories.find()
count = 0
for category in categories:
    urls = []
    category_name = category['category']
    category_url = category['url']
    request = requests.get(category_url, headers=headers)
    soup = BeautifulSoup(request.content, 'html.parser')
    tags = soup.find_all('a', 'a-link-normal')
    for tag in tags:
        if (tag['href'].split('/')[1] != 'product-reviews') & (tag['href'].split('/')[1] != '') & (tag['href'] not in urls):
            urls.append(tag['href'])
    for i in range(len(urls)):
        urls[i] = {'category': category_name,
                   'url': 'https://www.amazon.com' + urls[i]}
    for item in urls:
        db.items.insert_one({
            'category': item['category'],
            'url': item['url'],
            'timestamp': datetime.datetime.now()
        })
        count += 1
print('Inserted ', count, ' items...')
