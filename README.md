# 🛒 ShopEat

**ShopEat** is a React Native mobile application that brings together **daily essential shopping** and **food ordering from restaurants** — all in one place. Think of it as your one-stop app for groceries, household essentials, and your favourite meals.

> ⚠️ Currently uses a dummy/mock API for products and food listings. Real API integration (Grocery/Food delivery APIs) is planned as part of upcoming development.

---

## 📱 Screenshots       
> _Add screenshots or a screen recording GIF here once available._
> Tip: Use [LiceCap](https://www.cockos.com/licecap/) or [Recordit](https://recordit.co/) to record a GIF of your app.

---

## ✨ Features

- 🏠 **Home Screen** — Curated view of products and food categories
- 🛍️ **Product Listing** — Browse daily essentials and grocery items
- 🍔 **Food Ordering** — Explore restaurant menus and order meals
- 📄 **Product Detail** — Full details, images, and pricing for each item
- 🛒 **Cart** — Add/remove items, view order summary
- 💳 **Checkout** — Review and place your order
- 👤 **Auth Screens** — Login and Signup flow
- 👨‍💼 **User Profile** — Manage your account details

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React Native (CLI) |
| Navigation | React Navigation |
| State Management | Redux / Context API |
| Backend / Data | Firebase / Mock API (dummy data) |
| Language | JavaScript |
| Linting | ESLint + Prettier |
| Testing | Jest |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- React Native CLI set up ([official guide](https://reactnative.dev/docs/set-up-your-environment))
- Android Studio (for Android) or Xcode (for iOS)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/RohitVenkateshManchala/ShopEat.git
cd ShopEat

# 2. Install dependencies
npm install

# 3. For iOS (Mac only)
bundle install
bundle exec pod install
```

### Running the App

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

---

## 📁 Project Structure

```
ShopEat/
├── src/
│   ├── screens/        # All app screens (Home, Cart, Checkout, etc.)
│   ├── components/     # Reusable UI components
│   ├── navigation/     # React Navigation setup
│   ├── redux/          # Redux store, actions, reducers
│   └── assets/         # Images, icons, fonts
├── android/            # Android native code
├── ios/                # iOS native code
├── App.js              # Root component
└── package.json
```

---

## 🗺️ Roadmap

- [x] Home, Product listing, Product detail screens
- [x] Cart and Checkout flow
- [x] Login / Signup / Profile
- [ ] Integrate real Grocery API (e.g. Open Food Facts)
- [ ] Integrate real Restaurant/Food API
- [ ] AI-powered product search (natural language)
- [ ] Personalised food & product recommendations
- [ ] Order tracking screen
- [ ] Payment gateway integration

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 👨‍💻 Author

**Rohit Venkatesh Manchala**
- GitHub: [@RohitVenkateshManchala](https://github.com/RohitVenkateshManchala)
- LinkedIn: https://www.linkedin.com/in/rohit-venkatesh-manchala

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
