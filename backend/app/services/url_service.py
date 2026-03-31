import joblib
import re
from urllib.parse import urlparse
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[3]

model = joblib.load(BASE_DIR / "ml/url/url_model.pkl")

def extract_features(url):
    url = str(url).lower()

    if not url.startswith("http"):
        url = "http://" + url

    parsed = urlparse(url)
    domain = parsed.netloc

    keywords = ["login", "verify", "bank", "secure", "update", "account", "signin"]
    keyword_count = sum(1 for word in keywords if word in url)

    suspicious_tlds = ["tk", "ml", "ga", "cf"]
    tld_flag = 1 if any(domain.endswith(tld) for tld in suspicious_tlds) else 0

    brands = ["google", "paypal", "amazon", "apple", "bank"]
    brand_flag = 1 if any(b in url for b in brands) else 0

    features = [[
        len(url),
        url.count('.'),
        sum(c.isdigit() for c in url),
        1 if parsed.scheme == "https" else 0,
        keyword_count * 3,
        url.count('-'),
        url.count('/'),
        1 if '@' in url else 0,
        len(domain),
        domain.count('.'),
        tld_flag,
        brand_flag
    ]]

    return features, keyword_count


def detect_url(url: str):
    features, keyword_count = extract_features(url)

    print("DEBUG FEATURES:", features, "KEYWORDS:", keyword_count)

    # 🔥 RULE-BASED OVERRIDE
    if keyword_count >= 2:
        return {
            "type": "url",
            "prediction": 1,
            "confidence": 0.9,
            "reason": "Multiple suspicious keywords detected"
        }

    pred = model.predict(features)[0]
    prob = model.predict_proba(features)[0]

    return {
        "type": "url",
        "prediction": int(pred),
        "confidence": float(max(prob))
    }