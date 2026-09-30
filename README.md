TechZone – Modern Electronics Store
A frontend-only e-commerce demo built with HTML5, CSS3 and vanilla JavaScript.
Flow
Home → Categories → Product Listing (search, filter, sort) → Product Details → Wishlist / Cart → Checkout → Order Confirmation
Run it
Open `index.html` in a browser. No build step or server needed.
Structure
`index.html` – page shell (header, footer, app mount point)
`css/style.css` – styles, light and dark themes
`js/app.js` – product data, hash router, views, cart and wishlist logic
Notes
Products live in the `P` array at the top of `js/app.js`. Edit it or replace it with a `fetch()` to a JSON file or API.
Cart, wishlist and the last order are saved in `localStorage`.
Checkout is a demo; no payment is processed.
