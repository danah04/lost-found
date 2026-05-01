# KFUPM Lost & Found Platform

A Lost & Found web application for KFUPM campus users. The system supports three roles:

- **Item Owner**: reports lost items, browses found items, submits claims, and communicates with finders.
- **Item Finder**: reports found items, manages submitted found items, and updates item status.
- **Moderator**: reviews listings, handles reports, verifies claims, and confirms returned items.

The project includes a React frontend and a Node.js/Express/MongoDB backend.

---

## Tech Stack

### Frontend
- React
- Vite
- React Router
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcryptjs
- dotenv
- CORS

---

## Project Structure

```txt
lost-found/
├── public/
│   └── images/
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── data/
│   └── pages/
│       ├── owner/
│       ├── finder/
│       └── moderator/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── items/
│   ├── messaging/
│   ├── notifications/
│   ├── moderation/
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── README.md
```

---

## Frontend

### Features

#### Item Owner
- Report a lost item.
- Upload and preview an image.
- Browse and filter found items.
- View found-item details.
- Submit ownership claims.
- View messages and notifications.

#### Item Finder
- Report a found item.
- Upload and preview an image.
- View submitted found items.
- Review suggested matches.
- Update found item status.
- View messages and notifications.

#### Moderator
- Review pending listings.
- Approve, reject, or request clarification.
- Edit listings.
- Archive or remove listings.
- Review user reports.
- Verify ownership claims.
- Confirm returned items.

### Frontend Setup

From the project root:

```bash
npm install
npm run dev
```

Open the Vite local URL shown in the terminal.

### Frontend Login

The frontend currently uses a role selector instead of real KFUPM SSO.

Available roles:

- Item Owner
- Item Finder
- Moderator

The selected role is stored in `localStorage` so the frontend pages can be tested.

### Frontend Important Files

```txt
src/App.jsx                  Main frontend routes
src/index.css                Global styles and responsive layout
src/data/mockData.js         Mock frontend data
src/pages/owner/             Owner pages
src/pages/finder/            Finder pages
src/pages/moderator/         Moderator pages
public/images/               Static item images
```

### Adding Sample Images

Add the image to:

```txt
public/images/
```

Example:

```txt
public/images/wallet.jpg
```

Then reference it in `src/data/mockData.js`:

```js
{
  id: "f-1007",
  title: "Brown Wallet",
  imageUrl: "/images/wallet.jpg"
}
```

---

## Backend

### Overview

The backend provides REST APIs for:

- Authentication
- Finder found-item flow
- Lost item reporting
- Browsing found items
- Ownership claims
- Messaging
- Notifications
- Reports
- Moderator actions
- Audit logs

### Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
cp .env.example .env
```

Update `backend/.env`:

```env
PORT=5050
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Run the backend:

```bash
npm run dev
```

Default backend URL:

```txt
http://localhost:5050
```

### Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWT tokens |
| `NODE_ENV` | Runtime environment |

### Backend Structure

```txt
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── finderController.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/
│   ├── User.js
│   └── FoundItem.js
├── routes/
│   ├── authRoutes.js
│   └── finderRoutes.js
├── utils/
│   ├── apiResponse.js
│   └── validateFields.js
├── items/
│   ├── Item.js
│   ├── Claim.js
│   ├── itemController.js
│   ├── itemRoutes.js
│   ├── itemValidator.js
│   └── matchService.js
├── messaging/
│   ├── Conversation.js
│   ├── messageController.js
│   └── messageRoutes.js
├── notifications/
│   ├── Notification.js
│   ├── notificationController.js
│   ├── notificationRoutes.js
│   └── notificationService.js
├── moderation/
│   ├── Report.js
│   ├── AuditLog.js
│   ├── reportController.js
│   ├── reportRoutes.js
│   ├── moderatorController.js
│   ├── moderatorRoutes.js
│   └── auditService.js
├── .env.example
├── package.json
└── server.js
```

---

## Backend Modules

### Authentication

Files:

