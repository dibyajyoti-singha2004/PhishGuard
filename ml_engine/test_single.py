from predict import predict

urls = [
    "http://paypa1-secure.login.verify-account.com/update",
    "https://github.com/login",
    "http://free-gift-claim.xyz/redeem?id=8821",
    "https://mail.google.com",
    "http://verify-bank-login.net/secure/update",
    "https://amazon.com",
    "http://signin-amazon-account.tk/login",
    "http://192.168.1.1/admin",
    "https://stackoverflow.com",
    "http://update-your-paypal.gq/confirm",
]

for url in urls:
    result = predict(url)
    print(f"{result['label'].upper():10} {result['score']:>3}  {url}")