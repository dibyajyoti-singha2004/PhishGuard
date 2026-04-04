from predict import predict
from feature_extractor import _get_domain_age_days
from urllib.parse import urlparse

urls = [
    "www.facebook.com",
    "github.com/login",
    "www.dghjdgf.com/paypal.co.uk/cycgi-bin/webscrcmd=_home-customer&nav=1/loading.php", 
    "http://google.security-update.ml",
    "https://amazon.in/ap/signin",
    "http://randomsite.com/paypal/login",
    "http://goo.gl/secure-update",
    "http://example.com/a/b/c/d/e/f/login/paypal/update",
    "http://google.com.verify-user.tk",
    "www.aclaydance.com/ncpf.php"
    "https://login.security.verify.instagram.account-warning.example.com"
]

for url in urls:
    if not url.startswith(("http://", "https://")):
        url = "http://" + url

    result = predict(url)

    domain = urlparse(url).netloc
    if domain.startswith("www."):
        domain = domain[4:]

    domain_age = _get_domain_age_days(domain)

    age_str = f"{domain_age} days" if domain_age != -1 else "UNKNOWN"

    print(f"{result['label'].upper():10} {result['score']:>3}  Age: {age_str:>10} -> {url}")