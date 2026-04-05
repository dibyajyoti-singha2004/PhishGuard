import joblib
import json
from .feature_extractor import extract, FEATURES
import pandas as pd
from urllib.parse import urlparse
import tldextract

BRAND_KEYWORDS = {
    "paypal", "amazon", "google", "facebook",
    "bank", "apple", "microsoft"
}

clf = joblib.load("artifacts/model.pkl")

with open("artifacts/feature_importance.json") as f:
    importance = json.load(f)

THRESHOLDS = {"safe": 20, "suspicious": 45}


def predict(url: str) -> dict:

    if not url.startswith(("http://", "https://")):
        url = "http://" + url

    features = extract(url)

    vector = pd.DataFrame(
        [[features[f] for f in clf.feature_names_in_]],
        columns=clf.feature_names_in_
    )

    proba = clf.predict_proba(vector)[0]
    phish_prob = round(proba[1] * 100)

    parsed = urlparse(url)
    extracted = tldextract.extract(url)

    domain_name = extracted.domain.lower()
    path = parsed.path.lower()

    suspicious_keyword = any(
        brand in path and brand not in domain_name
        for brand in BRAND_KEYWORDS
    )

    if suspicious_keyword:
        return {
            "label": "phishing",
            "score": max(phish_prob, 75),
            "confidence": 75,
            "features": features,
            "explanation": "Brand name found in URL path but not in domain."
        }

    if features["domain_age_days"] == 0:
        return {
            "label": "phishing",
            "score": max(phish_prob, 70),
            "confidence": 70,
            "features": features,
            "explanation": "Domain age is unknown or unavailable."
        }

    if features["has_ip_in_url"] == -1:
        return {
            "label": "phishing",
            "score": max(phish_prob, 85),
            "confidence": 85,
            "features": features,
            "explanation": "URL uses IP address instead of domain."
        }

    if phish_prob < THRESHOLDS["safe"]:
        label = "safe"
    elif phish_prob < THRESHOLDS["suspicious"]:
        label = "suspicious"
    else:
        label = "phishing"

    return {
        "label": label,
        "score": phish_prob,
        "confidence": phish_prob if label == "phishing" else 100 - phish_prob,
        "features": features,
        "explanation": build_explanation(features, label),
    }


def build_explanation(features: dict, label: str) -> str:
    if label == "safe":
        return "No significant phishing signals detected."

    reasons = []

    if features["has_https"] == -1:
        reasons.append("uses HTTP instead of HTTPS")

    if features["domain_age_days"] == -1:
        reasons.append("domain was registered recently")

    if features["subdomain_count"] == -1:
        reasons.append("has multiple subdomains")

    if features["url_length"] == -1:
        reasons.append("URL is unusually long")

    if features["has_at_symbol"] == -1:
        reasons.append("contains @ symbol")

    if features["has_ip_in_url"] == -1:
        reasons.append("uses IP address instead of domain name")

    if features["hyphen_count"] == -1:
        reasons.append("domain contains hyphens")

    if features["suspicious_tld"] == -1:
        reasons.append("uses a suspicious top-level domain")

    if features["domain_has_keywords"] == -1:
        reasons.append("domain contains phishing-related keywords")

    if not reasons:
        return "Multiple weak phishing signals detected."

    return "Flagged because: " + ", ".join(reasons) + "."