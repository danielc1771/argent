import datetime
import requests
import pymongo
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from multiprocessing.pool import ThreadPool, Pool
import threading


uri = 'mongodb://admin:troy1234@ds151007.mlab.com:51007/argent'
client = pymongo.MongoClient(uri)
db = client['argent']
items = list(db.items.find())
prices = []


option = webdriver.ChromeOptions()
option.add_argument("-incognito")
driver = webdriver.Chrome(
    executable_path='/Library/Application Support/Google/chromedriver', chrome_options=option)


def get_price(item):
    url = item['url']

    driver.get(url)
    # return error if timeout or element does not exist
    timeout = 6
    try:
        WebDriverWait(driver, timeout).until(EC.visibility_of_element_located(
            (By.XPATH, "//img[@id='landingImage']")))
        # get selenium objects for name and price

        name_element = driver.find_elements_by_xpath(
            "//span[@id='productTitle']"
        )

        price_element = driver.find_elements_by_xpath(
            "//span[@id='priceblock_ourprice']"
        )

        if price_element is None:
            price_element = driver.find_elements_by_xpath(
                "//span[@class='a-size-base a-color-secondary']"
            )

        # get text value from selenium object
        price = price_element[0].text[1:]
        name = name_element[0].text

        print(url, 'inserted')
        return({'category': item['category'], 'item': name.strip(
        ), 'price': price, 'timestamp': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")})

    except:
        print(url, 'error')
        return({'category': item['category'], 'item': 'error', 'price': 'error',
                'timestamp': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")})


start = datetime.datetime.now()
for item in items:
    prices.append(get_price(item))

db.prices.insert_many(prices)
end = datetime.datetime.now()

print(f'Mining completed in: {end - start}')
