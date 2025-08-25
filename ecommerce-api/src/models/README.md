# README — src/models

Esquemas Mongoose:
- `User`: {{ name, email, password, role }}
- `Product`: {{ name, description, price, stock, category }}
- `Category`: {{ name, description }}
- `Cart`: {{ user, items: [{{ product, quantity }}] }}
- `Order`: {{ user, items: [{{ product, quantity, price }}], total, status }}
