import joblib
import json
from feature_extractor import extract, to_vector, FEATURES
import pandas as pd

clf = joblib.load("F:/PhishGuard/artifacts/model.pkl")

with open("F:/PhishGuard/artifacts/feature_importance.json") as f:
    importance = json.load(f)

THRESHOLDS = {"safe": 30, "suspicious": 70}

print(clf.feature_names_in_)

def predict(url: str) -> dict:
    features = extract(url)

    vector = pd.DataFrame(
    [[features[f] for f in clf.feature_names_in_]],
    columns=clf.feature_names_in_
    )

    proba = clf.predict_proba(vector)[0]
    phish_prob = round(proba[1] * 100)

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
    if not features["has_https"]:
        reasons.append("uses HTTP instead of HTTPS")
    if features["domain_age_days"] < 30:
        reasons.append(f"domain is only {features['domain_age_days']} days old")
    if features["subdomain_count"] > 2:
        reasons.append(f"has {features['subdomain_count']} subdomains")
    if features["url_length"] > 75:
        reasons.append("URL is unusually long")
    if features["has_at_symbol"]:
        reasons.append("contains @ symbol")
    if features["has_ip_in_url"]:
        reasons.append("uses IP address instead of domain name")
    if features["hyphen_count"] > 2:
        reasons.append(f"domain has {features['hyphen_count']} hyphens")

    if not reasons:
        return "Multiple weak phishing signals detected."

    return "Flagged because: " + ", ".join(reasons) + "."









