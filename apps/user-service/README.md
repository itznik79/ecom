# User Service (RBAC Domain)

The **User Service** is responsible for managing user identity, profiles, roles, and permissions in an RBAC (Role-Based Access Control) model.  
This service does **not** manage passwords, login, or tokens — those are handled by the Auth Service.

This follows **DDD principles**, separating authentication from user domain & authorization logic.

## Overview

The User Service models the **identity domain** in an e-commerce system:

- Manages user accounts & providers (local, Google, GitHub, etc.)
- Stores user profile and address information
- Supports RBAC (Roles & Permissions)
- Acts as the authorization source for API Gateway & other services

This allows dynamic access control to features like:

- Admin dashboards
- Seller features
- Buyer/user permissions
- Order, product, inventory management, etc.

---

## Features

- **Canonical user identity root**
- **User profile management**
- **User addresses (multi-address support)**
- **Role-based access control (RBAC)**
- **Permission-based access granularity**
- **Many-to-many role-permission mapping**
- **Many-to-many user-role assignment**
- **OAuth provider support (Google/GitHub)**
- **DDD-aligned domain separation**
- **Microservice ready**

---

## Domain Entities (DDD)

This service contains the following core entities:

| Entity | Description |
|---|---|
| `User` | Identity root (email, provider, status) |
| `UserProfile` | Personal profile fields |
| `UserAddress` | Multiple addresses per user |
| `Role` | High-level access grouping (ADMIN/USER/SELLER) |
| `Permission` | Atomic access actions (order.create, product.update) |
| `UserRoles` | User ↔ Role mapping |
| `RolePermissions` | Role ↔ Permission mapping |

---

## Database Schema

### **users**

Canonical user identity.

| Column | Type |
|---|---|
| id | uuid (pk) |
| email | varchar(unique) |
| provider | varchar(local/google/github) |
| provider_id | varchar |
| is_active | boolean |
| created_at | timestamp |
| updated_at | timestamp |

---

### **user_profiles**

Optional personal info.

| Column | Type |
|---|---|
| id | uuid (pk) |
| user_id | uuid (fk unique) |
| first_name | varchar |
| last_name | varchar |
| phone | varchar(unique) |
| avatar_url | varchar |
| dob | date |
| created_at | timestamp |
| updated_at | timestamp |

---

### **user_addresses**

Multiple addresses per user.

| Column | Type |
|---|---|
| id | uuid (pk) |
| user_id | uuid (fk) |
| type | varchar(home/office/billing) |
| address_line1 | varchar |
| address_line2 | varchar |
| city | varchar |
| state | varchar |
| country | varchar |
| postal_code | varchar |
| is_default | boolean |
| created_at | timestamp |
| updated_at | timestamp |

---

### **roles**

High-level access groups.

| Column | Type |
|---|---|
| id | uuid (pk) |
| name | varchar(unique) |
| description | varchar |
| created_at | timestamp |

---

### **permissions**

Granular access rules.

| Column | Type |
|---|---|
| id | uuid (pk) |
| key | varchar(unique) |
| description | varchar |
| created_at | timestamp |

---

### **user_roles** *(Many-to-Many)*

> A user can have many roles.

Composite Primary Key:

