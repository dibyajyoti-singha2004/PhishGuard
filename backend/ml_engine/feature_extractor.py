import re
import tldextract
import whois
import socket
from datetime import datetime
from urllib.parse import urlparse
import os 
import sys
import concurrent.futures
from datetime import timezone

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

    # ==============================
    # BASIC FEATURES
    # ==============================

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

    # ==============================
    # DOMAIN AGE
    # ==============================

    age = _get_domain_age_days(extracted.registered_domain)

    if age == -1:
        domain_age_days = 0   # unknown
    elif age > 365:
        domain_age_days = 1   # legit
    else:
        domain_age_days = -1  # new = suspicious

    # ==============================
    # KEYWORD DETECTION (FIXED)
    # ==============================

    # Domain keyword check (keep full list)
    domain_words = re.split(r"[-.]", full_domain)
    domain_keyword_flag = any(w in PHISHING_KEYWORDS for w in domain_words)

    # Path keyword check (IGNORE GENERIC WORDS)
    GENERIC_WORDS = {"login", "secure", "update", "verify", "signin"}

    path = parsed.path.lower()
    path_words = re.split(r"[\/\-_\.]", path)

    path_keyword_flag = any(
        word in PHISHING_KEYWORDS and word not in GENERIC_WORDS
        for word in path_words
    )

    # Combine
    domain_has_keywords = -1 if (domain_keyword_flag or path_keyword_flag) else 1

    # ==============================
    # TLD CHECK
    # ==============================

    tld = extracted.suffix.lower()
    suspicious_tld = -1 if tld in SUSPICIOUS_TLDS else 1

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
    if not domain:
        return 0

    if domain in _whois_cache:
        return _whois_cache[domain]

    def _lookup():
        socket.setdefaulttimeout(8)  # increased socket timeout
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
            now = datetime.now(timezone.utc)          # make now timezone-aware
            creation = creation.replace(tzinfo=creation.tzinfo or timezone.utc)  # ensure creation is aware too
            return (now - creation).days
        return -1  

    try:
        with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
            future = executor.submit(_lookup)
            result = future.result(timeout=8)  
    except Exception as e:
        pass
        result = -1  

    _whois_cache[domain] = result
    return result

def to_vector(features: dict) -> list:
    return [features[f] for f in FEATURES]