```txt
backend/controllers/authController.js
backend/routes/authRoutes.js
backend/models/User.js
backend/middleware/authMiddleware.js
```

Provides:

- Register
- Login
- Get current user
- Role check
- Protected routes
- Role-based authorization

### Finder

Files:

```txt
backend/controllers/finderController.js
backend/routes/finderRoutes.js
backend/models/FoundItem.js
```

Provides:

- Finder dashboard
- Report found item
- View finder’s found items
- View found-item details
- Update found-item status
- Delete found item
- Suggested matches

### Items and Claims

Files:

```txt
backend/items/Item.js
backend/items/Claim.js
backend/items/itemController.js
backend/items/itemRoutes.js
backend/items/itemValidator.js
backend/items/matchService.js
```

Provides:

- Report lost item
- View my lost items
- Browse found items
- Search and filter found items
- View found-item details
- Submit ownership claim
- View my claims
- Suggested matching

### Messaging

Files:

```txt
backend/messaging/Conversation.js
backend/messaging/messageController.js
backend/messaging/messageRoutes.js
```

Provides:

- Create or get conversation
- Get user conversations
- Get messages in a conversation
- Send message

### Notifications

Files:

```txt
backend/notifications/Notification.js
backend/notifications/notificationController.js
backend/notifications/notificationRoutes.js
backend/notifications/notificationService.js
```

Provides:

- Create notifications through a reusable service
- Get user notifications
- Mark one notification as read
- Mark all notifications as read

### Reports and Moderation

Files:

```txt
backend/moderation/Report.js
backend/moderation/AuditLog.js
backend/moderation/reportController.js
backend/moderation/reportRoutes.js
backend/moderation/moderatorController.js
backend/moderation/moderatorRoutes.js
backend/moderation/auditService.js
```

Provides:

- Submit reports
- View submitted reports
- Moderator dashboard
- Pending listing review
- Approve, reject, or request clarification
- Edit listings
- Archive or remove listings
- Resolve reports
- Verify ownership claims
- Confirm returned items
- Record moderator actions in audit logs

---

## API Documentation

Protected endpoints require:

```http
Authorization: Bearer <jwt_token>
```

### Auth Routes

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/auth/login` | Login and receive token |
| `GET` | `/api/auth/me` | Get current user |
| `GET` | `/api/auth/role-check` | Check current user role |
| `POST` | `/api/auth/logout` | Logout response |

### Finder Routes

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/finder/dashboard` | Get finder dashboard |
| `POST` | `/api/finder/found-items` | Report found item |
| `GET` | `/api/finder/found-items` | Get my found items |
| `GET` | `/api/finder/found-items/:id` | Get found item details |
| `PATCH` | `/api/finder/found-items/:id/status` | Update found item status |
| `DELETE` | `/api/finder/found-items/:id` | Delete found item |
| `GET` | `/api/finder/found-items/:id/matches` | Get suggested matches |

### Items and Claims Routes

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/items/lost` | Report lost item |
| `GET` | `/api/items/lost/my` | Get my lost items |
| `GET` | `/api/items/lost/:id/matches` | Get suggested matches |
| `GET` | `/api/items/found` | Browse/search/filter found items |
| `GET` | `/api/items/found/:id` | Get found item details |
| `POST` | `/api/items/found/:id/claims` | Submit claim |
| `GET` | `/api/items/claims/my` | Get my claims |

### Messaging Routes

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/messages/conversations` | Create or get conversation |
| `GET` | `/api/messages/conversations` | Get my conversations |
| `GET` | `/api/messages/conversations/:conversationId` | Get conversation messages |
| `POST` | `/api/messages/conversations/:conversationId` | Send message |

### Notification Routes

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/notifications` | Get my notifications |
| `PATCH` | `/api/notifications/read-all` | Mark all as read |
| `PATCH` | `/api/notifications/:notificationId/read` | Mark one as read |

### Report Routes

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/reports` | Submit report |
| `GET` | `/api/reports/my` | Get my submitted reports |

