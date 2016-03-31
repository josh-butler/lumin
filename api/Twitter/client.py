import os
import tweepy

CONSUMER_KEY = os.getenv('CONSUMER_KEY')
CONSUMER_SECRET = os.getenv('CONSUMER_SECRET')
ACCESS_TOKEN_KEY = os.getenv('ACCESS_TOKEN_KEY')
ACCESS_TOKEN_SECRET = os.getenv('ACCESS_TOKEN_SECRET')

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET)

api = tweepy.API(auth)


query = 'boots'
per_page = 5
n_pages = 1

page_cursor = tweepy.Cursor(api.search_users, q=query, per_page=per_page).pages(n_pages)
page_cursor.next()  # skip first page which is always a duplicate

for page in page_cursor:
    print(page)
