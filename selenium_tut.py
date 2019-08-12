from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

option = webdriver.ChromeOptions()
option.add_argument(' — incognito')

browser = webdriver.Chrome(
    executable_path='/Library/Application Support/Google/chromedriver', chrome_options=option)

browser.get("https://www.amazon.com/MOSISO-MacBook-Keyboard-Protector-Compatible/dp/B07KG95L9H/ref=sr_1_6?crid=1Y7CXPWDRB5NP&keywords=macbook+air+2019+case&qid=1564947171&s=gateway&sprefix=macbook%2Caps%2C160&sr=8-6")

# Wait 10 seconds for page to load
timeout = 10
try:
    WebDriverWait(browser, timeout).until(EC.visibility_of_element_located(
        (By.XPATH, "//img[@id='landingImage']")))

except TimeoutException:
    print('Timed out waiting for page to load')
    browser.quit()

# find_elements_by_xpath returns an array of selenium objects.

titles_element = browser.find_elements_by_xpath(
    "//span[@id='productTitle']")

# use list comprehension to get the actual repo titles and not the selenium objects.
titles = [x.text for x in titles_element]
# print out all the titles.
print('titles:')
print(titles, '\n')


price_element = browser.find_elements_by_xpath(
    "//span[@id='priceblock_ourprice']")
# same concept as for list-comprehension above.
prices = [x.text for x in price_element]
print('prices:')
print(prices, '\n')


for title, price in zip(titles, prices):
    print('Item: Price')
    print(title + ": " + price, '\n')
