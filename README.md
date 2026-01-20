# 🥗 Medi-AI – Intelligent Nutrition & Food Safety Platform

Medi-AI is a full-stack AI-powered nutrition analysis platform that allows users to scan food items, analyze nutritional values, assess medical safety risks, log meals, track daily nutrition, hydration, and visualize trends — all personalized per user.

---

## 🚀 Features

### 🔐 Authentication
- User registration & login (JWT-based)
- Secure protected routes

### 🍽️ Food Scan & AI Analysis
- AI-powered food nutrition analysis
- Calories, macros (protein, carbs, fat)
- Medical benefits & risks
- Disease compatibility scoring
- Doctor-style recommendations

### 🧠 Safety Analysis
- Condition-based food risk analysis
- Compatibility score (0–100)
- Clear SAFE / MODERATE / AVOID flags

### 📊 Daily Nutrition Tracker
- Meal logging (Breakfast, Lunch, Dinner, Snack)
- Calories & macro aggregation
- Timeline of meals
- Daily trend chart (calories & protein)

### 💧 Water Intake Tracking
- Daily hydration goal (2000 ml)
- Quick add (+250 ml)
- Auto-reset every day

### 📈 Trends
- Visual charts for nutrition patterns

---

## 🧩 Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- React Router
- Context API
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

### Models
Good — now we’re at the **actual ML architecture** of your project.
I’ll give this **cleanly, academically, and practically**, so you can use it for **implementation + report + viva**.

---

# ✅ OVERALL SYSTEM – MODELS YOU NEED

Your project is **NOT one model**.
It’s a **pipeline of specialized models + rule engines**.

You will build **6 core ML/AI components** 👇

---

## 🔷 1. FOOD RECOGNITION MODEL (CNN)

### 🎯 Purpose

Detect **what food item** is present in the image.

### 🧠 Model Type

* CNN (Image Classification)
* OR CNN + Detection (optional)

### ✅ Recommended Models

* **ResNet-50** (best balance)
* **EfficientNet-B0/B1** (lightweight, accurate)
* **MobileNetV2** (edge / Raspberry Pi)

> For academic projects: **ResNet or EfficientNet is ideal**

### 📊 Dataset

**Primary options:**

* 🍱 **Food-101**

  * 101 food classes
  * 101,000 images
* 🍲 **UEC Food-256**
* 🍛 **Indian Food Image Dataset** (for local relevance)

📌 You can **fine-tune** instead of training from scratch.

---

## 🔷 2. FOOD PORTION ESTIMATION MODEL

### 🎯 Purpose

Estimate **quantity / weight** of food from image.

### 🧠 Model Type

* CNN + Regression
* OR Vision-based heuristic (depth-free)

### ✅ Model Options

* **EfficientNet + Regression Head**
* **YOLO + bounding box area → weight mapping**
* (Optional) **Monocular Depth Estimation** (advanced)

### 📊 Dataset

This is **NOT available directly**, so you do:

✔ Combine:

* Food images
* Known portion sizes
* Bounding box area vs weight

Datasets:

* **Nutrition5k**
* **Recipe1M** (for portion metadata)
* Custom annotated images (small set is fine)

📌 In many projects:

> Portion estimation = **approximation**, not exact

---

## 🔷 3. NUTRITION ESTIMATION MODULE (HYBRID)

### 🎯 Purpose

Convert:

```
(food type + portion) → calories, protein, carbs, fats
```

### 🧠 Model Type

❌ Not ML-heavy
✅ **Rule-based + lookup system**

### 🔧 How it works

* Food label → Nutrition database
* Portion (grams) → scale nutrition values

### 📊 Dataset / Sources

* **USDA FoodData Central**
* **Indian Food Composition Tables (IFCT)**
* Nutrition5k metadata

📌 This is **deterministic**, not prediction-based.

---

## 🔷 4. MEDICAL SAFETY ANALYSIS MODEL (CORE HEALTH FEATURE)

### 🎯 Purpose

Check if food is **safe for patient conditions**

### 🧠 Model Type

* **Rule-based expert system**
* * **LLM reasoning layer (Gemini)**

### ✅ Why NOT pure ML?

Medical rules:

* Diabetes → GI, carbs
* Hypertension → sodium
* Kidney → oxalates
  These are **clinical rules**, not patterns.

