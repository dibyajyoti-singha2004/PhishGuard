import re
import tldextract
import whois
import socket
from datetime import datetime
from urllib.parse import urlparse
import os 
import sys
import concurrent.futures

_whois_cache = {}

FEATURES = [
    "has_ip_in_url",
    "url_length",
    "subdomain_count",
    "has_https",
    "has_at_symbol",
    "hyphen_count",
    "domain_age_days",
    "suspicious_tld",
    "domain_has_keywords",
]

SUSPICIOUS_TLDS = {
    "xyz", "tk", "ml", "ga", "cf", "gq", "top", "club",
    "online", "site", "net", "info", "biz"
}

PHISHING_KEYWORDS = {
    "secure", "login", "verify", "update", "bank", "account",
    "free", "gift", "claim", "signin", "paypal", "amazon",
    "apple", "microsoft", "support", "confirm", "password"
}

def extract(url: str) -> dict:
    parsed    = urlparse(url)
    extracted = tldextract.extract(url)
    full_domain = f"{extracted.subdomain}.{extracted.domain}.{extracted.suffix}".lower()

    has_ip = bool(re.match(r"(\d{1,3}\.){3}\d{1,3}", parsed.netloc))
    has_ip_in_url = -1 if has_ip else 1

    length = len(url)
    if length < 54:
        url_length = 1
    elif length <= 75:
        url_length = 0
    else:
        url_length = -1

    count = len(extracted.subdomain.split(".")) if extracted.subdomain else 0
    if count == 0:
        subdomain_count = 1
    elif count == 1:
        subdomain_count = 0
    else:
        subdomain_count = -1

    has_https = 1 if parsed.scheme == "https" else -1
    has_at_symbol = -1 if "@" in url else 1
    hyphen_count = -1 if "-" in parsed.netloc else 1

    age = _get_domain_age_days(extracted.registered_domain)
    domain_age_days = 1 if age > 365 else -1

    # NEW: suspicious TLD
    tld = extracted.suffix.lower()
    suspicious_tld = -1 if tld in SUSPICIOUS_TLDS else 1

    # NEW: phishing keywords in domain
    domain_words = re.split(r"[-.]", full_domain)
    has_keyword = any(w in PHISHING_KEYWORDS for w in domain_words)
    domain_has_keywords = -1 if has_keyword else 1

    return {
        "has_ip_in_url":       has_ip_in_url,
        "url_length":          url_length,
        "subdomain_count":     subdomain_count,
        "has_https":           has_https,
        "has_at_symbol":       has_at_symbol,
        "hyphen_count":        hyphen_count,
        "domain_age_days":     domain_age_days,
        "suspicious_tld":      suspicious_tld,
        "domain_has_keywords": domain_has_keywords,
    }

def _get_domain_age_days(domain: str) -> int:
    #global _whois_cache
    if not domain:
        return 0

    if domain in _whois_cache:
        return _whois_cache[domain]

    def _lookup():
        socket.setdefaulttimeout(3)
        devnull = open(os.devnull, 'w')
        old_stderr = sys.stderr
        sys.stderr = devnull
        try:
            w = whois.whois(domain)
        finally:
            sys.stderr = old_stderr
            devnull.close()
        creation = w.creation_date
        if isinstance(creation, list):
            creation = creation[0]
        if creation:
            return (datetime.now() - creation).days
        return 0

    try:
        with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
            future = executor.submit(_lookup)
            result = future.result(timeout=3)
    except Exception:
        result = 0

    _whois_cache[domain] = result
    return result

def to_vector(features: dict) -> list:
    return [features[f] for f in FEATURES]