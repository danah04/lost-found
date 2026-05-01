# KFUPM Lost & Found Platform

A responsive Lost & Found web application for the KFUPM campus. The system supports three main user roles: Item Owners, Item Finders, and Moderators. The frontend provides the user interface, while the backend provides RESTful APIs, authentication, MongoDB data storage, validation, and moderation workflows.

---

# Frontend

## Overview

The frontend is a React application built with Vite. It includes role-based pages and workflows for item owners, item finders, and moderators.

## Frontend Features

### Item Owner

- Report a lost item with form validation.
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

## Frontend Tech Stack

- React
- Vite
- React Router
- Plain CSS

## Frontend Setup

```bash
npm install
npm run dev