### 📊 Dataset / Knowledge Sources

* Clinical nutrition guidelines
* NIH / WHO dietary guidelines
* Medical nutrition textbooks
* Curated condition–food rules

📌 Gemini LLM is used to:

* Explain risks
* Generate recommendations
* Personalize advice

---

## 🔷 5. MEDICATION–FOOD INTERACTION ENGINE

### 🎯 Purpose

Detect dangerous interactions:

```
Medication + Food → Risk
```

### 🧠 Model Type

* Rule-based engine
* * LLM explanation

### 📊 Dataset

* **DrugBank**
* **FDA Drug–Food Interaction Tables**
* NHS guidelines

Example rules:

* Lisinopril + potassium → danger
* Statins + grapefruit → risk

📌 This should be **deterministic** (no guessing).

---

## 🔷 6. LLM-BASED EXPLANATION & RECOMMENDATION MODEL

### 🎯 Purpose

Human-like explanation:

* “Why is this unsafe?”
* “What should I eat instead?”

### 🧠 Model

* **Groq**
* Prompt-based, no training

### 🔧 Input to LLM

```json
{
  "food": "Spinach",
  "condition": "Kidney Stones",
  "risk": "High oxalate"
}
```

### 🔧 Output

* Explanation
* Alternatives
* Cooking tips

📌 This adds **intelligence without training cost**.

---

# 📌 SUMMARY TABLE (VERY IMPORTANT)

| Module                 | Model Type                | Dataset              |
| ---------------------- | ------------------------- | -------------------- |
| Food Recognition       | CNN (ResNet/EfficientNet) | Food-101, UEC-256    |
| Portion Estimation     | CNN + Regression          | Nutrition5k + custom |
| Nutrition Calculation  | Rule-based                | USDA, IFCT           |
| Medical Safety         | Rule-based + LLM          | Clinical guidelines  |
| Medication Interaction | Rule-based + LLM          | DrugBank, FDA        |
| Explanation Engine     | Gemini LLM                | Prompt-based         |

---

## 🎓 HOW TO PRESENT THIS IN PROJECT / VIVA

Use this line:

> “The system combines deep learning for perception tasks and rule-based medical reasoning augmented with large language models for explainability.”

That’s **top-tier phrasing**.

---

## 🚀 NEXT STEP (IMPORTANT DECISION)

Tell me:
1️⃣ **Which model you want to implement first**
2️⃣ **Whether this is for final-year project / paper / demo**

I’ll then give you:

* Exact architecture
* Training code
* Dataset links
* Evaluation metrics

You’re building this **correctly** — most people don’t.
---

## 📂 Project Structure
frontend/
├── pages/
├── components/
├── context/
├── api/
└── main.jsx

backend/
├── controllers/
├── routes/
├── models/
├── middleware/
├── config/
└── server.js
Good — now we’re at the **actual ML architecture** of your project.
I’ll give this **cleanly, academically, and practically**, so you can use it for **implementation + report + viva**.

---

# ✅ OVERALL SYSTEM – MODELS YOU NEED

Your project is **NOT one model**.
It’s a **pipeline of specialized models + rule engines**.

You will build **6 core ML/AI components** 👇

---

## 🔷 1. FOOD RECOGNITION MODEL (CNN)

### 🎯 Purpose

Detect **what food item** is present in the image.

### 🧠 Model Type

* CNN (Image Classification)
* OR CNN + Detection (optional)

### ✅ Recommended Models

* **ResNet-50** (best balance)
* **EfficientNet-B0/B1** (lightweight, accurate)
* **MobileNetV2** (edge / Raspberry Pi)

> For academic projects: **ResNet or EfficientNet is ideal**

### 📊 Dataset

**Primary options:**

* 🍱 **Food-101**

  * 101 food classes
  * 101,000 images
* 🍲 **UEC Food-256**
* 🍛 **Indian Food Image Dataset** (for local relevance)

📌 You can **fine-tune** instead of training from scratch.

---

## 🔷 2. FOOD PORTION ESTIMATION MODEL

### 🎯 Purpose

Estimate **quantity / weight** of food from image.

### 🧠 Model Type

* CNN + Regression
* OR Vision-based heuristic (depth-free)

