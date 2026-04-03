import re
import tldextract
import whois
import socket
from datetime import datetime
from urllib.parse import urlparse

FEATURES = [
    "has_ip_in_url",
    "url_length",
    "subdomain_count",
    "has_https",
    "has_at_symbol",
    "hyphen_count",
    "domain_age_days",
]

def extract(url: str) -> dict:
    parsed    = urlparse(url)
    extracted = tldextract.extract(url)

    # --- encode each feature to match UCI scale (-1, 0, 1) ---

    # has_ip_in_url: -1 = has IP, 1 = no IP
    has_ip = bool(re.match(r"(\d{1,3}\.){3}\d{1,3}", parsed.netloc))
    has_ip_in_url = -1 if has_ip else 1

    # url_length: 1 = short (<54), 0 = medium, -1 = long (>75)
    length = len(url)
    if length < 54:
        url_length = 1
    elif length <= 75:
        url_length = 0
    else:
        url_length = -1

    # subdomain_count: 1 = none, 0 = one, -1 = multiple
    count = len(extracted.subdomain.split(".")) if extracted.subdomain else 0
    if count == 0:
        subdomain_count = 1
    elif count == 1:
        subdomain_count = 0
    else:
        subdomain_count = -1

    # has_https: 1 = https, -1 = http
    has_https = 1 if parsed.scheme == "https" else -1

    # has_at_symbol: -1 = has @, 1 = no @
    has_at_symbol = -1 if "@" in url else 1

    # hyphen_count (Prefix_Suffix): -1 = has hyphen in domain, 1 = no hyphen
    hyphen_count = -1 if "-" in parsed.netloc else 1

    # domain_age_days: 1 = old (>365 days), -1 = new (<365 days)
    age = _get_domain_age_days(extracted.registered_domain)
    domain_age_days = 1 if age > 365 else -1

    return {
        "has_ip_in_url":   has_ip_in_url,
        "url_length":      url_length,
        "subdomain_count": subdomain_count,
        "has_https":       has_https,
        "has_at_symbol":   has_at_symbol,
        "hyphen_count":    hyphen_count,
        "domain_age_days": domain_age_days,
    }

def _get_domain_age_days(domain: str) -> int:
    """Returns raw domain age in days for encoding. 0 on failure = treat as new."""
    try:
        socket.setdefaulttimeout(3)
        w = whois.whois(domain)
        creation = w.creation_date
        if isinstance(creation, list):
            creation = creation[0]
        if creation:
            return (datetime.now() - creation).days
    except Exception:
        pass
    return 0

def to_vector(features: dict) -> list:
    return [features[f] for f in FEATURES]