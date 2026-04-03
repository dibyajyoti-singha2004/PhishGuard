
from predict import predict

urls = [
    "http://paypa1-secure.login.verify-account.com/update",
    "https://github.com/login",
    "http://free-gift-claim.xyz/redeem?id=8821",              
    "https://mail.google.com",                                
    "http://verify-bank-login.net/secure/update",
]

for url in urls:
    result = predict(url)
    print(f"{result['label'].upper():10} {result['score']:>3}  {url}")

