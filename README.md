# KFUPM Lost & Found Frontend

A responsive React frontend for a campus Lost & Found system. The app includes separate flows for item owners, item finders, and moderators.

## Features

### Item Owner
- Report a lost item with validation.
- Upload and preview a JPG/PNG image.
- Browse and filter found items.
- View found-item details.
- Submit ownership claims.
- View messages and notifications.

### Item Finder
- Report a found item with image upload and preview.
- View submitted found items.
- Review suggested lost-item matches.
- Update item status.
- View messages and notifications.

### Moderator
- Review pending lost/found listings.
- Approve, reject, or request clarification.
- Edit listings.
- Archive or remove listings.
- Review reports.
- Verify ownership claims.
- Confirm returned items.
- View active listings.

## Tech Stack

- React
- Vite
- React Router
- Plain CSS

## Setup

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Login

The frontend currently uses a role selector instead of real KFUPM SSO. Choose one of the three roles on the login page:

- Item Owner
- Item Finder
- Moderator

This stores a mock user in `localStorage` so the role-specific pages can be tested.

## Adding Pictures

The sample listing pictures are stored in:

```txt
public/images/
```

To add a new picture:

1. Put the image file in `public/images/`, for example:

```txt
public/images/wallet.jpg
```

2. Add the image path to the item in `src/data/mockData.js`:

```js
{
  id: "f-1007",
  title: "Brown Wallet",
  imageUrl: "/images/wallet.jpg"
}
```

3. Use JPG, PNG, SVG, or WebP images. The report forms already support JPG/PNG upload preview.

## Important Files

```txt
src/App.jsx                    Main routes
src/index.css                  Global styling and responsive layout
src/data/mockData.js           Mock lost/found data
src/pages/owner/               Owner pages
src/pages/finder/              Finder pages
src/pages/moderator/           Moderator pages
public/images/                 Static listing images
```

## Backend Status

Backend integration is intentionally not included in this frontend pass. The current app uses mock data and local UI state only.