### Moderator Routes

Moderator routes require the user role to be `moderator`.

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/moderator/dashboard` | Dashboard statistics |
| `GET` | `/api/moderator/listings/pending` | Pending listings |
| `PATCH` | `/api/moderator/listings/:id/review` | Approve, reject, or request clarification |
| `PATCH` | `/api/moderator/listings/:id/edit` | Edit listing |
| `PATCH` | `/api/moderator/listings/:id/visibility` | Archive or remove listing |
| `GET` | `/api/moderator/reports` | View reports |
| `PATCH` | `/api/moderator/reports/:id/resolve` | Resolve report |
| `GET` | `/api/moderator/claims` | Claim verification queue |
| `PATCH` | `/api/moderator/claims/:id/verify` | Verify claim |
| `PATCH` | `/api/moderator/claims/:id/return` | Confirm return |

---

## Example Requests

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Student User",
  "email": "student@kfupm.edu.sa",
  "password": "Password123",
  "role": "owner"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "student@kfupm.edu.sa",
  "password": "Password123"
}
```

### Report Lost Item

```http
POST /api/items/lost
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Black Backpack",
  "category": "Bags",
  "description": "Black backpack with KFUPM notebooks inside",
  "location": "Library",
  "dateLost": "2026-04-28",
  "image": "backpack.png"
}
```

### Browse Found Items

```http
GET /api/items/found?keyword=wallet&category=Personal%20Items&location=Library
Authorization: Bearer <token>
```

### Submit Claim

```http
POST /api/items/found/<foundItemId>/claims
Authorization: Bearer <token>
Content-Type: application/json

{
  "verificationDetails": "It has my student ID in the front pocket.",
  "evidence": "proof.png"
}
```

### Send Message

```http
POST /api/messages/conversations/<conversationId>
Authorization: Bearer <token>
Content-Type: application/json

{
  "body": "Hi, I think this is my item. Can we confirm the details?"
}
```

### Submit Report

```http
POST /api/reports
Authorization: Bearer <token>
Content-Type: application/json

{
  "targetType": "listing",
  "targetId": "<listingId>",
  "reason": "Incorrect information",
  "details": "The image does not match the description."
}
```

### Moderator Review Listing

```http
PATCH /api/moderator/listings/<listingId>/review
Authorization: Bearer <moderator_token>
Content-Type: application/json

{
  "action": "approve",
  "note": "Listing information is complete."
}
```

---

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Lost item submitted successfully",
  "data": {
    "id": "item_id_here"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Title is required",
    "Category is required"
  ]
}
```

---

## Validation Rules

The backend validates important inputs, including:

- Required fields cannot be empty.
- Lost/found dates cannot be in the future.
- Item category must be valid.
- Claim verification details are required.
- Messages cannot be empty.
- Report reason is required.
- Moderator reject/archive/remove actions require a reason.
- Duplicate ownership claims are prevented.

---

## Team Contribution Split

### Lina

Base backend, authentication, finder flow.

```txt
backend/config/
backend/controllers/authController.js
backend/controllers/finderController.js
backend/middleware/
backend/models/User.js
backend/models/FoundItem.js
backend/routes/authRoutes.js
backend/routes/finderRoutes.js
backend/utils/
backend/server.js
backend/package.json
```

### Messaging Module

```txt
backend/messaging/
```

Responsible for conversations and messages.

### Notifications Module

```txt
backend/notifications/
```

Responsible for notification model, routes, controller, and service.

### Items + Moderation + Integration

```txt
backend/items/
backend/moderation/
backend/server.js
README.md
```

Responsible for items, claims, reports, moderator workflows, route registration, and documentation.

---

## Development Notes

- Do not commit `.env`.
- Use `.env.example` to document required environment variables.
- Do not commit `node_modules`.
- Test backend endpoints with Postman or cURL.
- Keep feature-specific files inside their assigned module folder when possible.
- Use separate branches for each teammate’s work.
