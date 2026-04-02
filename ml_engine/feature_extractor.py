import re
import tldextract
import whois
from datetime import datetime
from urllib.parse import urlparse

FEATURES = [
    "has_https",
    "url_length",
    "subdomain_count",
    "has_at_symbol",
    "hyphen_count",
    "has_ip_in_url",
    "domain_age_days",
]

def extract(url: str) -> dict:
    parsed   = urlparse(url)
    extracted = tldextract.extract(url)

    has_https       = 1 if parsed.scheme == "https" else 0
    url_length      = len(url)
    subdomain_count = len(extracted.subdomain.split(".")) if extracted.subdomain else 0
    has_at_symbol   = 1 if "@" in url else 0
    hyphen_count    = parsed.netloc.count("-")
    has_ip_in_url   = 1 if re.match(r"(\d{1,3}\.){3}\d{1,3}", parsed.netloc) else 0

    domain_age_days = get_domain_age(extracted.registered_domain)

    return {
        "has_https":       has_https,
        "url_length":      url_length,
        "subdomain_count": subdomain_count,
        "has_at_symbol":   has_at_symbol,
        "hyphen_count":    hyphen_count,
        "has_ip_in_url":   has_ip_in_url,
        "domain_age_days": domain_age_days,
    }

def get_domain_age(domain: str) -> int:
    """Returns domain age in days. Returns 0 on failure (treat as brand new)."""
    try:
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
    """Converts feature dict to ordered list for model input."""
    return [features[f] for f in FEATURES]