### ✅ Model Options

* **EfficientNet + Regression Head**
* **YOLO + bounding box area → weight mapping**
* (Optional) **Monocular Depth Estimation** (advanced)

### 📊 Dataset

This is **NOT available directly**, so you do:

✔ Combine:

* Food images
* Known portion sizes
* Bounding box area vs weight

Datasets:

* **Nutrition5k**
* **Recipe1M** (for portion metadata)
* Custom annotated images (small set is fine)

📌 In many projects:

> Portion estimation = **approximation**, not exact

---

## 🔷 3. NUTRITION ESTIMATION MODULE (HYBRID)

### 🎯 Purpose

Convert:

```
(food type + portion) → calories, protein, carbs, fats
```

### 🧠 Model Type

❌ Not ML-heavy
✅ **Rule-based + lookup system**

### 🔧 How it works

* Food label → Nutrition database
* Portion (grams) → scale nutrition values

### 📊 Dataset / Sources

* **USDA FoodData Central**
* **Indian Food Composition Tables (IFCT)**
* Nutrition5k metadata

📌 This is **deterministic**, not prediction-based.

---

## 🔷 4. MEDICAL SAFETY ANALYSIS MODEL (CORE HEALTH FEATURE)

### 🎯 Purpose

Check if food is **safe for patient conditions**

### 🧠 Model Type

* **Rule-based expert system**
* * **LLM reasoning layer (Gemini)**

### ✅ Why NOT pure ML?

Medical rules:

* Diabetes → GI, carbs
* Hypertension → sodium
* Kidney → oxalates
  These are **clinical rules**, not patterns.

### 📊 Dataset / Knowledge Sources

* Clinical nutrition guidelines
* NIH / WHO dietary guidelines
* Medical nutrition textbooks
* Curated condition–food rules

📌 Gemini LLM is used to:

* Explain risks
* Generate recommendations
* Personalize advice

---

## 🔷 5. MEDICATION–FOOD INTERACTION ENGINE

### 🎯 Purpose

Detect dangerous interactions:

```
Medication + Food → Risk
```

### 🧠 Model Type

* Rule-based engine
* * LLM explanation

### 📊 Dataset

* **DrugBank**
* **FDA Drug–Food Interaction Tables**
* NHS guidelines

Example rules:

* Lisinopril + potassium → danger
* Statins + grapefruit → risk

📌 This should be **deterministic** (no guessing).

---

## 🔷 6. LLM-BASED EXPLANATION & RECOMMENDATION MODEL

### 🎯 Purpose

Human-like explanation:

* “Why is this unsafe?”
* “What should I eat instead?”

### 🧠 Model

* **Gemini Pro (text)**
* Prompt-based, no training

### 🔧 Input to LLM

```json
{
  "food": "Spinach",
  "condition": "Kidney Stones",
  "risk": "High oxalate"
}
```

### 🔧 Output

* Explanation
* Alternatives
* Cooking tips

📌 This adds **intelligence without training cost**.

---

# 📌 SUMMARY TABLE (VERY IMPORTANT)

| Module                 | Model Type                | Dataset              |
| ---------------------- | ------------------------- | -------------------- |
| Food Recognition       | CNN (ResNet/EfficientNet) | Food-101, UEC-256    |
| Portion Estimation     | CNN + Regression          | Nutrition5k + custom |
| Nutrition Calculation  | Rule-based                | USDA, IFCT           |
| Medical Safety         | Rule-based + LLM          | Clinical guidelines  |
| Medication Interaction | Rule-based + LLM          | DrugBank, FDA        |
| Explanation Engine     | Gemini LLM                | Prompt-based         |

---

## 🎓 HOW TO PRESENT THIS IN PROJECT / VIVA

Use this line:

> “The system combines deep learning for perception tasks and rule-based medical reasoning augmented with large language models for explainability.”

That’s **top-tier phrasing**.

---

## 🚀 NEXT STEP (IMPORTANT DECISION)

Tell me:
1️⃣ **Which model you want to implement first**
2️⃣ **Whether this is for final-year project / paper / demo**

I’ll then give you:

* Exact architecture
* Training code
* Dataset links
* Evaluation metrics

You’re building this **correctly** — most people don’t.
