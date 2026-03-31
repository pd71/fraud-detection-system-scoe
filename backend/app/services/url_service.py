import joblib
import re
import math
from pathlib import Path
from urllib.parse import urlparse
from collections import Counter

BASE_DIR = Path(__file__).resolve().parents[3]

model         = joblib.load(BASE_DIR / "ml/url/url_model.pkl")
feature_names = joblib.load(BASE_DIR / "ml/url/url_feature_names.pkl")

TRUSTED_DOMAINS = {
    # Global trusted domains
    "google.com", "youtube.com", "gmail.com", "googleapis.com",
    "microsoft.com", "office.com", "live.com", "outlook.com", "bing.com",
    "apple.com", "icloud.com",
    "amazon.com", "aws.amazon.com",
    "facebook.com", "instagram.com", "whatsapp.com",
    "twitter.com", "x.com",
    "linkedin.com",
    "github.com", "gitlab.com",
    "wikipedia.org",
    "stackoverflow.com",
    "reddit.com",
    "netflix.com",
    "paypal.com",
    "ebay.com",
    "yahoo.com",
    "cloudflare.com",
    "mozilla.org",

    # Indian trusted domains
    # Banks & Financial Services
    "hdfcbank.com", "icicibank.com", "axisbank.com", "sbi.co.in", "idfcfirstbank.com", "kotak.com",
    "paytm.com", "phonepe.com", "mobikwik.com", "razorpay.com", "federalbank.co.in", "yesbank.in",

    # E-commerce & Retail
    "flipkart.com", "snapdeal.com", "myntra.com", "ajio.com", "bigbasket.com", "shopclues.com",

    # IT & Tech
    "tcs.com", "infosys.com", "wipro.com", "techmahindra.com", "hcltech.com", "larsentoubro.com",

    # Government & Public Portals
    "gov.in", "incometaxindiaefiling.gov.in", "epfindia.gov.in", "uidai.gov.in", "passportindia.gov.in",

    # Media & Services
    "airtel.in", "jio.com", "bsnl.co.in", "ndtv.com", "timesofindia.indiatimes.com",
}

BRANDS = [
    "paypal", "google", "apple", "microsoft",
    "amazon", "facebook", "netflix", "ebay",
    "paytm", "flipkart", "phonepe", "mobikwik",
]

def get_entropy(text):
    if not text:
        return 0
    freq = Counter(text)
    length = len(text)
    return -sum((count / length) * math.log2(count / length) for count in freq.values())

def get_root_domain(domain):
    parts = domain.split(".")
    if len(parts) >= 2:
        return ".".join(parts[-2:])
    return domain

def extract_features(url: str):
    url = str(url)

    try:
        parsed = urlparse(url if url.startswith("http") else "http://" + url)
        domain = parsed.netloc.lower()
        path   = parsed.path
        params = parsed.query
    except Exception:
        domain, path, params = "", "", ""

    domain_clean = re.sub(r"^www\.", "", domain)
    root_domain  = get_root_domain(domain_clean)

    features = {
        "url_length":           len(url),
        "domain_length":        len(domain_clean),
        "path_length":          len(path),
        "query_length":         len(params),
        "num_dots":             url.count("."),
        "num_subdomains":       max(len(domain_clean.split(".")) - 2, 0),
        "num_hyphens":          url.count("-"),
        "num_underscores":      url.count("_"),
        "num_slashes":          url.count("/"),
        "num_at":               url.count("@"),
        "num_ampersand":        url.count("&"),
        "num_equals":           url.count("="),
        "num_percent":          url.count("%"),
        "num_question":         url.count("?"),
        "num_hash":             url.count("#"),
        "num_digits":           sum(c.isdigit() for c in url),
        "has_ip":               int(bool(re.search(r"\d{1,3}(\.\d{1,3}){3}", domain))),
        "has_https":            int(url.startswith("https")),
        "has_http_not_s":       int(url.startswith("http://")),
        "is_shortened":         int(bool(re.search(
                                    r"bit\.ly|goo\.gl|tinyurl|ow\.ly|t\.co|buff\.ly|short\.io",
                                    url))),
        "has_suspicious_words": int(bool(re.search(
                                    r"login|signin|verify|update|secure|account|banking|"
                                    r"confirm|password|webscr|cmd=|ebayisapi",
                                    url.lower()))),
        "double_slash_in_path": int("//" in path),
        "has_port":             int(bool(re.search(r":\d{2,5}", domain))),
        "tld_in_path":          int(bool(re.search(r"\.(php|html|htm|aspx|jsp)", path))),
        "is_trusted_domain":    int(root_domain in TRUSTED_DOMAINS),
        "brand_in_subdomain":   int(
                                    any(brand in domain_clean.replace(root_domain, "")
                                        for brand in BRANDS)
                                ),
        "url_entropy":          get_entropy(url),
        "domain_entropy":       get_entropy(domain_clean),
        "digit_ratio":          sum(c.isdigit() for c in url) / max(len(url), 1),
        "letter_ratio":         sum(c.isalpha() for c in url) / max(len(url), 1),
    }

    return [features[f] for f in feature_names]

def detect_url(url: str):
    features = extract_features(url)
    pred = model.predict([features])[0]
    prob = model.predict_proba([features])[0]

    confidence = float(max(prob))

    # If model says safe but isn't confident, treat as malicious
    if int(pred) == 0 and confidence < 0.60:
        pred = 1

    return {
        "type": "url",
        "prediction": int(pred),
        "confidence": confidence
    }