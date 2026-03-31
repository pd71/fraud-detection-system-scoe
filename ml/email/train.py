import pandas as pd
import re
import joblib
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

BASE_DIR = Path(__file__).resolve().parent.parent.parent

DATA_PATH = BASE_DIR / "data/email/email_dataset.csv"
print("Loading dataset from:", DATA_PATH)

df = pd.read_csv(DATA_PATH)
print("Columns:", df.columns.tolist())
print("Shape:", df.shape)

# Dataset uses: "text", "target" (0=ham, 1=spam)
df = df[["text", "target"]].copy()
df.columns = ["text", "label"]
df = df.dropna()
df["label"] = df["label"].astype(int)

print("Label distribution:\n", df["label"].value_counts())

# --- CLEANING ---
def clean_text(text):
    text = str(text).lower()
    # strip email headers (From, Return-Path, Received, etc.)
    text = re.sub(r"^(from|return-path|received|delivered-to|message-id|date|subject|mime-version|content-type|x-[\w-]+):.*$",
                  "", text, flags=re.MULTILINE)
    text = text.replace("\r", " ").replace("\n", " ")
    # preserve currency signals
    text = text.replace("£", " pounds ").replace("$", " dollars ").replace("€", " euros ")
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

df["text"] = df["text"].apply(clean_text)
print("\nSample cleaned ham:\n", df[df["label"]==0]["text"].iloc[0][:200])
print("\nSample cleaned spam:\n", df[df["label"]==1]["text"].iloc[0][:200])

# --- TF-IDF ---
vectorizer = TfidfVectorizer(
    stop_words="english",
    max_features=10000,
    ngram_range=(1, 2),
    max_df=0.95,
    min_df=2,
    sublinear_tf=True       # dampens very frequent terms, reduces false positives
)

X = vectorizer.fit_transform(df["text"])
y = df["label"]

# --- SPLIT ---
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    stratify=y,
    random_state=42
)

# --- MODEL ---
model = LogisticRegression(
    max_iter=1000,
    class_weight="balanced",
    C=5.0,
    solver="lbfgs",
    random_state=42
)

model.fit(X_train, y_train)

# --- SANITY CHECK ---
print("\nModel classes:", model.classes_)
feature_names = vectorizer.get_feature_names_out()
spam_coef = model.coef_[0]
top_spam_words = [feature_names[i] for i in spam_coef.argsort()[-15:][::-1]]
top_ham_words  = [feature_names[i] for i in spam_coef.argsort()[:15]]
print("Top spam indicators:", top_spam_words)
print("Top ham  indicators:", top_ham_words)

# --- EVAL ---
y_pred = model.predict(X_test)
print("\nAccuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# --- SAVE ---
MODEL_PATH = BASE_DIR / "ml/email/email_model.pkl"
VECTORIZER_PATH = BASE_DIR / "ml/email/email_vectorizer.pkl"

MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)

joblib.dump(model, MODEL_PATH)
joblib.dump(vectorizer, VECTORIZER_PATH)

print("\nSaved:")
print("Model      ->", MODEL_PATH)
print("Vectorizer ->", VECTORIZER_PATH)