import pandas as pd
import re
import joblib
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# Base directory (points to backend/)
BASE_DIR = Path(__file__).resolve().parent.parent

# Load dataset
df = pd.read_csv(BASE_DIR / "data/sms/spam.csv", encoding="latin-1")[["v1", "v2"]]
df.columns = ["label", "message"]

# Convert labels
df["label"] = df["label"].map({"ham": 0, "spam": 1})

# Text cleaning
def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-z\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

df["message"] = df["message"].apply(clean_text)

# TF-IDF vectorizer (improved)
vectorizer = TfidfVectorizer(
    stop_words="english",
    ngram_range=(1, 2),
    max_df=0.9,
    min_df=2
)

X = vectorizer.fit_transform(df["message"])
y = df["label"]

# Train-test split (IMPORTANT: stratify)
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    stratify=y,
    random_state=42
)

# Model (IMPORTANT: class_weight)
model = LogisticRegression(
    max_iter=1000,
    random_state=42,
    class_weight="balanced"
)

model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Metrics
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# Save model + vectorizer
model_path = BASE_DIR / "ml/sms_model.pkl"
vectorizer_path = BASE_DIR / "ml/sms_vectorizer.pkl"

joblib.dump(model, model_path)
joblib.dump(vectorizer, vectorizer_path)

print("\nSaved:")
print(f"Model -> {model_path}")
print(f"Vectorizer -> {vectorizer_path}")